/**
 * Receives submissions from the partnership dialogs (see _components/Qualify.tsx,
 * channel "partnership") and forwards them to the Sora API, which queues and emails
 * them to the partnerships inbox:
 *
 *   POST {SORA_API_URL}/api/service-notifications/partnership-inquiry
 *
 * Environment variables (set in .env.local and in the Vercel project settings):
 *
 *   SORA_API_URL         optional  defaults to https://api.soracare.io
 *   SORA_SERVICE_CALLER  "website" (Production) / "website-preview" (Preview)
 *   SORA_SERVICE_SECRET  per environment; never expose to the browser
 *
 * Without the caller/secret, `next dev` logs the inquiry and reports success so the
 * form can be tried locally. Anywhere else it fails with a 503.
 *
 * The API rejects unknown fields with a 400, so the outgoing body is built from an
 * explicit whitelist. Never forward the raw request body.
 */

import { randomUUID } from "node:crypto";
import {
  isInquiryType,
  isValidPhone,
  PARTNER_LIMITS as LIMIT,
  PHONE_ERROR,
  type InquiryType,
} from "../../_lib/partnership";

const DEFAULT_API_URL = "https://api.soracare.io";
const ENDPOINT_PATH = "/api/service-notifications/partnership-inquiry";

/** Per attempt. Delivery is queued on their side, so we only need to reach them. */
const ATTEMPT_TIMEOUT_MS = 5000;
const MAX_ATTEMPTS = 3;
/** Don't start another attempt (or wait for one) past this point. */
const DEADLINE_MS = 9000;
const MAX_RETRY_WAIT_MS = 3000;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const GENERIC_ERROR = "We couldn’t send your request. Please try again.";

const json = (body: Record<string, unknown>, status = 200) => Response.json(body, { status });

/* ───────────── input cleaning ───────────── */

function str(value: unknown) {
  return typeof value === "string" ? value : "";
}

/** One line: control characters and runs of whitespace become a single space. */
function singleLine(value: unknown, max: number) {
  return str(value)
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/** Plain text, newlines allowed. */
function multiLine(value: unknown, max: number) {
  return str(value)
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

/* ───────────── abuse protection ───────────── */

/**
 * The API allows 20 requests a minute for the whole website (per caller), so one noisy
 * client must not use it all up. Best effort only: serverless instances don't share memory.
 */
const WINDOW_MS = 60_000;
const PER_IP = 5;
const hits = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= PER_IP) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/* ───────────── calling the API ───────────── */

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Retry-After as milliseconds (seconds or an HTTP date), or null. */
function retryAfterMs(res: Response) {
  const raw = res.headers.get("retry-after");
  if (!raw) return null;
  const seconds = Number(raw);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const at = Date.parse(raw);
  return Number.isNaN(at) ? null : Math.max(0, at - Date.now());
}

/**
 * Sends once, retrying 5xx and network errors with backoff (same Idempotency-Key, so a
 * retry can never email twice) and a single 429 if the wait is short.
 * Returns null if the API could not be reached at all.
 */
async function post(url: string, headers: Record<string, string>, body: string) {
  const started = Date.now();
  let res: Response | null = null;
  let retriedRateLimit = false;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    let wait = 300 * 3 ** attempt; // 300ms, 900ms
    res = null;
    try {
      res = await fetch(url, {
        method: "POST",
        headers,
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
      });
    } catch (err) {
      console.error("[partnership] request failed", attempt + 1, err instanceof Error ? err.message : err);
    }

    if (res) {
      if (res.status === 429) {
        const after = retryAfterMs(res);
        if (retriedRateLimit || after === null || after > MAX_RETRY_WAIT_MS) return res;
        retriedRateLimit = true;
        wait = after;
      } else if (res.status >= 500) {
        wait = Math.min(retryAfterMs(res) ?? wait, MAX_RETRY_WAIT_MS);
      } else {
        return res;
      }
    }

    const last = attempt === MAX_ATTEMPTS - 1;
    if (last || Date.now() - started + wait > DEADLINE_MS) break;
    await sleep(wait);
  }
  return res;
}

/** The API's 400 body is { message: string[] }, one entry per failed rule. */
function friendlyValidation(raw: string) {
  let messages: unknown[] = [];
  try {
    const parsed = JSON.parse(raw) as { message?: unknown };
    messages = Array.isArray(parsed.message) ? parsed.message : [parsed.message];
  } catch {
    /* fall through to the generic message */
  }

  const text = new Set<string>();
  for (const m of messages) {
    switch (str(m).split(" ")[0]) {
      case "name":
        text.add("Please check the name you entered.");
        break;
      case "email":
        text.add("Please enter a valid email address.");
        break;
      case "phone":
        text.add(PHONE_ERROR);
        break;
      case "organization":
        text.add("The organization name is too long.");
        break;
      case "message":
        text.add(`Your message is too long (${LIMIT.message.toLocaleString("en-US")} characters at most).`);
        break;
    }
  }
  return text.size ? [...text].join(" ") : "Please check your details and try again.";
}

/* ───────────── handler ───────────── */

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "The form could not be read." }, 400);
  }

  // Honeypot: real visitors never fill this. Pretend it worked so bots don't retry.
  if (singleLine(body.company, 200) !== "") {
    return json({ ok: true });
  }

  const first = singleLine(body.first, LIMIT.first);
  const last = singleLine(body.last, LIMIT.last);
  const email = singleLine(body.email, LIMIT.email + 1); // one over, so too-long is rejected, not cut
  const phone = singleLine(body.phone, LIMIT.phone);
  const organization = singleLine(body.organization, LIMIT.organization);
  const message = multiLine(body.message, LIMIT.message);
  const sourcePage = singleLine(body.page, LIMIT.sourcePage);
  const inquiryType: InquiryType | "" = isInquiryType(body.inquiryType) ? body.inquiryType : "";

  if (!first || !last || !phone || !email) {
    return json({ ok: false, error: "Name, phone, and email are required." }, 400);
  }
  if (email.length > LIMIT.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }
  if (!isValidPhone(phone)) {
    return json({ ok: false, error: PHONE_ERROR }, 400);
  }

  if (tooMany(clientIp(request))) {
    return json({ ok: false, error: "Too many requests. Please wait a minute and try again." }, 429);
  }

  // Only fields the API knows about. Optional ones are left out when empty.
  const payload: Record<string, string> = {
    name: `${first} ${last}`,
    email,
    phone,
    ...(organization && { organization }),
    ...(message && { message }),
    ...(inquiryType && { inquiryType }),
    ...(sourcePage && { sourcePage }),
  };

  // The client keeps one key per submission so a retry of the same form never emails twice.
  const idempotencyKey = UUID.test(str(body.idempotencyKey)) ? str(body.idempotencyKey) : randomUUID();

  const caller = process.env.SORA_SERVICE_CALLER;
  const secret = process.env.SORA_SERVICE_SECRET;
  if (!caller || !secret) {
    if (process.env.NODE_ENV === "development") {
      console.log("[partnership] SORA_SERVICE_CALLER/SECRET not set; inquiry logged locally", {
        idempotencyKey,
        payload,
      });
      return json({ ok: true, logged: true });
    }
    console.error("[partnership] SORA_SERVICE_CALLER / SORA_SERVICE_SECRET are not set; inquiry was not sent.");
    return json({ ok: false, error: "The form is not ready yet." }, 503);
  }

  const base = (process.env.SORA_API_URL || DEFAULT_API_URL).replace(/\/+$/, "");
  const res = await post(
    `${base}${ENDPOINT_PATH}`,
    {
      "Content-Type": "application/json",
      "X-Service-Caller": caller,
      "X-Service-Secret": secret,
      "Idempotency-Key": idempotencyKey,
    },
    JSON.stringify(payload),
  );

  if (!res) {
    return json({ ok: false, error: GENERIC_ERROR }, 502);
  }

  // 202: queued, or a duplicate of an earlier submission with the same key. Both are success.
  if (res.ok) {
    return json({ ok: true });
  }

  const detail = (await res.text().catch(() => "")).slice(0, 500);

  switch (res.status) {
    case 400:
      // Our own checks should catch this first, so a 400 means the spec and form have drifted.
      console.error("[partnership] API rejected the inquiry (400)", detail);
      return json({ ok: false, error: friendlyValidation(detail) }, 400);
    case 429:
      console.error("[partnership] rate limited by the API (429)");
      return json({ ok: false, error: "We’re getting a lot of requests right now. Please try again in a minute." }, 429);
    case 401:
    case 403:
    case 404:
      // Wrong caller/secret, caller not allowed, or the endpoint is not deployed yet. Not the visitor's fault.
      console.error(`[partnership] API refused the request (${res.status}). Check SORA_* env vars.`, detail);
      return json({ ok: false, error: GENERIC_ERROR }, 502);
    case 409:
      // Same key, different body. The client resets its key whenever the form changes, so this is a bug.
      console.error("[partnership] Idempotency-Key reused with a different body (409)", detail);
      return json({ ok: false, error: GENERIC_ERROR }, 502);
    default:
      console.error(`[partnership] API error (${res.status}) after retries`, detail);
      return json({ ok: false, error: GENERIC_ERROR }, 502);
  }
}

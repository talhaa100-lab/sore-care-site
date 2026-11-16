/**
 * Sends submissions from the site's lead dialog to the Sora Care CRM webhook
 * (same contract the SEO sites use, with source "Website").
 * The partnership dialogs do not use this route; they post to /api/partnership.
 *
 * Environment variables (set in .env.local and in the Vercel project settings):
 *   MAKE_WEBHOOK_SECRET  secret sent as the x-make-webhook-secret header
 *   LEAD_WEBHOOK_URL     optional, defaults to the production CRM webhook below
 */

const DEFAULT_WEBHOOK_URL = "https://api.soracare.io/api/webhooks/make-leads";

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const json = (body: Record<string, unknown>, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "The form could not be read." }, 400);
  }

  // Honeypot: real visitors never fill this. Pretend it worked so bots don't retry.
  if (text(body.company, 200) !== "") {
    return json({ ok: true });
  }

  const firstName = text(body.first, 80);
  const lastName = text(body.last, 80);
  const phone = text(body.phone, 40);
  const email = text(body.email, 160);
  const message = text(body.message, 2000);
  const form = text(body.source, 120) || "See if you qualify";
  const page = text(body.page, 200) || "/";

  if (!firstName || !lastName || !phone || !email) {
    return json({ error: "Name, phone, and email are required." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Enter an email address." }, 400);
  }

  const payload = {
    source: "Website",
    firstName,
    lastName,
    phone,
    email,
    submittedAt: new Date().toISOString(),
    note: [`Website form: ${form}`, `Page: ${page}`, message ? `Message: ${message}` : ""]
      .filter(Boolean)
      .join("\n"),
  };

  const webhookSecret = process.env.MAKE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    if (process.env.NODE_ENV === "development") {
      console.log("[crm-lead] MAKE_WEBHOOK_SECRET not set; lead logged locally", payload);
      return json({ ok: true, logged: true });
    }
    console.error("[crm-lead] MAKE_WEBHOOK_SECRET is not set; lead was not sent.");
    return json({ error: "The form is not ready yet." }, 503);
  }

  let sent: Response;
  try {
    sent = await fetch(process.env.LEAD_WEBHOOK_URL || DEFAULT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-make-webhook-secret": webhookSecret,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[crm-lead] request failed", err);
    return json({ error: "The application could not be sent." }, 502);
  }

  if (!sent.ok) {
    console.error("[crm-lead] CRM rejected the lead", sent.status, await sent.text().catch(() => ""));
    return json({ error: "The application could not be sent." }, 502);
  }
  return json({ ok: true });
}

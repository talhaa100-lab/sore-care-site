/**
 * Receives submissions from the shared lead dialog (see _components/Qualify.tsx)
 * and emails them. Two sending methods; SMTP wins if it is configured.
 *
 * Environment variables (set in .env.local and in the Vercel project settings):
 *
 *   LEAD_TO         optional  comma separated recipients (defaults to the two below)
 *
 *   A) SMTP (e.g. Gmail / Google Workspace app password). Can email anyone, no domain setup.
 *   SMTP_USER       the mailbox that sends, e.g. talha@aaaadvantagehomecare.com
 *   SMTP_PASS       its app password (not the normal password)
 *   SMTP_HOST       optional, default smtp.gmail.com
 *   SMTP_PORT       optional, default 465
 *   LEAD_FROM       optional, default "Sora Care <SMTP_USER>"
 *
 *   B) Resend (needs a verified domain to email anyone except the account owner)
 *   RESEND_API_KEY  API key from https://resend.com
 *   LEAD_FROM       verified sender, e.g. "Sora Care <leads@yourdomain.com>"
 */

import nodemailer from "nodemailer";

const DEFAULT_TO = ["daniel@aaaadvantagehomecare.com", "kelsey@aaaadvantagehomecare.com"];

const LIMITS = { first: 80, last: 80, phone: 40, email: 160, message: 4000, source: 120, page: 200 } as const;

type Field = keyof typeof LIMITS;

function clean(value: unknown, field: Field): string {
  return typeof value === "string" ? value.trim().slice(0, LIMITS[field]) : "";
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const json = (body: Record<string, unknown>, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never see or fill this field, bots usually do.
  // Pretend it worked so they don't retry.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return json({ ok: true });
  }

  const lead = {
    first: clean(body.first, "first"),
    last: clean(body.last, "last"),
    phone: clean(body.phone, "phone"),
    email: clean(body.email, "email"),
    message: clean(body.message, "message"),
    source: clean(body.source, "source") || "Website form",
    page: clean(body.page, "page"),
  };

  if (!lead.first || !lead.last || !lead.phone || !lead.email) {
    return json({ ok: false, error: "Please fill in all required fields." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const apiKey = process.env.RESEND_API_KEY;
  const useSmtp = Boolean(smtpUser && smtpPass);
  const from = process.env.LEAD_FROM || (smtpUser ? `Sora Care <${smtpUser}>` : "");
  if (!from || (!useSmtp && !apiKey)) {
    console.error("[lead] No email sender configured (set SMTP_USER + SMTP_PASS, or RESEND_API_KEY + LEAD_FROM).");
    return json({ ok: false, error: "Email is not configured." }, 503);
  }

  const to = (process.env.LEAD_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const recipients = to.length ? to : DEFAULT_TO;

  const fullName = `${lead.first} ${lead.last}`;
  const rows: [string, string][] = [
    ["Form", lead.source],
    ["Page", lead.page || "—"],
    ["Name", fullName],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Message", lead.message || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:15px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="font-weight:700;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  const subject = `${lead.source}: ${fullName}`;
  const failure = json({ ok: false, error: "We couldn’t send your request. Please try again." }, 502);

  if (useSmtp) {
    try {
      const port = Number(process.env.SMTP_PORT) || 465;
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port,
        secure: port === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transport.sendMail({ from, to: recipients, replyTo: lead.email, subject, text, html });
    } catch (err) {
      console.error("[lead] SMTP error", err);
      return failure;
    }
    return json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: recipients, reply_to: lead.email, subject, text, html }),
  });

  if (!res.ok) {
    console.error("[lead] Resend error", res.status, await res.text().catch(() => ""));
    return failure;
  }

  return json({ ok: true });
}

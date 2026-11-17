"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { FORM, PHONE_DISPLAY, PHONE_HREF } from "../_lib/content";
import { isValidPhone, PARTNER_LIMITS, PHONE_ERROR, type InquiryType } from "../_lib/partnership";

export type QualifyOptions = {
  /** Dialog heading. Defaults to "See if you qualify". */
  title?: string;
  /** Side photo for this dialog. Defaults to the provider's image. */
  image?: string;
  /**
   * Where the submission goes. "crm" (default) posts to the Sora Care CRM;
   * "partnership" posts to /api/partnership, which emails the partnerships inbox
   * (used by the partnership dialogs, and adds an Organization field).
   */
  channel?: "crm" | "partnership";
  /** Partnership dialogs only: what the visitor is asking for (shown in the email subject). */
  inquiryType?: InquiryType;
  /** Short note shown above the submit button, e.g. a privacy reminder. */
  note?: string;
};

/** RFC 4122 v4 id. randomUUID needs a secure context, so keep a fallback. */
function newKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

type QualifyContextValue = { open: (options?: QualifyOptions) => void };

const QualifyContext = createContext<QualifyContextValue>({ open: () => {} });

export const useQualify = () => useContext(QualifyContext);

/**
 * Owns the single lead-form dialog for the whole site.
 * Native <dialog> gives us focus trapping, Esc to close and a top layer for free.
 * The partnership page reuses it with different titles/photos
 * ("Refer a client", "Schedule a partner intro", "Request partner packet").
 */
export function QualifyProvider({
  children,
  image,
}: {
  children: ReactNode;
  /** default side photo (the original site's popup has one) */
  image?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState<QualifyOptions>({});
  // One Idempotency-Key per submission: kept for retries of the same content, replaced when it changes.
  const attempt = useRef<{ key: string; body: string } | null>(null);

  const open = useCallback((next?: QualifyOptions) => {
    attempt.current = null;
    setSent(false);
    setSending(false);
    setError("");
    setOptions(next ?? {});
    ref.current?.showModal();
  }, []);

  const close = useCallback(() => ref.current?.close(), []);

  // Clicking the backdrop (the <dialog> itself, outside the panel) closes it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === el) el.close();
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, []);

  const photo = options.image ?? image;
  const title = options.title ?? FORM.title;
  const partnershipForm = options.channel === "partnership";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const data = new FormData(e.currentTarget);
    const partnership = options.channel === "partnership";

    if (partnership && !isValidPhone(String(data.get("phone") ?? ""))) {
      setError(PHONE_ERROR);
      return;
    }

    const fields: Record<string, unknown> = {
      first: data.get("first"),
      last: data.get("last"),
      phone: data.get("phone"),
      email: data.get("email"),
      message: data.get("message"),
      company: data.get("company"), // honeypot
      source: title,
      page: window.location.pathname,
    };
    if (partnership) {
      fields.organization = data.get("organization");
      fields.inquiryType = options.inquiryType;
      // Same content as the last attempt: reuse the key so a retry can't send twice.
      // Edited content: a new key, otherwise the API answers 409.
      const content = JSON.stringify(fields);
      if (attempt.current?.body !== content) attempt.current = { key: newKey(), body: content };
      fields.idempotencyKey = attempt.current.key;
    }

    setSending(true);
    setError("");
    try {
      const res = await fetch(partnership ? "/api/partnership" : "/api/crm-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !result?.ok) {
        setError(result?.error ?? "Something went wrong. Please try again.");
        return;
      }
      attempt.current = null;
      setSent(true);
    } catch {
      setError("We couldn’t reach the server. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const value = useMemo(() => ({ open }), [open]);

  return (
    <QualifyContext.Provider value={value}>
      {children}

      <dialog ref={ref} className="dialog" data-photo={photo ? "" : undefined} aria-labelledby="qualify-title">
        <div className={photo ? "dialog__panel dialog__panel--photo" : "dialog__panel"}>
          {photo ? (
            <div className="dialog__photo" aria-hidden="true">
              <Image src={photo} alt="" fill sizes="(min-width: 760px) 300px, 0px" />
            </div>
          ) : null}
          <button type="button" className="dialog__close press" onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="dialog__body">
            {sent ? (
              <div className="dialog__sent">
                <span className="dialog__tick" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="28" height="28">
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      pathLength={1}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h2 className="dialog__title">Thank you.</h2>
                <p className="dialog__lede">
                  A specialist will be in touch. Prefer to talk now? Call{" "}
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
                </p>
                <button type="button" className="btn btn--ink press" onClick={close}>
                  <span>Close</span>
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="form">
                <h2 id="qualify-title" className="dialog__title">
                  {title}
                </h2>

                <div className="form__row">
                  <label className="field">
                    <span>{FORM.fields.first}</span>
                    <input
                      name="first"
                      type="text"
                      autoComplete="given-name"
                      maxLength={partnershipForm ? PARTNER_LIMITS.first : undefined}
                      required
                    />
                  </label>
                  <label className="field">
                    <span>{FORM.fields.last}</span>
                    <input
                      name="last"
                      type="text"
                      autoComplete="family-name"
                      maxLength={partnershipForm ? PARTNER_LIMITS.last : undefined}
                      required
                    />
                  </label>
                </div>

                <div className="form__row">
                  <label className="field">
                    <span>{FORM.fields.phone}</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={partnershipForm ? PARTNER_LIMITS.phone : undefined}
                      required
                    />
                  </label>
                  <label className="field">
                    <span>{FORM.fields.email}</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={partnershipForm ? PARTNER_LIMITS.email : undefined}
                      required
                    />
                  </label>
                </div>

                {partnershipForm ? (
                  <label className="field">
                    <span>{FORM.fields.organization}</span>
                    <input
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      maxLength={PARTNER_LIMITS.organization}
                    />
                  </label>
                ) : null}

                <label className="field">
                  <span>{FORM.fields.message}</span>
                  <textarea name="message" rows={3} maxLength={partnershipForm ? PARTNER_LIMITS.message : undefined} />
                </label>

                {options.note ? <p className="form__note">{options.note}</p> : null}

                {/* honeypot: hidden from people, tempting for bots */}
                <input
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                />

                {error ? (
                  <p className="form__error" role="alert">
                    {error} You can also call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
                  </p>
                ) : null}

                <button type="submit" className="btn btn--accent press" disabled={sending} aria-busy={sending}>
                  <span>{sending ? "Sending…" : FORM.submit}</span>
                  <Arrow />
                </button>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </QualifyContext.Provider>
  );
}

export function Arrow() {
  return (
    <svg className="btn__arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

export type QualifyOptions = {
  /** Dialog heading. Defaults to "See if you qualify". */
  title?: string;
  /** Side photo for this dialog. Defaults to the provider's image. */
  image?: string;
  /**
   * Where the submission goes. "crm" (default) posts to the Sora Care CRM;
   * "email" sends a notification email (used by the partnership dialogs).
   */
  channel?: "crm" | "email";
};

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

  const open = useCallback((next?: QualifyOptions) => {
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const data = new FormData(e.currentTarget);
    setSending(true);
    setError("");
    try {
      const res = await fetch(options.channel === "email" ? "/api/lead" : "/api/crm-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first: data.get("first"),
          last: data.get("last"),
          phone: data.get("phone"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
          source: title,
          page: window.location.pathname,
        }),
      });
      const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !result?.ok) {
        setError(result?.error ?? "Something went wrong. Please try again.");
        return;
      }
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
                    <input name="first" type="text" autoComplete="given-name" required />
                  </label>
                  <label className="field">
                    <span>{FORM.fields.last}</span>
                    <input name="last" type="text" autoComplete="family-name" required />
                  </label>
                </div>

                <div className="form__row">
                  <label className="field">
                    <span>{FORM.fields.phone}</span>
                    <input name="phone" type="tel" autoComplete="tel" required />
                  </label>
                  <label className="field">
                    <span>{FORM.fields.email}</span>
                    <input name="email" type="email" autoComplete="email" required />
                  </label>
                </div>

                <label className="field">
                  <span>{FORM.fields.message}</span>
                  <textarea name="message" rows={3} />
                </label>

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

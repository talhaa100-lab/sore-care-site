import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Shared building blocks for the inner pages
 * (about, partnership, states, contact, legal).
 */

export function PageHero({
  eyebrow,
  title,
  children,
  aside,
  compact = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  /** optional right-hand visual (photo in an arch frame, cards…) */
  aside?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="s2-ph" data-compact={compact || undefined}>
      <span className="s2-ph__blob s2-ph__blob--a" aria-hidden="true" />
      <span className="s2-ph__blob s2-ph__blob--b" aria-hidden="true" />
      <div className="s2-wrap s2-ph__grid" data-aside={aside ? "" : undefined}>
        <div className="s2-ph__copy">
          <p className="s2-eyebrow s2-rise" style={{ "--d": 0 } as CSSProperties}>
            {eyebrow}
          </p>
          <h1 className="s2-ph__title s2-rise" style={{ "--d": 1 } as CSSProperties}>
            {title}
          </h1>
          {children ? (
            <div className="s2-ph__body s2-rise" style={{ "--d": 2 } as CSSProperties}>
              {children}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="s2-ph__aside s2-rise" style={{ "--d": 3 } as CSSProperties}>
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <Reveal className="s2-sh">
      {eyebrow ? <p className="s2-eyebrow">{eyebrow}</p> : null}
      <h2 className="s2-h2">{title}</h2>
      {lead ? <p className="s2-sh__lead">{lead}</p> : null}
    </Reveal>
  );
}

export function Tick() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckList({ items, tone = "teal" }: { items: readonly string[]; tone?: "teal" | "mint" }) {
  return (
    <ul className="s2-ticks" data-tone={tone}>
      {items.map((item) => (
        <li key={item}>
          <span className="s2-ticks__tick">
            <Tick />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path
        d="M6.6 3.5h2.7l1.4 4-1.8 1.3a11 11 0 0 0 5.8 5.8l1.3-1.8 4 1.4v2.7a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <path d="M4.5 7.5l7.5 5.6 7.5-5.6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

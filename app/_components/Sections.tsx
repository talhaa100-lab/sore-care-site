import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import {
  FAQ,
  FINAL_CTA,
  FOOTER,
  HERO,
  NAV,
  PHONE_DISPLAY,
  PHONE_HREF,
  STATES,
  STEPS,
  WHAT_WE_DO,
  WHO,
} from "../_lib/content";
import { S2Arrow, S2Button } from "./Buttons";
import { FaqChat } from "./FaqChat";
import { InView } from "./InView";
import { ScrollWords } from "./ScrollWords";

/* ───────────── what we do ───────────── */

export function Statement() {
  return (
    <section className="s2-panel s2-statement" id="what-we-do">
      <div className="s2-wrap">
        <Reveal>
          <p className="s2-eyebrow s2-eyebrow--light">{WHAT_WE_DO.eyebrow}</p>
        </Reveal>

        <ScrollWords text={WHAT_WE_DO.lead} accentTail={4} />

        <div className="s2-statement__cols">
          <Reveal>
            <p className="s2-statement__body">
              {WHAT_WE_DO.before}
              <mark>{WHAT_WE_DO.highlight}</mark>
              {WHAT_WE_DO.after}
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p className="s2-statement__close">{WHAT_WE_DO.closing}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────── who we support ───────────── */

const WHO_TONES = ["mint", "butter", "lilac", "sky", "coral"];

export function Who() {
  return (
    <section className="s2-section s2-who">
      <div className="s2-wrap s2-who__grid">
        <div className="s2-who__side">
          <Reveal>
            <p className="s2-eyebrow">{WHO.eyebrow}</p>
            <h2 className="s2-h2">{WHO.title}</h2>
            <p className="s2-who__sub">{WHO.subtitle}</p>
            <p className="s2-who__body">{WHO.body}</p>
            <p className="s2-who__close">{WHO.closing}</p>
          </Reveal>
        </div>

        <ol className="s2-stack">
          {WHO.items.map((item, i) => (
            <li
              key={item.tab}
              className={`s2-stack__card s2-tone--${WHO_TONES[i % WHO_TONES.length]}`}
              style={{ "--i": i } as CSSProperties}
            >
              <div className="s2-stack__meta">
                <span className="s2-tag">{item.tab}</span>
                <span className="s2-stack__count">
                  {i + 1}/{WHO.items.length}
                </span>
              </div>
              <h3 className="s2-stack__title">{item.title}</h3>
              <p className="s2-stack__body">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────── how it works ───────────── */

const STEP_TIMES = [120, 840, 1420, 2160];

export function Journey() {
  return (
    <section className="s2-section s2-journey-section">
      <div className="s2-wrap">
        <Reveal>
          <h2 className="s2-h2 s2-journey__title">{STEPS.eyebrow}</h2>
        </Reveal>

        <InView className="s2-journey">
          <div className="s2-journey__track" aria-hidden="true">
            <i className="s2-journey__fill" />
            <i className="s2-journey__walker">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M12 20.5C5 15.5 3 11.8 3 8.9 3 6.5 4.8 4.8 7 4.8c1.9 0 3.6 1.1 5 3.2 1.4-2.1 3.1-3.2 5-3.2 2.2 0 4 1.7 4 4.1 0 2.9-2 6.6-9 11.6z"
                  fill="#fff"
                />
              </svg>
            </i>
          </div>

          <ol className="s2-journey__list">
            {STEPS.items.map((s, i) => (
              <li key={s.n} className="s2-step" style={{ "--t": STEP_TIMES[i] } as CSSProperties}>
                <span className="s2-step__node">{s.n}</span>
                <h3 className="s2-step__title">{s.title}</h3>
                <p className="s2-step__body">{s.body}</p>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}

/* ───────────── states ───────────── */

const ROW_TONES = ["mint", "butter", "lilac", "sky"];

export function States() {
  return (
    <section className="s2-section s2-states" id="states">
      <div className="s2-wrap">
        <div className="s2-states__head">
          <Reveal>
            <p className="s2-eyebrow">{STATES.eyebrow}</p>
            <h2 className="s2-h2">{STATES.intro}</h2>
          </Reveal>
        </div>

        <ul className="s2-rows">
          {STATES.items.map((s, i) => (
            <Reveal as="li" delay={i} key={s.abbr}>
              <Link
                href={`/states#${s.state.toLowerCase().replace(/\s+/g, "-")}`}
                className={`s2-row s2-tone--${ROW_TONES[i % ROW_TONES.length]}`}
              >
                <span className="s2-row__abbr">{s.abbr}</span>
                <span className="s2-row__state">{s.state}</span>
                <span className="s2-row__program">{s.program}</span>
                <span className="s2-row__go">
                  <span className="s2-row__more">{STATES.cardCta}</span>
                  <span className="s2-row__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        d="M7 17L17 7M9 7h8v8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="s2-help">
          <div>
            <h3>{STATES.helpTitle}</h3>
            <p>{STATES.helpBody}</p>
          </div>
          <S2Button tone="deep">{HERO.cta}</S2Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── FAQ ───────────── */

export function Faq() {
  return (
    <section className="s2-section s2-faq">
      <div className="s2-wrap s2-faq__grid">
        <Reveal className="s2-faq__side">
          <h2 className="s2-h2">{FAQ.eyebrow}</h2>
          <p className="s2-faq__hint">Tap a question to read the answer.</p>
        </Reveal>
        <FaqChat />
      </div>
    </section>
  );
}

/* ───────────── closing + footer ───────────── */

export function Closing() {
  return (
    <section className="s2-closing">
      <div className="s2-wrap">
        <Reveal className="s2-closing__card">
          <span className="s2-closing__arch s2-closing__arch--a" aria-hidden="true" />
          <span className="s2-closing__arch s2-closing__arch--b" aria-hidden="true" />
          <div className="s2-closing__inner">
            <h2 className="s2-closing__title">{FINAL_CTA.title}</h2>
            <div className="s2-closing__row">
              <S2Button>{FINAL_CTA.cta}</S2Button>
              <a className="s2-closing__phone" href={PHONE_HREF}>
                {PHONE_DISPLAY}
              </a>
            </div>
            <p className="s2-closing__fine">
              <strong>{FINAL_CTA.disclaimerLead}</strong> {FINAL_CTA.disclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="s2-footer">
      <div className="s2-wrap s2-footer__top">
        <div className="s2-footer__brand">
          <Image src="/brand/logo-full.png" alt="SoraCare" width={300} height={44} className="s2-footer__logo" />
          <a className="s2-footer__phone" href={PHONE_HREF}>
            {PHONE_DISPLAY}
            <S2Arrow />
          </a>
        </div>

        <nav className="s2-footer__nav" aria-label="Footer">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="s2-footer__nav">
          {FOOTER.social.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="s2-wrap s2-footer__bottom">
        <span>{FOOTER.copyright}</span>
        <div>
          {FOOTER.legal.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

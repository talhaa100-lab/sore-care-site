"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { WHY } from "../_lib/content";

const TONES = ["mint", "butter", "lilac", "sky", "coral"] as const;

const GLYPHS: Record<string, ReactNode> = {
  specialist: (
    <>
      <circle cx="44" cy="32" r="14" fill="currentColor" />
      <path d="M16 80a28 28 0 0156 0z" fill="currentColor" />
      <path
        d="M72 40c-8-5-10-11-7-15 3-3 6-1 7 2 1-3 4-5 7-2 3 4 1 10-7 15z"
        fill="var(--coral)"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </>
  ),
  steps: (
    <>
      <rect x="10" y="58" width="22" height="26" rx="7" fill="currentColor" opacity="0.35" />
      <rect x="37" y="40" width="22" height="44" rx="7" fill="currentColor" opacity="0.65" />
      <rect x="64" y="20" width="22" height="64" rx="7" fill="currentColor" />
      <circle cx="75" cy="10" r="6" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2.5" />
    </>
  ),
  paperwork: (
    <>
      <rect x="18" y="8" width="52" height="72" rx="10" fill="#fff" stroke="currentColor" strokeWidth="4" />
      <path d="M30 28h28M30 40h28M30 52h16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="68" cy="68" r="16" fill="var(--coral)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M61 68l5 5 9-10" fill="none" stroke="var(--ink)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  assessment: (
    <>
      <path d="M10 14h46a8 8 0 018 8v20a8 8 0 01-8 8H30l-12 10V50h-8a8 8 0 01-8-8V22a8 8 0 018-8z" fill="currentColor" transform="translate(2 0)" />
      <path d="M86 44H48a6 6 0 00-6 6v18a6 6 0 006 6h22l10 9v-9h6a6 6 0 006-6V50a6 6 0 00-6-6z" fill="#fff" stroke="currentColor" strokeWidth="4" transform="translate(-4 2)" />
      <circle cx="30" cy="32" r="3.4" fill="var(--paper)" />
      <circle cx="42" cy="32" r="3.4" fill="var(--paper)" />
    </>
  ),
  approval: (
    <>
      <path d="M48 8l32 12v24c0 20-14 34-32 42C30 78 16 64 16 44V20z" fill="currentColor" />
      <path d="M33 46l11 11 20-22" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export function WhyCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const base = el.clientWidth / el.scrollWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    bar.current?.style.setProperty("transform", `scaleX(${base + (1 - base) * p})`);
    const start = el.scrollLeft < 4;
    const end = el.scrollLeft >= max - 4;
    setEdge((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : 340;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="s2-why">
      <div className="s2-wrap s2-why__head">
        <div>
          <p className="s2-eyebrow">{WHY.eyebrow}</p>
          <h2 className="s2-h2">{WHY.title}</h2>
        </div>
        <div className="s2-why__ctrl">
          <button
            type="button"
            className="s2-round"
            onClick={() => go(-1)}
            disabled={edge.start}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="s2-round"
            onClick={() => go(1)}
            disabled={edge.end}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <ul ref={track} className="s2-why__track" tabIndex={0} aria-label="Why families choose us">
        {WHY.items.map((item, i) => (
          <li
            key={item.key}
            className={`s2-why__card s2-tone--${TONES[i % TONES.length]}`}
            style={{ "--i": i } as CSSProperties}
          >
            <div className="s2-why__top">
              <span className="s2-why__n">{String(i + 1).padStart(2, "0")}</span>
              <svg className="s2-why__glyph" viewBox="0 0 96 96" aria-hidden="true">
                {GLYPHS[item.key]}
              </svg>
            </div>
            <p className="s2-why__text">
              <span className="s2-why__lead">{item.lead}</span>
              <strong>{item.strong}</strong>
              <span className="s2-why__tail">{item.tail}</span>
            </p>
          </li>
        ))}
      </ul>

      <div className="s2-wrap">
        <div className="s2-why__bar" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>
    </div>
  );
}

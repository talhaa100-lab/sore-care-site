"use client";

import { useEffect, useRef } from "react";

/**
 * A statement that "reads itself" as you scroll: each word lights up in turn.
 * Scroll-linked, so it writes attributes straight to the DOM inside rAF —
 * no React state, no re-render per frame.
 */
export function ScrollWords({
  text,
  accentTail = 0,
  className = "",
}: {
  text: string;
  /** number of trailing words to tint with the accent colour once lit */
  accentTail?: number;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = -1;

    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.35 + r.height)));
      const lit = Math.ceil(p * spans.length);
      if (lit === last) return;
      last = lit;
      spans.forEach((s, i) => s.toggleAttribute("data-on", i < lit));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p ref={ref} className={`s2-sw ${className}`}>
      {words.map((w, i) => (
        <span
          key={i}
          data-w
          className={accentTail && i >= words.length - accentTail ? "is-accent" : undefined}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

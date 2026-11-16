"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

type Member = { name: string; role?: string; photo?: string; pos?: string };

const TONES = ["mint", "butter", "sky", "lilac", "coral"] as const;

/**
 * Snap-scrolling team carousel. Motion is limited to transform + opacity:
 * cards rise in with a stagger the first time the track scrolls into view, and
 * (on hover-capable pointers) the card lifts while the portrait eases up.
 */
export function TeamCarousel({ members }: { members: Member[] }) {
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const base = max > 0 ? el.clientWidth / el.scrollWidth : 1;
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

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      io.disconnect();
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : 300;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="s2-tc">
      <ul ref={track} className="s2-tc__track" tabIndex={0} aria-label="The Sora Care team">
        {members.map((m, i) => (
          <li
            key={m.name}
            className={`s2-tc__card s2-tone--${TONES[i % TONES.length]}`}
            style={{ "--i": i } as CSSProperties}
          >
            <span className={`s2-tc__photo${m.photo ? "" : " s2-tc__photo--empty"}`}>
              {m.photo ? (
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="200px"
                  unoptimized
                  style={{ objectPosition: m.pos ?? "50% 35%" }}
                />
              ) : (
                <svg viewBox="0 0 200 200" role="img" aria-label={`${m.name} (photo coming soon)`}>
                  <circle cx="100" cy="76" r="38" fill="currentColor" />
                  <path d="M24 200c0-44 34-76 76-76s76 32 76 76z" fill="currentColor" />
                </svg>
              )}
            </span>
            <p className="s2-tc__name">{m.name}</p>
            {m.role ? <p className="s2-tc__role">{m.role}</p> : null}
          </li>
        ))}
      </ul>

      <div className="s2-tc__foot">
        <div className="s2-why__bar s2-tc__bar" aria-hidden="true">
          <span ref={bar} />
        </div>
        <div className="s2-tc__ctrl">
          <button type="button" className="s2-round" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous team members">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="s2-round" onClick={() => go(1)} disabled={edge.end} aria-label="Next team members">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

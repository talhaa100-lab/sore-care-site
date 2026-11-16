"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets `data-in` once, the first time the element is comfortably on screen.
 * Pure trigger — all the motion lives in CSS keyed off `[data-in]`.
 */
export function InView({
  children,
  className = "",
  threshold = 0.35,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

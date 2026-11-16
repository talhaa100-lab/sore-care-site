"use client";

import type { ReactNode } from "react";
import { useQualify, type QualifyOptions } from "./Qualify";

export function S2Arrow() {
  return (
    <svg className="s2-btn__arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Opens the shared "See if you qualify" dialog. */
export function S2Button({
  children,
  tone = "coral",
  className = "",
  dialog,
}: {
  children: ReactNode;
  tone?: "coral" | "deep" | "mint";
  className?: string;
  /** override the dialog title / photo (e.g. "Refer a client") */
  dialog?: QualifyOptions;
}) {
  const { open } = useQualify();
  return (
    <button type="button" onClick={() => open(dialog)} className={`s2-btn s2-btn--${tone} ${className}`}>
      <span>{children}</span>
      <S2Arrow />
    </button>
  );
}

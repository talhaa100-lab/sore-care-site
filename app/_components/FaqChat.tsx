"use client";

import { useState } from "react";
import { FAQ } from "../_lib/content";

/** FAQ as a conversation: tap a question, the specialist's answer slides in. */
export function FaqChat() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="s2-chat">
      {FAQ.items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item.q} className="s2-chat__turn">
            <button
              type="button"
              className="s2-q"
              aria-expanded={isOpen}
              aria-controls={`s2-a-${i}`}
              onClick={() => toggle(i)}
            >
              <span>{item.q}</span>
              <span className="s2-q__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            <div id={`s2-a-${i}`} className="s2-a-wrap" data-open={isOpen || undefined} role="region">
              <div>
                <div className="s2-a">
                  <span className="s2-a__av" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path
                        d="M12 20.5C5 15.5 3 11.8 3 8.9 3 6.5 4.8 4.8 7 4.8c1.9 0 3.6 1.1 5 3.2 1.4-2.1 3.1-3.2 5-3.2 2.2 0 4 1.7 4 4.1 0 2.9-2 6.6-9 11.6z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <p className="s2-a__bubble">{item.a}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

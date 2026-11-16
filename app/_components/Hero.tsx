import type { CSSProperties } from "react";
import { HERO, PHONE_DISPLAY, PHONE_HREF, WHY } from "../_lib/content";
import { S2Button } from "./Buttons";

const CHIP_TONES = ["mint", "butter", "lilac"] as const;
const CHIP_TILT = ["-1.6deg", "1.2deg", "-0.8deg"];

export function Hero() {
  const parts = HERO.titleEmphasis.split(/,\s*/);
  const specialist = WHY.items[0];

  return (
    <section className="s2-hero">
      <div className="s2-wrap s2-hero__grid">
        <div className="s2-hero__copy">
          <p className="s2-pill s2-rise" style={{ "--d": 0 } as CSSProperties}>
            <HeartMark />
            Sora Care
          </p>

          <h1 className="s2-h1 s2-rise" style={{ "--d": 1 } as CSSProperties}>
            {HERO.title}{" "}
            {parts.map((p, i) => (
              <span
                key={p}
                className={`s2-chip s2-chip--${CHIP_TONES[i % 3]}`}
                style={{ "--d": i, "--r": CHIP_TILT[i % 3] } as CSSProperties}
              >
                {p}
                {i < parts.length - 1 ? "," : ""}
              </span>
            ))}
          </h1>

          <p className="s2-lede s2-rise" style={{ "--d": 3 } as CSSProperties}>
            {HERO.body}
          </p>

          <div className="s2-hero__cta s2-rise" style={{ "--d": 4 } as CSSProperties}>
            <S2Button>{HERO.cta}</S2Button>
            <a className="s2-textlink" href={PHONE_HREF}>
              or call {PHONE_DISPLAY}
            </a>
          </div>

          <ul className="s2-checks s2-rise" style={{ "--d": 5 } as CSSProperties}>
            {HERO.chips.map((c) => (
              <li key={c}>
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" fill="var(--mint)" />
                  <path
                    d="M7 12.5l3.2 3.2L17 9"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <HeroStage specialistLabel={`${specialist.lead} ${specialist.strong}`} />
      </div>
    </section>
  );
}

function HeartMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M12 20.5C5 15.5 3 11.8 3 8.9 3 6.5 4.8 4.8 7 4.8c1.9 0 3.6 1.1 5 3.2 1.4-2.1 3.1-3.2 5-3.2 2.2 0 4 1.7 4 4.1 0 2.9-2 6.6-9 11.6z"
        fill="var(--coral)"
      />
    </svg>
  );
}

/** Illustrated arch collage — all flat SVG, no photography needed. */
function HeroStage({ specialistLabel }: { specialistLabel: string }) {
  return (
    <div className="s2-stage" aria-hidden="true">
      <div className="s2-arch s2-arch--big s2-pop" style={{ "--d": 1 } as CSSProperties}>
        <svg viewBox="0 0 360 440" preserveAspectRatio="xMidYMax slice">
          {/* sky details */}
          <circle cx="278" cy="104" r="40" fill="#ffe7a3" />
          <circle cx="278" cy="104" r="58" fill="#ffe7a3" opacity="0.35" />
          <path d="M40 120h54a14 14 0 000-28 20 20 0 00-38-6 16 16 0 00-16 34z" fill="#fff" opacity="0.8" />

          {/* hills */}
          <path d="M0 318C70 282 150 292 230 316s100 14 130-6V440H0z" fill="#8fd8bd" />
          <path d="M0 362c80-30 170-18 250 0s86 6 110-6v84H0z" fill="#0f5c55" />

          {/* plant */}
          <g fill="#5cc3a0">
            <path d="M44 372c-6-34 6-58 24-70 4 30-4 54-24 70z" />
            <path d="M44 372c2-26-8-46-30-54 0 26 12 46 30 54z" />
          </g>

          {/* care recipient */}
          {/* neck + cardigan with shoulders (fully clothed) */}
          <rect x="124" y="292" width="16" height="14" rx="6" fill="#f1c7a0" />
          <path d="M92 380V334q0-30 30-34h20q30 4 30 34v46z" fill="#ffffff" />
          <path d="M122 300l10 16 10-16" fill="none" stroke="#dcd5ff" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
          {/* head */}
          <circle cx="132" cy="272" r="27" fill="#f1c7a0" />
          <path d="M105 268a27 27 0 0154 0c-11-9-43-9-54 0z" fill="#e8e4f3" />
          <circle cx="123" cy="275" r="2.4" fill="#0a2a28" />
          <circle cx="141" cy="275" r="2.4" fill="#0a2a28" />
          <path d="M125 285q7 5 14 0" fill="none" stroke="#0a2a28" strokeWidth="2" strokeLinecap="round" />
          {/* blanket on lap, both hands resting on it */}
          <path d="M88 380v-34q44-12 88 0v34z" fill="#dcd5ff" />
          <path d="M98 322q-4 18 14 30" fill="none" stroke="#e4defa" strokeWidth="14" strokeLinecap="round" />
          <path d="M166 322q4 18-14 30" fill="none" stroke="#e4defa" strokeWidth="14" strokeLinecap="round" />
          <circle cx="116" cy="352" r="9" fill="#f1c7a0" />
          <circle cx="148" cy="352" r="9" fill="#f1c7a0" />

          {/* caregiver */}
          <rect x="233" y="246" width="22" height="24" rx="8" fill="#8a5a3c" />
          <path d="M190 380v-80q0-34 34-38h40q34 4 34 38v80z" fill="#ff8f78" />
          <path d="M228 262l16 22 16-22z" fill="#8a5a3c" />
          <path d="M226 262l18 24 18-24" fill="none" stroke="#ffd2c6" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
          <g transform="translate(0 16)">
            <circle cx="244" cy="212" r="33" fill="#8a5a3c" />
            <path d="M210 208a34 34 0 0168 0c-4-20-64-20-68 0z" fill="#25150f" />
            <circle cx="234" cy="216" r="2.6" fill="#0a2a28" />
            <circle cx="254" cy="216" r="2.6" fill="#0a2a28" />
            <path d="M236 228q8 6 16 0" fill="none" stroke="#0a2a28" strokeWidth="2.2" strokeLinecap="round" />
          </g>
          {/* near arm: gently resting on the care recipient's shoulder, hand visible */}
          <path d="M202 300q-16-8-30 0" fill="none" stroke="#ff8f78" strokeWidth="20" strokeLinecap="round" />
          <ellipse cx="164" cy="302" rx="12" ry="10" fill="#8a5a3c" />
          <path d="M156 296v8M162 294v10M168 294v10" fill="none" stroke="#6e452c" strokeWidth="1.6" strokeLinecap="round" />
          {/* far arm: relaxed at the side, hand visible */}
          <path d="M290 300q14 18 6 46" fill="none" stroke="#ff8f78" strokeWidth="20" strokeLinecap="round" />
          <circle cx="296" cy="354" r="11" fill="#8a5a3c" />

          {/* floating heart */}
          <g className="s2-heart" transform="translate(188 150)">
            <path
              d="M0 30C-30 10-34-14-18-24c10-6 18-2 18 8 0-10 8-14 18-8 16 10 12 34-18 54z"
              transform="translate(0 -6) scale(.9)"
              fill="#ff8f78"
            />
          </g>
        </svg>
      </div>

      <div className="s2-arch s2-arch--sm s2-pop" style={{ "--d": 3 } as CSSProperties}>
        <svg viewBox="0 0 120 140">
          <path d="M60 24l50 38H10z" fill="#ff8f78" />
          <rect x="22" y="60" width="76" height="56" rx="8" fill="#fff" />
          <rect x="50" y="80" width="20" height="36" rx="10" fill="#0f5c55" />
          <path
            d="M60 52c-9-6-12-13-8-18 3-3 7-2 8 2 1-4 5-5 8-2 4 5 1 12-8 18z"
            fill="#fff"
          />
          <rect x="30" y="72" width="14" height="14" rx="4" fill="#cde7ff" />
          <rect x="76" y="72" width="14" height="14" rx="4" fill="#cde7ff" />
        </svg>
      </div>

      <div className="s2-orbit s2-pop" style={{ "--d": 4 } as CSSProperties}>
        <svg viewBox="0 0 160 160" className="s2-orbit__ring">
          <defs>
            <path id="s2-orbit-path" d="M80 80m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" />
          </defs>
          <text fontSize="13" fontWeight="700" letterSpacing="2.4" fill="#0a2a28">
            <textPath href="#s2-orbit-path" textLength="354" lengthAdjust="spacing">
              CLARITY • STRUCTURE • STABILITY •
            </textPath>
          </text>
        </svg>
        <span className="s2-orbit__core">
          <svg viewBox="0 0 24 24" width="26" height="26">
            <path
              d="M12 20.5C5 15.5 3 11.8 3 8.9 3 6.5 4.8 4.8 7 4.8c1.9 0 3.6 1.1 5 3.2 1.4-2.1 3.1-3.2 5-3.2 2.2 0 4 1.7 4 4.1 0 2.9-2 6.6-9 11.6z"
              fill="#ff8f78"
            />
          </svg>
        </span>
      </div>

      <div className="s2-note s2-pop" style={{ "--d": 5 } as CSSProperties}>
        <span className="s2-note__av">
          <svg viewBox="0 0 40 40" width="40" height="40">
            <circle cx="20" cy="20" r="20" fill="#b8ecd8" />
            <circle cx="20" cy="16" r="6.5" fill="#0f5c55" />
            <path d="M8 34a12 12 0 0124 0z" fill="#0f5c55" />
          </svg>
        </span>
        <span className="s2-note__txt">
          <strong>{specialistLabel}</strong>
          <small>stays with you</small>
        </span>
      </div>
    </div>
  );
}

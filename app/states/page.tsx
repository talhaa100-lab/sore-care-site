import type { Metadata } from "next";
import Image from "next/image";
import { S2Button } from "../_components/Buttons";
import { PageHero } from "../_components/PageParts";
import { Reveal } from "../_components/Reveal";
import { Closing } from "../_components/Sections";
import { HERO, STATES } from "../_lib/content";
import { STATES_PAGE } from "../_lib/pages";

export const metadata: Metadata = {
  title: "States",
  description:
    "Sora Care currently operates in Michigan, Missouri, South Dakota, and Arizona, helping family & friend caregivers navigate state programs.",
};

const TONES = ["mint", "butter", "lilac", "sky"];

export default function StatesPage() {
  return (
    <main>
      <PageHero eyebrow={STATES_PAGE.eyebrow} title={STATES_PAGE.title} compact />

      <section className="s2-section s2-statepage">
        <div className="s2-wrap">
          <ul className="s2-statepage__grid">
            {STATES.items.map((s, i) => (
              <Reveal
                as="li"
                delay={i}
                key={s.abbr}
                className={`s2-scard s2-tone--${TONES[i % TONES.length]}`}
              >
                <article id={s.state.toLowerCase().replace(/\s+/g, "-")}>
                  <div className="s2-scard__photo">
                    <Image
                      src={STATES_PAGE.images[s.state]}
                      alt={`${s.state} — ${s.program}`}
                      width={636}
                      height={870}
                      sizes="(min-width: 1100px) 280px, (min-width: 640px) 44vw, 90vw"
                    />
                    <span className="s2-scard__abbr">{s.abbr}</span>
                  </div>
                  <div className="s2-scard__body">
                    <h2>{s.state}:</h2>
                    <p className="s2-scard__program">{s.program}</p>
                    <p className="s2-scard__line">{STATES.cardLine}</p>
                    <S2Button tone="deep">{HERO.cta}</S2Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Closing />
    </main>
  );
}

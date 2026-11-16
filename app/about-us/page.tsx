import type { Metadata } from "next";
import Image from "next/image";
import { S2Button } from "../_components/Buttons";
import { PageHero, SectionHead } from "../_components/PageParts";
import { Reveal } from "../_components/Reveal";
import { TeamCarousel } from "../_components/TeamCarousel";
import { STATES } from "../_lib/content";
import { ABOUT } from "../_lib/pages";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Sora Care helps families navigate Medicaid long-term care programs when a family member or trusted friend is already providing care at home.",
};

const OPERATE_TONES = ["mint", "butter", "sky", "lilac", "coral"];

function abbr(state: string) {
  return STATES.items.find((s) => s.state === state)?.abbr ?? state.slice(0, 2).toUpperCase();
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow={ABOUT.eyebrow}
        title={ABOUT.title}
        aside={
          <div className="s2-frame">
            <Image
              src="/team/about-2.jpg"
              alt="A caregiver warmly hugging an older woman"
              width={946}
              height={808}
              sizes="(min-width: 900px) 480px, 90vw"
              priority
            />
          </div>
        }
      >
        {ABOUT.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </PageHero>

      <section className="s2-section s2-friction">
        <div className="s2-wrap">
          <div className="s2-friction__grid">
            <SectionHead title={ABOUT.friction.title} />
            <Reveal className="s2-prose" delay={1}>
              {ABOUT.friction.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal className="s2-banner">
            <Image
              src="/team/about-4.jpg"
              alt="A hand resting reassuringly on a loved one’s shoulder"
              width={1766}
              height={600}
              sizes="(min-width: 1240px) 1200px, 94vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="s2-section s2-operate">
        <div className="s2-wrap">
          <SectionHead title={ABOUT.operate.title} lead={ABOUT.operate.intro} />
          <ul className="s2-operate__list">
            {ABOUT.operate.items.map((item, i) => (
              <Reveal as="li" delay={i} key={item.state}>
                <div className={`s2-operate__card s2-tone--${OPERATE_TONES[i % OPERATE_TONES.length]}`}>
                  <span className="s2-operate__abbr">{abbr(item.state)}</span>
                  <h3>{item.state}:</h3>
                  <p>{item.program}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="s2-section s2-team" aria-labelledby="team-title">
        <div className="s2-wrap">
          <Reveal className="s2-team__head">
            <h2 id="team-title" className="s2-h2">
              {ABOUT.team.title}
            </h2>
            <p>{ABOUT.team.body}</p>
          </Reveal>

          <TeamCarousel members={ABOUT.team.members} />
        </div>
      </section>

      <section className="s2-closing s2-about-close">
        <div className="s2-wrap">
          <Reveal className="s2-closing__card s2-about-close__card">
            <div className="s2-closing__inner s2-about-close__inner">
              <div>
                <h2 className="s2-closing__title s2-about-close__title">{ABOUT.closing.title}</h2>
                <div className="s2-closing__row">
                  <S2Button>See if you qualify</S2Button>
                </div>
                <p className="s2-closing__fine">
                  <strong>{ABOUT.closing.disclaimerLead}</strong> {ABOUT.closing.disclaimer}
                </p>
              </div>
              <div className="s2-about-close__photo">
                <Image
                  src="/team/about-support.jpg"
                  alt="Two people holding hands in support"
                  width={548}
                  height={426}
                  sizes="(min-width: 900px) 360px, 80vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

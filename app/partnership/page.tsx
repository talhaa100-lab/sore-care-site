import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { S2Button } from "../_components/Buttons";
import { CheckList, PageHero, SectionHead } from "../_components/PageParts";
import { Reveal } from "../_components/Reveal";
import { Closing, States } from "../_components/Sections";
import { PARTNERSHIP as P } from "../_lib/pages";

export const metadata: Metadata = {
  title: "Partnership",
  description:
    "A reliable partner for family & friend caregiver pathways. Refer a client and we’ll guide the family through enrollment, documentation, assessments and ongoing requirements.",
};

const GOOD_FIT_ICONS = [1, 2, 3, 4, 5].map((n) => `/partnership/good-fit-icon${n}.svg`);
const STEP_TONES = ["mint", "butter", "lilac", "sky"];
const WHY_TONES = ["mint", "butter", "lilac", "sky", "coral"];

export default function PartnershipPage() {
  return (
    <main>
      <PageHero
        eyebrow={P.eyebrow}
        title={P.title}
        aside={
          <div className="s2-frame s2-frame--tall">
            <Image
              src="/partnership/partnership-pathways-image.jpg"
              alt="A caregiver pushing a smiling older man in a wheelchair outdoors"
              width={548}
              height={800}
              sizes="(min-width: 900px) 400px, 80vw"
              priority
            />
          </div>
        }
      >
        {P.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="s2-ph__callout">{P.partnersGet}</p>
        <div className="s2-ph__actions">
          <S2Button dialog={P.refer.actions[0]}>{P.refer.actions[0].label}</S2Button>
          <S2Button tone="deep" dialog={P.refer.actions[1]}>
            {P.refer.actions[1].label}
          </S2Button>
        </div>
      </PageHero>

      {/* ───────── when we're a good fit ───────── */}
      <section className="s2-section s2-fit">
        <div className="s2-wrap">
          <SectionHead title={P.fit.title} lead={P.fit.intro} />

          <ul className="s2-pills">
            {P.fit.professionals.map((name, i) => (
              <Reveal as="li" delay={i} key={name} className={`s2-pill s2-tone--${WHY_TONES[i % WHY_TONES.length]}`}>
                {name}
              </Reveal>
            ))}
          </ul>
          <Reveal className="s2-fit__note">{P.fit.note}</Reveal>

          <div className="s2-fit__when">
            <Reveal>
              <h3 className="s2-h3">{P.fit.referTitle}</h3>
            </Reveal>
            <ul className="s2-when">
              {P.fit.referWhen.map((item, i) => (
                <Reveal as="li" delay={i} key={item} className="s2-when__item">
                  <span className="s2-when__icon">
                    <Image src={GOOD_FIT_ICONS[i]} alt="" width={30} height={30} unoptimized />
                  </span>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal className="s2-notfit">{P.fit.notFit}</Reveal>
          </div>
        </div>
      </section>

      {/* ───────── what we do ───────── */}
      <section className="s2-panel s2-pwhat">
        <div className="s2-wrap s2-pwhat__grid">
          <Reveal>
            <p className="s2-eyebrow s2-eyebrow--light">{P.whatWeDo.title}</p>
            <h2 className="s2-h2 s2-pwhat__title">{P.whatWeDo.lead}</h2>
            <CheckList items={P.whatWeDo.items} tone="mint" />
            <p className="s2-pwhat__close">{P.whatWeDo.closing}</p>
          </Reveal>
          <Reveal delay={2} className="s2-pwhat__help">
            <h3>{P.whatWeDo.helpsTitle}</h3>
            <ul>
              {P.whatWeDo.helps.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <States />

      {/* ───────── how referrals work ───────── */}
      <section className="s2-section s2-refs">
        <div className="s2-wrap">
          <SectionHead title={P.referrals.title} lead={P.referrals.lead} />
          <ol className="s2-refs__list">
            {P.referrals.steps.map((s, i) => (
              <Reveal as="li" delay={i} key={s.n} className={`s2-refs__step s2-tone--${STEP_TONES[i % STEP_TONES.length]}`}>
                <span className="s2-refs__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="s2-fit__note">{P.referrals.updates}</Reveal>
        </div>
      </section>

      {/* ───────── boundaries + payment ───────── */}
      <section className="s2-section s2-duo">
        <div className="s2-wrap s2-duo__grid">
          <Reveal className="s2-duo__card s2-duo__card--mint">
            <h2 className="s2-h3">{P.boundaries.title}</h2>
            <p className="s2-duo__lead">{P.boundaries.lead}</p>
            <CheckList items={P.boundaries.items} />
          </Reveal>

          <Reveal delay={2} className="s2-duo__card s2-duo__card--butter">
            <h2 className="s2-h3">{P.paid.title}</h2>
            <p className="s2-duo__lead">{P.paid.lead}</p>
            <CheckList items={P.paid.items} />
            <p>{P.paid.body}</p>
            <h3 className="s2-duo__sub">{P.paid.notesTitle}</h3>
            <CheckList items={P.paid.notes} />
          </Reveal>
        </div>
      </section>

      {/* ───────── why partners choose us ───────── */}
      <section className="s2-section s2-pwhy">
        <div className="s2-wrap">
          <SectionHead title={P.why.title} />
          <ul className="s2-pwhy__list">
            {P.why.items.map((item, i) => (
              <Reveal as="li" delay={i} key={item.title} className="s2-pwhy__item">
                <span className="s2-pwhy__icon" style={{ "--i": i } as CSSProperties}>
                  <Image src={item.icon} alt="" width={34} height={34} unoptimized />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── refer a client ───────── */}
      <section className="s2-section s2-refer" id="refer">
        <div className="s2-wrap s2-refer__grid">
          <Reveal className="s2-refer__photo">
            <Image
              src="/partnership/partnership-refer-image.jpg"
              alt="Community support group members sharing a conversation"
              width={1083}
              height={750}
              sizes="(min-width: 900px) 560px, 90vw"
            />
          </Reveal>
          <Reveal delay={2} className="s2-refer__copy">
            <h2 className="s2-h2">{P.refer.title}</h2>
            <p className="s2-sh__lead">{P.refer.lead}</p>
            <CheckList items={P.refer.items} />
            <div className="s2-refer__actions">
              {P.refer.actions.map((a, i) => (
                <S2Button key={a.label} tone={i === 0 ? "coral" : i === 1 ? "deep" : "mint"} dialog={a}>
                  {a.label}
                </S2Button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Closing />
    </main>
  );
}

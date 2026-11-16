import { PageHero } from "./PageParts";
import { Closing } from "./Sections";
import type { LegalSection } from "../_lib/pages";

/** Shared layout for Terms & Conditions and Privacy Policy. */
export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <main>
      <PageHero eyebrow="Legal" title={title} compact />

      <section className="s2-section s2-legal">
        <div className="s2-wrap s2-legal__wrap">
          <nav className="s2-legal__toc" aria-label={`${title} sections`}>
            <ol>
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#sec-${i}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="s2-legal__doc">
            {sections.map((s, i) => (
              <section key={s.heading} id={`sec-${i}`} className="s2-legal__sec">
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>

      <Closing />
    </main>
  );
}

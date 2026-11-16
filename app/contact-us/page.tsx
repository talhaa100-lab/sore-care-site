import type { Metadata } from "next";
import { MailIcon, PageHero, PhoneIcon } from "../_components/PageParts";
import { Reveal } from "../_components/Reveal";
import { PHONE_DISPLAY, PHONE_HREF } from "../_lib/content";
import { CONTACT, EMAIL } from "../_lib/pages";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call or email the Sora Care team — we would love to speak with you.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow={CONTACT.eyebrow}
        title={CONTACT.title}
        aside={
          <ul className="s2-contact">
            <Reveal as="li">
              <a className="s2-contact__card s2-tone--mint" href={PHONE_HREF}>
                <span className="s2-contact__icon">
                  <PhoneIcon />
                </span>
                <span className="s2-contact__label">{CONTACT.call}</span>
                <span className="s2-contact__value">{PHONE_DISPLAY}</span>
              </a>
            </Reveal>
            <Reveal as="li" delay={1}>
              <a className="s2-contact__card s2-tone--butter" href={`mailto:${EMAIL}`}>
                <span className="s2-contact__icon">
                  <MailIcon />
                </span>
                <span className="s2-contact__label">{CONTACT.email}</span>
                <span className="s2-contact__value">{EMAIL}</span>
              </a>
            </Reveal>
          </ul>
        }
      >
        <p>{CONTACT.lede}</p>
      </PageHero>
    </main>
  );
}

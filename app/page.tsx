import { Hero } from "./_components/Hero";
import { Closing, Faq, Journey, States, Statement, Who } from "./_components/Sections";
import { WhyCarousel } from "./_components/WhyCarousel";

export default function Home() {
  return (
    <main>
      <Hero />
      <Statement />
      <section className="s2-section s2-why-section" aria-label="Why families choose us">
        <WhyCarousel />
      </section>
      <Who />
      <Journey />
      <States />
      <Faq />
      <Closing />
    </main>
  );
}

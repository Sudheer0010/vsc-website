import React from "react";
import Image from "next/image";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { VSCButton } from "@/components/ui/vsc/VSCButton";
import { BeliefSection } from "@/components/sections/home/BeliefSection";
import { Compliance } from "@/components/sections/home/Compliance";
import { marketLetters, sortedMonths } from "@/data/market-letters";

/**
 * About — Editorial Signal.
 *
 * Same visual language as the redesigned homepage (ContourField seed 71,
 * Reveal springs, StepRule, the editorial serif accent) rather than the
 * page's previous separate cream/dot system. The arc mirrors the
 * homepage's own dark → light chapter rhythm: a cinematic dark hero, a
 * light editorial founder profile, a sunk-canvas origin ledger, a dark
 * lessons break, a dark quote moment, then a light close that hands off
 * into the real Compliance strip and footer.
 */

const earliestMonthKey = sortedMonths[sortedMonths.length - 1];
const earliestLetter = marketLetters[earliestMonthKey];

const researchJourney = [
  { year: "2018", label: "Markets" },
  { year: "2022", label: "Framework" },
  { year: "2024", label: "Process" },
  { year: "2026", label: "VSC" },
];

const originSteps = [
  {
    number: "01",
    year: "2021",
    title: "First systematic framework written down.",
    description: "Rules for entry, sizing, and exit recorded before use rather than after.",
  },
  {
    number: "02",
    year: "2024",
    title: "Process rebuilt around capital preservation.",
    description: "Risk defined before entry; position size derived from the stop, not from conviction.",
  },
  {
    number: "03",
    year: "2025",
    title: "Research expanded to US equities.",
    description: "Same framework applied across two markets.",
  },
  {
    number: "04",
    year: "2026",
    title: "VSC Capital & Advisory founded. Publishing since January.",
    description: "Built as a research desk that publishes its process, not a brokerage or tip service.",
  },
];


export default function About() {

  return (
    <main className="relative w-full bg-canvas">
      {/* ================================================================
          1. HERO — Cinematic Signal, ported from the homepage arrival.
          Same dark register, same ContourField seed (71) as the homepage
          hero and Five Gates — the same signal recurring, not a lookalike,
          so About reads as the same world from the first screen.
         ================================================================ */}
      <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#080F0B] pb-20 pt-32 sm:pb-28 sm:pt-40">
        <ContourField seed={71} layers={3} density={10} strokeColor="#7FB999" baseOpacity={0.85} animate />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 55% at 30% 20%, rgba(63,203,116,0.18) 0%, transparent 68%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]">
                  About VSC
                </span>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-6 font-sans text-[12vw] font-bold leading-[0.96] tracking-[-0.03em] text-[#F4F7F4] sm:text-[7vw] lg:text-[4.6vw]">
                  <span className="block text-balance">Built from markets.</span>
                  <span className="block text-balance">Built to keep learning.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-8 max-w-[50ch] text-[18px] leading-relaxed text-white/60">
                  VSC Capital &amp; Advisory is a research-led markets business built around education, disciplined
                  decision-making and serious market participation.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2 border-t border-white/10 pt-6">
                  <span className="text-[15px] font-medium text-white/90">Sudheer Vobhilineni</span>
                  <span className="text-[13px] text-white/40">Founder, VSC Capital &amp; Advisory</span>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#7FB999]">
                  Publishing since {earliestLetter.month.charAt(0) + earliestLetter.month.slice(1).toLowerCase()}{" "}
                  {earliestLetter.year} · Systematic · Capital preservation first
                </p>
              </Reveal>

              {/* Compact journey — mobile only, so the rail on the right
                  never has to collapse awkwardly into the copy column. */}
              <Reveal delay={0.26}>
                <div className="mt-8 flex items-center gap-2 lg:hidden" aria-hidden="true">
                  {researchJourney.map((step, idx) => (
                    <React.Fragment key={step.year}>
                      {idx > 0 && <span className="text-[11px] text-white/25">&rarr;</span>}
                      <span className="font-mono text-[11px] tracking-[0.05em] text-[#7FB999] tabular-nums">
                        {step.year}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Research journey rail — same annotation device as the
                previous page, restyled for the dark register. Desktop only. */}
            <Reveal delay={0.2} className="hidden lg:col-span-5 lg:flex lg:justify-end">
              <div className="relative shrink-0 pl-[27px]">
                <span aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-px bg-white/15" />
                <div className="flex flex-col gap-8">
                  {researchJourney.map((step) => (
                    <div key={step.year} className="relative flex items-baseline gap-3">
                      <span aria-hidden="true" className="absolute -left-[27px] top-[6px] h-[7px] w-[7px] rounded-full bg-[#3FCB74]" />
                      <span className="font-mono text-[13.5px] tracking-[0.04em] text-[#7FB999] tabular-nums">
                        {step.year}
                      </span>
                      <span className="text-[14.5px] text-white/55">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. THE RESEARCHER — founder letter as an editorial profile
          spread, not a fact panel. Real photo, framed larger and with
          intent; drop cap and a pull-line carry the editorial register.
         ================================================================ */}
      <section className="relative w-full overflow-hidden border-b border-rule bg-surface py-24 sm:py-32">
        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
            {/* Photo column */}
            <Reveal className="lg:col-span-5">
              <div className="relative mx-auto max-w-[300px] sm:max-w-[360px] lg:mx-0 lg:max-w-[420px]">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 h-full w-full rounded bg-growth-tint sm:-bottom-5 sm:-right-5"
                />
                <Image
                  src="/images/sudheer.png"
                  alt="Sudheer Vobhilineni, founder of VSC Capital & Advisory"
                  width={468}
                  height={585}
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 300px"
                  className="relative h-auto w-full rounded border border-rule-strong shadow-lift-2"
                />
              </div>
              <p className="mx-auto mt-6 max-w-[300px] text-center font-mono text-[12px] tracking-[0.04em] text-ink-faint sm:max-w-[360px] lg:mx-0 lg:max-w-[420px] lg:text-left">
                Sudheer Vobhilineni — Founder, VSC Capital &amp; Advisory
              </p>
            </Reveal>

            {/* Text column */}
            <Reveal delay={0.08} className="lg:col-span-7">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
                The Researcher
              </span>

              <h2 className="font-editorial mt-5 text-[13vw] italic leading-[1.05] text-ink sm:text-[6vw] lg:text-[3.6vw]">
                Hi, I&apos;m Sudheer.
              </h2>

              <div className="mt-8 max-w-[58ch] space-y-6 text-[17px] leading-[1.75] text-ink-soft">
                <p className="first-letter:font-editorial first-letter:float-left first-letter:mr-3 first-letter:text-[64px] first-letter:italic first-letter:font-normal first-letter:leading-[0.82] first-letter:text-growth">
                  I started trading in 2019, while I was preparing for the UPSC exam. In 2023 I lost 41% of my
                  capital averaging into losers — the single most expensive lesson I&apos;ve had. Every rule I use
                  now came out of that year: define the risk before entry, size by formula, exit by plan.
                </p>

                <p className="font-editorial max-w-[46ch] text-[19px] italic leading-snug text-growth-deep">
                  Define the risk before entry. Size by formula. Exit by plan.
                </p>

                <p>
                  I built VSC to publish that process rather than sell predictions. The letters show how I think.
                  You can decide from those whether it&apos;s worth a conversation.
                </p>
              </div>

              <div className="mt-10 h-px w-12 bg-growth" />
              <p className="mt-1 font-signature text-5xl leading-none text-ink">Sudheer</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. WHERE IT ALL BEGAN — a horizontal ledger, not a beige rail.
          Four columns share one spine; alternating baselines give the
          sequence a printed, drafting-table rhythm on desktop, and fold to
          a simple left-rule stack on mobile so nothing scrolls sideways.
         ================================================================ */}
      <section className="relative w-full overflow-hidden border-b border-rule bg-canvas-sunk py-24 sm:py-32">
        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
              The origin
            </span>
            <h2 className="font-editorial mt-5 max-w-[16ch] text-[11vw] italic leading-[1.05] text-ink sm:text-[5vw] lg:text-[2.8vw]">
              Where it all began.
            </h2>
          </Reveal>

          <div className="relative mt-16 sm:mt-20">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[15px] hidden h-px bg-rule-strong lg:block" />

            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-10">
              {originSteps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.06}>
                  <div className="relative border-l border-rule pl-6 lg:border-l-0 lg:pl-0 lg:pt-9">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full bg-growth ring-4 ring-canvas-sunk lg:left-0 lg:top-[11px]"
                    />
                    <div className={i % 2 === 1 ? "lg:mt-14" : ""}>
                      <span className="font-mono text-[13px] tracking-[0.08em] text-growth tabular-nums">
                        {step.year}
                      </span>
                      <h3 className="font-display mt-2 text-[19px] font-semibold leading-snug tracking-tight text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 max-w-[30ch] text-[14.5px] leading-relaxed text-ink-soft">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. THREE PRINCIPLES — moved here as-is from the homepage.
         ================================================================ */}
      <BeliefSection />

      {/* ================================================================
          5. QUOTE — a deliberate dark punctuation moment (the homepage's
          Risk-section role), not a flat mint-coloured slide. Bookends the
          hero's dark register before the page returns to daylight.
         ================================================================ */}
      <section className="relative w-full overflow-hidden bg-[#080F0B] py-28 sm:py-40">
        <ContourField seed={22} layers={2} density={6} strokeColor="#3FCB74" baseOpacity={0.5} animate />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 65% 60% at 50% 45%, rgba(63,203,116,0.20) 0%, transparent 72%)",
          }}
        />
        <span
          aria-hidden="true"
          className="font-editorial pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[60vw] [font-style:italic] leading-none text-white/[0.03] sm:text-[30vw]"
        >
          &rdquo;
        </span>

        <div className="relative mx-auto max-w-[1100px] px-6 text-center sm:px-10">
          <Reveal>
            <h2 className="font-editorial mx-auto max-w-[18ch] text-[12vw] [font-style:italic] leading-[1.12] text-vsc-dark-ink sm:text-[7vw] lg:text-[4.4vw]">
              &ldquo;Clarity <span className="text-sprout">compounds</span> over time.&rdquo;
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-[#7FB999]">
              — Sudheer Vobhilineni, Founder
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          6. CLOSE — asymmetric, matching the homepage's own closing CTA
          rhythm, then a straight handoff into the real Compliance strip
          and footer rather than a second, unrelated ending.
         ================================================================ */}
      <section className="relative w-full overflow-hidden py-24 sm:py-32">
        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 className="font-editorial max-w-[16ch] text-[13vw] italic leading-[1.05] text-ink sm:text-[6vw] lg:text-[3.6vw]">
                  See where VSC can help.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-ink-soft">
                  Education, research-led decision-making and community — built for different stages of your market
                  journey.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lg:col-span-4 lg:text-right">
              <VSCButton href="/offerings" variant="growth" className="min-h-[52px] px-9 text-[17px]">
                Explore offerings <span aria-hidden="true">&rarr;</span>
              </VSCButton>
            </Reveal>
          </div>
        </div>
      </section>

      <Compliance />
    </main>
  );
}

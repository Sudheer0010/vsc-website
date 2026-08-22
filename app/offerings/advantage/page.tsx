import React from "react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { SubPageHero } from "@/components/sections/offerings/SubPageHero";
import { RiskGatesChart } from "@/components/sections/offerings/RiskGatesChart";
import { ClosingCTA } from "@/components/sections/offerings/ClosingCTA";
import { Exhibit } from "@/components/ui/vsc/Exhibit";

/**
 * VSC Advantage — process review, not portfolio management. Framed as
 * looking at how a trader decides, sizes risk and learns from past trades,
 * never as personalised investment advice or ongoing advisory (VSC isn't
 * registered as a SEBI Investment Adviser).
 */

const REVIEW_AREAS = [
  {
    number: "01",
    label: "Your process",
    heading: "How do you choose a trade?",
    body: "Look at the rules you use to find, enter and exit opportunities.",
  },
  {
    number: "02",
    label: "Your risk",
    heading: "How much are you putting at risk?",
    body: "Review position sizing, stop-loss discipline and whether one bad trade can hurt too much.",
  },
  {
    number: "03",
    label: "Your decisions",
    heading: "Where do mistakes keep repeating?",
    body: "Review past trades to find impulsive entries, early exits, oversizing and broken rules.",
  },
];

export default function AdvantagePage() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <PaperGrain />
      <AmbientLightPool color="rgba(15, 122, 64, 0.05)" className="left-[50%] top-[25%] -translate-x-1/2 scale-[1.5]" />

      <main className="relative w-full z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* --- Hero --------------------------------------------------- */}
          <div className="mb-16 sm:mb-20">
            <SubPageHero
              eyebrow="Offerings // VSC Advantage"
              title="VSC Advantage"
              description="Turn scattered decisions into a clear process."
            />
            <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-soft">
              Review how you choose trades, manage risk and learn from past
              decisions — then find where the process keeps breaking.
            </p>
          </div>

          {/* --- Risk exhibit --------------------------------------------- */}
          <div className="mb-20">
            <Exhibit
              number={1}
              label="Risk is decided before the trade."
              caption="Illustration of the process — not a live portfolio or recommendation."
            >
              <RiskGatesChart />
            </Exhibit>
          </div>

          {/* --- What we review — three areas, not six cards --------------- */}
          <h2 className="mb-10 font-display text-2xl font-normal tracking-tight text-ink sm:text-3xl">
            What we review.
          </h2>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {REVIEW_AREAS.map((area) => (
              <div key={area.number}>
                <span className="font-mono text-sm font-semibold text-growth">
                  {area.number}
                </span>
                <span className="ml-2 font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                  {area.label}
                </span>
                <h3 className="mt-3 font-display text-[19px] font-semibold leading-snug tracking-tight text-ink">
                  {area.heading}
                </h3>
                <p className="mt-2.5 max-w-[30ch] text-[15px] leading-relaxed text-ink-soft">
                  {area.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Better decisions before better returns. -------------------
            Short, one line, dark — same treatment as VSC Community's
            identity band. No supporting paragraph, so it doesn't add
            length to an already-short page. */}
        <div className="my-20 w-full bg-vsc-dark py-14 sm:py-16">
          <div className="container max-w-[720px] mx-auto px-4 text-center sm:px-6">
            <h2 className="font-display text-[clamp(24px,3.4vw,36px)] font-semibold tracking-tight text-vsc-dark-ink">
              Better decisions before better returns.
            </h2>
          </div>
        </div>
      </main>

      <ClosingCTA
        headline="Want to find where your process is breaking?"
        subline="Tell us how you currently trade and what you're struggling with."
        ctaLabel="Enquire →"
      />
    </div>
  );
}

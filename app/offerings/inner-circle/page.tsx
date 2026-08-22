import React from "react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { SubPageHero } from "@/components/sections/offerings/SubPageHero";
import { ClosingCTA } from "@/components/sections/offerings/ClosingCTA";
import { Exhibit } from "@/components/ui/vsc/Exhibit";

/**
 * VSC Community — the route stays /offerings/inner-circle (see
 * offeringsConfig.ts) since Inner Circle isn't gone, just no longer this
 * page's framing: it may return later as a smaller invite-only layer
 * inside the community this page now describes.
 */

const FLOW_STEPS = [
  {
    number: "01",
    title: "BRING AN IDEA",
    body: "A market observation, stock, sector or question worth discussing.",
  },
  {
    number: "02",
    title: "DISCUSS IT",
    body: "Hear how other participants see it.",
  },
  {
    number: "03",
    title: "CHALLENGE IT",
    body: "Look for what may be missing or wrong.",
  },
  {
    number: "04",
    title: "LEARN FROM IT",
    body: "Take the useful part back into your own process.",
  },
];

const INSIDE = [
  {
    number: "01",
    word: "DISCUSS.",
    body: "Talk through markets, sectors, companies and trading ideas.",
  },
  {
    number: "02",
    word: "CHALLENGE.",
    body: "Hear another view before becoming too attached to your own.",
  },
  {
    number: "03",
    word: "IMPROVE.",
    body: "Learn from other participants, review mistakes and sharpen your process.",
  },
];

const FIT_POINTS = [
  "You understand the basics and want to keep learning.",
  "You enjoy discussing why an idea may be right or wrong.",
  "You want thoughtful market conversations instead of constant alerts.",
  "You're willing to contribute, not only consume.",
];

export default function InnerCirclePage() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <PaperGrain />
      <AmbientLightPool color="rgba(93, 139, 115, 0.05)" className="left-[50%] top-[25%] -translate-x-1/2 scale-[1.5]" />

      <main className="relative w-full z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* --- Hero --------------------------------------------------- */}
          <div className="mb-16 sm:mb-20">
            <SubPageHero
              eyebrow="Offerings // VSC Community"
              title="VSC Community"
              description="Get better around people who take markets seriously."
            />
            <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-soft">
              A place to discuss markets, share what you&apos;re learning,
              challenge ideas and keep improving — without tips, noise or
              hype.
            </p>
            <p className="mt-3 max-w-[58ch] text-[14px] text-ink-faint">
              Learn from the discussion. Contribute when you have something
              useful to add.
            </p>
          </div>

          {/* --- How the community works --------------------------------
              Same dark Exhibit treatment used elsewhere on the site, with
              a four-step flow in place of the old month-in-the-life rail. */}
          <div className="mb-20 rounded-vsc-xl bg-vsc-dark p-6 sm:p-8">
            <Exhibit
              number={1}
              label="How the community works"
              caption="Four steps, repeated with whatever you bring — not a fixed schedule."
              variant="dark"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:gap-6">
                {FLOW_STEPS.map((step) => (
                  <div key={step.number}>
                    <span className="font-mono text-sm font-semibold text-vsc-dark-accent">
                      {step.number}
                    </span>
                    <h3 className="mt-2 font-display text-[15px] font-semibold tracking-tight text-vsc-dark-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-snug text-vsc-dark-ink-muted">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </Exhibit>
          </div>

          {/* --- What happens inside — three principles, not six cards --- */}
          <h2 className="mb-10 font-display text-2xl font-normal tracking-tight text-ink sm:text-3xl">
            What happens inside.
          </h2>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {INSIDE.map((item) => (
              <div key={item.number}>
                <span className="font-mono text-sm font-semibold text-growth">
                  {item.number}
                </span>
                <div className="mt-3 font-display text-[clamp(28px,3.6vw,38px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
                  {item.word}
                </div>
                <p className="mt-2.5 max-w-[28ch] text-[15px] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- No calls. No tips. No noise. ------------------------------
            Short, strong, dark — same surface family as the process
            exhibit above, full-bleed so it reads as a distinct band. */}
        <div className="my-20 w-full bg-vsc-dark py-16 sm:py-20">
          <div className="container max-w-[720px] mx-auto px-4 text-center sm:px-6">
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-vsc-dark-ink">
              No calls. No tips. No noise.
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-[16px] leading-relaxed text-vsc-dark-ink-muted">
              VSC Community isn&apos;t a signal group. The value is in the
              discussion — not somebody telling you what to buy.
            </p>
          </div>
        </div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* --- Who it's for -------------------------------------------- */}
          <h2 className="mb-8 font-display text-2xl font-normal tracking-tight text-ink sm:text-3xl">
            This may fit if...
          </h2>
          <ul className="max-w-[640px] flex flex-col gap-3.5">
            {FIT_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-soft">
                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-growth" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <ClosingCTA
        headline="Interested in joining?"
        subline="VSC Community is being built for people who want serious market discussion without the usual noise."
        ctaLabel="Join the community →"
        faqLabel="Already have a question? See the FAQ →"
      />
    </div>
  );
}

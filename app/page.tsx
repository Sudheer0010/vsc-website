import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Compliance } from "@/components/sections/home/Compliance";
import { DrawdownStory } from "@/components/sections/home/DrawdownStory";
import { ExposureInstrument } from "@/components/sections/home/ExposureInstrument";
import { HowWeHelpSection } from "@/components/sections/home/HowWeHelpSection";
import { ProcessStepper } from "@/components/sections/home/ProcessStepper";
import { ResearchDeskSection } from "@/components/sections/home/ResearchDeskSection";
import { RiskSection } from "@/components/sections/home/RiskSection";
import { WhyVscExists } from "@/components/sections/home/WhyVscExists";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { VSCButton } from "@/components/ui/vsc/VSCButton";

/**
 * Homepage — Daylight Growth.
 *
 * The page is a server component now. Only the four pieces that genuinely
 * respond to input or scroll are client components; everything else ships as
 * static HTML. The old version marked the whole route "use client" so that a
 * text scramble effect could run in the hero.
 *
 * The arc: show the difference → say who it's for → walk the method →
 * state the belief → draw the contrast → pause → offer evidence → invite.
 * Each band answers exactly one question and then stops.
 */
export default function Home() {
  return (
    <>
      <main className="relative w-full bg-canvas">
        {/* ================================================================
            ARRIVAL
            Asymmetric, not centred. The left column makes the claim; the
            right column lets you test it. Putting the interactive object
            in the hero means the first thing a visitor does on this site
            is operate the idea rather than read about it.
           ================================================================ */}
        <section
          id="arrival"
          className="relative z-10 w-full overflow-hidden border-b border-white/10 bg-[#080F0B] pb-24 pt-28 sm:pb-32 sm:pt-36"
        >
          {/* Cinematic Signal — ported from Design Lab Direction B
              (/design-lab/b, Hero). Seed 71 is reused in the Five Gates
              section below — the same signal, not a lookalike. */}
          {/* id is the WhyVscExists chapter's hook for the hero→chapter
              handoff — it fades this field out over the hero's last stretch
              of scroll rather than converging it into the chapter's price
              line (see WhyVscExists.tsx for why). */}
          <div id="wvce-hero-contour">
            <ContourField seed={71} layers={3} density={10} strokeColor="#7FB999" baseOpacity={0.9} animate />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 60% 55% at 50% 15%, rgba(63,203,116,0.20) 0%, transparent 68%)",
            }}
          />
          {/* A second, slower light source behind the headline — the one
              place this hero gets ambient depth rather than a flat wash.
              Static position, breathing opacity/scale only; never drifts
              far enough to read as a moving object. Contained by the
              section's own overflow-hidden, same as the field above. */}
          <div aria-hidden="true" className="vsc-hero-glow pointer-events-none absolute left-[6%] top-[12%] h-[620px] w-[620px] rounded-full" />

          <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
            <div className="grid gap-16 lg:grid-cols-12 lg:items-end lg:gap-14">
              <div className="lg:col-span-7">
                <Reveal>
                  <h1 className="font-sans text-[13vw] font-bold leading-[0.94] tracking-[-0.03em] text-[#F4F7F4] sm:text-[7vw] lg:text-[5vw]">
                    A smarter way to build and protect capital.
                  </h1>
                </Reveal>

                {/* Primary + a quiet secondary, not two equal buttons. The
                    free portfolio check is the ask worth making before the
                    page has proven anything — it costs the visitor nothing
                    to find out where they stand. Research stays one tap
                    away as understated text, not a competing button.
                    Delayed to settle after the instrument has begun filling,
                    so the eye reads headline → instrument → action in order
                    instead of everything landing on the same beat. */}
                <Reveal delay={0.26}>
                  <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <VSCButton href="/enquire?portfolio=1" variant="growth">
                      <span className="inline-flex items-center gap-2">
                        Get a free portfolio strength check
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </VSCButton>
                    <Link
                      href="/research"
                      className="link-underline inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-medium text-white/55 transition-colors hover:text-[#7FB999]"
                    >
                      Read the research
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>

                <Reveal delay={0.38}>
                  <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-5">
                    <StepRule size="sm" className="shrink-0" />
                    <p className="max-w-[40ch] text-[14.5px] leading-snug text-white/50">
                      (SEBI RA registration ongoing)
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* The instrument arrives just after the headline settles,
                  fully contained within the hero — no overlap past the
                  section's own bottom edge. */}
              <div className="lg:col-span-5">
                <Reveal delay={0.14} distance={24} className="w-full max-w-[420px] lg:ml-auto">
                  <ExposureInstrument />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <WhyVscExists />

        <DrawdownStory />

        <ProcessStepper />

        <HowWeHelpSection />

        <RiskSection />

        <ResearchDeskSection />

        {/* ================================================================
            ACTION — Luminous Editorial (ported from /design-lab/home-a).
            An asymmetric final act, not a centred text island: the
            statement runs large and left, the button sits right and low,
            against a luminous mesh wash that echoes the arrival hero.
           ================================================================ */}
        <section id="action" className="relative w-full overflow-hidden py-32 sm:py-40">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              className="home-cta-mesh"
              style={{
                position: "absolute",
                inset: "-15%",
                background:
                  "radial-gradient(ellipse 60% 55% at 80% 30%, rgba(15,122,64,0.14) 0%, transparent 62%)," +
                  "radial-gradient(ellipse 55% 60% at 15% 80%, rgba(63,203,116,0.10) 0%, transparent 60%)",
                filter: "blur(10px)",
              }}
            />
          </div>
          <div className="relative container mx-auto max-w-[1400px] px-6 sm:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Reveal className="flex items-center gap-3">
                  <StepRule size="md" />
                  <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
                    Not sure where to begin?
                  </span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="font-editorial mt-6 max-w-[14ch] text-[16vw] leading-[0.92] text-ink sm:text-[8vw] lg:text-[5.6vw]">
                    Start here.
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-6 max-w-[52ch] text-[18px] leading-relaxed text-ink-soft">
                    A short path through what VSC believes, how the process works, and the work behind it.
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.15} className="lg:col-span-4 lg:text-right">
                <VSCButton href="/start" variant="growth" className="min-h-[52px] px-9 text-[17px]">
                  Start here <span aria-hidden="true">&rarr;</span>
                </VSCButton>
                <div className="mt-5">
                  <Link href="/enquire" className="font-mono text-[13px] text-ink-muted hover:text-growth">
                    Already know what you&apos;re looking for? Enquire &rarr;
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Compliance />
      </main>
    </>
  );
}

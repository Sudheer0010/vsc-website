import { BeliefSection } from "@/components/sections/home/BeliefSection";
import { Compliance } from "@/components/sections/home/Compliance";
import { DrawdownStory } from "@/components/sections/home/DrawdownStory";
import { ExposureInstrument } from "@/components/sections/home/ExposureInstrument";
import { HowWeHelpSection } from "@/components/sections/home/HowWeHelpSection";
import { ProcessStepper } from "@/components/sections/home/ProcessStepper";
import { ResearchDeskSection } from "@/components/sections/home/ResearchDeskSection";
import { InstitutionalBriefing } from "@/components/ui/vsc/InstitutionalBriefing";
import { ReflectionBlock } from "@/components/ui/vsc/ReflectionBlock";
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
          className="relative w-full overflow-hidden border-b border-rule pb-16 pt-32 sm:pb-24 sm:pt-40"
        >
          {/* Paper grain rather than a dark photograph — a real, felt
              surface instead of flat digital white. */}
          <div
            aria-hidden="true"
            className="paper-texture pointer-events-none absolute inset-0 opacity-70"
            style={{
              maskImage:
                "radial-gradient(ellipse 85% 75% at 68% 40%, #000 20%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 75% at 68% 40%, #000 20%, transparent 78%)",
            }}
          />
          {/* A warm glow the instrument sits in, so the card reads as
              grounded on the page rather than floating on flat white. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full blur-[130px]"
            style={{ background: "radial-gradient(circle, rgba(15,122,64,0.12) 0%, transparent 70%)" }}
          />
          {/* A large, faint step-rule watermark — the signature mark given
              room to be a real graphic instead of a small inline accent. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-6 bottom-0 hidden items-end gap-[10px] opacity-[0.05] sm:flex"
          >
            <span className="block h-[70px] w-[26px] rounded-md bg-ink" />
            <span className="block h-[120px] w-[26px] rounded-md bg-ink" />
            <span className="block h-[180px] w-[26px] rounded-md bg-ink" />
          </div>

          <div className="container relative mx-auto max-w-[1120px]">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <Reveal>
                  <span className="eyebrow">Process over prediction</span>
                </Reveal>

                <Reveal delay={0.06}>
                  <h1 className="max-w-[15ch] font-display text-ink">
                    A smarter way to build and protect capital.
                  </h1>
                </Reveal>

                <Reveal delay={0.12}>
                  <p className="mt-6 max-w-[46ch] text-[19px] leading-relaxed text-ink-soft">
                    A rules-based framework for market structure, trend strength
                    and risk. It decides how much capital is deployed — and
                    when none of it should be.
                  </p>
                </Reveal>

                {/* One button, not two. "Enquire" already sits in the nav on
                    every page — repeating it here, before the page has made
                    any case at all, just asks twice in the first screen.
                    The hero's job is to earn the ask made at the bottom. */}
                <Reveal delay={0.18}>
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <VSCButton href="/research" variant="growth">
                      Read the research
                    </VSCButton>
                  </div>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="mt-10 flex items-center gap-3 border-t border-rule pt-5">
                    <StepRule size="sm" className="shrink-0" />
                    <p className="max-w-[40ch] text-[14.5px] leading-snug text-ink-muted">
                      Educational and research work only. VSC is applying for
                      SEBI Research Analyst registration.
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-6">
                <Reveal delay={0.1} distance={20}>
                  <ExposureInstrument />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <DrawdownStory />

        <HowWeHelpSection />

        <ProcessStepper />

        <BeliefSection />

        {/* ================================================================
            CONTRAST
            The narrowest, most defensible version of the claim: a fund with
            an always-invested mandate cannot do this. I can.
           ================================================================ */}
        <section id="proof" className="relative w-full border-b border-rule bg-canvas-sunk py-20 sm:py-28">
          <div className="container mx-auto max-w-[1120px]">
            <Reveal className="max-w-[54ch]">
              <span className="eyebrow">Where the mandate differs</span>
              <h2 className="font-display text-ink">
                A fund must stay invested. I don&apos;t have to.
              </h2>
            </Reveal>

            <div className="mt-10 sm:mt-14">
              <InstitutionalBriefing />
            </div>
          </div>
        </section>

        <ReflectionBlock question="If markets get riskier, should your portfolio stay fully invested?" />

        <ResearchDeskSection />

        {/* ================================================================
            ACTION
            One heading, one button, and room around both. Nothing here is
            urgent, so nothing here should look urgent.
           ================================================================ */}
        <section id="action" className="relative w-full bg-canvas py-24 sm:py-32">
          <div className="container mx-auto max-w-[1120px]">
            <Reveal className="mx-auto flex max-w-[24ch] flex-col items-center text-center">
              <StepRule size="lg" />
              <h2 className="mt-7 font-display text-ink">
                Build a better process. Start with a conversation.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[18px] leading-relaxed text-ink-soft">
                No pitch and no obligation — a discussion about how you
                currently decide, and whether a framework would help.
              </p>
              <div className="mt-9">
                <VSCButton href="/enquire" variant="growth" className="px-8 text-[17px]">
                  Enquire
                </VSCButton>
              </div>
            </Reveal>
          </div>
        </section>

        <Compliance />
      </main>
    </>
  );
}

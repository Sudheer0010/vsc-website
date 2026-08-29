"use client";

import { ExposureInstrument } from "@/components/sections/home/ExposureInstrument";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { VSCButton } from "@/components/ui/vsc/VSCButton";

/**
 * Verbatim copy of the production hero (app/page.tsx `#arrival`) —
 * Direction B / Cinematic Signal, already shipped. Duplicated here rather
 * than imported so this lab can exist without touching any production
 * file. Not to be redesigned in this pass; both home-a and home-c render
 * this unchanged as the fixed anchor the rest of the page is judged
 * against.
 */
export function ProductionHero() {
  return (
    <section
      id="arrival"
      className="relative w-full overflow-hidden border-b border-white/10 bg-[#080F0B] pb-24 pt-28 sm:pb-32 sm:pt-36"
    >
      <ContourField seed={71} layers={3} density={10} strokeColor="#7FB999" baseOpacity={0.9} animate />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 50% 15%, rgba(63,203,116,0.20) 0%, transparent 68%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]">
                Process over prediction
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 font-sans text-[13vw] font-bold leading-[0.94] tracking-[-0.03em] text-[#F4F7F4] sm:text-[7vw] lg:text-[5vw]">
                A smarter way to build and protect capital.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-white/60">
                A rules-based framework for market structure, trend strength
                and risk. It decides how much capital is deployed — and
                when none of it should be.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <VSCButton href="/research" variant="growth">
                  Read the research
                </VSCButton>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-5">
                <StepRule size="sm" className="shrink-0" />
                <p className="max-w-[40ch] text-[14.5px] leading-snug text-white/50">
                  Educational and research work only. VSC is applying for
                  SEBI Research Analyst registration.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1} distance={20} className="w-full max-w-[420px] lg:ml-auto">
              <ExposureInstrument />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

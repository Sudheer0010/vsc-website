"use client";

import React from "react";
import { OfferingsLayout } from "@/components/sections/offerings/OfferingsLayout";
import { OfferingsHero } from "@/components/sections/offerings/OfferingsHero";
import { ThreePillarsOverview } from "@/components/sections/offerings/ThreePillarsOverview";
import { ClosingCTA } from "@/components/sections/offerings/ClosingCTA";
import { Exhibit } from "@/components/ui/vsc/Exhibit";

export default function OfferingsGateway() {
  return (
    <OfferingsLayout>
      {/* Hero value proposition */}
      <OfferingsHero />

      {/* Dynamic 3-offering list rows navigation triggers */}
      <ThreePillarsOverview />

      {/* Exhibit 02 (v2.1 §4 fix): the old caption was 11px mono at muted
          contrast directly under ~120px display type — it disappeared.
          This exhibit doesn't use the standard Exhibit `caption` prop
          (which is correctly small mono elsewhere, e.g. "Illustrative.
          Not a forecast...") because THIS caption is doing more work than
          a footnote — it's the sentence the whole page is arguing for, so
          it gets body-face size and real weight, centred with the display
          type instead of trailing it. Section padding cut further too —
          the block was still taller than its content needed. */}
      <section className="relative w-full py-10 sm:py-14 overflow-hidden border-t border-rule select-none z-10">
        <div className="container max-w-[900px] text-center">
          <Exhibit number={2} label="Operating principle" className="text-left">
            <div className="space-y-1 sm:space-y-2 text-center">
              <span className="font-display text-5xl sm:text-7xl md:text-8xl text-ink font-normal leading-[0.95] tracking-tight uppercase block">
                DISCIPLINE
              </span>
              <span className="font-display text-5xl sm:text-7xl md:text-8xl text-ink-soft font-normal leading-[0.95] tracking-tight uppercase block">
                BEATS
              </span>
              <span className="font-display text-5xl sm:text-7xl md:text-8xl text-ink font-normal leading-[0.95] tracking-tight uppercase block">
                EMOTION.
              </span>
            </div>
            <p className="mx-auto mt-10 max-w-[46ch] text-[15px] leading-relaxed text-ink-muted">
              The rules exist for the days this is hardest to follow.
            </p>
          </Exhibit>
        </div>
      </section>

      <ClosingCTA />
    </OfferingsLayout>
  );
}

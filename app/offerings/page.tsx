"use client";

import React from "react";
import { OfferingsLayout } from "@/components/sections/offerings/OfferingsLayout";
import { OfferingsHero } from "@/components/sections/offerings/OfferingsHero";
import { ThreePillarsOverview } from "@/components/sections/offerings/ThreePillarsOverview";

export default function OfferingsGateway() {
  return (
    <OfferingsLayout>
      {/* Hero value proposition */}
      <OfferingsHero />

      {/* Dynamic 3-offering list rows navigation triggers */}
      <ThreePillarsOverview />

      {/* =========================================================================
          SIGNATURE PHILOSOPHY STATEMENT — OFFERINGS (EXECUTION PRINCIPLE)
          White typography + subtle gold rule accent + restrained editorial composition.
          NO Insight Blue here (Offerings is about execution).
         ========================================================================= */}
      <section className="relative w-full py-28 sm:py-36 overflow-hidden border-t border-rule select-none z-10">
        <div className="container max-w-[1200px] text-center">
          <div className="flex flex-col items-center justify-center max-w-[850px] mx-auto">
            {/* Subtle Hairline Gold Accent Rule */}
            <div className="w-12 h-[1px] bg-accent-gold/60 mb-8" />

            <div className="space-y-1 sm:space-y-2">
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

            {/* Subtle Bottom Gold Rule */}
            <div className="w-12 h-[1px] bg-accent-gold/60 mt-8" />
          </div>
        </div>
      </section>
    </OfferingsLayout>
  );
}

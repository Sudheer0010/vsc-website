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

      <section className="relative w-full py-10 sm:py-14 overflow-hidden border-t border-vsc-dark-hairline bg-vsc-dark select-none z-10">
        <div className="container max-w-[900px] text-center">
          <Exhibit number={2} label="Operating principle" variant="dark" className="text-left">
            <div className="space-y-1 sm:space-y-2 text-center">
              <span className="font-display text-5xl sm:text-7xl md:text-8xl text-vsc-dark-ink font-normal leading-[0.95] tracking-tight uppercase block">
                DISCIPLINE
              </span>
              <span className="font-display text-5xl sm:text-7xl md:text-8xl text-vsc-dark-ink font-normal leading-[0.95] tracking-tight uppercase block">
                BEATS
              </span>
              <span className="font-display text-5xl sm:text-7xl md:text-8xl text-vsc-dark-ink font-normal leading-[0.95] tracking-tight uppercase block">
                EMOTION
              </span>
            </div>
          </Exhibit>
        </div>
      </section>

      <ClosingCTA />
    </OfferingsLayout>
  );
}

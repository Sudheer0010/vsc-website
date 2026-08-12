import React from "react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";

// Import Refactored Sections
import { FAQHero } from "@/components/sections/faq/FAQHero";
import { FAQAccordion } from "@/components/sections/faq/FAQAccordion";

export default function FAQ() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      <main className="relative w-full z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container max-w-[1200px]">
          <FAQHero />
          <FAQAccordion />
        </div>
      </main>
    </div>
  );
}

"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";

// Import Refactored Sections
import { FAQHero } from "@/components/sections/faq/FAQHero";
import { FAQAccordion } from "@/components/sections/faq/FAQAccordion";

export default function FAQ() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Faint texture layer. `mix-blend-screen` only ever lightens, which is
          why at dark-theme opacity this washed the whole page toward white —
          `multiply` darkens instead, so it reads as a trace of paper texture
          rather than a haze sitting on top of the content. */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.06] mix-blend-multiply bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{
          backgroundImage: "url('/images/faq-bg.png')",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 100%)"
        }}
      />

      <main className="relative w-full z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container max-w-[1200px]">
          <FAQHero />
          <FAQAccordion />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

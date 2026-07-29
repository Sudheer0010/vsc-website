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
    <div className="relative min-h-screen w-full bg-bg-primary overflow-x-hidden text-text-primary">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Blended Custom Background Texture (FAQ Page Only) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-35 mix-blend-screen bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{
          backgroundImage: "url('/images/faq-bg.png')",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.1) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.1) 100%)"
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

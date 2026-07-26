"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";

// Import Refactored Sections
import { EnquireHero } from "@/components/sections/enquire/EnquireHero";
import { ProcessTimeline } from "@/components/sections/enquire/ProcessTimeline";
import { DiscussionForm } from "@/components/sections/enquire/DiscussionForm";
import { PersonalReview } from "@/components/sections/enquire/PersonalReview";

export default function Enquire() {
  return (
    <div className="relative min-h-screen w-full bg-bg-primary overflow-x-hidden text-text-primary">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Dynamic Background Colored Ambient Light Pool */}
      <AmbientLightPool color="rgba(201, 168, 76, 0.02)" className="left-[70%] top-[25%] scale-[1.2]" />

      <main className="relative w-full">
        
        {/* 1. Hero Section */}
        <EnquireHero />

        {/* 2. Process + Form side-by-side section */}
        <section className="relative w-full py-20 lg:py-28 overflow-hidden border-t border-white/[0.03] z-10">
          <div className="container max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              <ProcessTimeline />
              <DiscussionForm />
            </div>
          </div>
        </section>

        {/* 3. Personal Review Trust Section */}
        <PersonalReview />

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

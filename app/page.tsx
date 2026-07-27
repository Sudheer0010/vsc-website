"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Refactored Sections
import { Hero } from "@/components/sections/home/Hero";
import { MarketTone } from "@/components/sections/home/MarketTone";
import { Philosophy } from "@/components/sections/home/Philosophy";
import { SignatureTransition } from "@/components/sections/home/SignatureTransition";
import { Offerings } from "@/components/sections/home/Offerings";
import { ExecutionFramework } from "@/components/sections/home/ExecutionFramework";
import { WhoItFits } from "@/components/sections/home/WhoItFits";
import { MarketEnvironment } from "@/components/sections/home/MarketEnvironment";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { LatestMarketLetter } from "@/components/sections/home/LatestMarketLetter";
import { WhenWeInvest } from "@/components/sections/home/WhenWeInvest";
import { Compliance } from "@/components/sections/home/Compliance";
import { CTA } from "@/components/sections/home/CTA";

export default function Home() {
  useScrollReveal();

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative w-full">
        {/* 1. Hero */}
        <Hero />
        
        {/* 2. Market Tone Statement */}
        <MarketTone />
        
        {/* 3. Manifesto (Why VSC Exists) */}
        <Philosophy />
        
        {/* 4. Signature Transition */}
        <SignatureTransition />
        
        {/* 5. Process Timeline (How VSC Actually Invests) */}
        <Offerings />
        
        {/* 6. Comparison Table (Mutual Funds vs VSC) */}
        <ExecutionFramework />
        
        {/* 7. Three Principles (Philosophy) */}
        <WhoItFits />
        
        {/* 8. Research Navigation Grid */}
        <MarketEnvironment />
        
        {/* 9. Interactive Testimonial Carousel */}
        <Testimonials />
        
        {/* 10. Research Library CTA */}
        <LatestMarketLetter />
        
        {/* 11. Lifecycle Diagram (When We Invest) */}
        <WhenWeInvest />
        
        {/* 12. Final Spotlight CTA */}
        <CTA />
        
        {/* 13. Regulatory Strip Disclaimer */}
        <Compliance />
      </main>

      <Footer />
    </>
  );
}

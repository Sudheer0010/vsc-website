"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain } from "./OfferingsBackground";
import { NextStepCTA } from "./NextStepCTA";

interface OfferingsLayoutProps {
  children: React.ReactNode;
  showCTA?: boolean;
  ctaService?: "learning-hub" | "advantage" | "inner-circle";
}

export function OfferingsLayout({
  children,
  showCTA = true,
  ctaService
}: OfferingsLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-bg-primary overflow-x-hidden">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Dynamic Content */}
      <main className="relative w-full">
        {children}
      </main>

      {/* Reusable Next Step CTA */}
      {showCTA && <NextStepCTA service={ctaService} />}

      {/* Global Footer & Compliance Disclaimers */}
      <Footer />
    </div>
  );
}

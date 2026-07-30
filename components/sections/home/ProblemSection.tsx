"use client";

import React from "react";
import { motion } from "framer-motion";

export function ProblemSection() {
  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  const pairedContrasts = [
    {
      mostInvestors: "Follow News",
      vscFramework: "Research",
    },
    {
      mostInvestors: "Follow Tips",
      vscFramework: "Framework",
    },
    {
      mostInvestors: "Emotional Decisions",
      vscFramework: "Risk Management",
    },
    {
      mostInvestors: "Inconsistent Results",
      vscFramework: "Disciplined Execution",
    },
  ];

  return (
    <section id="problem" className="relative w-full py-24 sm:py-32 bg-[#05070D] border-t border-white/[0.06] select-none overflow-hidden">
      {/* Ambient background glow */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,168,76,0.02),transparent_70%)] pointer-events-none" 
      />

      <div className="container max-w-[900px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-[760px] mx-auto text-center mb-12 sm:mb-16">
          <motion.span 
            className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-3"
            {...animProps}
          >
            THE STRUCTURAL SHIFT
          </motion.span>
          <motion.h2 
            className="font-display text-3xl sm:text-5xl text-white font-normal leading-[1.14]"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            The Problem We Solve
          </motion.h2>
        </div>

        {/* Rapid 2-Second Scannable Hairline Table */}
        <motion.div 
          className="w-full"
          {...animProps}
          transition={{ ...animProps.transition, delay: 0.1 }}
        >
          {/* Sub-Header Eyebrow */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
            <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase font-bold">
              BEHAVIORAL CONTRAST
            </span>
          </div>

          {/* Desktop <thead> Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-3 mb-1 border-b border-white/10 px-2">
            <div className="col-span-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold">
              MOST INVESTORS
            </div>
            <div className="col-span-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-gold font-bold">
              VSC FRAMEWORK
            </div>
          </div>

          {/* 1:1 Clean Paired Contrast Hairline Rows */}
          <div className="divide-y divide-white/10">
            {pairedContrasts.map((row) => {
              return (
                <div
                  key={row.mostInvestors}
                  className="py-4 sm:py-5 px-2 hover:bg-white/[0.015] transition-colors duration-200 group"
                >
                  {/* Desktop 2-Column Paired Layout */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    {/* Left Side: Most Investors (Receded ✕ at 25% opacity) */}
                    <div className="col-span-6 font-mono text-sm sm:text-base text-white/60 flex items-center gap-3">
                      <span className="text-white/25 font-bold shrink-0">✕</span>
                      <span className="text-white/80 font-medium tracking-tight">{row.mostInvestors}</span>
                    </div>

                    {/* Right Side: VSC Framework (Bright Gold ✓) */}
                    <div className="col-span-6 font-mono text-sm sm:text-base text-accent-gold/90 flex items-center gap-3 group-hover:text-accent-gold transition-colors">
                      <span className="text-accent-gold font-bold shrink-0">✓</span>
                      <span className="text-accent-gold font-semibold tracking-tight">{row.vscFramework}</span>
                    </div>
                  </div>

                  {/* Mobile Stacked Fallback Layout (< 768px) */}
                  <div className="md:hidden flex flex-col gap-2.5">
                    {/* Most Investors Line */}
                    <div className="font-mono text-xs sm:text-sm text-white/60 flex items-center gap-2.5 pl-1">
                      <span className="text-white/25 font-bold shrink-0">✕</span>
                      <span className="text-white/80 font-medium">{row.mostInvestors}</span>
                    </div>

                    {/* VSC Framework Line */}
                    <div className="font-mono text-xs sm:text-sm text-accent-gold flex items-center gap-2.5 pl-1 pt-0.5">
                      <span className="text-accent-gold font-bold shrink-0">✓</span>
                      <span className="text-accent-gold font-semibold">{row.vscFramework}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Unboxed Concluding Pull-Quote Statement */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-white/10 text-center">
            <p className="font-display text-xl sm:text-2xl text-white/90 font-normal leading-[1.25]">
              Markets don&apos;t reward information. They reward disciplined decisions.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

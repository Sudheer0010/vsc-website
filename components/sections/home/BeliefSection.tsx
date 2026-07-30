"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Sliders, Hourglass, TrendingUp } from "lucide-react";

export function BeliefSection() {
  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  return (
    <section id="belief" className="relative w-full py-24 sm:py-36 bg-bg-paper-navy border-t border-b border-white/[0.06] select-none overflow-hidden">
      {/* Background ambient radial glow */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_30%,rgba(201,168,76,0.03),transparent_70%)] pointer-events-none" 
      />

      <div className="container max-w-[1140px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Eyebrow */}
        <div className="max-w-[700px] mb-12 sm:mb-16">
          <motion.span 
            className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block"
            {...animProps}
          >
            HOW WE THINK
          </motion.span>
        </div>

        {/* RULE 01: Unboxed Heroic Statement (Zero Cards, Zero Borders) */}
        <div className="relative mb-14 sm:mb-16">
          {/* Ghosted Numeral 01 Watermark */}
          <div 
            aria-hidden="true" 
            className="absolute -top-12 sm:-top-20 -left-4 sm:-left-8 font-display text-[130px] sm:text-[200px] lg:text-[240px] font-bold text-accent-gold/[0.06] leading-none select-none pointer-events-none z-0"
          >
            01
          </div>

          <motion.div 
            className="relative z-10 max-w-[960px]"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-accent-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold font-bold">
                UNDISPUTED PRIMARY DIRECTIVE
              </span>
            </div>

            {/* Oversized 84px Display Headline in Gold */}
            <h3 className="font-display text-5xl sm:text-7xl lg:text-[84px] leading-[0.98] text-accent-gold font-semibold tracking-tight mb-8">
              Protect Capital First.
            </h3>

            {/* Sub-text Paragraph in White/Slate */}
            <p className="font-mono text-base sm:text-lg text-white/90 leading-relaxed max-w-[680px]">
              Before seeking returns, we first ask: How much can we lose? Surviving drawdown cycles is the precondition for compounding.
            </p>
          </motion.div>
        </div>

        {/* Single Thin Horizontal Divider Line (Not boxed around it) */}
        <div className="w-full h-[1px] bg-white/10 my-12 sm:my-16" />

        {/* RULES 02–04: Asymmetric Triptych Strip (5 + 4 + 3 = 12 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-start">
          
          {/* Rule 02 (col-span-5 out of 12 = ~42% width) */}
          <motion.div 
            className="md:col-span-5 md:pr-8 md:border-r border-white/10 hover:border-accent-gold/40 transition-colors border-b border-white/10 pb-8 md:border-b-0 md:pb-0"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-4 h-4 text-accent-gold" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-accent-gold uppercase font-bold">
                PROCESS DISCIPLINE
              </span>
            </div>
            <h4 className="font-display text-lg sm:text-xl text-accent-gold font-semibold tracking-tight mb-2">
              Respect the Process
            </h4>
            <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[340px]">
              Rules before emotions. Every trade requires predefined risk parameters and mechanical exit gates.
            </p>
          </motion.div>

          {/* Rule 03 (col-span-4 out of 12 = ~33% width) */}
          <motion.div 
            className="md:col-span-4 md:px-8 md:border-r border-white/10 hover:border-accent-gold/40 transition-colors border-b border-white/10 pb-8 md:border-b-0 md:pb-0"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Hourglass className="w-4 h-4 text-accent-gold" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-accent-gold uppercase font-bold">
                TIME PREFERENCE
              </span>
            </div>
            <h4 className="font-display text-lg sm:text-xl text-accent-gold font-semibold tracking-tight mb-2">
              Patience Compounds
            </h4>
            <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">
              Cash is also an active position during unfavorable market regimes.
            </p>
          </motion.div>

          {/* Rule 04 (col-span-3 out of 12 = ~25% width) */}
          <motion.div 
            className="md:col-span-3 md:pl-8 hover:border-accent-gold/40 transition-colors"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-accent-gold" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-accent-gold uppercase font-bold">
                ADAPTABILITY
              </span>
            </div>
            <h4 className="font-display text-lg sm:text-xl text-accent-gold font-semibold tracking-tight mb-2">
              Never Stop Improving
            </h4>
            <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">
              Markets evolve continuously. Our models adapt.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  CheckCircle2, 
  Zap, 
  Eye, 
  RefreshCw,
  ArrowRight,
  ArrowDown,
  Shield,
  Layers,
  BarChart3,
  Flame,
  RotateCcw
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/vsc/SpotlightCard";

export function HowWeDoItSection() {
  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  const processSteps = [
    {
      step: "01",
      name: "Scan",
      icon: Search,
      description: "Find high-probability opportunities.",
    },
    {
      step: "02",
      name: "Validate",
      icon: CheckCircle2,
      description: "Check trend, momentum, liquidity and risk.",
    },
    {
      step: "03",
      name: "Execute",
      icon: Zap,
      description: "Deploy capital with predefined risk.",
    },
    {
      step: "04",
      name: "Monitor",
      icon: Eye,
      description: "Maintain cash as a position when required.",
    },
    {
      step: "05",
      name: "Review",
      icon: RefreshCw,
      description: "Learn from every decision and improve continuously.",
    },
  ];

  const corePrinciples = [
    { title: "2–5 Day Swing Trading", icon: BarChart3, badge: "TIMEFRAME DISCIPLINE" },
    { title: "Maximum 2% Risk Per Trade", icon: Shield, badge: "CAPITAL PROTECTION" },
    { title: "Cash Is Also A Position", icon: Layers, badge: "REGIME SENSITIVITY" },
    { title: "Process Over Prediction", icon: Flame, badge: "QUANTITATIVE RIGOR" },
    { title: "Continuous Review", icon: RotateCcw, badge: "FEEDBACK LOOP" },
  ];

  return (
    <section id="how-we-do-it" className="relative w-full py-24 sm:py-32 bg-bg-paper-navy border-t border-b border-white/[0.06] select-none overflow-hidden">
      {/* Subtle grid background pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" 
      />

      <div className="container max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-[760px] mx-auto text-center mb-16 sm:mb-20">
          <motion.div 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-4"
            {...animProps}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
            <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase font-semibold">
              5-STAGE OPERATING PIPELINE
            </span>
          </motion.div>

          <motion.h2 
            className="font-display text-3xl sm:text-5xl text-white font-normal leading-[1.14] mb-6"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            How We Do It
          </motion.h2>

          <motion.p 
            className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed max-w-[620px] mx-auto"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.1 }}
          >
            Every decision follows a structured process instead of emotions.
          </motion.p>
        </div>

        {/* 5-Step Connected Workflow Pipeline */}
        <div className="relative mb-20">
          {/* Desktop Horizontal Connecting Line Track */}
          <div 
            aria-hidden="true" 
            className="hidden md:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-accent-gold/20 via-accent-gold/60 to-accent-gold/20 z-0" 
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.name}>
                  <motion.div
                    {...animProps}
                    transition={{ ...animProps.transition, delay: 0.06 * idx }}
                    className="relative group"
                  >
                    <SpotlightCard className="p-6 h-full border border-white/10 hover:border-accent-gold/50 transition-all flex flex-col justify-between bg-[#0A0E1A]">
                      <div>
                        {/* Header: Icon */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold group-hover:scale-105 transition-transform shadow-md">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Step Title & Description */}
                        <h3 className="font-display text-xl sm:text-2xl text-accent-gold font-semibold tracking-tight mb-2">
                          {step.name}
                        </h3>
                        <p className="font-mono text-xs text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Desktop Directional Pipeline Arrow Connector */}
                      {idx < processSteps.length - 1 && (
                        <div aria-hidden="true" className="hidden md:flex absolute -right-4 top-[32px] -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-[#090D18] border border-accent-gold/40 items-center justify-center text-accent-gold shadow-lg">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </SpotlightCard>
                  </motion.div>

                  {/* Mobile Vertical Flow Connector Arrow */}
                  {idx < processSteps.length - 1 && (
                    <div aria-hidden="true" className="md:hidden flex justify-center py-1 text-accent-gold">
                      <ArrowDown className="w-5 h-5 animate-bounce" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Core Principles Below Process */}
        <div className="pt-10 border-t border-white/10">
          <div className="text-center mb-8">
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase font-semibold">
              CORE OPERATING PRINCIPLES
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-[1000px] mx-auto">
            {corePrinciples.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.04 * idx }}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-accent-gold/40 transition-colors"
                >
                  <Icon className="w-4 h-4 text-accent-gold shrink-0" />
                  <span className="font-mono text-xs text-white/90 font-medium">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

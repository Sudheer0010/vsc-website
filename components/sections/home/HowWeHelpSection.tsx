"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Users, 
  Activity, 
  Briefcase, 
  Building2, 
  Sliders, 
  GitBranch, 
  ShieldCheck, 
  Compass, 
  TrendingUp
} from "lucide-react";

export function HowWeHelpSection() {
  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  const whoWeHelp = [
    { label: "Retail Investors", icon: Users },
    { label: "Amateur Traders", icon: Activity },
    { label: "Working Professionals", icon: Briefcase },
    { label: "Business Owners", icon: Building2 },
  ];

  const whatVscDelivers = [
    { label: "Systematic Rules", icon: Sliders, highlight: "Clear Entry/Exit Gates" },
    { label: "Process-Based Decisions", icon: GitBranch, highlight: "Zero Emotional Bias" },
    { label: "Better Risk Management", icon: ShieldCheck, highlight: "2% Max Per Trade" },
    { label: "Investing Discipline", icon: Compass, highlight: "Cash Is A Position" },
    { label: "Long-Term Wealth Creation", icon: TrendingUp, highlight: "Compounding Growth" },
  ];

  return (
    <section id="how-we-help" className="relative w-full py-24 sm:py-32 bg-[#05070D] border-t border-white/[0.06] select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,168,76,0.03),transparent_70%)] pointer-events-none" 
      />

      <div className="container max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-[760px] mx-auto text-center mb-16 sm:mb-20">
          <motion.span 
            className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-4"
            {...animProps}
          >
            WHO WE HELP & WHAT VSC DELIVERS
          </motion.span>
          <motion.h2 
            className="font-display text-3xl sm:text-5xl text-white font-normal leading-[1.14] mb-6"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            Where VSC Fits
          </motion.h2>
          <motion.p 
            className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed max-w-[620px] mx-auto"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.1 }}
          >
            We provide a structured framework that helps investors make better decisions with discipline and consistency.
          </motion.p>
        </div>

        {/* 3-Column Visual Flow Infographic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Who We Help (Inputs — Muted White/Slate Typography) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className="font-mono text-[11px] tracking-widest text-white/60 uppercase font-semibold">
                WHO WE HELP
              </span>
              <span className="h-[1px] flex-1 bg-white/10" />
            </div>

            {whoWeHelp.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.05 * idx }}
                >
                  <div className="p-4 sm:p-5 rounded-xl bg-white/[0.025] hover:bg-white/[0.045] transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 text-white/90" />
                      </div>
                      <h3 className="font-display text-base sm:text-lg text-white font-semibold tracking-tight">
                        {item.label}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center Column: The VSC Node (Framework Hub) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 lg:py-0 relative">
            <motion.div 
              className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-[#090D18] border border-accent-gold/30 shadow-[0_0_50px_rgba(201,168,76,0.1)] group"
              {...animProps}
              transition={{ ...animProps.transition, delay: 0.15 }}
            >
              {/* Outer pulsing ring */}
              <div 
                aria-hidden="true" 
                className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-accent-gold/30 via-transparent to-accent-gold/10 blur-md opacity-50 group-hover:opacity-80 transition-opacity" 
              />

              <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/20 shadow-xl mb-4 bg-black">
                <Image
                  src="/logo.jpg"
                  alt="VSC Capital Framework Engine"
                  fill
                  priority
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <span className="relative z-10 font-mono text-[11px] tracking-[0.25em] text-accent-gold uppercase font-bold block mb-1">
                VSC OPERATING SYSTEM
              </span>
              <h3 className="relative z-10 font-display text-xl text-white font-normal">
                The Central Engine
              </h3>
              <p className="relative z-10 font-mono text-xs text-text-secondary mt-2 max-w-[240px] leading-relaxed">
                Connects market participants to institutional risk management
              </p>
            </motion.div>
          </div>

          {/* Right Column: What VSC Delivers (Outputs — Bright Gold Typography) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className="font-mono text-[11px] tracking-widest text-accent-gold uppercase font-semibold">
                WHAT VSC DELIVERS
              </span>
              <span className="h-[1px] flex-1 bg-white/10" />
            </div>

            {whatVscDelivers.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.05 * idx }}
                >
                  <div className="p-4 sm:p-5 rounded-xl bg-white/[0.025] hover:bg-white/[0.045] transition-all group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 text-accent-gold" />
                      </div>
                      <div>
                        <h3 className="font-display text-base sm:text-lg text-accent-gold font-semibold tracking-tight">
                          {item.label}
                        </h3>
                        <span className="font-mono text-[11px] text-accent-gold/90 block mt-0.5">
                          {item.highlight}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

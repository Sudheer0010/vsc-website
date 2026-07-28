"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function OfferingsHero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToOverview = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("offerings-overview");
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const animProps = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }
  } as const;

  return (
    <section className="relative w-full min-h-[85vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden select-none border-b border-white/[0.04] z-10">
      {/* Full-Bleed Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/vsc_offerings_hero.png"
          alt="VSC Capital 3 Pathways to Clarity in Investment"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter contrast-[1.05] brightness-[0.90]"
        />
        {/* Directional gradient scrim overlay preserving image visibility & high text contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#05070D] via-[#05070D]/85 via-[42%] to-[#05070D]/30 z-10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-[#05070D]/60 z-10"
        />
      </div>

      <div className="container relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-[800px] flex flex-col items-start text-left">
          
          {/* Tracked small label */}
          <motion.span 
            className="font-mono text-xs md:text-sm tracking-[0.2em] text-accent-gold uppercase mb-6 font-bold drop-shadow-sm"
            {...animProps}
          >
            OFFERINGS
          </motion.span>
          
          {/* Main Editorial Headline */}
          <motion.h1 
            className="font-display text-5xl sm:text-6xl md:text-[72px] lg:text-[80px] leading-[1.06] text-white font-normal tracking-tight mb-8 drop-shadow-lg"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            Three Pillars.<br />One Investment Philosophy.
          </motion.h1>
          
          {/* Slightly reduced paragraph length */}
          <motion.p 
            className="font-mono text-sm md:text-base text-white/80 leading-relaxed max-w-[650px] mb-10 drop-shadow-sm"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.1 }}
          >
            Every VSC offering exists to build systematic thinking—from foundational market education, to disciplined portfolio guidance, to institutional-grade research.
          </motion.p>
          
          {/* Action button */}
          <motion.div 
            className="flex"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.15 }}
          >
            <a 
              href="#offerings-overview" 
              onClick={handleScrollToOverview}
              className="btn btn-gold"
              style={{ padding: "14px 28px", fontSize: "12px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}
            >
              EXPLORE OFFERINGS
            </a>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

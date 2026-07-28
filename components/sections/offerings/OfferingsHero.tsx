"use client";

import React from "react";
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
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden z-10">
      <div className="container max-w-[1200px]">
        <div className="max-w-[800px] flex flex-col items-start text-left">
          
          {/* Tracked small label */}
          <motion.span 
            className="font-mono text-xs md:text-sm tracking-[0.2em] text-accent-gold uppercase mb-6"
            {...animProps}
          >
            OFFERINGS
          </motion.span>
          
          {/* Main Editorial Headline */}
          <motion.h1 
            className="font-display text-5xl sm:text-6xl md:text-[72px] leading-[1.1] text-text-primary font-normal tracking-tight mb-8"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            Three Pillars.<br />One Investment Philosophy.
          </motion.h1>
          
          {/* Slightly reduced paragraph length */}
          <motion.p 
            className="font-mono text-sm md:text-base text-text-secondary leading-relaxed max-w-[650px] mb-10"
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

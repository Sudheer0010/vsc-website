"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
* VSC Component: ResearchLine
* 
* 1. Purpose: Symbolic hairline rule that draws itself horizontally before every major chapter.
* 2. Atlas Alignment: Expresses Ritual #1 ("Research begins") and Signature 01. Restrained 1px gold line.
* 3. One Memorable Idea: Draws with measured 0.8s reading tempo before text appears, signaling that serious research begins.
* 4. Accessibility: Purely decorative indicator; marked with aria-hidden="true". Immediately renders static when prefers-reduced-motion is active.
* 5. Performance: Hardware-accelerated CSS transform scaleX animation; zero layout shift (CLS = 0.00).
* 6. Uniquely VSC: Unlike standard full-width borders, draws from left-to-right with custom 0.8s Reading Tempo curve.
*/

interface ResearchLineProps {
  className?: string;
  delay?: number;
}

export function ResearchLine({ className = "", delay = 0 }: ResearchLineProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div 
        aria-hidden="true" 
        className={`w-full h-[1px] bg-gradient-to-r from-accent-gold/40 via-accent-gold/20 to-transparent ${className}`} 
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`w-full h-[1px] bg-gradient-to-r from-accent-gold/40 via-accent-gold/20 to-transparent origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut" as const,
      }}
    />
  );
}

"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * VSC Component: EditorialHeading
 * 
 * 1. Purpose: Displays thesis entrances and chapter titles with high-contrast publication typography.
 * 2. Atlas Alignment: Expresses Ritual #2 (Thesis Entrances) and Signature 02 (Research Document Identifiers).
 * 3. One Memorable Idea: Always paired with an monospaced document coordinate tag (`R-01 / ARRIVAL / 2026`) and Cormorant Garamond display serif typography.
 * 4. Accessibility: Uses proper HTML heading tags (h1, h2, h3). Respects reduced motion with instant static placement.
 * 5. Performance: Sub-10px y-float; CSS transform GPU accelerated.
 * 6. Uniquely VSC: Formatted like the opening statement of a Howard Marks memo or Financial Times editorial.
 */

interface EditorialHeadingProps {
  level?: "h1" | "h2" | "h3";
  coordinate?: string;
  thesis: string;
  subthesis?: string;
  className?: string;
}

export function EditorialHeading({
  level = "h2",
  coordinate,
  thesis,
  subthesis,
  className = "",
}: EditorialHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = level;

  const animProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.6, ease: "easeOut" as const },
      };

  return (
    <div className={`flex flex-col items-start text-left max-w-[950px] select-none ${className}`}>
      {/* Signature 02: Monospaced Coordinate Tag */}
      {coordinate && (
        <motion.span
          className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-accent-gold/80 uppercase mb-4 block font-semibold"
          {...animProps}
        >
          {coordinate}
        </motion.span>
      )}

      {/* Main Thesis Display Headline */}
      <motion.div {...animProps} transition={shouldReduceMotion ? {} : { duration: 0.6, delay: 0.05, ease: "easeOut" as const }}>
        <Component className="font-display text-3xl sm:text-5xl md:text-[58px] lg:text-[68px] leading-[1.08] text-white font-normal tracking-tight mb-6">
          {thesis}
        </Component>
      </motion.div>

      {/* Optional Subthesis Copy */}
      {subthesis && (
        <motion.p
          className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed max-w-[680px]"
          {...animProps}
          transition={shouldReduceMotion ? {} : { duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
        >
          {subthesis}
        </motion.p>
      )}
    </div>
  );
}

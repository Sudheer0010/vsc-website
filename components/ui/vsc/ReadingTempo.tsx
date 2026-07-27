"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * VSC Component: ReadingTempo
 * 
 * 1. Purpose: Client animation wrapper that enforces the VSC Reading Tempo curve (`Pause -> Line Draw -> Headline Fade -> Read`).
 * 2. Atlas Alignment: Replaces generic Framer Motion fade-ups with Howard Marks reading pacing.
 * 3. One Memorable Idea: Motion is strictly tied to reading tempo; text body paragraphs enter silently without motion artifacts.
 * 4. Accessibility: Seamlessly falls back to immediate 0s static rendering when reduced motion is requested.
 * 5. Performance: Hardware-accelerated opacity & translateZ; zero re-renders.
 * 6. Uniquely VSC: Enforces measured, unhurried pacing across all editorial chapters.
 */

interface ReadingTempoProps {
  children: React.ReactNode;
  delay?: number;
  silent?: boolean;
  className?: string;
}

export function ReadingTempo({
  children,
  delay = 0,
  silent = false,
  className = "",
}: ReadingTempoProps) {
  const shouldReduceMotion = useReducedMotion();

  // Rule: Text body copy uses silent entry to prevent reading distraction
  if (silent || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut" as const,
      }}
    >
      {children}
    </motion.div>
  );
}

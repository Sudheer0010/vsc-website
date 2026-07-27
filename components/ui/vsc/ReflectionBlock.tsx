"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * VSC Component: ReflectionBlock
 * 
 * 1. Purpose: Concludes every research document chapter with an intellectual reflection question.
 * 2. Atlas Alignment: Expresses Ritual #3 (Reflection Chapter Exits) and Signature 03.
 * 3. One Memorable Idea: Ends a chapter with a deep question instead of an aggressive call-to-action button, engaging the reader intellectually.
 * 4. Accessibility: High contrast (7:1) typography. Reduced motion compliance built-in.
 * 5. Performance: Static text block with clean CSS border rules; CLS = 0.00.
 * 6. Uniquely VSC: Communicates patience and long-term discipline over sales urgency.
 */

interface ReflectionBlockProps {
  question: string;
  className?: string;
}

export function ReflectionBlock({ question, className = "" }: ReflectionBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  const animProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6, ease: "easeOut" as const },
      };

  return (
    <section className={`w-full py-16 sm:py-24 border-t border-white/[0.04] select-none ${className}`}>
      <div className="container max-w-[1200px]">
        <div className="max-w-[850px] mx-auto text-center flex flex-col items-center">
          {/* Subtle gold indicator dot */}
          <div aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent-gold mb-8 opacity-60" />

          {/* Intellectual Reflection Question */}
          <motion.blockquote
            className="font-display text-2xl sm:text-3xl md:text-4xl text-text-primary font-normal leading-[1.35] tracking-tight text-center"
            {...animProps}
          >
            &ldquo;{question}&rdquo;
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}

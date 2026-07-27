"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * VSC Component: AcademicMarginNote
 * 
 * 1. Purpose: Displays side commentary and structural market annotations set in the margin.
 * 2. Atlas Alignment: Expresses Signature 04 (Academic Margin Notes) and publication hierarchy.
 * 3. One Memorable Idea: Mirrors academic research publications and economic journals with hairline left borders and monospaced slate commentary.
 * 4. Accessibility: High contrast muted text on dark background; clean screen reader semantic element (`<aside>`).
 * 5. Performance: Simple static container; zero heavy runtime calculations.
 * 6. Uniquely VSC: Imbues layouts with the feel of an academic briefing memo.
 */

interface AcademicMarginNoteProps {
  label?: string;
  note: string;
  className?: string;
}

export function AcademicMarginNote({
  label = "SIGNAL ANNOTATION",
  note,
  className = "",
}: AcademicMarginNoteProps) {
  const shouldReduceMotion = useReducedMotion();

  const animProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 10 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <motion.aside
      className={`border-l border-white/10 pl-4 py-1 flex flex-col gap-1 select-none ${className}`}
      {...animProps}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-gold/70 font-semibold block">
        {label}
      </span>
      <p className="font-mono text-xs text-text-secondary leading-relaxed">
        {note}
      </p>
    </motion.aside>
  );
}

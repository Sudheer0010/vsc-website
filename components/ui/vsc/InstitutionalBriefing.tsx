"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * VSC Component: InstitutionalBriefing
 * 
 * 1. Purpose: Educational comparison matrix contrasting Traditional Mandates vs. VSC Discipline.
 * 2. Atlas Alignment: Expresses Chapter 0 Mindset and Signature 07 with verb-first parallel structure.
 * 3. Signature Behaviour: 3-row max table with matched `[Verb] + [Action/Condition]` syntax, column labels shown on Row 1 only, and a full-width closing verdict row.
 * 4. Emotional Outcome: Sharpened intellectual contrast that hands the reader the conclusion cleanly.
 * 5. Accessibility: High contrast ratios, mobile-first responsive grid that prevents orphaned labels when collapsed.
 * 6. Performance: Pure CSS grid layout with hardware-accelerated enter animations; CLS = 0.00.
 */

export interface BriefingRow {
  feature: string;
  traditionalVerb: string;
  traditionalDetail: string;
  vscVerb: string;
  vscDetail: string;
}

interface InstitutionalBriefingProps {
  title?: string;
  verdict?: string;
  rows?: BriefingRow[];
  className?: string;
}

const DEFAULT_ROWS: BriefingRow[] = [
  {
    feature: "Exposure Mandate",
    traditionalVerb: "Stays invested",
    traditionalDetail: "100% of the time, regardless of crash risk.",
    vscVerb: "Moves to cash",
    vscDetail: "whenever risk goes uncompensated.",
  },
  {
    feature: "Decision Driver",
    traditionalVerb: "Tracks the benchmark",
    traditionalDetail: "chasing relative returns and fee targets.",
    vscVerb: "Tracks the risk",
    vscDetail: "reading trend strength and quantitative signals.",
  },
  {
    feature: "Drawdown Protection",
    traditionalVerb: "Rides it out",
    traditionalDetail: "no defensive exit rules, no floor.",
    vscVerb: "Cuts it early",
    vscDetail: "automated stop logic, position reduction triggers.",
  },
];

export function InstitutionalBriefing({
  title = "VSC VS TRADITIONAL MUTUAL FUNDS",
  verdict = "One mandate is built to stay in. The other is built to know when to leave.",
  rows = DEFAULT_ROWS,
  className = "",
}: InstitutionalBriefingProps) {
  const shouldReduceMotion = useReducedMotion();

  const animProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.6, ease: "easeOut" as const },
      };

  return (
    <motion.div
      className={`w-full bg-[#0B0F1E] border border-white/[0.08] rounded-2xl p-6 sm:p-8 select-none ${className}`}
      {...animProps}
    >
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
        <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase font-semibold">
          {title}
        </span>
      </div>

      {/* Rows Container */}
      <div className="space-y-4">
        {rows.map((row, idx) => {
          const isFirstRow = idx === 0;
          return (
            <div
              key={row.feature}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.08] transition-colors duration-200"
            >
              {/* Feature Title */}
              <div className="md:col-span-4 font-mono text-xs text-white font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/60 shrink-0" />
                {row.feature}
              </div>

              {/* Traditional Side */}
              <div className="md:col-span-4 font-mono text-xs text-text-secondary">
                {isFirstRow && (
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-1 font-medium">
                    TRADITIONAL MANDATE
                  </span>
                )}
                <span className="text-white/90 font-medium">{row.traditionalVerb}</span>
                <span className="text-white/60"> — {row.traditionalDetail}</span>
              </div>

              {/* VSC Side */}
              <div className="md:col-span-4 font-mono text-xs text-accent-gold">
                {isFirstRow && (
                  <span className="text-accent-gold/60 block text-[10px] uppercase tracking-wider mb-1 font-semibold">
                    VSC DISCIPLINE
                  </span>
                )}
                <span className="text-accent-gold font-semibold">{row.vscVerb}</span>
                <span className="text-accent-gold/80"> — {row.vscDetail}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Width Verdict Row */}
      {verdict && (
        <div className="mt-6 pt-5 border-t border-white/[0.08] text-center">
          <p className="font-display text-base sm:text-lg text-white font-normal italic tracking-tight">
            &ldquo;{verdict}&rdquo;
          </p>
        </div>
      )}
    </motion.div>
  );
}

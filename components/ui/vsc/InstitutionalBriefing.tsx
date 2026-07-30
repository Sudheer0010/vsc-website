"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

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
  verdict = "Mutual funds must stay invested. VSC doesn't.",
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
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <motion.div
      className={`w-full select-none ${className}`}
      {...animProps}
    >
      {/* Section Sub-Eyebrow */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
        <span className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-bold">
          {title}
        </span>
      </div>

      {/* Desktop <thead> Header Row (Placed once above all rows) */}
      <div className="hidden md:grid grid-cols-12 gap-4 pb-3 mb-1 border-b border-white/10 px-2">
        <div className="col-span-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold">
          DIMENSION
        </div>
        <div className="col-span-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold">
          TRADITIONAL MANDATE
        </div>
        <div className="col-span-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-gold font-bold">
          VSC DISCIPLINE
        </div>
      </div>

      {/* Hairline Comparison Rows */}
      <div className="divide-y divide-white/10">
        {rows.map((row) => {
          return (
            <div
              key={row.feature}
              className="py-5 px-2 hover:bg-white/[0.015] transition-colors duration-200 group"
            >
              {/* Desktop 3-Column Layout */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                {/* Dimension Feature Title Anchor */}
                <div className="col-span-4 font-mono text-xs uppercase tracking-[0.15em] text-white/90 font-bold">
                  {row.feature}
                </div>

                {/* Traditional Side (Receded ✕ at 25% opacity) */}
                <div className="col-span-4 font-mono text-xs text-white/60 flex items-start gap-2">
                  <span className="text-white/25 font-bold shrink-0">✕</span>
                  <div>
                    <span className="text-white/80 font-medium">{row.traditionalVerb}</span>
                    <span className="text-white/40"> — {row.traditionalDetail}</span>
                  </div>
                </div>

                {/* VSC Side (Bright Gold ✓) */}
                <div className="col-span-4 font-mono text-xs text-accent-gold/90 flex items-start gap-2 group-hover:text-accent-gold transition-colors">
                  <span className="text-accent-gold font-bold shrink-0">✓</span>
                  <div>
                    <span className="text-accent-gold font-semibold">{row.vscVerb}</span>
                    <span className="text-accent-gold/80"> — {row.vscDetail}</span>
                  </div>
                </div>
              </div>

              {/* Mobile Stacked Fallback Layout (< 768px) */}
              <div className="md:hidden flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 font-bold">
                  {row.feature}
                </span>

                {/* Traditional Line */}
                <div className="font-mono text-xs text-white/60 flex items-start gap-2 pl-1">
                  <span className="text-white/25 font-bold shrink-0">✕</span>
                  <div>
                    <span className="text-white/30 uppercase tracking-widest text-[10px] block mb-0.5 font-semibold">TRADITIONAL</span>
                    <span className="text-white/80 font-medium">{row.traditionalVerb}</span>
                    <span className="text-white/40"> — {row.traditionalDetail}</span>
                  </div>
                </div>

                {/* VSC Line */}
                <div className="font-mono text-xs text-accent-gold flex items-start gap-2 pl-1 pt-1">
                  <span className="text-accent-gold font-bold shrink-0">✓</span>
                  <div>
                    <span className="text-accent-gold/70 uppercase tracking-widest text-[10px] block mb-0.5 font-bold">VSC DISCIPLINE</span>
                    <span className="text-accent-gold font-semibold">{row.vscVerb}</span>
                    <span className="text-accent-gold/80"> — {row.vscDetail}</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Tightly Integrated Concluding Verdict Quote Line with Generous Breathing Room */}
      {verdict && (
        <div className="mt-8 sm:mt-12 pt-6 border-t border-white/10 text-center">
          <p className="font-display text-base sm:text-lg text-white/90 font-normal italic tracking-tight">
            &ldquo;{verdict}&rdquo;
          </p>
        </div>
      )}
    </motion.div>
  );
}

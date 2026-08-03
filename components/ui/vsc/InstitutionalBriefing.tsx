"use client";

import React from "react";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * The comparison, as two readable columns.
 *
 * The old version used ✕ and ✓ glyphs, which is the visual grammar of a
 * pricing page — us good, them bad. The claim here is narrower and more
 * defensible: a fund with an always-invested mandate is not free to do this,
 * and we are. So the left column is stated without disparagement and set in
 * the same size as the right. The asymmetry is carried by colour weight
 * alone, which is enough.
 */

export interface BriefingRow {
  feature: string;
  traditionalVerb: string;
  traditionalDetail: string;
  vscVerb: string;
  vscDetail: string;
}

const DEFAULT_ROWS: BriefingRow[] = [
  {
    feature: "Exposure",
    traditionalVerb: "Stays invested",
    traditionalDetail: "the mandate requires it, whatever the regime.",
    vscVerb: "Moves to cash",
    vscDetail: "when risk stops being compensated.",
  },
  {
    feature: "What gets tracked",
    traditionalVerb: "The benchmark",
    traditionalDetail: "relative performance against an index.",
    vscVerb: "The risk",
    vscDetail: "trend strength, breadth, and what a loss would cost.",
  },
  {
    feature: "In a drawdown",
    traditionalVerb: "Rides it out",
    traditionalDetail: "no defensive exit, no floor.",
    vscVerb: "Cuts early",
    vscDetail: "predefined stops and staged position reduction.",
  },
];

export function InstitutionalBriefing({
  rows = DEFAULT_ROWS,
  className = "",
}: {
  title?: string;
  verdict?: string;
  rows?: BriefingRow[];
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      {/* Column headers — desktop only; mobile repeats them per row. */}
      <div className="hidden border-b border-rule-strong pb-3 md:grid md:grid-cols-12 md:gap-6">
        <div className="col-span-3 text-[14px] font-semibold text-ink-faint">Dimension</div>
        <div className="col-span-4 text-[14px] font-semibold text-ink-faint">
          An always-invested fund
        </div>
        <div className="col-span-5 text-[14px] font-semibold text-growth">VSC</div>
      </div>

      <div className="divide-y divide-rule">
        {rows.map((row, i) => (
          <Reveal key={row.feature} delay={i * 0.05} className="py-6 md:py-7">
            <div className="grid gap-4 md:grid-cols-12 md:gap-6">
              <div className="font-display text-[19px] font-semibold tracking-tight text-ink md:col-span-3">
                {row.feature}
              </div>

              <div className="md:col-span-4">
                <span className="mb-1 block text-[13px] font-semibold text-ink-faint md:hidden">
                  An always-invested fund
                </span>
                <p className="max-w-[40ch] text-[16px] leading-snug text-ink-muted">
                  <span className="font-semibold text-ink-soft">{row.traditionalVerb}</span>{" "}
                  — {row.traditionalDetail}
                </p>
              </div>

              <div className="md:col-span-5">
                <span className="mb-1 block text-[13px] font-semibold text-growth md:hidden">
                  VSC
                </span>
                <p className="max-w-[44ch] border-l-2 border-growth pl-4 text-[16px] leading-snug text-ink-soft md:border-l-0 md:pl-0">
                  <span className="font-semibold text-growth-deep">{row.vscVerb}</span>{" "}
                  — {row.vscDetail}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

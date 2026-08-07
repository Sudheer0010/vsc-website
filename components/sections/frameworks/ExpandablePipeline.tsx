"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Framework } from "@/types/framework";
import { frameworkHref } from "@/lib/framework-urls";

interface NodeMeta {
  output: string;
  status: string;
  published: boolean;
}

/**
 * Display copy that isn't part of the shared Framework data model — output
 * and status are page-specific summaries, not fields every consumer of
 * `frameworkLibrary` needs. Title, question, and description all come
 * straight from `data/frameworks.ts` so this can't drift out of sync with
 * the library itself.
 */
const NODE_META: Record<string, NodeMeta> = {
  "market-environment": {
    output: "Aggressive / Neutral / Defensive",
    status: "V1.0 · August 2026",
    published: true,
  },
  "opportunity-universe": {
    output: "Working Watchlist (20–40 stocks)",
    status: "V0.1 · August 2026",
    published: true,
  },
  "setup-grading": {
    output: "Setup Grade (A / B / C / No allocation)",
    status: "V0.1 · August 2026",
    published: true,
  },
  sizing: {
    output: "Position Size (smallest of three constraints)",
    status: "V0.1 · August 2026",
    published: true,
  },
  "trade-management": {
    output: "Trade Plan (adjustment, not entry)",
    status: "V0.1 · August 2026",
    published: true,
  },
};

interface ExpandablePipelineProps {
  frameworkLibrary: Framework[];
}

/**
 * Replaces the old static pipeline diagram plus five framework cards below
 * it — both showed the same number/title/question, with the cards adding
 * only a status badge and a link. Collapsed, this reads as a clean
 * numbered list with connectors; expanding a node reveals exactly what the
 * card used to show, in place, instead of duplicating the sequence twice
 * on the same page.
 *
 * Each row's icon column stretches to the row's full rendered height via
 * plain flexbox (no absolute-position math), so the connector segment
 * between nodes grows and shrinks automatically as the row's content
 * expands and collapses — it just rides along with the height animation
 * on the content panel below.
 */
export function ExpandablePipeline({ frameworkLibrary }: ExpandablePipelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      {frameworkLibrary.map((fw, i) => {
        const meta = NODE_META[fw.slug];
        const isExpanded = expandedIndex === i;
        const isLast = i === frameworkLibrary.length - 1;
        const panelId = `pipeline-panel-${fw.slug}`;

        return (
          <div key={fw.slug} className="flex gap-4">
            {/* Icon column */}
            <div className="flex w-4 shrink-0 flex-col items-center">
              {meta.published ? (
                <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-growth" />
              ) : (
                <span
                  className="mt-2 h-3 w-3 shrink-0 rounded-full border-2 bg-canvas"
                  style={{ borderColor: "var(--growth)" }}
                />
              )}
              {!isLast && <span className="mt-2 w-px flex-1 bg-rule" aria-hidden="true" />}
            </div>

            {/* Content column — the -mx/px pair is self-cancelling when
                collapsed (net zero inset, flush with the page) and lets the
                expanded background bleed slightly wider than the text. */}
            <div
              className={`-mx-5 min-w-0 flex-1 rounded-vsc-lg px-5 transition-colors duration-200 sm:-mx-6 sm:px-6 ${
                isExpanded ? "bg-canvas-sunk py-4 sm:py-5" : ""
              } ${isLast ? "" : "pb-8"}`}
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                className="flex w-full flex-col items-start text-left"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-sm font-semibold text-growth">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-bold uppercase tracking-wide text-ink sm:text-xl">
                    {fw.title}
                  </span>
                </div>
                <span className="mt-1 text-[15px] italic text-ink-faint">{fw.question}</span>
              </button>

              <motion.div
                id={panelId}
                aria-hidden={!isExpanded}
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-4 pt-4">
                  <p className="max-w-[56ch] text-[14px] leading-relaxed text-ink-faint">
                    {fw.desc}
                  </p>

                  <div className="flex flex-col gap-1.5 font-mono text-[12px]">
                    <div className="flex gap-2">
                      <span className="text-ink-faint">Output:</span>
                      <span className="text-ink-faint">{meta.output}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-ink-faint">Status:</span>
                      {meta.published ? (
                        <span className="text-ink-faint">{meta.status}</span>
                      ) : (
                        <span className="rounded-full bg-canvas-sunk px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                          {meta.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {meta.published ? (
                    <Link
                      href={frameworkHref(fw)}
                      className="w-fit font-mono text-[13px] font-semibold text-growth link-underline"
                    >
                      Read Framework →
                    </Link>
                  ) : (
                    <span className="font-mono text-[13px] text-ink-faint">Coming soon</span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

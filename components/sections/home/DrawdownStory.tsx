"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";

/**
 * The problem, drawn rather than tabulated.
 *
 * This replaced a four-row ✕/✓ table. The table listed adjectives —
 * "Emotional Decisions" vs "Risk Management" — which asks the reader to
 * take the difference on faith. A shape doesn't need to be believed. You
 * can see where one line keeps falling and the other stops.
 *
 * DELIBERATELY SCHEMATIC. There are no axis values and no percentages,
 * because VSC has no registered track record to claim and this is not a
 * backtest. The drawing carries the logic, not a performance promise.
 */

const ALWAYS_INVESTED =
  "M 8 206 C 60 198, 110 172, 158 150 C 182 139, 196 130, 208 124 " +
  "C 232 118, 250 130, 272 152 C 300 180, 322 214, 352 232 " +
  "C 380 246, 404 240, 430 222 C 470 194, 510 150, 560 112 C 578 99, 588 92, 594 88";

const RISK_MANAGED =
  "M 8 206 C 60 198, 110 172, 158 150 C 182 139, 196 130, 208 124 " +
  "C 224 120, 236 128, 248 138 C 258 146, 266 150, 280 151 " +
  "C 310 153, 340 152, 372 150 C 396 149, 412 146, 428 138 " +
  "C 462 120, 500 88, 540 62 C 562 48, 580 38, 594 32";

export function DrawdownStory() {
  const reduce = useReducedMotion();

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: "-15%" },
          transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <section id="problem" className="relative w-full border-b border-rule bg-canvas-deep py-20 sm:py-28">
      <div className="container mx-auto max-w-[1120px]">
        <Reveal className="max-w-[62ch]">
          <span className="eyebrow">The difference</span>
          <h2 className="font-display text-ink">
            Everyone survives the rise. The gap opens on the way down.
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 sm:mt-14">
          <div className="overflow-hidden rounded-vsc-xl border border-rule bg-surface shadow-lift-2">
            <div className="overflow-x-auto">
              <svg
                viewBox="0 0 602 268"
                role="img"
                aria-label="Two schematic capital curves. Both rise together. When market risk crosses a threshold, the always-invested curve continues down through the drawdown while the risk-managed curve flattens as exposure moves to cash, then re-enters and compounds from a higher base."
                className="h-auto w-full min-w-[540px]"
              >
                <defs>
                  <linearGradient id="riskManagedFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--growth)" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="var(--growth)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* the stretch where exposure sits in cash */}
                <rect x="248" y="14" width="180" height="238" fill="var(--growth-wash)" />
                <line x1="248" y1="14" x2="248" y2="252" stroke="var(--growth)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="428" y1="14" x2="428" y2="252" stroke="var(--growth)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* baseline */}
                <line x1="8" y1="252" x2="594" y2="252" stroke="var(--rule-strong)" strokeWidth="1" />

                {/* the area under the risk-managed curve — gives the
                    winning line real visual weight instead of a thin stroke
                    doing all the work */}
                <motion.path
                  d={`${RISK_MANAGED} L 594 252 L 8 252 Z`}
                  fill="url(#riskManagedFill)"
                  stroke="none"
                  initial={reduce ? undefined : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                />

                <motion.path
                  d={ALWAYS_INVESTED}
                  fill="none"
                  stroke="var(--clay-bright)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  {...draw(0)}
                />
                <motion.path
                  d={RISK_MANAGED}
                  fill="none"
                  stroke="var(--growth)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  {...draw(0.25)}
                />

                {/* annotations — "Re-entry" sits on its own row, well below
                    the two left-hand lines. The first line alone runs to
                    roughly x=480 at this font size, which used to run
                    straight through "Re-entry" at x=440/y=34: same row,
                    overlapping text. Comfortable vertical separation is more
                    robust than trying to hand-measure glyph widths. */}
                <text x="256" y="30" className="fill-growth" style={{ font: "600 12px var(--font-ui)" }}>
                  Threshold crossed — exposure cut
                </text>
                <text x="256" y="46" style={{ font: "500 12px var(--font-ui)", fill: "var(--ink-muted)" }}>
                  Cash is held here
                </text>
                <text x="436" y="66" style={{ font: "600 12px var(--font-ui)", fill: "var(--growth-deep)" }}>
                  Re-entry
                </text>
              </svg>
            </div>

            <div className="grid gap-px border-t border-rule bg-rule sm:grid-cols-2">
              <div className="bg-surface p-5 sm:p-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-[3px] w-6 rounded-full bg-clay-bright" />
                  <span className="text-[15px] font-semibold text-ink">Always invested</span>
                </div>
                <p className="mt-2 max-w-[38ch] text-[15px] leading-snug text-ink-soft">
                  The mandate forbids stepping aside. The whole drawdown is
                  taken, and the recovery starts from the bottom of it.
                </p>
              </div>
              <div className="bg-surface p-5 sm:p-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-[3px] w-6 rounded-full bg-growth" />
                  <span className="text-[15px] font-semibold text-ink">Exposure answers to risk</span>
                </div>
                <p className="mt-2 max-w-[38ch] text-[15px] leading-snug text-ink-soft">
                  A threshold is crossed, so exposure comes down. Less is
                  given back, so the recovery starts from higher up.
                </p>
              </div>
            </div>
            <p className="exhibit__caption border-t border-rule px-5 py-3 sm:px-6">
              Illustrative. Not a forecast or a live portfolio.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-8 flex items-start gap-3">
          <StepRule size="md" className="mt-1.5 shrink-0" />
          <p className="max-w-[52ch] font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Markets don&apos;t reward information. They reward what you do when
            the information turns.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

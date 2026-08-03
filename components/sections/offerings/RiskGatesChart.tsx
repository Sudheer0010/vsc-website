"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Type C, reusing the drawdown exhibit's visual language from Home
 * (v2.1 §2.3): a curve, a threshold, and where it gets cut. This one
 * shows risk accumulating across a sequence of positions rather than
 * capital across time, but the grammar — line rises, dashed limit,
 * annotated crossing point — is deliberately the same shape.
 *
 * Only one number on this chart is real: 1.5% per trade, which is
 * stated consistently across the site's actual data (every month in
 * data/market-letters.ts records "Risk / Trade": "1.5%"). The portfolio-
 * level drawdown limit and the exposure-cut point are drawn but not
 * given an invented percentage — that number isn't published anywhere,
 * and putting one on this chart would mean making it up.
 */
export function RiskGatesChart() {
  const reduce = useReducedMotion();

  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, margin: "-15%" },
        transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const },
      };

  const path =
    "M 8 170 C 30 168, 50 158, 65 156 C 80 154, 88 162, 92 168 " +
    "C 110 166, 130 152, 145 149 C 160 146, 168 160, 172 168 " +
    "C 200 160, 230 130, 260 105 C 300 74, 350 55, 400 44 " +
    "C 415 42, 425 41, 435 40 C 480 40, 540 40, 594 40";

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 602 200"
        role="img"
        aria-label="A schematic risk curve. Two small, contained dips each represent one trade's 1.5% risk bound, recovered normally. A longer uncontained climb approaches a dashed drawdown-limit line, at which point the curve flattens sharply — exposure is cut and risk stops accumulating further."
        className="h-auto w-full min-w-[520px]"
      >
        <line x1="8" y1="40" x2="594" y2="40" stroke="var(--rule-strong)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="8" y1="180" x2="594" y2="180" stroke="var(--rule-strong)" strokeWidth="1" />

        <motion.path
          d={path}
          fill="none"
          stroke="var(--growth)"
          strokeWidth="3.5"
          strokeLinecap="round"
          {...draw}
        />

        {/* Three annotations, generously separated bands — see Home's
            drawdown chart and About's equity-curve chart for why this
            matters: each label sits in its own y-band with 30px+
            clearance from the others, not just visually "far enough." */}
        <text x="16" y="132" style={{ font: "600 12px var(--font-ui)", fill: "var(--growth-deep)" }}>
          1.5% — one trade&apos;s risk bound
        </text>
        <text x="16" y="30" style={{ font: "600 12px var(--font-ui)", fill: "var(--ink-muted)" }}>
          Drawdown limit
        </text>
        <text x="430" y="66" style={{ font: "600 12px var(--font-ui)", fill: "var(--clay-bright)" }}>
          Exposure cuts here
        </text>
      </svg>
    </div>
  );
}

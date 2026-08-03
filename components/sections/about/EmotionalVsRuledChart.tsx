"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Exhibit } from "@/components/ui/vsc/Exhibit";

/**
 * Type C — the page's thesis, drawn. "Experience Shapes Every Decision"
 * used to be two paragraphs and a pull-quote asserting that emotional
 * entries cost more than disciplined ones. A reader has no way to check
 * that claim from prose alone. This shows it: the same starting capital,
 * the same market, two different ways of entering it.
 *
 * DELIBERATELY SCHEMATIC — same convention as the Home drawdown chart.
 * No axis values, no percentages, no implied backtest. Two curves and
 * three short annotations, generously separated (a text-overlap bug on
 * the Home chart earlier taught the hard way that "generous" has to mean
 * real margin, not just visually-plausible-looking margin).
 */

const IMPULSIVE =
  "M 8 170 C 40 165, 70 140, 100 100 C 115 78, 128 60, 140 55 " +
  "C 154 63, 168 86, 180 130 C 190 165, 200 190, 210 200 " +
  "C 260 196, 320 190, 380 195 C 430 198, 480 186, 530 178 " +
  "C 555 174, 575 172, 594 175";

const RULED =
  "M 8 170 C 50 168, 90 160, 130 145 C 160 136, 186 133, 210 140 " +
  "C 230 146, 246 150, 260 145 C 300 133, 350 111, 400 90 " +
  "C 450 70, 500 52, 550 38 C 565 34, 580 30, 594 26";

export function EmotionalVsRuledChart() {
  const reduce = useReducedMotion();

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: "-15%" },
          transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <Exhibit
      number={1}
      label="Discipline vs. impulse"
      caption="Illustrative. Not a forecast, a backtest, or a live portfolio — the same starting position, drawn two ways."
      className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
    >
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 602 232"
          role="img"
          aria-label="Two schematic capital curves starting from the same point. The impulsive path spikes up on an excited entry, crashes down on a fearful exit, then drifts sideways with no net progress. The ruled path rises gently on a sized entry, dips only slightly on a capped loss, and compounds steadily to a clearly higher level."
          className="h-auto w-full min-w-[520px]"
        >
          <line x1="8" y1="200" x2="594" y2="200" stroke="var(--rule-strong)" strokeWidth="1" />

          <motion.path
            d={IMPULSIVE}
            fill="none"
            stroke="var(--clay-bright)"
            strokeWidth="3"
            strokeLinecap="round"
            {...draw(0)}
          />
          <motion.path
            d={RULED}
            fill="none"
            stroke="var(--growth)"
            strokeWidth="4"
            strokeLinecap="round"
            {...draw(0.25)}
          />

          {/* Three annotations, each in its own clear zone — no two
              labels share an x-range at a similar y, so there's no way
              for the browser's actual rendered glyph widths to make them
              collide the way "Re-entry" once did on the Home chart. */}
          <text x="30" y="30" style={{ font: "600 12px var(--font-ui)", fill: "var(--clay-bright)" }}>
            Bought on excitement
          </text>
          <text x="175" y="222" style={{ font: "500 12px var(--font-ui)", fill: "var(--ink-muted)" }}>
            Sold on fear
          </text>
          <text x="290" y="108" style={{ font: "600 12px var(--font-ui)", fill: "var(--growth-deep)" }}>
            Small, controlled loss
          </text>
        </svg>
      </div>

      <div className="mt-2 grid gap-px border-t border-rule bg-rule pt-px sm:grid-cols-2">
        <div className="bg-surface p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <span className="h-[3px] w-6 rounded-full bg-clay-bright" />
            <span className="text-[15px] font-semibold text-ink">Emotional entries</span>
          </div>
          <p className="mt-2 max-w-[38ch] text-[15px] leading-snug text-ink-soft">
            Sized by conviction in the moment. Wins and losses both run
            larger than planned, and the account churns without
            compounding.
          </p>
        </div>
        <div className="bg-surface p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <span className="h-[3px] w-6 rounded-full bg-growth" />
            <span className="text-[15px] font-semibold text-ink">Rule-based entries</span>
          </div>
          <p className="mt-2 max-w-[38ch] text-[15px] leading-snug text-ink-soft">
            Sized by a fixed percentage of capital, decided before the
            trade. A loss is capped by design, so one bad decision doesn&apos;t
            interrupt the compounding.
          </p>
        </div>
      </div>
    </Exhibit>
  );
}

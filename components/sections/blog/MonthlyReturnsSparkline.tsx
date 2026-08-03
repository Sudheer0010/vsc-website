"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { marketLetters, sortedMonths } from "@/data/market-letters";

/**
 * Type C, real data — the monthly returns already shown on each archive
 * card (+5.82%, -1.56%, etc.), plotted instead of just listed. Unlike the
 * two schematic charts elsewhere on the site, this one is actual reported
 * numbers, so it does NOT carry the "Illustrative" caption those use —
 * saying illustrative about real figures would be the wrong claim in the
 * other direction. It gets a different, accurate one instead.
 *
 * Bars, not a line: each month's return is an independent published
 * figure, not a running balance. Connecting them with a continuous line
 * would visually imply compounding between months that was never stated.
 */

const TOP_PAD = 26; // headroom so the tallest bar's value label never clips above y=0
const CHART_H = 96; // pure bar-drawing height
const BOTTOM_PAD = 40; // room for the negative-bar label + the month label below it
const BAR_W = 48;
const GAP = 20;

export function MonthlyReturnsSparkline() {
  const reduce = useReducedMotion();

  const months = useMemo(() => [...sortedMonths].reverse(), []); // chronological
  const values = months.map((key) => {
    const raw = marketLetters[key].metrics["Monthly Return"] ?? "0%";
    return parseFloat(raw.replace("%", ""));
  });

  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const range = Math.max(max - min, 1);

  const zeroY = TOP_PAD + CHART_H * (max / range);
  const chartW = months.length * BAR_W + (months.length - 1) * GAP;
  const totalH = TOP_PAD + CHART_H + BOTTOM_PAD;
  const monthLabelY = TOP_PAD + CHART_H + 28;

  return (
    <section className="border-t border-rule py-16 sm:py-20">
      <Exhibit
        number={2}
        label="Monthly returns, as published"
        caption="Monthly performance as stated in each month's letter. Not a projection, and not indicative of future results."
      >
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartW} ${totalH}`}
            role="img"
            aria-label={`Bar chart of monthly returns from ${months[0]} to ${months[months.length - 1]} ${marketLetters[months[months.length - 1]].year}: ${months.map((m, i) => `${m} ${values[i]}%`).join(", ")}.`}
            className="h-auto w-full min-w-[420px]"
          >
            <line
              x1="0"
              y1={zeroY}
              x2={chartW}
              y2={zeroY}
              stroke="var(--rule-strong)"
              strokeWidth="1"
            />

            {months.map((key, i) => {
              const v = values[i];
              const isNeg = v < 0;
              const barH = (Math.abs(v) / range) * CHART_H;
              const x = i * (BAR_W + GAP);
              const barTopY = isNeg ? zeroY : zeroY - barH;
              const label = key.charAt(0) + key.slice(1).toLowerCase();

              return (
                <g key={key}>
                  <motion.rect
                    x={x}
                    width={BAR_W}
                    rx="3"
                    fill={isNeg ? "var(--clay-bright)" : "var(--growth)"}
                    initial={reduce ? undefined : { y: zeroY, height: 0 }}
                    whileInView={{ y: barTopY, height: Math.max(barH, 2) }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <text
                    x={x + BAR_W / 2}
                    y={isNeg ? zeroY + barH + 15 : barTopY - 8}
                    textAnchor="middle"
                    style={{
                      font: "600 11px var(--font-mono)",
                      fill: isNeg ? "var(--clay-bright)" : "var(--growth-deep)",
                    }}
                  >
                    {v > 0 ? "+" : ""}{v}%
                  </text>
                  <text
                    x={x + BAR_W / 2}
                    y={monthLabelY}
                    textAnchor="middle"
                    style={{ font: "500 11px var(--font-mono)", fill: "var(--ink-faint)" }}
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </Exhibit>
    </section>
  );
}

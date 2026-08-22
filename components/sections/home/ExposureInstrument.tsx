"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The exposure instrument — the hero's central object.
 *
 * The entire business rests on one idea: exposure should answer to risk.
 * That idea used to be three paragraphs and a comparison table. Here it is
 * a thing you can move with your finger.
 *
 * The input is continuous; the output is stepped. That asymmetry is the
 * argument. A discretionary manager reacts smoothly and endlessly to noise.
 * A rules engine holds its allocation until a threshold is genuinely
 * crossed, then moves decisively. You can feel the difference in the drag.
 */

type Regime = {
  ceiling: number;
  equity: number;
  name: string;
  reading: string;
};

// Thresholds, not a curve. Crossing one is an event; drifting inside one is not.
const REGIMES: Regime[] = [
  { ceiling: 20, equity: 100, name: "Trend confirmed", reading: "Risk is being paid for. Full deployment." },
  { ceiling: 40, equity: 80, name: "Constructive", reading: "Broad participation. Hold core exposure." },
  { ceiling: 60, equity: 55, name: "Mixed", reading: "Leadership narrowing. Trim into strength." },
  { ceiling: 80, equity: 25, name: "Deteriorating", reading: "Breadth failing. Cash becomes a position." },
  { ceiling: 101, equity: 0, name: "Risk-off", reading: "Nothing here is compensated. Stand aside." },
];

const regimeFor = (risk: number) => REGIMES.find((r) => risk < r.ceiling) ?? REGIMES[REGIMES.length - 1];

export function ExposureInstrument() {
  const [risk, setRisk] = useState(62);
  const reduce = useReducedMotion();
  const regime = regimeFor(risk);
  const cash = 100 - regime.equity;

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 210, damping: 26, mass: 0.8 };

  return (
    <figure className="w-full rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-2 sm:p-8">
      {/* --- Readout ---------------------------------------------------- */}
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-[13px] font-semibold text-ink-muted">Equity exposure</div>
          <motion.div
            key={regime.equity}
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-bold tracking-[-0.04em] text-ink tabular-nums sm:text-6xl"
          >
            {regime.equity}
            <span className="text-3xl text-ink-faint sm:text-4xl">%</span>
          </motion.div>
        </div>

        <div className="text-right">
          <div className="text-[13px] font-semibold text-ink-muted">Held in cash</div>
          <div className="font-display text-3xl font-bold tracking-[-0.03em] text-ink-faint tabular-nums">
            {cash}
            <span className="text-xl">%</span>
          </div>
        </div>
      </div>

      {/* --- The allocation bar ----------------------------------------- */}
      <div className="mt-5 flex h-14 w-full overflow-hidden rounded-vsc-md bg-canvas-deep">
        <motion.div
          className="relative flex items-center justify-start overflow-hidden bg-growth"
          animate={{ width: `${regime.equity}%` }}
          transition={spring}
        >
          {/* the step-rule motif, tiled — texture that means something */}
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.9) 0 2px, transparent 2px 12px)",
            }}
          />
          {regime.equity >= 20 && (
            <span className="relative pl-4 text-[13px] font-semibold tracking-tight text-white">
              Deployed
            </span>
          )}
        </motion.div>

        <div className="flex flex-1 items-center justify-end">
          {cash >= 20 && (
            <span className="pr-4 text-[13px] font-semibold tracking-tight text-ink-muted">Cash</span>
          )}
        </div>
      </div>

      {/* --- The input --------------------------------------------------- */}
      <div className="mt-7">
        <label
          htmlFor="market-risk"
          className="flex items-center justify-between text-[13px] font-semibold text-ink-muted"
        >
          <span>Market risk</span>
          <motion.span
            key={regime.name}
            initial={reduce ? false : { opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
            className="rounded-full bg-growth-tint px-2.5 py-1 text-[12.5px] font-semibold text-growth-deep"
          >
            {regime.name}
          </motion.span>
        </label>

        <input
          id="market-risk"
          type="range"
          min={0}
          max={100}
          value={risk}
          onChange={(e) => setRisk(Number(e.target.value))}
          aria-describedby="market-risk-reading"
          className="vsc-range mt-3 w-full"
          style={{ "--fill": `${risk}%` } as React.CSSProperties}
        />

        <p
          id="market-risk-reading"
          aria-live="polite"
          className="mt-3 min-h-[3rem] max-w-[42ch] text-[15px] leading-snug text-ink-soft"
        >
          {regime.reading}
        </p>
      </div>

      <figcaption className="mt-2 border-t border-rule pt-4 text-[13px] leading-relaxed">
        <span className="block text-ink-soft">
          Move the slider. Watch exposure respond to market risk.
        </span>
        <span className="block text-ink-faint">
          Illustrative framework logic &mdash; not a live portfolio.
        </span>
      </figcaption>

    </figure>
  );
}

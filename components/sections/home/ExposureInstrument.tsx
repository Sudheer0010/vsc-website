"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

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

// The three interior boundaries the calculation actually breaks on — drawn
// once here so the visual scale can never drift from REGIMES above.
const BOUNDARIES = [20, 40, 60, 80];

/**
 * Digit-level readout. Only the glyph that changed transitions; unchanged
 * digits sit still. That restraint is what separates an instrument reading
 * from a marketing counter. The visible digits are decorative (aria-hidden);
 * a plain sr-only mirror carries the real value to assistive tech.
 */
function DigitReadout({ value, reduce }: { value: number; reduce: boolean }) {
  const digits = String(value).split("");

  return (
    <span className="tabular-nums">
      <span aria-hidden="true" className="inline-flex">
        {digits.map((digit, index) => (
          <span
            key={index}
            className="relative inline-block overflow-hidden align-baseline"
            style={{ height: "1em", width: "1ch" }}
          >
            <AnimatePresence initial={false}>
              <motion.span
                key={digit}
                initial={reduce ? false : { y: 8, opacity: 0, filter: "blur(3px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={reduce ? undefined : { y: -8, opacity: 0, filter: "blur(3px)" }}
                transition={{ duration: reduce ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </span>
        ))}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

export function ExposureInstrument() {
  const [risk, setRisk] = useState(62);
  const reduce = Boolean(useReducedMotion());
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
          <div className="font-display text-5xl font-bold tracking-[-0.04em] text-ink sm:text-6xl">
            <DigitReadout value={regime.equity} reduce={reduce} />
            <span className="text-3xl text-ink-faint sm:text-4xl">%</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[13px] font-semibold text-ink-muted">Held in cash</div>
          <div className="font-display text-3xl font-bold tracking-[-0.03em] text-ink-faint">
            <DigitReadout value={cash} reduce={reduce} />
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

        {/* Regime scale — the same 20/40/60/80 thresholds the calculation
            breaks on, drawn as ticks against the track so the slider's snap
            points are visible before anyone touches it. One scale, not two:
            the labels below belong to these same ticks, not a second ladder. */}
        <div className="relative mt-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-3 -translate-y-1/2"
          >
            {BOUNDARIES.map((boundary) => (
              <span
                key={boundary}
                className="absolute top-0 h-3 w-px bg-rule-strong"
                style={{ left: `${boundary}%` }}
              />
            ))}
          </div>

          <input
            id="market-risk"
            type="range"
            min={0}
            max={100}
            value={risk}
            onChange={(e) => setRisk(Number(e.target.value))}
            aria-describedby="market-risk-reading"
            className="vsc-range relative w-full"
            style={{ "--fill": `${risk}%` } as React.CSSProperties}
          />
        </div>

        {/* Full five-name scale — desktop/tablet only. On narrow layouts
            the ticks above and the regime pill above that already carry the
            signal; spelling out all five names at 360px would only crowd. */}
        <div aria-hidden="true" className="mt-2 hidden grid-cols-5 gap-1 sm:grid">
          {REGIMES.map((r) => {
            const isActive = r.name === regime.name;
            return (
              <span
                key={r.name}
                className={cn(
                  "text-center text-[10.5px] leading-tight tracking-tight transition-colors",
                  isActive ? "font-semibold text-growth-deep" : "text-ink-faint"
                )}
              >
                {r.name}
              </span>
            );
          })}
        </div>

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

"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { useHydratedReducedMotion } from "@/components/ui/vsc/useHydratedReducedMotion";
import { cn } from "@/lib/utils";

/**
 * "Why VSC exists" — illustrative & interactive visual breakdown.
 *
 * Shows the same market cycle in two states ("With VSC rules" vs
 * "Without rules") and lets the visitor focus on any of the three
 * concrete rules directly on the diagram:
 *   1. Filter weak markets first (hold cash vs look for setups)
 *   2. Mark entry & stop-loss before buying
 *   3. Cap account risk per trade
 */

type ChartMode = "with-rules" | "without-rules";
type FocusStep = "all" | 1 | 2 | 3;

const RULES: Array<{
  step: 1 | 2 | 3;
  title: string;
  summary: string;
}> = [
  {
    step: 1,
    title: "Check the market first",
    summary: "Hold cash in weak markets. Only hunt setups when trend and breadth turn healthy.",
  },
  {
    step: 2,
    title: "Mark the exit before buying",
    summary: "Every entry has a pre-defined stop-loss level below it — never buy and hope.",
  },
  {
    step: 3,
    title: "Cap the loss per trade",
    summary: "Position size is calculated from the stop distance so one wrong trade stays small.",
  },
];

// Price path across 760×360 viewBox:
// Left (x 24..284): choppy weak market drifting down
// Right (x 284..736): recovery, higher low, clean breakout at (492, 162), steady uptrend
const PRICE_PATH =
  "M 24 156 L 76 184 L 122 146 L 172 224 L 216 196 L 264 268 " +
  "L 304 246 L 348 214 L 388 232 L 434 176 L 466 192 L 492 162 " +
  "L 548 124 L 606 106 L 664 78 L 732 52";

export function WhyVscExists() {
  const [mode, setMode] = useState<ChartMode>("with-rules");
  const [focusStep, setFocusStep] = useState<FocusStep>("all");
  const reduce = useHydratedReducedMotion();

  const transition = reduce ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  const showStep = (step: 1 | 2 | 3) => mode === "with-rules" && (focusStep === "all" || focusStep === step);
  const dimStep = (step: 1 | 2 | 3) => (showStep(step) ? 1 : 0.2);

  return (
    <section
      id="why-vsc-exists"
      className="relative w-full overflow-hidden border-b border-rule bg-canvas py-24 sm:py-32"
    >
      <div className="container mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left column: concise heading + interactive 3-rule selector */}
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Why VSC exists</span>
              <h2 className="font-editorial mt-3 text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.04] text-ink">
                Most losses come from trading without rules.
              </h2>
              <p className="mt-4 max-w-[44ch] text-[16.5px] leading-relaxed text-ink-soft">
                Select a rule below to isolate it on the chart, or flip to{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("without-rules");
                    setFocusStep("all");
                  }}
                  className="font-semibold text-clay underline decoration-clay/40 underline-offset-4 hover:text-ink"
                >
                  without rules
                </button>{" "}
                to see the difference.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-7 space-y-2.5">
              {RULES.map((rule) => {
                const isSelected = mode === "with-rules" && focusStep === rule.step;
                const isActive = mode === "with-rules" && (focusStep === "all" || focusStep === rule.step);
                return (
                  <button
                    key={rule.step}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setMode("with-rules");
                      setFocusStep(isSelected ? "all" : rule.step);
                    }}
                    className={cn(
                      "flex min-h-[60px] w-full items-start gap-3.5 rounded-vsc-lg border p-4 text-left transition-all",
                      isSelected
                        ? "border-growth bg-growth-wash shadow-lift-1"
                        : isActive
                          ? "border-rule bg-surface hover:border-growth/50"
                          : "border-rule bg-canvas-sunk/60 opacity-75 hover:opacity-100"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-semibold tabular-nums transition-colors",
                        isSelected ? "bg-growth text-white" : "bg-growth-tint text-growth-deep"
                      )}
                    >
                      {rule.step}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[15.5px] font-semibold leading-snug text-ink">{rule.title}</div>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">{rule.summary}</p>
                    </div>
                  </button>
                );
              })}

              {mode === "with-rules" && focusStep !== "all" && (
                <button
                  type="button"
                  onClick={() => setFocusStep("all")}
                  className="inline-flex min-h-[44px] items-center px-1 text-[13.5px] font-semibold text-growth hover:text-growth-deep"
                >
                  Show all 3 rules together &rarr;
                </button>
              )}
            </Reveal>
          </div>

          {/* Right column: illustrative interactive chart */}
          <div className="min-w-0 lg:col-span-7">
            <Reveal delay={0.08}>
              <figure className="min-w-0 rounded-vsc-xl border border-rule bg-surface p-5 shadow-lift-2 sm:p-7">
                {/* Mode switcher header */}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
                  <div
                    role="tablist"
                    aria-label="Compare trading with VSC rules versus without rules"
                    className="inline-flex rounded-vsc-md border border-rule bg-canvas-sunk p-1"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === "with-rules"}
                      onClick={() => setMode("with-rules")}
                      className={cn(
                        "min-h-[40px] rounded-[7px] px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors",
                        mode === "with-rules"
                          ? "bg-growth text-white shadow-lift-1"
                          : "text-ink-muted hover:text-ink"
                      )}
                    >
                      With VSC rules
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === "without-rules"}
                      onClick={() => {
                        setMode("without-rules");
                        setFocusStep("all");
                      }}
                      className={cn(
                        "min-h-[40px] rounded-[7px] px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors",
                        mode === "without-rules"
                          ? "bg-clay text-white shadow-lift-1"
                          : "text-ink-muted hover:text-ink"
                      )}
                    >
                      Without rules
                    </button>
                  </div>

                  <span className="text-[13px] font-medium text-ink-muted">
                    {mode === "with-rules"
                      ? focusStep === "all"
                        ? "All 3 rules active"
                        : `Focused on Rule ${focusStep}`
                      : "Common unplanned traps"}
                  </span>
                </div>

                {/* SVG Illustration */}
                <div className="relative w-full" style={{ aspectRatio: "760 / 360" }}>
                  <svg
                    viewBox="0 0 760 360"
                    preserveAspectRatio="xMidYMid meet"
                    className="h-full w-full"
                    role="img"
                    aria-label={
                      mode === "with-rules"
                        ? "Illustrative market cycle showing Rule 1 holding cash during the weak market on the left, and in the healthy market on the right marking a defined entry, horizontal stop-loss floor, and capped account risk."
                        : "Illustrative market cycle showing unplanned trading traps: buying a tip in a weak market, chasing a rally without a stop, and taking an oversized loss."
                    }
                  >
                    {/* Subtle horizontal guide lines */}
                    {[90, 175, 260].map((y) => (
                      <line key={y} x1={24} y1={y} x2={736} y2={y} stroke="var(--rule)" strokeWidth={1} />
                    ))}

                    {mode === "with-rules" ? (
                      <g>
                        {/* Rule 1: Regime zones */}
                        <g opacity={dimStep(1)}>
                          <rect
                            x={24}
                            y={18}
                            width={254}
                            height={292}
                            rx={10}
                            fill="var(--clay-tint)"
                            fillOpacity={0.75}
                          />
                          <rect
                            x={292}
                            y={18}
                            width={444}
                            height={292}
                            rx={10}
                            fill="var(--growth-wash)"
                          />
                          <line
                            x1={285}
                            y1={18}
                            x2={285}
                            y2={310}
                            stroke="var(--rule-strong)"
                            strokeWidth={1.5}
                            strokeDasharray="4 4"
                          />
                          <g className="hidden sm:block">
                            <rect x={36} y={30} width={178} height={26} rx={13} fill="var(--surface)" stroke="var(--clay)" strokeOpacity={0.35} />
                            <text
                              x={125}
                              y={47}
                              textAnchor="middle"
                              fill="var(--clay)"
                              style={{ font: "600 12px var(--font-ui)" }}
                            >
                              1 · Weak market: hold cash
                            </text>

                            <rect x={306} y={30} width={206} height={26} rx={13} fill="var(--surface)" stroke="var(--growth)" strokeOpacity={0.35} />
                            <text
                              x={409}
                              y={47}
                              textAnchor="middle"
                              fill="var(--growth-deep)"
                              style={{ font: "600 12px var(--font-ui)" }}
                            >
                              1 · Healthy trend: look for setups
                            </text>
                          </g>
                        </g>

                        {/* Price path: muted in weak zone, solid in healthy zone */}
                        <path
                          d={PRICE_PATH}
                          fill="none"
                          stroke="var(--ink)"
                          strokeOpacity={0.72}
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Rule 2: Defined Entry + Stop-loss floor + bounded risk zone */}
                        <g opacity={dimStep(2)}>
                          {/* Shaded small risk band between Entry (y=162) and Stop (y=204) */}
                          <rect
                            x={492}
                            y={162}
                            width={148}
                            height={42}
                            fill="var(--clay-tint)"
                            fillOpacity={0.85}
                          />
                          {/* Stop line */}
                          <line
                            x1={444}
                            y1={204}
                            x2={684}
                            y2={204}
                            stroke="var(--clay)"
                            strokeWidth={2}
                            strokeDasharray="6 4"
                          />
                          {/* Entry dot */}
                          <circle cx={492} cy={162} r={7} fill="var(--growth)" stroke="var(--surface)" strokeWidth={2.5} />

                          <g className="hidden sm:block">
                            <rect x={384} y={118} width={96} height={26} rx={13} fill="var(--growth)" />
                            <text
                              x={432}
                              y={135}
                              textAnchor="middle"
                              fill="#FFFFFF"
                              style={{ font: "600 12px var(--font-ui)" }}
                            >
                              2 · Entry set
                            </text>

                            <rect x={464} y={214} width={180} height={26} rx={13} fill="var(--surface)" stroke="var(--clay)" />
                            <text
                              x={554}
                              y={231}
                              textAnchor="middle"
                              fill="var(--clay)"
                              style={{ font: "600 12px var(--font-ui)" }}
                            >
                              2 · Stop-loss: exit if wrong
                            </text>
                          </g>
                        </g>

                        {/* Rule 3: Visual Position-Size Risk Cap Meter */}
                        <g opacity={dimStep(3)} className="hidden sm:block">
                          <rect
                            x={480}
                            y={254}
                            width={242}
                            height={44}
                            rx={8}
                            fill="var(--surface)"
                            stroke="var(--rule-strong)"
                          />
                          <text
                            x={494}
                            y={273}
                            fill="var(--ink)"
                            style={{ font: "600 12px var(--font-ui)" }}
                          >
                            3 · Max risk capped: 1%–2% of capital
                          </text>
                          {/* Meter bar */}
                          <rect x={494} y={282} width={214} height={7} rx={3.5} fill="var(--growth-tint)" />
                          <rect x={494} y={282} width={28} height={7} rx={3.5} fill="var(--clay)" />
                        </g>
                      </g>
                    ) : (
                      <g>
                        {/* Without rules: flat unguided canvas + trap points */}
                        <path
                          d={PRICE_PATH}
                          fill="none"
                          stroke="var(--ink-faint)"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Mistake 1: Bought tip into weak market */}
                        <circle cx={122} cy={146} r={7} fill="var(--clay)" stroke="var(--surface)" strokeWidth={2.5} />
                        <line x1={122} y1={146} x2={264} y2={268} stroke="var(--clay)" strokeWidth={2} strokeDasharray="4 4" />
                        <g className="hidden sm:block">
                          <rect x={40} y={96} width={174} height={28} rx={14} fill="var(--clay-tint)" stroke="var(--clay)" />
                          <text x={127} y={114} textAnchor="middle" fill="var(--clay)" style={{ font: "600 12px var(--font-ui)" }}>
                            Bought tip in weak market
                          </text>
                        </g>

                        {/* Mistake 2: Panic sold at the bottom */}
                        <circle cx={264} cy={268} r={7} fill="var(--clay)" stroke="var(--surface)" strokeWidth={2.5} />
                        <g className="hidden sm:block">
                          <rect x={166} y={284} width={196} height={28} rx={14} fill="var(--clay-tint)" stroke="var(--clay)" />
                          <text x={264} y={302} textAnchor="middle" fill="var(--clay)" style={{ font: "600 12px var(--font-ui)" }}>
                            No stop — panicked near bottom
                          </text>
                        </g>

                        {/* Mistake 3: Hesitated or oversized late */}
                        <circle cx={606} cy={106} r={7} fill="var(--clay)" stroke="var(--surface)" strokeWidth={2.5} />
                        <g className="hidden sm:block">
                          <rect x={436} y={42} width={212} height={28} rx={14} fill="var(--clay-tint)" stroke="var(--clay)" />
                          <text x={542} y={60} textAnchor="middle" fill="var(--clay)" style={{ font: "600 12px var(--font-ui)" }}>
                            Chased late, sized on emotion
                          </text>
                        </g>
                      </g>
                    )}
                  </svg>
                </div>

                {/* Mobile-friendly plain-English legend (replaces SVG labels on narrow viewports) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${mode}-${focusStep}`}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={transition}
                    className="mt-3 grid grid-cols-1 gap-2 text-[13px] sm:hidden"
                  >
                    {mode === "with-rules" ? (
                      <>
                        <div className="rounded-md bg-clay-tint px-3 py-2 font-medium text-clay">
                          Left: Weak market &mdash; hold cash
                        </div>
                        <div className="rounded-md bg-growth-wash px-3 py-2 font-medium text-growth-deep">
                          Right: Healthy trend &mdash; entry, stop-loss &amp; 1%&ndash;2% risk cap
                        </div>
                      </>
                    ) : (
                      <div className="rounded-md bg-clay-tint px-3 py-2 font-medium text-clay">
                        Without rules: bought weak market &rarr; sold at bottom &rarr; chased late on emotion
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4 text-[13px] text-ink-muted">
                  <span>Illustrative trading cycle &mdash; educational process only.</span>
                  <a
                    href="#process"
                    className="inline-flex min-h-[44px] items-center font-semibold text-growth hover:text-growth-deep"
                  >
                    See the 5-step process <span aria-hidden="true" className="ml-1">&darr;</span>
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

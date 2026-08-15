"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * The process, walked rather than listed.
 *
 * Five cards of body copy asks the reader to absorb five things at once,
 * so they absorb none. A stepper shows one at a time and lets them travel,
 * which is both less text on screen and more understanding per screen.
 *
 * Implemented as a real tablist: arrow keys move between stages, Home/End
 * jump to the ends, and the panel is properly associated. Progressive
 * disclosure that only works with a mouse isn't progressive, it's hidden.
 */

const STAGES = [
  {
    id: "scan",
    name: "Scan",
    summary: "Look where strength already is.",
    gate: "Liquidity and relative strength above floor",
    detail:
      "The universe is filtered before anything is judged. Instruments too thin to exit cleanly never reach the next stage, regardless of how good the story is.",
  },
  {
    id: "validate",
    name: "Validate",
    summary: "Confirm the setup against the regime.",
    gate: "Trend, momentum and breadth agree",
    detail:
      "A setup that would be taken in a constructive regime is declined in a deteriorating one. The same chart is not the same trade in different weather.",
  },
  {
    id: "execute",
    name: "Execute",
    summary: "Size the position off the risk, not the conviction.",
    gate: "Maximum 2% of capital at risk per trade",
    detail:
      "The exit is defined before the entry. Position size is whatever makes that predefined loss equal 2% — so the strength of an opinion cannot quietly increase the amount at stake.",
  },
  {
    id: "monitor",
    name: "Monitor",
    summary: "Let cash be a position.",
    gate: "Exposure tracks the prevailing regime",
    detail:
      "When risk stops being compensated, exposure comes down and stays down. Holding cash is an active decision here, not a failure to find ideas.",
  },
  {
    id: "review",
    name: "Review",
    summary: "Grade the decision, not the outcome.",
    gate: "Every closed position is logged and read",
    detail:
      "A profitable trade taken outside the rules is recorded as a process failure. A loss taken correctly is not. Otherwise luck rewrites the method.",
  },
];

export function ProcessStepper() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: STAGES.length - 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const next = (moves[e.key] + STAGES.length) % STAGES.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const stage = STAGES[active];

  return (
    <section id="process" className="relative w-full border-b border-vsc-dark-hairline bg-vsc-dark py-20 sm:py-28">
      <div className="container mx-auto max-w-[1120px]">
        <Reveal className="max-w-[58ch]">
          {/* Can't reuse the shared `.eyebrow` class here: its colour is
              hardcoded to `var(--growth)` outside any Tailwind layer, so it
              always wins over a utility class regardless of source order.
              Reproduced locally at the same size/weight/spacing instead. */}
          <span className="mb-[18px] inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.01em] text-vsc-dark-accent">
            <span aria-hidden="true" className="h-0.5 w-[18px] shrink-0 rounded-full bg-vsc-dark-accent" />
            The process
          </span>
          <h2 className="font-display text-vsc-dark-ink">Five gates. Capital passes all of them or none.</h2>
        </Reveal>

        {/* --- The rail ---------------------------------------------------- */}
        <Reveal delay={0.08} className="mt-10 sm:mt-14">
          <div
            role="tablist"
            aria-label="The five stages of the VSC process"
            onKeyDown={onKeyDown}
            className="relative grid grid-cols-1 gap-2 sm:grid-cols-5 sm:gap-0"
          >
            {/* the track the nodes sit on */}
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[19px] hidden h-[2px] bg-vsc-dark-hairline sm:block"
            />
            <motion.span
              aria-hidden="true"
              className="absolute left-0 top-[19px] hidden h-[2px] bg-growth sm:block"
              animate={{ width: `${(active / (STAGES.length - 1)) * 100}%` }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 190, damping: 26 }}
            />

            {STAGES.map((s, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`stage-tab-${s.id}`}
                  aria-selected={isActive}
                  aria-controls="stage-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group relative flex items-center gap-3 rounded-vsc-md p-2 text-left sm:flex-col sm:items-start sm:gap-0 sm:bg-transparent sm:p-0 sm:pr-4"
                >
                  <span
                    className={[
                      "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-[15px] font-bold tabular-nums transition-colors duration-200",
                      isActive
                        ? "border-growth bg-growth text-white"
                        : isPast
                          ? "border-growth bg-growth-tint text-growth-deep"
                          : "border-vsc-dark-hairline bg-transparent text-vsc-dark-ink-muted group-hover:border-vsc-dark-ink-muted group-hover:text-vsc-dark-ink",
                    ].join(" ")}
                  >
                    {i + 1}
                  </span>
                  <span className="sm:mt-3">
                    <span
                      className={[
                        "block font-display text-[19px] font-semibold tracking-tight transition-colors duration-200",
                        isActive ? "text-vsc-dark-ink" : "text-vsc-dark-ink-muted group-hover:text-vsc-dark-ink",
                      ].join(" ")}
                    >
                      {s.name}
                    </span>
                    <span className="mt-0.5 block max-w-[22ch] text-[14px] leading-snug text-vsc-dark-ink-muted">
                      {s.summary}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* --- The panel --------------------------------------------------- */}
        <Reveal delay={0.12} className="mt-8">
          <div
            role="tabpanel"
            id="stage-panel"
            aria-labelledby={`stage-tab-${stage.id}`}
            tabIndex={0}
            className="min-h-[210px] rounded-vsc-xl border border-vsc-dark-hairline bg-vsc-dark p-6 shadow-lift-1 sm:min-h-[190px] sm:p-9"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-6 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-4">
                  <div className="text-[13px] font-semibold uppercase tracking-wide text-vsc-dark-accent">
                    Gate {active + 1}
                  </div>
                  <p className="mt-2 font-display text-[21px] font-semibold leading-tight tracking-tight text-vsc-dark-accent">
                    {stage.gate}
                  </p>
                </div>
                <p className="max-w-measure text-[17px] leading-relaxed text-vsc-dark-ink md:col-span-8">
                  {stage.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

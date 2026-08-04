"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface TimelineStep {
  number: string;
  year?: string;
  title: string;
  description: string;
}

/**
 * Type A, vertical orientation — a numbered rail, not a glowing scroll
 * beam. The previous version (TimelineBeam) drew a gradient bar with a
 * drop-shadow glow that filled in as you scrolled; it looked good but
 * wasn't the same visual language as the numbered-circle rail already
 * built for Home's Five Gates, so the two Type A moments on the site
 * didn't read as the same kind of diagram.
 *
 * "Active node filled" here means: a node fills to `--growth` the moment
 * its step scrolls into view, using the same whileInView trigger already
 * driving the row's own fade-in — no separate scroll-position math needed.
 */
export function TimelineRail({
  steps,
  className = "",
}: {
  steps: TimelineStep[];
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative pl-14 sm:pl-16 ${className}`}>
      {/* Hairline spine */}
      <div className="absolute left-[19px] top-4 bottom-4 w-px bg-rule sm:left-[23px]" />

      <div className="flex flex-col gap-12 sm:gap-14">
        {steps.map((step, idx) => (
          <motion.div
            key={step.number}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            {/* Numbered node — hollow until this step has scrolled into
                view, same fill/border treatment as ProcessStepper on Home. */}
            <motion.span
              aria-hidden="true"
              initial={shouldReduceMotion ? undefined : { backgroundColor: "var(--surface)", color: "var(--ink-faint)", borderColor: "var(--rule-strong)" }}
              whileInView={{ backgroundColor: "var(--growth)", color: "#fff", borderColor: "var(--growth)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, delay: idx * 0.06 + 0.1 }}
              className="absolute -left-14 top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 text-[13px] font-bold tabular-nums sm:-left-16 sm:h-10 sm:w-10"
              style={shouldReduceMotion ? { backgroundColor: "var(--growth)", color: "#fff", borderColor: "var(--growth)" } : undefined}
            >
              {idx + 1}
            </motion.span>

            {step.year && (
              <span className="mb-1.5 block font-mono text-[11px] tracking-[0.1em] text-growth">
                {step.year}
              </span>
            )}
            <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-tight">
              {step.title}
            </h3>
            <p className="mt-2.5 font-mono text-xs sm:text-sm text-ink-soft leading-relaxed max-w-[640px]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

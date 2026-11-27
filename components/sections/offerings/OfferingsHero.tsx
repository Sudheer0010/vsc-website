"use client";

import React, { useCallback, useState } from "react";
import { ArrowDown } from "lucide-react";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { useHydratedReducedMotion } from "@/components/ui/vsc/useHydratedReducedMotion";
import { cn } from "@/lib/utils";
import { OfferingsDepthMark } from "./OfferingsDepthMark";

/**
 * Offerings hero — Atmospheric Editorial Gateway (`bg-[#080F0B]`,
 * ContourField seed 71). Replaces the white Exhibit box (which duplicated
 * the tier descriptions immediately below in StartWhereYouAre) with an
 * architectural dark-ground progression diagram: concentric rings paired
 * with the three progression lenses (Learn / Grow / Connect) that highlight
 * interactively and scroll directly to the decision selector below.
 */
const STAGES = [
  {
    number: "01",
    ring: "outer" as const,
    label: "Learn",
    lens: "Market foundation",
  },
  {
    number: "02",
    ring: "middle" as const,
    label: "Grow",
    lens: "Rules & discipline",
  },
  {
    number: "03",
    ring: "inner" as const,
    label: "Connect",
    lens: "Strategic dialogue",
  },
] as const;

export function OfferingsHero() {
  const reduce = useHydratedReducedMotion();
  const [hoveredRing, setHoveredRing] = useState<"outer" | "middle" | "inner" | null>(null);

  const scrollToDecision = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      document.getElementById("start-where-you-are")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    },
    [reduce]
  );

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#080F0B] pb-16 pt-28 sm:pb-20 sm:pt-32">
      <ContourField seed={71} layers={3} density={10} strokeColor="#7FB999" baseOpacity={0.86} animate />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 72% 20%, rgba(63,203,116,0.18) 0%, transparent 68%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">
        {/* Orientation bar */}
        <Reveal distance={8}>
          <div className="flex items-center justify-between gap-6 border-b border-white/12 pb-4">
            <div className="flex items-center gap-3">
              <StepRule size="sm" />
              <span className="text-[13px] font-semibold tracking-[0.02em] text-[#7FB999]">
                Offerings
              </span>
            </div>
            <span className="hidden text-[13px] text-white/50 sm:inline">
              Three stages &middot; Open access to by invitation
            </span>
          </div>
        </Reveal>

        <div className="grid items-end gap-12 pt-10 sm:pt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal delay={0.04} distance={14}>
              <h1 className="font-display text-[clamp(2.35rem,4.3vw,3.85rem)] font-bold leading-[0.96] tracking-[-0.03em] text-[#F4F7F4]">
                Learn. Grow. Connect.{" "}
                <span className="block text-[0.94em]">With VSC.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.09} distance={10}>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-[#D7E0DA]">
                From learning the markets, to strengthening your process, to staying connected with serious market
                participants &mdash; each VSC offering supports a different stage of the journey.
              </p>
            </Reveal>

            <Reveal delay={0.14} distance={8}>
              <div className="mt-8">
                <a
                  href="#start-where-you-are"
                  onClick={scrollToDecision}
                  className="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-vsc-md bg-growth px-6 py-3 font-ui text-[16px] font-semibold tracking-[-0.01em] text-white shadow-lift-growth transition-[background-color,transform] duration-200 ease-physical hover:-translate-y-0.5 hover:bg-growth-deep motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  See what fits
                  <ArrowDown
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Architectural depth lens directly on dark canvas (no duplicate Exhibit card) */}
          <Reveal
            delay={0.14}
            distance={12}
            className="border-t border-white/10 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:border-white/12 lg:pl-10 lg:pt-1"
          >
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center lg:gap-7">
              <OfferingsDepthMark
                size={112}
                tone="dark"
                active={hoveredRing ?? "all"}
                className="shrink-0"
              />
              <ul
                onMouseLeave={() => setHoveredRing(null)}
                className="w-full divide-y divide-white/10"
              >
                {STAGES.map((stage) => {
                  const isActive = hoveredRing === stage.ring;
                  return (
                    <li key={stage.number} className="py-2.5 first:pt-0 last:pb-0">
                      <a
                        href="#start-where-you-are"
                        onClick={scrollToDecision}
                        onMouseEnter={() => setHoveredRing(stage.ring)}
                        onFocus={() => setHoveredRing(stage.ring)}
                        onBlur={() => setHoveredRing(null)}
                        className="group flex items-baseline justify-between gap-4 py-1"
                      >
                        <span className="flex items-baseline gap-2.5">
                          <span className="font-mono text-[11.5px] font-semibold tabular-nums text-[#7FB999]">
                            {stage.number}
                          </span>
                          <span
                            className={cn(
                              "font-display text-[17px] font-semibold transition-colors duration-150",
                              isActive ? "text-[#7FB999]" : "text-[#F4F7F4] group-hover:text-[#7FB999]"
                            )}
                          >
                            {stage.label}
                          </span>
                        </span>
                        <span className="text-right text-[13px] text-white/60 transition-colors duration-150 group-hover:text-[#D7E0DA]">
                          {stage.lens}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

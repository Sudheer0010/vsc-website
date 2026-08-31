"use client";

import React, { useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { OfferingsDepthMark } from "./OfferingsDepthMark";

/**
 * Offerings hero — Cinematic Signal, same dark register and ContourField
 * seed (71) as the homepage/About heroes. States the philosophy on the
 * left; the right holds a light analytical exhibit ("Exhibit 01 ·
 * Structure") that shows the three entry points against the dark field
 * instead of a card matching the dark background — the contrast is
 * deliberate.
 */

/**
 * The hero legend for the concentric-ring mark: outer ring is the
 * broadest entry point, the filled core is the deepest. Kept local rather
 * than added to offeringsConfig because it's a hero-only framing (name +
 * ring colour), not a fact used anywhere else on the page — the "Start
 * where you are" rows below carry their own, differently-axed facts.
 */
const TIERS = [
  {
    ring: "outer" as const,
    color: "var(--ink-soft)",
    name: "Learning Hub",
    desc: "Where you start — the broadest entry point.",
  },
  {
    ring: "middle" as const,
    color: "var(--growth)",
    name: "VSC Advantage",
    desc: "Closer guidance on your own positions.",
  },
  {
    ring: "inner" as const,
    color: "var(--growth-deep)",
    name: "VSC Community",
    desc: "Shared learning with serious market participants.",
  },
];

export function OfferingsHero() {
  const reduce = useReducedMotion();

  const scrollToDecision = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      document.getElementById("start-where-you-are")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    },
    [reduce]
  );

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#080F0B] pb-24 pt-32 sm:pb-32 sm:pt-40">
      <ContourField seed={71} layers={3} density={10} strokeColor="#7FB999" baseOpacity={0.9} animate />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 70% 20%, rgba(63,203,116,0.20) 0%, transparent 68%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]">
                Offerings
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 max-w-[18ch] font-sans text-[12vw] font-bold leading-[0.96] tracking-[-0.03em] text-[#F4F7F4] sm:text-[7vw] lg:text-[4.4vw]">
                Three Pillars.
                <br />
                One Disciplined Approach.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-[56ch] text-[18px] leading-relaxed text-white/60">
                Every VSC offering builds the same systematic thinking — from foundational market education, to
                disciplined portfolio guidance, to serious market participation. Different starting points, one
                underlying process.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9">
                <a
                  href="#start-where-you-are"
                  onClick={scrollToDecision}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-vsc-md bg-growth px-6 py-3 font-ui text-[16px] font-semibold tracking-[-0.01em] text-white shadow-lift-growth transition-[background-color,transform] duration-200 ease-physical hover:-translate-y-0.5 hover:bg-growth-deep"
                >
                  See what fits <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* --- Exhibit 01 · Structure — light panel, dark field ------
              Concentric rings: the outer ring is the broadest entry point,
              the filled core is the deepest. No caption — the ring/name/
              description legend states the depth relationship in real
              text next to the mark, so a separate explanatory caption
              would only repeat it. */}
          <Reveal delay={0.16} distance={20} className="lg:col-span-5">
            <Exhibit
              number={1}
              label="Structure"
              className="mx-auto w-full max-w-[440px] rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-2 sm:p-8 lg:ml-auto lg:mr-0"
            >
              <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
                <OfferingsDepthMark size={140} className="mx-auto shrink-0 sm:mx-0" />
                <ul className="space-y-5">
                  {TIERS.map((tier) => (
                    <li key={tier.name} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[5px] h-3 w-3 shrink-0 rounded-full border-2"
                        style={{ borderColor: tier.color }}
                      />
                      <div>
                        <div className="font-display text-[17px] font-semibold tracking-tight text-ink">
                          {tier.name}
                        </div>
                        <div className="text-[14px] leading-snug text-ink-soft">{tier.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Exhibit>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

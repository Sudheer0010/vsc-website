"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { OfferingsDepthMark } from "./OfferingsDepthMark";

/**
 * Two columns: the claim on the left, the evidence on the right. The old
 * hero stated "Three Pillars" and then illustrated it with three small
 * pill badges that repeated the same three names the paragraph and the
 * decision list below both already say. The diagram now carries that
 * information structurally instead — depth, not a repeated list.
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
    name: "Inner Circle",
    desc: "The core — direct access to the research desk.",
  },
];

export function OfferingsHero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToOverview = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("offerings-overview");
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const animProps = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }
  } as const;

  return (
    <section className="relative w-full min-h-[85vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden select-none border-b border-rule z-10">
      {/* Paper grain — vsc_offerings_hero.png was leftover dark-navy-and-
          gold generated art from before this redesign. Same treatment as
          the homepage hero: felt texture + a warm glow. */}
      <div
        aria-hidden="true"
        className="paper-texture pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 75% at 68% 40%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 68% 40%, #000 20%, transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 z-0 h-[560px] w-[560px] -translate-y-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(15,122,64,0.10) 0%, transparent 70%)" }}
      />

      <div className="container relative z-20 mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* --- The claim --------------------------------------------- */}
          <div className="lg:col-span-6">
            <motion.span
              className="font-mono text-xs md:text-sm tracking-[0.2em] text-accent-gold uppercase mb-6 font-bold block"
              {...animProps}
            >
              OFFERINGS
            </motion.span>

            <motion.h1
              className="font-display text-5xl sm:text-6xl md:text-[68px] leading-[1.06] text-ink font-normal tracking-tight mb-8"
              {...animProps}
              transition={{ ...animProps.transition, delay: 0.05 }}
            >
              Three Pillars.<br />One Investment Philosophy.
            </motion.h1>

            <motion.p
              className="font-mono text-sm md:text-base text-ink-soft leading-relaxed max-w-[560px] mb-10"
              {...animProps}
              transition={{ ...animProps.transition, delay: 0.1 }}
            >
              Every VSC offering exists to build systematic thinking—from foundational market education, to disciplined portfolio guidance, to institutional-grade research.
            </motion.p>

            <motion.div
              className="flex"
              {...animProps}
              transition={{ ...animProps.transition, delay: 0.15 }}
            >
              <a
                href="#offerings-overview"
                onClick={handleScrollToOverview}
                className="btn btn-gold"
                style={{ padding: "14px 28px", fontSize: "12px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}
              >
                EXPLORE OFFERINGS
              </a>
            </motion.div>
          </div>

          {/* --- The evidence -------------------------------------------
              Exhibit 01: three concentric rings. Increasing depth, not
              increasing price — the caption states that relationship in
              real text, since the shape alone can't. */}
          <motion.div
            className="lg:col-span-6"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.12 }}
          >
            <Exhibit
              number={1}
              label="Structure"
              caption="Each ring is a deeper level of engagement, not a higher price tier. Pricing for all three is shared directly, not published — see “Start where you are” below."
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-2 sm:p-8"
            >
              <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
                <OfferingsDepthMark size={168} className="mx-auto shrink-0 sm:mx-0" />
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
                        <div className="text-[14px] leading-snug text-ink-soft">
                          {tier.desc}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Exhibit>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProcessStepper } from "@/components/sections/home/ProcessStepper";
import { RiskSection } from "@/components/sections/home/RiskSection";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { ProductionHero } from "@/app/design-lab/_components/ProductionHero";
import {
  BELIEF_COPY,
  HOW_WE_HELP_COPY,
  DRAWDOWN_COPY,
  RESEARCH_COPY,
  CTA_COPY,
  COMPLIANCE_COPY,
} from "@/app/design-lab/_lib/copy";

const mono = "font-mono";

/**
 * Home-C — Data-Native Future, applied to everything after the fixed
 * Direction B anchor (Hero / Five Gates / Risk, unchanged). Unlike home-a,
 * the page never leaves the dark register — the bet here is a continuous
 * instrument-panel experience, not a return to daylight. Every section
 * either carries a real state (a click, a drag) or an abstract signal
 * motif; nothing is decorative-only.
 */
export function HomeC() {
  return (
    <main className="bg-[#0E1A14]">
      <ProductionHero />
      <BeliefSystem />
      <HowWeHelpDynamic />
      <DrawdownDataNative />
      <ProcessStepper />
      <RiskSection />
      <ResearchAlive />
      <CtaConvergence />
      <ComplianceIntegrated />
    </main>
  );
}

/* ---------------------------------------------------------------- Belief */

function BeliefSystem() {
  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#0E1A14] py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <span className={`${mono} text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]`}>
          What VSC is built on
        </span>

        <div className="relative mt-16">
          <svg
            className="pointer-events-none absolute inset-x-0 top-6 hidden h-16 w-full sm:block"
            viewBox="0 0 900 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M60 30 L440 30 L460 12 L900 12"
              fill="none"
              stroke="rgba(127,185,153,0.3)"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
          </svg>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {BELIEF_COPY.items.map((item, i) => (
              <div
                key={item.number}
                className={`relative rounded-xl border border-white/10 bg-white/[0.02] p-7 ${
                  i === 2 ? "sm:mt-6" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3FCB74]" />
                  <span className={`${mono} text-[11px] text-[#7FB999]`}>NODE {item.number}</span>
                </div>
                <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-[#F4F7F4]">{item.title}</h3>
                <div className={`${mono} mt-2 text-[12.5px] leading-relaxed text-[#7FB999]`}>{item.shortLine}</div>
                <div className="mt-3 text-[14.5px] leading-relaxed text-white/55">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ How We Help */

const HOW_WE_HELP_ICONS = ["LN", "GR", "CN"];

function HowWeHelpDynamic() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const v = HOW_WE_HELP_COPY.verticals[active];

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#050A07] py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <span className={`${mono} text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]`}>
          {HOW_WE_HELP_COPY.heading}
        </span>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div role="tablist" aria-label="Learn, Grow, Connect" className="flex gap-3 lg:col-span-4 lg:flex-col">
            {HOW_WE_HELP_COPY.verticals.map((item, i) => (
              <button
                key={item.number}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`flex flex-1 items-center gap-4 rounded-xl border p-5 text-left transition-colors lg:flex-none ${
                  i === active ? "border-[#3FCB74] bg-[#3FCB74]/10" : "border-white/10 hover:border-white/25"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold ${mono} ${
                    i === active ? "border-[#3FCB74] bg-[#3FCB74] text-[#050A07]" : "border-white/20 text-white/40"
                  }`}
                >
                  {HOW_WE_HELP_ICONS[i]}
                </span>
                <span
                  className={`text-[15px] font-semibold ${i === active ? "text-[#F4F7F4]" : "text-white/50"}`}
                >
                  {item.verb.replace(".", "")}
                </span>
              </button>
            ))}
          </div>

          <motion.div
            key={v.number}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-8"
          >
            <span className={`${mono} text-[11px] uppercase tracking-wide text-[#7FB999]`}>{v.label}</span>
            <h3 className="mt-3 text-[10vw] font-bold leading-[0.95] text-[#F4F7F4] sm:text-[5vw] lg:text-[3.4vw]">
              {v.verb}
            </h3>
            <div className="mt-4 max-w-[56ch] text-[17px] font-medium leading-snug text-white/80">{v.tagline}</div>
            <div className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-white/55">{v.body}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Drawdown */

const ZONES = [
  { max: 41, label: "Tracking together", detail: "Both positions rise with the market. No divergence yet." },
  { max: 71, label: "Risk reduced — cash rising", detail: DRAWDOWN_COPY.annotations.holdCash },
  { max: 100, label: "Re-entered — compounding from a higher base", detail: DRAWDOWN_COPY.annotations.improve },
];

function DrawdownDataNative() {
  const [scrub, setScrub] = useState(62);
  const reduce = useReducedMotion();
  const x = 8 + (scrub / 100) * (594 - 8);
  const zone = ZONES.find((z) => scrub <= z.max) ?? ZONES[ZONES.length - 1];

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: "-15%" },
          transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#0E1A14] py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <span className={`${mono} text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]`}>
          Scrub the drawdown
        </span>
        <h2 className="mt-4 max-w-[26ch] text-[9vw] font-bold leading-[1] text-[#F4F7F4] sm:text-[4.4vw] lg:text-[2.6vw]">
          {DRAWDOWN_COPY.heading}
        </h2>

        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-9">
          <div className="overflow-x-auto">
            <svg
              viewBox="0 0 602 268"
              role="img"
              aria-label="Two schematic capital curves with a draggable scrub line. Both rise together. When market risk crosses a threshold, the always-invested curve continues down through the drawdown while the risk-managed curve flattens as exposure moves to cash, then re-enters and compounds from a higher base."
              className="h-auto w-full min-w-[520px]"
            >
              <defs>
                <linearGradient id="homeCFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3FCB74" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#3FCB74" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect x="248" y="14" width="180" height="238" fill="rgba(63,203,116,0.06)" />
              <line x1="8" y1="252" x2="594" y2="252" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <motion.path
                d={`${DRAWDOWN_COPY.riskManagedPath} L 594 252 L 8 252 Z`}
                fill="url(#homeCFill)"
                stroke="none"
                initial={reduce ? undefined : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, delay: 0.5 }}
              />
              <motion.path
                d={DRAWDOWN_COPY.alwaysInvestedPath}
                fill="none"
                stroke="#7C4A32"
                strokeWidth="3"
                strokeLinecap="round"
                {...draw(0)}
              />
              <motion.path
                d={DRAWDOWN_COPY.riskManagedPath}
                fill="none"
                stroke="#3FCB74"
                strokeWidth="4"
                strokeLinecap="round"
                {...draw(0.2)}
              />
              {/* scrub line, position driven by the slider below */}
              <line x1={x} y1="10" x2={x} y2="256" stroke="#F4F7F4" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={x} cy="10" r="3" fill="#F4F7F4" />
            </svg>
          </div>

          <div className="mt-8">
            <input
              type="range"
              min={0}
              max={100}
              value={scrub}
              onChange={(e) => setScrub(Number(e.target.value))}
              aria-label="Scrub position along the drawdown timeline"
              aria-describedby="drawdown-zone-reading"
              className="w-full accent-[#3FCB74]"
            />
            <motion.div
              key={zone.label}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              id="drawdown-zone-reading"
              aria-live="polite"
              className="mt-4"
            >
              <span className={`${mono} text-[13px] uppercase tracking-wide text-[#3FCB74]`}>{zone.label}</span>
              <div className="mt-1 max-w-[56ch] text-[15px] leading-relaxed text-white/60">{zone.detail}</div>
            </motion.div>
          </div>

          <div className={`${mono} mt-8 border-t border-white/10 pt-4 text-[12px] text-white/40`}>
            {DRAWDOWN_COPY.caption}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Research */

function SignalTrace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M0 30 Q 15 10, 30 24 T 60 20 T 90 28 T 120 12 T 150 24 T 200 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  );
}

function ResearchAlive() {
  const notes = [
    { title: "The three-day rule", tag: "FRAMEWORK" },
    { title: "Test your trading style", tag: "FRAMEWORK" },
  ];

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#050A07] py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className={`${mono} text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]`}>
              Latest signal
            </span>
            <h2 className="mt-5 text-[9vw] font-bold leading-[1] text-[#F4F7F4] sm:text-[4.2vw] lg:text-[2.4vw]">
              {RESEARCH_COPY.heading}
            </h2>
            <div className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-white/60">{RESEARCH_COPY.body}</div>
            <a
              href="/research"
              className="mt-8 inline-flex items-center gap-2 border border-white/25 px-6 py-3 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#3FCB74] hover:text-[#3FCB74]"
            >
              {RESEARCH_COPY.cta} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-white/10">
              {notes.map((note) => (
                <Link
                  key={note.title}
                  href="/research/notes"
                  className="group flex items-center justify-between gap-6 border-b border-white/10 py-6 no-underline"
                >
                  <div className="flex items-center gap-4">
                    <span className={`${mono} text-[11px] text-[#3FCB74]`}>{note.tag}</span>
                    <span className="text-[18px] font-semibold text-[#F4F7F4] transition-colors group-hover:text-[#3FCB74]">
                      {note.title}
                    </span>
                  </div>
                  <SignalTrace className="hidden h-6 w-24 shrink-0 text-[#3FCB74] sm:block" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- CTA */

function CtaConvergence() {
  return (
    <section className="relative w-full overflow-hidden py-32 sm:py-40">
      <ContourField seed={71} layers={2} density={6} strokeColor="#3FCB74" baseOpacity={0.6} animate safeArea={{ x: 0.15, y: 0.1, w: 0.7, h: 0.8 }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(63,203,116,0.18) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 text-center sm:px-10">
        <span className={`${mono} text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]`}>
          {CTA_COPY.eyebrow}
        </span>
        <h2 className="mx-auto mt-6 max-w-[14ch] text-[15vw] font-bold leading-[0.94] text-[#F4F7F4] sm:text-[7vw] lg:text-[5vw]">
          {CTA_COPY.heading}
        </h2>
        <div className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-relaxed text-white/60">{CTA_COPY.body}</div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="/start"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#0F7A40] px-9 text-[16px] font-semibold text-white transition-colors hover:bg-[#0B6435]"
          >
            {CTA_COPY.primary} <span aria-hidden="true">&rarr;</span>
          </a>
          <a href="/enquire" className={`${mono} text-[13px] text-white/50 hover:text-[#3FCB74]`}>
            {CTA_COPY.secondary} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Compliance */

function ComplianceIntegrated() {
  return (
    <section className="relative w-full border-t border-white/10 bg-[#050A07] py-14">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10">
        <div className={`${mono} mx-auto flex max-w-[74ch] flex-col gap-3 text-center text-[13px] leading-relaxed text-white/40`}>
          <div>{COMPLIANCE_COPY.body}</div>
          <div className="font-semibold text-white/50">{COMPLIANCE_COPY.registration}</div>
        </div>
      </div>
    </section>
  );
}

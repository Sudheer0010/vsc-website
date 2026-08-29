"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExposureInstrument } from "@/components/sections/home/ExposureInstrument";
import { PlasmaField } from "@/app/design-lab/_components/PlasmaField";
import { HERO_COPY, BELIEF_COPY, GATES_COPY, RISK_COPY } from "@/app/design-lab/_lib/copy";

const mono = "font-mono";

/**
 * Direction C — Data-Native Future.
 *
 * The furthest reach of the three: a hand-authored WebGL plasma field in
 * the hero, monospace elevated from "figures only" to a structural voice
 * throughout, and unconventional (but linear-DOM, keyboard-usable) spatial
 * arrangements. Signal motifs stay abstract — a sine trace, never a
 * labelled chart — so nothing here reads as invented performance data.
 */
export function DirectionC() {
  return (
    <main className="bg-[#FBFAF6]">
      <Hero />
      <Editorial />
      <SpatialGates />
      <Conviction />
    </main>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section className="relative w-full overflow-hidden py-32 sm:py-40">
      <PlasmaField />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0E1A14]/35" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <span className={`${mono} text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]`}>
              {HERO_COPY.eyebrow.toUpperCase()}
            </span>
            <h1 className="mt-6 font-sans text-[12vw] font-bold leading-[0.96] tracking-[-0.03em] text-white sm:text-[6.4vw] lg:text-[4.6vw]">
              A smarter way to build and protect capital.
            </h1>
            <div className={`${mono} mt-8 max-w-[58ch] text-[15px] leading-relaxed text-white/70`}>{HERO_COPY.body}</div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-9 inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 text-[14px] font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#3FCB74] hover:text-[#3FCB74]"
            >
              {HERO_COPY.cta} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className="lg:col-span-5">
            <div className="w-full max-w-[420px] lg:ml-auto">
              <ExposureInstrument />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Editorial */

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

function Editorial() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[#161D18]/10 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className={`${mono} flex items-baseline justify-between text-[12px] uppercase tracking-[0.18em] text-[#0F7A40]`}>
          <span>{BELIEF_COPY.heading}</span>
          <span className="hidden sm:inline">03 / 03 PRINCIPLES</span>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#161D18]/10 bg-[#161D18]/10 sm:grid-cols-3">
          {BELIEF_COPY.items.map((item, i) => (
            <div key={item.number} className={`relative bg-white p-8 ${i === 1 ? "sm:translate-y-6" : ""}`}>
              <span className={`${mono} text-[11px] text-[#161D18]/40`}>{item.number}</span>
              <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-[#161D18]">{item.title}</h3>
              <div className="mt-3 text-[15px] leading-relaxed text-[#3D4741]">{item.body}</div>
              <SignalTrace className="mt-6 h-8 w-full text-[#0F7A40]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Spatial gates */

function SpatialGates() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const stage = GATES_COPY.stages[active];

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#0E1A14] py-24 sm:py-32">
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <span className={`${mono} text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]`}>
          {GATES_COPY.eyebrow.toUpperCase()} — 5 GATES
        </span>

        <div role="tablist" aria-label="The five gates" className="relative mt-16 grid grid-cols-1 gap-4 sm:grid-cols-5 sm:gap-3">
          <svg className="pointer-events-none absolute inset-x-0 top-6 hidden h-16 w-full sm:block" viewBox="0 0 500 60" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M40 30 L140 12 L240 46 L340 12 L460 30"
              fill="none"
              stroke="rgba(127,185,153,0.3)"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
          </svg>

          {GATES_COPY.stages.map((s, i) => {
            const offsets = ["sm:mt-0", "sm:mt-6", "sm:-mt-2", "sm:mt-8", "sm:mt-1"];
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`relative flex items-center gap-3 rounded-xl border p-4 text-left transition-colors sm:flex-col sm:items-start ${offsets[i]} ${
                  i === active ? "border-[#3FCB74] bg-[#3FCB74]/10" : "border-white/10 hover:border-white/25"
                }`}
              >
                <span className={`${mono} text-[11px] ${i === active ? "text-[#3FCB74]" : "text-white/40"}`}>0{i + 1}</span>
                <span className={`text-[15px] font-semibold sm:mt-2 ${i === active ? "text-[#E9E4D2]" : "text-white/55"}`}>{s.name}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={stage.id}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="mt-14 max-w-[70ch] border-l-2 border-[#3FCB74] pl-6"
        >
          <div className={`${mono} text-[13px] uppercase tracking-wide text-[#7FB999]`}>Gate {active + 1} / {stage.gate}</div>
          <div className="mt-3 text-[17px] leading-relaxed text-white/70">{stage.detail}</div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- Conviction */

function Conviction() {
  return (
    <section className="relative w-full overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(22,29,24,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(22,29,24,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, #000 0%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className={`${mono} max-w-[22ch] text-[10vw] font-bold leading-[1] tracking-[-0.02em] text-[#161D18] sm:text-[5.6vw] lg:text-[3.8vw]`}>
          {RISK_COPY.lead.toUpperCase()} <span className="text-[#0F7A40]">{RISK_COPY.emphasis.toUpperCase()}</span>.
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {RISK_COPY.principles.map((p) => (
            <div key={p.number} className="border-t-2 border-[#161D18] pt-4">
              <span className={`${mono} text-[11px] text-[#0F7A40]`}>{p.number}</span>
              <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-[#161D18]">{p.title}</h3>
              <div className="mt-2 text-[14.5px] leading-relaxed text-[#3D4741]">{p.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

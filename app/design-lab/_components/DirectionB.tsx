"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ExposureInstrument } from "@/components/sections/home/ExposureInstrument";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { HERO_COPY, BELIEF_COPY, GATES_COPY, RISK_COPY } from "@/app/design-lab/_lib/copy";

/**
 * Direction B — Cinematic Signal.
 *
 * Full-bleed dark, at three different depths (a hero, a lighter charcoal
 * chapter, and the deepest black for the process), plus one luminous green
 * break at the end. Reuses the production ContourField unmodified — proof
 * this direction is mostly a matter of turning its existing knobs further,
 * not a new engineering surface.
 */
export function DirectionB() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div ref={pageRef} className="relative bg-[#080F0B]">
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[140vh]"
          style={{
            y: glowY,
            background: "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(63,203,116,0.10) 0%, transparent 70%)",
          }}
        />
      )}
      <Hero />
      <Chapter />
      <DeepProcess />
      <Conviction />
    </div>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 py-32 sm:py-40">
      <ContourField seed={71} layers={3} density={10} strokeColor="#7FB999" baseOpacity={0.9} animate />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 15%, rgba(63,203,116,0.20) 0%, transparent 68%)" }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]">
              {HERO_COPY.eyebrow}
            </span>
            <h1 className="mt-6 font-sans text-[13vw] font-bold leading-[0.94] tracking-[-0.03em] text-[#F4F7F4] sm:text-[7vw] lg:text-[5vw]">
              A smarter way to build and protect capital.
            </h1>
            <div className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-white/60">{HERO_COPY.body}</div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#0F7A40] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0B6435]"
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

/* -------------------------------------------------------------- Chapter */

function Chapter() {
  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#16241D] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, #3FCB74, transparent)" }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]">
          What VSC is built on
        </span>
        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {BELIEF_COPY.items.map((item) => (
            <div key={item.number} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
              <span className="font-mono text-sm font-semibold text-[#3FCB74]">{item.number}</span>
              <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-[#F4F7F4]">{item.title}</h3>
              <div className="mt-1.5 text-[14.5px] font-semibold text-[#7FB999]">{item.shortLine}</div>
              <div className="mt-2.5 text-[15px] leading-relaxed text-white/55">{item.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Deep process */

function DeepProcess() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const stage = GATES_COPY.stages[active];

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#050A07] py-24 sm:py-32">
      <ContourField seed={71} layers={2} density={7} strokeColor="#0F7A40" baseOpacity={1} animate safeArea={{ x: 0.02, y: 0.16, w: 0.96, h: 0.8 }} />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]">
          {GATES_COPY.eyebrow}
        </span>
        <h2 className="mt-5 max-w-[24ch] font-sans text-[9vw] font-bold leading-[1] text-[#F4F7F4] sm:text-[4.4vw] lg:text-[2.8vw]">
          {GATES_COPY.heading}
        </h2>

        {/* signal path connecting the five gates */}
        <div className="relative mt-16">
          <svg viewBox="0 0 500 20" className="absolute left-0 right-0 top-[15px] hidden w-full sm:block" preserveAspectRatio="none" aria-hidden="true">
            <line x1="10" y1="10" x2="490" y2="10" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <motion.line
              x1="10"
              y1="10"
              x2="490"
              y2="10"
              stroke="#3FCB74"
              strokeWidth="2"
              initial={false}
              animate={{ x2: 10 + (480 * active) / (GATES_COPY.stages.length - 1) }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 24 }}
            />
          </svg>

          <div role="tablist" aria-label="The five gates" className="relative grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-2">
            {GATES_COPY.stages.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="flex items-center gap-3 text-left sm:flex-col sm:items-start"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-bold tabular-nums transition-colors ${
                    i === active ? "border-[#3FCB74] bg-[#3FCB74] text-[#050A07]" : i < active ? "border-[#3FCB74] bg-[#3FCB74]/20 text-[#7FB999]" : "border-white/15 text-white/40"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`text-[14px] font-semibold sm:mt-3 ${i === active ? "text-[#F4F7F4]" : "text-white/45"}`}>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={stage.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10 max-w-[68ch] rounded-2xl border border-white/10 bg-white/[0.03] p-7"
        >
          <div className="text-[13px] font-semibold uppercase tracking-wide text-[#7FB999]">Gate {active + 1}</div>
          <div className="mt-2 text-[21px] font-semibold leading-tight text-[#3FCB74]">{stage.gate}</div>
          <div className="mt-3 text-[16px] leading-relaxed text-white/65">{stage.detail}</div>
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
        style={{ background: "radial-gradient(ellipse 70% 65% at 50% 40%, rgba(63,203,116,0.28) 0%, rgba(15,122,64,0.12) 45%, transparent 75%)" }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 text-center">
        <div className="mx-auto max-w-[22ch] font-sans text-[11vw] font-bold leading-[0.98] tracking-[-0.03em] text-[#F4F7F4] sm:text-[6vw] lg:text-[4.4vw]">
          {RISK_COPY.lead} <span className="text-[#3FCB74]">{RISK_COPY.emphasis}</span>.
        </div>

        <div className="mx-auto mt-16 grid max-w-[900px] gap-10 sm:grid-cols-3 sm:gap-8 sm:divide-x sm:divide-white/10">
          {RISK_COPY.principles.map((p) => (
            <div key={p.number} className="sm:px-6">
              <span className="font-mono text-sm font-semibold text-[#3FCB74]">{p.number}</span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-[#F4F7F4]">{p.title}</h3>
              <div className="mt-2 text-[14.5px] leading-relaxed text-white/55">{p.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

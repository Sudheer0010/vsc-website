"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExposureInstrument } from "@/components/sections/home/ExposureInstrument";
import { HERO_COPY, BELIEF_COPY, GATES_COPY, RISK_COPY } from "@/app/design-lab/_lib/copy";
import { newsreader } from "@/app/design-lab/_lib/fonts";

const serif = "[font-family:var(--font-lab-serif),Georgia,serif]";

/**
 * Direction A — Luminous Editorial.
 *
 * The bet: VSC as a modern investment-research publication, not a SaaS
 * product. Newsreader serif for anything that argues a point, the site's
 * own Instrument Sans for anything that explains one. Backgrounds are
 * slow luminous gradient fields — never flat paper, never a hard photo.
 */
export function DirectionA() {
  return (
    <main className={`${newsreader.variable} bg-[#FBFAF6]`}>
      <Hero />
      <Editorial />
      <DarkChapter />
      <Conviction />
    </main>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[#161D18]/10 pb-24 pt-28 sm:pb-32 sm:pt-36">
      <LuminousMesh />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F7A40]">
              {HERO_COPY.eyebrow}
            </span>
            <h1
              className={`${serif} mt-6 text-[15vw] leading-[0.94] tracking-[-0.02em] text-[#161D18] sm:text-[9vw] lg:text-[6.4vw]`}
            >
              A smarter way to <em className="[font-style:italic] text-[#0F7A40]">build</em> and protect capital.
            </h1>
            <div className="mt-8 max-w-[46ch] text-[19px] leading-relaxed text-[#3D4741]">
              {HERO_COPY.body}
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-9 inline-flex items-center gap-2 border-b-2 border-[#0F7A40] pb-1 text-[16px] font-semibold text-[#161D18] transition-colors hover:text-[#0F7A40]"
            >
              {HERO_COPY.cta} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="lg:col-span-4 lg:pt-20">
            <div className="w-full max-w-[420px] lg:ml-auto">
              <ExposureInstrument />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LuminousMesh() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className={reduce ? "" : "lab-mesh-drift-a"}
        style={{
          position: "absolute",
          inset: "-15%",
          background:
            "radial-gradient(ellipse 60% 55% at 15% 20%, rgba(15,122,64,0.22) 0%, transparent 62%)," +
            "radial-gradient(ellipse 55% 60% at 85% 15%, rgba(63,203,116,0.16) 0%, transparent 60%)," +
            "radial-gradient(ellipse 70% 65% at 60% 90%, rgba(22,29,24,0.08) 0%, transparent 65%)",
          filter: "blur(10px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------ Editorial */

function Editorial() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[#161D18]/10 bg-white py-24 sm:py-32">
      <span
        aria-hidden="true"
        className={`${serif} pointer-events-none absolute -right-6 -top-10 select-none text-[42vw] leading-none text-[#0F7A40]/[0.05] sm:text-[26vw]`}
      >
        01
      </span>
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className={`${serif} text-[13vw] leading-[0.95] text-[#161D18] sm:text-[6vw] lg:text-[3.4vw]`}>
              {BELIEF_COPY.heading}
            </h2>
            <div className="mt-6 max-w-[36ch] text-[17px] leading-relaxed text-[#3D4741]">{BELIEF_COPY.sub}</div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-12 sm:grid-cols-3 sm:gap-8 sm:divide-x sm:divide-[#161D18]/10">
              {BELIEF_COPY.items.map((item) => (
                <div key={item.number} className="sm:pl-8 sm:first:pl-0">
                  <span className="font-mono text-sm font-semibold text-[#0F7A40]">{item.number}</span>
                  <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-[#161D18]">{item.title}</h3>
                  <div className={`${serif} mt-2 text-[17px] [font-style:italic] text-[#0F7A40]`}>{item.shortLine}</div>
                  <div className="mt-3 text-[15.5px] leading-relaxed text-[#3D4741]">{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Dark chapter */

const ROMAN = ["I", "II", "III", "IV", "V"];

function DarkChapter() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const stage = GATES_COPY.stages[active];

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#0E1A14] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 30%, rgba(127,185,153,0.14) 0%, transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7FB999]">
          {GATES_COPY.eyebrow}
        </span>
        <h2 className={`${serif} mt-5 max-w-[22ch] text-[10vw] leading-[1] text-[#E9E4D2] sm:text-[5vw] lg:text-[3.2vw]`}>
          {GATES_COPY.heading}
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label="The five gates" className="flex gap-6 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
            {GATES_COPY.stages.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`flex shrink-0 items-baseline gap-3 border-b-2 pb-2 text-left transition-colors lg:border-b-0 lg:border-l-2 lg:pb-0 lg:pl-4 ${
                  i === active ? "border-[#7FB999]" : "border-white/10"
                }`}
              >
                <span className={`${serif} text-[15px] ${i === active ? "text-[#7FB999]" : "text-white/35"}`}>
                  {ROMAN[i]}
                </span>
                <span className={`text-[15px] font-semibold ${i === active ? "text-[#E9E4D2]" : "text-white/50"}`}>
                  {s.name}
                </span>
              </button>
            ))}
          </div>

          <motion.div
            key={stage.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-8"
          >
            <div className={`${serif} text-[24px] [font-style:italic] leading-snug text-[#7FB999] sm:text-[28px]`}>{stage.gate}</div>
            <div className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-white/70">{stage.detail}</div>
          </motion.div>
        </div>
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
          background:
            "radial-gradient(ellipse 65% 60% at 30% 40%, rgba(15,122,64,0.16) 0%, transparent 68%)," +
            "radial-gradient(ellipse 50% 50% at 80% 70%, rgba(63,203,116,0.10) 0%, transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className={`${serif} max-w-[20ch] text-[13vw] [font-style:italic] leading-[0.98] text-[#161D18] sm:text-[7vw] lg:text-[5vw]`}>
          {RISK_COPY.lead} <span className="text-[#0F7A40]">{RISK_COPY.emphasis}</span>.
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8 sm:divide-x sm:divide-[#161D18]/10">
          {RISK_COPY.principles.map((p) => (
            <div key={p.number} className="sm:pl-8 sm:first:pl-0">
              <span className="font-mono text-sm font-semibold text-[#0F7A40]">{p.number}</span>
              <h3 className="mt-4 text-[18px] font-semibold tracking-tight text-[#161D18]">{p.title}</h3>
              <div className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-[#3D4741]">{p.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

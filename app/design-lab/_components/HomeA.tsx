"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProcessStepper } from "@/components/sections/home/ProcessStepper";
import { RiskSection } from "@/components/sections/home/RiskSection";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { ProductionHero } from "@/app/design-lab/_components/ProductionHero";
import { newsreader } from "@/app/design-lab/_lib/fonts";
import {
  BELIEF_COPY,
  HOW_WE_HELP_COPY,
  DRAWDOWN_COPY,
  RESEARCH_COPY,
  CTA_COPY,
  COMPLIANCE_COPY,
} from "@/app/design-lab/_lib/copy";

const serif = "[font-family:var(--font-lab-serif),Georgia,serif]";

/**
 * Home-A — Luminous Editorial, applied to everything after the fixed
 * Direction B anchor (Hero / Five Gates / Risk, unchanged). The bet: once
 * the reader has been through the dark instrument-led opening, the rest of
 * the page reads like the research publication that produced it — cream,
 * serif accents, asymmetric composition, never a flat card grid.
 */
export function HomeA() {
  return (
    <main className={`${newsreader.variable} bg-[#FBFAF6]`}>
      <ProductionHero />
      <BeliefEditorial />
      <HowWeHelpEditorial />
      <DrawdownExhibit />
      <ProcessStepper />
      <RiskSection />
      <ResearchDesk />
      <CtaEditorial />
      <ComplianceEditorial />
    </main>
  );
}

/* ---------------------------------------------------------------- Belief */

function BeliefEditorial() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[#161D18]/10 bg-white py-28 sm:py-36">
      <span
        aria-hidden="true"
        className={`${serif} pointer-events-none absolute -left-10 -top-16 select-none text-[46vw] leading-none text-[#0F7A40]/[0.04] sm:text-[24vw]`}
      >
        01
      </span>
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F7A40]">
              What VSC is built on
            </span>
            <h2 className={`${serif} mt-5 text-[12vw] leading-[0.95] text-[#161D18] sm:text-[5.4vw] lg:text-[3vw]`}>
              Three principles. One discipline.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-[#161D18]/10">
              {BELIEF_COPY.items.map((item) => (
                <Reveal key={item.number}>
                  <div className="grid items-baseline gap-4 py-9 sm:grid-cols-12 sm:gap-8">
                    <span
                      className={`${serif} sm:col-span-2 text-[15vw] leading-[0.8] text-[#161D18]/15 sm:text-[6vw]`}
                    >
                      {item.number}
                    </span>
                    <div className="sm:col-span-10">
                      <h3 className="text-[21px] font-semibold tracking-tight text-[#161D18]">{item.title}</h3>
                      <div className={`${serif} mt-2 [font-style:italic] text-[17px] text-[#0F7A40]`}>
                        {item.shortLine}
                      </div>
                      <div className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-[#3D4741]">{item.body}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ How We Help */

function HowWeHelpEditorial() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[#161D18]/10 bg-[#FBFAF6] py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F7A40]">
            {HOW_WE_HELP_COPY.sub}
          </span>
        </Reveal>

        <div className="mt-10 divide-y divide-[#161D18]/10 border-t border-[#161D18]/10">
          {HOW_WE_HELP_COPY.verticals.map((v, i) => (
            <Reveal key={v.number} delay={i * 0.05}>
              <div
                className={`grid items-center gap-6 py-10 sm:grid-cols-12 sm:gap-10 ${
                  i % 2 === 1 ? "sm:text-right" : ""
                }`}
              >
                <div className={`sm:col-span-3 ${i % 2 === 1 ? "sm:order-3" : ""}`}>
                  <span className="font-mono text-[11px] text-[#161D18]/40">{v.number}</span>
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#0F7A40]">
                    {v.label}
                  </span>
                </div>
                <h3
                  className={`${serif} sm:col-span-4 text-[16vw] leading-[0.9] text-[#161D18] sm:text-[6vw] lg:text-[3.6vw] ${
                    i % 2 === 1 ? "sm:order-2" : ""
                  }`}
                >
                  {v.verb}
                </h3>
                <div className={`sm:col-span-5 ${i % 2 === 1 ? "sm:order-1" : ""}`}>
                  <div className="text-[17px] font-medium leading-snug text-[#161D18]">{v.tagline}</div>
                  <div className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-[#3D4741] sm:ml-auto">{v.body}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 border-b-2 border-[#0F7A40] pb-1 text-[15px] font-semibold text-[#161D18] transition-colors hover:text-[#0F7A40]"
          >
            {HOW_WE_HELP_COPY.cta} <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Drawdown */

function DrawdownExhibit() {
  const reduce = useReducedMotion();
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: "-15%" },
          transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <section className="relative w-full overflow-hidden border-b border-[#161D18]/10 bg-[#F2F0E9] py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className={`${serif} text-[13px] uppercase tracking-[0.18em] text-[#0F7A40]`}>Exhibit 01</span>
            <h2 className={`${serif} mt-4 text-[10vw] leading-[1.02] text-[#161D18] sm:text-[4.6vw] lg:text-[2.6vw]`}>
              {DRAWDOWN_COPY.heading}
            </h2>
            <div className={`${serif} mt-8 max-w-[40ch] [font-style:italic] text-[18px] leading-snug text-[#0F7A40]`}>
              {DRAWDOWN_COPY.closing}
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <figure className="border border-[#161D18]/12 bg-white p-6 sm:p-9">
                <div className="overflow-x-auto">
                  <svg
                    viewBox="0 0 602 268"
                    role="img"
                    aria-label="Two schematic capital curves. Both rise together. When market risk crosses a threshold, the always-invested curve continues down through the drawdown while the risk-managed curve flattens as exposure moves to cash, then re-enters and compounds from a higher base."
                    className="h-auto w-full min-w-[520px]"
                  >
                    <defs>
                      <linearGradient id="homeAFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0F7A40" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#0F7A40" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <rect x="248" y="14" width="180" height="238" fill="#E4F2E8" />
                    <line x1="248" y1="14" x2="248" y2="252" stroke="#0F7A40" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="428" y1="14" x2="428" y2="252" stroke="#0F7A40" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="8" y1="252" x2="594" y2="252" stroke="#CFCBBE" strokeWidth="1" />
                    <motion.path
                      d={`${DRAWDOWN_COPY.riskManagedPath} L 594 252 L 8 252 Z`}
                      fill="url(#homeAFill)"
                      stroke="none"
                      initial={reduce ? undefined : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ duration: 0.9, delay: 0.6 }}
                    />
                    <motion.path
                      d={DRAWDOWN_COPY.alwaysInvestedPath}
                      fill="none"
                      stroke="#B4552E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      {...draw(0)}
                    />
                    <motion.path
                      d={DRAWDOWN_COPY.riskManagedPath}
                      fill="none"
                      stroke="#0F7A40"
                      strokeWidth="4"
                      strokeLinecap="round"
                      {...draw(0.25)}
                    />
                    <text x="256" y="30" style={{ font: "600 12px var(--font-ui, sans-serif)", fill: "#0F7A40" }}>
                      {DRAWDOWN_COPY.annotations.weaken}
                    </text>
                    <text x="256" y="46" style={{ font: "500 12px var(--font-ui, sans-serif)", fill: "#5B655E" }}>
                      {DRAWDOWN_COPY.annotations.holdCash}
                    </text>
                    <text x="436" y="66" style={{ font: "600 12px var(--font-ui, sans-serif)", fill: "#0B6435" }}>
                      {DRAWDOWN_COPY.annotations.improve}
                    </text>
                  </svg>
                </div>

                <figcaption className="mt-8 grid gap-8 border-t border-[#161D18]/10 pt-6 sm:grid-cols-2">
                  <div>
                    <span className="h-[3px] w-6 rounded-full bg-[#B4552E] inline-block" />
                    <div className="mt-2 text-[15px] font-semibold text-[#161D18]">
                      {DRAWDOWN_COPY.alwaysInvested.label}
                    </div>
                    <div className="mt-1 max-w-[36ch] text-[14.5px] leading-relaxed text-[#3D4741]">
                      {DRAWDOWN_COPY.alwaysInvested.body}
                    </div>
                  </div>
                  <div>
                    <span className="h-[3px] w-6 rounded-full bg-[#0F7A40] inline-block" />
                    <div className="mt-2 text-[15px] font-semibold text-[#161D18]">{DRAWDOWN_COPY.riskManaged.label}</div>
                    <div className="mt-1 max-w-[36ch] text-[14.5px] leading-relaxed text-[#3D4741]">
                      {DRAWDOWN_COPY.riskManaged.body}
                    </div>
                  </div>
                </figcaption>
                <div className="mt-6 border-t border-[#161D18]/10 pt-4 font-mono text-[12px] text-[#5B655E]">
                  {DRAWDOWN_COPY.caption}
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Research */

function ResearchDesk() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[#161D18]/10 bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F7A40]">
              The reading desk
            </span>
            <h2 className={`${serif} mt-5 text-[10vw] leading-[1] text-[#161D18] sm:text-[4.6vw] lg:text-[2.8vw]`}>
              {RESEARCH_COPY.heading}
            </h2>
            <div className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-[#3D4741]">{RESEARCH_COPY.body}</div>
            <a
              href="/research"
              className="mt-8 inline-flex items-center gap-2 border-b-2 border-[#0F7A40] pb-1 text-[15px] font-semibold text-[#161D18] transition-colors hover:text-[#0F7A40]"
            >
              {RESEARCH_COPY.cta} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-[#161D18]/10">
              {[
                { title: "The three-day rule", dek: "Why a single day's move rarely tells you what you think it does." },
                { title: "Test your trading style", dek: "A short framework for matching a method to how you actually behave under pressure." },
              ].map((note) => (
                <Link
                  key={note.title}
                  href="/research/notes"
                  className="group flex items-baseline justify-between gap-6 border-b border-[#161D18]/10 py-7 no-underline"
                >
                  <div>
                    <h3 className={`${serif} text-[22px] text-[#161D18] transition-colors group-hover:text-[#0F7A40]`}>
                      {note.title}
                    </h3>
                    <div className="mt-1.5 max-w-[52ch] text-[14.5px] leading-relaxed text-[#3D4741]">{note.dek}</div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-[13px] text-[#0F7A40] opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Read &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- CTA */

function CtaEditorial() {
  return (
    <section className="relative w-full overflow-hidden py-32 sm:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="lab-mesh-drift-a"
          style={{
            position: "absolute",
            inset: "-15%",
            background:
              "radial-gradient(ellipse 60% 55% at 80% 30%, rgba(15,122,64,0.14) 0%, transparent 62%)," +
              "radial-gradient(ellipse 55% 60% at 15% 80%, rgba(63,203,116,0.10) 0%, transparent 60%)",
            filter: "blur(10px)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <StepRule size="md" />
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F7A40]">
                {CTA_COPY.eyebrow}
              </span>
            </div>
            <h2 className={`${serif} mt-6 max-w-[14ch] text-[16vw] leading-[0.92] text-[#161D18] sm:text-[8vw] lg:text-[5.6vw]`}>
              {CTA_COPY.heading}
            </h2>
            <div className="mt-6 max-w-[52ch] text-[18px] leading-relaxed text-[#3D4741]">{CTA_COPY.body}</div>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <a
              href="/start"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-[#0F7A40] px-9 text-[17px] font-semibold text-white transition-colors hover:bg-[#0B6435]"
            >
              {CTA_COPY.primary} <span aria-hidden="true">&rarr;</span>
            </a>
            <div className="mt-5">
              <a href="/enquire" className="font-mono text-[13px] text-[#5B655E] hover:text-[#0F7A40]">
                {CTA_COPY.secondary} &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Compliance */

function ComplianceEditorial() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-[#161D18]/10 py-14"
      style={{ background: "linear-gradient(to bottom, #F2F0E9 0%, #E9E6DC 60%, #161D18 100%)" }}
    >
      <div className="relative mx-auto max-w-[1120px] px-6 sm:px-10">
        <div className="mx-auto flex max-w-[70ch] flex-col gap-3 text-center">
          <div className="text-[14px] leading-relaxed text-[#5B655E]">{COMPLIANCE_COPY.body}</div>
          <div className="text-[13.5px] font-semibold text-[#5B655E]">{COMPLIANCE_COPY.registration}</div>
        </div>
      </div>
    </section>
  );
}

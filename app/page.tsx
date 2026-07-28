"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Compliance } from "@/components/sections/home/Compliance";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { AcademicMarginNote } from "@/components/ui/vsc/AcademicMarginNote";
import { InstitutionalBriefing } from "@/components/ui/vsc/InstitutionalBriefing";
import { ReadingContainer } from "@/components/ui/vsc/ReadingContainer";
import { ReadingTempo } from "@/components/ui/vsc/ReadingTempo";
import { ReflectionBlock } from "@/components/ui/vsc/ReflectionBlock";
import { VSCButton } from "@/components/ui/vsc/VSCButton";
import { Activity, Hourglass, Shield, Sliders, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* 3-Mass Balanced Restrained Navigation Capsule */}
      <Navbar />

      <main className="relative w-full bg-bg-deep-charcoal text-text-primary min-h-screen pt-16 sm:pt-20 overflow-hidden">
        {/* Signature 05: Background Research Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
        />

        {/* =========================================================================
            MODULE 1: ARRIVAL (POSTER MOMENT 1)
            Atmosphere: High-Contrast Editorial Thesis + Live Status Ticker
           ========================================================================= */}
        <section id="arrival" className="relative w-full py-4 sm:py-8 select-none">
          <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
            <ReadingTempo delay={0.05}>
              <div className="max-w-[1050px] text-left">
                {/* Live Institutional Ticker Strip */}
                <div className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8">
                  <Activity className="w-3.5 h-3.5 text-accent-gold animate-pulse" />
                  <span className="font-mono text-[11px] tracking-[0.2em] text-white/80 uppercase font-semibold">
                    RESEARCH DESK ACTIVE • REGIME: RISK-MANAGED ALLOCATION
                  </span>
                </div>

                <span className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-4">
                  WELCOME TO VSC CAPITAL & ADVISORY
                </span>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.03] text-white font-normal tracking-tight mb-6">
                  A Smarter Way to Build and Protect Capital.
                </h1>
                <p className="font-mono text-base sm:text-xl text-text-secondary leading-relaxed max-w-[780px] mb-8">
                  We study market structure, trend strength, and risk management to deploy capital with systematic discipline.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-12 sm:mb-16">
                  <VSCButton href="/offerings" variant="gold">
                    Begin the Conversation &rarr;
                  </VSCButton>
                  <VSCButton href="/blog" variant="outline">
                    The Research Journal
                  </VSCButton>
                </div>
              </div>
            </ReadingTempo>

            {/* Dominant Research Desk Photography Container */}
            <ReadingTempo delay={0.15}>
              <div className="relative w-full aspect-[16/9] max-h-[560px] rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.7)] group">
                <Image
                  src="/vsc_annual_report_hero.png"
                  alt="VSC Institutional Research Desk Environment"
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-center filter contrast-[1.03] brightness-[0.95] group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent opacity-75"
                />
              </div>
            </ReadingTempo>
          </div>
        </section>


        {/* =========================================================================
            MODULE 2: PROBLEM (EDITORIAL SPREAD — ZERO BOXES)
            Atmosphere: Giant Serif Quote Line + Asymmetric Margin Note
           ========================================================================= */}
        <section id="problem" className="relative w-full py-20 sm:py-28 border-t border-white/[0.04] select-none">
          <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
            <ReadingTempo>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8">
                  <span className="font-mono text-xs tracking-[0.25em] text-accent-gold/80 uppercase font-semibold block mb-6">
                    THE PROBLEM WE SOLVE
                  </span>
                  {/* Full-Width Serif Manifesto Line — Zero Box Boundaries */}
                  <blockquote className="font-display text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12] border-l-2 border-accent-gold pl-6 sm:pl-8 mb-8">
                    &ldquo;Most investors don&apos;t need more information. They need a better process.&rdquo;
                  </blockquote>
                  <ReadingContainer size="wide">
                    <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed">
                      Retail market participants fail not from a lack of financial news—they fail from trading without a systematic process. VSC Capital exists as an institutional research desk where cash is an active position and capital preservation precedes compounding.
                    </p>
                  </ReadingContainer>
                </div>

                {/* Floating Academic Margin Commentary */}
                <div className="lg:col-span-4 space-y-6 pt-4">
                  <AcademicMarginNote
                    label="THE STRUCTURAL FLAW"
                    note="Most portfolios chase short-term momentum without explicit exit rules. VSC replaces emotional discretion with quantitative risk controls."
                  />
                  <AcademicMarginNote
                    label="THE RESEARCH CREDO"
                    note="We do not publish news. We publish thinking. Every rupee entrusted to VSC represents years of someone's work."
                  />
                </div>
              </div>
            </ReadingTempo>
          </div>
        </section>


        {/* =========================================================================
            MODULE 3: BELIEF (MUSEUM EXHIBIT — RULE 01 DOMINATES 50%)
            Atmosphere: Paper Navy Surface with Heroic Rule 01 Focus
           ========================================================================= */}
        <section id="belief" className="relative w-full py-20 sm:py-28 bg-bg-paper-navy border-t border-b border-white/[0.04] select-none">
          <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-[800px] mb-12 sm:mb-16">
              <span className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-3">
                HOW WE THINK
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-white font-normal leading-[1.12] mb-3">
                Every Decision Starts Here.
              </h2>
              <p className="font-mono text-sm sm:text-base text-text-secondary">
                Governed by four simple rules.
              </p>
            </div>

            {/* Rule 01 — 50% Visual Attention Hero Feature Card */}
            <div className="bg-bg-reading-slate border border-accent-gold/40 rounded-2xl p-8 sm:p-12 mb-12 shadow-[0_15px_40px_rgba(201,168,76,0.08)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-base text-accent-gold font-semibold">01</span>
                    <Shield className="w-5 h-5 text-accent-gold" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-gold font-semibold bg-accent-gold/10 px-2.5 py-0.5 rounded-full border border-accent-gold/20">
                      UNDISPUTED PRIMARY RULE
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-5xl text-white font-normal tracking-tight">
                    Protect Capital First
                  </h3>
                </div>
                <div className="border-l-0 md:border-l border-white/10 md:pl-8 py-2 max-w-[460px]">
                  <p className="font-mono text-sm sm:text-base text-accent-gold/90 font-medium leading-relaxed">
                    Before seeking returns, we first ask: How much can we lose? Surviving drawdown cycles is the precondition for compounding.
                  </p>
                </div>
              </div>
            </div>

            {/* Supporting Rules 02, 03, 04 — Sub-3s Rapid Comprehension Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-white/[0.08]">
              {/* Rule 02 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 font-mono text-xs text-white/50 font-semibold">
                  <span>02</span>
                  <Sliders className="w-4 h-4 text-white/40" />
                </div>
                <h4 className="font-display text-2xl text-white font-normal">
                  Respect the Process
                </h4>
                <p className="font-mono text-xs text-text-secondary">
                  Rules before emotions.
                </p>
              </div>

              {/* Rule 03 */}
              <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-white/[0.08] pt-6 md:pt-0 md:pl-8">
                <div className="flex items-center gap-2.5 font-mono text-xs text-white/50 font-semibold">
                  <span>03</span>
                  <Hourglass className="w-4 h-4 text-white/40" />
                </div>
                <h4 className="font-display text-2xl text-white font-normal">
                  Patience Compounds
                </h4>
                <p className="font-mono text-xs text-text-secondary">
                  Cash is also a position.
                </p>
              </div>

              {/* Rule 04 */}
              <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-white/[0.08] pt-6 md:pt-0 md:pl-8">
                <div className="flex items-center gap-2.5 font-mono text-xs text-white/50 font-semibold">
                  <span>04</span>
                  <TrendingUp className="w-4 h-4 text-white/40" />
                </div>
                <h4 className="font-display text-2xl text-white font-normal">
                  Never Stop Improving
                </h4>
                <p className="font-mono text-xs text-text-secondary">
                  Markets evolve. So should we.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================================
            MODULE 4: PROOF (EXECUTIVE BOARDROOM BRIEFING)
            Atmosphere: Sharper Information, 10-Second McKinsey Contrast Matrix
           ========================================================================= */}
        <section id="proof" className="relative w-full py-16 sm:py-24 select-none">
          <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-[850px] mb-10 sm:mb-12">
              <span className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-4">
                THE PROOF OF DIFFERENCE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-white font-normal leading-[1.12]">
                Mutual Funds Stay Invested by Mandate. VSC Deploys Capital by Discipline.
              </h2>
            </div>

            {/* Verb-First Executive Briefing Slide Matrix */}
            <InstitutionalBriefing />
          </div>
        </section>


        {/* =========================================================================
            MODULE 5: EVIDENCE (FINANCIAL TIMES WEEKEND MAGAZINE)
            Atmosphere: Printed Paper Edition Card
           ========================================================================= */}
        <section id="evidence" className="relative w-full py-16 sm:py-24 bg-bg-paper-navy border-t border-b border-white/[0.04] select-none">
          <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
              <div>
                <span className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-4">
                  FROM THE RESEARCH DESK
                </span>
                <h2 className="font-display text-3xl sm:text-5xl text-white font-normal leading-[1.12]">
                  We Do Not Publish News. We Publish Thinking.
                </h2>
              </div>
              <VSCButton href="/blog" variant="outline">
                THE RESEARCH JOURNAL ARCHIVE &rarr;
              </VSCButton>
            </div>

            {/* Single Featured Publication Card */}
            <div className="bg-bg-reading-slate border border-white/[0.08] rounded-2xl p-8 sm:p-12 hover:border-accent-gold/40 transition-all duration-300">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                <span className="font-mono text-xs tracking-[0.2em] text-accent-gold font-semibold uppercase">
                  LATEST MARKET LETTER • JULY 2026
                </span>
                <span className="font-mono text-xs text-white/40">2 MIN READ</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-white font-normal leading-[1.2] mb-4">
                Navigating Market Regime Shifts & Volatility Compression
              </h3>
              <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-[850px] mb-8">
                An institutional study analyzing macro liquidity transitions, volatility cycles, and defensive capital deployment during equity market inflection points.
              </p>
              <VSCButton href="/blog" variant="gold">
                Read the Latest Market Letter &rarr;
              </VSCButton>
            </div>
          </div>
        </section>

        {/* RESTORED: Testimonials Section */}
        <Testimonials />


        {/* =========================================================================
            MODULE 6: ACTION (THE QUIET ROOM — UNHURRIED EXIT)
            Atmosphere: Vast Whitespace, Single Reflection, One Button
           ========================================================================= */}
        {/* Clean Reflection Question */}
        <ReflectionBlock question="If markets become riskier, should your portfolio stay fully invested?" />

        <section id="action" className="relative w-full py-24 sm:py-32 select-none">
          <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-[800px] mx-auto flex flex-col items-center">
              <span className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-4">
                BEGIN THE CONVERSATION
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-white font-normal leading-[1.15] mb-8">
                Build a Better Investment Process. Let&apos;s Start With a Conversation.
              </h2>
              <VSCButton href="/enquire" variant="gold" className="px-10 py-4 text-sm">
                Enquire Now &rarr;
              </VSCButton>
            </div>
          </div>
        </section>

        {/* Regulatory Strip Disclaimer */}
        <Compliance />
      </main>

      <Footer />
    </>
  );
}

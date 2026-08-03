"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { GradientText } from "@/components/ui/vsc/GradientText";
import { ShinyText } from "@/components/ui/vsc/ShinyText";
import { TimelineRail, TimelineStep } from "@/components/ui/vsc/TimelineRail";
import { EmotionalVsRuledChart } from "@/components/sections/about/EmotionalVsRuledChart";
import { marketLetters, sortedMonths } from "@/data/market-letters";

const earliestMonthKey = sortedMonths[sortedMonths.length - 1];
const earliestLetter = marketLetters[earliestMonthKey];

const originSteps: TimelineStep[] = [
  {
    number: "01",
    title: "The more I learned...",
    description: "the more I realized information wasn't the problem. Financial news was everywhere, but actionable understanding was scarce."
  },
  {
    number: "02",
    title: "Markets humbled me repeatedly.",
    description: "Early emotional entries and unmanaged risk taught me that opinions are cheap, while systematic risk rules are indispensable."
  },
  {
    number: "03",
    title: "Eventually experience became the teacher.",
    description: "I stopped chasing short-term price forecasts and began constructing quantitative risk parameters focused on capital preservation."
  },
  {
    number: "04",
    title: "That's when VSC began.",
    description: "Designed not as a retail brokerage or advisory storefront, but as the digital headquarters of an institutional research desk."
  }
];

const observationsData = [
  {
    code: "01",
    badge: "FEATURED LESSON",
    isFeatured: true,
    title: "Markets reward patience more often than prediction.",
    desc: "Waiting in cash during uncompensated market regimes is an active, institutional investment decision."
  },
  {
    code: "02",
    badge: "LIQUIDITY & POSITIONING",
    isFeatured: false,
    title: "Cash is a position, not an admission of defeat.",
    desc: "Preserving liquidity and optionality allows capital deployment when risk-reward shifts overwhelmingly in my favor."
  },
  {
    code: "03",
    badge: "RISK MANAGEMENT",
    isFeatured: false,
    title: "Risk must be understood before returns are pursued.",
    desc: "Defining downside parameters and maximum allowable drawdown precedes sizing upside targets on every trade."
  },
  {
    code: "04",
    badge: "CYCLE EXPERIENCE",
    isFeatured: false,
    title: "Every drawdown teaches something profits cannot.",
    desc: "Drawdowns expose structural system weaknesses; bull market momentum frequently masks risk accumulation."
  },
  {
    code: "05",
    badge: "SYSTEMATIC PROCESS",
    isFeatured: false,
    title: "Process creates consistency when emotions cannot.",
    desc: "Pre-defined quantitative risk parameters protect capital during volatile regime shifts when human discretion fails."
  }
];

const roadmapData = [
  {
    horizon: "TODAY",
    commitment: "COMMITMENT I",
    title: "Empower investors through systematic decision frameworks.",
    desc: "Replacing retail financial noise with repeatable quantitative risk models."
  },
  {
    horizon: "NEXT",
    commitment: "COMMITMENT II",
    title: "Build India's most respected independent research desk.",
    desc: "Publishing thorough, evidence-based market research with zero commercial bias."
  },
  {
    horizon: "LONG TERM",
    commitment: "COMMITMENT III",
    title: "Become a trusted partner in every investor's financial journey.",
    desc: "Building long-term relationships through transparent research, systematic risk frameworks, and disciplined advisory."
  }
];

export default function OurStory() {
  const [obsIndex, setObsIndex] = useState(0);
  const [obsDirection, setObsDirection] = useState(1);

  const [roadmapIndex, setRoadmapIndex] = useState(0);
  const [roadmapDirection, setRoadmapDirection] = useState(1);

  const animProps = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  // Observation Navigation
  const prevObs = useCallback(() => {
    if (obsIndex > 0) {
      setObsDirection(-1);
      setObsIndex(prev => prev - 1);
    }
  }, [obsIndex]);

  const nextObs = useCallback(() => {
    if (obsIndex < observationsData.length - 1) {
      setObsDirection(1);
      setObsIndex(prev => prev + 1);
    }
  }, [obsIndex]);

  const setObs = useCallback((idx: number) => {
    setObsDirection(idx > obsIndex ? 1 : -1);
    setObsIndex(idx);
  }, [obsIndex]);

  // Roadmap Navigation
  const prevRoadmap = useCallback(() => {
    if (roadmapIndex > 0) {
      setRoadmapDirection(-1);
      setRoadmapIndex(prev => prev - 1);
    }
  }, [roadmapIndex]);

  const nextRoadmap = useCallback(() => {
    if (roadmapIndex < roadmapData.length - 1) {
      setRoadmapDirection(1);
      setRoadmapIndex(prev => prev + 1);
    }
  }, [roadmapIndex]);

  const setRoadmap = useCallback((idx: number) => {
    setRoadmapDirection(idx > roadmapIndex ? 1 : -1);
    setRoadmapIndex(idx);
  }, [roadmapIndex]);

  // Keyboard navigation for Observations Deck
  const handleObsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevObs();
    if (e.key === "ArrowRight") nextObs();
  };

  // Keyboard navigation for Roadmap Deck
  const handleRoadmapKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevRoadmap();
    if (e.key === "ArrowRight") nextRoadmap();
  };

  const currentObs = observationsData[obsIndex];
  const currentRoadmap = roadmapData[roadmapIndex];

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Dynamic Background Colored Ambient Light Pool */}
      <AmbientLightPool color="rgba(15, 122, 64, 0.04)" className="left-[50%] top-[900px] scale-[1.4]" />

      <main className="relative w-full animate-fade-in">
        
        {/* =========================================================================
            1. HERO SECTION (Texture background + byline, no team imagery)
           ========================================================================= */}
        <section className="relative w-full min-h-[85vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden select-none border-b border-rule">
          {/* Paper grain, not a photo — vsc_our_story_hero.png was a stock
              office-team shot that, even scrimmed correctly, didn't say
              anything the headline wasn't already saying, and it competed
              with the text for attention instead of supporting it. Same
              treatment as the homepage and Offerings heroes: felt texture +
              a warm glow. */}
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
            className="pointer-events-none absolute -right-32 top-1/2 z-0 h-[620px] w-[620px] -translate-y-1/2 rounded-full blur-[130px]"
            style={{ background: "radial-gradient(circle, rgba(15,122,64,0.12) 0%, transparent 70%)" }}
          />

          <div className="container relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6 my-auto">
            <div className="max-w-[950px] flex flex-col items-start text-left">
              <motion.span
                className="font-mono text-xs md:text-sm tracking-[0.25em] text-accent-gold uppercase mb-6 font-bold"
                {...animProps}
              >
                ABOUT
              </motion.span>

              <motion.h1
                className="font-display text-4xl sm:text-6xl md:text-[76px] lg:text-[84px] leading-[1.06] text-ink font-normal tracking-tight mb-8 max-w-[900px]"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.05 }}
              >
                What if successful investing had less to do with predictions—and more to do with process?
              </motion.h1>

              {/* Conviction-Driven Paragraph */}
              <motion.p
                className="font-mono text-sm md:text-base text-ink-soft leading-relaxed max-w-[720px] mt-4"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.1 }}
              >
                Since 2019 I&apos;ve come to believe that successful investing is built less on prediction and more on disciplined decision-making. VSC exists to share that way of thinking.
              </motion.p>

              {/* Byline (v2.2 §1.1) — "This single line delivers most of
                  the available trust gain." Body face, not mono: this is
                  an author's name, not a data label. */}
              <motion.p
                className="mt-5 text-[15px] text-ink"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.12 }}
              >
                Sudheer Vobhilineni · Founder, VSC Capital &amp; Advisory
              </motion.p>

              {/* Type E mark — a typographic full stop, not a refilled
                  hero image. The date is the one verifiable fact here
                  (earliest published letter), not an invented founding
                  year the way the brief's own example ("EST. 2024") is
                  just a placeholder. */}
              <motion.p
                className="mt-8 font-mono text-[11px] tracking-[0.14em] text-growth uppercase"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.15 }}
              >
                Publishing since {earliestLetter.month.charAt(0) + earliestLetter.month.slice(1).toLowerCase()} {earliestLetter.year} · Systematic · Capital preservation first
              </motion.p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. MANIFESTO QUOTE PAUSE
           ========================================================================= */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden z-10 border-t border-rule select-none">
          <div className="container max-w-[1200px] text-center">
            <motion.h2 
              className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal leading-[1.3] max-w-[800px] mx-auto text-center"
              {...animProps}
            >
              I didn&apos;t want to predict markets.<br />
              <ShinyText text="I wanted to understand them better." speed={5} />
            </motion.h2>
          </div>
        </section>

        {/* =========================================================================
            3. WHERE IT ALL BEGAN (Human Emotional Milestones Progression)
           ========================================================================= */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden border-t border-rule z-10">
          <div className="container max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              <div className="lg:col-span-4 select-none">
                <motion.span 
                  className="font-mono text-xs tracking-[0.2em] text-ink-faint uppercase mb-4 block font-semibold"
                  {...animProps}
                >
                  THE ORIGIN
                </motion.span>
                <motion.h2 
                  className="font-display text-4xl md:text-[44px] text-ink font-normal leading-[1.2]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.05 }}
                >
                  Where It All Began
                </motion.h2>
              </div>

              {/* Human Progression Sequence — Type A vertical rail */}
              <div className="lg:col-span-8 max-w-[700px]">
                <TimelineRail steps={originSteps} />
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            4. EXPERIENCE SECTION (With Single Human Emotional Sentence)
           ========================================================================= */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden border-t border-rule z-10 bg-[#FFFFFF]/60">
          <div className="container max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <motion.span 
                  className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-4 block font-semibold"
                  {...animProps}
                >
                  FORGED IN REAL MARKETS
                </motion.span>
                <motion.h2 
                  className="font-display text-3xl sm:text-5xl text-ink font-normal leading-[1.12]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.05 }}
                >
                  Experience Shapes Every Decision I Make.
                </motion.h2>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-8 max-w-[720px]">
                <p className="font-mono text-sm sm:text-base text-ink-soft leading-relaxed">
                  I entered the markets like most retail participants—experiencing emotional decisions, premature entries, and unnecessary drawdowns. Markets humbled me repeatedly. Every cycle exposed weaknesses in my thinking.
                </p>

                {/* Single Human Emotional Sentence Highlight */}
                <blockquote className="font-display text-2xl sm:text-3xl text-accent-gold font-normal italic border-l-2 border-accent-gold pl-6 py-2 my-2">
                  &ldquo;Every mistake I made became a rule I refuse to break.&rdquo;
                </blockquote>

                <p className="font-mono text-sm sm:text-base text-ink-soft leading-relaxed">
                  Gradually, I stopped chasing predictions and started studying process. I realized that protecting capital mattered far more than chasing speculative returns. That journey of trial, error, and discipline forged the philosophy behind VSC.
                </p>
              </div>
            </div>

            {/* The claim above, drawn — this is the page's thesis, so it
                gets the full section width rather than being squeezed
                into the 8-column text rail above it. */}
            <div className="mt-14 sm:mt-16">
              <EmotionalVsRuledChart />
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. TIMELESS OBSERVATIONS (VSC Renaissance 2.2 — Editorial Research Deck)
           ========================================================================= */}
        <section 
          className="relative w-full py-24 md:py-32 overflow-hidden border-t border-rule z-10 focus:outline-none"
          tabIndex={0}
          onKeyDown={handleObsKeyDown}
          aria-label="Timeless Observations Research Deck"
        >
          <div className="container max-w-[1200px]">
            {/* Editorial Deck Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 select-none gap-4">
              <div>
                <span className="font-mono text-xs tracking-[0.2em] text-ink-faint uppercase mb-2 block font-semibold">
                  LESSONS THE MARKET NEVER STOPS TEACHING
                </span>
                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal leading-[1.12]">
                  Timeless Observations
                </h2>
              </div>
              
              <div className="font-mono text-xs text-accent-gold font-semibold tracking-wider uppercase">
                LESSON {currentObs.code} OF 05
              </div>
            </div>

            {/* Interactive Research Memorandum Card (Stable Minimum Height) */}
            <div className="max-w-[1000px] mx-auto min-h-[280px] sm:min-h-[240px] relative select-none">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={obsIndex}
                  initial={{ opacity: 0, x: obsDirection > 0 ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: obsDirection > 0 ? -12 : 12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`w-full bg-[#FFFFFF] rounded-2xl p-8 sm:p-12 transition-all duration-300 ${
                    currentObs.isFeatured 
                      ? "border border-accent-gold/40 shadow-[0_15px_35px_rgba(15, 122, 64,0.06)]" 
                      : "border border-rule"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-sm text-accent-gold font-semibold">
                      {currentObs.code}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full font-semibold ${
                      currentObs.isFeatured
                        ? "text-accent-gold bg-accent-gold/10 border border-accent-gold/30"
                        : "text-ink-muted bg-canvas-sunk border border-rule"
                    }`}>
                      {currentObs.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl text-ink font-normal mb-4 leading-snug">
                    {currentObs.title}
                  </h3>

                  <p className="font-mono text-sm sm:text-base text-ink-soft leading-relaxed max-w-[820px]">
                    {currentObs.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Understated Institutional Navigation Bar */}
            <div className="max-w-[1000px] mx-auto mt-8 pt-6 border-t border-rule flex items-center justify-between select-none">
              {/* Previous Button */}
              <button
                onClick={prevObs}
                disabled={obsIndex === 0}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted hover:text-accent-gold disabled:opacity-30 disabled:hover:text-ink-muted transition-colors duration-200"
                aria-label="Previous Lesson"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>

              {/* Monospaced Step Indicators */}
              <div className="flex items-center gap-2">
                {observationsData.map((obs, idx) => (
                  <button
                    key={obs.code}
                    onClick={() => setObs(idx)}
                    className={`font-mono text-xs font-semibold px-2.5 py-1 rounded transition-colors duration-200 ${
                      obsIndex === idx
                        ? "bg-accent-gold text-black"
                        : "text-ink-faint hover:text-ink bg-canvas-sunk"
                    }`}
                    aria-label={`Jump to Lesson ${obs.code}`}
                  >
                    {obs.code}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextObs}
                disabled={obsIndex === observationsData.length - 1}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted hover:text-accent-gold disabled:opacity-30 disabled:hover:text-ink-muted transition-colors duration-200"
                aria-label="Next Lesson"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. WHERE VSC IS HEADING (Executive Roadmap Deck)
           ========================================================================= */}
        <section 
          className="relative w-full py-24 md:py-32 overflow-hidden border-t border-rule z-10 bg-[#FFFFFF]/30 focus:outline-none"
          tabIndex={0}
          onKeyDown={handleRoadmapKeyDown}
          aria-label="Executive Roadmap Deck"
        >
          <div className="container max-w-[1200px]">
            {/* Header & Subtitle */}
            <div className="max-w-[850px] mb-12 select-none">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase font-semibold block">
                  LONG-TERM DIRECTION
                </span>
                <span className="font-mono text-xs text-ink-muted font-semibold tracking-wider uppercase">
                  PHASE {currentRoadmap.horizon} • {roadmapIndex + 1} OF 3
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-[48px] text-ink font-normal leading-[1.15] mb-4">
                Where VSC Is Heading
              </h2>
              <p className="font-mono text-sm sm:text-base text-ink-soft leading-relaxed max-w-[700px]">
                I am building an enduring institution over decades—focused on intellectual research quality rather than chasing short-term business metrics.
              </p>
            </div>

            {/* Interactive Horizon Slide Area (Stable Minimum Height) */}
            <div className="max-w-[1000px] mx-auto min-h-[220px] sm:min-h-[180px] relative select-none">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={roadmapIndex}
                  initial={{ opacity: 0, x: roadmapDirection > 0 ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: roadmapDirection > 0 ? -12 : 12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full bg-[#FFFFFF] border border-rule rounded-2xl p-8 sm:p-10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-xs tracking-widest text-black bg-accent-gold px-3 py-0.5 rounded font-semibold uppercase">
                      {currentRoadmap.horizon}
                    </span>
                    <span className="font-mono text-xs text-accent-gold/80 font-semibold tracking-wider">
                      {currentRoadmap.commitment}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl text-ink font-normal mb-3 leading-snug">
                    {currentRoadmap.title}
                  </h3>

                  <p className="font-mono text-sm sm:text-base text-ink-soft leading-relaxed max-w-[780px]">
                    {currentRoadmap.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Horizon Selector Navigation Bar */}
            <div className="max-w-[1000px] mx-auto mt-8 pt-6 border-t border-rule flex items-center justify-between select-none">
              <button
                onClick={prevRoadmap}
                disabled={roadmapIndex === 0}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted hover:text-accent-gold disabled:opacity-30 disabled:hover:text-ink-muted transition-colors duration-200"
                aria-label="Previous Phase"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>

              {/* Horizon Tabs */}
              <div className="flex items-center gap-3">
                {roadmapData.map((rm, idx) => (
                  <button
                    key={rm.horizon}
                    onClick={() => setRoadmap(idx)}
                    className={`font-mono text-xs font-semibold px-3 py-1 rounded transition-colors duration-200 ${
                      roadmapIndex === idx
                        ? "bg-canvas-sunk text-accent-gold border border-accent-gold/30"
                        : "text-ink-faint hover:text-ink bg-canvas-sunk"
                    }`}
                    aria-label={`Jump to ${rm.horizon}`}
                  >
                    {rm.horizon}
                  </button>
                ))}
              </div>

              <button
                onClick={nextRoadmap}
                disabled={roadmapIndex === roadmapData.length - 1}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted hover:text-accent-gold disabled:opacity-30 disabled:hover:text-ink-muted transition-colors duration-200"
                aria-label="Next Phase"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. ICONIC SKY-BLUE POSTER STATEMENT (Massive Apple/Museum Poster Climax)
           ========================================================================= */}
        <section className="relative w-full py-36 md:py-56 overflow-hidden border-t border-rule select-none z-10 bg-gradient-to-b from-transparent via-[#38BDF8]/[0.02] to-transparent">
          <div className="container max-w-[1200px] text-center">
            <motion.div 
              className="flex flex-col items-center justify-center text-center py-6"
              {...animProps}
            >
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal italic leading-[1.15] tracking-tight max-w-[900px] mx-auto text-center drop-shadow-lg">
                &ldquo;<GradientText colors={["#38BDF8", "#0F7A40", "#0B6435", "#38BDF8"]} animationSpeed={6}>Clarity compounds over time.</GradientText>&rdquo;
              </h2>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            8. FINAL CTA (Refined Headline & Preserved Structure)
           ========================================================================= */}
        <section className="relative w-full py-28 md:py-36 overflow-hidden border-t border-rule z-10 select-none">
          <div className="container max-w-[1200px]">
            {/* Signature (v2.2 §2). Left-aligned, above a hairline, separate
                from the centred CTA below — a page that argues for showing
                the work rather than asserting conclusions should say who
                wrote it and when it was last true. */}
            <div className="mx-auto mb-14 max-w-[700px] md:mb-16">
              <p className="text-left font-mono text-[11px] leading-relaxed text-ink-muted">
                Written by Sudheer Vobhilineni · Founder, VSC Capital &amp; Advisory
                <br />
                Last revised August 2026
              </p>
              <div className="mt-6 h-px w-full bg-rule" />
            </div>

            <div className="max-w-[700px] mx-auto text-center flex flex-col items-center">
              
              <motion.span 
                className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-6 font-semibold"
                {...animProps}
              >
                YOUR NEXT STEP
              </motion.span>
              
              <motion.h2 
                className="font-display text-3xl sm:text-5xl leading-[1.15] text-ink font-normal tracking-tight mb-6"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.05 }}
              >
                Every great investment process starts somewhere.
              </motion.h2>
              
              <motion.p 
                className="font-mono text-sm text-ink-soft leading-relaxed mb-10 max-w-[580px]"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.1 }}
              >
                Whether you&apos;re taking your first step or refining years of experience, VSC exists to help you invest with greater clarity, discipline, and confidence.
              </motion.p>
              
              <motion.div 
                className="flex"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.15 }}
              >
                <Link
                  href="/enquire"
                  className="bg-accent-gold text-white font-mono text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded-xl hover:bg-accent-gold-light transition-colors duration-200"
                >
                  Enquire &rarr;
                </Link>
              </motion.div>
              
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";

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
    desc: "Preserving liquidity and optionality allows capital deployment when risk-reward shifts overwhelmingly in our favor."
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
    <div className="relative min-h-screen w-full bg-bg-primary overflow-x-hidden text-text-primary">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Dynamic Background Colored Ambient Light Pool */}
      <AmbientLightPool color="rgba(201, 168, 76, 0.02)" className="left-[70%] top-[25%] scale-[1.2]" />

      <main className="relative w-full animate-fade-in">
        
        {/* =========================================================================
            1. HERO SECTION (Conviction-Driven Paragraph Refinement)
           ========================================================================= */}
        <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden z-10">
          <div className="container max-w-[1200px]">
            <div className="max-w-[950px] flex flex-col items-start text-left select-none">
              <motion.span 
                className="font-mono text-xs md:text-sm tracking-[0.2em] text-accent-gold uppercase mb-8 font-semibold"
                {...animProps}
              >
                OUR STORY
              </motion.span>
              
              <motion.h1 
                className="font-display text-4xl sm:text-6xl md:text-[80px] lg:text-[88px] leading-[1.05] text-text-primary font-normal tracking-tight mb-8 max-w-[900px]"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.05 }}
              >
                What if successful investing had less to do with predictions—and more to do with process?
              </motion.h1>
              
              {/* Conviction-Driven Paragraph */}
              <motion.p 
                className="font-mono text-sm md:text-base text-text-secondary leading-relaxed max-w-[720px] mt-12"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.1 }}
              >
                Over years of studying markets, we came to believe that successful investing is built less on prediction and more on disciplined decision-making. VSC exists to share that way of thinking.
              </motion.p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. MANIFESTO QUOTE PAUSE
           ========================================================================= */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden z-10 border-t border-white/[0.03] select-none">
          <div className="container max-w-[1200px] text-center">
            <motion.h2 
              className="font-display text-3xl sm:text-4xl md:text-5xl text-text-primary font-normal leading-[1.3] max-w-[800px] mx-auto text-center"
              {...animProps}
            >
              We didn&apos;t want to predict markets.<br />
              <span className="text-accent-gold">We wanted to understand them better.</span>
            </motion.h2>
          </div>
        </section>

        {/* =========================================================================
            3. WHERE IT ALL BEGAN (Human Emotional Milestones Progression)
           ========================================================================= */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden border-t border-white/[0.03] z-10">
          <div className="container max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              <div className="lg:col-span-4 select-none">
                <motion.span 
                  className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block font-semibold"
                  {...animProps}
                >
                  THE ORIGIN
                </motion.span>
                <motion.h2 
                  className="font-display text-4xl md:text-[44px] text-text-primary font-normal leading-[1.2]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.05 }}
                >
                  Where It All Began
                </motion.h2>
              </div>

              {/* Human Progression Sequence */}
              <div className="lg:col-span-8 flex flex-col gap-12 max-w-[700px]">
                <motion.div 
                  className="flex flex-col gap-3"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.08 }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-base text-accent-gold font-semibold">01</span>
                    <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
                      The more we learned...
                    </h3>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed pl-9">
                    the more we realized information wasn&apos;t the problem. Financial news was everywhere, but actionable understanding was scarce.
                  </p>
                </motion.div>

                <motion.div 
                  className="flex flex-col gap-3"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.12 }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-base text-accent-gold font-semibold">02</span>
                    <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
                      Markets humbled us repeatedly.
                    </h3>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed pl-9">
                    Early emotional entries and unmanaged risk taught us that opinions are cheap, while systematic risk rules are indispensable.
                  </p>
                </motion.div>

                <motion.div 
                  className="flex flex-col gap-3"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.16 }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-base text-accent-gold font-semibold">03</span>
                    <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
                      Eventually experience became our teacher.
                    </h3>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed pl-9">
                    We stopped chasing short-term price forecasts and began constructing quantitative risk parameters focused on capital preservation.
                  </p>
                </motion.div>

                <motion.div 
                  className="flex flex-col gap-3"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.2 }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-base text-accent-gold font-semibold">04</span>
                    <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
                      That&apos;s when VSC began.
                    </h3>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed pl-9">
                    Designed not as a retail brokerage or advisory storefront, but as the digital headquarters of an institutional research desk.
                  </p>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            4. EXPERIENCE SECTION (With Single Human Emotional Sentence)
           ========================================================================= */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden border-t border-white/[0.03] z-10 bg-[#0B0F1E]/60">
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
                  className="font-display text-3xl sm:text-5xl text-white font-normal leading-[1.12]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.05 }}
                >
                  Experience Shapes Every Decision We Make.
                </motion.h2>
              </div>
              
              <div className="lg:col-span-8 flex flex-col gap-8 max-w-[720px]">
                <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed">
                  We entered the markets like most retail participants—experiencing emotional decisions, premature entries, and unnecessary drawdowns. Markets humbled us repeatedly. Every cycle exposed weaknesses in our thinking.
                </p>

                {/* Single Human Emotional Sentence Highlight */}
                <blockquote className="font-display text-2xl sm:text-3xl text-accent-gold font-normal italic border-l-2 border-accent-gold pl-6 py-2 my-2">
                  &ldquo;Every mistake we made became a rule we refused to break again.&rdquo;
                </blockquote>

                <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed">
                  Gradually, we stopped chasing predictions and started studying process. We realized that protecting capital mattered far more than chasing speculative returns. That journey of trial, error, and discipline forged the philosophy behind VSC.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. TIMELESS OBSERVATIONS (VSC Renaissance 2.2 — Editorial Research Deck)
           ========================================================================= */}
        <section 
          className="relative w-full py-24 md:py-32 overflow-hidden border-t border-white/[0.03] z-10 focus:outline-none"
          tabIndex={0}
          onKeyDown={handleObsKeyDown}
          aria-label="Timeless Observations Research Deck"
        >
          <div className="container max-w-[1200px]">
            {/* Editorial Deck Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 select-none gap-4">
              <div>
                <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-2 block font-semibold">
                  LESSONS THE MARKET NEVER STOPS TEACHING
                </span>
                <h2 className="font-display text-3xl sm:text-5xl text-white font-normal leading-[1.12]">
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
                  className={`w-full bg-[#0B0F1E] rounded-2xl p-8 sm:p-12 transition-all duration-300 ${
                    currentObs.isFeatured 
                      ? "border border-accent-gold/40 shadow-[0_15px_35px_rgba(201,168,76,0.06)]" 
                      : "border border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-sm text-accent-gold font-semibold">
                      {currentObs.code}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full font-semibold ${
                      currentObs.isFeatured
                        ? "text-accent-gold bg-accent-gold/10 border border-accent-gold/30"
                        : "text-white/60 bg-white/[0.04] border border-white/10"
                    }`}>
                      {currentObs.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl text-white font-normal mb-4 leading-snug">
                    {currentObs.title}
                  </h3>

                  <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed max-w-[820px]">
                    {currentObs.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Understated Institutional Navigation Bar */}
            <div className="max-w-[1000px] mx-auto mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between select-none">
              {/* Previous Button */}
              <button
                onClick={prevObs}
                disabled={obsIndex === 0}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/60 hover:text-accent-gold disabled:opacity-30 disabled:hover:text-white/60 transition-colors duration-200"
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
                        : "text-white/40 hover:text-white bg-white/[0.03]"
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
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/60 hover:text-accent-gold disabled:opacity-30 disabled:hover:text-white/60 transition-colors duration-200"
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
          className="relative w-full py-24 md:py-32 overflow-hidden border-t border-white/[0.03] z-10 bg-[#0B0F1E]/30 focus:outline-none"
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
                <span className="font-mono text-xs text-white/50 font-semibold tracking-wider uppercase">
                  PHASE {currentRoadmap.horizon} • {roadmapIndex + 1} OF 3
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-[48px] text-text-primary font-normal leading-[1.15] mb-4">
                Where VSC Is Heading
              </h2>
              <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed max-w-[700px]">
                We are building an enduring institution over decades—focused on intellectual research quality rather than chasing short-term business metrics.
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
                  className="w-full bg-[#0B0F1E] border border-white/[0.08] rounded-2xl p-8 sm:p-10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-xs tracking-widest text-black bg-accent-gold px-3 py-0.5 rounded font-semibold uppercase">
                      {currentRoadmap.horizon}
                    </span>
                    <span className="font-mono text-xs text-accent-gold/80 font-semibold tracking-wider">
                      {currentRoadmap.commitment}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl text-white font-normal mb-3 leading-snug">
                    {currentRoadmap.title}
                  </h3>

                  <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed max-w-[780px]">
                    {currentRoadmap.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Horizon Selector Navigation Bar */}
            <div className="max-w-[1000px] mx-auto mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between select-none">
              <button
                onClick={prevRoadmap}
                disabled={roadmapIndex === 0}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/60 hover:text-accent-gold disabled:opacity-30 disabled:hover:text-white/60 transition-colors duration-200"
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
                        ? "bg-white/10 text-accent-gold border border-accent-gold/30"
                        : "text-white/40 hover:text-white bg-white/[0.02]"
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
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/60 hover:text-accent-gold disabled:opacity-30 disabled:hover:text-white/60 transition-colors duration-200"
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
        <section className="relative w-full py-36 md:py-56 overflow-hidden border-t border-white/[0.04] select-none z-10 bg-gradient-to-b from-transparent via-[#38BDF8]/[0.02] to-transparent">
          <div className="container max-w-[1200px] text-center">
            <motion.div 
              className="flex flex-col items-center justify-center text-center space-y-1 sm:space-y-3"
              {...animProps}
            >
              <span className="font-display text-6xl sm:text-8xl md:text-[110px] lg:text-[140px] text-[#38BDF8] font-normal leading-[0.92] tracking-tight uppercase block select-none">
                CLARITY
              </span>
              <span className="font-display text-6xl sm:text-8xl md:text-[110px] lg:text-[140px] text-[#38BDF8]/80 font-normal leading-[0.92] tracking-tight uppercase block select-none">
                COMPOUNDS
              </span>
              <span className="font-display text-6xl sm:text-8xl md:text-[110px] lg:text-[140px] text-[#38BDF8] font-normal leading-[0.92] tracking-tight uppercase block select-none">
                OVER TIME.
              </span>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            8. FINAL CTA (Refined Headline & Preserved Structure)
           ========================================================================= */}
        <section className="relative w-full py-28 md:py-36 overflow-hidden border-t border-white/[0.03] z-10 select-none">
          <div className="container max-w-[1200px]">
            <div className="max-w-[700px] mx-auto text-center flex flex-col items-center">
              
              <motion.span 
                className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-6 font-semibold"
                {...animProps}
              >
                YOUR NEXT STEP
              </motion.span>
              
              <motion.h2 
                className="font-display text-3xl sm:text-5xl leading-[1.15] text-text-primary font-normal tracking-tight mb-6"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.05 }}
              >
                Every great investment process starts somewhere.
              </motion.h2>
              
              <motion.p 
                className="font-mono text-sm text-text-secondary leading-relaxed mb-10 max-w-[580px]"
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
                  className="bg-accent-gold text-black font-mono text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded-xl hover:bg-accent-gold-light transition-colors duration-200"
                >
                  Enquire Now &rarr;
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

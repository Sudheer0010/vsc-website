"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { ShinyText } from "@/components/ui/vsc/ShinyText";
import { TimelineRail, TimelineStep } from "@/components/ui/vsc/TimelineRail";
import { EmotionalVsRuledChart } from "@/components/sections/about/EmotionalVsRuledChart";
import { marketLetters, sortedMonths } from "@/data/market-letters";

const earliestMonthKey = sortedMonths[sortedMonths.length - 1];
const earliestLetter = marketLetters[earliestMonthKey];

const originSteps: TimelineStep[] = [
  {
    number: "01",
    year: "2021",
    title: "First systematic framework written down.",
    description: "Rules for entry, sizing, and exit recorded before use rather than after."
  },
  {
    number: "02",
    year: "2024",
    title: "Process rebuilt around capital preservation.",
    description: "Risk defined before entry; position size derived from the stop, not from conviction."
  },
  {
    number: "03",
    year: "2025",
    title: "Research expanded to US equities.",
    description: "Same framework applied across two markets."
  },
  {
    number: "04",
    year: "2026",
    title: "VSC Capital & Advisory founded. Publishing since January.",
    description: "Built as a research desk that publishes its process, not a brokerage or tip service."
  }
];

const observationsData = [
  {
    code: "01",
    topic: "Patience and timing",
    title: "Markets reward patience more often than prediction.",
    desc: "Waiting in cash during uncompensated market regimes is an active, institutional investment decision."
  },
  {
    code: "02",
    topic: "Liquidity and positioning",
    title: "Cash is a position, not an admission of defeat.",
    desc: "Preserving liquidity and optionality allows capital deployment when risk-reward shifts overwhelmingly in my favor."
  },
  {
    code: "03",
    topic: "Risk management",
    title: "Risk must be understood before returns are pursued.",
    desc: "Defining downside parameters and maximum allowable drawdown precedes sizing upside targets on every trade."
  },
  {
    code: "04",
    topic: "Cycle experience",
    title: "Every drawdown teaches something profits cannot.",
    desc: "Drawdowns expose structural system weaknesses; bull market momentum frequently masks risk accumulation."
  },
  {
    code: "05",
    topic: "Systematic process",
    title: "Process creates consistency when emotions cannot.",
    desc: "Pre-defined quantitative risk parameters protect capital during volatile regime shifts when human discretion fails."
  }
];

const roadmapData = [
  {
    horizon: "Today",
    title: "Publish a market letter every month—even when things don't go as planned.",
    desc: "Every letter stays in the archive as it was originally published. No edits after the fact."
  },
  {
    horizon: "Next",
    title: "Publish the rules before the results.",
    desc: "Each framework is written down and dated before it's used—so it can be checked against what actually happened."
  },
  {
    horizon: "Long term",
    title: "Be here ten years from now, with every letter still available.",
    desc: "Over time, consistency and a complete public record matter more than claims."
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
        <section className="relative w-full py-[clamp(80px,10vw,160px)] overflow-hidden z-10 border-t border-rule select-none">
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
            2.5 THE RESEARCHER (Founder letter)
            Sits between the manifesto statement and the origin timeline so
            the origin story that follows has a named subject. First-person
            letter, not a fact panel — text left, photo right, top-aligned.
            Grid/gap/breakpoint values are literal per spec, not mapped to
            the Tailwind scale.
           ========================================================================= */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden border-t border-rule z-10">
          <div className="container max-w-[1200px]">
            <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,72px)] max-[860px]:grid-cols-1 lg:grid-cols-[1fr_minmax(300px,34%)]">

              {/* Text column */}
              <motion.div className="max-[860px]:order-2" {...animProps}>
                <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                  The Researcher
                </span>

                <h2 className="mb-8 font-display text-4xl font-normal leading-[1.15] text-ink md:text-5xl">
                  Hi, I&apos;m Sudheer.
                </h2>

                <div className="max-w-[56ch] space-y-6 text-[16px] leading-[1.75] text-ink-soft">
                  <p>
                    I started trading in 2019, while I was preparing for the UPSC exam. In 2023 I lost 41% of my capital averaging into losers — the single most expensive lesson I&apos;ve had. Every rule I use now came out of that year: define the risk before entry, size by formula, exit by plan.
                  </p>
                  <p>
                    I built VSC to publish that process rather than sell predictions. The letters show how I think. You can decide from those whether it&apos;s worth a conversation.
                  </p>
                </div>

                <div className="mt-10 h-px w-12 bg-growth" />

                <p className="mt-1 font-signature text-5xl leading-none text-ink">
                  Sudheer
                </p>
              </motion.div>

              {/* Photo column — top-aligned, capped narrower than the grid
                  track so it ends above the signature rule at left. */}
              <motion.div className="max-[860px]:order-1" {...animProps}>
                <Image
                  src="/images/sudheer.png"
                  alt="Sudheer Vobhilineni, founder of VSC Capital & Advisory"
                  width={468}
                  height={585}
                  sizes="(min-width: 860px) 250px, 200px"
                  className="h-auto w-full max-w-[250px] rounded max-[860px]:max-w-[200px]"
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            3. WHERE IT ALL BEGAN (Dated Record)
           ========================================================================= */}
        <section className="relative w-full py-[clamp(80px,10vw,160px)] overflow-hidden border-t border-rule z-10">
          <div className="container max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              <div className="lg:col-span-4 select-none">
                <motion.span
                  className="eyebrow"
                  {...animProps}
                >
                  The origin
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
            4. EXPERIENCE SECTION (Heading, pull-quote, exhibit only — the
            narrative prose used to restate the founder letter and the
            origin timeline, so it's been cut to just this)
           ========================================================================= */}
        <section className="relative w-full py-[clamp(80px,10vw,160px)] overflow-hidden border-t border-rule z-10 bg-[#FFFFFF]/60">
          <div className="container max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <motion.span
                  className="eyebrow"
                  {...animProps}
                >
                  Forged in real markets
                </motion.span>
                <motion.h2
                  className="font-display text-3xl sm:text-5xl text-ink font-normal leading-[1.12]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.05 }}
                >
                  Experience Shapes Every Decision I Make.
                </motion.h2>
              </div>

              <div className="lg:col-span-8 flex flex-col max-w-[720px]">
                <blockquote className="font-display text-2xl sm:text-3xl text-growth font-normal italic border-l-2 border-growth pl-6 py-2">
                  &ldquo;Every mistake I made became a rule I refuse to break.&rdquo;
                </blockquote>
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
            {/* Editorial Deck Header — one eyebrow, one heading. The
                position within the five observations is communicated once,
                by the pager below, not repeated here. */}
            <div className="mb-12 select-none">
              <span className="eyebrow">Lessons from the market</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal leading-[1.12]">
                Timeless Observations
              </h2>
            </div>

            {/* Current observation — an open editorial block, not a boxed
                card: this shows one idea at a time, not a comparison. */}
            <div className="max-w-[820px] min-h-[220px] sm:min-h-[180px] relative select-none">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={obsIndex}
                  initial={{ opacity: 0, x: obsDirection > 0 ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: obsDirection > 0 ? -12 : 12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <span className="inline-block rounded-full bg-canvas-sunk px-2.5 py-1 text-[13px] font-medium text-ink-muted">
                    {currentObs.topic}
                  </span>

                  <h3 className="font-display text-2xl sm:text-4xl text-ink font-normal mt-5 mb-4 leading-snug">
                    {currentObs.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-ink-soft leading-relaxed">
                    {currentObs.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pager — the single indicator of where you are in the five
                observations, and the actual control for moving between
                them. */}
            <div className="max-w-[820px] mt-8 pt-6 border-t border-rule flex items-center justify-between select-none">
              <button
                onClick={prevObs}
                disabled={obsIndex === 0}
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-growth disabled:opacity-30 disabled:hover:text-ink-muted transition-colors duration-200"
                aria-label="Previous observation"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {observationsData.map((obs, idx) => (
                  <button
                    key={obs.code}
                    onClick={() => setObs(idx)}
                    className={`font-mono text-xs font-semibold px-2.5 py-1 rounded transition-colors duration-200 ${
                      obsIndex === idx
                        ? "bg-growth text-white"
                        : "text-ink-faint hover:text-ink bg-canvas-sunk"
                    }`}
                    aria-label={`Jump to observation ${idx + 1} of ${observationsData.length}`}
                    aria-current={obsIndex === idx ? "true" : undefined}
                  >
                    {obs.code}
                  </button>
                ))}
              </div>

              <button
                onClick={nextObs}
                disabled={obsIndex === observationsData.length - 1}
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-growth disabled:opacity-30 disabled:hover:text-ink-muted transition-colors duration-200"
                aria-label="Next observation"
              >
                <span>Next</span>
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
            {/* Header & Subtitle — one eyebrow, one heading; the horizon
                pager below is the only "which phase" indicator. */}
            <div className="max-w-[850px] mb-12 select-none">
              <span className="eyebrow">Long-term direction</span>
              <h2 className="font-display text-4xl md:text-[48px] text-ink font-normal leading-[1.15] mb-4">
                Where VSC Is Heading
              </h2>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-[700px]">
                I&apos;m building VSC with a long-term view. In the early years, earning trust through the quality and consistency of the work matters more than growing quickly.
              </p>
            </div>

            {/* Current commitment — an open editorial block: one commitment
                at a time, not a side-by-side comparison. */}
            <div className="max-w-[780px] min-h-[190px] sm:min-h-[150px] relative select-none">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={roadmapIndex}
                  initial={{ opacity: 0, x: roadmapDirection > 0 ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: roadmapDirection > 0 ? -12 : 12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <span className="inline-block rounded-full bg-canvas-sunk px-2.5 py-1 text-[13px] font-medium text-ink-muted">
                    {currentRoadmap.horizon}
                  </span>

                  <h3 className="font-display text-2xl sm:text-4xl text-ink font-normal mt-5 mb-3 leading-snug">
                    {currentRoadmap.title}
                  </h3>

                  <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                    {currentRoadmap.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Horizon pager — the single indicator of which phase is
                showing, and the control for moving between them. */}
            <div className="max-w-[780px] mt-8 pt-6 border-t border-rule flex flex-wrap items-center justify-between gap-y-3 select-none">
              <button
                onClick={prevRoadmap}
                disabled={roadmapIndex === 0}
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-growth disabled:opacity-30 disabled:hover:text-ink-muted transition-colors duration-200"
                aria-label="Previous phase"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="order-3 flex w-full items-center justify-center gap-3 sm:order-none sm:w-auto">
                {roadmapData.map((rm, idx) => (
                  <button
                    key={rm.horizon}
                    onClick={() => setRoadmap(idx)}
                    className={`whitespace-nowrap text-sm font-medium px-3 py-1 rounded-full transition-colors duration-200 ${
                      roadmapIndex === idx
                        ? "bg-growth-tint text-growth"
                        : "text-ink-faint hover:text-ink bg-canvas-sunk"
                    }`}
                    aria-label={`Jump to ${rm.horizon}`}
                    aria-current={roadmapIndex === idx ? "true" : undefined}
                  >
                    {rm.horizon}
                  </button>
                ))}
              </div>

              <button
                onClick={nextRoadmap}
                disabled={roadmapIndex === roadmapData.length - 1}
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-growth disabled:opacity-30 disabled:hover:text-ink-muted transition-colors duration-200"
                aria-label="Next phase"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. POSTER STATEMENT (Massive Apple/Museum Poster Climax)
            Was an animated cyan→green gradient (off-palette); flagged by
            v2 §8 and v2.1 §0.2 as the only element on the page outside the
            palette. Fixed to a flat var(--growth), no animation.
           ========================================================================= */}
        <section className="relative w-full py-[clamp(80px,10vw,160px)] overflow-hidden border-t border-rule select-none z-10 bg-gradient-to-b from-transparent via-[#0F7A40]/[0.02] to-transparent">
          <div className="container max-w-[1200px] text-center">
            <motion.div
              className="flex flex-col items-center justify-center text-center py-6"
              {...animProps}
            >
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal italic leading-[1.15] tracking-tight max-w-[900px] mx-auto text-center drop-shadow-lg">
                &ldquo;<span className="text-growth">Clarity compounds over time.</span>&rdquo;
              </h2>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            8. FINAL CTA (Refined Headline & Preserved Structure)
           ========================================================================= */}
        <section className="relative w-full py-[clamp(80px,10vw,160px)] overflow-hidden border-t border-rule z-10 select-none">
          <div className="container max-w-[1200px]">
            <div className="max-w-[700px] mx-auto text-center flex flex-col items-center">
              
              <motion.span
                className="eyebrow"
                {...animProps}
              >
                Your next step
              </motion.span>

              <motion.h2
                className="font-display text-3xl sm:text-5xl leading-[1.15] text-ink font-normal tracking-tight mb-6"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.05 }}
              >
                Every great investment process starts somewhere.
              </motion.h2>

              <motion.p
                className="text-sm sm:text-base text-ink-soft leading-relaxed mb-10 max-w-[580px]"
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
                  className="bg-growth text-white text-sm font-semibold px-8 py-4 rounded-xl hover:bg-growth-deep transition-colors duration-200"
                >
                  Enquire &rarr;
                </Link>
              </motion.div>
              
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

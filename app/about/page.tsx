"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { TimelineRail, TimelineStep } from "@/components/ui/vsc/TimelineRail";
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
    topic: "Patience",
    title: "You don't have to act on every opportunity.",
    desc: "Sometimes the better decision is to wait."
  },
  {
    code: "02",
    topic: "Risk",
    title: "Know what you can lose before thinking about what you can make.",
    desc: "Risk comes before return."
  },
  {
    code: "03",
    topic: "Drawdowns",
    title: "Every drawdown teaches something profits cannot.",
    desc: "A difficult market can expose weaknesses that a rising market hides."
  },
  {
    code: "04",
    topic: "Process",
    title: "Good rules matter most when emotions get loud.",
    desc: "A clear process helps stop one bad decision from becoming several."
  }
];

export default function OurStory() {
  const [obsIndex, setObsIndex] = useState(0);
  const [obsDirection, setObsDirection] = useState(1);

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

  // Keyboard navigation for Observations Deck
  const handleObsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevObs();
    if (e.key === "ArrowRight") nextObs();
  };

  const currentObs = observationsData[obsIndex];

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
                Built from markets. Built to keep learning.
              </motion.h1>

              {/* Conviction-Driven Paragraph */}
              <motion.p
                className="font-mono text-sm md:text-base text-ink-soft leading-relaxed max-w-[720px] mt-4"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.1 }}
              >
                VSC Capital &amp; Advisory is a research-led markets business built around education, disciplined decision-making and serious market participation.
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
            2. THE RESEARCHER (Founder letter)
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
            4. WHAT THE MARKET TAUGHT US — consolidated from the old
            "Experience Shapes Every Decision" pull-quote/chart section and
            the five-item Timeless Observations deck into one section, four
            observations, reusing the same dark carousel treatment.
           ========================================================================= */}
        <section
          className="relative w-full py-24 md:py-32 overflow-hidden border-t border-vsc-dark-hairline bg-vsc-dark z-10 focus:outline-none"
          tabIndex={0}
          onKeyDown={handleObsKeyDown}
          aria-label="What the market taught us"
        >
          <div className="container max-w-[1200px]">
            <div className="mb-12 select-none">
              <h2 className="font-display text-3xl sm:text-5xl text-vsc-dark-ink font-normal leading-[1.12]">
                Lessons shaped by markets.
              </h2>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-vsc-dark-ink-muted">
                Experience matters only when it changes the next decision.
              </p>
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
                  <span className="inline-block rounded-full bg-vsc-dark-accent/15 px-2.5 py-1 text-[13px] font-medium text-vsc-dark-accent">
                    {currentObs.topic}
                  </span>

                  <h3 className="font-display text-2xl sm:text-4xl text-vsc-dark-ink font-normal mt-5 mb-4 leading-snug">
                    {currentObs.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-vsc-dark-ink-muted leading-relaxed">
                    {currentObs.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pager — the single indicator of where you are in the five
                observations, and the actual control for moving between
                them. */}
            <div className="max-w-[820px] mt-8 pt-6 border-t border-vsc-dark-hairline flex items-center justify-between select-none">
              <button
                onClick={prevObs}
                disabled={obsIndex === 0}
                className="inline-flex items-center gap-1.5 text-sm text-vsc-dark-accent hover:text-white disabled:opacity-30 disabled:hover:text-vsc-dark-accent transition-colors duration-200"
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
                    className={`font-mono text-xs font-semibold px-2.5 py-1 rounded border transition-colors duration-200 ${
                      obsIndex === idx
                        ? "border-growth bg-growth text-white"
                        : "border-vsc-dark-hairline text-vsc-dark-ink-muted hover:text-vsc-dark-ink hover:border-vsc-dark-ink-muted"
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
                className="inline-flex items-center gap-1.5 text-sm text-vsc-dark-accent hover:text-white disabled:opacity-30 disabled:hover:text-vsc-dark-accent transition-colors duration-200"
                aria-label="Next observation"
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
              <motion.h2
                className="font-display text-3xl sm:text-5xl leading-[1.15] text-ink font-normal tracking-tight mb-6"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.05 }}
              >
                See where VSC can help.
              </motion.h2>

              <motion.p
                className="text-sm sm:text-base text-ink-soft leading-relaxed mb-10 max-w-[580px]"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.1 }}
              >
                Education, research-led decision-making and community — built for different stages of your market journey.
              </motion.p>

              <motion.div
                className="flex"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.15 }}
              >
                <Link
                  href="/offerings"
                  className="bg-growth text-white text-sm font-semibold px-8 py-4 rounded-xl hover:bg-growth-deep transition-colors duration-200"
                >
                  Explore offerings &rarr;
                </Link>
              </motion.div>
              
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

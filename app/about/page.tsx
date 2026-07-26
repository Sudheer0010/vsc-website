"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Search, 
  Cpu, 
  Users, 
  Clock, 
  Shield 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";

// Bento Outline Icon Map
const iconComponents = {
  BookOpen,
  Search,
  Cpu,
  Users,
  Clock,
  Shield
};

export default function OurStory() {
  const animProps = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  const bentoTiles = [
    {
      title: "Learn Independently",
      description: "Teaching investors to think independently.",
      iconName: "BookOpen" as const,
      span: "md:col-span-2"
    },
    {
      title: "Think Objectively",
      description: "Evidence before opinions.",
      iconName: "Search" as const,
      span: "md:col-span-1"
    },
    {
      title: "Execute Efficiently",
      description: "Building tools that simplify execution.",
      iconName: "Cpu" as const,
      span: "md:col-span-1"
    },
    {
      title: "Grow Together",
      description: "Learning compounds faster together.",
      iconName: "Users" as const,
      span: "md:col-span-2"
    },
    {
      title: "Compound Patiently",
      description: "Years over weeks.",
      iconName: "Clock" as const,
      span: "md:col-span-1"
    },
    {
      title: "Stay Disciplined",
      description: "Protect trust before returns.",
      iconName: "Shield" as const,
      span: "md:col-span-2"
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-bg-primary overflow-x-hidden text-text-primary">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Dynamic Background Colored Ambient Light Pool */}
      <AmbientLightPool color="rgba(201, 168, 76, 0.02)" className="left-[70%] top-[25%] scale-[1.2]" />

      <main className="relative w-full animate-fade-in">
        
        {/* Phase 2: Editorial Hero */}
        <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden z-10">
          <div className="container max-w-[1200px]">
            <div className="max-w-[950px] flex flex-col items-start text-left select-none">
              {/* Small Label */}
              <motion.span 
                className="font-mono text-xs md:text-sm tracking-[0.2em] text-accent-gold uppercase mb-8"
                {...animProps}
              >
                OUR STORY
              </motion.span>
              
              {/* Display Serif Headline */}
              <motion.h1 
                className="font-display text-4xl sm:text-6xl md:text-[80px] lg:text-[88px] leading-[1.05] text-text-primary font-normal tracking-tight mb-8 max-w-[900px]"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.05 }}
              >
                What if successful investing had less to do with predictions—and more to do with process?
              </motion.h1>
              
              {/* Shortened Supporting Copy with increased spacing (mt-14) */}
              <motion.p 
                className="font-mono text-sm md:text-base text-text-secondary leading-relaxed max-w-[700px] mt-14"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.1 }}
              >
                VSC was built around a simple belief: lasting investment success comes from developing the discipline, structure, and mindset to make better decisions over time.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Minimalist Editorial Break Section */}
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

        {/* Phase 3: Where It All Began Timeline Chapters */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden border-t border-white/[0.03] z-10">
          <div className="container max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: Heading */}
              <div className="lg:col-span-4 select-none">
                <motion.span 
                  className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block"
                  {...animProps}
                >
                  ORIGIN
                </motion.span>
                <motion.h2 
                  className="font-display text-4xl md:text-[44px] text-text-primary font-normal leading-[1.2]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.05 }}
                >
                  Where It All Began
                </motion.h2>
              </div>

              {/* Right Column: Three Story Chapters with larger milestones gap (gap-16) */}
              <div className="lg:col-span-8 flex flex-col gap-16 max-w-[680px]">
                
                {/* Chapter 01 */}
                <motion.div 
                  className="flex flex-col gap-3"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.08 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-base text-accent-gold/30 font-semibold tracking-wider">01</span>
                    <h3 className="font-display text-xl sm:text-2xl text-white font-medium">Markets became louder.</h3>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed pl-10">
                    Information exploded. Understanding didn&apos;t.
                  </p>
                </motion.div>

                {/* Chapter 02 */}
                <motion.div 
                  className="flex flex-col gap-3"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.12 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-base text-accent-gold/30 font-semibold tracking-wider">02</span>
                    <h3 className="font-display text-xl sm:text-2xl text-white font-medium">Noise replaced clarity.</h3>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed pl-10">
                    Everyone had opinions. Few had a process.
                  </p>
                </motion.div>

                {/* Chapter 03 */}
                <motion.div 
                  className="flex flex-col gap-3"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.16 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-base text-accent-gold/30 font-semibold tracking-wider">03</span>
                    <h3 className="font-display text-xl sm:text-2xl text-white font-medium">So VSC was born.</h3>
                  </div>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed pl-10">
                    Not to predict tomorrow, but to help investors make better decisions repeatedly.
                  </p>
                </motion.div>

              </div>

            </div>
          </div>
        </section>

        {/* Phase 4: Our Investment Philosophy */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden border-t border-white/[0.03] z-10">
          <div className="container max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 select-none">
              <div className="lg:col-span-4">
                <motion.span 
                  className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block"
                  {...animProps}
                >
                  METHODOLOGY
                </motion.span>
                <motion.h2 
                  className="font-display text-4xl md:text-[44px] text-text-primary font-normal leading-[1.2]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.05 }}
                >
                  Our Investment Philosophy
                </motion.h2>
              </div>
              <div className="lg:col-span-8 flex items-center">
                <motion.p 
                  className="font-mono text-sm md:text-base text-text-secondary leading-relaxed max-w-[650px]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.08 }}
                >
                  Four beliefs shape every decision we make.
                </motion.p>
              </div>
            </div>

            {/* Editorial Manifesto (Principle blocks with low opacity borders border-white/[0.04]) */}
            <div className="max-w-[900px] mx-auto border-t border-white/[0.04] select-none">
              <div className="flex flex-col">
                
                {/* Belief 1 */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-12 py-12 border-b border-white/[0.04]"
                  {...animProps}
                >
                  <span className="md:col-span-2 font-mono text-xs text-accent-gold/60 font-semibold mb-2 md:mb-0">01</span>
                  <div className="md:col-span-10 flex flex-col gap-2">
                    <h3 className="font-display text-xl sm:text-2xl text-white font-medium">Protect capital first.</h3>
                    <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">You only get to compound if you survive.</p>
                  </div>
                </motion.div>

                {/* Belief 2 */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-12 py-12 border-b border-white/[0.04]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.05 }}
                >
                  <span className="md:col-span-2 font-mono text-xs text-accent-gold/60 font-semibold mb-2 md:mb-0">02</span>
                  <div className="md:col-span-10 flex flex-col gap-2">
                    <h3 className="font-display text-xl sm:text-2xl text-white font-medium">Respect the process.</h3>
                    <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">Discipline outperforms emotion.</p>
                  </div>
                </motion.div>

                {/* Belief 3 */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-12 py-12 border-b border-white/[0.04]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.1 }}
                >
                  <span className="md:col-span-2 font-mono text-xs text-accent-gold/60 font-semibold mb-2 md:mb-0">03</span>
                  <div className="md:col-span-10 flex flex-col gap-2">
                    <h3 className="font-display text-xl sm:text-2xl text-white font-medium">Patience compounds.</h3>
                    <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">The best opportunities rarely arrive every day.</p>
                  </div>
                </motion.div>

                {/* Belief 4 */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-12 py-12 border-b border-white/[0.04]"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.15 }}
                >
                  <span className="md:col-span-2 font-mono text-xs text-accent-gold/60 font-semibold mb-2 md:mb-0">04</span>
                  <div className="md:col-span-10 flex flex-col gap-2">
                    <h3 className="font-display text-xl sm:text-2xl text-white font-medium">Never stop improving.</h3>
                    <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">Markets evolve. So should we.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Editorial Transition Separator (Reset reader attention) */}
        <div className="w-full flex justify-center py-16 select-none opacity-20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
        </div>

        {/* Phase 5: The Road Ahead (Apple Bento Grid) */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden border-t border-white/[0.03] z-10">
          <div className="container max-w-[1200px]">
            
            <div className="max-w-[600px] mb-16 text-left select-none">
              <motion.span 
                className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block"
                {...animProps}
              >
                FUTURE ROADMAP
              </motion.span>
              <motion.h2 
                className="font-display text-4xl md:text-[44px] text-text-primary font-normal leading-[1.2]"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.05 }}
              >
                The Road Ahead
              </motion.h2>
            </div>

            {/* Apple Bento Grid with premium micro-interactions (y: -3 hover lift, bg lightens, border brightens) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
              {bentoTiles.map((tile, idx) => {
                const Icon = iconComponents[tile.iconName];
                return (
                  <motion.div
                    key={idx}
                    className={`${tile.span} relative group bg-[#0B0F1E] hover:bg-[#0D1224] border border-white/5 hover:border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-[240ms] ease-out`}
                    style={{ transformStyle: "preserve-3d" }}
                    whileHover={{ 
                      y: -3,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
                    }}
                    {...animProps}
                    transition={{ ...animProps.transition, delay: idx * 0.05 }}
                  >
                    {/* Subtle noise pattern matching layout */}
                    <div className="absolute inset-0 rounded-2xl opacity-[0.015] bg-repeat pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
                    
                    <div className="flex flex-col gap-6 relative z-10">
                      {/* Icon scales subtly (scale-105) on hover */}
                      <span className="text-[#C9A84C]/50 group-hover:text-accent-gold group-hover:scale-105 transition-all duration-[240ms] ease-out origin-left inline-block">
                        <Icon className="w-5 h-5 stroke-[1.5]" />
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl text-white font-medium mt-2">
                        {tile.title}
                      </h3>
                    </div>
                    
                    <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed mt-12 relative z-10">
                      {tile.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Phase 8: One Final Editorial Conclusion Sentence */}
        <section className="relative w-full py-24 overflow-hidden border-t border-white/[0.03] select-none z-10">
          <div className="container max-w-[1200px] text-center">
            <motion.h2 
              className="font-display text-2xl sm:text-3xl md:text-4xl text-text-primary font-normal leading-[1.4] max-w-[850px] mx-auto"
              {...animProps}
            >
              Because investing is less about predicting tomorrow—and more about becoming the kind of person who can navigate it.
            </motion.h2>
          </div>
        </section>

        {/* Phase 6: Closing Section CTA */}
        <section className="relative w-full py-28 md:py-36 overflow-hidden border-t border-white/[0.03] z-10">
          <div className="container max-w-[1200px]">
            <div className="max-w-[700px] mx-auto text-center flex flex-col items-center select-none">
              
              {/* Label */}
              <motion.span 
                className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-6"
                {...animProps}
              >
                YOUR NEXT STEP
              </motion.span>
              
              {/* Option A Headline */}
              <motion.h2 
                className="font-display text-4xl sm:text-[44px] leading-[1.2] text-text-primary font-normal tracking-tight mb-4"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.05 }}
              >
                Every investor remembers the moment they decided to take investing seriously.
              </motion.h2>
              
              {/* Refined Invitation Supporting Copy */}
              <motion.p 
                className="font-mono text-sm text-text-secondary leading-relaxed mb-10 max-w-[580px]"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.1 }}
              >
                Whether you&apos;re taking your first step or refining years of experience, VSC exists to help you invest with greater clarity, discipline and confidence.
              </motion.p>
              
              {/* Primary button */}
              <motion.div 
                className="flex"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.15 }}
              >
                <Link 
                  href="/enquire" 
                  className="btn btn-gold"
                  style={{ padding: "14px 32px", fontSize: "12px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}
                >
                  Start Your VSC Journey →
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

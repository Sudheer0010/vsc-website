"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { VSCButton } from "@/components/ui/vsc/VSCButton";

export function ResearchDeskAndTestimonials() {
  const testimonials = [
    {
      quote: "VSC's framework replaced chaos with structure. The transition from trading social media noise to executing a defined momentum checklist has completely reframed my approach to capital preservation.",
      name: "Shivam Thakur",
      role: "Market Participant"
    },
    {
      quote: "The focus on institutional footprints and sector rotation provides a logical basis for every setup. It eliminates emotional guesswork, allowing consistent execution around my professional schedule.",
      name: "Sai Eshwar",
      role: "Working Professional"
    },
    {
      quote: "Treating trading as a business requires mathematical risk control. VSC's sizing models and predefined exits have made drawdowns predictable, manageable, and stress-free.",
      name: "Hema Chandra",
      role: "Business Owner"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  return (
    <section id="evidence" className="relative w-full py-24 sm:py-32 bg-bg-paper-navy border-t border-b border-white/[0.06] select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(201,168,76,0.025),transparent_70%)] pointer-events-none" 
      />

      <div className="container max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 2-Column Side-by-Side Split Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Vertical Center Divider Hairline (Desktop) */}
          <div 
            aria-hidden="true" 
            className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/10 -translate-x-1/2 pointer-events-none" 
          />

          {/* LEFT COLUMN: From The Research Desk */}
          <motion.div 
            className="lg:col-span-6 flex flex-col justify-between space-y-6 lg:pr-6"
            {...animProps}
          >
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-3">
                FROM THE RESEARCH DESK
              </span>
              <h2 className="font-display text-2xl sm:text-4xl text-white font-normal leading-[1.14] mb-6">
                We Do Not Publish News. We Publish Thinking.
              </h2>

              {/* Featured Publication Card */}
              <Link 
                href="/blog" 
                className="block p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-accent-gold/40 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent-gold font-bold uppercase">
                    LATEST MARKET LETTER • JULY 2026
                  </span>
                  <span className="font-mono text-[10px] text-white/40">2 MIN READ</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-white font-medium leading-[1.25] mb-3 group-hover:text-accent-gold transition-colors">
                  Navigating Market Regime Shifts & Volatility Compression
                </h3>
                <p className="font-mono text-xs text-text-secondary leading-relaxed mb-6">
                  An institutional study analyzing macro liquidity transitions, volatility cycles, and defensive capital deployment during equity market inflection points.
                </p>
                <div className="flex items-center gap-2 text-accent-gold font-mono text-xs font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Read Market Letter</span>
                  <ArrowRight className="w-4 h-4 text-accent-gold" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Investor Perspectives / Testimonials */}
          <motion.div 
            className="lg:col-span-6 flex flex-col justify-between space-y-6 lg:pl-6 pt-10 lg:pt-0 border-t lg:border-t-0 border-white/10"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.1 }}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-3">
                    INVESTOR PERSPECTIVES
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl text-white font-normal leading-[1.14]">
                    What Other Investors Say
                  </h2>
                </div>

                {/* Carousel Navigation Controls */}
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full border border-white/10 bg-[#090D18] flex items-center justify-center text-white/70 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full border border-white/10 bg-[#090D18] flex items-center justify-center text-white/70 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Active Testimonial Card */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 border-l-2 border-l-accent-gold min-h-[220px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex flex-col justify-between h-full"
                  >
                    <blockquote className="font-display text-base sm:text-lg text-white/90 font-light leading-relaxed italic mb-6">
                      &ldquo;{testimonials[activeIndex].quote}&rdquo;
                    </blockquote>

                    <div>
                      <cite className="not-italic font-display text-base text-white font-medium block">
                        {testimonials[activeIndex].name}
                      </cite>
                      <span className="font-mono text-[11px] text-accent-gold/80 uppercase tracking-wider block mt-0.5">
                        {testimonials[activeIndex].role}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Indicator Dots */}
            <div className="flex gap-2 pt-2">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-6 bg-accent-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

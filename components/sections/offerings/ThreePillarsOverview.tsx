"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { offeringsConfig, OfferingItem } from "./offeringsConfig";
import { SpotlightCard } from "@/components/ui/vsc/SpotlightCard";

export function ThreePillarsOverview() {
  const [selectedPillar, setSelectedPillar] = useState<OfferingItem | null>(null);

  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  return (
    <section 
      id="offerings-overview" 
      className="relative w-full pt-16 pb-24 overflow-hidden z-10 select-none"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Editorial Header */}
        <div className="max-w-[750px] mb-16 text-left">
          <motion.span 
            className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block font-semibold"
            {...animProps}
          >
            OFFERINGS OVERVIEW
          </motion.span>
          <motion.h2 
            className="font-display text-3xl sm:text-5xl text-text-primary font-normal leading-[1.15]"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            Institutional Solutions. Structured for Clarity.
          </motion.h2>
        </div>

        {/* 3 Vertical Cards Side-by-Side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-[1200px] mx-auto items-stretch">
          {offeringsConfig.map((pillar, idx) => (
            <motion.div
              key={pillar.slug}
              {...animProps}
              transition={{ ...animProps.transition, delay: 0.1 * idx }}
              className="flex flex-col"
            >
              <SpotlightCard
                className="p-6 sm:p-8 h-full flex flex-col justify-between hover:border-white/20 transition-all duration-300 group cursor-pointer"
                spotlightColor={`${pillar.accentColor}20`}
                borderColor={`${pillar.accentColor}60`}
              >
                {/* Card Face Body */}
                <div className="flex flex-col gap-6" onClick={() => setSelectedPillar(pillar)}>
                  {/* Tagline / Category */}
                  <span 
                    className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold block"
                    style={{ color: pillar.accentColor }}
                  >
                    {pillar.tagline}
                  </span>

                  {/* Heading Title */}
                  <h3 className="font-display text-2xl sm:text-3xl text-white font-normal group-hover:text-accent-gold transition-colors duration-200">
                    {pillar.title}
                  </h3>

                  {/* Availability Badge */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 pb-4 border-b border-white/10">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
                      <Clock className="w-3 h-3 text-white/50" />
                      {pillar.availability}
                    </span>
                  </div>

                  {/* DESIGNED FOR Concise Bullet List */}
                  <div>
                    <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-3 font-semibold">
                      DESIGNED FOR
                    </h4>
                    <ul className="space-y-2">
                      {pillar.designedForList.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: pillar.accentColor }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Link: Know More */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPillar(pillar)}
                    className="font-mono text-xs text-white/40 hover:text-white/80 transition-colors"
                  >
                    View Details
                  </button>

                  <Link
                    href={pillar.path}
                    className="font-mono text-xs text-accent-gold font-semibold hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5"
                  >
                    <span>Know More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Expanded Modal Overlay for Detailed Pillar Content */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-[900px] max-h-[90vh] overflow-y-auto bg-[#0B0F1E] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            >
              {/* Close Trigger */}
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="pb-6 mb-8 border-b border-white/10 pr-12">
                <span
                  className="font-mono text-xs tracking-[0.2em] uppercase font-semibold block mb-2"
                  style={{ color: selectedPillar.accentColor }}
                >
                  {selectedPillar.tagline}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white font-normal mb-4">
                  {selectedPillar.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
                    <Clock className="w-3.5 h-3.5 text-white/50" />
                    {selectedPillar.availability}
                  </span>
                </div>
              </div>

              {/* Modal 2-Column Full Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Column 1: What it is & Who it is for */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2 font-semibold">
                      WHAT IT IS
                    </h4>
                    <p className="font-mono text-sm text-text-secondary leading-relaxed">
                      {selectedPillar.whatItIs}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2 font-semibold">
                      WHO IT IS FOR
                    </h4>
                    <p className="font-mono text-sm text-text-secondary leading-relaxed">
                      {selectedPillar.whoItIsFor}
                    </p>
                  </div>
                </div>

                {/* Column 2: Delivery Format & Expected Outcome */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2 font-semibold">
                      DELIVERY FORMAT
                    </h4>
                    <p className="font-mono text-sm text-text-secondary leading-relaxed">
                      {selectedPillar.deliveryFormat}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2 font-semibold">
                      EXPECTED OUTCOME
                    </h4>
                    <p className="font-mono text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                      <span>{selectedPillar.expectedOutcome}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                <Link
                  href="/enquire"
                  className="font-mono text-xs tracking-[0.2em] uppercase font-semibold text-bg-dark bg-accent-gold hover:bg-accent-gold/90 px-6 py-3 rounded-lg transition-colors"
                >
                  Enquire Now &rarr;
                </Link>

                <Link
                  href={selectedPillar.path}
                  className="font-mono text-xs text-white/80 hover:text-white transition-colors inline-flex items-center gap-1.5 px-4 py-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <span>Know More</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

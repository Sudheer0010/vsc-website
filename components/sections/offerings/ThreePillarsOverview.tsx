"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { offeringsConfig } from "./offeringsConfig";

export function ThreePillarsOverview() {
  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  return (
    <section 
      id="offerings-overview" 
      className="relative w-full pt-16 pb-20 overflow-hidden z-10 select-none"
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

        {/* Detailed Offering Overview Cards */}
        <div className="space-y-12 max-w-[1100px] mx-auto">
          {offeringsConfig.map((pillar, idx) => (
            <motion.div
              key={pillar.slug}
              className="bg-[#0B0F1E] border border-white/10 rounded-2xl p-8 sm:p-12 hover:border-white/20 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.25)]"
              {...animProps}
              transition={{ ...animProps.transition, delay: 0.1 * idx }}
            >
              {/* Card Header: Title & Badges */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
                <div>
                  <span 
                    className="font-mono text-xs tracking-[0.2em] uppercase font-semibold block mb-2"
                    style={{ color: pillar.accentColor }}
                  >
                    {pillar.tagline}
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl text-white font-normal">
                    {pillar.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
                    <Clock className="w-3 h-3 text-white/50" />
                    {pillar.availability}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80">
                    <Tag className="w-3 h-3 text-white/50" />
                    {pillar.pricing}
                  </span>
                </div>
              </div>

              {/* 2-Column Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Column 1: What it is & Who it is for */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2 font-semibold">
                      WHAT IT IS
                    </h4>
                    <p className="font-mono text-sm text-text-secondary leading-relaxed">
                      {pillar.whatItIs}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2 font-semibold">
                      WHO IT IS FOR
                    </h4>
                    <p className="font-mono text-sm text-text-secondary leading-relaxed">
                      {pillar.whoItIsFor}
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
                      {pillar.deliveryFormat}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2 font-semibold">
                      EXPECTED OUTCOME
                    </h4>
                    <p className="font-mono text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                      <span>{pillar.expectedOutcome}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                <Link
                  href={`/enquire?service=${pillar.slug}`}
                  className="btn btn-gold font-mono text-xs px-6 py-3 rounded-full inline-flex items-center gap-2"
                >
                  Enquire Now &rarr;
                </Link>

                <Link
                  href={pillar.path}
                  className="font-mono text-xs text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5 px-4 py-3"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

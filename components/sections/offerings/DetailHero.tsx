"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { AmbientLightPool, CoordinateLabel } from "./OfferingsBackground";

interface DetailHeroProps {
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  glowColor: string;
  referenceText?: string;
}

export function DetailHero({
  title,
  tagline,
  description,
  accentColor,
  glowColor,
  referenceText = "SYS.REF // 10.982.01"
}: DetailHeroProps) {
  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  return (
    <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden z-10">
      {/* Subtle Ambient Light Pool (5-8% Opacity) */}
      <AmbientLightPool color={glowColor} className="left-[70%] top-[40%] scale-[1.2]" />
      
      {/* Top right reference coord */}
      <CoordinateLabel text={referenceText} className="top-10 right-10" />

      <div className="container max-w-[1200px]">
        <div className="max-w-[850px] flex flex-col items-start text-left">
          
          {/* Back button */}
          <motion.div {...animProps} className="mb-8">
            <Link 
              href="/offerings" 
              className="inline-flex items-center gap-2 font-mono text-xs text-ink-faint hover:text-ink transition-colors duration-200 uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Offerings
            </Link>
          </motion.div>
          
          {/* Tagline / Subheading */}
          <motion.span 
            className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4"
            style={{ color: accentColor }}
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            {tagline}
          </motion.span>
          
          {/* Main Title */}
          <motion.h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-ink font-normal tracking-tight mb-6"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.1 }}
          >
            {title}
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="font-mono text-sm md:text-base text-ink-soft leading-relaxed max-w-[680px]"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.15 }}
          >
            {description}
          </motion.p>
          
        </div>
      </div>
    </section>
  );
}

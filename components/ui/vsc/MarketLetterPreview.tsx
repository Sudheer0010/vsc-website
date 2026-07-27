"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * VSC Component: MarketLetterPreview
 * 
 * 1. Purpose: Displays research memo and Market Letter previews as publication-grade editorial entries.
 * 2. Atlas Alignment: Expresses Central Statement ("We do not publish news. We publish thinking") and Signature 07.
 * 3. Signature Behaviour: Formatted like an article entry in Financial Times Weekend — featuring publication date rule, serif headline, short thesis, and read time.
 * 4. Emotional Outcome: Makes the reader feel like they are accessing high-conviction research rather than blog posts.
 * 5. Accessibility: Full keyboard focus states, semantic <article> markup, accessible link titles.
 * 6. Performance: Light CSS container with hardware-accelerated subtle hover lift (2px).
 */

interface MarketLetterPreviewProps {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  className?: string;
}

export function MarketLetterPreview({
  slug,
  date,
  category,
  title,
  excerpt,
  readTime,
  className = "",
}: MarketLetterPreviewProps) {
  const shouldReduceMotion = useReducedMotion();

  const animProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <motion.article
      className={`group relative bg-[#0B0F1E] border border-white/[0.06] rounded-xl p-8 hover:border-accent-gold/40 transition-all duration-300 flex flex-col justify-between select-none ${className}`}
      {...animProps}
    >
      <div>
        {/* Publication Metadata Rule */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
          <span className="font-mono text-[10px] tracking-[0.2em] text-accent-gold/80 uppercase font-semibold">
            {category}
          </span>
          <div className="flex items-center gap-3 font-mono text-[10px] text-white/40">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
        </div>

        {/* Serif Headline */}
        <h3 className="font-display text-2xl sm:text-3xl text-white font-normal leading-[1.25] tracking-tight mb-4 group-hover:text-accent-gold transition-colors duration-200">
          <Link href={`/blog/${slug}`} className="focus:outline-none focus:ring-2 focus:ring-accent-gold/50 rounded-sm">
            {title}
          </Link>
        </h3>

        {/* Short Thesis Excerpt */}
        <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
          {excerpt}
        </p>
      </div>

      {/* Read Document Link */}
      <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 group-hover:text-accent-gold transition-colors uppercase font-medium">
          READ BRIEFING &rarr;
        </span>
        <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
          MEMO
        </span>
      </div>
    </motion.article>
  );
}

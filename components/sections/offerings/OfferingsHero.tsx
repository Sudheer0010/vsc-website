"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function OfferingsHero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToOverview = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("offerings-overview");
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const animProps = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }
  } as const;

  return (
    <section className="relative w-full min-h-[85vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden select-none border-b border-rule z-10">
      {/* Paper grain, not a photo — vsc_offerings_hero.png was leftover
          dark-navy-and-gold generated art from before this redesign, the
          exact "AI premium finance" look the rest of the site moved away
          from. Same treatment as the homepage hero: felt texture + a warm
          glow, nothing that can clash with the palette again. */}
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
        <div className="max-w-[800px] flex flex-col items-start text-left">
          
          {/* Tracked small label */}
          <motion.span
            className="font-mono text-xs md:text-sm tracking-[0.2em] text-accent-gold uppercase mb-6 font-bold"
            {...animProps}
          >
            OFFERINGS
          </motion.span>

          {/* Main Editorial Headline */}
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-[72px] lg:text-[80px] leading-[1.06] text-ink font-normal tracking-tight mb-8"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            Three Pillars.<br />One Investment Philosophy.
          </motion.h1>

          {/* Slightly reduced paragraph length */}
          <motion.p
            className="font-mono text-sm md:text-base text-ink-soft leading-relaxed max-w-[650px] mb-8"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.1 }}
          >
            Every VSC offering exists to build systematic thinking—from foundational market education, to disciplined portfolio guidance, to institutional-grade research.
          </motion.p>

          {/* Interactive 3 Pathways Node Badges */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-10"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.12 }}
          >
            {[
              { label: "01 / Learning Hub", color: "#EAB308", href: "#offerings-overview" },
              { label: "02 / Portfolio Advantage", color: "#38BDF8", href: "#offerings-overview" },
              { label: "03 / Inner Circle", color: "#0F7A40", href: "#offerings-overview" },
            ].map((node) => (
              <a
                key={node.label}
                href={node.href}
                onClick={handleScrollToOverview}
                className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-canvas-sunk border border-rule hover:border-rule  transition-all duration-300"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: node.color }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: node.color }}
                  />
                </span>
                <span className="font-mono text-[11px] tracking-wider text-ink-soft group-hover:text-ink transition-colors">
                  {node.label}
                </span>
              </a>
            ))}
          </motion.div>
          
          {/* Action button */}
          <motion.div 
            className="flex"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.15 }}
          >
            <a 
              href="#offerings-overview" 
              onClick={handleScrollToOverview}
              className="btn btn-gold"
              style={{ padding: "14px 28px", fontSize: "12px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}
            >
              EXPLORE OFFERINGS
            </a>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

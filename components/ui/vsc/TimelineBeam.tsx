"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export interface TimelineStep {
  number: string;
  title: string;
  description: string;
}

interface TimelineBeamProps {
  steps: TimelineStep[];
  className?: string;
}

export function TimelineBeam({ steps, className = "" }: TimelineBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className={`relative pl-8 sm:pl-10 ${className}`}>
      {/* Background Vertical Static Track */}
      <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-6 w-[2px] bg-canvas-sunk rounded-full z-0" />

      {/* Animated Scroll-Connected Beam Glow */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-[11px] sm:left-[15px] top-3 bottom-6 w-[2px] bg-gradient-to-b from-accent-gold via-[#38BDF8] to-accent-gold shadow-[0_0_12px_rgba(15, 122, 64,0.8)] rounded-full z-10"
        />
      )}

      {/* Timeline Steps */}
      <div className="flex flex-col gap-12 sm:gap-14 relative z-20">
        {steps.map((step, idx) => (
          <motion.div
            key={step.number}
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="relative flex flex-col gap-2.5 group"
          >
            {/* Timeline Node Dot */}
            <div className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-canvas border-2 border-accent-gold group-hover:scale-125 group-hover:bg-accent-gold transition-all duration-300 shadow-[0_0_10px_rgba(15, 122, 64,0.5)] z-20" />

            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs sm:text-sm text-accent-gold font-bold">
                {step.number}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-tight">
                {step.title}
              </h3>
            </div>
            <p className="font-mono text-xs sm:text-sm text-ink-soft leading-relaxed max-w-[640px]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

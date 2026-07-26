"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { offeringsConfig } from "./offeringsConfig";

export function ThreePillarsOverview() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const router = useRouter();

  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  return (
    <section 
      id="offerings-overview" 
      className="relative w-full pt-16 pb-12 overflow-hidden z-10"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="container max-w-[1200px]">
        
        {/* Simple Editorial Header */}
        <div className="max-w-[600px] mb-12 text-left">
          <motion.span 
            className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block"
            {...animProps}
          >
            THREE PILLARS
          </motion.span>
          <motion.h2 
            className="font-display text-3xl md:text-4xl text-text-primary font-normal leading-[1.2]"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            Choose the path that best fits you.
          </motion.h2>
        </div>

        {/* Index List (Notion/Linear/Apple style) */}
        <div className="max-w-[900px] mx-auto border-t border-white/10 select-none">
          {offeringsConfig.map((pillar, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={pillar.slug}
                onClick={() => router.push(pillar.path)}
                className="grid grid-cols-1 md:grid-cols-12 items-center py-6 md:py-8 border-b border-white/10 cursor-pointer transition-all duration-[240ms] ease-out px-4 hover:bg-white/[0.01]"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Pillar Title */}
                <div className="md:col-span-4 mb-2 md:mb-0">
                  <h3 
                    className="font-display text-xl sm:text-2xl transition-colors duration-[240ms] ease-out"
                    style={{
                      color: isHovered 
                        ? pillar.accentColor
                        : "rgba(244, 241, 236, 0.9)"
                    }}
                  >
                    {pillar.title}
                  </h3>
                </div>

                {/* Pillar Statement */}
                <div className="md:col-span-5 mb-4 md:mb-0 pr-6">
                  <p 
                    className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed transition-colors duration-[240ms] ease-out"
                    style={{
                      color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.45)"
                    }}
                  >
                    {pillar.tagline}
                  </p>
                </div>

                {/* Explore Link */}
                <div className="md:col-span-3 flex justify-start md:justify-end items-center">
                  <span 
                    className="font-mono text-xs tracking-wider inline-flex items-center gap-1.5 transition-all duration-[240ms] ease-out text-white/40"
                    style={{
                      color: isHovered ? pillar.accentColor : undefined
                    }}
                  >
                    EXPLORE
                    <motion.div
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

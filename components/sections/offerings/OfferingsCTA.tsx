"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTALinkItem {
  label: string;
  href: string;
  color: string;
  glowColor: string;
}

const ctaLinks: CTALinkItem[] = [
  {
    label: "Explore Learning Hub",
    href: "/enquire?source=learning-hub",
    color: "hover:text-[#6F86B7] hover:border-[#6F86B7]/30",
    glowColor: "rgba(111, 134, 183, 0.05)"
  },
  {
    label: "Explore VSC Advantage",
    href: "/enquire?source=advisory",
    color: "hover:text-[#0F7A40] hover:border-[#0F7A40]/30",
    glowColor: "rgba(15, 122, 64, 0.05)"
  },
  {
    label: "Join Inner Circle",
    href: "/enquire?source=research",
    color: "hover:text-[#5D8B73] hover:border-[#5D8B73]/30",
    glowColor: "rgba(93, 139, 115, 0.05)"
  }
];

export function OfferingsCTA() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  return (
    <section className="relative w-full py-28 md:py-36 overflow-hidden z-10">
      <div className="container max-w-[1200px]">
        <div className="max-w-[800px] mx-auto text-center flex flex-col items-center select-none">
          
          {/* Tracked small label */}
          <motion.span 
            className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-6"
            {...animProps}
          >
            GET STARTED
          </motion.span>
          
          {/* Statement */}
          <motion.h2 
            className="font-display text-4xl sm:text-[44px] leading-[1.2] text-ink font-normal tracking-tight mb-4 animate-fade-in"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            Ready to begin?
          </motion.h2>
          
          {/* Subheading */}
          <motion.p 
            className="font-mono text-sm text-ink-soft leading-relaxed mb-16"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.1 }}
          >
            Choose your starting point.
          </motion.p>
          
          {/* Contextual start links */}
          <motion.div 
            className="w-full max-w-[700px] flex flex-col gap-4"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.15 }}
          >
            {ctaLinks.map((link, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <Link
                  key={idx}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between py-5 px-6 rounded-xl border border-rule bg-surface font-mono text-sm transition-all duration-[240ms] ease-out",
                    link.color
                  )}
                  style={{
                    borderColor: isHovered ? undefined : "rgba(22,29,24,0.05)",
                    boxShadow: isHovered ? `0 4px 20px ${link.glowColor}` : "none",
                    transform: isHovered ? "translateY(-2px)" : "translateY(0)"
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <span className="font-medium text-ink group-hover:text-inherit">
                    {link.label}
                  </span>
                  
                  <span className="flex items-center gap-1">
                    <span className="text-[10px] tracking-wider opacity-60">START</span>
                    <motion.div
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </span>
                </Link>
              );
            })}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

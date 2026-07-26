"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { 
  DraftingCircles, 
  DraftingGrid, 
  AmbientLightPool, 
  CoordinateLabel, 
  MarginRuler 
} from "./OfferingsBackground";

export function LearningHubSection() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const steps = [
    "Market Foundations",
    "Technical Analysis",
    "Risk Management",
    "Trading Psychology"
  ];

  return (
    <div className="relative w-full py-16 md:py-20 overflow-hidden">
      {/* Dynamic Background Vectors */}
      <DraftingGrid />
      <DraftingCircles cx="85%" cy="40%" r="180" />
      <CoordinateLabel text="SYS.REF // 10.982.01" className="top-10 right-10" />
      <MarginRuler side="left" />
      <AmbientLightPool color="rgba(111, 134, 183, 0.03)" className="left-[85%] top-[40%]" />

      <div className="container max-w-[1200px] relative z-10">
        
        {/* 3-line Editorial Intro */}
        <div className="max-w-[700px] mb-16">
          <p className="font-mono text-sm text-text-secondary leading-relaxed">
            The VSC Learning Hub is a professional learning framework built to develop systematic market structure analysis, technical setups, and risk bounds before committing capital.
          </p>
        </div>

        {/* Curriculum Timeline - Connected Vertical Nodes (Simple format) */}
        <div className="relative max-w-[800px] pl-8 sm:pl-12 lg:pl-16 mb-16">
          
          {/* Connected vertical line */}
          <div 
            className="absolute left-0 sm:left-4 lg:left-6 top-3 bottom-3 w-[1px]"
            style={{ 
              background: "linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, rgba(255,255,255,0.03) 100%)" 
            }}
          />

          <div className="flex flex-col gap-10">
            {steps.map((title, idx) => {
              const stepNum = `0${idx + 1}`;
              const isRowHovered = hoveredRow === idx;
              return (
                <div
                  key={idx}
                  className="relative group cursor-pointer flex items-center justify-between"
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Node circle */}
                  <div 
                    className="absolute -left-[37px] sm:-left-[53px] lg:-left-[69px] w-[9px] h-[9px] rounded-full border bg-[#060810] z-20 transition-all duration-[240ms] ease-out"
                    style={{
                      borderColor: isRowHovered ? "#6F86B7" : "rgba(255, 255, 255, 0.15)",
                      boxShadow: isRowHovered ? "0 0 8px rgba(111, 134, 183, 0.3)" : "none",
                      transform: isRowHovered ? "scale(1.15)" : "scale(1)"
                    }}
                  />

                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-white/30">{stepNum}</span>
                    <h3 
                      className="font-display text-xl sm:text-2xl transition-colors duration-[240ms] ease-out"
                      style={{
                        color: isRowHovered ? "#6F86B7" : "rgba(244, 241, 236, 0.85)"
                      }}
                    >
                      {title}
                    </h3>
                  </div>

                  {/* Subtle slide right icon */}
                  <motion.div
                    animate={{ 
                      x: isRowHovered ? 4 : 0,
                      opacity: isRowHovered ? 0.8 : 0
                    }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="text-[#6F86B7] pr-4 hidden sm:block"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Restrained CTA */}
        <div className="border-t border-white/5 pt-8 mt-12 flex justify-start">
          <Link 
            href="/enquire" 
            className="inline-flex items-center gap-2 font-mono text-xs md:text-sm tracking-wider transition-colors duration-200 uppercase"
            style={{ color: "#6F86B7" }}
          >
            Explore Learning Hub <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

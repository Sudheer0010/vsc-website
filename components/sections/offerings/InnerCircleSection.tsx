"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { 
  DraftingGrid, 
  AmbientLightPool, 
  CoordinateLabel, 
  MarginRuler 
} from "./OfferingsBackground";

interface ChecklistItem {
  title: string;
  description?: string;
}

const inclusionData: ChecklistItem[] = [
  {
    title: "Monthly Research Notes",
    description: "Institutional market letters covering execution quality and lessons."
  },
  {
    title: "Market Themes",
    description: "Sector rotation audits and structural macro setups."
  },
  {
    title: "Execution Reviews",
    description: "Post-trade rules auditing and process analysis."
  },
  {
    title: "Community Discussions",
    description: "Constructive alignment with process-driven investors."
  },
  {
    title: "Product Roadmap",
    description: "Early validation of upcoming systematic algorithms."
  },
  {
    title: "Early Access",
    description: "Priority queue placement for limited capacity pools."
  }
];

export function InnerCircleSection() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="relative w-full py-16 md:py-20 overflow-hidden">
      {/* Background Vectors */}
      <DraftingGrid className="opacity-[0.008]" />
      <CoordinateLabel text="REF // INNER.CIRCLE.2026" className="top-10 right-10" />
      <MarginRuler side="left" />
      <AmbientLightPool color="rgba(93, 139, 115, 0.02)" className="left-[80%] top-[40%]" />

      <div className="container max-w-[1200px] relative z-10">
        
        {/* Intro paragraph */}
        <div className="max-w-[700px] mb-16">
          <p className="font-mono text-sm text-text-secondary leading-relaxed">
            An ongoing research and analysis group built for systematic capital allocators. Inner Circle members receive priority updates on rotated sectors, regime shifts, and our operational codebase parameters.
          </p>
        </div>

        {/* Premium Membership Inclusion Checklist Layout (Notion-style) */}
        <div className="max-w-[800px] mx-auto border-t border-white/10 mb-12">
          <div className="py-3 px-4 text-white/30 text-[10px] tracking-[0.15em] font-mono uppercase border-b border-white/10">
            Included in Membership
          </div>

          {inclusionData.map((item, idx) => {
            const isRowHovered = hoveredRow === idx;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-white/5 px-4 transition-colors duration-[240ms] ease-out select-none cursor-default"
                style={{
                  backgroundColor: isRowHovered ? "rgba(93, 139, 115, 0.01)" : "transparent"
                }}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Checkmark + Title */}
                <div className="flex items-center gap-4 mb-2 sm:mb-0">
                  <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-[#5D8B73]">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </span>
                  <h3 
                    className="font-mono text-sm font-medium transition-colors duration-[240ms] ease-out"
                    style={{
                      color: isRowHovered ? "#ffffff" : "rgba(244, 241, 236, 0.85)"
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Small Description */}
                {item.description && (
                  <div className="pl-8 sm:pl-0 sm:text-right">
                    <span 
                      className="font-mono text-xs leading-relaxed transition-colors duration-[240ms] ease-out"
                      style={{
                        color: isRowHovered ? "rgba(255, 255, 255, 0.8)" : "var(--text-secondary)"
                      }}
                    >
                      {item.description}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Roadmap info note / CTA */}
        <div className="max-w-[700px] mx-auto p-8 rounded-[20px] bg-bg-card border border-white/5 text-center mb-12">
          <p className="font-mono text-xs text-text-secondary leading-relaxed">
            The Research Circle is currently in development as we scale our quantitative infrastructure. Early Learning Hub participants and advisory partners will receive priority access and capacity reservation upon launch.
          </p>
        </div>

        {/* Bottom Restrained CTA */}
        <div className="border-t border-white/5 pt-8 mt-12 flex justify-start">
          <Link 
            href="/enquire" 
            className="inline-flex items-center gap-2 font-mono text-xs md:text-sm tracking-wider transition-colors duration-200 uppercase"
            style={{ color: "#5D8B73" }}
          >
            Explore Inner Circle <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

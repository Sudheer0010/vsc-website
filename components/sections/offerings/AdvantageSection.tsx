"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { 
  DraftingGrid, 
  AmbientLightPool, 
  CoordinateLabel, 
  MarginRuler 
} from "./OfferingsBackground";

interface ServiceItem {
  id: string;
  name: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "portfolio-on-demand",
    name: "Portfolio on Demand",
    description: "Receive a portfolio built around your goals and risk profile."
  },
  {
    id: "watch-advise-protect",
    name: "Watch • Advise • Protect",
    description: "Continuous portfolio monitoring with timely advisory updates."
  },
  {
    id: "broker-independent",
    name: "Broker Independent",
    description: "Use your preferred broker and demat account."
  },
  {
    id: "personalized-screening",
    name: "Personalised Screening",
    description: "Receive investment opportunities aligned with your investment framework."
  }
];

export function AdvantageSection() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="relative w-full py-16 md:py-20 overflow-hidden">
      {/* Background Vectors */}
      <DraftingGrid className="opacity-[0.008]" />
      <CoordinateLabel text="REF // ADVISORY.SYSTEM" className="top-10 left-10" />
      <MarginRuler side="right" />
      <AmbientLightPool color="rgba(201, 168, 76, 0.02)" className="left-[15%] top-[60%]" />

      <div className="container max-w-[1200px] relative z-10">
        
        {/* Intro paragraph */}
        <div className="max-w-[700px] mb-16">
          <p className="font-mono text-sm text-text-secondary leading-relaxed">
            Disciplined portfolio guidance custom-built around your asset profiles. We emphasize outcomes over features, maintaining an absolute focus on process security, risk gate rules, and capital longevity.
          </p>
        </div>

        {/* Two-Column Editorial Grid Ledger */}
        <div className="max-w-[1000px] border-t border-white/10 mb-12">
          {servicesData.map((item, idx) => {
            const isRowHovered = hoveredRow === idx;
            return (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 items-center py-6 md:py-8 border-b border-white/10 relative transition-colors duration-[240ms] ease-out px-4 cursor-default"
                style={{
                  backgroundColor: isRowHovered ? "rgba(201, 168, 76, 0.01)" : "transparent"
                }}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Left Column: Service Name */}
                <div className="md:col-span-5 mb-2 md:mb-0">
                  <h3 
                    className="font-display text-xl transition-colors duration-[240ms] ease-out"
                    style={{
                      color: isRowHovered ? "#C9A84C" : "rgba(244, 241, 236, 0.9)"
                    }}
                  >
                    {item.name}
                  </h3>
                </div>

                {/* Right Column: Outcome Description */}
                <div className="md:col-span-7 pr-6">
                  <p 
                    className="font-mono text-xs sm:text-sm leading-relaxed transition-colors duration-[240ms] ease-out"
                    style={{
                      color: isRowHovered ? "rgba(255, 255, 255, 0.9)" : "var(--text-secondary)"
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Restrained CTA */}
        <div className="border-t border-white/5 pt-8 mt-12 flex justify-start">
          <Link 
            href="/enquire" 
            className="inline-flex items-center gap-2 font-mono text-xs md:text-sm tracking-wider transition-colors duration-200 uppercase"
            style={{ color: "#C9A84C" }}
          >
            Explore VSC Advantage <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

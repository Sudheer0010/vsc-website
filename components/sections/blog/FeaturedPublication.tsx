import React from "react";
import { MarketLetter } from "@/types/market-letter";
import { getReadingTime } from "@/lib/reading-time";

interface FeaturedPublicationProps {
  featuredLetter: MarketLetter;
  latestMonthKey: string;
  onOpenLetter: (month: string) => void;
}

export function FeaturedPublication({
  featuredLetter,
  latestMonthKey,
  onOpenLetter,
}: FeaturedPublicationProps) {
  return (
    <section className="py-12 border-t border-rule select-none animate-fade-in">
      <div className="text-ink-faint font-mono text-[10px] tracking-widest uppercase mb-6">
        FEATURED PUBLICATION
      </div>
      
      <div 
        onClick={() => onOpenLetter(latestMonthKey)}
        className="group bg-[#FFFFFF] border border-rule hover:border-accent-gold/25 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 cursor-pointer transition-all duration-[240ms]"
      >
        <div className="flex flex-col gap-3 max-w-[600px]">
          <span className="font-mono text-xs text-accent-gold/60">
            {featuredLetter.month.charAt(0) + featuredLetter.month.slice(1).toLowerCase()} {featuredLetter.year} Market Letter
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium group-hover:text-accent-gold transition-colors duration-200">
            {featuredLetter.description || "How we interpreted markets, managed risk and positioned capital."}
          </h3>
          <span className="font-mono text-xs text-ink-faint mt-1">
            Published {featuredLetter.year === 2026 && latestMonthKey === "JUL" ? "24 July 2026" : `in ${featuredLetter.month}`} • {getReadingTime(featuredLetter)} minute read
          </span>
        </div>
        
        <span className="font-mono text-xs text-accent-gold font-semibold group-hover:translate-x-1 transition-transform duration-200 sm:self-center">
          Read the letter →
        </span>
      </div>
    </section>
  );
}

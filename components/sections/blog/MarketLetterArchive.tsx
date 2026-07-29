"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MarketLetter } from "@/types/market-letter";
import { SpotlightCard } from "@/components/ui/vsc/SpotlightCard";

interface MarketLetterArchiveProps {
  sortedMonths: string[];
  marketLetters: { [key: string]: MarketLetter };
  isArchiveExpanded?: boolean;
  setIsArchiveExpanded?: (expanded: boolean) => void;
  onOpenLetter: (month: string) => void;
  archiveHeadingRef?: React.RefObject<HTMLHeadingElement | null>;
  DEFAULT_VISIBLE_LETTERS?: number;
}

export function MarketLetterArchive({
  sortedMonths,
  marketLetters,
  onOpenLetter,
  archiveHeadingRef,
}: MarketLetterArchiveProps) {
  // Extract all available years from market letters
  const years = useMemo(() => {
    const yearSet = new Set<string>();
    sortedMonths.forEach((m) => {
      const letter = marketLetters[m];
      if (letter?.year) yearSet.add(letter.year.toString());
    });
    return ["ALL", ...Array.from(yearSet).sort((a, b) => Number(b) - Number(a))];
  }, [sortedMonths, marketLetters]);

  const [activeYear, setActiveYear] = useState<string>("ALL");

  // Filter months by selected year
  const filteredMonths = useMemo(() => {
    if (activeYear === "ALL") return sortedMonths;
    return sortedMonths.filter((m) => marketLetters[m]?.year.toString() === activeYear);
  }, [sortedMonths, marketLetters, activeYear]);

  return (
    <section className="py-24 border-t border-white/5 select-none">
      {/* Header & Horizontal Year Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="max-w-[600px] text-left">
          <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block font-semibold">
            MONTHLY LOGS
          </span>
          <h2
            ref={archiveHeadingRef}
            className="font-display text-3xl md:text-[38px] text-white font-normal leading-[1.2] mb-3"
          >
            Market Letter Archive
          </h2>
          <p className="font-mono text-sm leading-relaxed text-text-secondary">
            A chronological archive of our monthly market letters documenting market observations, portfolio decisions, and lessons learned.
          </p>
        </div>

        {/* Year Category Tabs */}
        {years.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-black/40 border border-white/10 rounded-full backdrop-blur-md shrink-0">
            {years.map((yr) => {
              const isActive = activeYear === yr;
              return (
                <button
                  key={yr}
                  onClick={() => setActiveYear(yr)}
                  className={`relative px-4 py-1.5 font-mono text-xs transition-colors duration-200 rounded-full ${
                    isActive ? "text-bg-dark font-semibold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="archiveYearPill"
                      className="absolute inset-0 bg-accent-gold rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{yr === "ALL" ? "ALL YEARS" : yr}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Horizontal Cards Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredMonths.map((m) => {
            const letter = marketLetters[m];
            if (!letter) return null;
            const fullMonth = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();

            return (
              <motion.div
                key={m}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => onOpenLetter(m)}
                className="cursor-pointer"
              >
                <SpotlightCard
                  className="p-6 h-full flex flex-col justify-between hover:border-accent-gold/40 transition-all duration-300 group"
                  spotlightColor="rgba(201, 168, 76, 0.12)"
                >
                  <div className="flex flex-col gap-4">
                    {/* Top Row: Month & Year + Return Metric Tag */}
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div>
                        <span className="font-display text-xl text-white font-medium group-hover:text-accent-gold transition-colors duration-200 block">
                          {fullMonth} {letter.year}
                        </span>
                        <span className="font-mono text-[10px] text-white/40 block mt-0.5">
                          {m === "JUL" ? "24 July 2026" : `Published in ${fullMonth}`}
                        </span>
                      </div>

                      {letter.metrics?.["Monthly Return"] && (
                        <span
                          className={`font-mono text-xs px-2.5 py-1 rounded-full font-bold border shrink-0 ${
                            letter.metrics["Monthly Return"].startsWith("+")
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : letter.metrics["Monthly Return"].startsWith("-")
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : "bg-white/5 text-white/60 border-white/10"
                          }`}
                        >
                          {letter.metrics["Monthly Return"]}
                        </span>
                      )}
                    </div>

                    {/* Letter Short Description */}
                    <p className="font-mono text-xs text-text-secondary leading-relaxed line-clamp-2">
                      {letter.description}
                    </p>
                  </div>

                  {/* Read Trigger */}
                  <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-white/40">
                      {m === "JUL" ? "12" : m === "FEB" ? "10" : "8"} min read
                    </span>
                    <span className="font-mono text-xs text-accent-gold font-semibold group-hover:translate-x-1 transition-transform duration-200">
                      Read Letter &rarr;
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

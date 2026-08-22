"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MarketLetter } from "@/types/market-letter";
import { SpotlightCard } from "@/components/ui/vsc/SpotlightCard";
import { getReadingTime } from "@/lib/reading-time";
import { formatLongDate } from "@/lib/format-date";
import { letterHref } from "@/lib/letter-urls";

interface MarketLetterArchiveProps {
  sortedMonths: string[];
  marketLetters: { [key: string]: MarketLetter };
  archiveHeadingRef?: React.RefObject<HTMLHeadingElement | null>;
}

export function MarketLetterArchive({
  sortedMonths,
  marketLetters,
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
    <section className="py-24 border-t border-rule select-none">
      {/* Header & Horizontal Year Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="max-w-[600px] text-left">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-faint uppercase mb-4 block font-semibold">
            MONTHLY LOGS
          </span>
          <h1
            ref={archiveHeadingRef}
            className="font-display text-3xl md:text-[38px] text-ink font-normal leading-[1.2] mb-3"
          >
            Market Letter Archive
          </h1>
          <p className="font-mono text-sm leading-relaxed text-ink-soft">
            A chronological archive of VSC&apos;s monthly Market Letters documenting market observations, portfolio decisions, and lessons learned.
          </p>
        </div>

        {/* Year Category Tabs */}
        {years.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface border border-rule rounded-full  shrink-0">
            {years.map((yr) => {
              const isActive = activeYear === yr;
              return (
                <button
                  key={yr}
                  onClick={() => setActiveYear(yr)}
                  className={`relative px-4 py-1.5 font-mono text-xs transition-colors duration-200 rounded-full ${
                    isActive ? "text-white font-semibold" : "text-ink-muted hover:text-ink"
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
              >
                <Link href={letterHref(m)} className="block h-full">
                  <SpotlightCard
                    className="p-6 h-full flex flex-col justify-between hover:border-accent-gold/40 transition-all duration-300 group"
                    spotlightColor="rgba(15, 122, 64, 0.12)"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="border-b border-rule pb-4">
                        <span className="font-display text-xl text-ink font-medium group-hover:text-accent-gold transition-colors duration-200 block">
                          {fullMonth} {letter.year}
                        </span>
                        <span className="font-mono text-[10px] text-ink-faint block mt-0.5">
                          Letter {String(letter.letterNumber).padStart(3, "0")} · {formatLongDate(letter.publishedDate)}
                        </span>
                      </div>

                      {/* The thesis — the idea of the month, not a truncated summary */}
                      <p className="font-display text-[17px] font-normal leading-snug text-ink">
                        {letter.thesis}
                      </p>
                    </div>

                    {/* Read Trigger */}
                    <div className="pt-4 mt-6 border-t border-rule">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-ink-faint">
                          {getReadingTime(letter)} min read
                        </span>
                        <span className="font-mono text-xs text-accent-gold font-semibold group-hover:translate-x-1 transition-transform duration-200">
                          Read the letter &rarr;
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

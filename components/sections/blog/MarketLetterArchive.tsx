"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MarketLetter } from "@/types/market-letter";
import { useHydratedReducedMotion } from "@/components/ui/vsc/useHydratedReducedMotion";
import { getReadingTime } from "@/lib/reading-time";
import { letterHref } from "@/lib/letter-urls";
import { cn } from "@/lib/utils";

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
  const reduce = useHydratedReducedMotion();

  const years = useMemo(() => {
    const yearSet = new Set<string>();
    sortedMonths.forEach((m) => {
      const letter = marketLetters[m];
      if (letter?.year) yearSet.add(letter.year.toString());
    });
    return ["ALL", ...Array.from(yearSet).sort((a, b) => Number(b) - Number(a))];
  }, [sortedMonths, marketLetters]);

  const [activeYear, setActiveYear] = useState<string>("ALL");

  const filteredMonths = useMemo(() => {
    if (activeYear === "ALL") return sortedMonths;
    return sortedMonths.filter((m) => marketLetters[m]?.year.toString() === activeYear);
  }, [sortedMonths, marketLetters, activeYear]);

  return (
    <section className="border-t border-rule pb-10 pt-10 sm:pt-12 select-none">
      {/* Header & Horizontal Year Filter Tabs */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-[600px] text-left">
          <span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
            MONTHLY LOGS
          </span>
          <h1
            ref={archiveHeadingRef}
            className="mb-3 font-display text-3xl font-normal leading-[1.2] text-ink md:text-[38px]"
          >
            Market Letter Archive
          </h1>
          <p className="font-mono text-sm leading-relaxed text-ink-soft">
            A chronological archive of VSC&apos;s monthly Market Letters documenting market observations, portfolio decisions, and lessons learned.
          </p>
        </div>

        {years.length > 1 && (
          <div className="flex shrink-0 flex-wrap items-center gap-1.5 rounded-full border border-rule bg-surface p-1.5">
            {years.map((yr) => {
              const isActive = activeYear === yr;
              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setActiveYear(yr)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 font-mono text-xs transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-growth focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    isActive ? "font-semibold text-white" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="archiveYearPill"
                      className="absolute inset-0 z-0 rounded-full bg-growth"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{yr === "ALL" ? "ALL YEARS" : yr}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Cards Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {filteredMonths.map((m) => {
            const letter = marketLetters[m];
            if (!letter) return null;
            const fullMonth = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();
            const paddedNumber = String(letter.letterNumber).padStart(3, "0");

            return (
              <motion.div
                key={m}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={reduce ? { duration: 0 } : { duration: 0.18 }}
                className="h-full"
              >
                <Link
                  href={letterHref(m)}
                  className="group flex h-full flex-col rounded-vsc-lg border border-rule bg-surface p-7 transition-[border-color,box-shadow] duration-200 hover:border-growth/40 hover:shadow-lift-1"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-growth whitespace-nowrap">
                      Letter {paddedNumber}
                    </span>
                    <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-ink-faint">
                      {getReadingTime(letter)} min read
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-[21px] font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-growth-deep sm:text-[23px]">
                    {fullMonth} {letter.year}
                  </h2>

                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-muted">
                    {letter.thesis}
                  </p>

                  <div className="mt-6 border-t border-rule pt-4">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[12.5px] font-semibold text-growth">
                      Read the letter
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MarketLetter } from "@/types/market-letter";

interface MarketLetterArchiveProps {
  sortedMonths: string[];
  marketLetters: { [key: string]: MarketLetter };
  isArchiveExpanded: boolean;
  setIsArchiveExpanded: (expanded: boolean) => void;
  onOpenLetter: (month: string) => void;
  archiveHeadingRef: React.RefObject<HTMLHeadingElement | null>;
  DEFAULT_VISIBLE_LETTERS: number;
}

export function MarketLetterArchive({
  sortedMonths,
  marketLetters,
  isArchiveExpanded,
  setIsArchiveExpanded,
  onOpenLetter,
  archiveHeadingRef,
  DEFAULT_VISIBLE_LETTERS,
}: MarketLetterArchiveProps) {
  const totalLetters = sortedMonths.length;
  const shouldCollapse = totalLetters > DEFAULT_VISIBLE_LETTERS;

  // Grouping remaining letters by year dynamically
  const remainingMonths = sortedMonths.slice(DEFAULT_VISIBLE_LETTERS);
  const remainingByYear: { [year: number]: string[] } = {};
  remainingMonths.forEach((m) => {
    const letter = marketLetters[m];
    if (!letter) return;
    if (!remainingByYear[letter.year]) {
      remainingByYear[letter.year] = [];
    }
    remainingByYear[letter.year].push(m);
  });
  const remainingYears = Object.keys(remainingByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const getLetterName = (key: string | null) => {
    if (!key) return "";
    const l = marketLetters[key];
    if (!l) return "";
    return `${l.month.charAt(0) + l.month.slice(1).toLowerCase()} ${l.year}`;
  };

  return (
    <section className="py-24 border-t border-white/5 select-none animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <div className="lg:col-span-4 flex flex-col justify-start">
          <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block">
            MONTHLY LOGS
          </span>
          <h2 
            ref={archiveHeadingRef}
            className="font-display text-3xl md:text-[38px] text-white font-normal leading-[1.2] mb-4"
          >
            Market Letter Archive
          </h2>
          <p className="font-mono text-sm leading-relaxed text-text-secondary max-w-[340px]">
            A chronological archive of our monthly market letters documenting market observations, portfolio decisions and lessons learned.
          </p>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* 1. Static base list (first 6 letters) */}
          {sortedMonths.slice(0, DEFAULT_VISIBLE_LETTERS).map((m) => {
            const letter = marketLetters[m];
            if (!letter) return null;
            return (
              <div 
                key={m}
                onClick={() => onOpenLetter(m)}
                className="group flex items-center justify-between py-6 px-6 rounded-xl border border-white/5 bg-white/[0.01] hover:border-accent-gold/20 hover:bg-white/[0.02] cursor-pointer transition-all duration-[240ms] w-full"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-display text-lg text-white font-medium group-hover:text-accent-gold transition-colors duration-200">
                    {letter.month.charAt(0) + letter.month.slice(1).toLowerCase()} {letter.year}
                  </span>
                  <span className="font-mono text-[11px] text-white/40">
                    Published {letter.year === 2026 && m === "JUL" ? "24 July 2026" : `in ${letter.month}`} • {m === "JUL" ? "12" : m === "FEB" ? "10" : "8"} min read
                  </span>
                </div>
                <span className="font-mono text-xs text-accent-gold font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Read →
                </span>
              </div>
            );
          })}

          {/* 2. Expandable Stack (Grouped dynamically by year) */}
          <AnimatePresence>
            {isArchiveExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden flex flex-col gap-8"
              >
                {remainingYears.map((year) => (
                  <div key={year} className="border-t border-white/5 pt-6 mt-2 select-none">
                    <span className="font-mono text-[10px] tracking-widest text-white/30 block mb-4 uppercase font-semibold">
                      {year} ARCHIVE
                    </span>
                    
                    <div className="flex flex-col gap-4">
                      {remainingByYear[year].map((m) => {
                        const letter = marketLetters[m];
                        if (!letter) return null;
                        return (
                          <div 
                            key={m}
                            onClick={() => onOpenLetter(m)}
                            className="group flex items-center justify-between py-6 px-6 rounded-xl border border-white/5 bg-white/[0.01] hover:border-accent-gold/20 hover:bg-white/[0.02] cursor-pointer transition-all duration-[240ms] w-full"
                          >
                            <div className="flex flex-col gap-1">
                              <span className="font-display text-lg text-white font-medium group-hover:text-accent-gold transition-colors duration-200">
                                {letter.month.charAt(0) + letter.month.slice(1).toLowerCase()} {letter.year}
                              </span>
                              <span className="font-mono text-[11px] text-white/40">
                                Published in {letter.month} • {m === "FEB" ? "10" : "8"} min read
                              </span>
                            </div>
                            <span className="font-mono text-xs text-accent-gold font-medium group-hover:translate-x-1 transition-transform duration-200">
                              Read →
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Collapse trigger link at the bottom */}
                <div>
                  <button
                    onClick={() => {
                      setIsArchiveExpanded(false);
                      archiveHeadingRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-mono text-xs text-accent-gold font-medium hover:translate-x-1 transition-transform duration-200 mt-2 inline-block text-left"
                  >
                    Show Less ←
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Expand Trigger Button (Visible only when collapsed) */}
          {shouldCollapse && !isArchiveExpanded && (
            <div>
              <button
                onClick={() => setIsArchiveExpanded(true)}
                className="font-mono text-xs text-accent-gold font-medium hover:translate-x-1 transition-transform duration-200 mt-2 inline-block text-left"
              >
                View Complete Archive ({totalLetters}) →
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

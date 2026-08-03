"use client";

import React, { useEffect } from "react";
import { marketLetters } from "@/data/market-letters";
import { getReadingTime } from "@/lib/reading-time";
import { Byline } from "@/components/ui/vsc/Byline";

interface MarketLetterModalProps {
  isOpen: boolean;
  monthKey: string;
  onClose: () => void;
  onChangeMonth?: (monthKey: string) => void;
  sortedMonths?: string[];
}

export default function MarketLetterModal({
  isOpen,
  monthKey,
  onClose,
  onChangeMonth,
  sortedMonths,
}: MarketLetterModalProps) {
  const letter = marketLetters[monthKey];
  const months = sortedMonths || ["JUL", "JUN", "MAY", "APR", "MAR", "FEB", "JAN"];

  const currentIndex = months.indexOf(monthKey);
  const prevMonthKey = currentIndex < months.length - 1 ? months[currentIndex + 1] : null;
  const nextMonthKey = currentIndex > 0 ? months[currentIndex - 1] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      } else if (e.key === "ArrowLeft" && prevMonthKey && isOpen && onChangeMonth) {
        onChangeMonth(prevMonthKey);
      } else if (e.key === "ArrowRight" && nextMonthKey && isOpen && onChangeMonth) {
        onChangeMonth(nextMonthKey);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, prevMonthKey, nextMonthKey, onChangeMonth]);

  if (!isOpen || !letter) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getLetterName = (key: string | null) => {
    if (!key) return "";
    const l = marketLetters[key];
    if (!l) return "";
    return `${l.month.charAt(0) + l.month.slice(1).toLowerCase()} ${l.year}`;
  };

  return (
    <div
      className="modal-overlay active"
      id="marketLetterModal"
      onClick={handleOverlayClick}
    >
      <div className="modal-content max-w-6xl xl:max-w-7xl w-[90%] mx-auto">
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">
          &times;
        </button>
        
        <div id="marketLetterContent" className="max-w-3xl mx-auto py-4">
          
          {/* 1. Report Header */}
          <div className="market-letter-header text-center mb-12 select-none">
            <div className="font-mono text-[10px] tracking-widest text-ink-faint uppercase mb-3 font-semibold">
              RESEARCH ARCHIVE
            </div>
            <h4 className="font-display text-lg sm:text-xl italic text-accent-gold mb-2 font-normal">
              Market Letter
            </h4>
            <h2 className="font-display text-4xl sm:text-5xl text-ink font-normal mb-6 leading-none">
              {letter.month.charAt(0) + letter.month.slice(1).toLowerCase()} {letter.year}
            </h2>
            <div className="font-mono text-xs text-ink-faint">
              Published {letter.year === 2026 && monthKey === "JUL" ? "24 July 2026" : `in ${letter.month}`} • {getReadingTime(letter)} minute read • Report {months.length - currentIndex} of {months.length}
            </div>
          </div>

          {/* 2. KPI Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border-y border-rule py-8 select-none">
            {Object.keys(letter.metrics).map((key) => {
              const value = letter.metrics[key];
              const isMarketType = key === "Market Type";
              const isLoss = value.includes("-");
              
              let classNames = "font-display text-2xl sm:text-3xl font-semibold mt-3 block";
              if (isMarketType) classNames += " text-ink text-lg sm:text-xl font-normal mt-3";
              else if (isLoss) classNames += " text-loss";
              else classNames += " text-[#0F7A40]";

              return (
                <div className="text-center flex flex-col justify-between py-2" key={key}>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint font-semibold">{key}</div>
                  <div className={classNames}>{value}</div>
                </div>
              );
            })}
          </div>

          {/* 3. Narratives Flow Stack */}
          <div className="flex flex-col gap-16 text-left">
            
            {/* A. Market Environment */}
            {letter.sections["Market Environment"] && (
              <div className="flex flex-col gap-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent-gold font-semibold">
                  Market Environment
                </h3>
                <div className="w-full h-[1px] bg-canvas-sunk mb-2"></div>
                <p className="font-mono text-base sm:text-[18px] leading-[1.8] text-ink">
                  {letter.sections["Market Environment"]}
                </p>
              </div>
            )}

            {/* B. What Worked */}
            {letter.sections["What Worked"] && (
              <div className="flex flex-col gap-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent-gold font-semibold">
                  What Worked
                </h3>
                <div className="w-full h-[1px] bg-canvas-sunk mb-2"></div>
                <ul className="list-none flex flex-col gap-4 font-mono text-base sm:text-[18px] leading-[1.8] text-ink">
                  {letter.sections["What Worked"].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent-gold text-lg leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* C. Tactical Adjustment */}
            {letter.sections["Adjustment"] && (
              <div className="flex flex-col gap-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent-gold font-semibold">
                  Tactical Adjustment
                </h3>
                <div className="w-full h-[1px] bg-canvas-sunk mb-2"></div>
                <ul className="list-none flex flex-col gap-4 font-mono text-base sm:text-[18px] leading-[1.8] text-ink">
                  {letter.sections["Adjustment"].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent-gold text-lg leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* D. Looking Ahead */}
            {letter.sections["Looking Ahead"] && (
              <div className="flex flex-col gap-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent-gold font-semibold">
                  Looking Ahead
                </h3>
                <div className="w-full h-[1px] bg-canvas-sunk mb-2"></div>
                <p className="font-mono text-base sm:text-[18px] leading-[1.8] text-ink">
                  {letter.sections["Looking Ahead"]}
                </p>
              </div>
            )}

          </div>

          {/* Byline, immediately above the closing navigation — every
              letter carries the same author line (v2.2 §3). */}
          <div className="mt-16">
            <Byline variant="full" />
            <div className="mt-6 h-px w-full bg-rule" />
          </div>

          {/* 4. Previous/Next Navigation (hairline now lives on the byline
              block above, not duplicated here) */}
          <div className="pt-8 select-none">
            <span className="font-mono text-[10px] tracking-widest text-ink-faint uppercase text-center block mb-6 font-semibold">
              RESEARCH ARCHIVE
            </span>
            
            <div className="flex items-center justify-between font-mono text-xs text-accent-gold">
              <div>
                {prevMonthKey ? (
                  <button 
                    onClick={() => onChangeMonth?.(prevMonthKey)} 
                    className="hover:text-ink transition-colors duration-200"
                  >
                    ← {getLetterName(prevMonthKey)}
                  </button>
                ) : (
                  <span className="text-ink-faint">← End of Archive</span>
                )}
              </div>
              
              <div>
                {nextMonthKey ? (
                  <button 
                    onClick={() => onChangeMonth?.(nextMonthKey)} 
                    className="hover:text-ink transition-colors duration-200"
                  >
                    {getLetterName(nextMonthKey)} →
                  </button>
                ) : (
                  <span className="text-ink-faint">Latest Publication</span>
                )}
              </div>
            </div>

            {/* Subtle Keyboard Control Help Text */}
            <div className="text-center mt-12 text-ink-faint font-mono text-[9px] uppercase tracking-wider">
              Esc to close • ← → Navigate letters
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

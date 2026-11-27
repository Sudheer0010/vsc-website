import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketLetter } from "@/types/market-letter";
import { letterHref } from "@/lib/letter-urls";

interface LetterCardGridProps {
  monthKeys: string[];
  marketLetters: { [key: string]: MarketLetter };
}

/**
 * A crisp scan list of recent Market Letters inside Step 03 on /start.
 * Uses pure Daylight Growth surface tokens, >= 44px row touch targets,
 * and readable Instrument Sans labels with Geist Mono reserved for numerals.
 */
export function LetterCardGrid({ monthKeys, marketLetters }: LetterCardGridProps) {
  return (
    <ul className="divide-y divide-rule overflow-hidden rounded-vsc-lg border border-rule bg-surface">
      {monthKeys.map((key) => {
        const letter = marketLetters[key];
        if (!letter) return null;
        const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();

        return (
          <li key={key}>
            <Link
              href={letterHref(key)}
              className="group flex min-h-[56px] items-center gap-3.5 px-4 py-3.5 transition-colors duration-200 hover:bg-growth-wash/60 sm:gap-4 sm:px-5"
            >
              <span className="w-8 shrink-0 font-mono text-[13px] font-semibold tabular-nums text-growth sm:w-9">
                {String(letter.letterNumber).padStart(3, "0")}
              </span>
              <div className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-4">
                <span className="block shrink-0 text-[12.5px] font-medium text-ink-muted sm:w-28 sm:text-[13px]">
                  {monthName} <span className="font-mono tabular-nums">{letter.year}</span>
                </span>
                <span className="mt-0.5 block min-w-0 flex-1 text-[15px] font-medium leading-snug text-ink transition-colors group-hover:text-growth-deep sm:mt-0">
                  {letter.thesis}
                </span>
              </div>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-growth opacity-70 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

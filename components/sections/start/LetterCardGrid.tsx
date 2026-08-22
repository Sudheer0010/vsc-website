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
 * A compact chronological list rather than a grid of cards — each row is
 * one line (number, month, title) so five letters read as one quiet scan
 * down the page instead of five boxes competing for attention.
 */
export function LetterCardGrid({ monthKeys, marketLetters }: LetterCardGridProps) {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {monthKeys.map((key) => {
        const letter = marketLetters[key];
        if (!letter) return null;
        const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();

        return (
          <li key={key}>
            <Link
              href={letterHref(key)}
              className="group flex items-baseline gap-4 py-3.5 transition-colors duration-200"
            >
              <span className="w-9 shrink-0 font-mono text-sm font-semibold text-growth">
                {String(letter.letterNumber).padStart(3, "0")}
              </span>
              <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                {monthName} {letter.year}
              </span>
              <span className="min-w-0 flex-1 truncate text-[15px] leading-snug text-ink-soft transition-colors duration-200 group-hover:text-ink">
                {letter.thesis}
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-faint opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

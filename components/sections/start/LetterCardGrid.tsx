import React from "react";
import Link from "next/link";
import { MarketLetter } from "@/types/market-letter";
import { letterHref } from "@/lib/letter-urls";

interface LetterCardGridProps {
  monthKeys: string[];
  marketLetters: { [key: string]: MarketLetter };
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

/**
 * The visual anchor of the Start Here page — five compact cards rather
 * than the plain mono list this replaces. Minimal chrome on purpose: a
 * hairline border and a barely-off-canvas fill, so five of them in a row
 * read as one quiet unit rather than five separate boxes competing for
 * attention.
 */
export function LetterCardGrid({ monthKeys, marketLetters }: LetterCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {monthKeys.map((key) => {
        const letter = marketLetters[key];
        if (!letter) return null;
        const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();

        return (
          <Link
            key={key}
            href={letterHref(key)}
            className="group flex flex-col gap-1.5 rounded-lg border border-rule bg-canvas-sunk px-3.5 py-3 transition-colors duration-200 hover:border-growth"
          >
            <span className="font-mono text-base font-semibold text-growth">
              {String(letter.letterNumber).padStart(3, "0")}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              {monthName} {letter.year}
            </span>
            <span className="text-[13px] leading-snug text-ink-soft transition-colors duration-200 group-hover:text-ink">
              {truncate(letter.thesis, 60)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

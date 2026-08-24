import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketLetter } from "@/types/market-letter";
import { letterHref } from "@/lib/letter-urls";

interface RecentLettersProps {
  /** Month keys, most recent first — the featured letter already excluded
   *  by the caller. */
  monthKeys: string[];
  marketLetters: { [key: string]: MarketLetter };
}

/**
 * A stack of compact rows, not a card grid — the Featured Publication
 * above already carries the visual weight for this part of the page.
 */
export function RecentLetters({ monthKeys, marketLetters }: RecentLettersProps) {
  if (monthKeys.length === 0) return null;

  return (
    <div className="pb-6">
      <div className="divide-y divide-rule border-t border-rule">
        {monthKeys.map((monthKey) => {
          const letter = marketLetters[monthKey];
          if (!letter) return null;
          const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();

          return (
            <Link
              key={monthKey}
              href={letterHref(monthKey)}
              className="group flex items-center justify-between gap-4 py-4"
            >
              <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  Letter {String(letter.letterNumber).padStart(3, "0")} · {monthName} {letter.year}
                </span>
                <span className="text-[16px] font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-growth-deep">
                  {letter.thesis}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-ink-faint opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-growth group-hover:opacity-100"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

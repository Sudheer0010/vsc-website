import React from "react";
import Link from "next/link";
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
              className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-3"
            >
              <span className="shrink-0 font-mono text-xs text-ink-faint">
                Letter {String(letter.letterNumber).padStart(3, "0")} · {monthName} {letter.year}
              </span>
              <span className="text-[15px] leading-snug text-ink-soft transition-colors duration-200 group-hover:text-ink">
                {letter.thesis}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

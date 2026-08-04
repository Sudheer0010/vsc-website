import React from "react";
import Link from "next/link";
import { MarketLetter } from "@/types/market-letter";
import { getReadingTime } from "@/lib/reading-time";
import { Byline } from "@/components/ui/vsc/Byline";
import { formatLongDate } from "@/lib/format-date";
import { letterHref } from "@/lib/letter-urls";

interface FeaturedPublicationProps {
  featuredLetter: MarketLetter;
  latestMonthKey: string;
}

export function FeaturedPublication({
  featuredLetter,
  latestMonthKey,
}: FeaturedPublicationProps) {
  return (
    <section className="py-12 border-t border-rule select-none animate-fade-in">
      <div className="text-ink-faint font-mono text-[10px] tracking-widest uppercase mb-6">
        FEATURED PUBLICATION
      </div>

      <Link
        href={letterHref(latestMonthKey)}
        className="group bg-[#FFFFFF] border border-rule hover:border-accent-gold/25 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 transition-all duration-[240ms]"
      >
        <div className="flex flex-col gap-3 max-w-[600px]">
          <span className="font-mono text-xs text-accent-gold/60">
            {featuredLetter.month.charAt(0) + featuredLetter.month.slice(1).toLowerCase()} {featuredLetter.year} Market Letter
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium group-hover:text-accent-gold transition-colors duration-200">
            {featuredLetter.description || "How I interpreted markets, managed risk and positioned capital."}
          </h3>
          <span className="font-mono text-xs text-ink-faint mt-1">
            Letter {String(featuredLetter.letterNumber).padStart(3, "0")} · Published {formatLongDate(featuredLetter.publishedDate)} • {getReadingTime(featuredLetter)} minute read
          </span>
          <Byline className="mt-0.5" />
        </div>

        <span className="font-mono text-xs text-accent-gold font-semibold group-hover:translate-x-1 transition-transform duration-200 sm:self-center">
          Read the letter →
        </span>
      </Link>
    </section>
  );
}

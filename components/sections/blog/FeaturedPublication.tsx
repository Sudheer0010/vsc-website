import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketLetter } from "@/types/market-letter";
import { getReadingTime } from "@/lib/reading-time";
import { letterHref } from "@/lib/letter-urls";

interface FeaturedPublicationProps {
  featuredLetter: MarketLetter;
  latestMonthKey: string;
}

/**
 * The visual anchor of the Research page — the cover of the monthly
 * publication, not a form field. The oversized issue number sits behind
 * the copy as a low-contrast watermark (pointer-events-none, aria-hidden):
 * a design element, not a second headline competing with the real one.
 */
export function FeaturedPublication({
  featuredLetter,
  latestMonthKey,
}: FeaturedPublicationProps) {
  const monthName = featuredLetter.month.charAt(0) + featuredLetter.month.slice(1).toLowerCase();
  const excerpt = featuredLetter.pullQuote ?? featuredLetter.thesis;
  const paddedNumber = String(featuredLetter.letterNumber).padStart(3, "0");

  return (
    <section className="py-12 border-t border-rule select-none animate-fade-in">
      <Link
        href={letterHref(latestMonthKey)}
        className="group relative block overflow-hidden rounded-2xl bg-growth-tint p-8 sm:p-12"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 -right-2 z-0 select-none font-display font-bold leading-none text-growth/[0.12] sm:-right-4"
          style={{ fontSize: "220px" }}
        >
          {paddedNumber}
        </span>

        <div className="relative z-10 flex max-w-[600px] flex-col gap-5">
          <h3 className="font-display text-3xl font-medium text-ink sm:text-4xl">
            {monthName} {featuredLetter.year}
          </h3>

          <p className="font-display text-[19px] font-medium leading-snug text-ink sm:text-[21px]">
            {excerpt}
          </p>

          <span className="font-mono text-xs text-ink-faint">
            Sudheer Vobhilineni · {monthName} {featuredLetter.year} · {getReadingTime(featuredLetter)} minute read · Letter {paddedNumber}
          </span>

          <span className="inline-flex w-fit items-center gap-2 rounded-vsc-md bg-growth px-6 py-3 font-ui text-[16px] font-semibold text-white shadow-lift-growth transition-[background-color,transform] duration-200 ease-physical group-hover:-translate-y-0.5 group-hover:bg-growth-deep">
            Read the letter
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResearchNote } from "@/data/research-notes";

interface LatestInsightProps {
  note: ResearchNote;
}

/**
 * Trading Insights used to be a single quiet link wedged between two much
 * larger blocks — easy to mistake for loose text. A contained, light
 * green-tinted panel gives it its own editorial identity without reaching
 * for the dark treatment Framework Library already owns.
 *
 * "Browse all Trading Insights" is a real sibling link, not nested inside
 * the panel's own Link — anchors can't nest, and the panel itself is the
 * primary click target.
 */
export function LatestInsight({ note }: LatestInsightProps) {
  return (
    <div id="trading-insights" className="scroll-mt-24 border-t border-rule py-12">
      <h2 className="mb-3 font-display text-2xl font-normal text-ink sm:text-3xl">Trading Insights</h2>
      <p className="mb-6 max-w-[58ch] text-[16px] leading-relaxed text-ink-soft">
        Ideas from the market, distilled into something useful.
      </p>

      <Link
        href={`/research/notes/${note.slug}`}
        className="group block rounded-vsc-lg border border-growth/25 bg-growth-wash px-6 py-6 transition-[border-color,box-shadow] duration-200 hover:border-growth/45 hover:shadow-lift-1 sm:px-8 sm:py-7"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="min-w-0 sm:flex-1">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth-deep">
              Trading Insight {note.number} · {note.readingTime}
            </span>
            <h3 className="mt-2 text-[20px] font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-growth-deep sm:text-[22px]">
              {note.title}
            </h3>
            <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-ink-muted">
              {note.subtitle}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 font-mono text-[13px] font-semibold text-growth">
            Read insight
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px]"
            />
          </span>
        </div>
      </Link>

      <div className="pt-4 text-right">
        <Link
          href="/research/notes"
          className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-growth"
        >
          Browse all Trading Insights
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

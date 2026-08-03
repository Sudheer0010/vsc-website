"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { latestMonthKey, marketLetters, sortedMonths } from "@/data/market-letters";
import { getReadingTime } from "@/lib/reading-time";

/**
 * Research and candour, on one warm band.
 *
 * This used to be "Research and voices" — a real letter on the left, three
 * invented testimonials on the right (fabricated names, vague titles like
 * "Market participant," marketing-register first-person quotes nobody
 * actually talks in). A reader seven months into a track record notices
 * the absence of real testimonials before they notice fake ones — so the
 * right column now says that directly instead of performing proof it
 * doesn't have.
 *
 * The two columns are deliberately NOT styled the same way. The letter is
 * a specific, checkable artifact, so it gets a frame (a card). The candour
 * statement is closer to a confession than a product, and boxing it in the
 * same card chrome as a marketing teaser would undercut the point it's
 * making — so it sits as plain text with the site's signature mark, the
 * same treatment used for the belief statements elsewhere on the page.
 *
 * "Seven months" and "January 2026" are both computed from
 * data/market-letters.ts rather than typed in here, so this can't go
 * stale the way the old read-time numbers did once more letters exist.
 */

const latestLetter = marketLetters[latestMonthKey];
const latestLetterLabel =
  latestLetter.month.charAt(0) + latestLetter.month.slice(1).toLowerCase();

const earliestMonthKey = sortedMonths[sortedMonths.length - 1];
const earliestLetter = marketLetters[earliestMonthKey];
const earliestLetterLabel =
  earliestLetter.month.charAt(0) + earliestLetter.month.slice(1).toLowerCase();

const letterCountWords: Record<number, string> = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
};
const monthCountLabel = letterCountWords[sortedMonths.length] ?? String(sortedMonths.length);

export function ResearchDeskSection() {
  return (
    <section id="evidence" className="relative w-full border-b border-rule bg-canvas-sunk py-20 sm:py-28">
      <div className="container mx-auto max-w-[1120px]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* --- The letter ---------------------------------------------- */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">From the research desk</span>
              <h2 className="font-display text-ink">
                We don&apos;t publish news. We publish thinking.
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="mt-7">
              <Link
                href="/blog"
                className="group block rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 transition-[box-shadow,transform,border-color] duration-200 ease-physical hover:-translate-y-1 hover:border-rule-strong hover:shadow-lift-3 sm:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-3">
                  <span className="text-[14px] font-semibold text-growth">
                    Latest market letter · {latestLetterLabel} {latestLetter.year}
                  </span>
                  <span className="text-[14px] text-ink-faint">
                    {getReadingTime(latestLetter)} min read
                  </span>
                </div>

                <h3 className="mt-5 max-w-[24ch] font-display text-[26px] font-semibold leading-tight tracking-tight text-ink transition-colors duration-200 group-hover:text-growth-deep sm:text-[30px]">
                  {latestLetter.description}
                </h3>

                <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink-soft">
                  {latestLetter.sections["Market Environment"]}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-[16px] font-semibold text-growth">
                  Read the letter
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-physical group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </div>

          {/* --- The candour ----------------------------------------------
              No card, no border, no quote marks — a statement, not an
              exhibit. StepRule stands in for the signature a testimonial
              carousel would have used. */}
          <div className="lg:col-span-5">
            <Reveal delay={0.06}>
              <span className="eyebrow">Instead of testimonials</span>
              <h2 className="font-display text-ink">
                We&apos;re new, and we&apos;d rather show you the work than
                quote ourselves.
              </h2>
            </Reveal>

            <Reveal delay={0.12} className="mt-6 space-y-4">
              <p className="max-w-[46ch] text-[16px] leading-relaxed text-ink-soft">
                VSC started publishing in {earliestLetterLabel} {earliestLetter.year}.
                We don&apos;t have a decade of client stories yet, and we&apos;re
                not going to write ones that sound like us.
              </p>
              <p className="max-w-[46ch] text-[16px] leading-relaxed text-ink-soft">
                What we do have: {monthCountLabel} months of letters, every
                regime call we&apos;ve made with its date, and a process you
                can read in full before you speak to anyone.
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-7 flex items-center gap-3">
              <StepRule size="sm" className="shrink-0" />
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-[16px] font-semibold text-growth"
              >
                Read the letters
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-physical group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

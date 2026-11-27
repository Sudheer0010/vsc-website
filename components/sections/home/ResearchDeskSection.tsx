"use client";

import React from "react";
import Link from "next/link";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { researchNotes } from "@/data/research-notes";
import { letterHref } from "@/lib/letter-urls";

/**
 * Research — the "reading desk" (ported from /design-lab/home-a). Surfaces
 * the latest monthly Market Letter alongside the two most recent Research
 * Notes from the shared data sources so the homepage backs its process claim
 * with live, dated evidence.
 */

const LATEST_NOTES = researchNotes.slice(-2).reverse();
const LATEST_MONTH_KEY = sortedMonths[0];
const LATEST_LETTER = LATEST_MONTH_KEY ? marketLetters[LATEST_MONTH_KEY] : undefined;

const formatMonth = (month: string) =>
  month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

export function ResearchDeskSection() {
  return (
    <section id="evidence" className="relative w-full overflow-hidden border-b border-rule bg-surface py-24 sm:py-32">
      <div className="container mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">The reading desk</span>
            <h2 className="mt-4 font-editorial text-[clamp(1.7rem,2.85vw,2.5rem)] font-normal leading-[1.14] tracking-[-0.015em] text-ink [text-wrap:initial]">
              <span className="block text-ink-muted">We don&apos;t publish news.</span>
              <span className="mt-1 block italic text-ink">We publish thinking.</span>
            </h2>
            <p className="mt-5 max-w-[42ch] text-[16.5px] leading-[1.65] text-ink-soft">
              Research is where the work lives &mdash; how we read markets, what we learn from them, and how those ideas
              become a repeatable process.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Link
                href="/research"
                className="inline-flex min-h-[44px] items-center gap-2 border-b-2 border-growth pb-1 text-[15px] font-semibold text-ink transition-colors hover:text-growth"
              >
                Explore Research <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/letters"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-medium text-ink-muted transition-colors hover:text-growth"
              >
                Market Letters archive <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-rule">
              {LATEST_LETTER && LATEST_MONTH_KEY && (
                <Link
                  href={letterHref(LATEST_MONTH_KEY)}
                  className="group flex items-baseline justify-between gap-6 border-b border-rule py-7 no-underline"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 text-[13px] font-semibold text-growth">
                      <span>Latest Market Letter</span>
                      <span aria-hidden="true" className="text-rule-strong">&middot;</span>
                      <span className="font-mono tabular-nums text-ink-muted">
                        {formatMonth(LATEST_LETTER.month)} {LATEST_LETTER.year}
                      </span>
                    </div>
                    <h3 className="font-editorial mt-1.5 text-[23px] text-ink transition-colors group-hover:text-growth">
                      {LATEST_LETTER.thesis}
                    </h3>
                    {LATEST_LETTER.subThesis && (
                      <p className="mt-1.5 max-w-[54ch] text-[14.5px] leading-relaxed text-ink-soft">
                        {LATEST_LETTER.subThesis}
                      </p>
                    )}
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[14px] font-semibold text-growth opacity-80 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    Read &rarr;
                  </span>
                </Link>
              )}

              {LATEST_NOTES.map((note) => (
                <Link
                  key={note.slug}
                  href={`/research/notes/${note.slug}`}
                  className="group flex items-baseline justify-between gap-6 border-b border-rule py-7 no-underline"
                >
                  <div>
                    <div className="text-[13px] font-semibold text-ink-muted">Research Note</div>
                    <h3 className="font-editorial mt-1 text-[22px] text-ink transition-colors group-hover:text-growth">
                      {note.title}
                    </h3>
                    <div className="mt-1.5 max-w-[54ch] text-[14.5px] leading-relaxed text-ink-soft">
                      {note.thesis}
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[14px] font-semibold text-growth opacity-80 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    Read &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

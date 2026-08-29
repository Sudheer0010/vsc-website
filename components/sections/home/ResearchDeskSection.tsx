"use client";

import React from "react";
import Link from "next/link";
import { researchNotes } from "@/data/research-notes";

/**
 * Research — the "reading desk" (ported from /design-lab/home-a). Points at
 * Research rather than rendering it, same job as before, but the two most
 * recent notes now stand in as a plain divided list — real titles pulled
 * from `data/research-notes.ts`, not prototype-only placeholder copy — so
 * the claim "we publish thinking" is backed by an actual thing to read.
 */

const LATEST_NOTES = researchNotes.slice(-2).reverse();

export function ResearchDeskSection() {
  return (
    <section id="evidence" className="relative w-full overflow-hidden border-b border-rule bg-surface py-28 sm:py-36">
      <div className="container mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
              The reading desk
            </span>
            <h2 className="font-editorial mt-5 text-[10vw] leading-[1] text-ink sm:text-[4.6vw] lg:text-[2.8vw]">
              We don&apos;t publish news. We publish thinking.
            </h2>
            <div className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">
              Research is where the work lives — how we read markets, what we learn from them, and how those ideas
              become a process.
            </div>
            <Link
              href="/research"
              className="mt-8 inline-flex items-center gap-2 border-b-2 border-growth pb-1 text-[15px] font-semibold text-ink transition-colors hover:text-growth"
            >
              Explore Research <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {LATEST_NOTES.length > 0 && (
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="border-t border-rule">
                {LATEST_NOTES.map((note) => (
                  <Link
                    key={note.slug}
                    href={`/research/notes/${note.slug}`}
                    className="group flex items-baseline justify-between gap-6 border-b border-rule py-7 no-underline"
                  >
                    <div>
                      <h3 className="font-editorial text-[22px] text-ink transition-colors group-hover:text-growth">
                        {note.title}
                      </h3>
                      <div className="mt-1.5 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-soft">
                        {note.thesis}
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-mono text-[13px] text-growth opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      Read &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

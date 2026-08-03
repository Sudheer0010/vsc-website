"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { offeringsConfig } from "./offeringsConfig";

/**
 * A decision, not a catalogue.
 *
 * The previous version was three identical cards side by side, each with
 * the same shape and the same "Enquire Now" button, asking the reader to
 * "choose the path that fits" without giving them anything to choose on.
 * Nobody arrives already knowing which of three product names describes
 * them — so each row here opens with the reader's own sentence instead of
 * ours, then gives the one fact that actually discriminates ("best if..."),
 * then a way to check the claim without talking to anyone.
 *
 * Kept vertical on purpose: a side-by-side grid asks "which of these three
 * things is best," implying they're competitors. A stacked list reads as
 * "which of these three describes you," which is the real question, and it
 * also means only one row is being read at a time.
 *
 * The decision fields (quote, bestIf, proof) live on offeringsConfig
 * itself rather than a local array here — one record per offering, so the
 * "which offering is this" facts and the "why pick this one" facts can't
 * drift apart from each other the way price/read-time metadata did
 * elsewhere on this site.
 *
 * Two honesty notes, because this row structure can't fully deliver on
 * "nobody has to enquire to find out what they're buying" yet:
 *  - No offering has public pricing (offeringsConfig still says "To be
 *    announced" for all three) — so price is a plain statement of that
 *    fact, not a placeholder number.
 *  - Only Inner Circle has a real, checkable proof (the market letter
 *    archive). Learning Hub and Advantage point to their own curriculum/
 *    module breakdown instead of a "sample lesson" or "redacted portfolio
 *    review" — because neither of those assets exists yet.
 */
export function ThreePillarsOverview() {
  return (
    <section id="offerings-overview" className="relative w-full border-b border-rule bg-canvas py-20 sm:py-28">
      <div className="container mx-auto max-w-[880px]">
        <Reveal className="max-w-[46ch]">
          <span className="eyebrow">Three ways in</span>
          <h2 className="font-display text-ink">Start where you are.</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            These aren&apos;t tiers of the same thing — they fit different
            situations. Find the sentence that sounds like you.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 sm:mt-14">
          <div className="overflow-hidden rounded-vsc-xl border border-rule bg-surface shadow-lift-2">
            {offeringsConfig.map((row, i) => (
              <div
                key={row.slug}
                className={`p-7 sm:p-9 ${i > 0 ? "border-t border-rule" : ""}`}
              >
                <blockquote className="font-display text-[21px] font-medium leading-snug tracking-tight text-ink sm:text-[24px]">
                  &ldquo;{row.quote}&rdquo;
                </blockquote>

                <div className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <ArrowRight
                    className="h-4 w-4 shrink-0 translate-y-[3px]"
                    style={{ color: row.accentColor }}
                  />
                  <span className="font-display text-[19px] font-semibold tracking-tight text-ink">
                    {row.shortTitle}
                  </span>
                  <span className="text-[14px] text-ink-faint">
                    {row.format} · {row.availability}
                  </span>
                </div>

                <p className="mt-2.5 max-w-[56ch] text-[15.5px] leading-relaxed text-ink-soft">
                  <span className="font-semibold text-ink">Best if</span>{" "}
                  {row.bestIf}
                </p>

                <Link
                  href={row.proofHref}
                  className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-growth"
                >
                  {row.proofLabel}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-physical group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-5">
          <p className="text-[13.5px] text-ink-faint">
            None of the three are priced publicly yet — pricing is shared
            plainly once we know which one fits, not gated behind a form.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { offeringsConfig } from "@/components/sections/offerings/offeringsConfig";

/**
 * How VSC can help — Luminous Editorial (ported from /design-lab/home-a).
 * Full-width alternating rows linked directly to each offering route,
 * pulling canonical product names and availability from offeringsConfig.
 */

const VERBS = ["Learn.", "Grow.", "Connect."];

export function HowWeHelpSection() {
  return (
    <section id="fit" className="relative w-full overflow-hidden border-b border-rule bg-canvas py-24 sm:py-32">
      <div className="container mx-auto max-w-[1200px] px-6 sm:px-10">
        <Reveal>
          <span className="eyebrow">Learn. Grow. Connect.</span>
        </Reveal>

        <div className="mt-8 divide-y divide-rule border-t border-rule">
          {offeringsConfig.map((offering, i) => {
            const isFlipped = i % 2 === 1;
            const num = String(i + 1).padStart(2, "0");
            const verb = VERBS[i] ?? offering.stageLabel;

            return (
              <Reveal key={offering.slug} delay={i * 0.05}>
                <div
                  className={`grid items-center gap-6 py-10 sm:grid-cols-12 sm:gap-10 ${
                    isFlipped ? "sm:text-right" : ""
                  }`}
                >
                  <div className={`sm:col-span-3 ${isFlipped ? "sm:order-3" : ""}`}>
                    <div className={`flex flex-wrap items-center gap-2 ${isFlipped ? "sm:justify-end" : ""}`}>
                      <span className="font-mono text-[12px] tabular-nums text-ink-faint">{num}</span>
                      <span className="text-[14px] font-semibold text-growth">{offering.shortTitle}</span>
                    </div>
                    <div className="mt-1 text-[13px] text-ink-muted">{offering.availabilityShort}</div>
                  </div>

                  <h3
                    className={`font-editorial sm:col-span-4 text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.95] text-ink ${
                      isFlipped ? "sm:order-2" : ""
                    }`}
                  >
                    {verb}
                  </h3>

                  <div className={`sm:col-span-5 ${isFlipped ? "sm:order-1" : ""}`}>
                    <div className="text-[17px] font-medium leading-snug text-ink">{offering.tagline}</div>
                    <p
                      className={`mt-2 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft ${
                        isFlipped ? "sm:ml-auto" : ""
                      }`}
                    >
                      {offering.description}
                    </p>
                    <Link
                      href={offering.path}
                      className={`mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-semibold text-growth transition-colors hover:text-growth-deep ${
                        isFlipped ? "sm:justify-end" : ""
                      }`}
                    >
                      Explore {offering.shortTitle} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <Link
            href="/offerings"
            className="inline-flex min-h-[44px] items-center gap-2 border-b-2 border-growth pb-1 text-[15px] font-semibold text-ink transition-colors hover:text-growth"
          >
            Compare all offerings <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

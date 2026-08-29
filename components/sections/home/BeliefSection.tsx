"use client";

import React from "react";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * What VSC is built on — Luminous Editorial (ported from
 * /design-lab/home-a). An asymmetric rail-plus-list, not a card triptych:
 * a fixed left column states the claim, a hairline-divided stack on the
 * right carries the three principles, each led by an oversized ghost
 * numeral. Same technique as HowWeHelpSection so the two back-to-back
 * sections read as one typographic family.
 */

const SUPPORTING = [
  {
    number: "01",
    title: "Client-First Philosophy",
    shortLine: "Useful before impressive.",
    body: "Everything VSC builds should help someone make a clearer decision.",
  },
  {
    number: "02",
    title: "Research-Led Discipline",
    shortLine: "Research before action. Process before prediction.",
    body: "Evidence guides the view. Discipline guides the decision.",
  },
  {
    number: "03",
    title: "Partnership Built on Trust",
    shortLine: "Show the work. State the limits.",
    body: "Trust compounds through transparency, consistency and honest communication.",
  },
];

export function BeliefSection() {
  return (
    <section id="belief" className="relative w-full overflow-hidden border-b border-rule bg-surface py-28 sm:py-36">
      <span
        aria-hidden="true"
        className="font-editorial pointer-events-none absolute -left-10 -top-16 select-none text-[46vw] leading-none text-growth/[0.04] sm:text-[24vw]"
      >
        01
      </span>
      <div className="relative container mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
              What VSC is built on
            </span>
            <h2 className="font-editorial mt-5 text-[12vw] leading-[0.95] text-ink sm:text-[5.4vw] lg:text-[3vw]">
              Three principles. One discipline.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-rule">
              {SUPPORTING.map((item) => (
                <Reveal key={item.number}>
                  <div className="grid items-baseline gap-4 py-9 sm:grid-cols-12 sm:gap-8">
                    <span className="font-editorial sm:col-span-2 text-[15vw] leading-[0.8] text-ink/15 sm:text-[6vw]">
                      {item.number}
                    </span>
                    <div className="sm:col-span-10">
                      <h3 className="text-[21px] font-semibold tracking-tight text-ink">{item.title}</h3>
                      <div className="font-editorial mt-2 [font-style:italic] text-[17px] text-growth">
                        {item.shortLine}
                      </div>
                      <div className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink-soft">{item.body}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

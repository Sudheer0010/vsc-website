"use client";

import React from "react";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * What VSC is built on — three cards on the site's warm cream surface
 * (same bg-vsc-cream-2 token as the "Who this is for" section), using the
 * same card chrome/hover as ModuleCard and the letter cards elsewhere on
 * the site rather than inventing a new card pattern.
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
    <section id="belief" className="relative w-full border-b border-rule bg-vsc-cream-2 py-20 sm:py-28">
      <div className="container mx-auto max-w-[1120px]">
        {/* The one belief everything else is downstream of. */}
        <Reveal delay={0.05} className="mt-6">
          <h2 className="font-display text-[clamp(32px,4.5vw,56px)] font-bold leading-[0.98] tracking-[-0.03em] text-ink">
            What VSC is built on.
          </h2>
          <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed text-ink-soft">
            Three principles that should survive every stage of the business.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 sm:mt-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {SUPPORTING.map((item) => (
              <div
                key={item.title}
                className="rounded-vsc-lg border border-rule bg-surface p-7 shadow-lift-1 transition-[box-shadow,border-color,transform] duration-200 ease-physical hover:-translate-y-1 hover:border-rule-strong hover:shadow-lift-2"
              >
                <span className="font-mono text-sm font-semibold text-growth">
                  {item.number}
                </span>
                <h3 className="mt-3 font-display text-[21px] font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[15px] font-semibold text-growth">
                  {item.shortLine}
                </p>
                <p className="mt-2.5 text-[16px] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

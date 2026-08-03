"use client";

import React from "react";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";

/**
 * How I think — editorial, not carded.
 *
 * The previous version wrapped four beliefs in bordered panels behind a
 * ghosted "01" watermark. The boxes made four convictions read as four
 * product features. These are convictions, so they are set as writing:
 * one dominant, three supporting, separated by space and rules rather
 * than by containers.
 */

const SUPPORTING = [
  {
    title: "Rules before opinions",
    body: "Every position carries an exit written before the entry. A view can change what I buy. It cannot change what I risk.",
  },
  {
    title: "Patience compounds",
    body: "Sitting in cash through an unfavourable regime has a cost, and I accept it. Forced participation has a larger one.",
  },
  {
    title: "The method is never finished",
    body: "Markets change what works. Reviews are scheduled rather than triggered by pain, so the method improves on a calendar instead of after a loss.",
  },
];

export function BeliefSection() {
  return (
    <section id="belief" className="relative w-full border-b border-rule bg-canvas py-20 sm:py-28">
      <div className="container mx-auto max-w-[1120px]">
        <Reveal>
          <span className="eyebrow">How I think</span>
        </Reveal>

        {/* The one belief everything else is downstream of. */}
        <Reveal delay={0.05} className="mt-6 grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-[clamp(38px,6vw,72px)] font-bold leading-[0.96] tracking-[-0.035em] text-ink">
              Protect capital
              <br />
              <span className="text-growth">first.</span>
            </h2>
          </div>
          <div className="flex items-end md:col-span-5">
            <p className="max-w-[40ch] text-[19px] leading-relaxed text-ink-soft">
              Before asking what a position could return, I ask what it could
              cost. Surviving the bad years is the only thing that lets the
              good ones compound.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 sm:mt-20">
          <div className="grid gap-px bg-rule sm:grid-cols-3">
            {SUPPORTING.map((item) => (
              <div key={item.title} className="bg-canvas py-8 sm:px-7 sm:first:pl-0">
                <StepRule size="sm" />
                <h3 className="mt-4 font-display text-[21px] font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-[36ch] text-[16px] leading-relaxed text-ink-soft">
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

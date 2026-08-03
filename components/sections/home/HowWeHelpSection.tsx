"use client";

import React from "react";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";

/**
 * Where VSC fits.
 *
 * The old version drew a hub-and-spoke diagram with the company logo glowing
 * at the centre and arrows pointing inward. It described an org chart of the
 * firm's own importance rather than telling the reader anything.
 *
 * What a visitor actually needs here is one judgement: is this for me? So
 * the section answers that directly — who it suits, and what changes if it
 * does — and gets out of the way.
 */

const AUDIENCE = [
  "Working professionals who can't watch screens all day",
  "Business owners treating capital as a second balance sheet",
  "Self-directed investors tired of acting on tips",
  "Traders with a method but no risk discipline",
];

const OUTCOMES = [
  {
    title: "Entries and exits are decided in advance",
    body: "Both sides of the trade exist before capital moves, so no decision gets made while money is on the line.",
  },
  {
    title: "Risk per position is capped at 2%",
    body: "Sizing is derived from the stop, not from how good the idea feels that morning.",
  },
  {
    title: "Cash counts as a position",
    body: "Being out of the market is a legitimate state with its own trigger, not an admission of having no ideas.",
  },
  {
    title: "Every decision is reviewed",
    body: "Trades are graded on whether the process was followed, so a lucky win never becomes the new method.",
  },
];

export function HowWeHelpSection() {
  return (
    <section id="fit" className="relative w-full border-b border-rule bg-canvas py-20 sm:py-28">
      <div className="container mx-auto max-w-[1120px]">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Who it's for — the qualifying column. */}
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">Who this is for</span>
              <h2 className="font-display text-ink">Built for people with other jobs.</h2>
              <p className="mt-5 max-w-[40ch] text-[18px] leading-relaxed text-ink-soft">
                The framework assumes you have a life outside the market. It
                runs on a small number of scheduled decisions rather than
                constant attention.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <ul className="space-y-3">
                {AUDIENCE.map((who) => (
                  <li key={who} className="flex gap-3 text-[16px] leading-snug text-ink-soft">
                    <StepRule size="sm" className="mt-[5px] shrink-0" />
                    <span className="max-w-[34ch]">{who}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* What changes — the substantive column. */}
          <div className="md:col-span-7">
            <Reveal delay={0.06}>
              <span className="eyebrow">What changes</span>
            </Reveal>
            <div className="mt-2 grid gap-px bg-rule sm:grid-cols-2">
              {OUTCOMES.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={0.08 + i * 0.05}
                  className="bg-canvas py-7 sm:px-6 sm:first:pl-0 sm:[&:nth-child(3)]:pl-0"
                >
                  <h3 className="max-w-[26ch] font-display text-[20px] font-semibold leading-tight tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-[36ch] text-[15.5px] leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

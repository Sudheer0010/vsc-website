"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
 *
 * The audience bullets are now a persona picker. Clicking one narrows the
 * four "what changes" paragraphs to that reader specifically; clicking it
 * again (or nothing) returns to the general "any of the above" copy. State
 * is one useState<number | null> — the index of the selected persona, or
 * null for the default — kept local to this component.
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

interface Persona {
  shortName: string;
  /** Index-aligned with AUDIENCE and OUTCOMES. */
  bodies: [string, string, string, string];
}

const PERSONAS: Persona[] = [
  {
    shortName: "Working professional",
    bodies: [
      "Set your rules on Sunday. Follow them the rest of the week — no market-hours attention required.",
      "Stops are placed once and honored automatically. Your day job doesn't pay for you to watch charts.",
      "When you don't have time to research, staying in cash is a legitimate stance — not a missed opportunity.",
      "One 30-minute weekly review is the whole process. Trades and reasoning logged, patterns spotted, done.",
    ],
  },
  {
    shortName: "Business owner",
    bodies: [
      "Your capital works to a written plan while you run the business. Portfolio decisions don't compete with operating hours.",
      "Sized like a business risk — a small, known cost of learning. Not a bet-the-farm move.",
      "Holding cash is a treasury decision, not indecision. The same instinct that runs your working capital.",
      "Quarterly-quality thinking on a weekly cadence. The portfolio gets the same rigor as the P&L.",
    ],
  },
  {
    shortName: "Self-directed investor",
    bodies: [
      "Your process outlasts any single opinion — including your own on a bad day.",
      "The rule protects you from your best ideas. Conviction doesn't waive the cap.",
      "The framework says 'don't act' more often than it says 'buy.' That is the edge.",
      "You see whether your reasoning was right — separately from whether the trade paid.",
    ],
  },
  {
    shortName: "Method-first trader",
    bodies: [
      "The rule is the trigger. Not the mood, not the chart, not the tip.",
      "A hard 2% ceiling — the discipline you already know you need, made structural.",
      "No qualifying setup, no position. Learning to sit out is where the method actually starts to work.",
      "Wins with bad reasoning get flagged. Losses with correct reasoning get kept. The scoreboard is process.",
    ],
  },
];

export function HowWeHelpSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const bulletRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const persona = selected !== null ? PERSONAS[selected] : null;

  const onBulletKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    const from = bulletRefs.current.indexOf(e.target as HTMLButtonElement);
    if (from === -1) return;
    e.preventDefault();
    const delta = e.key === "ArrowDown" ? 1 : -1;
    const next = (from + delta + AUDIENCE.length) % AUDIENCE.length;
    bulletRefs.current[next]?.focus();
  };

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
              <ul className="space-y-3" onKeyDown={onBulletKeyDown}>
                {AUDIENCE.map((who, i) => {
                  const isSelected = selected === i;
                  const isDimmed = selected !== null && !isSelected;
                  return (
                    <li key={who}>
                      <button
                        ref={(el) => {
                          bulletRefs.current[i] = el;
                        }}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelected(isSelected ? null : i)}
                        className={[
                          "-ml-3 flex w-full items-start gap-3 border-l-2 bg-transparent py-0.5 pl-3 text-left text-[16px] leading-snug",
                          "transition-[opacity,color,border-color] duration-200",
                          isSelected ? "border-growth text-ink" : "border-transparent text-ink-soft",
                          isDimmed ? "opacity-60" : "opacity-100",
                        ].join(" ")}
                      >
                        <StepRule size="sm" className="mt-[5px] shrink-0" active={isSelected} />
                        <span className="max-w-[34ch]">{who}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* What changes — the substantive column. */}
          <div className="md:col-span-7">
            <Reveal delay={0.06}>
              {persona && (
                <div>
                  <span className="eyebrow">For: {persona.shortName}</span>
                </div>
              )}
              <div>
                <span className="eyebrow">What changes</span>
              </div>
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
                  <motion.p
                    key={selected === null ? "default" : selected}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: reduce ? 0 : 0.18, ease: "easeOut" }}
                    className="mt-2.5 max-w-[36ch] text-[15.5px] leading-relaxed text-ink-soft"
                  >
                    {persona ? persona.bodies[i] : item.body}
                  </motion.p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

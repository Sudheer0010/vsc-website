"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * How VSC can help — Luminous Editorial (ported from /design-lab/home-a).
 * Full-width alternating rows, not equal columns: rows mirror on odd
 * indices (text-right, column order flipped) so the sequence reads with
 * asymmetric rhythm rather than a repeated grid pattern.
 */

const VERTICALS = [
  {
    number: "01",
    label: "VSC EDUCATION",
    verb: "LEARN.",
    tagline: "Build market knowledge and develop a skill you can keep improving.",
    body: "Understand markets, trading and risk before putting serious money behind decisions.",
  },
  {
    number: "02",
    label: "VSC CAPITAL",
    verb: "GROW.",
    tagline: "Put capital to work with research and a clear process.",
    body: "Research, frameworks and disciplined decision-making for people who want to grow capital systematically.",
  },
  {
    number: "03",
    label: "VSC COMMUNITY",
    verb: "CONNECT.",
    tagline: "Get better around people who take markets seriously.",
    body: "Discuss markets, challenge ideas and keep improving with other serious participants.",
  },
];

export function HowWeHelpSection() {
  return (
    <section id="fit" className="relative w-full overflow-hidden border-b border-rule bg-canvas py-28 sm:py-36">
      <div className="container mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
            Learn. Grow. Connect.
          </span>
        </Reveal>

        <div className="mt-10 divide-y divide-rule border-t border-rule">
          {VERTICALS.map((v, i) => (
            <Reveal key={v.number} delay={i * 0.05}>
              <div
                className={`grid items-center gap-6 py-10 sm:grid-cols-12 sm:gap-10 ${
                  i % 2 === 1 ? "sm:text-right" : ""
                }`}
              >
                <div className={`sm:col-span-3 ${i % 2 === 1 ? "sm:order-3" : ""}`}>
                  <span className="font-mono text-[11px] text-ink/40">{v.number}</span>
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.1em] text-growth">
                    {v.label}
                  </span>
                </div>
                <h3
                  className={`font-editorial sm:col-span-4 text-[16vw] leading-[0.9] text-ink sm:text-[6vw] lg:text-[3.6vw] ${
                    i % 2 === 1 ? "sm:order-2" : ""
                  }`}
                >
                  {v.verb}
                </h3>
                <div className={`sm:col-span-5 ${i % 2 === 1 ? "sm:order-1" : ""}`}>
                  <div className="text-[17px] font-medium leading-snug text-ink">{v.tagline}</div>
                  <div className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-ink-soft sm:ml-auto">
                    {v.body}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12">
          <Link
            href="/offerings"
            className="inline-flex items-center gap-2 border-b-2 border-growth pb-1 text-[15px] font-semibold text-ink transition-colors hover:text-growth"
          >
            Explore all offerings <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

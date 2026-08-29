"use client";

import React from "react";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * RISK — the Cinematic Signal register, ported from Design Lab Direction B
 * (/design-lab/b, Conviction section). Same claim as before (exposure
 * should track market risk, not stay fixed), now delivered as one luminous
 * dark break rather than a light pause — it reads as the payoff of the
 * dark Five Gates section just above it, not a return to daylight.
 */
const RISK_PRINCIPLES = [
  {
    number: "01",
    title: "Trade less when the market gets weaker.",
    body: "When good opportunities are hard to find, there is no need to keep all the money in the market.",
  },
  {
    number: "02",
    title: "Cash is also a choice.",
    body: "Sometimes waiting is better than forcing a trade.",
  },
  {
    number: "03",
    title: "Protect capital first.",
    body: "A strong idea is never a reason to ignore risk.",
  },
];

export function RiskSection() {
  return (
    <section id="risk" className="relative w-full overflow-hidden bg-[#080F0B] py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 40%, rgba(63,203,116,0.28) 0%, rgba(15,122,64,0.12) 45%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 text-center sm:px-10">
        <Reveal>
          <h2 className="mx-auto max-w-[22ch] font-sans text-[11vw] font-bold leading-[0.98] tracking-[-0.03em] text-[#F4F7F4] sm:text-[6vw] lg:text-[4.4vw]">
            When markets get riskier, put <span className="text-[#3FCB74]">less money at risk</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-16">
          <div className="mx-auto grid max-w-[900px] gap-10 sm:grid-cols-3 sm:gap-8 sm:divide-x sm:divide-white/10">
            {RISK_PRINCIPLES.map((item) => (
              <div key={item.number} className="sm:px-6">
                <span className="font-mono text-sm font-semibold text-[#3FCB74]">{item.number}</span>
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-[#F4F7F4]">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/55">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

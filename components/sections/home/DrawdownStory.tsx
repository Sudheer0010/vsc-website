"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * The problem, drawn rather than tabulated — Luminous Editorial "Exhibit 01"
 * treatment (ported from /design-lab/home-a). Same schematic curves as
 * before; the change is composition, not data. A rail on the left states
 * the claim and closes on an italic line, the figure sits on the right as
 * a formal research exhibit rather than a full-width card.
 *
 * DELIBERATELY SCHEMATIC. There are no axis values and no percentages,
 * because VSC has no registered track record to claim and this is not a
 * backtest. The drawing carries the logic, not a performance promise.
 */

const ALWAYS_INVESTED =
  "M 8 206 C 60 198, 110 172, 158 150 C 182 139, 196 130, 208 124 " +
  "C 232 118, 250 130, 272 152 C 300 180, 322 214, 352 232 " +
  "C 380 246, 404 240, 430 222 C 470 194, 510 150, 560 112 C 578 99, 588 92, 594 88";

const RISK_MANAGED =
  "M 8 206 C 60 198, 110 172, 158 150 C 182 139, 196 130, 208 124 " +
  "C 224 120, 236 128, 248 138 C 258 146, 266 150, 280 151 " +
  "C 310 153, 340 152, 372 150 C 396 149, 412 146, 428 138 " +
  "C 462 120, 500 88, 540 62 C 562 48, 580 38, 594 32";

export function DrawdownStory() {
  const reduce = useReducedMotion();

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: "-15%" },
          transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <section id="problem" className="relative w-full overflow-hidden border-b border-rule bg-canvas-sunk py-28 sm:py-36">
      <div className="container mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-editorial text-[10vw] leading-[1.02] text-ink sm:text-[4.6vw] lg:text-[2.6vw]">
              Everyone looks good on the way up. The difference shows on the way down.
            </h2>
            <div className="font-editorial mt-8 max-w-[40ch] [font-style:italic] text-[18px] leading-snug text-growth">
              Seeing risk early matters only if you act on it.
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <figure className="border border-rule bg-surface p-6 sm:p-9">
                <div className="overflow-x-auto">
                  <svg
                    viewBox="0 0 602 268"
                    role="img"
                    aria-label="Two schematic capital curves. Both rise together. When market risk crosses a threshold, the always-invested curve continues down through the drawdown while the risk-managed curve flattens as exposure moves to cash, then re-enters and compounds from a higher base."
                    className="h-auto w-full min-w-[520px]"
                  >
                    <defs>
                      <linearGradient id="riskManagedFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--growth)" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="var(--growth)" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* the stretch where exposure sits in cash */}
                    <rect x="248" y="14" width="180" height="238" fill="var(--growth-wash)" />
                    <line x1="248" y1="14" x2="248" y2="252" stroke="var(--growth)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="428" y1="14" x2="428" y2="252" stroke="var(--growth)" strokeWidth="1.5" strokeDasharray="4 4" />

                    {/* baseline */}
                    <line x1="8" y1="252" x2="594" y2="252" stroke="var(--rule-strong)" strokeWidth="1" />

                    <motion.path
                      d={`${RISK_MANAGED} L 594 252 L 8 252 Z`}
                      fill="url(#riskManagedFill)"
                      stroke="none"
                      initial={reduce ? undefined : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ duration: 0.9, delay: 0.6 }}
                    />

                    <motion.path
                      d={ALWAYS_INVESTED}
                      fill="none"
                      stroke="var(--clay-bright)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      {...draw(0)}
                    />
                    <motion.path
                      d={RISK_MANAGED}
                      fill="none"
                      stroke="var(--growth)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      {...draw(0.25)}
                    />

                    <text x="256" y="30" className="fill-growth" style={{ font: "600 12px var(--font-ui)" }}>
                      Market weakens — reduce risk
                    </text>
                    <text x="256" y="46" style={{ font: "500 12px var(--font-ui)", fill: "var(--ink-muted)" }}>
                      Hold more cash here
                    </text>
                    <text x="436" y="66" style={{ font: "600 12px var(--font-ui)", fill: "var(--growth-deep)" }}>
                      Market improves — add back
                    </text>
                  </svg>
                </div>

                <figcaption className="mt-8 grid gap-8 border-t border-rule pt-6 sm:grid-cols-2">
                  <div>
                    <span className="inline-block h-[3px] w-6 rounded-full bg-clay-bright" />
                    <div className="mt-2 text-[15px] font-semibold text-ink">Stay fully invested</div>
                    <div className="mt-1 max-w-[36ch] text-[14.5px] leading-relaxed text-ink-soft">
                      The full fall is taken, so there is more ground to recover.
                    </div>
                  </div>
                  <div>
                    <span className="inline-block h-[3px] w-6 rounded-full bg-growth" />
                    <div className="mt-2 text-[15px] font-semibold text-ink">Reduce risk when the market weakens</div>
                    <div className="mt-1 max-w-[36ch] text-[14.5px] leading-relaxed text-ink-soft">
                      Move more to cash when conditions worsen. Add back when they improve.
                    </div>
                  </div>
                </figcaption>
                <p className="exhibit__caption border-t border-rule pt-4">
                  Illustration only — not a live portfolio or forecast.
                </p>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

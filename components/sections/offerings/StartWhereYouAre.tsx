"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { useHydratedReducedMotion } from "@/components/ui/vsc/useHydratedReducedMotion";
import { offeringsConfig } from "./offeringsConfig";

/**
 * The decision surface — a tablist of the real self-identifying quotes
 * from offeringsConfig; selecting one swaps a detail panel with that
 * offering's real facts (format, best-if, delivery, outcome, proof
 * link). Replaces the previous three-identical-cards grid (formerly
 * ThreePillarsOverview) with one panel deep in real data instead of
 * three cards that all shared the same template regardless of what
 * actually differs between the offerings.
 *
 * The Inner Circle panel keeps the site's one deliberate matte-black
 * inversion — its scarcity is the exclusivity signal, so it's reused
 * here rather than reinvented, and not applied to the other two.
 */

const TIER_TAB_ACTIVE: Record<string, string> = {
  open: "border-growth bg-growth-tint",
  apply: "border-ink-soft bg-canvas-sunk",
  invite: "border-growth-deep bg-growth-tint",
};

export function StartWhereYouAre() {
  const [active, setActive] = useState(0);
  const reduce = useHydratedReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const row = offeringsConfig[active];
  const isInvite = row.tier === "invite";

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: offeringsConfig.length - 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const next = (moves[e.key] + offeringsConfig.length) % offeringsConfig.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="start-where-you-are" className="relative w-full border-b border-rule bg-canvas py-24 sm:py-32">
      <div className="container mx-auto max-w-[1000px]">
        <Reveal className="max-w-[56ch]">
          <h2 className="font-display text-ink font-extrabold tracking-[-0.03em]">
            Start Where You Are
          </h2>
          <p className="mt-4 max-w-[50ch] text-[17px] leading-relaxed text-ink-soft">
            These aren&apos;t tiers of the same thing — they fit different situations. Pick the one that matches
            where you actually are right now.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 sm:mt-14">
          <div
            role="tablist"
            aria-label="Which VSC offering fits you"
            onKeyDown={onTabKeyDown}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {offeringsConfig.map((o, i) => {
              const isActive = i === active;
              // stateLabel is "01 · Open" / "02 · By application" /
              // "03 · In development" — the access fact this card states
              // as its status; split off the number so it reads as a
              // plain status word opposite the stage label.
              const status = o.stateLabel.split("·")[1]?.trim().toUpperCase() ?? "";
              return (
                <button
                  key={o.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`persona-tab-${o.slug}`}
                  aria-selected={isActive}
                  aria-controls="persona-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={[
                    "rounded-vsc-lg border p-6 text-left transition-all duration-200 ease-swift sm:p-7",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-growth/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                    isActive
                      ? [TIER_TAB_ACTIVE[o.tier], "shadow-lift-1"].join(" ")
                      : "border-rule-strong bg-surface hover:border-growth/50 hover:shadow-lift-1",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                      {o.stageLabel.toUpperCase()}
                    </span>
                    <span
                      className={[
                        "font-mono text-[10.5px] uppercase tracking-[0.08em]",
                        isActive ? "text-ink-muted" : "text-ink-faint",
                      ].join(" ")}
                    >
                      {status}
                    </span>
                  </div>

                  <p
                    className={[
                      "mt-4 font-display text-[19px] font-bold leading-tight tracking-[-0.015em]",
                      isActive ? "text-ink" : "text-ink-soft",
                    ].join(" ")}
                  >
                    {o.shortTitle}
                  </p>

                  <p
                    className={[
                      "mt-2 font-display text-[14.5px] font-medium leading-snug",
                      isActive ? "text-ink-soft" : "text-ink-muted",
                    ].join(" ")}
                  >
                    &ldquo;{o.quote}&rdquo;
                  </p>
                </button>
              );
            })}
          </div>

          {/* --- The panel ------------------------------------------------ */}
          <div
            role="tabpanel"
            id="persona-panel"
            aria-labelledby={`persona-tab-${row.slug}`}
            tabIndex={0}
            className="mt-4 overflow-hidden rounded-vsc-xl border p-7 shadow-lift-1 sm:p-10"
            style={
              isInvite
                ? { backgroundColor: "#111110", borderColor: "transparent", color: "#F2EFE6" }
                : { backgroundColor: "var(--surface-warm)", borderColor: "var(--rule)" }
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={row.slug}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-4"
                  style={{ borderColor: isInvite ? "rgba(242,239,230,.18)" : "var(--rule)" }}
                >
                  {/* Stage, not access state: the panel names where in the
                      Learn / Grow / Connect journey this offering sits, and
                      the row opposite still carries the availability fact.
                      The tab strip above keeps stateLabel, which is the
                      access fact those tabs are sorted by. */}
                  <span
                    className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: isInvite ? "#7FB999" : "var(--growth)" }}
                  >
                    {row.stageLabel}
                  </span>
                  <span
                    className="font-mono text-[12px]"
                    style={{ color: isInvite ? "rgba(242,239,230,.62)" : "var(--ink-faint)" }}
                  >
                    {row.availabilityShort}
                  </span>
                </div>

                <h3
                  className="font-display mt-6 text-[26px] font-bold leading-[1.08] tracking-[-0.025em] sm:text-[31px]"
                  style={isInvite ? { color: "#F2EFE6" } : { color: "var(--ink)" }}
                >
                  {row.shortTitle}
                </h3>
                <p
                  className="mt-2.5 font-mono text-[13.5px] leading-relaxed"
                  style={{ color: isInvite ? "rgba(242,239,230,.62)" : "var(--ink-muted)" }}
                >
                  {row.format}
                </p>

                <p
                  className="mt-6 max-w-[58ch] text-[16px] leading-relaxed"
                  style={{ color: isInvite ? "#F2EFE6" : "var(--ink-soft)" }}
                >
                  <span className="font-semibold" style={{ color: isInvite ? "#F2EFE6" : "var(--ink)" }}>
                    Best if
                  </span>{" "}
                  {row.bestIf}
                </p>

                {/* deliveryFormat/expectedOutcome are only shown for the
                    open/apply tiers. VSC Community is still in development,
                    so it has no delivery cadence to state — describing one
                    would claim a service that is not running yet. Its
                    config strings are now accurate rather than stale, but
                    they stay unrendered until the room actually opens. */}
                {!isInvite && (
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                        Delivery
                      </div>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{row.deliveryFormat}</p>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                        What to expect
                      </div>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{row.expectedOutcome}</p>
                    </div>
                  </div>
                )}

                <Link
                  href={row.proofHref}
                  className="group/link mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold"
                  style={{ color: isInvite ? "#7FB999" : "var(--growth)" }}
                >
                  {row.proofLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-physical group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-6">
          <p className="text-[13.5px] text-ink-faint">
            None of the three are priced publicly yet — pricing is shared plainly once we know which one fits, not
            gated behind a form.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

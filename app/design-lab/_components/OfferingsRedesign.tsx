"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { VSCButton } from "@/components/ui/vsc/VSCButton";
import { offeringsConfig } from "@/components/sections/offerings/offeringsConfig";

/**
 * Offerings — Cinematic Signal / Luminous Editorial.
 *
 * Same visual language as the redesigned homepage and About (ContourField
 * seed 71 in the hero, Reveal springs, StepRule, font-editorial italic
 * accent) instead of the production page's separate cream/dot-grid system.
 *
 * The old page told the three-offerings story twice — once as a diagram
 * card in the hero, once as three identical cards under "Start where you
 * are" — using different words for the same three facts each time. This
 * version tells it once: the hero states the shared philosophy and shows
 * the three entry points as a light analytical exhibit against the dark
 * ContourField, then "Start where you are" becomes the actual decision
 * surface — a tablist of the real quotes from offeringsConfig, one panel
 * deep with the real facts (format, best-if, delivery, outcome) for
 * whichever one is selected. Nothing here is invented copy; every field
 * comes from offeringsConfig, the same source of truth the production
 * page reads from.
 */

const TIER_TAB_ACTIVE: Record<string, string> = {
  open: "border-growth bg-growth-tint",
  apply: "border-ink-soft bg-canvas-sunk",
  invite: "border-growth-deep bg-growth-tint",
};

const TIER_TAB_LABEL: Record<string, string> = {
  open: "text-growth-deep",
  apply: "text-ink",
  invite: "text-growth-deep",
};

/**
 * How each offering is described in the hero exhibit — deliberately equal
 * weight (same sentence length, same register) across all three, since
 * the exhibit's whole point is "three entry points, one process," not a
 * ranked list. Kept local rather than added to offeringsConfig because
 * it's a hero-only framing, not a fact used anywhere else on the page.
 */
const ENTRY_POINT_DESC: Record<string, string> = {
  "learning-hub": "Start with the framework itself.",
  advantage: "Apply it directly to your own capital.",
  "inner-circle": "Practice it in the room with others.",
};

/**
 * Replaces the production page's concentric-rings mark, which visually
 * claimed "each ring is a deeper level of engagement" — exactly the
 * escalating-tier reading this redesign is removing. Three outer nodes at
 * identical size and stroke weight (no hierarchy among them) each lead
 * into one shared, brand-coloured core: three equal entry points into one
 * process, not three tiers of one thing.
 */
function ProcessEntryMark({ size = 140, className = "" }: { size?: number; className?: string }) {
  const nodes = [
    { cx: 22, cy: 24 },
    { cx: 50, cy: 12 },
    { cx: 78, cy: 24 },
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className={className}>
      {nodes.map((n, i) => (
        <line
          key={`line-${i}`}
          x1={n.cx}
          y1={n.cy}
          x2={50}
          y2={72}
          stroke="var(--ink-soft)"
          strokeWidth={1.5}
          strokeOpacity={0.3}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={`node-${i}`} cx={n.cx} cy={n.cy} r={7} fill="var(--canvas)" stroke="var(--ink-soft)" strokeWidth={2.5} />
      ))}
      <circle cx={50} cy={72} r={9} fill="var(--growth)" />
    </svg>
  );
}

export function OfferingsRedesign() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const row = offeringsConfig[active];
  const isInvite = row.tier === "invite";

  const scrollToDecision = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      document
        .getElementById("start-where-you-are")
        ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    },
    [reduce]
  );

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
    <main className="relative w-full bg-canvas">
      {/* ================================================================
          1. ARRIVAL — Cinematic Signal, same dark register and ContourField
          seed (71) as the homepage/About heroes. States the philosophy on
          the left; the right holds a light analytical exhibit (adapted
          from the production hero's "Exhibit 01 · Structure") that shows
          the three entry points against the dark field instead of a card
          matching the dark background — the contrast is deliberate.
         ================================================================ */}
      <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#080F0B] pb-24 pt-32 sm:pb-32 sm:pt-40">
        <ContourField seed={71} layers={3} density={10} strokeColor="#7FB999" baseOpacity={0.9} animate />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 55% at 70% 20%, rgba(63,203,116,0.20) 0%, transparent 68%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]">
                  Offerings
                </span>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-6 max-w-[18ch] font-sans text-[12vw] font-bold leading-[0.96] tracking-[-0.03em] text-[#F4F7F4] sm:text-[7vw] lg:text-[4.4vw]">
                  One discipline. Three ways to practice it.
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-8 max-w-[56ch] text-[18px] leading-relaxed text-white/60">
                  Every VSC offering builds the same systematic thinking — from foundational market education, to
                  disciplined portfolio guidance, to serious market participation. Different starting points, one
                  underlying process.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9">
                  <a
                    href="#start-where-you-are"
                    onClick={scrollToDecision}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-vsc-md bg-growth px-6 py-3 font-ui text-[16px] font-semibold tracking-[-0.01em] text-white shadow-lift-growth transition-[background-color,transform] duration-200 ease-physical hover:-translate-y-0.5 hover:bg-growth-deep"
                  >
                    See what fits <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* --- Exhibit 01 · Structure — light panel, dark field ------
                Deliberately not concentric rings: three equal nodes into
                one shared core says "entry points into a process," not
                "levels of depth." The marker colour is the same across
                all three rows for the same reason. */}
            <Reveal delay={0.16} distance={20} className="lg:col-span-5">
              <Exhibit
                number={1}
                label="Structure"
                className="mx-auto w-full max-w-[440px] rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-2 sm:p-8 lg:ml-auto lg:mr-0"
              >
                <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
                  <ProcessEntryMark size={140} className="mx-auto shrink-0 sm:mx-0" />
                  <ul className="space-y-5">
                    {offeringsConfig.map((o) => (
                      <li key={o.slug} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[5px] h-3 w-3 shrink-0 rounded-full border-2 border-ink-soft"
                        />
                        <div>
                          <div className="font-display text-[17px] font-semibold tracking-tight text-ink">
                            {o.shortTitle}
                          </div>
                          <div className="text-[14px] leading-snug text-ink-soft">{ENTRY_POINT_DESC[o.slug]}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Exhibit>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. START WHERE YOU ARE — the decision surface. A tablist of the
          real self-identifying quotes from offeringsConfig; selecting one
          swaps a detail panel with that offering's real facts (format,
          best-if, delivery, outcome, proof link). The Inner Circle panel
          keeps the site's one deliberate matte-black inversion — its
          scarcity is the exclusivity signal, so it's reused here rather
          than reinvented, and not applied to the other two.
         ================================================================ */}
      <section id="start-where-you-are" className="relative w-full border-b border-rule bg-canvas py-24 sm:py-32">
        <div className="container mx-auto max-w-[1000px]">
          <Reveal className="max-w-[50ch]">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
              Start where you are
            </span>
            <h2 className="font-display mt-5 text-ink">Choose the sentence that sounds like you.</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
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
                      "rounded-vsc-lg border p-5 text-left transition-colors duration-200 ease-swift sm:p-6",
                      isActive ? TIER_TAB_ACTIVE[o.tier] : "border-rule bg-surface hover:border-rule-strong",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "font-mono text-[11px] uppercase tracking-[0.1em]",
                        isActive ? TIER_TAB_LABEL[o.tier] : "text-ink-faint",
                      ].join(" ")}
                    >
                      {o.stateLabel}
                    </span>
                    <p
                      className={[
                        "mt-3 font-display text-[17px] font-medium leading-snug",
                        isActive ? "text-ink" : "text-ink-soft",
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
                    <span
                      className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em]"
                      style={{ color: isInvite ? "#7FB999" : "var(--growth)" }}
                    >
                      {row.stateLabel}
                    </span>
                    <span
                      className="font-mono text-[12px]"
                      style={{ color: isInvite ? "rgba(242,239,230,.62)" : "var(--ink-faint)" }}
                    >
                      {row.availabilityShort}
                    </span>
                  </div>

                  <h3
                    className="font-display mt-6 text-[26px] font-semibold tracking-tight sm:text-[30px]"
                    style={isInvite ? { color: "#F2EFE6" } : { color: "var(--ink)" }}
                  >
                    {row.shortTitle}
                  </h3>
                  <p
                    className="mt-2 font-mono text-[14px]"
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
                      open/apply tiers. Inner Circle's versions of these two
                      fields still carry the pre-v2.1 "institutional
                      membership" / "weekly letter" framing that offeringsConfig's
                      own comment says was deliberately rewritten out of the
                      quote/format/bestIf fields — surfacing them here would
                      reintroduce exactly what that rewrite removed. */}
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

      {/* ================================================================
          3. OPERATING PRINCIPLE — folded into the narrative as a dark
          editorial quote beat (About's "Clarity compounds" treatment),
          not a detached uppercase banner. Same ContourField grammar, a
          different seed — the second dark beat, not a new effect.
         ================================================================ */}
      <section className="relative w-full overflow-hidden bg-[#080F0B] py-28 sm:py-40">
        <ContourField seed={34} layers={2} density={6} strokeColor="#3FCB74" baseOpacity={0.5} animate />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 65% 60% at 50% 45%, rgba(63,203,116,0.18) 0%, transparent 72%)",
          }}
        />
        <span
          aria-hidden="true"
          className="font-editorial pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[60vw] [font-style:italic] leading-none text-white/[0.03] sm:text-[30vw]"
        >
          &rdquo;
        </span>

        <div className="relative mx-auto max-w-[900px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.01em] text-[#7FB999]">
              <span aria-hidden="true" className="h-0.5 w-[18px] shrink-0 rounded-full bg-[#7FB999]" />
              The operating principle
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-editorial mx-auto max-w-[16ch] text-[13vw] [font-style:italic] leading-[1.1] text-[#E9E4D2] sm:text-[7vw] lg:text-[4.4vw]">
              Discipline beats emotion.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-8 max-w-[46ch] text-[16px] leading-relaxed text-white/55">
              Every offering above — the curriculum, the reviews, the room — exists to put that discipline into
              practice, not just talk about it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          4. CLOSE — asymmetric, matching the homepage/About closing
          rhythm: statement large and left, action right and low, against
          the same luminous mesh wash used at the homepage's own close.
         ================================================================ */}
      <section className="relative w-full overflow-hidden py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="home-cta-mesh"
            style={{
              position: "absolute",
              inset: "-15%",
              background:
                "radial-gradient(ellipse 60% 55% at 80% 30%, rgba(15,122,64,0.14) 0%, transparent 62%)," +
                "radial-gradient(ellipse 55% 60% at 15% 80%, rgba(63,203,116,0.10) 0%, transparent 60%)",
              filter: "blur(10px)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal className="flex items-center gap-3">
                <StepRule size="md" />
                <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
                  Ready when you are
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-editorial mt-6 max-w-[14ch] text-[13vw] [font-style:italic] leading-[1.05] text-ink sm:text-[6vw] lg:text-[3.6vw]">
                  Let&apos;s find your fit.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-ink-soft">
                  No pitch and no obligation — a conversation about whether this is the right fit.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lg:col-span-4 lg:text-right">
              <VSCButton href="/enquire" variant="growth" className="min-h-[52px] px-9 text-[17px]">
                Enquire <span aria-hidden="true">&rarr;</span>
              </VSCButton>
              <div className="mt-5">
                <Link href="/faq" className="font-mono text-[13px] text-ink-muted hover:text-growth">
                  Or get your questions answered in the FAQ &rarr;
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { frameworkLibrary } from "@/data";
import { frameworkHref } from "@/lib/framework-urls";

/**
 * Framework Library — Decision Funnel (Design Lab experiment).
 *
 * The production Framework Library (see app/research/page.tsx) is a
 * numbered list — five rows that read as documentation, not as the thing
 * they actually describe: a pipeline where each stage's output is the
 * next stage's input, narrowing from the whole market down to an actual
 * trade (frameworkLibrary's own file comment calls this out explicitly).
 * This prototype makes that narrowing the visual subject instead of
 * stating it in prose.
 *
 * The funnel graphic is five stacked trapezoid bands (CSS clip-path, no
 * SVG) whose own top/bottom widths interlock — band i's bottom width
 * equals band i+1's top width — so five independent shapes read as one
 * continuous taper. It carries no numbers or invented percentages; it is
 * a shape, not a chart. The five real framework rows sit beside it as an
 * ARIA tablist (same accessible-tablist pattern already used by
 * OfferingsRedesign's "Start where you are" picker) so direct selection,
 * arrow-key navigation and the funnel's visual narrowing all describe the
 * same five stages without contradicting each other.
 *
 * Every fact rendered — title, question, description, version, link —
 * comes straight from data/frameworks.ts via the same frameworkHref()
 * helper the production page uses. Nothing here is invented copy.
 */

/**
 * Top width (percent of the funnel column) of each of the five bands.
 * Band i tapers from WIDTHS[i] down to WIDTHS[i+1] (or TERMINAL for the
 * last band) — deliberately not evenly spaced: the steepest narrowing
 * happens at Setup Grading → Sizing, where the framework library's own
 * description says the grade caps the position size, i.e. where the
 * funnel actually does the most filtering.
 */
const WIDTHS = [100, 78, 58, 34, 20];
const TERMINAL = 8;

function bandClipPath(top: number, bottom: number): string {
  const leftTop = (100 - top) / 2;
  const rightTop = 100 - leftTop;
  const leftBottom = (100 - bottom) / 2;
  const rightBottom = 100 - leftBottom;
  return `polygon(${leftTop}% 0%, ${rightTop}% 0%, ${rightBottom}% 100%, ${leftBottom}% 100%)`;
}

export function FrameworkFunnelExplorer() {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = frameworkLibrary.length;

  const goTo = useCallback((i: number) => setActive(Math.max(0, Math.min(count - 1, i))), [count]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const next = Math.max(0, Math.min(count - 1, moves[e.key]));
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const fw = frameworkLibrary[active];
  const version = fw.versions[fw.versions.length - 1];

  return (
    <section className="relative w-full overflow-hidden border-b border-vsc-dark-hairline bg-[#0E1A14] py-24 sm:py-32">
      <ContourField
        seed={34}
        layers={2}
        density={7}
        strokeColor="#3FCB74"
        baseOpacity={0.5}
        animate
        safeArea={{ x: 0.02, y: 0.1, w: 0.96, h: 0.86 }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">
        <Reveal className="max-w-[64ch]">
          <span className="mb-[18px] inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.01em] text-vsc-dark-accent">
            <span aria-hidden="true" className="h-0.5 w-[18px] shrink-0 rounded-full bg-vsc-dark-accent" />
            Timeless — what we believe
          </span>
          <h2 className="font-editorial text-[11vw] leading-[1.05] text-vsc-dark-ink [font-style:italic] sm:text-[5.5vw] lg:text-[2.8vw]">
            Framework Library
          </h2>
          <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-vsc-dark-ink-muted">
            Five questions, one decision pipeline. The opportunity set narrows at every stage until capital reaches
            an actual trade.
          </p>

          {/* Decorative reading order — the five real titles, arrows
              between them, active stage picked out. Purely an at-a-glance
              legend; the tablist below is the real control. */}
          <div
            aria-hidden="true"
            className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[12px]"
          >
            {frameworkLibrary.map((f, i) => (
              <React.Fragment key={f.slug}>
                {i > 0 && <span className="text-vsc-dark-ink-muted/50">&rarr;</span>}
                <span className={i === active ? "text-vsc-dark-accent" : "text-vsc-dark-ink-muted"}>{f.title}</span>
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        {/* ================================================================
            DESKTOP — funnel rail (graphic + tablist) beside a reading
            panel for the active stage, with Previous/Next as a second,
            linear way to move through the same five stages.
           ================================================================ */}
        <Reveal delay={0.1} className="mt-16 hidden lg:grid lg:grid-cols-12 lg:gap-12">
          <div
            role="tablist"
            aria-label="Framework pipeline stages"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="col-span-5 flex"
          >
            {/* The funnel — purely decorative; the buttons beside it carry
                the real semantics and the real click targets. */}
            <div className="flex w-[120px] shrink-0 flex-col" aria-hidden="true">
              {frameworkLibrary.map((_, i) => {
                const top = WIDTHS[i];
                const bottom = i === count - 1 ? TERMINAL : WIDTHS[i + 1];
                const isActive = i === active;
                return (
                  <div key={i} className="relative h-[72px] w-full">
                    <div
                      className="absolute inset-0 transition-[background-color,opacity] duration-300 ease-physical"
                      style={{
                        clipPath: bandClipPath(top, bottom),
                        background: isActive
                          ? "linear-gradient(180deg, #3FCB74 0%, #0B6435 100%)"
                          : "rgba(233,228,210,0.08)",
                        boxShadow: isActive ? "none" : "inset 0 0 0 1px rgba(233,228,210,0.14)",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Stage rows — the real tabs. */}
            <div className="flex flex-1 flex-col pl-6">
              {frameworkLibrary.map((f, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={f.slug}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`fw-tab-${f.slug}`}
                    aria-selected={isActive}
                    aria-controls="fw-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    className="flex h-[72px] cursor-pointer flex-col items-start justify-center border-b border-vsc-dark-hairline text-left transition-colors duration-200 last:border-b-0"
                  >
                    <span
                      className={`font-mono text-[11px] tracking-[0.08em] ${isActive ? "text-vsc-dark-accent" : "text-vsc-dark-ink-muted"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-1 font-display text-[16px] font-semibold leading-snug transition-colors duration-200 ${isActive ? "text-white" : "text-vsc-dark-ink-muted hover:text-vsc-dark-ink"}`}
                    >
                      {f.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reading panel — the active stage's real facts. */}
          <div className="col-span-7">
            <div
              role="tabpanel"
              id="fw-panel"
              aria-labelledby={`fw-tab-${fw.slug}`}
              tabIndex={0}
              className="h-full rounded-vsc-xl border border-vsc-dark-hairline bg-white/[0.03] p-8 sm:p-10"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={fw.slug}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-vsc-dark-hairline pb-4">
                    <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-vsc-dark-accent">
                      Stage {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                    </span>
                    {version && (
                      <span className="font-mono text-[12px] text-vsc-dark-ink-muted">v{version.version}</span>
                    )}
                  </div>

                  <h3 className="font-display mt-6 text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
                    {fw.title}
                  </h3>

                  <p className="font-editorial mt-3 text-[19px] leading-snug text-vsc-dark-accent [font-style:italic]">
                    {fw.question}
                  </p>

                  <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-vsc-dark-ink-muted">{fw.desc}</p>

                  {version?.changeNote && (
                    <p className="mt-5 max-w-[54ch] text-[13.5px] leading-relaxed text-vsc-dark-ink-muted/75">
                      <span className="font-semibold text-vsc-dark-ink-muted">v{version.version}</span> &middot;{" "}
                      {version.changeNote}
                    </p>
                  )}

                  <Link
                    href={frameworkHref(fw)}
                    className="group/link mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-vsc-dark-accent transition-colors duration-200 hover:text-white"
                  >
                    Open the framework
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-physical group-hover/link:translate-x-1" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-between border-t border-vsc-dark-hairline pt-6">
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  disabled={active === 0}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-sm text-vsc-dark-accent transition-colors duration-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-vsc-dark-accent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <span className="font-mono text-[12px] text-vsc-dark-ink-muted">
                  {active + 1} of {count}
                </span>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  disabled={active === count - 1}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-sm text-vsc-dark-accent transition-colors duration-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-vsc-dark-accent"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================================================================
            MOBILE — a clean vertical accordion. Same five real stages,
            no funnel graphic (it has nothing left to compare against at
            this width), one stage open at a time.
           ================================================================ */}
        <div className="mt-14 lg:hidden">
          {frameworkLibrary.map((f, i) => {
            const isOpen = openIndex === i;
            const v = f.versions[f.versions.length - 1];
            return (
              <div key={f.slug} className="border-b border-vsc-dark-hairline first:border-t">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`fw-acc-${f.slug}`}
                  className="flex min-h-[56px] w-full cursor-pointer items-center gap-4 py-4 text-left"
                >
                  <span className="font-mono text-[12px] text-vsc-dark-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-[17px] font-semibold text-white">{f.title}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 text-vsc-dark-ink-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`fw-acc-${f.slug}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-9">
                        <p className="font-editorial text-[16px] leading-snug text-vsc-dark-accent [font-style:italic]">
                          {f.question}
                        </p>
                        <p className="mt-3 text-[14.5px] leading-relaxed text-vsc-dark-ink-muted">{f.desc}</p>
                        {v && (
                          <p className="mt-3 font-mono text-[12px] text-vsc-dark-ink-muted">
                            v{v.version} &middot; {v.changeNote}
                          </p>
                        )}
                        <Link
                          href={frameworkHref(f)}
                          className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-semibold text-vsc-dark-accent"
                        >
                          Open the framework
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

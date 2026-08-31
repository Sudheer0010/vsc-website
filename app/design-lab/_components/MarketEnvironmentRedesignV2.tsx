"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Byline } from "@/components/ui/vsc/Byline";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { formatLongDate } from "@/lib/format-date";
import {
  SubScoringExhibit,
  BreadthZonesExhibit,
  ExposureLadderExhibit,
  type SubScoringColumn,
} from "@/components/sections/frameworks/MarketEnvironmentExhibits";

/**
 * DESIGN LAB PROTOTYPE v2 — not wired into production. The typography-first
 * reading system approved on a deliberately small slice (identity, intro
 * methodology, "01 Trend") applied here to the complete article. v1
 * (/design-lab/framework-market-environment) was rejected for retaining the
 * old shape: a narrow centered column, rounded cards, and a cosmetic dark
 * rectangle as the only structural device. Nothing about the approved
 * system — the running rail, AnnotatedBlock margin glosses, GhostNumeral
 * factor openers, rule-based exhibit chrome — is redesigned here; it's
 * extended.
 *
 * Every sentence, heading, table value and diagram datum below is copied
 * verbatim, in original order, from components/sections/frameworks/
 * MarketEnvironmentFramework.tsx and MarketEnvironmentExhibits.tsx. The
 * margin glosses, exhibit numerals and "Factor NN of 3 scored" tags are new
 * UI chrome — short structural tags, not paraphrases of framework content.
 */

const PUBLISHED_DATE = "2026-08-05";

const TREND_COLUMNS: SubScoringColumn[] = [
  { heading: "Structure", positive: "HH/HL", neutral: "Range-bound", negative: "LL/LH" },
  { heading: "Location", positive: "Above both MAs", neutral: "Above one", negative: "Below both" },
  { heading: "Slope", positive: "50 DMA rising", neutral: "Flattening", negative: "Falling" },
];

const LEADERSHIP_COLUMNS: SubScoringColumn[] = [
  { heading: "Breakout Success", positive: ">60% hold", neutral: "40–60%", negative: "<40% hold" },
  { heading: "New High Expansion", positive: "Expanding", neutral: "Steady", negative: "Contracting" },
  { heading: "Sector Participation", positive: "5+ sectors", neutral: "3–4 sectors", negative: "1–2 sectors" },
];

const BREADTH_ROWS: { label: string; color: string; text: string }[] = [
  { label: "Positive", color: "var(--growth)", text: ">60% above 50 DMA · A/D expanding · highs > lows" },
  { label: "Neutral", color: "var(--ink-faint)", text: "40–60% · A/D flat · highs ≈ lows" },
  { label: "Negative", color: "var(--clay)", text: "<40% · A/D contracting · lows dominating" },
];

const OTHER_STAGES = [
  { name: "Opportunity Universe", href: "/frameworks/opportunity-universe" },
  { name: "Setup Grading", href: "/frameworks/setup-grading" },
  { name: "Sizing", href: "/frameworks/sizing" },
  { name: "Trade Management", href: "/frameworks/trade-management" },
] as const;

const SECTIONS = [
  { n: "00", id: "identity", label: "Identity" },
  { n: "01", id: "method", label: "Method" },
  { n: "02", id: "trend", label: "Trend" },
  { n: "03", id: "breadth", label: "Breadth" },
  { n: "04", id: "leadership", label: "Leadership" },
  { n: "05", id: "exposure", label: "Exposure" },
  { n: "06", id: "example-reading", label: "Example" },
  { n: "07", id: "thinking", label: "Reasoning" },
  { n: "08", id: "not-this", label: "Not this" },
  { n: "09", id: "feeds", label: "Feeds 02" },
  { n: "10", id: "does-not", label: "Scope" },
  { n: "11", id: "revision", label: "Revisions" },
] as const;

/** Same IntersectionObserver scrollspy pattern used elsewhere on the site
 *  (ResearchRedesign, FAQKnowledgeDesk) — the mechanism isn't what v1 was
 *  rejected for, only its dot-and-hover presentation was. */
function useActiveSection(): string {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * A running folio, not a documentation sidebar: a rotated spine label (the
 * kind printed on a book's edge or an annual report's margin) plus a plain
 * numbered list of the three sections present in this slice — no pills, no
 * dot-hover reveal. Fixed to the viewport edge (not sticky-in-grid) so a
 * later full build can keep it as sections change background treatment
 * without needing an unbroken single grid.
 */
function RunningRail() {
  const active = useActiveSection();
  return (
    <nav
      aria-label="Framework reading position"
      className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-start gap-10 xl:flex"
    >
      <span
        className="select-none whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-faint"
        style={{ writingMode: "vertical-rl" }}
      >
        Market Environment — Framework 01
      </span>

      <ol className="flex flex-col gap-3 border-l border-rule pl-4">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-200 ${
                  isActive ? "font-semibold text-ink" : "text-ink-faint hover:text-ink-muted"
                }`}
              >
                <span className={isActive ? "text-growth" : ""}>{s.n}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Pairs a short margin gloss with its content on the same grid row — the
 * marginal-index-term convention from academic and legal typesetting, used
 * here instead of v1's inline bordered callout box. `span` widens the
 * content column for the one block (the exhibit) that's allowed to break
 * out of the reading measure.
 */
function AnnotatedBlock({
  gloss,
  span = 7,
  children,
}: {
  gloss?: string;
  span?: 7 | 10;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
      <div className="hidden lg:col-span-2 lg:block">
        {gloss && (
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {gloss}
          </span>
        )}
      </div>
      <div className={span === 10 ? "lg:col-span-10 lg:col-start-3" : "lg:col-span-7 lg:col-start-3"}>
        {children}
      </div>
    </div>
  );
}

/**
 * The exhibit SVG renders at a fixed viewBox and scales to its container's
 * full width, which on a narrow phone shrinks every label to illegible
 * text. Scrolling it at natural size instead (same fix used in v1) beats
 * shrinking it into illegibility.
 */
function ExhibitScroll({ minWidth, children }: { minWidth: number; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth }}>{children}</div>
    </div>
  );
}

/**
 * A large outlined numeral bleeding behind the section opening — the
 * replacement for v1's full-bleed dark rectangle. It's structural
 * decoration integrated into the composition (aria-hidden, stroke only, no
 * fill), not a block the reader has to scroll past.
 */
function GhostNumeral({ children }: { children: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -left-2 -top-8 select-none font-display font-bold leading-none text-transparent sm:-left-6 sm:-top-16 lg:-top-20"
      style={{
        // A floor of 140px let the glyph's ink (a digit's curve overshoots
        // its nominal line-box) reach down into a two-line wrapped heading
        // on narrow screens — e.g. "Leadership Quality" — and read as a
        // stray underline. A lower floor keeps clearance at every width.
        fontSize: "clamp(84px, 22vw, 360px)",
        WebkitTextStroke: "1.5px var(--rule-strong)",
      }}
    >
      {children}
    </span>
  );
}

/**
 * The v1 "provisional" callout was a rounded, tinted box. Same role here —
 * a methodological aside that needs to read as distinct from body prose —
 * built from a rule instead of a background fill, consistent with the v2
 * rule that hierarchy comes from typography and rules, not surface colour.
 */
function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-ink pl-6">
      <p className="font-mono text-[13px] leading-relaxed text-ink-muted">{children}</p>
    </div>
  );
}

/**
 * The "Example reading" payoff, replacing v1's paper-toned card with the
 * same typographic-readout language as the rest of v2: a heavy top rule, a
 * large display figure for the verdict itself (colour used as the signal
 * it already is sitewide — positive/negative — not as page background),
 * and a plain rule-divided list for the per-factor detail.
 */
function VerdictReadout() {
  const checks: { factor: string; verdict: string }[] = [
    { factor: "Trend", verdict: "Positive" },
    { factor: "Breadth", verdict: "Positive" },
    { factor: "Leadership", verdict: "Positive" },
  ];

  return (
    <div className="border-t-2 border-ink pt-8">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
        Example reading
      </span>
      <div
        className="mt-4 font-display font-bold text-growth"
        style={{ fontSize: "clamp(56px, 9vw, 140px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
      >
        Aggressive
      </div>
      <div className="mt-8 flex flex-col divide-y divide-rule border-t border-rule font-mono text-[14px]">
        <div className="flex items-baseline justify-between py-3">
          <span className="text-ink-muted">Maximum exposure</span>
          <span className="font-semibold text-ink">80–100%</span>
        </div>
        {checks.map((c) => (
          <div key={c.factor} className="flex items-baseline justify-between py-3">
            <span className="text-ink-muted">{c.factor}</span>
            <span className="flex items-center gap-1.5 font-semibold text-growth">
              {c.verdict}
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-rule pt-5 font-mono text-[13px] text-ink-muted">
        3 of 3 factors positive.
      </p>
    </div>
  );
}

export function MarketEnvironmentRedesignV2() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-canvas text-ink">
      <ReadingProgress />
      <RunningRail />

      {/* xl:pl-56 (not lg:px-20 symmetrically) reserves clearance for the
          fixed RunningRail, which only appears at xl+ — without it the
          rail's section list and the grid's own margin-gloss column
          occupy the same horizontal band and visually collide. */}
      <div className="mx-auto max-w-[1680px] px-6 pb-40 pt-32 sm:px-10 lg:px-20 lg:pt-40 xl:pl-56 xl:pr-20">
        {/* ================================================================
            00 — IDENTITY. The title is the one element allowed to break
            the grid entirely (full width, cols 1–12); everything else
            settles into the cols 3–9 reading measure directly below it —
            the asymmetric masthead/body relationship an annual report or
            report cover uses, not a centered hero.
           ================================================================ */}
        <header id="identity" className="mb-32">
          <Link
            href="/research#framework-library"
            className="group mb-16 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Research
          </Link>

          <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-growth">
            Framework 01 · Market Environment
          </span>

          <h1
            className="mt-5 font-display font-bold text-ink"
            style={{
              fontSize: "clamp(48px, 10vw, 132px)",
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
            }}
          >
            Market Environment
          </h1>

          {/* Mobile-only fallback for the metadata that otherwise lives in
              the lg+ margin column below — same facts, inline instead of
              in a side rail since there's no margin to spare at this width. */}
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-ink-muted lg:hidden">
            <span>v1.0</span>
            <span aria-hidden="true">·</span>
            <span>{formatLongDate(PUBLISHED_DATE)}</span>
            <span aria-hidden="true">·</span>
            <span>Excerpt · ~3 min</span>
            <span aria-hidden="true">·</span>
            <Byline variant="compact" />
          </div>

          <div className="mt-10 lg:mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
              <div className="hidden lg:col-span-2 lg:flex lg:flex-col lg:gap-2.5">
                <span className="font-mono text-[11px] text-ink-muted">v1.0</span>
                <span className="font-mono text-[11px] text-ink-muted">{formatLongDate(PUBLISHED_DATE)}</span>
                <span className="font-mono text-[11px] text-ink-muted">Excerpt · ~3 min</span>
                <Byline variant="full" className="mt-2" />
              </div>

              <div className="lg:col-span-7 lg:col-start-3">
                <p
                  className="font-editorial text-ink"
                  style={{ fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.18, letterSpacing: "-0.01em" }}
                >
                  The market decides
                  <br />
                  how aggressive you are
                  <br />
                  allowed to be.
                </p>

                <p className="mt-8 text-[19px] leading-relaxed text-ink-faint">Everything else comes later.</p>

                <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-rule pt-6 font-mono text-[13px] leading-relaxed text-ink-muted">
                  {OTHER_STAGES.map((stage, i) => (
                    <span key={stage.name} className="flex items-center gap-2">
                      {i > 0 && <span aria-hidden="true">·</span>}
                      <Link href={stage.href} className="text-ink-soft underline decoration-rule-strong underline-offset-4 transition-colors hover:text-growth hover:decoration-growth">
                        {stage.name}
                      </Link>
                    </span>
                  ))}
                  <span>— all depend on this first decision.</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================
            01 — METHOD. Plain reading measure, margin glosses standing in
            for what v1 handled with a bordered "provisional" callout box.
           ================================================================ */}
        <section id="method" className="mb-32 flex flex-col gap-10">
          <AnnotatedBlock gloss="The question">
            <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
              <p>
                Every weekend I ask one question: if I had fresh capital on Monday, how
                aggressively would I want to deploy it?
              </p>
              <p>
                The answer is never based on a single chart. It comes from trend,
                breadth, and leadership working together. This framework exists to
                make that decision systematic.
              </p>
            </div>
          </AnnotatedBlock>

          <AnnotatedBlock gloss="Weighting">
            <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
              <p>
                Three factors. Each is classified Positive, Neutral, or Negative. No
                weights — each factor counts equally. The count of Positive factors
                sets the environment.
              </p>
              <p>
                <strong className="font-semibold text-ink">Why no weights.</strong>{" "}
                Assigning weights — Trend = 30%, Breadth = 25% — would imply that one
                factor has been shown to carry more information than another. That
                hasn&apos;t been tested. Neither Weinstein nor O&apos;Neil arrived at
                weights through published research. Equal weighting is the honest
                starting point.
              </p>
              <p>
                After 12–24 months of scored readings alongside actual results, the
                data may justify weighting. Until then, each factor counts as one.
              </p>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            02 — 01 TREND. The section this prototype exists to test: the
            factor number is a large stroked-outline numeral integrated
            into the composition (bleeding behind the heading), not a
            full-bleed dark block. Hierarchy comes from rule weight, scale
            and whitespace — no background-colour shift anywhere here.
           ================================================================ */}
        <section id="trend" className="relative">
          <GhostNumeral>01</GhostNumeral>

          <AnnotatedBlock gloss="Section 01">
            <div className="relative border-t-2 border-ink pt-6">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Factor 01 of 3 scored
              </span>
              <h2
                className="mt-3 font-display font-bold text-ink"
                style={{ fontSize: "clamp(56px, 8vw, 108px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}
              >
                Trend
              </h2>
              <p className="font-editorial mt-4 text-ink-soft" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.3 }}>
                Is the market structurally healthy?
              </p>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-14">
            <AnnotatedBlock>
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                I score Trend across three sub-dimensions — Structure, Location, and
                Slope. Each is classified independently, and the overall reading is
                majority: two out of three.
              </p>
            </AnnotatedBlock>

            {/* The one exhibit this slice tests — breaks out to a 10-column
                span (well past the ~65ch prose measure), minimal chrome: a
                heavy top rule and a mono figure number, no card, no border
                box, no background tint. */}
            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 03 — Scoring Trend
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={780}>
                      <SubScoringExhibit
                        columns={TREND_COLUMNS}
                        resolverLines={[
                          "2 OR 3 POSITIVE → TREND IS POSITIVE",
                          "2 OR 3 NEGATIVE → TREND IS NEGATIVE",
                          "Anything else → Neutral",
                        ]}
                        titleId="trend-scoring-v2"
                        title="Scoring Trend across three sub-dimensions."
                        desc="Structure, Location, and Slope are each classified Positive, Neutral, or Negative, then resolved by majority: two or three positive makes Trend positive, two or three negative makes Trend negative, and anything else makes Trend neutral."
                      />
                    </ExhibitScroll>
                  </div>
                </figure>

                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">03</span>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Reading">
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                <strong className="font-semibold text-ink">What this tells us:</strong>{" "}
                Trend is healthy when at least two of Structure, Location, and Slope
                agree — not from any single signal alone.
              </p>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Resolution logic">
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  <strong className="font-semibold text-ink">Positive:</strong> 2 or 3
                  sub-dimensions positive. <strong className="font-semibold text-ink">Negative:</strong>{" "}
                  2 or 3 negative. Otherwise Neutral.
                </p>
                <p>
                  This eliminates interpretation. A market above both MAs but range-bound
                  with a flattening slope scores Location positive, Structure neutral,
                  Slope neutral — overall Neutral. Not Positive. The structure resolves
                  the ambiguity, not the analyst.
                </p>
              </div>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            03 — BREADTH. Same factor-opening pattern as Trend: ghost
            numeral, "Section 02" gloss, Factor progress tag.
           ================================================================ */}
        <section id="breadth" className="relative mt-32">
          <GhostNumeral>02</GhostNumeral>

          <AnnotatedBlock gloss="Section 02">
            <div className="relative border-t-2 border-ink pt-6">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Factor 02 of 3 scored
              </span>
              <h2
                className="mt-3 font-display font-bold text-ink"
                style={{ fontSize: "clamp(56px, 8vw, 108px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}
              >
                Breadth
              </h2>
              <p className="font-editorial mt-4 text-ink-soft" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.3 }}>
                How many stocks are participating?
              </p>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-14">
            <AnnotatedBlock>
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                I look at the percentage of Nifty 500 stocks above their 50 DMA and 200
                DMA, the advance/decline ratio, and new 52-week highs versus lows.
              </p>
            </AnnotatedBlock>

            {/* Breadth zones — a single-reading bar, not a sub-scorer, kept
                to the same wide-breakout / heavy-rule chrome as Exhibit 03. */}
            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 04 — Breadth zones
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={700}>
                      <BreadthZonesExhibit />
                    </ExhibitScroll>
                  </div>
                </figure>

                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">04</span>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Reading">
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                <strong className="font-semibold text-ink">What this tells us:</strong>{" "}
                Breadth shows whether a rally is broad or narrow, and it can shift
                before the index itself does.
              </p>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Zones">
              <div className="border-t-2 border-ink">
                {BREADTH_ROWS.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6 ${
                      i > 0 ? "border-t border-rule" : ""
                    }`}
                  >
                    <span className="w-20 shrink-0 font-mono text-[13px] font-semibold" style={{ color: row.color }}>
                      {row.label}
                    </span>
                    <span className="font-mono text-[13px] text-ink">{row.text}</span>
                  </div>
                ))}
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock>
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                Breadth often deteriorates before the index does. The Nifty can hold
                above its moving averages while participation narrows underneath. This
                factor catches that divergence.
              </p>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Provisional">
              <Note>
                <strong className="font-semibold">Provisional.</strong> The 60% and 40%
                boundaries are drawn from published breadth research and observed
                behaviour — studies commonly cite &gt;60–70% as broad participation and
                &lt;35–40% as weak. These thresholds remain provisional until tested
                against NSE historical data. If calibration changes them, this page
                will be updated with a version note recording the old values, the new
                values, and the evidence.
              </Note>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            04 — LEADERSHIP QUALITY.
           ================================================================ */}
        <section id="leadership" className="relative mt-32">
          <GhostNumeral>03</GhostNumeral>

          <AnnotatedBlock gloss="Section 03">
            <div className="relative border-t-2 border-ink pt-6">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                Factor 03 of 3 scored
              </span>
              <h2
                className="mt-3 font-display font-bold text-ink"
                style={{ fontSize: "clamp(48px, 7.5vw, 100px)", lineHeight: 0.94, letterSpacing: "-0.03em" }}
              >
                Leadership Quality
              </h2>
              <p className="font-editorial mt-4 text-ink-soft" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.3 }}>
                Are opportunities actually working?
              </p>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-14">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  This is the factor that matters most for how I actually trade. If
                  setups are working, the market is healthy — regardless of what the
                  index says. If setups are consistently failing, the environment has
                  shifted.
                </p>
                <p>I score it across three sub-metrics, same 2-of-3 structure as Trend.</p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 05 — Scoring Leadership Quality
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={780}>
                      <SubScoringExhibit
                        columns={LEADERSHIP_COLUMNS}
                        resolverLines={[
                          "2 OR 3 POSITIVE → POSITIVE",
                          "2 OR 3 NEGATIVE → NEGATIVE",
                          "Anything else → Neutral",
                        ]}
                        titleId="leadership-scoring-v2"
                        title="Scoring Leadership Quality across three sub-metrics."
                        desc="Breakout Success, New High Expansion, and Sector Participation are each classified Positive, Neutral, or Negative, then resolved by majority: two or three positive makes the factor positive, two or three negative makes it negative, and anything else makes it neutral."
                      />
                    </ExhibitScroll>
                  </div>
                </figure>

                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">05</span>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Reading">
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                <strong className="font-semibold text-ink">What this tells us:</strong>{" "}
                When real setups keep working, the market is supporting risk-taking;
                when they keep failing, that support has faded.
              </p>
            </AnnotatedBlock>

            <AnnotatedBlock>
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                A rally driven by three stocks looks like leadership. A rally driven by
                eight sectors <em>is</em> leadership. Keeping sector count as a visible
                sub-metric prevents narrow concentration from being missed.
              </p>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Provisional">
              <Note>
                <strong className="font-semibold">Provisional.</strong> The
                success-rate and sector-count boundaries are initial estimates. A
                framework must have numbers to be falsifiable — without them, there is
                no way to tell whether the framework worked or whether I changed my
                interpretation after the fact. These will be calibrated and updated in
                the revision history.
              </Note>
            </AnnotatedBlock>

            <AnnotatedBlock>
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                The test any factor must pass: can I calculate this every week without
                relying on someone else&apos;s commentary? If not, it doesn&apos;t
                belong here. All three sub-metrics are directly observable from price
                data and a scanner.
              </p>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            05 — EXPOSURE. Not a numbered factor — no ghost numeral — this is
            the synthesis exhibit the three factors feed into.
           ================================================================ */}
        <section id="exposure" className="mt-32 flex flex-col gap-14">
          <AnnotatedBlock span={10} gloss="Output">
            <figure>
              <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                  Exhibit 06 — Exposure ladder
                </figcaption>
              </div>
              <div className="mt-8">
                <ExhibitScroll minWidth={700}>
                  <ExposureLadderExhibit />
                </ExhibitScroll>
              </div>
              <p
                className="font-editorial mt-8 text-center text-ink"
                style={{ fontSize: "clamp(22px, 2.6vw, 32px)", fontStyle: "italic" }}
              >
                Exposure is a ceiling, not a target.
              </p>
            </figure>
          </AnnotatedBlock>

          <AnnotatedBlock gloss="Reading">
            <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
              <p>
                Aggressive does not mean fully invested. Defensive does not mean zero
                positions.
              </p>
              <p>
                The exposure cap is a ceiling, not a target. In an Aggressive
                environment I <em>can</em> deploy up to 80–100% — but only if enough A
                and A+ setups present themselves through the rest of the pipeline. The
                environment gives permission. The setups earn the capital.
              </p>
              <p>
                In a Defensive environment, most of the portfolio sits in cash. Not
                because there&apos;s a rule against trading, but because the evidence
                says setups aren&apos;t being supported. Waiting is an active, scored
                decision — not the absence of one.
              </p>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            06 — EXAMPLE READING. The payoff — see VerdictReadout above.
           ================================================================ */}
        <section id="example-reading" className="mt-32">
          <AnnotatedBlock gloss="Payoff">
            <VerdictReadout />
            <p className="mt-6 font-mono text-[13px] leading-relaxed text-ink-faint">
              This is an example of the framework&apos;s output, not a live market
              call. While SEBI Research Analyst registration is in process, I publish
              the method, not a positioning service. The monthly market letters show
              the reading applied in real time.
            </p>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            07–10 — CLOSING PROSE. Regular chapter headings, not numbered
            factors: a lighter rule + display heading rather than a ghost
            numeral, so the composition doesn't force factor-scale drama
            onto sections that aren't factors.
           ================================================================ */}
        <section id="thinking" className="mt-32">
          <AnnotatedBlock gloss="Reasoning">
            <div className="border-t border-rule pt-8">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                The thinking behind this framework
              </h2>
              <div className="mt-8 flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  I&apos;m not trying to predict where Nifty will be next month.
                  I&apos;m trying to understand what the market is rewarding right now.
                </p>
                <p>
                  <strong className="font-semibold text-ink">Not a forecast.</strong>{" "}
                  It is a reality check. An Aggressive reading does not mean the market
                  will rise. A Defensive reading does not mean the market will fall —
                  it measures the current balance of evidence, not where things are
                  going.
                </p>
                <p>
                  If the evidence says conditions are poor, reducing exposure is the
                  correct response even if the market later rallies. The framework
                  optimises for surviving what&apos;s likely, not for catching
                  what&apos;s possible.
                </p>
                <p>
                  Before looking at stocks, I want to know whether the market is
                  actually supporting risk. I&apos;ve seen perfect-looking setups fail
                  simply because the market wasn&apos;t in a position to reward them.
                  The environment reading comes first because everything else — what to
                  watch, what to grade, how much to size, whether to enter — is
                  conditional on this answer.
                </p>
                <p>
                  This is Weinstein&apos;s &ldquo;forest before trees&rdquo; principle.
                  Read the market first, then sectors, then stocks.
                </p>
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        <section id="not-this" className="mt-32">
          <AnnotatedBlock gloss="Rejected approaches">
            <div className="border-t border-rule pt-8">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                What this framework is not
              </h2>
              <div className="mt-8 flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>Three approaches I studied and rejected.</p>
                <p>
                  <strong className="font-semibold text-ink">Price-above-MA only.</strong>{" "}
                  Nifty above the 50 DMA = bull market. Too binary. The index can sit
                  above its moving average while internals deteriorate for months
                  underneath. A market that&apos;s above both MAs but range-bound for
                  eight weeks with a flattening slope is not the same as one making new
                  highs — but a simple above/below test treats them identically.
                </p>
                <p>
                  <strong className="font-semibold text-ink">Breadth only.</strong>{" "}
                  Breadth can signal deterioration early, but it can also stay weak while
                  the index grinds higher on narrow leadership. Used alone, it produces
                  false defensiveness.
                </p>
                <p>
                  <strong className="font-semibold text-ink">Relative strength only.</strong>{" "}
                  Strong leaders can exist inside a weak market. Energy stocks in the
                  2022 US market were exceptional while the broader market was in a
                  downtrend. Leadership quality is necessary, but not sufficient.
                </p>
                <p>
                  No single indicator carries enough information. I stack evidence —
                  trend, breadth, leadership, participation — then make a judgment.
                </p>
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        <section id="feeds" className="mt-32">
          <AnnotatedBlock gloss="Continuity">
            <div className="border-t border-rule pt-8">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                How this feeds Framework 02
              </h2>
              <p className="mt-8 text-[19px] leading-[1.75] text-ink-soft">
                The regime and the exposure cap carry forward into Framework 02 —
                Opportunity Universe. In a Defensive environment the watchlist shrinks;
                in an Aggressive one it expands. The environment doesn&apos;t just set
                how much capital gets deployed — it sets how wide the search is.
              </p>
            </div>
          </AnnotatedBlock>
        </section>

        <section id="does-not" className="mt-32">
          <AnnotatedBlock gloss="Scope">
            <div className="border-t border-rule pt-8">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                What this framework does not do
              </h2>
              <div className="mt-8 flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  It does not pick stocks. It does not time entries. It does not tell me
                  what will happen next.
                </p>
                <p>
                  It answers one question — what kind of market is this right now — so
                  that every decision downstream starts from the right context. If this
                  reading is wrong, the rest of the pipeline still protects capital
                  through sizing and trade management. But the goal is to start right.
                </p>
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            11 — REVISION HISTORY. Table restyled with the same heavy-rule
            exhibit chrome instead of a bordered card.
           ================================================================ */}
        <section id="revision" className="mt-32">
          <AnnotatedBlock gloss="Version log">
            <div className="border-t-2 border-ink pt-8">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                Revision history
              </h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse font-mono text-[13px]">
                  <thead>
                    <tr className="border-b-2 border-ink">
                      <th className="py-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                        Version
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                        Changes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 pr-4 align-top font-semibold text-ink">v1.0</td>
                      <td className="px-4 py-3 align-top text-ink-soft">{formatLongDate(PUBLISHED_DATE)}</td>
                      <td className="px-4 py-3 align-top leading-relaxed text-ink-soft">
                        Initial version. Three-factor equal-weight model. Sub-dimension
                        scoring for Trend and Leadership Quality. All thresholds
                        provisional — to be calibrated against NSE data over the first
                        12–24 months.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        <div className="mt-32">
          <AnnotatedBlock>
            <EmailCapture context="Frameworks are revised as the market teaches us something. Subscribers get the revision and the reason." />
          </AnnotatedBlock>
        </div>
      </div>
    </div>
  );
}

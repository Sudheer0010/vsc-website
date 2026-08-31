"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { Byline } from "@/components/ui/vsc/Byline";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { formatLongDate } from "@/lib/format-date";
import {
  PipelineMapExhibit,
  ScoringFlowExhibit,
  SubScoringExhibit,
  BreadthZonesExhibit,
  ExposureLadderExhibit,
  type SubScoringColumn,
} from "@/components/sections/frameworks/MarketEnvironmentExhibits";

/**
 * DESIGN LAB PROTOTYPE — not wired into production.
 *
 * Every sentence, heading, table value and diagram datum below is copied
 * verbatim from the live page at components/sections/frameworks/
 * MarketEnvironmentFramework.tsx (and its exhibits file). Nothing here
 * rewrites, shortens, reorders or invents framework content — this is a
 * typography/layout/composition exploration only. The data consts
 * (TREND_COLUMNS, SNAPSHOT_ROWS, etc.) are duplicated rather than imported
 * so this file never has a reason to touch the production component.
 */

const PUBLISHED_DATE = "2026-08-05";

/** Same reading measure as production — long-form prose stays ~72ch. */
const PROSE = "max-w-[72ch] mr-auto";
const EXHIBIT_WIDE = "max-w-[960px] mx-auto";
const EXHIBIT_MID = "max-w-[900px] mx-auto";

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

const SNAPSHOT_ROWS: { label: string; value: string }[] = [
  { label: "Purpose", value: "Determine risk posture" },
  { label: "Output", value: "Aggressive · Neutral · Defensive" },
  { label: "Frequency", value: "Weekly" },
  { label: "Inputs", value: "3 — Trend, Breadth, Leadership Quality" },
  { label: "Method", value: "Equal-weight evidence count" },
];

const OTHER_STAGES = [
  { name: "Opportunity Universe", href: "/frameworks/opportunity-universe" },
  { name: "Setup Grading", href: "/frameworks/setup-grading" },
  { name: "Sizing", href: "/frameworks/sizing" },
  { name: "Trade Management", href: "/frameworks/trade-management" },
] as const;

const SECTIONS = [
  { id: "snapshot", label: "Snapshot" },
  { id: "pipeline", label: "The pipeline" },
  { id: "scoring-logic", label: "Scoring logic" },
  { id: "trend", label: "01 · Trend" },
  { id: "breadth", label: "02 · Breadth" },
  { id: "leadership", label: "03 · Leadership Quality" },
  { id: "exposure", label: "Exposure ladder" },
  { id: "example-reading", label: "Example reading" },
  { id: "thinking", label: "The thinking behind this" },
  { id: "not-this", label: "What this is not" },
  { id: "feeds", label: "Feeds Framework 02" },
  { id: "does-not", label: "What this does not do" },
  { id: "revision", label: "Revision history" },
] as const;

/** Same scrollspy pattern already used by ResearchRedesign / FAQKnowledgeDesk. */
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
 * Desktop-only marginal contents rail — dots that expand to labels on
 * hover/focus, fixed to the viewport (not sticky-in-grid) so it survives
 * the full-bleed dark chapter breaks without resetting. Hidden below xl:
 * there isn't room for a margin column at that width, and the details/
 * summary MobileToc below covers orientation instead.
 */
function TocRail() {
  const active = useActiveSection();
  return (
    <nav
      aria-label="Framework contents"
      className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1 xl:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a key={s.id} href={`#${s.id}`} className="group flex items-center gap-2.5 py-1">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200 ${
                isActive ? "scale-125 bg-growth" : "bg-rule-strong group-hover:bg-ink-faint"
              }`}
            />
            <span
              className={`whitespace-nowrap font-mono text-[11px] leading-none opacity-0 transition-all duration-200 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 ${
                isActive ? "font-semibold text-growth" : "text-ink-faint"
              }`}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

/** Compact fallback for viewports where the marginal rail has no room. */
function MobileToc() {
  return (
    <details className={`${PROSE} group rounded-vsc-lg border border-rule bg-surface xl:hidden`}>
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
        Contents
        <span className="text-ink-faint transition-transform duration-200 group-open:rotate-45">+</span>
      </summary>
      <nav aria-label="Framework contents" className="flex flex-col border-t border-rule px-2 py-2">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-vsc-sm px-3 py-2 font-mono text-[13px] text-ink-soft transition-colors hover:bg-canvas-sunk hover:text-growth"
          >
            {s.label}
          </a>
        ))}
      </nav>
    </details>
  );
}

/**
 * The exhibit SVGs render at a fixed viewBox and scale to their container's
 * full width — great on desktop, but on a narrow phone that means every
 * label shrinks to unreadable text. Scrolling the diagram at its natural
 * size beats shrinking it into illegibility (production's own revision-
 * history table already uses the same overflow-x-auto pattern below).
 * Purely a wrapper — the exhibit components themselves are untouched.
 */
function ExhibitScroll({ minWidth, children }: { minWidth: number; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth }}>{children}</div>
    </div>
  );
}

function ProvisionalNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-vsc-md border border-rule bg-canvas-sunk px-5 py-4">
      <span className="w-fit rounded-full border border-rule-strong bg-surface px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
        Provisional
      </span>
      <p className="font-mono text-[13px] leading-relaxed text-ink-muted">{children}</p>
    </div>
  );
}

/** Institutional "framework spec sheet" — same five data rows as production's
 *  FrameworkSnapshot, presented as a divided stat strip instead of a stacked list. */
function FrameworkSnapshot() {
  return (
    <div className="grid grid-cols-1 divide-y divide-rule overflow-hidden rounded-vsc-lg border border-rule bg-surface shadow-lift-1 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
      {SNAPSHOT_ROWS.map((row) => (
        <div key={row.label} className="flex flex-col gap-1.5 px-5 py-4">
          <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
            {row.label}
          </dt>
          <dd className="text-[15px] leading-snug text-ink">{row.value}</dd>
        </div>
      ))}
    </div>
  );
}

/**
 * The full-bleed dark chapter break — same numeral / name / question data as
 * production's FactorDivider, restyled from an in-flow hairline block into a
 * standalone dark analytical chapter. This is the page's main "section
 * rhythm" move: three of these break up the reading column.
 */
function ChapterBreak({
  id,
  seed,
  number,
  name,
  question,
}: {
  id: string;
  seed: number;
  number: string;
  name: string;
  question: string;
}) {
  return (
    <section id={id} className="relative w-full overflow-hidden bg-vsc-dark py-20 sm:py-28">
      <ContourField seed={seed} layers={2} density={7} strokeColor="#7FB999" baseOpacity={0.4} animate />
      <div className="relative container mx-auto max-w-[1040px] px-4 sm:px-6">
        <Reveal>
          <div className="flex items-start justify-between gap-6">
            <span className="font-display text-[72px] font-normal leading-none text-vsc-dark-ink sm:text-[104px]">
              {number}
            </span>
            <span className="mt-3 shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-vsc-dark-accent">
              Factor
            </span>
          </div>
          <h2 className="mt-6 font-display text-[32px] font-normal leading-tight text-vsc-dark-ink sm:text-[44px]">
            {name}
          </h2>
          <p className="mt-3 max-w-[46ch] text-[18px] text-vsc-dark-ink-muted">{question}</p>
        </Reveal>
      </div>
    </section>
  );
}

function VerdictBlock() {
  const checks: { factor: string; verdict: string }[] = [
    { factor: "Trend", verdict: "Positive" },
    { factor: "Breadth", verdict: "Positive" },
    { factor: "Leadership", verdict: "Positive" },
  ];

  return (
    <div
      className="rounded-vsc-xl border-l-[3px] bg-surface p-8 shadow-lift-2 sm:p-10"
      style={{ borderLeftColor: "var(--growth)" }}
    >
      <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-growth">
        Example reading
      </span>

      <div className="mt-6 font-display text-[56px] font-semibold leading-none text-growth sm:text-[72px]">
        Aggressive
      </div>

      <div className="mt-8 flex items-baseline justify-between border-t border-rule pt-5 font-mono text-[13px]">
        <span className="text-ink-muted">Maximum exposure</span>
        <span className="font-semibold text-ink">80–100%</span>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {checks.map((c) => (
          <div key={c.factor} className="flex items-center justify-between font-mono text-[13px]">
            <span className="text-ink-muted">{c.factor}</span>
            <span className="flex items-center gap-2 font-semibold text-growth">
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

export function MarketEnvironmentRedesign() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-canvas text-ink">
      <ReadingProgress />
      <PaperGrain />
      <TocRail />

      {/* ================================================================
          FRAMEWORK IDENTITY — dark opening chapter. Not a marketing hero:
          no CTA, no imagery, just the framework's masthead, its exact
          opening statement (unchanged), and where it sits in the pipeline.
         ================================================================ */}
      <header className="relative w-full overflow-hidden bg-vsc-dark pb-20 pt-32 sm:pb-28 sm:pt-40">
        <ContourField seed={34} layers={3} density={9} strokeColor="#7FB999" baseOpacity={0.55} animate />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 55% 50% at 15% 0%, rgba(63,203,116,0.16) 0%, transparent 65%)",
          }}
        />

        <div className="relative container mx-auto max-w-[1040px] px-4 sm:px-6">
          <Reveal>
            <Link
              href="/research#framework-library"
              className="group mb-10 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-vsc-dark-ink-muted transition-colors hover:text-vsc-dark-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Back to Research
            </Link>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-vsc-dark-hairline pb-6">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-vsc-dark-accent">
                Framework 01 of 5
              </span>
              <span className="h-3 w-px bg-vsc-dark-hairline" aria-hidden="true" />
              <span className="font-mono text-[11px] text-vsc-dark-ink-muted">v1.0 · {formatLongDate(PUBLISHED_DATE)}</span>
              <span className="h-3 w-px bg-vsc-dark-hairline" aria-hidden="true" />
              <span className="font-mono text-[11px] text-vsc-dark-ink-muted">~13 min read</span>
              <span className="h-3 w-px bg-vsc-dark-hairline" aria-hidden="true" />
              <Byline variant="compact" className="!text-vsc-dark-ink-muted" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-10 font-display text-4xl font-normal leading-[1.1] text-vsc-dark-ink sm:text-6xl">
              Market Environment
            </h1>
          </Reveal>

          <Reveal delay={0.13}>
            {/* fontStyle inline, not the `italic` utility — this codebase's
                global .italic class also forces color:var(--ink), which
                would silently clobber text-vsc-dark-ink here. */}
            <p
              className="font-editorial mt-10 max-w-[640px] text-[32px] leading-[1.2] text-vsc-dark-ink sm:text-[44px]"
              style={{ fontStyle: "italic" }}
            >
              The market decides
              <br />
              how aggressive you are
              <br />
              allowed to be.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-[600px] text-[18px] leading-relaxed text-vsc-dark-ink-muted">
              Everything else comes later.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[13px] leading-relaxed text-vsc-dark-ink-muted">
              {OTHER_STAGES.map((stage, i) => (
                <span key={stage.name} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <Link
                    href={stage.href}
                    className="rounded-full border border-vsc-dark-hairline px-3 py-1 transition-colors hover:border-vsc-dark-accent hover:text-vsc-dark-accent"
                  >
                    {stage.name}
                  </Link>
                </span>
              ))}
              <span>— all depend on this first decision.</span>
            </div>
          </Reveal>
        </div>
      </header>

      <main className="relative z-10 w-full pb-24">
        <div className="container mx-auto max-w-[1040px] px-4 sm:px-6">
          <div className="flex flex-col gap-14 pt-16 sm:pt-20">
            <MobileToc />

            {/* 2. Framework Snapshot */}
            <div id="snapshot" className={PROSE}>
              <FrameworkSnapshot />
            </div>

            {/* 3. EXHIBIT — Pipeline map */}
            <div id="pipeline">
              <Exhibit
                number={1}
                label="The five-stage pipeline"
                caption="You are reading Stage 1. Each stage feeds the next."
                className={`${PROSE} rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8`}
              >
                <ExhibitScroll minWidth={420}>
                  <PipelineMapExhibit />
                </ExhibitScroll>
              </Exhibit>
            </div>

            {/* 4. The weekend question */}
            <section id="scoring-logic" className={PROSE}>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
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
            </section>

            {/* Why no weights */}
            <section className={PROSE}>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
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
            </section>
          </div>
        </div>

        {/* 5. EXHIBIT — The scoring flow. The one full-bleed analytical
            moment on the page: the busiest diagram, given room to breathe
            on its own band instead of competing with the reading column. */}
        <section className="my-14 w-full border-y border-rule bg-canvas-sunk py-14 sm:py-20">
          <div className="container mx-auto max-w-[1200px] px-4 sm:px-6">
            <Exhibit
              number={2}
              label="The scoring flow"
              caption="The exposure figure is a ceiling, not a target. The environment gives permission; the setups downstream earn the capital. Aggressive is not &ldquo;fully invested,&rdquo; and Defensive is not &ldquo;no positions&rdquo; — each is the most risk the evidence currently allows."
              className={`${EXHIBIT_WIDE} rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-2 sm:p-10`}
            >
              <ExhibitScroll minWidth={780}>
                <ScoringFlowExhibit />
              </ExhibitScroll>
            </Exhibit>
          </div>
        </section>

        {/* FACTOR 01 — Trend */}
        <ChapterBreak id="trend" seed={12} number="01" name="Trend" question="Is the market structurally healthy?" />

        <div className="container mx-auto max-w-[1040px] px-4 sm:px-6">
          <div className="flex flex-col gap-14 pt-16">
            <div className="flex flex-col gap-6">
              <section className={PROSE}>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  I score Trend across three sub-dimensions — Structure, Location, and
                  Slope. Each is classified independently, and the overall reading is
                  majority: two out of three.
                </p>
              </section>

              <Exhibit
                number={3}
                label="Scoring Trend"
                className={`${EXHIBIT_WIDE} rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8`}
              >
                <ExhibitScroll minWidth={780}>
                  <SubScoringExhibit
                    columns={TREND_COLUMNS}
                    resolverLines={[
                      "2 OR 3 POSITIVE → TREND IS POSITIVE",
                      "2 OR 3 NEGATIVE → TREND IS NEGATIVE",
                      "Anything else → Neutral",
                    ]}
                    titleId="trend-scoring"
                    title="Scoring Trend across three sub-dimensions."
                    desc="Structure, Location, and Slope are each classified Positive, Neutral, or Negative, then resolved by majority: two or three positive makes Trend positive, two or three negative makes Trend negative, and anything else makes Trend neutral."
                  />
                </ExhibitScroll>
              </Exhibit>

              <p className={`${PROSE} text-[17px] leading-relaxed text-ink-soft`}>
                <strong className="font-semibold text-ink">What this tells us:</strong>{" "}
                Trend is healthy when at least two of Structure, Location, and Slope
                agree — not from any single signal alone.
              </p>
            </div>

            <section className={`${PROSE} flex flex-col gap-5`}>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                <strong className="font-semibold text-ink">Positive:</strong> 2 or 3
                sub-dimensions positive. <strong className="font-semibold text-ink">Negative:</strong>{" "}
                2 or 3 negative. Otherwise Neutral.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                This eliminates interpretation. A market above both MAs but range-bound
                with a flattening slope scores Location positive, Structure neutral,
                Slope neutral — overall Neutral. Not Positive. The structure resolves
                the ambiguity, not the analyst.
              </p>
            </section>
          </div>
        </div>

        {/* FACTOR 02 — Breadth */}
        <ChapterBreak id="breadth" seed={45} number="02" name="Breadth" question="How many stocks are participating?" />

        <div className="container mx-auto max-w-[1040px] px-4 sm:px-6">
          <div className="flex flex-col gap-14 pt-16">
            <div className="flex flex-col gap-6">
              <section className={PROSE}>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  I look at the percentage of Nifty 500 stocks above their 50 DMA and 200
                  DMA, the advance/decline ratio, and new 52-week highs versus lows.
                </p>
              </section>

              <Exhibit
                number={4}
                label="Breadth zones"
                className={`${EXHIBIT_MID} rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8`}
              >
                <ExhibitScroll minWidth={700}>
                  <BreadthZonesExhibit />
                </ExhibitScroll>
              </Exhibit>

              <p className={`${PROSE} text-[17px] leading-relaxed text-ink-soft`}>
                <strong className="font-semibold text-ink">What this tells us:</strong>{" "}
                Breadth shows whether a rally is broad or narrow, and it can shift
                before the index itself does.
              </p>
            </div>

            <section className={`${PROSE} flex flex-col gap-6`}>
              <div className="flex flex-col overflow-hidden rounded-vsc-lg border border-rule">
                {BREADTH_ROWS.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6 ${
                      i > 0 ? "border-t border-rule" : ""
                    }`}
                  >
                    <span
                      className="w-20 shrink-0 font-mono text-[13px] font-semibold"
                      style={{ color: row.color }}
                    >
                      {row.label}
                    </span>
                    <span className="font-mono text-[13px] text-ink">{row.text}</span>
                  </div>
                ))}
              </div>

              <p className="text-[17px] leading-relaxed text-ink-soft">
                Breadth often deteriorates before the index does. The Nifty can hold
                above its moving averages while participation narrows underneath. This
                factor catches that divergence.
              </p>

              <ProvisionalNote>
                <strong className="font-semibold">Provisional.</strong> The 60% and 40%
                boundaries are drawn from published breadth research and observed
                behaviour — studies commonly cite &gt;60–70% as broad participation and
                &lt;35–40% as weak. These thresholds remain provisional until tested
                against NSE historical data. If calibration changes them, this page
                will be updated with a version note recording the old values, the new
                values, and the evidence.
              </ProvisionalNote>
            </section>
          </div>
        </div>

        {/* FACTOR 03 — Leadership Quality */}
        <ChapterBreak
          id="leadership"
          seed={78}
          number="03"
          name="Leadership Quality"
          question="Are opportunities actually working?"
        />

        <div className="container mx-auto max-w-[1040px] px-4 sm:px-6">
          <div className="flex flex-col gap-14 pt-16">
            <div className="flex flex-col gap-6">
              <section className={`${PROSE} flex flex-col gap-5`}>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  This is the factor that matters most for how I actually trade. If
                  setups are working, the market is healthy — regardless of what the
                  index says. If setups are consistently failing, the environment has
                  shifted.
                </p>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  I score it across three sub-metrics, same 2-of-3 structure as Trend.
                </p>
              </section>

              <Exhibit
                number={5}
                label="Scoring Leadership Quality"
                className={`${EXHIBIT_WIDE} rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8`}
              >
                <ExhibitScroll minWidth={780}>
                  <SubScoringExhibit
                    columns={LEADERSHIP_COLUMNS}
                    resolverLines={[
                      "2 OR 3 POSITIVE → POSITIVE",
                      "2 OR 3 NEGATIVE → NEGATIVE",
                      "Anything else → Neutral",
                    ]}
                    titleId="leadership-scoring"
                    title="Scoring Leadership Quality across three sub-metrics."
                    desc="Breakout Success, New High Expansion, and Sector Participation are each classified Positive, Neutral, or Negative, then resolved by majority: two or three positive makes the factor positive, two or three negative makes it negative, and anything else makes it neutral."
                  />
                </ExhibitScroll>
              </Exhibit>

              <p className={`${PROSE} text-[17px] leading-relaxed text-ink-soft`}>
                <strong className="font-semibold text-ink">What this tells us:</strong>{" "}
                When real setups keep working, the market is supporting risk-taking;
                when they keep failing, that support has faded.
              </p>
            </div>

            <section className={`${PROSE} flex flex-col gap-6`}>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                A rally driven by three stocks looks like leadership. A rally driven by
                eight sectors <em>is</em> leadership. Keeping sector count as a visible
                sub-metric prevents narrow concentration from being missed.
              </p>

              <ProvisionalNote>
                <strong className="font-semibold">Provisional.</strong> The
                success-rate and sector-count boundaries are initial estimates. A
                framework must have numbers to be falsifiable — without them, there is
                no way to tell whether the framework worked or whether I changed my
                interpretation after the fact. These will be calibrated and updated in
                the revision history.
              </ProvisionalNote>

              <p className="text-[17px] leading-relaxed text-ink-soft">
                The test any factor must pass: can I calculate this every week without
                relying on someone else&apos;s commentary? If not, it doesn&apos;t
                belong here. All three sub-metrics are directly observable from price
                data and a scanner.
              </p>
            </section>
          </div>
        </div>

        <div className="container mx-auto max-w-[1040px] px-4 pt-14 sm:px-6">
          <div id="exposure">
            <Exhibit
              number={6}
              label="Exposure ladder"
              className={`${EXHIBIT_MID} rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8`}
            >
              <ExhibitScroll minWidth={700}>
                <ExposureLadderExhibit />
              </ExhibitScroll>
              <p className="font-editorial mt-6 text-center text-2xl text-ink" style={{ fontStyle: "italic" }}>
                Exposure is a ceiling, not a target.
              </p>
            </Exhibit>
          </div>
        </div>

        <div className="container mx-auto max-w-[1040px] px-4 sm:px-6">
          <div className="flex flex-col gap-14 pt-14">
            {/* Cash is a position */}
            <section className={PROSE}>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
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
            </section>
          </div>
        </div>

        {/* Example Reading — the payoff, staged as its own light editorial
            band (growth-wash, not the reserved dark treatment) so it reads
            as a destination the reader arrives at, not another paragraph. */}
        <section id="example-reading" className="my-14 w-full border-y border-rule bg-growth-wash py-14 sm:py-20">
          <div className="container mx-auto max-w-[1040px] px-4 sm:px-6">
            <div className="mx-auto max-w-[560px]">
              <VerdictBlock />
            </div>
            <p className={`${PROSE} mt-5 font-mono text-[13px] leading-relaxed text-ink-faint`}>
              This is an example of the framework&apos;s output, not a live market
              call. While SEBI Research Analyst registration is in process, I publish
              the method, not a positioning service. The monthly market letters show
              the reading applied in real time.
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-[1040px] px-4 sm:px-6">
          <div className="flex flex-col gap-14">
            {/* The thinking behind this framework */}
            <section id="thinking" className={PROSE}>
              <h2 className="mb-4 font-display text-2xl font-normal text-ink sm:text-3xl">
                The thinking behind this framework
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
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
            </section>

            {/* What this framework is not */}
            <section id="not-this" className={PROSE}>
              <h2 className="mb-4 font-display text-2xl font-normal text-ink sm:text-3xl">
                What this framework is not
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
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
            </section>

            {/* How this feeds Framework 02 */}
            <section id="feeds" className={PROSE}>
              <h2 className="mb-4 font-display text-2xl font-normal text-ink sm:text-3xl">
                How this feeds Framework 02
              </h2>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                The regime and the exposure cap carry forward into Framework 02 —
                Opportunity Universe. In a Defensive environment the watchlist shrinks;
                in an Aggressive one it expands. The environment doesn&apos;t just set
                how much capital gets deployed — it sets how wide the search is.
              </p>
            </section>

            {/* What this framework does not do */}
            <section id="does-not" className={PROSE}>
              <h2 className="mb-4 font-display text-2xl font-normal text-ink sm:text-3xl">
                What this framework does not do
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
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
            </section>

            {/* Revision history */}
            <section id="revision" className="flex flex-col gap-4 border-t border-rule pt-10">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-faint">
                Revision history
              </h2>
              <div className="overflow-x-auto rounded-vsc-lg border border-rule">
                <table className="w-full min-w-[560px] border-collapse font-mono text-[13px]">
                  <thead>
                    <tr className="border-b border-rule bg-canvas-sunk">
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
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
                      <td className="px-4 py-3 align-top font-semibold text-ink">v1.0</td>
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
            </section>

            <div className={PROSE}>
              <EmailCapture context="Frameworks are revised as the market teaches us something. Subscribers get the revision and the reason." />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

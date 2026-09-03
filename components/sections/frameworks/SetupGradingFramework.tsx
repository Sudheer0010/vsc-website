"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Byline } from "@/components/ui/vsc/Byline";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { formatLongDate } from "@/lib/format-date";
import { PipelineStrip } from "./PipelineStrip";
import {
  ThreeLayersExhibit,
  IntegrityGatesExhibit,
  QualityScorecardExhibit,
  TwoRejectionsExhibit,
  GradeBadge,
  type Grade,
} from "./SetupGradingExhibits";

/**
 * Framework 03 — Setup Grading. Ported onto the editorial reading system
 * established at Frameworks 01 and 02: running section rail, AnnotatedBlock
 * margin glosses, GhostNumeral chapter openers, rule-based exhibit chrome.
 * Every word, heading, table value, threshold and link is unchanged from
 * the previous implementation — only the presentation layer is new, and
 * only where this page's own structure asked for something different from
 * 01/02: three numbered Layers (not three factors or four cuts) as the
 * top-level chapters, with five named quality dimensions nested inside
 * Layer 3 — each dimension gets a small mono index tag, not a full
 * GhostNumeral, so it doesn't visually outrank the Layer it belongs to.
 *
 * `ClarificationNote` (was a tinted rounded panel) and `AnchorTable` (was a
 * bordered card) are restyled to the same rule-based chrome the rest of the
 * system uses — no new colours or component shapes, just the existing
 * vocabulary. `GradeBadge` (a small circular data indicator, not a card) is
 * reused unchanged from the exhibits file.
 */

const PUBLISHED_DATE = "2026-08-07";
const CANONICAL = "/frameworks/setup-grading";

interface AnchorRow {
  score: 2 | 1 | 0;
  desc: string;
}

interface Dimension {
  name: string;
  question: string;
  clarification?: string;
  rows: AnchorRow[];
  principle: string;
}

const DIMENSIONS: Dimension[] = [
  {
    name: "Trend Quality",
    question: "Is the stock moving in the direction I want?",
    rows: [
      {
        score: 2,
        desc: "Above 50 DMA and 200 DMA. Higher highs, higher lows. Rising moving averages. Stage 2 structure visible. Trend direction is immediately obvious.",
      },
      {
        score: 1,
        desc: "Above 200 DMA. Mixed structure, some higher lows, moving averages flattening. Trend exists but lacks momentum.",
      },
      { score: 0, desc: "Below 200 DMA, or choppy range with no clear direction. No trend advantage." },
    ],
    principle: "Trend is not an entry signal. Trend is a quality filter.",
  },
  {
    name: "Structure Quality",
    question: "Is the chart organised?",
    rows: [
      {
        score: 2,
        desc: "Tight base. Contractions shrinking properly. Clear pivot, clear resistance. Higher lows inside the base. The chart almost explains itself.",
      },
      {
        score: 1,
        desc: "Valid but imperfect. Base slightly loose, one deep contraction, wider swings, pivot exists but is not ideal.",
      },
      { score: 0, desc: "Wide volatility, deep retracements, no clean pivot. Requires too much explanation." },
    ],
    principle: "Structure determines clarity. If structure is unclear, risk management becomes guesswork.",
  },
  {
    name: "Relative Strength Quality",
    question: "How strong is the outperformance?",
    clarification:
      "Minimum relative strength was already confirmed at Layer 2. This dimension measures how far past that minimum the stock sits.",
    rows: [
      { score: 2, desc: "Clear outperformance versus the index, sector is a top-two leader, RS line near highs." },
      { score: 1, desc: "Outperforming the index, sector neutral." },
      { score: 0, desc: "Outperforming, but only marginally. Cleared the gate without conviction." },
    ],
    principle: "A stock can rise. A strong stock rises faster than the market.",
  },
  {
    name: "Volume Quality",
    question: "How exceptional is the participation?",
    clarification: "Minimum volume was already confirmed at Layer 2. This dimension measures the degree.",
    rows: [
      { score: 2, desc: "Volume far above the minimum — decisive expansion at the trigger." },
      { score: 1, desc: "Volume comfortably above the minimum." },
      { score: 0, desc: "Volume at the minimum. Cleared the gate, nothing more." },
    ],
    principle:
      "Volume does not create a setup. Volume validates a setup — and the strongest volume separates the best instances from the acceptable ones.",
  },
  {
    name: "Opportunity Quality",
    question: "How efficient is the risk-reward?",
    clarification:
      "Acceptable risk was already confirmed at Layer 2. This dimension measures efficiency within that acceptable range.",
    rows: [
      { score: 2, desc: "Tight stop, clear multiple-R opportunity, entry not extended." },
      { score: 1, desc: "Moderate stop, acceptable R multiple." },
      { score: 0, desc: "Stop near the acceptable limit. Valid, but capital works harder here for less." },
    ],
    principle: "Good stocks are not always good trades.",
  },
];

const GRADE_MEANINGS: { grade: Grade; range: string; name: string; desc: string }[] = [
  {
    grade: "A",
    range: "9–10",
    name: "Exceptional",
    desc: "Rare. Everything aligns. These receive attention first and the largest allocation the environment permits.",
  },
  {
    grade: "B",
    range: "7–8",
    name: "Strong",
    desc: "Good, not perfect. One or two dimensions sit below their best. Still highly tradable.",
  },
  {
    grade: "C",
    range: "5–6",
    name: "Acceptable",
    desc: "Technically sound, not compelling. Considered only when stronger opportunities are scarce.",
  },
  {
    grade: null,
    range: "Under 5",
    name: "No allocation today",
    desc: "A valid setup that ranked below the alternatives. It stays on the watchlist. It does not receive capital.",
  },
];

const SECTIONS = [
  { n: "00", id: "identity", label: "Identity" },
  { n: "01", id: "layers", label: "The layers" },
  { n: "02", id: "pipeline", label: "Pipeline" },
  { n: "03", id: "why", label: "Why this exists" },
  { n: "04", id: "eligibility", label: "Layer 1" },
  { n: "05", id: "integrity", label: "Layer 2" },
  { n: "06", id: "quality", label: "Layer 3" },
  { n: "07", id: "rejections", label: "Two rejections" },
  { n: "08", id: "grades", label: "The grades" },
  { n: "09", id: "principle", label: "Principle" },
  { n: "10", id: "not-this", label: "Not this" },
  { n: "11", id: "handoff", label: "Handoff" },
  { n: "12", id: "closing", label: "Closing" },
] as const;

/** Same IntersectionObserver scrollspy pattern as Frameworks 01–02. */
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
        Setup Grading — Framework 03
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

function ExhibitScroll({ minWidth, children }: { minWidth: number; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth }}>{children}</div>
    </div>
  );
}

/** Reserved for the three Layers — the top-level chapters this page's
 *  content actually has, the same structural role Framework 01's three
 *  factors and Framework 02's four cuts play. */
function GhostNumeral({ children }: { children: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -left-2 -top-8 select-none font-display font-bold leading-none text-transparent sm:-left-6 sm:-top-16 lg:-top-20"
      style={{
        fontSize: "clamp(84px, 22vw, 360px)",
        WebkitTextStroke: "1.5px var(--rule-strong)",
      }}
    >
      {children}
    </span>
  );
}

/** A short, aphoristic statement of intent — conviction, not disclaimer. */
function PrincipleBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="border-l-2 border-rule-strong pl-5 text-[16px] leading-relaxed text-ink-muted"
      style={{ fontStyle: "italic" }}
    >
      {children}
    </div>
  );
}

/**
 * Was a tinted rounded panel; the growth-coloured rule carries the same
 * "pay attention, this reframes the number you're about to read" signal
 * without a background fill.
 */
function ClarificationNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 pl-5 text-[14px] leading-relaxed text-ink-soft" style={{ borderColor: "var(--growth)" }}>
      {children}
    </div>
  );
}

/** Heavy-rule table — same chrome as Framework 01's revision-history table
 *  and Framework 02's filter table, not a bordered card. */
function AnchorTable({ rows }: { rows: AnchorRow[] }) {
  const scoreColor: Record<number, string> = { 2: "text-growth", 1: "text-ink", 0: "text-ink-faint" };
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse font-mono text-[13px]">
        <thead>
          <tr className="border-b-2 border-ink">
            <th className="w-16 py-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Score
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              What it looks like
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.score} className={i > 0 ? "border-t border-rule" : undefined}>
              <td className={`py-3 pr-4 align-top font-bold ${scoreColor[row.score]}`}>{row.score}</td>
              <td className="px-4 py-3 align-top leading-relaxed text-ink-soft">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Chapter-transition diagram for the Handoff — kept un-numbered, the same
 *  distinction Framework 02 preserves for its own HandoffArrow. */
function HandoffArrow() {
  const width = 320;
  const boxW = 240;
  const boxH = 48;
  const gap = 34;
  const box2Y = boxH + gap;
  const height = box2Y + boxH;
  const cx = width / 2;
  const boxX = (width - boxW) / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="handoff-arrow-title"
      width="100%"
      style={{ maxWidth: 320, height: "auto", display: "block", margin: "0 auto" }}
    >
      <title id="handoff-arrow-title">Setup Grading hands off to Sizing.</title>
      <rect x={boxX} y={0} width={boxW} height={boxH} rx={8} fill="var(--canvas-sunk)" stroke="var(--rule)" />
      <text x={cx} y={boxH / 2 + 5} textAnchor="middle" style={{ font: "600 13px var(--font-mono)", fill: "var(--ink)" }}>
        Setup Grading
      </text>

      <line
        x1={cx}
        y1={boxH}
        x2={cx}
        y2={box2Y}
        stroke="var(--ink-faint)"
        strokeWidth={1.5}
        markerEnd="url(#arrowhead-handoff-sg)"
      />

      <rect x={boxX} y={box2Y} width={boxW} height={boxH} rx={8} fill="var(--canvas-sunk)" stroke="var(--rule)" />
      <text
        x={cx}
        y={box2Y + boxH / 2 + 5}
        textAnchor="middle"
        style={{ font: "600 13px var(--font-mono)", fill: "var(--ink)" }}
      >
        Sizing
      </text>

      <defs>
        <marker id="arrowhead-handoff-sg" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--ink-faint)" />
        </marker>
      </defs>
    </svg>
  );
}

export function SetupGradingFramework() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Setup Grading — Framework 03, the VSC Decision Pipeline",
    description:
      "The third stage of the VSC Decision Pipeline: a three-layer decision architecture — eligibility, integrity, and quality — that separates setups worth grading from setups that were never valid, then ranks what remains from A to no allocation today.",
    author: { "@type": "Person", name: "Sudheer Vobhilineni" },
    publisher: { "@type": "Organization", name: "VSC Capital & Advisory" },
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    mainEntityOfPage: `https://vsccapital.in${CANONICAL}`,
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-canvas text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ReadingProgress />
      <RunningRail />

      <div className="mx-auto max-w-[1680px] px-6 pb-40 pt-32 sm:px-10 lg:px-20 lg:pt-40 xl:pl-56 xl:pr-20">
        {/* ================================================================
            00 — IDENTITY.
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
            Framework 03 · Setup Grading
          </span>

          <h1
            className="mt-5 font-display font-bold text-ink"
            style={{ fontSize: "clamp(48px, 10vw, 132px)", lineHeight: 0.9, letterSpacing: "-0.035em" }}
          >
            Setup Grading
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-ink-muted lg:hidden">
            <span>v0.1</span>
            <span aria-hidden="true">·</span>
            <span>{formatLongDate(PUBLISHED_DATE)}</span>
            <span aria-hidden="true">·</span>
            <span>~8 min read</span>
            <span aria-hidden="true">·</span>
            <Byline variant="compact" />
          </div>

          <div className="mt-10 lg:mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
              <div className="hidden lg:col-span-2 lg:flex lg:flex-col lg:gap-2.5">
                <span className="font-mono text-[11px] text-ink-muted">v0.1</span>
                <span className="font-mono text-[11px] text-ink-muted">{formatLongDate(PUBLISHED_DATE)}</span>
                <span className="font-mono text-[11px] text-ink-muted">~8 min read</span>
                <Byline variant="full" className="mt-2" />
              </div>

              <div className="lg:col-span-7 lg:col-start-3">
                <p
                  className="font-editorial text-ink"
                  style={{ fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.18, letterSpacing: "-0.01em" }}
                >
                  Which setups deserve capital?
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================
            01 — THE LAYERS. Opener, hero Exhibit 01, and the framing
            paragraphs, in the same order as production.
           ================================================================ */}
        <section id="layers" className="mb-32 flex flex-col gap-14">
          <AnnotatedBlock>
            <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
              <p>Not all valid setups deserve capital.</p>
              <p>A setup can be technically valid and still be a poor allocation of risk.</p>
              <p>This framework does not predict outcomes. It ranks opportunities.</p>
              <p>It exists to create scarcity and force selectivity.</p>
            </div>
          </AnnotatedBlock>

          <AnnotatedBlock span={10}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <figure className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                  <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    Exhibit 01 — The Three Layers
                  </figcaption>
                </div>
                <div className="mt-8">
                  <ExhibitScroll minWidth={700}>
                    <ThreeLayersExhibit />
                  </ExhibitScroll>
                </div>
              </figure>
              <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                <span className="font-display text-[64px] font-bold leading-none text-rule-strong">01</span>
              </div>
            </div>
          </AnnotatedBlock>

          <AnnotatedBlock gloss="Order">
            <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
              <p>Each layer answers a different question, and the order matters.</p>
              <p>
                Eligibility asks whether the pattern is one I trade at all. Integrity asks
                whether this instance satisfies that pattern&apos;s non-negotiable rules.
                Only what survives both gets scored.
              </p>
              <p>Grading a setup that fails either layer is wasted work.</p>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            02 — PIPELINE. Shared PipelineStrip, unchanged.
           ================================================================ */}
        <section id="pipeline" className="mb-32">
          <AnnotatedBlock span={10} gloss="Pipeline">
            <PipelineStrip activeIndex={2} />
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            03 — WHY THIS FRAMEWORK EXISTS. No heading in production —
            headingless prose, preserved exactly as such.
           ================================================================ */}
        <section id="why" className="mb-32">
          <AnnotatedBlock>
            <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
              <p>Most traders evaluate setups using feelings.</p>
              <p>They see a chart. They like the story. They like the sector. They imagine the upside.</p>
              <p>Then they enter.</p>
              <p>Subjective conviction is not a repeatable process.</p>
              <p>
                Every setup is evaluated against the same criteria, in the same order, so the
                decision to allocate capital is made the same way every time.
              </p>
              <p>The framework sits between observation and action.</p>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            04 — LAYER 1: ELIGIBILITY.
           ================================================================ */}
        <section id="eligibility" className="relative mt-32">
          <GhostNumeral>1</GhostNumeral>

          <AnnotatedBlock gloss="Layer 1 of 3">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
              >
                Layer 1 — Eligibility
              </h2>
              <p className="font-editorial mt-4 text-ink-soft" style={{ fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.3 }}>
                Is this a setup I trade?
              </p>
            </div>
          </AnnotatedBlock>

          <div className="mt-14">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>This layer is binary and it is fast.</p>
                <p>
                  I maintain a defined set of setups. A chart either matches one of them or it
                  does not. There is no partial match, no &ldquo;close enough,&rdquo; no setup I
                  invent on the spot because the chart looks interesting.
                </p>
                <p>
                  Setup Grading is pattern-agnostic from here on. Whether the opportunity is an
                  OTB Breakout, a VCP, a Pole &amp; Flag, or another setup from the playbook,
                  every eligible candidate moves through the same two layers that follow.
                </p>
                <p>
                  If the chart does not match a setup I trade, it is discarded. No scoring. No
                  analysis. No debate.
                </p>
              </div>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            05 — LAYER 2: INTEGRITY.
           ================================================================ */}
        <section id="integrity" className="relative mt-32">
          <GhostNumeral>2</GhostNumeral>

          <AnnotatedBlock gloss="Layer 2 of 3">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
              >
                Layer 2 — Integrity
              </h2>
              <p className="font-editorial mt-4 text-ink-soft" style={{ fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.3 }}>
                Does this setup satisfy its own non-negotiable rules?
              </p>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-10">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  Every setup has conditions that define it. Without them, the pattern is not a
                  weaker version of itself — it is a different chart.
                </p>
                <p>
                  A Pole &amp; Flag without a pole is not a weak Pole &amp; Flag. There is no
                  setup.
                </p>
                <p>These are gates, not scores. Each one is pass or fail, with nothing in between.</p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 02 — The Integrity Gates
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={600}>
                      <IntegrityGatesExhibit />
                    </ExhibitScroll>
                  </div>
                </figure>
                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">02</span>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  The specific thresholds vary by setup — what counts as sufficient volume for
                  a breakout is not what counts for a base. The categories stay constant; the
                  numbers belong to each setup&apos;s own rules.
                </p>
                <p>
                  Fail any gate and the candidate does not proceed. It is not graded, and it
                  does not appear in the ranking.
                </p>
              </div>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            06 — LAYER 3: QUALITY SCORE. Intro, Exhibit 03, then the five
            named dimensions nested inside — each gets a small mono index
            tag rather than a GhostNumeral, so it reads as part of Layer 3
            rather than a fourth top-level chapter.
           ================================================================ */}
        <section id="quality" className="relative mt-32">
          <GhostNumeral>3</GhostNumeral>

          <AnnotatedBlock gloss="Layer 3 of 3">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
              >
                Layer 3 — Quality Score
              </h2>
              <p className="font-editorial mt-4 text-ink-soft" style={{ fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.3 }}>
                Among all valid setups, which deserve capital first?
              </p>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-14">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  Everything reaching this layer is already a real setup that satisfies its own
                  rules. The question is no longer whether it works. The question is how strong
                  it is relative to everything else available right now.
                </p>
                <p>
                  A good setup is rarely one thing. It is usually several favourable conditions
                  appearing at the same time.
                </p>
                <p>
                  Note the shift in wording between Layer 2 and Layer 3. Layer 2 asks whether
                  volume is present. Layer 3 asks how exceptional it is. Layer 2 asks whether
                  relative strength is positive. Layer 3 asks how strong it is.
                </p>
                <p>Defining conditions are gates. Improving conditions are scores. They are never mixed.</p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 03 — The Quality Scorecard
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={700}>
                      <QualityScorecardExhibit />
                    </ExhibitScroll>
                  </div>
                </figure>
                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">03</span>
                </div>
              </div>
            </AnnotatedBlock>

            {DIMENSIONS.map((dim, i) => (
              <AnnotatedBlock key={dim.name} gloss={`Dimension ${i + 1} of 5`}>
                <div className="flex flex-col gap-5 border-t border-rule pt-8">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-ink sm:text-[28px]">{dim.name}</h3>
                    <p className="mt-1.5 text-[15px] text-ink-faint" style={{ fontStyle: "italic" }}>
                      Question: {dim.question}
                    </p>
                  </div>
                  {dim.clarification && <ClarificationNote>{dim.clarification}</ClarificationNote>}
                  <AnchorTable rows={dim.rows} />
                  <PrincipleBlock>{dim.principle}</PrincipleBlock>
                </div>
              </AnnotatedBlock>
            ))}
          </div>
        </section>

        {/* ================================================================
            07 — EXHIBIT 04: TWO REJECTIONS. Not a Layer — no ghost numeral.
           ================================================================ */}
        <section id="rejections" className="mt-32">
          <AnnotatedBlock span={10}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <figure className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                  <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    Exhibit 04 — Two Rejections
                  </figcaption>
                </div>
                <div className="mt-8">
                  <ExhibitScroll minWidth={600}>
                    <TwoRejectionsExhibit />
                  </ExhibitScroll>
                </div>
              </figure>
              <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                <span className="font-display text-[64px] font-bold leading-none text-rule-strong">04</span>
              </div>
            </div>
          </AnnotatedBlock>

          <div className="mt-10">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  A setup that violates a non-negotiable rule is not a lower-grade setup. It is
                  not a setup.
                </p>
                <p>A setup that scores poorly is still a setup. It simply did not earn capital today.</p>
              </div>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            08 — WHAT THE GRADES MEAN.
           ================================================================ */}
        <section id="grades" className="mt-32">
          <AnnotatedBlock gloss="Output">
            <div className="border-t-2 border-ink">
              <h2
                className="mt-8 font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                What The Grades Mean
              </h2>
              <div className="mt-8 flex flex-col">
                {GRADE_MEANINGS.map((g, i) => (
                  <div
                    key={g.name}
                    className={`flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:gap-5 ${
                      i > 0 ? "border-t border-rule" : ""
                    }`}
                  >
                    <div className="flex shrink-0 items-center gap-3 sm:w-44">
                      <GradeBadge grade={g.grade} />
                      <div className="flex flex-col">
                        <span className="font-mono text-[11px] font-semibold text-ink-faint">{g.range}</span>
                        <span className="text-[14px] font-semibold text-ink">{g.name}</span>
                      </div>
                    </div>
                    <p className="text-[15px] leading-relaxed text-ink-soft">{g.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            09 — THE MOST IMPORTANT PRINCIPLE. Was a tinted rounded panel;
            the payoff now reads through scale and rule weight, the same
            device Framework 01's VerdictReadout and Framework 02's core
            statements use — no background fill.
           ================================================================ */}
        <section id="principle" className="mt-32">
          <AnnotatedBlock>
            <div className="border-t-2 border-ink pt-8">
              <p
                className="font-editorial text-ink"
                style={{ fontSize: "clamp(28px, 3.6vw, 42px)", lineHeight: 1.2 }}
              >
                Setup grading is not prediction.
              </p>
              <div className="mt-6 flex flex-col gap-4 text-[19px] leading-[1.75] text-ink-soft">
                <p>An A-grade setup can fail. A C-grade setup can run.</p>
                <p>
                  The framework is not trying to forecast outcomes. It is trying to improve
                  decision quality.
                </p>
              </div>
              <p className="mt-6 font-display text-2xl font-bold text-ink">Judge the process. Not the result.</p>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            10 — WHAT THIS FRAMEWORK IS NOT.
           ================================================================ */}
        <section id="not-this" className="mt-32">
          <AnnotatedBlock gloss="Scope">
            <div className="border-t border-rule pt-8">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                What This Framework Is Not
              </h2>
              <div className="mt-8 flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  <strong className="font-semibold text-ink">It Is Not A Prediction Engine.</strong>{" "}
                  The grade describes the quality of the opportunity as it exists now. It says
                  nothing about what happens next.
                </p>
                <p>
                  <strong className="font-semibold text-ink">It Is Not A Single Checklist.</strong>{" "}
                  Defining conditions and improving conditions are different things. Mixing them
                  into one score lets a strong total paper over a fatal weakness. The layers
                  exist to keep them apart.
                </p>
                <p>
                  <strong className="font-semibold text-ink">It Is Not A Position Size.</strong>{" "}
                  The grade ranks opportunities. It does not calculate how much capital they
                  receive. That is the next framework.
                </p>
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            11 — THE HANDOFF.
           ================================================================ */}
        <section id="handoff" className="mt-32">
          <AnnotatedBlock gloss="Continuity">
            <div className="border-t border-rule pt-8">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                The Handoff
              </h2>
              <div className="mt-8 flex flex-col gap-6">
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    Framework 03 answered
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    &ldquo;Which setups deserve capital?&rdquo;
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                    Framework 04 answers
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    &ldquo;How much?&rdquo;
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <HandoffArrow />
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            11B — RELATED TOOLS. The calculators that put a graded setup's
            payoff and its process-level track record into a number.
           ================================================================ */}
        <section id="related-tools" className="mt-32">
          <AnnotatedBlock gloss="Put into practice">
            <div className="border-t border-rule pt-8">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                Related Tools
              </h2>
              <div className="mt-8 flex flex-col gap-6">
                <div>
                  <Link
                    href="/tools/risk-reward-calculator"
                    className="group inline-flex w-fit items-baseline gap-1.5 font-display text-[19px] font-medium text-growth hover:text-growth-deep"
                  >
                    Risk–Reward Ratio Calculator
                    <ArrowRight className="h-4 w-4 shrink-0 self-center transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
                    Check the payoff a setup offers before it clears the integrity gates above.
                  </p>
                </div>
                <div>
                  <Link
                    href="/tools/trading-expectancy-calculator"
                    className="group inline-flex w-fit items-baseline gap-1.5 font-display text-[19px] font-medium text-growth hover:text-growth-deep"
                  >
                    Trading Expectancy Calculator
                    <ArrowRight className="h-4 w-4 shrink-0 self-center transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
                    Test whether grading is actually producing a positive-expectancy process.
                  </p>
                </div>
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            12 — VERSION NOTE + EMAIL CAPTURE.
           ================================================================ */}
        <section id="closing" className="mt-32">
          <AnnotatedBlock gloss="Version log">
            <div className="border-t-2 border-ink pt-8">
              <p className="font-mono text-[13px] leading-relaxed text-ink-faint">
                Version 0.1 — Scoring anchors and gate thresholds are provisional and will be
                refined as the framework evolves.
              </p>
            </div>
          </AnnotatedBlock>

          <div className="mt-14">
            <AnnotatedBlock>
              <EmailCapture context="Frameworks are revised as the market teaches us something. Subscribers get the revision and the reason." />
            </AnnotatedBlock>
          </div>
        </section>
      </div>
    </div>
  );
}

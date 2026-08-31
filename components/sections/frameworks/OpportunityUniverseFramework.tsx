"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { Byline } from "@/components/ui/vsc/Byline";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { formatLongDate } from "@/lib/format-date";
import { PipelineStrip } from "./PipelineStrip";
import { OpportunityFunnelExhibit, TopDownFlowExhibit } from "./OpportunityUniverseExhibits";

/**
 * Framework 02 — Opportunity Universe. Ported onto the editorial reading
 * system established at Framework 01 (Market Environment): the same
 * running section rail, AnnotatedBlock margin glosses, GhostNumeral
 * chapter openers, rule-based exhibit chrome, and typography roles. Every
 * word, heading, value, threshold and link below is unchanged from the
 * previous implementation of this page — only the presentation layer is
 * new, and only where this page's own content asked for a different shape
 * (four numbered "Cuts" instead of three scored factors; comparison and
 * looking-for/avoiding lists instead of a verdict readout).
 *
 * Two incidental bugs fixed during the port, both pre-existing on this
 * page and unrelated to content: `PrincipleBlock` and the Exhibit 1
 * caption used Tailwind's `italic` utility, which this codebase's global
 * `.italic` class (see app/globals.css) also uses to force `color:
 * var(--ink)` — silently overriding the intended muted/faint colour. Both
 * now use inline `fontStyle` instead (same fix already applied on
 * Framework 01).
 */

const PUBLISHED_DATE = "2026-08-06";
const CANONICAL = "/frameworks/opportunity-universe";

const EXCLUSIONS: { category: string; reason: string }[] = [
  { category: "SME Stocks", reason: "Outside preferred trading universe" },
  { category: "Penny Stocks", reason: "Lower quality participation and execution" },
  { category: "Frequent Circuit Stocks", reason: "Difficult risk management" },
  { category: "Market Cap < ₹3,000 Cr", reason: "Outside preferred universe" },
];

const FILTERS: { filter: string; threshold: string }[] = [
  { filter: "Price", threshold: "> ₹50" },
  { filter: "Average Daily Traded Value", threshold: "> ₹5 Cr" },
  { filter: "Average Daily Range (ADR)", threshold: "> 3%" },
];

const LOOKING_FOR = ["Liquidity", "Participation", "Consistent movement", "Efficient execution"];
const AVOIDING = ["Thinly traded stocks", "Inactive stocks", "Low-volatility names"];

const EVIDENCE = [
  "Relative strength of sector indices versus the broader market",
  "Sector performance heatmaps",
  "Visual review of sector charts",
  "New highs and participation within sectors",
  "Relative strength rankings of leading stocks",
];

const CHART_REVIEW_ITEMS = [
  "Trend structure",
  "Relative strength",
  "Volume behavior",
  "Consolidation quality",
  "Breakout potential",
  "Risk-reward characteristics",
];

const SECTIONS = [
  { n: "00", id: "identity", label: "Identity" },
  { n: "01", id: "funnel", label: "The funnel" },
  { n: "02", id: "pipeline", label: "Pipeline" },
  { n: "03", id: "exclusions", label: "Cut 1" },
  { n: "04", id: "filters", label: "Cut 2" },
  { n: "05", id: "leadership", label: "Cut 3" },
  { n: "06", id: "chart-review", label: "Cut 4" },
  { n: "07", id: "relationship", label: "Relationship" },
  { n: "08", id: "not-this", label: "Not this" },
  { n: "09", id: "handoff", label: "Handoff" },
  { n: "10", id: "closing", label: "Closing" },
] as const;

/** Same IntersectionObserver scrollspy pattern as Framework 01. */
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

/** Running folio — rotated spine label plus a plain numbered section list.
 *  Identical mechanism to Framework 01's rail; only the spine text and
 *  section list are page-specific. */
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
        Opportunity Universe — Framework 02
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

/** Margin-gloss / content pairing — identical to Framework 01's AnnotatedBlock. */
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

/** Scrolls an exhibit's SVG at natural size on narrow screens instead of
 *  shrinking every label to illegible text. */
function ExhibitScroll({ minWidth, children }: { minWidth: number; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth }}>{children}</div>
    </div>
  );
}

/** Outlined numeral bleeding behind a Cut's opening — reserved for the four
 *  numbered universe-narrowing cuts, the same role GhostNumeral plays for
 *  Framework 01's three scored factors. */
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

/** A methodological aside built from a rule instead of a background fill —
 *  same role and shape as Framework 01's Note. */
function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-ink pl-6">
      <p className="font-mono text-[13px] leading-relaxed text-ink-muted">{children}</p>
    </div>
  );
}

/**
 * A short, aphoristic statement of intent — the "why" behind a cut. Kept
 * distinct from Note (a caveat about a threshold) because the content role
 * genuinely differs: conviction, not disclaimer. Framework 01 has no
 * equivalent block because none of its content needed one.
 */
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[19px] leading-[1.75] text-ink-soft">
          <span className="mt-[13px] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Filter/threshold table — same heavy-rule chrome as Framework 01's
 *  revision-history table, not a bordered card. */
function DataTable({ headers, rows }: { headers: [string, string]; rows: { label: string; value: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse font-mono text-[13px]">
        <thead>
          <tr className="border-b-2 border-ink">
            <th className="py-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              {headers[0]}
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              {headers[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i > 0 ? "border-t border-rule" : undefined}>
              <td className="py-3 pr-4 align-top font-semibold text-ink">{row.label}</td>
              <td className="px-4 py-3 align-top text-ink-soft">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The tiny chapter-transition diagram for the Handoff section. Deliberately
 * not given Exhibit numbering — the original design intent (see the prose
 * below) is that this is punctuation for the closing thought, not a
 * diagram carrying independent information, and that distinction is
 * content, not styling, so the port preserves it.
 */
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
      <title id="handoff-arrow-title">Opportunity Universe hands off to Setup Grading.</title>
      <rect x={boxX} y={0} width={boxW} height={boxH} rx={8} fill="var(--canvas-sunk)" stroke="var(--rule)" />
      <text x={cx} y={boxH / 2 + 5} textAnchor="middle" style={{ font: "600 13px var(--font-mono)", fill: "var(--ink)" }}>
        Opportunity Universe
      </text>

      <line
        x1={cx}
        y1={boxH}
        x2={cx}
        y2={box2Y}
        stroke="var(--ink-faint)"
        strokeWidth={1.5}
        markerEnd="url(#arrowhead-handoff)"
      />

      <rect x={boxX} y={box2Y} width={boxW} height={boxH} rx={8} fill="var(--canvas-sunk)" stroke="var(--rule)" />
      <text x={cx} y={box2Y + boxH / 2 + 5} textAnchor="middle" style={{ font: "600 13px var(--font-mono)", fill: "var(--ink)" }}>
        Setup Grading
      </text>

      <defs>
        <marker id="arrowhead-handoff" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--ink-faint)" />
        </marker>
      </defs>
    </svg>
  );
}

export function OpportunityUniverseFramework() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Opportunity Universe — Framework 02, the VSC Decision Pipeline",
    description:
      "The second stage of the VSC Decision Pipeline: a systematic process — structural exclusions, tradability filters, sector and theme leadership, and manual chart review — that reduces roughly 2,000 listed stocks into a working watchlist of 20 to 40 names.",
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
            Framework 02 · Opportunity Universe
          </span>

          <h1
            className="mt-5 font-display font-bold text-ink"
            style={{ fontSize: "clamp(48px, 10vw, 132px)", lineHeight: 0.9, letterSpacing: "-0.035em" }}
          >
            Opportunity Universe
          </h1>

          {/* Mobile-only fallback for the metadata that otherwise lives in
              the lg+ margin column below. */}
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-ink-muted lg:hidden">
            <span>v0.1</span>
            <span aria-hidden="true">·</span>
            <span>{formatLongDate(PUBLISHED_DATE)}</span>
            <span aria-hidden="true">·</span>
            <span>~7 min read</span>
            <span aria-hidden="true">·</span>
            <Byline variant="compact" />
          </div>

          <div className="mt-10 lg:mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
              <div className="hidden lg:col-span-2 lg:flex lg:flex-col lg:gap-2.5">
                <span className="font-mono text-[11px] text-ink-muted">v0.1</span>
                <span className="font-mono text-[11px] text-ink-muted">{formatLongDate(PUBLISHED_DATE)}</span>
                <span className="font-mono text-[11px] text-ink-muted">~7 min read</span>
                <Byline variant="full" className="mt-2" />
              </div>

              <div className="lg:col-span-7 lg:col-start-3">
                <p
                  className="font-editorial text-ink"
                  style={{ fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.18, letterSpacing: "-0.01em" }}
                >
                  What stocks deserve attention?
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================
            01 — THE FUNNEL. Payoff first: teaser question, then the funnel
            exhibit immediately, then the fuller explanation — same order
            as production, just re-typeset.
           ================================================================ */}
        <section id="funnel" className="mb-32 flex flex-col gap-14">
          <AnnotatedBlock>
            <p className="text-[19px] leading-[1.75] text-ink-soft">
              I have roughly 2,000 listed stocks and limited time. Where should I
              focus? This framework narrows. It does not judge.
            </p>
          </AnnotatedBlock>

          <AnnotatedBlock span={10}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <figure className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                  <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    Exhibit 01 — Opportunity Funnel
                  </figcaption>
                </div>
                <div className="mt-8">
                  <ExhibitScroll minWidth={600}>
                    <OpportunityFunnelExhibit />
                  </ExhibitScroll>
                </div>
                <p className="mt-4 max-w-[60ch] font-mono text-[12px] leading-relaxed text-ink-faint" style={{ fontStyle: "italic" }}>
                  Illustrative counts. Actual numbers vary with market conditions.
                </p>
              </figure>

              <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                <span className="font-display text-[64px] font-bold leading-none text-rule-strong">01</span>
              </div>
            </div>
          </AnnotatedBlock>

          <AnnotatedBlock gloss="Purpose">
            <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
              <p>This framework exists to answer that question.</p>
              <p>Its purpose is not to predict winners.</p>
              <p>
                Its purpose is to systematically reduce a large universe of stocks into a
                manageable set of opportunities worthy of further study.
              </p>
              <p>Judgment comes later.</p>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            02 — PIPELINE. Reuses the shared PipelineStrip component
            unchanged (Frameworks 03–05 still depend on its current
            styling), set inside the same margin-gloss grid as everything
            else on the page.
           ================================================================ */}
        <section id="pipeline" className="mb-32">
          <AnnotatedBlock span={10} gloss="Pipeline">
            <PipelineStrip activeIndex={1} />
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            03 — CUT 1: STRUCTURAL EXCLUSIONS. The four numbered cuts reuse
            Framework 01's chapter-opening pattern (ghost numeral + heavy
            rule) since each is genuinely a discrete, sequential narrowing
            stage — the same structural role Framework 01's three factors
            play, just four of them instead of three.
           ================================================================ */}
        <section id="exclusions" className="relative mt-32">
          <GhostNumeral>1</GhostNumeral>

          <AnnotatedBlock gloss="Cut 1 of 4">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
              >
                Cut 1 — Structural Exclusions
              </h2>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-10">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  Before searching for opportunities, I remove stocks that fall outside my
                  investable universe.
                </p>
                <p>These exclusions exist regardless of how attractive a chart may appear.</p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Exclusions">
              <div className="border-t-2 border-ink">
                {EXCLUSIONS.map((e, i) => (
                  <div
                    key={e.category}
                    className={`flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6 ${
                      i > 0 ? "border-t border-rule" : ""
                    }`}
                  >
                    <span className="w-56 shrink-0 font-mono text-[13px] font-semibold text-clay">
                      {e.category}
                    </span>
                    <span className="font-mono text-[13px] text-ink">{e.reason}</span>
                  </div>
                ))}
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock>
              <PrincipleBlock>
                <p>A good chart does not compensate for poor tradability.</p>
                <p className="mt-3 font-normal" style={{ fontStyle: "normal" }}>
                  The goal is not to find every opportunity.
                  <br />
                  The goal is to find opportunities that can actually be traded.
                </p>
              </PrincipleBlock>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            04 — CUT 2: TRADABILITY FILTERS.
           ================================================================ */}
        <section id="filters" className="relative mt-32">
          <GhostNumeral>2</GhostNumeral>

          <AnnotatedBlock gloss="Cut 2 of 4">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
              >
                Cut 2 — Tradability Filters
              </h2>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-10">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  After structural exclusions, I focus on stocks that are liquid enough to
                  trade and active enough to generate meaningful movement.
                </p>
                <p>This is a quantitative filter.</p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Thresholds">
              <div className="flex flex-col gap-6">
                <DataTable headers={["Filter", "Threshold"]} rows={FILTERS.map((f) => ({ label: f.filter, value: f.threshold }))} />
                <Note>
                  <em>Thresholds are provisional and will be refined as the framework evolves.</em>
                </Note>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Screen">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="border-t-2 border-ink pt-4">
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                    Looking For
                  </span>
                  <ul className="mt-4 flex flex-col gap-3">
                    {LOOKING_FOR.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
                        <Check className="mt-[3px] h-4 w-4 shrink-0 text-growth" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t-2 border-ink pt-4">
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
                    Avoiding
                  </span>
                  <ul className="mt-4 flex flex-col gap-3">
                    {AVOIDING.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
                        <X className="mt-[3px] h-4 w-4 shrink-0 text-clay" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock>
              <PrincipleBlock>
                Liquidity creates opportunity.
                <br />
                Volatility creates potential.
                <br />
                Both are required.
              </PrincipleBlock>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            05 — CUT 3: SECTOR & THEME LEADERSHIP.
           ================================================================ */}
        <section id="leadership" className="relative mt-32">
          <GhostNumeral>3</GhostNumeral>

          <AnnotatedBlock gloss="Cut 3 of 4">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(36px, 5.4vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
              >
                Cut 3 — Sector &amp; Theme Leadership
              </h2>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-10">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>This is where the framework shifts from screening to context.</p>
                <p>I rarely begin with a stock.</p>
                <p>I begin with leadership.</p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 02 — Direction of Analysis
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={700}>
                      <TopDownFlowExhibit />
                    </ExhibitScroll>
                  </div>
                </figure>

                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">02</span>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock>
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                Before looking for individual names, I want to understand where capital is
                flowing.
              </p>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Evidence">
              <div className="flex flex-col gap-6">
                <p className="text-[19px] leading-[1.75] text-ink-soft">
                  No single indicator determines leadership. Instead, I look for alignment
                  across multiple signals:
                </p>
                <BulletList items={EVIDENCE} />
                <p className="text-[19px] leading-[1.75] text-ink-soft">
                  Sector leadership is confirmed when multiple pieces of evidence point in the
                  same direction.
                </p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock>
              <PrincipleBlock>
                Strong stocks often emerge from strong sectors.
                <br />
                Strong sectors often emerge from favorable market conditions.
                <br />
                The objective is not to predict future leadership.
                <br />
                The objective is to identify existing leadership.
              </PrincipleBlock>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            06 — CUT 4: MANUAL CHART REVIEW.
           ================================================================ */}
        <section id="chart-review" className="relative mt-32">
          <GhostNumeral>4</GhostNumeral>

          <AnnotatedBlock gloss="Cut 4 of 4">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(36px, 5.4vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
              >
                Cut 4 — Manual Chart Review
              </h2>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-10">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>This is the first subjective step.</p>
                <p>Everything before this stage can be filtered.</p>
                <p>This stage requires judgment.</p>
                <p>
                  By this point, the universe has already been reduced significantly. I now
                  manually review approximately 100–150 charts.
                </p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="What I review">
              <BulletList items={CHART_REVIEW_ITEMS} />
            </AnnotatedBlock>

            <AnnotatedBlock>
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                This stage transforms a filtered universe into a practical watchlist.
              </p>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            07 — FRAMEWORK RELATIONSHIP. Not a numbered cut — no ghost
            numeral — this is a synthesis exhibit, the same structural role
            Framework 01's Exposure ladder plays.
           ================================================================ */}
        <section id="relationship" className="mt-32">
          <AnnotatedBlock span={10} gloss="Relationship">
            <figure>
              <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                  Exhibit 03 — Framework Relationship
                </figcaption>
              </div>

              <div className="mt-8 grid gap-8 border-t-2 border-ink pt-6 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-rule">
                <div className="sm:pr-8">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    Framework 01
                  </span>
                  <h3 className="mt-2 font-display text-xl font-medium text-ink">Market Environment</h3>
                  <dl className="mt-6 flex flex-col gap-4">
                    <div>
                      <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Question</dt>
                      <dd className="mt-1 text-[15px] text-ink">How aggressive should I be?</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Output</dt>
                      <dd className="mt-1 text-[15px] text-ink">Aggressive / Neutral / Defensive</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Purpose</dt>
                      <dd className="mt-1 text-[15px] text-ink">Determine exposure</dd>
                    </div>
                  </dl>
                </div>
                <div className="sm:pl-8">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                    Framework 02
                  </span>
                  <h3 className="mt-2 font-display text-xl font-medium text-ink">Opportunity Universe</h3>
                  <dl className="mt-6 flex flex-col gap-4">
                    <div>
                      <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Question</dt>
                      <dd className="mt-1 text-[15px] text-ink">Where should I focus my attention?</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Output</dt>
                      <dd className="mt-1 text-[15px] font-semibold text-growth">Working Watchlist</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Purpose</dt>
                      <dd className="mt-1 text-[15px] text-ink">Determine opportunity</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <p className="mt-8 text-[16px] leading-relaxed text-ink-soft">
                The two frameworks operate independently.
                <br />
                Framework 01 determines how much risk I am willing to take.
                <br />
                Framework 02 determines where I am willing to look.
              </p>
            </figure>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            08 — WHAT THIS FRAMEWORK IS NOT.
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
                  <strong className="font-semibold text-ink">It Is Not A Prediction System.</strong>{" "}
                  The framework does not attempt to identify the next winning stock.
                </p>
                <p>
                  <strong className="font-semibold text-ink">It Is Not A Fundamental Screener.</strong>{" "}
                  Because my holding periods are typically measured in days rather than years,
                  valuation metrics such as PE, PB, or dividend yield are not primary inputs.
                </p>
                <p>
                  <strong className="font-semibold text-ink">It Is Not An Automated Buy List.</strong>{" "}
                  The framework identifies candidates. Trade selection happens later.
                </p>
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            09 — THE HANDOFF. Reads fast, like a chapter transition — the
            HandoffArrow diagram stays un-numbered per its original intent.
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
                    Framework 02 answered
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    &ldquo;Where should I look?&rdquo;
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                    Framework 03 answers
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    &ldquo;Which opportunity deserves capital?&rdquo;
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
            10 — VERSION NOTE + EMAIL CAPTURE.
           ================================================================ */}
        <section id="closing" className="mt-32">
          <AnnotatedBlock gloss="Version log">
            <div className="border-t-2 border-ink pt-8">
              <p className="font-mono text-[13px] leading-relaxed text-ink-faint">
                Version 0.1 — Thresholds and counts are provisional and will be refined as the
                framework evolves.
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

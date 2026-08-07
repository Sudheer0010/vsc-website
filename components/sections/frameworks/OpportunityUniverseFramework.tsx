import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { PipelineStrip } from "./PipelineStrip";
import { OpportunityFunnelExhibit, TopDownFlowExhibit } from "./OpportunityUniverseExhibits";

const PUBLISHED_DATE = "2026-08-06";
const CANONICAL = "/frameworks/opportunity-universe";
const PROSE = "max-w-[62ch]";

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

function ProvisionalNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="border-l-2 py-1 pl-5 font-mono text-[13px] leading-relaxed text-ink-faint"
      style={{ borderColor: "var(--rule)" }}
    >
      {children}
    </div>
  );
}

/**
 * A short, aphoristic statement of intent — the "why" behind a cut, set off
 * from the surrounding prose. Same left-bordered shape as ProvisionalNote
 * (the site's other margin note), but in body face rather than mono and
 * without the caveat tone, since these are convictions, not disclaimers.
 */
function PrincipleBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="border-l-2 py-1 pl-5 text-[16px] italic leading-relaxed text-ink-muted"
      style={{ borderColor: "var(--rule-strong)" }}
    >
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-ink-soft">
          <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: [string, string];
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-vsc-lg border border-rule">
      <table className="w-full min-w-[480px] border-collapse font-mono text-[13px]">
        <thead>
          <tr className="border-b border-rule bg-canvas-sunk">
            <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              {headers[0]}
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              {headers[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i > 0 ? "border-t border-rule" : undefined}>
              <td className="px-4 py-3 align-top font-semibold text-ink">{row.label}</td>
              <td className="px-4 py-3 align-top text-ink-soft">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExclusionChip({ category, reason }: { category: string; reason: string }) {
  return (
    <div className="rounded-vsc-lg border border-clay/20 bg-clay-tint p-5">
      <div className="flex items-start gap-2.5">
        <X className="mt-[3px] h-4 w-4 shrink-0 text-clay" strokeWidth={2.5} />
        <div>
          <div className="font-mono text-[14px] font-bold leading-tight text-ink">{category}</div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">{reason}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * The tiny chapter-transition diagram for the Handoff section — two boxes,
 * one arrow. Deliberately not an Exhibit: it's punctuation for the closing
 * thought, not a diagram that carries independent information.
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
      <title id="handoff-arrow-title">
        Opportunity Universe hands off to Setup Grading.
      </title>
      <rect x={boxX} y={0} width={boxW} height={boxH} rx={8} fill="var(--canvas-sunk)" stroke="var(--rule)" />
      <text
        x={cx}
        y={boxH / 2 + 5}
        textAnchor="middle"
        style={{ font: "600 13px var(--font-mono)", fill: "var(--ink)" }}
      >
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
      <text
        x={cx}
        y={box2Y + boxH / 2 + 5}
        textAnchor="middle"
        style={{ font: "600 13px var(--font-mono)", fill: "var(--ink)" }}
      >
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

/**
 * The Framework 01 / Framework 02 comparison card — two distinct card
 * components side by side rather than a table, so each framework reads as
 * its own self-contained reference rather than two rows sharing columns.
 */
function FrameworkCard({
  active,
  eyebrow,
  title,
  rows,
}: {
  active?: boolean;
  eyebrow: string;
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-vsc-lg p-6 sm:p-7 ${
        active ? "border-l-[3px] bg-growth-tint" : "border border-rule bg-canvas-sunk"
      }`}
      style={active ? { borderLeftColor: "var(--growth)" } : undefined}
    >
      <span
        className={`font-mono text-[11px] font-semibold uppercase tracking-[0.14em] ${
          active ? "text-growth" : "text-ink-faint"
        }`}
      >
        {eyebrow}
      </span>
      <h3 className="mt-2 font-display text-xl font-medium text-ink">{title}</h3>
      <dl className="mt-6 flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              {row.label}
            </dt>
            <dd className="mt-1 text-[15px] text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Framework 02 of the VSC Decision Pipeline. Reuses the shell and
 * conventions established by Framework 01 (Market Environment): the same
 * 820px container, the same PROSE/full-width "two widths" rule, the same
 * numbered-Exhibit and provisional-note treatments.
 *
 * Page order puts the payoff first: a short teaser question, then the
 * funnel exhibit immediately — before the fuller explanation of what the
 * framework does. The pipeline map is a compact wayfinding strip (see
 * `PipelineStrip`) placed after that explanation, not competing with the
 * funnel for attention at the top. Four cuts follow in sequence, each
 * narrowing the universe further, then how this relates to Framework 01,
 * what it is not, and the handoff to Framework 03.
 */
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
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress />
      <Navbar />
      <PaperGrain />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container mx-auto max-w-[820px] px-4 sm:px-6">
          <Link
            href="/frameworks"
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to the framework library
          </Link>

          {/* 1. Header */}
          <header className="mb-14">
            <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
              Framework 02 · Opportunity Universe
            </span>
            <h1 className="mb-8 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
              Opportunity Universe
            </h1>
            <p className="max-w-[600px] font-display text-[32px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              What stocks deserve attention?
            </p>
          </header>

          <div className="flex flex-col gap-14">
            {/* 2. The weekend question — trimmed teaser, just enough to earn the funnel */}
            <section className={`${PROSE} flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft`}>
              <p>
                I have roughly 2,000 listed stocks and limited time. Where should I
                focus? This framework narrows. It does not judge.
              </p>
            </section>

            {/* 3. EXHIBIT 1 — Opportunity Funnel, moved up: the framework itself,
                before any further explanation of it. */}
            <Exhibit
              number={1}
              label="Opportunity Funnel"
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <OpportunityFunnelExhibit />
              <p className="mt-5 font-mono text-[12px] italic leading-relaxed text-ink-faint">
                Illustrative counts. Actual numbers vary with market conditions.
              </p>
            </Exhibit>

            {/* 4. The fuller explanation — the rest of the original weekend-question
                prose that didn't fit in the teaser, now read against the funnel
                the reader has already seen. */}
            <section className={`${PROSE} flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft`}>
              <p>This framework exists to answer that question.</p>
              <p>Its purpose is not to predict winners.</p>
              <p>
                Its purpose is to systematically reduce a large universe of stocks into a
                manageable set of opportunities worthy of further study.
              </p>
              <p>Judgment comes later.</p>
            </section>

            {/* 5. Pipeline map — a compact wayfinding strip, not a competing
                exhibit. See PipelineStrip.tsx; this same component is meant to
                be reused for Frameworks 03, 04, and 05. */}
            <PipelineStrip activeIndex={1} />

            {/* 6. Cut 1 — Structural Exclusions */}
            <section className="flex flex-col gap-6">
              <div className={`${PROSE} flex flex-col gap-5`}>
                <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                  Cut 1 — Structural Exclusions
                </h2>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  Before searching for opportunities, I remove stocks that fall outside my
                  investable universe.
                </p>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  These exclusions exist regardless of how attractive a chart may appear.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {EXCLUSIONS.map((e) => (
                  <ExclusionChip key={e.category} category={e.category} reason={e.reason} />
                ))}
              </div>

              <PrincipleBlock>
                <p>A good chart does not compensate for poor tradability.</p>
                <p className="mt-3 not-italic font-normal">
                  The goal is not to find every opportunity.
                  <br />
                  The goal is to find opportunities that can actually be traded.
                </p>
              </PrincipleBlock>
            </section>

            {/* 7. Cut 2 — Tradability Filters */}
            <section className="flex flex-col gap-6">
              <div className={`${PROSE} flex flex-col gap-5`}>
                <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                  Cut 2 — Tradability Filters
                </h2>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  After structural exclusions, I focus on stocks that are liquid enough to
                  trade and active enough to generate meaningful movement.
                </p>
                <p className="text-[17px] leading-relaxed text-ink-soft">This is a quantitative filter.</p>
              </div>

              <div className="flex flex-col gap-4">
                <DataTable
                  headers={["Filter", "Threshold"]}
                  rows={FILTERS.map((f) => ({ label: f.filter, value: f.threshold }))}
                />
                <ProvisionalNote>
                  <em>Thresholds are provisional and will be refined as the framework evolves.</em>
                </ProvisionalNote>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-vsc-lg border border-growth/30 bg-growth-tint p-6">
                  <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                    Looking For
                  </span>
                  <ul className="flex flex-col gap-3">
                    {LOOKING_FOR.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
                        <Check className="mt-[3px] h-4 w-4 shrink-0 text-growth" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-vsc-lg border border-clay/30 bg-clay-tint p-6">
                  <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
                    Avoiding
                  </span>
                  <ul className="flex flex-col gap-3">
                    {AVOIDING.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
                        <X className="mt-[3px] h-4 w-4 shrink-0 text-clay" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <PrincipleBlock>
                Liquidity creates opportunity.
                <br />
                Volatility creates potential.
                <br />
                Both are required.
              </PrincipleBlock>
            </section>

            {/* 8. Cut 3 — Sector & Theme Leadership */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                Cut 3 — Sector &amp; Theme Leadership
              </h2>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                This is where the framework shifts from screening to context.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">I rarely begin with a stock.</p>
              <p className="text-[17px] leading-relaxed text-ink-soft">I begin with leadership.</p>
            </section>

            {/* 9. EXHIBIT 2 — Top-Down Flow */}
            <Exhibit
              number={2}
              label="Direction of Analysis"
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <TopDownFlowExhibit />
            </Exhibit>

            {/* 10. Cut 3 continued — Evidence */}
            <section className={`${PROSE} flex flex-col gap-6`}>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Before looking for individual names, I want to understand where capital is
                flowing.
              </p>

              <div className="flex flex-col gap-4">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Evidence I Use
                </h3>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  No single indicator determines leadership.
                </p>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  Instead, I look for alignment across multiple signals:
                </p>
                <BulletList items={EVIDENCE} />
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  Sector leadership is confirmed when multiple pieces of evidence point in the
                  same direction.
                </p>
              </div>

              <PrincipleBlock>
                Strong stocks often emerge from strong sectors.
                <br />
                Strong sectors often emerge from favorable market conditions.
                <br />
                The objective is not to predict future leadership.
                <br />
                The objective is to identify existing leadership.
              </PrincipleBlock>
            </section>

            {/* 11. Cut 4 — Manual Chart Review */}
            <section className={`${PROSE} flex flex-col gap-6`}>
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                  Cut 4 — Manual Chart Review
                </h2>
                <p className="text-[17px] leading-relaxed text-ink-soft">This is the first subjective step.</p>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  Everything before this stage can be filtered.
                </p>
                <p className="text-[17px] leading-relaxed text-ink-soft">This stage requires judgment.</p>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  By this point, the universe has already been reduced significantly. I now
                  manually review approximately 100–150 charts.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  What I Review
                </h3>
                <BulletList items={CHART_REVIEW_ITEMS} />
              </div>

              <p className="text-[17px] leading-relaxed text-ink-soft">
                This stage transforms a filtered universe into a practical watchlist.
              </p>
            </section>

            {/* 12. EXHIBIT 3 — Framework 01 vs Framework 02 */}
            <Exhibit
              number={3}
              label="Framework Relationship"
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FrameworkCard
                  eyebrow="Framework 01"
                  title="Market Environment"
                  rows={[
                    { label: "Question", value: "How aggressive should I be?" },
                    { label: "Output", value: "Aggressive / Neutral / Defensive" },
                    { label: "Purpose", value: "Determine exposure" },
                  ]}
                />
                <FrameworkCard
                  active
                  eyebrow="Framework 02"
                  title="Opportunity Universe"
                  rows={[
                    { label: "Question", value: "Where should I focus my attention?" },
                    { label: "Output", value: "Working Watchlist" },
                    { label: "Purpose", value: "Determine opportunity" },
                  ]}
                />
              </div>
              <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">
                The two frameworks operate independently.
                <br />
                Framework 01 determines how much risk I am willing to take.
                <br />
                Framework 02 determines where I am willing to look.
              </p>
            </Exhibit>

            {/* 13. What This Framework Is Not */}
            <section className={PROSE}>
              <h2 className="mb-4 font-display text-2xl font-normal text-ink sm:text-3xl">
                What This Framework Is Not
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
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
            </section>

            {/* 14. The Handoff — reads fast, like a chapter transition */}
            <section className={PROSE}>
              <h2 className="mb-6 font-display text-2xl font-normal text-ink sm:text-3xl">The Handoff</h2>
              <div className="flex flex-col gap-6">
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    Framework 02 answered
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    “Where should I look?”
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                    Framework 03 answers
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    “Which opportunity deserves capital?”
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <HandoffArrow />
              </div>
            </section>

            {/* 15. Version note */}
            <div className="border-t border-rule pt-8">
              <p className="font-mono text-[13px] leading-relaxed text-ink-faint">
                Version 0.1 — Thresholds and counts are provisional and will be refined as the
                framework evolves.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

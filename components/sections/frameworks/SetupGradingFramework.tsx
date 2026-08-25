import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { PipelineStrip } from "./PipelineStrip";
import {
  ThreeLayersExhibit,
  IntegrityGatesExhibit,
  QualityScorecardExhibit,
  TwoRejectionsExhibit,
  GradeBadge,
  type Grade,
} from "./SetupGradingExhibits";

const PUBLISHED_DATE = "2026-08-07";
const CANONICAL = "/frameworks/setup-grading";
const PROSE = "max-w-[62ch]";

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

/**
 * A short, aphoristic statement of intent — same left-bordered, italic,
 * non-mono treatment used on Framework 02 for the same purpose.
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

/**
 * Distinct from PrincipleBlock on purpose: three of the five dimension
 * tables need a clarification that reads as more than throwaway small
 * print — "0 here means cleared the gate, not failed." A tinted panel
 * with a solid left border pulls more attention than a bare rule would.
 */
function ClarificationNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-vsc-md border-l-[3px] bg-growth-tint py-3 pl-4 pr-4 text-[14px] leading-relaxed text-ink-soft"
      style={{ borderLeftColor: "var(--growth)" }}
    >
      {children}
    </div>
  );
}

function AnchorTable({ rows }: { rows: AnchorRow[] }) {
  const scoreColor: Record<number, string> = { 2: "text-growth", 1: "text-ink", 0: "text-ink-faint" };
  return (
    <div className="overflow-x-auto rounded-vsc-lg border border-rule">
      <table className="w-full min-w-[480px] border-collapse font-mono text-[13px]">
        <thead>
          <tr className="border-b border-rule bg-canvas-sunk">
            <th className="w-16 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              Score
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              What it looks like
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.score} className={i > 0 ? "border-t border-rule" : undefined}>
              <td className={`px-4 py-3 align-top font-bold ${scoreColor[row.score]}`}>{row.score}</td>
              <td className="px-4 py-3 align-top leading-relaxed text-ink-soft">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The tiny chapter-transition diagram for the Handoff section — same
 * component shape as Framework 02's, relabelled for this handoff.
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

/**
 * Framework 03 of the VSC Decision Pipeline. Reuses the shell and
 * conventions established by Frameworks 01 and 02, plus the revisions
 * made to 02: hero exhibit above the fold, a compact pipeline strip
 * instead of a competing diagram, chips/cards over tables where
 * scanability matters, and a forward-looking handoff at the close.
 *
 * The page's core structural move is keeping "gates" (Layer 2, pass/fail,
 * card treatment) and "scores" (Layer 3, 0–2 scale, table treatment)
 * visually distinct throughout — including three dimension tables that
 * carry an explicit clarification that 0 there means "cleared the gate,"
 * not "failed," since a reader arriving from Layer 2 would otherwise
 * assume the opposite.
 */
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
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress />
      <PaperGrain />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container mx-auto max-w-[820px] px-4 sm:px-6">
          <Link
            href="/research#framework-library"
            className="group mb-8 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Research
          </Link>

          {/* 1. Header */}
          <header className="mb-14">
            <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
              Framework 03 · Setup Grading
            </span>
            <h1 className="mb-8 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
              Setup Grading
            </h1>
            <p className="max-w-[600px] font-display text-[32px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              Which setups deserve capital?
            </p>
          </header>

          <div className="flex flex-col gap-14">
            {/* 2. Opener */}
            <section className={`${PROSE} flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft`}>
              <p>Not all valid setups deserve capital.</p>
              <p>A setup can be technically valid and still be a poor allocation of risk.</p>
              <p>This framework does not predict outcomes. It ranks opportunities.</p>
              <p>It exists to create scarcity and force selectivity.</p>
            </section>

            {/* 3. EXHIBIT 1 — The Three Layers. The hero: dominant, above the fold. */}
            <div className="flex flex-col gap-6">
              <Exhibit
                number={1}
                label="The Three Layers"
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
                <ThreeLayersExhibit />
              </Exhibit>

              <div className={`${PROSE} flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft`}>
                <p>Each layer answers a different question, and the order matters.</p>
                <p>
                  Eligibility asks whether the pattern is one I trade at all. Integrity asks
                  whether this instance satisfies that pattern&apos;s non-negotiable rules.
                  Only what survives both gets scored.
                </p>
                <p>Grading a setup that fails either layer is wasted work.</p>
              </div>
            </div>

            {/* 4. Pipeline map — compact wayfinding strip, stage 3 active */}
            <PipelineStrip activeIndex={2} />

            {/* 5. Why This Framework Exists */}
            <section className={`${PROSE} flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft`}>
              <p>Most traders evaluate setups using feelings.</p>
              <p>They see a chart. They like the story. They like the sector. They imagine the upside.</p>
              <p>Then they enter.</p>
              <p>Subjective conviction is not a repeatable process.</p>
              <p>
                Every setup is evaluated against the same criteria, in the same order, so the
                decision to allocate capital is made the same way every time.
              </p>
              <p>The framework sits between observation and action.</p>
            </section>

            {/* 6. Layer 1 — Eligibility */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">Layer 1 — Eligibility</h2>
              <p className="text-[15px] italic text-ink-faint">Question: Is this a setup I trade?</p>
              <p className="text-[17px] leading-relaxed text-ink-soft">This layer is binary and it is fast.</p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                I maintain a defined set of setups. A chart either matches one of them or it
                does not. There is no partial match, no &ldquo;close enough,&rdquo; no setup I
                invent on the spot because the chart looks interesting.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Setup Grading is pattern-agnostic from here on. Whether the opportunity is an
                OTB Breakout, a VCP, a Pole &amp; Flag, or another setup from the playbook,
                every eligible candidate moves through the same two layers that follow.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                If the chart does not match a setup I trade, it is discarded. No scoring. No
                analysis. No debate.
              </p>
            </section>

            {/* 7. Layer 2 — Integrity */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">Layer 2 — Integrity</h2>
              <p className="text-[15px] italic text-ink-faint">
                Question: Does this setup satisfy its own non-negotiable rules?
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Every setup has conditions that define it. Without them, the pattern is not a
                weaker version of itself — it is a different chart.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                A Pole &amp; Flag without a pole is not a weak Pole &amp; Flag. There is no
                setup.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                These are gates, not scores. Each one is pass or fail, with nothing in between.
              </p>
            </section>

            {/* EXHIBIT 2 — The Integrity Gates */}
            <div className="flex flex-col gap-6">
              <Exhibit
                number={2}
                label="The Integrity Gates"
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
                <IntegrityGatesExhibit />
              </Exhibit>

              <div className={`${PROSE} flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft`}>
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
            </div>

            {/* 8. Layer 3 — Quality Score (intro) */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">Layer 3 — Quality Score</h2>
              <p className="text-[15px] italic text-ink-faint">
                Question: Among all valid setups, which deserve capital first?
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Everything reaching this layer is already a real setup that satisfies its own
                rules. The question is no longer whether it works. The question is how strong
                it is relative to everything else available right now.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                A good setup is rarely one thing. It is usually several favourable conditions
                appearing at the same time.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Note the shift in wording between Layer 2 and Layer 3. Layer 2 asks whether
                volume is present. Layer 3 asks how exceptional it is. Layer 2 asks whether
                relative strength is positive. Layer 3 asks how strong it is.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Defining conditions are gates. Improving conditions are scores. They are never
                mixed.
              </p>
            </section>

            {/* 9. EXHIBIT 3 — The Quality Scorecard */}
            <Exhibit
              number={3}
              label="The Quality Scorecard"
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <QualityScorecardExhibit />
            </Exhibit>

            {/* 10. Dimension sections */}
            {DIMENSIONS.map((dim) => (
              <section key={dim.name} className={`${PROSE} flex flex-col gap-5`}>
                <div>
                  <h3 className="font-display text-xl font-normal text-ink sm:text-2xl">{dim.name}</h3>
                  <p className="mt-1.5 text-[15px] italic text-ink-faint">Question: {dim.question}</p>
                </div>
                {dim.clarification && <ClarificationNote>{dim.clarification}</ClarificationNote>}
                <AnchorTable rows={dim.rows} />
                <PrincipleBlock>{dim.principle}</PrincipleBlock>
              </section>
            ))}

            {/* 11. EXHIBIT 4 — Two Rejections Are Not The Same */}
            <div className="flex flex-col gap-6">
              <Exhibit
                number={4}
                label="Two Rejections"
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
                <TwoRejectionsExhibit />
              </Exhibit>

              <div className={`${PROSE} flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft`}>
                <p>
                  A setup that violates a non-negotiable rule is not a lower-grade setup. It is
                  not a setup.
                </p>
                <p>A setup that scores poorly is still a setup. It simply did not earn capital today.</p>
              </div>
            </div>

            {/* 12. What The Grades Mean */}
            <section className={PROSE}>
              <h2 className="mb-6 font-display text-2xl font-normal text-ink sm:text-3xl">
                What The Grades Mean
              </h2>
              <div className="flex flex-col">
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
            </section>

            {/* 13. The Most Important Principle — the emotional centre of the page */}
            <div className="rounded-vsc-xl bg-growth-tint p-8 sm:p-12">
              <p className="font-display text-[24px] font-medium leading-snug text-ink sm:text-[28px]">
                Setup grading is not prediction.
              </p>
              <div className="mt-6 flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
                <p>An A-grade setup can fail. A C-grade setup can run.</p>
                <p>
                  The framework is not trying to forecast outcomes. It is trying to improve
                  decision quality.
                </p>
              </div>
              <p className="mt-6 font-display text-[22px] font-medium text-ink">
                Judge the process. Not the result.
              </p>
            </div>

            {/* 14. What This Framework Is Not */}
            <section className={PROSE}>
              <h2 className="mb-4 font-display text-2xl font-normal text-ink sm:text-3xl">
                What This Framework Is Not
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
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
            </section>

            {/* 15. The Handoff */}
            <section className={PROSE}>
              <h2 className="mb-6 font-display text-2xl font-normal text-ink sm:text-3xl">The Handoff</h2>
              <div className="flex flex-col gap-6">
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    Framework 03 answered
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    “Which setups deserve capital?”
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                    Framework 04 answers
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    “How much?”
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <HandoffArrow />
              </div>
            </section>

            {/* 16. Version note */}
            <div className="border-t border-rule pt-8">
              <p className="font-mono text-[13px] leading-relaxed text-ink-faint">
                Version 0.1 — Scoring anchors and gate thresholds are provisional and will be
                refined as the framework evolves.
              </p>
            </div>

            <div className={PROSE}>
              <EmailCapture context="Frameworks are revised as the market teaches us something. Subscribers get the revision and the reason." />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

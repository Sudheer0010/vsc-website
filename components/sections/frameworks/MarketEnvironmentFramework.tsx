import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { formatLongDate } from "@/lib/format-date";
import {
  PipelineMapExhibit,
  ScoringFlowExhibit,
  SubScoringExhibit,
  BreadthZonesExhibit,
  ExposureLadderExhibit,
  type SubScoringColumn,
} from "./MarketEnvironmentExhibits";

const PUBLISHED_DATE = "2026-08-05";
const CANONICAL = "/frameworks/market-environment";
const PROSE = "max-w-[62ch]";

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
 * A compact reference block, not a section — the reader gets the whole
 * shape of the framework in one glance before scrolling any further.
 * Deliberately tighter than the site's usual card radius (8px, not the
 * standard 14px `rounded-vsc-xl`) so it reads as a data card, not another
 * exhibit.
 */
function FrameworkSnapshot() {
  return (
    <div className="rounded-lg border border-rule bg-surface">
      <div className="border-b border-rule px-5 py-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Framework snapshot
        </span>
      </div>
      <dl className="flex flex-col">
        {SNAPSHOT_ROWS.map((row, i) => (
          <div
            key={row.label}
            className={`flex gap-6 px-5 py-3 ${i > 0 ? "border-t border-rule" : ""}`}
          >
            <dt className="w-24 shrink-0 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              {row.label}
            </dt>
            <dd className="text-[15px] text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * A full-width chapter break before each factor. The repetition — same
 * numeral treatment, same rule-above/rule-below frame — is deliberate: it's
 * what turns three sections that used to read as more body text into three
 * chapters with a beginning the reader can feel.
 */
function FactorDivider({
  number,
  name,
  question,
}: {
  number: string;
  name: string;
  question: string;
}) {
  return (
    <div className="mt-6">
      <div className="h-px w-full bg-rule" />
      <div className="py-10 sm:py-14">
        <div className="flex items-start justify-between gap-6">
          <span className="font-display text-[48px] font-normal leading-none text-ink sm:text-[64px]">
            {number}
          </span>
          <span className="mt-2 shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
            Factor
          </span>
        </div>
        <h2 className="mt-4 font-display text-[28px] font-normal leading-tight text-ink sm:text-[32px]">
          {name}
        </h2>
        <p className="mt-2 text-[17px] text-ink-faint">{question}</p>
      </div>
      <div className="h-px w-full bg-rule" />
    </div>
  );
}

/**
 * The Example Reading card — a worked example of the framework's actual
 * output, positioned as the payoff after the reader has worked through all
 * three factors. Paper-toned with a green rule, not a dark band: the
 * matte-black treatment is reserved for the Inner Circle block elsewhere
 * on the site, and reusing it here would blur that signal.
 */
function VerdictBlock() {
  const checks: { factor: string; verdict: string }[] = [
    { factor: "Trend", verdict: "Positive" },
    { factor: "Breadth", verdict: "Positive" },
    { factor: "Leadership", verdict: "Positive" },
  ];

  return (
    <div
      className="rounded-vsc-xl border-l-[3px] bg-growth-tint p-8 sm:p-10"
      style={{ borderLeftColor: "var(--growth)" }}
    >
      <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-growth">
        Example reading
      </span>

      <div className="mt-6 font-display text-[56px] font-semibold leading-none text-growth sm:text-[72px]">
        Aggressive
      </div>

      <div className="mt-8 flex items-baseline justify-between border-t border-rule pt-5 font-mono text-[13px]">
        <span className="text-ink-faint">Maximum exposure</span>
        <span className="font-semibold text-ink">80–100%</span>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {checks.map((c) => (
          <div key={c.factor} className="flex items-center justify-between font-mono text-[13px]">
            <span className="text-ink-faint">{c.factor}</span>
            <span className="flex items-center gap-2 font-semibold text-growth">
              {c.verdict}
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-rule pt-5 font-mono text-[13px] text-ink-faint">
        3 of 3 factors positive.
      </p>
    </div>
  );
}

/**
 * Framework 01 of the VSC Decision Pipeline. A special-cased render inside
 * `/frameworks/[slug]` — this page carries real prose, tables, and six
 * inline-SVG exhibits, which is a different shape entirely from the
 * generic "body: string" + revision-list template the other four
 * framework stubs still use. Kept as its own component so that template
 * stays untouched for the frameworks that don't have real content yet.
 *
 * Page order is "show, then explain": snapshot → pipeline map → how it's
 * scored → the three factors → what the output means in practice → the
 * example reading → the defensive and philosophical prose. A reader who
 * stops halfway still understands the system; a reader who finishes
 * understands the reasoning behind it too.
 */
export function MarketEnvironmentFramework() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Market Environment — Framework 01, the VSC Decision Pipeline",
    description:
      "The first stage of the VSC Decision Pipeline: a three-factor, equal-weight model — Trend, Breadth, and Leadership Quality — that reads whether the market currently supports Aggressive, Neutral, or Defensive exposure.",
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
            href="/frameworks"
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to the framework library
          </Link>

          {/* 1. Header — hero statement dominates */}
          <header className="mb-14">
            <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
              Framework 01 · Market Environment
            </span>
            <h1 className="mb-8 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
              Market Environment
            </h1>
            <p className="max-w-[600px] font-display text-[32px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              The market decides
              <br />
              how aggressive you are
              <br />
              allowed to be.
            </p>
            <p className="mt-6 max-w-[600px] text-[18px] leading-relaxed text-ink-faint">
              Everything else comes later.
            </p>
            <p className={`${PROSE} mt-8 font-mono text-[13px] leading-relaxed text-ink-faint`}>
              Opportunity Universe · Setup Grading · Sizing · Trade Management — all
              depend on this first decision.
            </p>
          </header>

          <div className="flex flex-col gap-14">
            {/* 2. Framework Snapshot — the whole shape of it in one glance */}
            <div className={PROSE}>
              <FrameworkSnapshot />
            </div>

            {/* 3. EXHIBIT — Pipeline map: this is Stage 1 of 5 */}
            <Exhibit
              number={1}
              label="The five-stage pipeline"
              caption="You are reading Stage 1. Each stage feeds the next."
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <PipelineMapExhibit />
            </Exhibit>

            {/* 4. The weekend question — transition from "here's the overview" to "now here's each factor" */}
            <section className={PROSE}>
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
                  starting point. After 12–24 months of scored readings alongside actual
                  results, the data may justify weighting. Until then, each factor
                  counts as one.
                </p>
              </div>
            </section>

            {/* 5. EXHIBIT — The scoring flow */}
            <Exhibit
              number={2}
              label="The scoring flow"
              caption="The exposure figure is a ceiling, not a target. The environment gives permission; the setups downstream earn the capital. Aggressive is not &ldquo;fully invested,&rdquo; and Defensive is not &ldquo;no positions&rdquo; — each is the most risk the evidence currently allows."
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <ScoringFlowExhibit />
            </Exhibit>

            {/* FACTOR 01 — Trend */}
            <FactorDivider number="01" name="Trend" question="Is the market structurally healthy?" />

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
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
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
              </Exhibit>
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

            {/* FACTOR 02 — Breadth */}
            <FactorDivider number="02" name="Breadth" question="How many stocks are participating?" />

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
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
                <BreadthZonesExhibit />
              </Exhibit>
            </div>

            <section className={`${PROSE} flex flex-col gap-6`}>
              <div className="flex flex-col">
                {BREADTH_ROWS.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6 ${
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

            {/* FACTOR 03 — Leadership Quality */}
            <FactorDivider
              number="03"
              name="Leadership Quality"
              question="Are opportunities actually working?"
            />

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
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
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
              </Exhibit>
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

            {/* 10. EXHIBIT — Exposure ladder: what the output means in practice (unchanged — content and internals untouched) */}
            <Exhibit
              number={6}
              label="Exposure ladder"
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <ExposureLadderExhibit />
              <p className="mt-6 text-center font-display text-xl font-medium text-ink">
                Exposure is a ceiling, not a target.
              </p>
            </Exhibit>

            {/* Cash is a position — the direct explanation of what the ladder means */}
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

            {/* Example Reading — the payoff, after the reader has worked through all three factors */}
            <div>
              <VerdictBlock />
              <p className={`${PROSE} mt-5 font-mono text-[13px] leading-relaxed text-ink-faint`}>
                This is an example of the framework&apos;s output, not a live market
                call. While SEBI Research Analyst registration is in process, I publish
                the method, not a positioning service. The monthly market letters show
                the reading applied in real time.
              </p>
            </div>

            {/* 11. The thinking behind this framework — consolidated from the
                two philosophy sections that used to open the page. Condensed
                to what isn't already covered by the snapshot and the factors
                above: the forecast-vs-reality-check distinction, and why the
                market gets read before anything else does. */}
            <section className={PROSE}>
              <h2 className="mb-4 font-display text-2xl font-normal text-ink sm:text-3xl">
                The thinking behind this framework
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
                <p>
                  I&apos;m not trying to predict where Nifty will be next month.
                  I&apos;m trying to understand what the market is rewarding right now.
                </p>
                <p>
                  The framework is not a forecast. It is a reality check. An Aggressive
                  reading does not mean the market will rise. A Defensive reading does
                  not mean the market will fall — it measures the current balance of
                  evidence, not where things are going. If the evidence says conditions
                  are poor, reducing exposure is the correct response even if the
                  market later rallies. The framework optimises for surviving
                  what&apos;s likely, not for catching what&apos;s possible.
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

            {/* 12. What this framework is not — the contrast now has something to contrast against */}
            <section className={PROSE}>
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

            {/* 13. How this feeds Framework 02 */}
            <section className={PROSE}>
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

            {/* 14. What this framework does not do */}
            <section className={PROSE}>
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

            {/* 15. Revision history */}
            <section className="flex flex-col gap-4 border-t border-rule pt-10">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-faint">
                Revision history
              </h2>
              <div className="overflow-x-auto rounded-vsc-lg border border-rule">
                <table className="w-full min-w-[560px] border-collapse font-mono text-[13px]">
                  <thead>
                    <tr className="border-b border-rule bg-canvas-sunk">
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                        Version
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
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

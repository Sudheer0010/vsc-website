"use client";

import { memo, useMemo, useState } from "react";
import { PathSimulatorChart } from "@/components/tools/PathSimulatorChart";
import { StepRule } from "@/components/ui/vsc/StepRule";
import {
  DISPLAY_POOL,
  type PathSimulatorSummary,
  type SimulatedPath,
} from "@/lib/calculators/trading-expectancy-path-simulator";

type Assumptions = { winRate: number; avgWin: number; avgLoss: number; trades: number };

function formatR(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}R`;
}

function formatPct(value: number) {
  if (value === 0) return "0%";
  if (value < 0.001) return "<0.1%";
  return `${(value * 100).toFixed(1)}%`;
}

type TradeRow = { trade: number; outcome: "Win" | "Loss" | null; change: number | null; cumulative: number };

function buildTradeRows(path: SimulatedPath): TradeRow[] {
  const rows: TradeRow[] = [{ trade: 0, outcome: null, change: null, cumulative: 0 }];
  for (let i = 1; i < path.cumulative.length; i += 1) {
    const change = path.cumulative[i] - path.cumulative[i - 1];
    rows.push({ trade: i, outcome: change > 0 ? "Win" : "Loss", change, cumulative: path.cumulative[i] });
  }
  return rows;
}

function PathSimulatorResultsImpl({
  summary,
  assumptions,
  isStale,
  selectedIndex,
  previewIndex,
  onSelect,
  onPreview,
}: {
  summary: PathSimulatorSummary | null;
  assumptions: Assumptions | null;
  /** Assumptions have been edited since this run — see the workspace. */
  isStale: boolean;
  selectedIndex: number | null;
  previewIndex: number | null;
  onSelect: (index: number | null) => void;
  onPreview: (index: number | null) => void;
}) {
  if (!summary || !assumptions) {
    return <EmptyState />;
  }

  const emphasizedIndex = previewIndex ?? selectedIndex ?? summary.medianDisplayIndex;

  return (
    <div className="mt-10 lg:mt-0">
      {isStale && <StaleNotice />}
      <Headline summary={summary} assumptions={assumptions} />
      <Takeaway summary={summary} />
      <Spread
        summary={summary}
        selectedIndex={selectedIndex}
        previewIndex={previewIndex}
        onSelect={onSelect}
        onPreview={onPreview}
      />
      <DetailTables summary={summary} emphasizedIndex={emphasizedIndex} />
      <Boundaries />
    </div>
  );
}

function StaleNotice() {
  return (
    <div role="status" className="mb-6 rounded-vsc-lg border border-dashed border-rule bg-surface-warm px-4 py-3">
      <p className="text-[13.5px] font-semibold text-ink">Assumptions have changed</p>
      <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed text-ink-muted">
        These results are from the previous run and no longer match the assumptions on the left. Run the
        stress test again to refresh them.
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 flex min-h-[360px] flex-col items-center justify-center rounded-vsc-lg border border-dashed border-rule bg-surface-warm px-6 py-16 text-center lg:mt-0">
      <p className="text-[15px] font-semibold text-ink">Your results will appear here</p>
      <p className="mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-ink-faint">
        Set an edge on the left and run the stress test. You will get the range of endpoints, the drawdown
        and losing streak to plan for, and the model-implied chance of finishing below 0R.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Tier 1 — the numbers a trader needs, before anything else
 * ---------------------------------------------------------------- */

function Headline({ summary, assumptions }: { summary: PathSimulatorSummary; assumptions: Assumptions }) {
  const assumptionsLine = `${assumptions.winRate}% win rate · ${formatR(assumptions.avgWin)} avg win · ${formatR(
    -assumptions.avgLoss,
  )} avg loss · ${assumptions.trades.toLocaleString("en-IN")} trades · ${summary.runs.toLocaleString(
    "en-IN",
  )} simulated runs`;

  return (
    <section>
      <p className="text-[13px] font-semibold text-ink-faint">01 · What this edge produced</p>
      <h2 className="mt-1.5 font-display text-[21px] font-semibold tracking-tight text-ink sm:text-[23px]">
        The range your assumptions imply
      </h2>
      <p className="mt-2 text-[13px] text-ink-faint">{assumptionsLine}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Metric
          label="Your edge, per trade"
          value={formatR(summary.theoreticalExpectancy)}
          note={`Averages ${formatR(summary.theoreticalTotal)} over ${assumptions.trades.toLocaleString("en-IN")} trades.`}
          emphasis
        />
        <Metric
          label="Typical result"
          value={formatR(summary.finalP50)}
          note="Median endpoint across all simulated runs."
        />
        <Metric
          label="Range of results"
          value={`${formatR(summary.finalP5)} to ${formatR(summary.finalP95)}`}
          note="5th to 95th simulated percentile. One run in 20 finishes below the lower figure."
        />
        <Metric
          label="Drawdown to plan for"
          value={`${summary.drawdownP50.toFixed(2)}R`}
          note={`Median worst decline from a high point. One run in 20 saw ${summary.drawdownP95.toFixed(2)}R or deeper.`}
        />
        <Metric
          label="Longest losing streak"
          value={`${summary.streakP50} trades`}
          note={`Median longest run of consecutive losses. One run in 20 saw ${summary.streakP95} or more.`}
        />
        <Metric
          label="Model-implied chance of finishing below 0R"
          value={formatPct(summary.probBelowZero)}
          note="Exact, from the binomial distribution — conditional on the entered constant win rate and fixed payoffs holding."
        />
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  note,
  emphasis = false,
}: {
  label: string;
  value: string;
  note: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`rounded-vsc-lg border p-4 ${
        emphasis ? "border-growth/30 bg-growth-wash" : "border-rule bg-surface"
      }`}
    >
      <p className="text-[12px] font-medium leading-snug text-ink-muted">{label}</p>
      <p className="mt-1.5 font-mono text-[19px] font-semibold tabular-nums leading-none text-ink">{value}</p>
      <p className="mt-2 text-[11.5px] leading-snug text-ink-faint">{note}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Tier 2 — the takeaway, before any table
 * ---------------------------------------------------------------- */

function Takeaway({ summary }: { summary: PathSimulatorSummary }) {
  const positive = summary.theoreticalExpectancy > 0;

  return (
    <section className="mt-8 rounded-vsc-lg border-l-[3px] border-growth bg-surface/60 px-5 py-4 sm:px-6">
      <h3 className="text-[14px] font-semibold text-ink">What to take from this</h3>
      {positive ? (
        <p className="mt-2 max-w-[72ch] text-[14.5px] leading-relaxed text-ink-muted">
          These assumptions make money on average: {formatR(summary.theoreticalExpectancy)} per trade, or about{" "}
          {formatR(summary.theoreticalTotal)} over {summary.trades.toLocaleString("en-IN")} trades. Even so, one
          run in twenty ended below {formatR(summary.finalP5)}, a typical run passed through a{" "}
          {summary.drawdownP50.toFixed(2)}R decline, and the model puts the chance of finishing below 0R at{" "}
          {formatPct(summary.probBelowZero)}. Size positions against the drawdown, not against the average.
        </p>
      ) : (
        <p className="mt-2 max-w-[72ch] text-[14.5px] leading-relaxed text-ink-muted">
          These assumptions lose money on average: {formatR(summary.theoreticalExpectancy)} per trade, or about{" "}
          {formatR(summary.theoreticalTotal)} over {summary.trades.toLocaleString("en-IN")} trades. Individual
          runs still finish positive by chance &mdash; the top of the simulated range reached{" "}
          {formatR(summary.finalP95)} &mdash; which is exactly why a run of good results is not evidence that
          the edge is sound. No position size makes a negative expectancy profitable.
        </p>
      )}
      <p className="mt-3 max-w-[72ch] text-[13px] leading-relaxed text-ink-faint">
        Runs differ for two reasons, not one. The <strong className="font-semibold text-ink-muted">number</strong>{" "}
        of wins and losses varies from run to run, which is what moves the endpoint. Their{" "}
        <strong className="font-semibold text-ink-muted">order</strong> varies too, and that is what drives how
        deep the drawdowns get and how long the losing streaks run.
      </p>
    </section>
  );
}

/* ---------------------------------------------------------------- *
 * Tier 3 — the spread
 * ---------------------------------------------------------------- */

function Spread({
  summary,
  selectedIndex,
  previewIndex,
  onSelect,
  onPreview,
}: {
  summary: PathSimulatorSummary;
  selectedIndex: number | null;
  previewIndex: number | null;
  onSelect: (index: number | null) => void;
  onPreview: (index: number | null) => void;
}) {
  return (
    <section className="mt-12 border-t border-rule pt-10">
      <p className="text-[13px] font-semibold text-ink-faint">02 · The spread</p>
      <h2 className="mt-1.5 font-display text-[21px] font-semibold tracking-tight text-ink">
        {summary.displayPaths.length} example runs
      </h2>
      <p className="mt-2 max-w-[68ch] text-[13.5px] leading-relaxed text-ink-muted">
        Every line below is a real simulated run, not a drawn curve. They are a representative sample, not
        percentile paths: the first {DISPLAY_POOL.toLocaleString("en-IN")} runs kept their full series, and
        these {summary.displayPaths.length} are spread across that sample&rsquo;s endpoints. All{" "}
        {summary.runs.toLocaleString("en-IN")} runs used the same assumptions.
      </p>

      <div className="mt-5">
        <PathSimulatorChart
          paths={summary.displayPaths}
          trades={summary.trades}
          percentiles={{ p5: summary.finalP5, p50: summary.finalP50, p95: summary.finalP95 }}
          medianPathIndex={summary.medianDisplayIndex}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          previewIndex={previewIndex}
          onPreview={onPreview}
        />
      </div>

      <p className="mt-3 text-[12px] leading-snug text-ink-faint">
        The 5th, median and 95th markers are computed from all{" "}
        {summary.runs.toLocaleString("en-IN")} runs, while the lines are drawn from the retained sample, so a
        line can sit outside the markers. The highlighted line is the example nearest the median endpoint,
        not the median run itself.
      </p>

      <div className="mt-5 overflow-hidden rounded-vsc-lg border border-rule">
        <table className="w-full border-collapse text-[13.5px]">
          <caption className="sr-only">
            Simulated percentiles of the endpoint under the entered assumptions
          </caption>
          <tbody>
            <SummaryRow label="5th percentile endpoint" value={formatR(summary.finalP5)} />
            <SummaryRow label="Median endpoint" value={formatR(summary.finalP50)} />
            <SummaryRow label="95th percentile endpoint" value={formatR(summary.finalP95)} />
            <SummaryRow label="Median worst drawdown" value={`${summary.drawdownP50.toFixed(2)}R`} />
            <SummaryRow label="95th percentile worst drawdown" value={`${summary.drawdownP95.toFixed(2)}R`} />
            <SummaryRow label="Median longest losing streak" value={`${summary.streakP50} trades`} />
            <SummaryRow label="95th percentile longest losing streak" value={`${summary.streakP95} trades`} />
            <SummaryRow
              label="Runs that finished below 0R"
              value={`${formatPct(summary.simulatedBelowZeroRate)} observed · ${formatPct(
                summary.probBelowZero,
              )} exact`}
            />
          </tbody>
        </table>
      </div>
      <p className="mt-2.5 text-[12px] leading-snug text-ink-faint">
        Percentiles are simulated under the entered assumptions. The observed and exact below-0R figures are
        computed independently &mdash; they should agree closely, and the exact figure is the one to quote.
      </p>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-rule/70 last:border-b-0 even:bg-canvas-sunk/40">
      <th scope="row" className="px-4 py-2.5 text-left font-medium text-ink-muted">
        {label}
      </th>
      <td className="px-4 py-2.5 text-right font-mono tabular-nums font-medium text-ink">{value}</td>
    </tr>
  );
}

/* ---------------------------------------------------------------- *
 * Tier 4 — detail, collapsed
 * ---------------------------------------------------------------- */

function DetailTables({
  summary,
  emphasizedIndex,
}: {
  summary: PathSimulatorSummary;
  emphasizedIndex: number;
}) {
  const [open, setOpen] = useState(false);
  const path = summary.displayPaths[emphasizedIndex] ?? summary.displayPaths[0];
  const rows = useMemo(() => (open && path ? buildTradeRows(path) : []), [open, path]);

  if (!path) return null;

  return (
    <section className="mt-12 border-t border-rule pt-10">
      <p className="text-[13px] font-semibold text-ink-faint">03 · Detail</p>
      <h2 className="mt-1.5 font-display text-[21px] font-semibold tracking-tight text-ink">
        Inspect a single run
      </h2>
      <p className="mt-2 max-w-[68ch] text-[13.5px] leading-relaxed text-ink-muted">
        Useful for seeing how a drawdown actually accumulated. It is one run out of{" "}
        {summary.runs.toLocaleString("en-IN")} and carries no more weight than any other.
      </p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="sim-detail-panel"
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-vsc-lg border border-rule bg-surface px-4 text-[14px] font-semibold text-growth transition-colors duration-150 hover:border-growth/40 hover:text-growth-deep"
      >
        {open ? "Hide" : "Show"} the trade-by-trade table
      </button>

      <div id="sim-detail-panel" hidden={!open}>
        <div className="mt-5 overflow-hidden rounded-vsc-lg border border-rule">
          <table className="w-full border-collapse text-[13px]">
            <tbody>
              <SummaryRow label="Final cumulative R" value={formatR(path.final)} />
              <SummaryRow label="Maximum drawdown" value={`${path.maxDrawdown.toFixed(2)}R`} />
              <SummaryRow label="Longest losing streak" value={`${path.longestLossStreak} trades`} />
            </tbody>
          </table>
        </div>

        <div
          className="mt-4 max-h-[420px] overflow-auto rounded-vsc-lg border border-rule"
          tabIndex={0}
          aria-label="Selected run, trade by trade"
        >
          <table className="w-full border-collapse text-[13px]">
            <thead className="sticky top-0 bg-surface-warm">
              <tr className="border-b border-rule text-left text-[11px] font-medium text-ink-faint">
                <th scope="col" className="px-3 py-2 font-medium">
                  Trade
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Outcome
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Change
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Cumulative R
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.trade} className="border-b border-rule/60 last:border-b-0 even:bg-canvas-sunk/40">
                  <td className="px-3 py-1.5 text-ink-muted">{row.trade === 0 ? "Start" : row.trade}</td>
                  <td className="px-3 py-1.5 text-ink-muted">{row.outcome ?? "—"}</td>
                  <td className="px-3 py-1.5 text-right font-mono tabular-nums text-ink-muted">
                    {row.change === null ? "—" : formatR(row.change)}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono tabular-nums text-ink">
                    {formatR(row.cumulative)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- *
 * Tier 5 — what this does and does not establish
 * ---------------------------------------------------------------- */

function Boundaries() {
  return (
    <section className="mt-12 border-t border-rule pt-10">
      <div className="mb-3 flex items-center gap-2.5 text-[13px] font-semibold text-growth">
        <StepRule size="sm" />
        <span>Read the range, not the line</span>
      </div>
      <h2 className="font-display text-[21px] font-semibold tracking-tight text-ink sm:text-[23px]">
        What this test shows, and what it does not
      </h2>

      <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:divide-x sm:divide-rule">
        <div className="sm:pr-8">
          <h3 className="text-[14px] font-semibold text-ink">What it shows</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[13.5px] leading-relaxed text-ink-muted marker:text-ink-faint">
            <li>One set of assumptions produces a wide range of results, not a single number.</li>
            <li>A positive edge does not imply a smooth equity curve.</li>
            <li>Deep drawdowns and long losing streaks are ordinary within a working edge.</li>
            <li>One run &mdash; good or bad &mdash; is not enough to judge a system.</li>
          </ul>
        </div>
        <div className="sm:pl-8">
          <h3 className="text-[14px] font-semibold text-ink">What it does not establish</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[13.5px] leading-relaxed text-ink-muted marker:text-ink-faint">
            <li>Whether your win rate and payoff assumptions are correct.</li>
            <li>Whether your rules are repeatable outside the sample they came from.</li>
            <li>Any future profit or loss, or your actual worst case.</li>
            <li>How the edge behaves when the market regime changes.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-vsc-lg border border-rule bg-surface-warm p-5">
        <h3 className="text-[14px] font-semibold text-ink">What the model leaves out</h3>
        <p className="mt-2 max-w-[72ch] text-[13.5px] leading-relaxed text-ink-muted">
          Every win here is exactly your average win and every loss exactly your average loss, drawn at a
          constant win rate. The model does not represent variation in the size of individual trades, tail
          losses, gaps, slippage, costs, changing market regimes, or an edge that decays. Real results may
          differ materially from these figures, and may be more extreme in either direction.
        </p>
      </div>
    </section>
  );
}

/**
 * Memoised: while a stress test runs, the parent re-renders on each progress
 * update. Without this the whole results tree — chart, percentile table and
 * all — re-rendered on every tick even though none of its props had changed.
 */
export const PathSimulatorResults = memo(PathSimulatorResultsImpl);

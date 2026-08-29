"use client";

import { useMemo } from "react";
import { PathSimulatorChart } from "@/components/tools/PathSimulatorChart";
import { StepRule } from "@/components/ui/vsc/StepRule";
import type { PathSimulatorSummary, SimulatedPath } from "@/lib/calculators/trading-expectancy-path-simulator";

type Assumptions = { winRate: number; avgWin: number; avgLoss: number; trades: number };

function formatR(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}R`;
}

function formatRange(range: [number, number], format: (value: number) => string) {
  return `${format(range[0])} – ${format(range[1])}`;
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

export function PathSimulatorResults({
  summary,
  assumptions,
  medianPathIndex,
  selectedIndex,
  previewIndex,
  onSelect,
  onPreview,
}: {
  summary: PathSimulatorSummary | null;
  assumptions: Assumptions | null;
  medianPathIndex: number;
  selectedIndex: number | null;
  previewIndex: number | null;
  onSelect: (index: number | null) => void;
  onPreview: (index: number | null) => void;
}) {
  if (!summary || !assumptions) {
    return <EmptyState />;
  }

  const emphasizedIndex = previewIndex ?? selectedIndex ?? medianPathIndex;

  return (
    <div className="mt-10 lg:mt-0">
      <Section02 path={summary.paths[0]} />
      <Section03
        summary={summary}
        assumptions={assumptions}
        medianPathIndex={medianPathIndex}
        selectedIndex={selectedIndex}
        previewIndex={previewIndex}
        emphasizedIndex={emphasizedIndex}
        onSelect={onSelect}
        onPreview={onPreview}
      />
      <Section04 />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 flex min-h-[360px] flex-col items-center justify-center rounded-vsc-lg border border-dashed border-rule bg-surface-warm px-6 py-16 text-center lg:mt-0">
      <p className="text-[15px] font-semibold text-ink">Results will appear here</p>
      <p className="mt-2 max-w-[38ch] text-[13.5px] leading-relaxed text-ink-faint">
        Set your assumptions on the left and run a simulation to see one realized path, the full 20-path spread, and
        what the range does and doesn&apos;t tell you.
      </p>
    </div>
  );
}

function Section02({ path }: { path: SimulatedPath }) {
  const rows = useMemo(() => buildTradeRows(path), [path]);

  return (
    <section>
      <p className="text-[13px] font-semibold text-ink-faint">02 · One realized path</p>
      <h2 className="mt-1.5 font-display text-[21px] font-semibold tracking-tight text-ink">How Path 1 unfolded</h2>
      <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed text-ink-muted">
        One of the 20 simulated paths below, drawn from the same assumptions — its realized sequence is one outcome
        among many possible ones.
      </p>

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
        className="mt-4 max-h-[485px] overflow-auto rounded-vsc-lg border border-rule"
        tabIndex={0}
        aria-label="Path 1 trade-by-trade table"
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
                <td
                  className={`px-3 py-1.5 font-medium ${
                    row.outcome === "Win" ? "text-growth" : row.outcome === "Loss" ? "text-clay" : "text-ink-faint"
                  }`}
                >
                  {row.outcome ?? "—"}
                </td>
                <td className="px-3 py-1.5 text-right font-mono tabular-nums text-ink-muted">
                  {row.change !== null ? formatR(row.change) : "—"}
                </td>
                <td className="px-3 py-1.5 text-right font-mono tabular-nums font-medium text-ink">
                  {formatR(row.cumulative)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Section03({
  summary,
  assumptions,
  medianPathIndex,
  selectedIndex,
  previewIndex,
  emphasizedIndex,
  onSelect,
  onPreview,
}: {
  summary: PathSimulatorSummary;
  assumptions: Assumptions;
  medianPathIndex: number;
  selectedIndex: number | null;
  previewIndex: number | null;
  emphasizedIndex: number;
  onSelect: (index: number | null) => void;
  onPreview: (index: number | null) => void;
}) {
  const assumptionsLine = `${assumptions.winRate}% win rate · ${formatR(assumptions.avgWin)} avg win · ${formatR(
    -assumptions.avgLoss,
  )} avg loss · ${assumptions.trades.toLocaleString("en-IN")} trades`;

  return (
    <section className="mt-12 border-t border-rule pt-10">
      <p className="text-[13px] font-semibold text-ink-faint">03 · Across all 20 paths</p>
      <h2 className="mt-1.5 font-display text-[21px] font-semibold tracking-tight text-ink">
        How the full spread compares
      </h2>
      <p className="mt-2 text-[13px] text-ink-faint">{assumptionsLine}</p>

      <div className="mt-5 overflow-hidden rounded-vsc-lg border border-rule">
        <table className="w-full border-collapse text-[13.5px]">
          <tbody>
            <SummaryRow label="Theoretical expectancy / trade" value={formatR(summary.theoreticalExpectancy)} />
            <SummaryRow label="Expected cumulative R" value={formatR(summary.theoreticalTotal)} />
            <SummaryRow label="Median realized endpoint" value={formatR(summary.medianFinal)} />
            <SummaryRow label="Observed endpoint range" value={formatRange(summary.finalRange, formatR)} />
            <SummaryRow
              label="Observed max drawdown range"
              value={formatRange(summary.drawdownRange, (v) => `${v.toFixed(2)}R`)}
            />
            <SummaryRow
              label="Longest losing streak range"
              value={`${formatRange(summary.streakRange, (v) => `${v}`)} trades`}
            />
            <SummaryRow label="Paths finishing below 0R" value={`${summary.belowZeroCount} of ${summary.pathCount}`} />
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-[15px] font-semibold text-ink">Twenty realized paths</h3>
      <div className="mt-3">
        <PathSimulatorChart
          paths={summary.paths}
          trades={summary.trades}
          medianPathIndex={medianPathIndex}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          previewIndex={previewIndex}
          onPreview={onPreview}
        />
      </div>

      <h3 className="mt-8 text-[15px] font-semibold text-ink">All 20 paths</h3>
      <div
        className="mt-3 overflow-x-auto overflow-y-visible rounded-vsc-lg border border-rule"
        aria-label="All 20 simulated paths, selectable"
      >
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-surface-warm">
            <tr className="border-b border-rule text-left text-[11px] font-medium text-ink-faint">
              <th scope="col" className="px-3 py-2 font-medium">
                Path
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                Final R
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                Max drawdown
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                Longest losing streak
              </th>
            </tr>
          </thead>
          <tbody>
            {summary.paths.map((path, index) => {
              const isEmphasized = emphasizedIndex === index;
              const isMedian = index === medianPathIndex;

              return (
                <tr
                  key={index}
                  onClick={() => onSelect(index)}
                  onMouseEnter={() => onPreview(index)}
                  onMouseLeave={() => onPreview(null)}
                  onFocus={() => onPreview(index)}
                  onBlur={() => onPreview(null)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(index);
                    }
                  }}
                  tabIndex={0}
                  aria-selected={isEmphasized}
                  className={`cursor-pointer border-b border-rule/60 outline-none transition-colors duration-150 last:border-b-0 focus-visible:bg-growth-tint ${
                    isEmphasized ? "bg-growth-tint" : "even:bg-canvas-sunk/40 hover:bg-canvas-sunk"
                  }`}
                >
                  <td className="px-3 py-1.5 text-ink-muted">
                    Path {index + 1}
                    {isMedian && <span className="ml-1.5 text-[10.5px] font-semibold text-growth">· median</span>}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono tabular-nums font-medium text-ink">
                    {formatR(path.final)}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono tabular-nums text-ink-muted">
                    {path.maxDrawdown.toFixed(2)}R
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono tabular-nums text-ink-muted">
                    {path.longestLossStreak}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Section04() {
  return (
    <section className="mt-12 border-t border-rule pt-10">
      <div className="mb-3 flex items-center gap-2.5 text-[13px] font-semibold text-growth">
        <StepRule size="sm" />
        <span>Read the range, not the line</span>
      </div>
      <h2 className="font-display text-[21px] font-semibold tracking-tight text-ink sm:text-[23px]">
        What the simulation is actually showing
      </h2>

      <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:divide-x sm:divide-rule">
        <div className="sm:pr-8">
          <h3 className="text-[14px] font-semibold text-ink">What the model demonstrates</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[13.5px] leading-relaxed text-ink-muted marker:text-ink-faint">
            <li>Same assumptions can produce materially different realized paths.</li>
            <li>Positive expectancy does not imply a smooth equity curve.</li>
            <li>Drawdowns and losing streaks are part of the distribution of outcomes.</li>
            <li>One realized sequence is not sufficient to judge a system.</li>
          </ul>
        </div>
        <div className="sm:pl-8">
          <h3 className="text-[14px] font-semibold text-ink">What the model does not establish</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[13.5px] leading-relaxed text-ink-muted marker:text-ink-faint">
            <li>Whether the entered win rate/payoff assumptions are valid.</li>
            <li>Whether the trading rules are reproducible.</li>
            <li>Whether the inputs are supported by adequate testing.</li>
            <li>Future P&amp;L or actual maximum loss.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3">
        <StepRule size="md" className="mt-1 shrink-0" />
        <p className="font-display text-[18px] font-semibold leading-snug tracking-tight text-ink sm:text-[19px]">
          The simulation can test the consequences of an edge. It cannot prove that the edge exists.
        </p>
      </div>

      <p className="mt-6 max-w-[70ch] rounded-vsc-md bg-canvas-sunk px-3.5 py-3 text-[12px] leading-relaxed text-ink-faint">
        <strong className="font-semibold text-ink-muted">Model boundaries.</strong> Trades are treated as
        independent, with a fixed win rate, average win and average loss held constant for the full run. The model
        excludes fees, slippage, taxes and changing market conditions.
      </p>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-rule/60 last:border-b-0 even:bg-canvas-sunk/40">
      <td className="px-3.5 py-2.5 text-[13px] text-ink-muted">{label}</td>
      <td className="px-3.5 py-2.5 text-right font-mono tabular-nums text-[13.5px] font-semibold text-ink">
        {value}
      </td>
    </tr>
  );
}

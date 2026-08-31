"use client";

import { useMemo, useState, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { computeTradingExpectancy, type TradingExpectancyResult } from "@/lib/calculators/trading-expectancy";

// Lets a click anywhere in the input's padded box focus the field, since
// the visible box is taller than the native input element it wraps.
function focusFirstInput(event: MouseEvent<HTMLDivElement>) {
  event.currentTarget.querySelector("input")?.focus();
}

const DEFAULTS = {
  winRate: "40",
  avgWin: "2",
  avgLoss: "1",
  trades: "50",
};

function formatR(value: number, signed = false) {
  const sign = signed ? (value > 0 ? "+" : "") : "";
  return `${sign}${value.toFixed(2)}R`;
}

function formatPct(value: number, decimals = 1) {
  return `${value.toFixed(decimals)}%`;
}

export function TradingExpectancyCalculator() {
  const [winRate, setWinRate] = useState(DEFAULTS.winRate);
  const [avgWin, setAvgWin] = useState(DEFAULTS.avgWin);
  const [avgLoss, setAvgLoss] = useState(DEFAULTS.avgLoss);
  const [trades, setTrades] = useState(DEFAULTS.trades);

  const result = useMemo<TradingExpectancyResult>(
    () => computeTradingExpectancy(winRate, avgWin, avgLoss, trades),
    [winRate, avgWin, avgLoss, trades],
  );

  const loadExample = () => {
    setWinRate(DEFAULTS.winRate);
    setAvgWin(DEFAULTS.avgWin);
    setAvgLoss(DEFAULTS.avgLoss);
    setTrades(DEFAULTS.trades);
  };

  const clearAll = () => {
    setWinRate("");
    setAvgWin("");
    setAvgLoss("");
    setTrades("");
  };

  const inputClass =
    "w-full min-w-0 appearance-none bg-transparent font-ui text-[16px] font-medium text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
  const inputWrapClass =
    "flex min-h-12 items-center gap-2 rounded-vsc-lg border border-rule bg-surface-warm px-4 py-3 transition-[border-color,box-shadow] duration-150 focus-within:border-growth focus-within:shadow-[0_0_0_3px_rgba(15,122,64,0.08)]";

  const statusLabel =
    result.state === "ready"
      ? result.expectancyState === "positive"
        ? "Positive expectancy"
        : result.expectancyState === "negative"
          ? "Negative expectancy"
          : "Break-even expectancy"
      : null;

  const valueTone =
    result.state === "ready"
      ? result.expectancyState === "positive"
        ? "text-growth"
        : result.expectancyState === "negative"
          ? "text-clay"
          : "text-ink"
      : "text-ink";

  const badgeClass =
    result.state === "ready"
      ? result.expectancyState === "positive"
        ? "bg-growth-tint text-growth"
        : result.expectancyState === "negative"
          ? "bg-clay-tint text-clay"
          : "bg-canvas-sunk text-ink-muted"
      : "";

  const sampleBadgeClass =
    result.state === "ready"
      ? result.sample.tone === "caution"
        ? "bg-clay-tint text-clay"
        : result.sample.tone === "broad"
          ? "bg-growth-tint text-growth-deep"
          : "bg-canvas-sunk text-ink-muted"
      : "";

  return (
    <section
      aria-label="VSC trading expectancy calculator"
      className="overflow-hidden rounded-vsc-xl border border-rule bg-surface shadow-lift-2"
    >
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-rule p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="mb-5 text-[13px] font-semibold text-ink-faint">Historical trade statistics</p>

          <div className="space-y-5">
            <div>
              <label htmlFor="te-win-rate" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Win rate
              </label>
              <div className={inputWrapClass} onClick={focusFirstInput}>
                <input
                  id="te-win-rate"
                  className={inputClass}
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  inputMode="decimal"
                  value={winRate}
                  onChange={(event) => setWinRate(event.target.value)}
                />
                <span className="shrink-0 text-[14px] font-medium text-ink-faint">%</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                Use the observed percentage of profitable trades in the sample — not a target win rate.
              </p>
            </div>

            <div>
              <label htmlFor="te-avg-win" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Average winning trade
              </label>
              <div className={inputWrapClass} onClick={focusFirstInput}>
                <input
                  id="te-avg-win"
                  className={inputClass}
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={avgWin}
                  onChange={(event) => setAvgWin(event.target.value)}
                />
                <span className="shrink-0 text-[14px] font-medium text-ink-faint">R</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                Average profit of winning trades measured against initial risk. Use net results where possible.
              </p>
            </div>

            <div>
              <label htmlFor="te-avg-loss" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Average losing trade
              </label>
              <div className={inputWrapClass} onClick={focusFirstInput}>
                <input
                  id="te-avg-loss"
                  className={inputClass}
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={avgLoss}
                  onChange={(event) => setAvgLoss(event.target.value)}
                />
                <span className="shrink-0 text-[14px] font-medium text-ink-faint">R</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                Enter the average loss as a positive magnitude. A full 1R loss is entered as 1.00, not −1.00.
              </p>
            </div>

            <div>
              <label htmlFor="te-trades" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Trades in sample
              </label>
              <div className={inputWrapClass} onClick={focusFirstInput}>
                <input
                  id="te-trades"
                  className={inputClass}
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  value={trades}
                  onChange={(event) => setTrades(event.target.value)}
                />
                <span className="shrink-0 text-[14px] font-medium text-ink-faint">trades</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                Sample size does not change the formula; it changes how cautiously the estimate should be interpreted.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-5">
            <button type="button" onClick={loadExample} className="min-h-11 text-[14px] font-semibold text-growth hover:text-growth-deep">
              Load example
            </button>
            <button type="button" onClick={clearAll} className="min-h-11 text-[14px] font-semibold text-ink-muted hover:text-ink">
              Clear
            </button>
          </div>
        </div>

        <div className="flex min-h-full flex-col p-5 sm:p-7" aria-live="polite">
          <div className="mb-2 flex items-start justify-between gap-4">
            <p className="text-[13px] font-semibold text-ink-faint">Expectancy result</p>
            {statusLabel && (
              <span className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${badgeClass}`}>{statusLabel}</span>
            )}
          </div>

          {result.state === "empty" ? (
            <div className="py-8 text-center">
              <strong className="block font-display text-[22px] font-semibold text-ink">Enter a complete trade sample</strong>
              <p className="mx-auto mt-2 max-w-[420px] text-[14px] text-ink-faint">{result.message}</p>
            </div>
          ) : (
            <>
              <p className="text-[14px] text-ink-muted">Expectancy per trade</p>
              <div className="mt-1 flex items-baseline gap-2">
                <strong
                  className={`font-display text-[44px] font-semibold leading-none tracking-[-0.04em] sm:text-[52px] ${valueTone}`}
                >
                  {formatR(result.expectancy, true)}
                </strong>
              </div>
              <p className="mt-2 max-w-[520px] text-[13px] text-ink-faint">
                {result.expectancyState === "flat"
                  ? "On these inputs, the weighted average of wins and losses is approximately break-even before any unreflected costs."
                  : `On these inputs, the sample implies an average outcome of ${formatR(result.expectancy, true)} per trade over many trades.`}{" "}
                This is a sample-based estimate, not a prediction of the next trade.
              </p>

              <div className="my-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-rule py-5">
                <Metric label="Payoff ratio" value={`${result.payoff.toFixed(2)} : 1`} />
                <Metric label="Breakeven win rate" value={formatPct(result.breakeven, 2)} />
                <Metric label="Observed win rate" value={formatPct(result.winRate, 1)} />
                <Metric
                  label="Vs. breakeven"
                  value={`${result.edgeVsBreakeven >= 0 ? "+" : ""}${result.edgeVsBreakeven.toFixed(2)} pts`}
                  tone={result.edgeVsBreakeven >= 0 ? "growth" : "clay"}
                />
              </div>

              <div>
                <p className="mb-2.5 text-[12px] text-ink-faint">Where the expectancy comes from</p>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3.5">
                  <div className="rounded-vsc-md border border-rule bg-surface-warm p-4">
                    <div className="text-[10px] uppercase tracking-[0.08em] text-ink-faint">Winning contribution</div>
                    <div className="mt-0.5 font-mono text-[16px] font-semibold text-growth">
                      +{result.winContribution.toFixed(2)}R
                    </div>
                    <div className="mt-1 text-[11px] text-ink-muted">
                      {formatPct(result.winRate, 1)} × {result.avgWin.toFixed(2)}R avg winner
                    </div>
                  </div>
                  <div className="font-display text-[20px] text-ink-faint">−</div>
                  <div className="rounded-vsc-md border border-rule bg-surface-warm p-4">
                    <div className="text-[10px] uppercase tracking-[0.08em] text-ink-faint">Losing contribution</div>
                    <div className="mt-0.5 font-mono text-[16px] font-semibold text-clay">
                      −{result.lossContribution.toFixed(2)}R
                    </div>
                    <div className="mt-1 text-[11px] text-ink-muted">
                      {formatPct(result.lossRate, 1)} × {result.avgLoss.toFixed(2)}R avg loser
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 rounded-vsc-md bg-canvas-sunk px-4 py-3 text-[12px] text-ink-muted">
                  <span>Weighted wins − weighted losses</span>
                  <strong className="text-ink">
                    {result.winContribution.toFixed(2)}R − {result.lossContribution.toFixed(2)}R = {formatR(result.expectancy, true)}
                  </strong>
                </div>

                <div className="mt-4 rounded-vsc-md border border-rule bg-surface-warm p-4">
                  <div className="flex items-center justify-between gap-3.5">
                    <strong className="text-[13px] text-ink">
                      Sample context · {result.trades.toLocaleString("en-IN")} trades
                    </strong>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-[10.5px] font-semibold ${sampleBadgeClass}`}>
                      {result.sample.badge}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-muted">{result.sample.text}</p>
                </div>

                {/* Hand-off to the stress test. Only the three edge inputs
                    travel: `trades` here is the historical sample size, while
                    the stress test's trade count is a forward horizon, so it
                    is passed as `sample` for a caveat rather than prefilled as
                    the horizon. */}
                <Link
                  href={{
                    pathname: "/tools/trading-expectancy-path-simulator",
                    query: {
                      winRate: result.winRate,
                      avgWin: result.avgWin,
                      avgLoss: result.avgLoss,
                      sample: result.trades,
                    },
                  }}
                  className="group mt-4 flex items-center justify-between gap-4 rounded-vsc-md border border-growth/30 bg-growth-wash px-4 py-3.5 transition-colors duration-150 hover:border-growth/60"
                >
                  <span>
                    <strong className="block text-[13.5px] font-semibold text-ink">
                      Now stress-test this edge
                    </strong>
                    <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-muted">
                      See the drawdowns and losing streaks it can still produce.
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-growth transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "growth" | "clay" }) {
  return (
    <div>
      <div className="mb-0.5 text-[12px] text-ink-faint">{label}</div>
      <div className={`text-[16px] font-semibold ${tone === "growth" ? "text-growth" : tone === "clay" ? "text-clay" : "text-ink"}`}>
        {value}
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";

const DEFAULTS = {
  capital: "500000",
  riskPct: "1",
  entry: "1000",
  stop: "950",
};

function formatINR(value: number, decimals = 0) {
  return `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function formatNumber(value: number) {
  return Number(value).toLocaleString("en-IN");
}

function formatPct(value: number) {
  return `${Number(value).toFixed(value < 10 ? 2 : 1)}%`;
}

function indianAmountLabel(raw: string) {
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) return "";

  if (value >= 10_000_000) {
    const crores = value / 10_000_000;
    return `₹${crores.toFixed(2)} ${Math.abs(crores - 1) < 1e-9 ? "Crore" : "Crores"}`;
  }

  if (value >= 100_000) {
    const lakhs = value / 100_000;
    return `₹${lakhs.toFixed(2)} ${Math.abs(lakhs - 1) < 1e-9 ? "Lakh" : "Lakhs"}`;
  }

  if (value >= 1_000) {
    return `₹${(value / 1_000).toFixed(2)} Thousand`;
  }

  return formatINR(value);
}

type Result =
  | { state: "empty"; message: string; stopError?: boolean }
  | {
      state: "ready";
      capital: number;
      selectedRiskPct: number;
      stopDistance: number;
      shares: number;
      positionValue: number;
      actualRisk: number;
      actualRiskPct: number;
      capitalPct: number;
      cashRemainingPct: number;
      feasible: boolean;
      extraCapital: number;
      affordableShares: number;
      maxCashRiskPct: number;
    };

export function PositionSizeCalculator() {
  const [capital, setCapital] = useState(DEFAULTS.capital);
  const [riskPct, setRiskPct] = useState(DEFAULTS.riskPct);
  const [entry, setEntry] = useState(DEFAULTS.entry);
  const [stop, setStop] = useState(DEFAULTS.stop);

  const result = useMemo<Result>(() => {
    const C = Number.parseFloat(capital);
    const R = Number.parseFloat(riskPct);
    const E = Number.parseFloat(entry);
    const S = Number.parseFloat(stop);

    if (!(C > 0) || !(R > 0) || !(R <= 100) || !(E > 0) || !(S > 0)) {
      return { state: "empty", message: "Enter valid values to calculate a position size." };
    }

    if (S >= E) {
      return {
        state: "empty",
        message: "Fix the stop-loss to continue.",
        stopError: true,
      };
    }

    const riskAmount = C * (R / 100);
    const stopDistance = E - S;
    const riskShares = Math.floor(riskAmount / stopDistance);

    if (riskShares < 1) {
      return {
        state: "empty",
        message: "Your selected risk amount is smaller than the stop distance for one share.",
      };
    }

    const positionValue = riskShares * E;
    const actualRisk = riskShares * stopDistance;
    const actualRiskPct = (actualRisk / C) * 100;
    const capitalPct = (positionValue / C) * 100;
    const affordableShares = Math.floor(C / E);
    const cashRemainingPct = Math.max(0, 100 - capitalPct);
    const feasible = positionValue <= C + 1e-9;
    const maxCashRiskAmount = affordableShares * stopDistance;
    const maxCashRiskPct = C > 0 ? (maxCashRiskAmount / C) * 100 : 0;
    const extraCapital = Math.max(0, positionValue - C);

    return {
      state: "ready",
      capital: C,
      selectedRiskPct: R,
      stopDistance,
      shares: riskShares,
      positionValue,
      actualRisk,
      actualRiskPct,
      capitalPct,
      cashRemainingPct,
      feasible,
      extraCapital,
      affordableShares,
      maxCashRiskPct,
    };
  }, [capital, riskPct, entry, stop]);

  const loadExample = () => {
    setCapital(DEFAULTS.capital);
    setRiskPct(DEFAULTS.riskPct);
    setEntry(DEFAULTS.entry);
    setStop(DEFAULTS.stop);
  };

  const clearAll = () => {
    setCapital("");
    setRiskPct("");
    setEntry("");
    setStop("");
  };

  const inputClass =
    "w-full min-w-0 appearance-none bg-transparent font-ui text-[16px] font-medium text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
  const inputWrapClass =
    "flex min-h-12 items-center gap-2 rounded-vsc-lg border border-rule bg-surface-warm px-4 py-3 transition-[border-color,box-shadow] duration-150 focus-within:border-growth focus-within:shadow-[0_0_0_3px_rgba(15,122,64,0.08)]";

  return (
    <section aria-label="VSC position size calculator" className="overflow-hidden rounded-vsc-xl border border-rule bg-surface shadow-lift-2">
      <div className="grid lg:grid-cols-[0.93fr_1.07fr]">
        <div className="border-b border-rule p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="mb-5 text-[13px] font-semibold text-ink-faint">Trade parameters</p>

          <div className="space-y-5">
            <div>
              <label htmlFor="capital" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Trading capital
              </label>
              <div className={inputWrapClass}>
                <span className="shrink-0 text-[15px] font-medium text-ink-faint">₹</span>
                <input
                  id="capital"
                  className={inputClass}
                  type="number"
                  min="1"
                  step="1000"
                  inputMode="decimal"
                  value={capital}
                  onChange={(event) => setCapital(event.target.value)}
                />
              </div>
              {indianAmountLabel(capital) && (
                <p className="mt-1.5 text-[13px] font-semibold text-growth">{indianAmountLabel(capital)}</p>
              )}
            </div>

            <div>
              <label htmlFor="riskPct" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Max account risk (%)
              </label>
              <div className={inputWrapClass}>
                <input
                  id="riskPct"
                  className={inputClass}
                  type="number"
                  min="0.01"
                  max="100"
                  step="0.05"
                  inputMode="decimal"
                  value={riskPct}
                  onChange={(event) => setRiskPct(event.target.value)}
                />
                <span className="shrink-0 text-[15px] font-medium text-ink-faint">%</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                Maximum percentage of trading capital you are willing to lose if the stop is reached.
              </p>
            </div>

            <div>
              <label htmlFor="entry" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Planned entry price
              </label>
              <div className={inputWrapClass}>
                <span className="shrink-0 text-[15px] font-medium text-ink-faint">₹</span>
                <input
                  id="entry"
                  className={inputClass}
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  value={entry}
                  onChange={(event) => setEntry(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="stop" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Planned stop-loss
              </label>
              <div className={inputWrapClass}>
                <span className="shrink-0 text-[15px] font-medium text-ink-faint">₹</span>
                <input
                  id="stop"
                  className={inputClass}
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  value={stop}
                  aria-describedby="stop-help stop-error"
                  aria-invalid={result.state === "empty" && Boolean(result.stopError)}
                  onChange={(event) => setStop(event.target.value)}
                />
              </div>
              <p id="stop-help" className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                For this long-equity calculator, the stop must be below the entry.
              </p>
              {result.state === "empty" && result.stopError && (
                <p id="stop-error" className="mt-1.5 text-[13px] text-clay">
                  Stop-loss must be below the planned entry for a long equity trade.
                </p>
              )}
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
            <p className="text-[13px] font-semibold text-ink-faint">Risk-based position</p>
            {result.state === "ready" && (
              <span
                className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                  result.feasible ? "bg-growth-tint text-growth" : "bg-clay-tint text-clay"
                }`}
              >
                {result.feasible ? "Within available capital" : "Exceeds available capital"}
              </span>
            )}
          </div>

          {result.state === "empty" ? (
            <p className="py-3 text-[15px] text-ink-faint">{result.message}</p>
          ) : (
            <>
              <p className="text-[14px] text-ink-muted">Position size</p>
              <div className="mt-1 flex items-baseline gap-2">
                <strong className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em] text-growth sm:text-[52px]">
                  {formatNumber(result.shares)}
                </strong>
                <span className="text-[16px] font-medium text-ink-muted">shares</span>
              </div>
              <p className="mt-2 text-[13px] text-ink-faint">
                {formatINR(result.stopDistance, 2)} stop distance per share · {result.selectedRiskPct.toFixed(2)}% selected account risk
              </p>

              <div className="my-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-rule py-5">
                <Metric label="Position value" value={formatINR(result.positionValue)} />
                <Metric label="Planned risk at stop" value={`${formatINR(result.actualRisk)} · ${formatPct(result.actualRiskPct)}`} accent />
                <Metric label="Available capital" value={formatINR(result.capital)} />
                <Metric label="Capital required" value={`${result.capitalPct.toFixed(1)}%`} warning={!result.feasible} />
              </div>

              <div>
                <div className="mb-2 flex justify-between gap-4 text-[13px] text-ink-muted">
                  <span>
                    Capital required <strong className="font-semibold text-ink">{result.capitalPct.toFixed(1)}%</strong>
                  </span>
                  <span>
                    Cash remaining <strong className="font-semibold text-ink">{result.feasible ? result.cashRemainingPct.toFixed(1) : "0.0"}%</strong>
                  </span>
                </div>
                <div className="relative h-7 overflow-hidden rounded-vsc-md bg-canvas-sunk" aria-hidden="true">
                  <div className="h-full bg-growth transition-[width] duration-200" style={{ width: `${Math.min(100, result.capitalPct)}%` }} />
                  {!result.feasible && <div className="absolute right-0 top-0 h-full w-1.5 bg-clay" />}
                </div>
                <div className="mt-1.5 flex justify-between text-[12px] text-ink-faint">
                  <span>Position value</span>
                  <span>Available cash</span>
                </div>
              </div>

              {!result.feasible && (
                <div className="mt-5 rounded-vsc-lg border border-clay/25 bg-clay-tint p-4 text-[14px] leading-relaxed text-ink-muted">
                  <strong className="mb-1 block font-semibold text-clay">Not fully fundable with available cash.</strong>
                  <p className="text-[14px] text-ink-muted">
                    This risk-based position requires {formatINR(result.positionValue)}, which is {formatINR(result.extraCapital)} more than your available capital of {formatINR(result.capital)}.
                  </p>
                  <p className="mt-2 border-t border-clay/15 pt-2 text-[13px] text-ink-muted">
                    With available cash only, the maximum fundable quantity is {formatNumber(result.affordableShares)} shares. At this entry and stop, that corresponds to about {result.maxCashRiskPct.toFixed(2)}% planned account risk.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  accent = false,
  warning = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  warning?: boolean;
}) {
  return (
    <div>
      <div className="mb-0.5 text-[12px] text-ink-faint">{label}</div>
      <div className={`font-mono text-[15px] font-semibold ${warning ? "text-clay" : accent ? "text-growth" : "text-ink"}`}>{value}</div>
    </div>
  );
}

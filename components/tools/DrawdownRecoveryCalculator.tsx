"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { computeDrawdownRecovery, type DrawdownRecoveryResult } from "@/lib/calculators/drawdown-recovery";
import { PostResultCTA } from "@/components/tools/PostResultCTA";

// Lets a click anywhere in the input's padded box focus the field, since
// the visible box is taller than the native input element it wraps.
function focusFirstInput(event: MouseEvent<HTMLDivElement>) {
  event.currentTarget.querySelector("input")?.focus();
}

const DEFAULTS = {
  peak: "1000000",
  current: "700000",
};

function formatINR(value: number, decimals = 0) {
  return `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function formatPct(value: number, decimals = 1) {
  return `${Number(value).toFixed(decimals)}%`;
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

export function DrawdownRecoveryCalculator() {
  const [peak, setPeak] = useState(DEFAULTS.peak);
  const [current, setCurrent] = useState(DEFAULTS.current);

  const result = useMemo<DrawdownRecoveryResult>(() => computeDrawdownRecovery(peak, current), [peak, current]);

  const loadExample = () => {
    setPeak(DEFAULTS.peak);
    setCurrent(DEFAULTS.current);
  };

  const clearAll = () => {
    setPeak("");
    setCurrent("");
  };

  const inputClass =
    "w-full min-w-0 appearance-none bg-transparent font-ui text-[16px] font-medium text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
  const inputWrapClass =
    "flex min-h-12 items-center gap-2 rounded-vsc-lg border border-rule bg-surface-warm px-4 py-3 transition-[border-color,box-shadow] duration-150 focus-within:border-growth focus-within:shadow-[0_0_0_3px_rgba(15,122,64,0.08)]";

  const statusLabel =
    result.state === "new-high" ? "New high" : result.state === "at-peak" ? "At peak" : result.state === "below-peak" ? "Below peak" : null;
  const statusGood = result.state === "new-high" || result.state === "at-peak";

  return (
    <section aria-label="VSC drawdown and recovery calculator" className="overflow-hidden rounded-vsc-xl border border-rule bg-surface shadow-lift-2">
      <div className="grid lg:grid-cols-[0.93fr_1.07fr]">
        <div className="border-b border-rule p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="mb-5 text-[13px] font-semibold text-ink-faint">Account values</p>

          <div className="space-y-5">
            <div>
              <label htmlFor="peak" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Peak account value
              </label>
              <div className={inputWrapClass} onClick={focusFirstInput}>
                <span className="shrink-0 text-[15px] font-medium text-ink-faint">₹</span>
                <input
                  id="peak"
                  className={inputClass}
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={peak}
                  aria-describedby="peak-help peak-hint"
                  onChange={(event) => setPeak(event.target.value)}
                />
              </div>
              <p id="peak-help" className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                Highest comparable account value you want to measure from.
              </p>
              {indianAmountLabel(peak) && (
                <p id="peak-hint" className="mt-1.5 text-[13px] font-semibold text-growth">
                  {indianAmountLabel(peak)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="current" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Current account value
              </label>
              <div className={inputWrapClass} onClick={focusFirstInput}>
                <span className="shrink-0 text-[15px] font-medium text-ink-faint">₹</span>
                <input
                  id="current"
                  className={inputClass}
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={current}
                  aria-describedby="current-help current-hint"
                  onChange={(event) => setCurrent(event.target.value)}
                />
              </div>
              <p id="current-help" className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                Current comparable account value after the decline.
              </p>
              {indianAmountLabel(current) && (
                <p id="current-hint" className="mt-1.5 text-[13px] font-semibold text-growth">
                  {indianAmountLabel(current)}
                </p>
              )}
            </div>
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-ink-faint">
            Use values on a comparable basis. Deposits or withdrawals should be accounted for before interpreting the result as trading drawdown.
          </p>

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
            <p className="text-[13px] font-semibold text-ink-faint">Drawdown state</p>
            {statusLabel && (
              <span
                className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                  statusGood ? "bg-growth-tint text-growth" : "bg-clay-tint text-clay"
                }`}
              >
                {statusLabel}
              </span>
            )}
          </div>

          {result.state === "empty" ? (
            <p className="py-3 text-[15px] text-ink-faint">{result.message}</p>
          ) : (
            <>
              <p className="text-[14px] text-ink-muted">Current drawdown</p>
              <div className="mt-1 flex items-baseline gap-2">
                <strong
                  className={`font-display text-[44px] font-semibold leading-none tracking-[-0.04em] sm:text-[52px] ${
                    result.state === "below-peak" ? "text-clay" : "text-growth"
                  }`}
                >
                  {result.state === "below-peak" ? formatPct(result.drawdownPct, 1) : "0.0%"}
                </strong>
              </div>

              {result.state === "new-high" && (
                <p className="mt-2 max-w-[520px] text-[13px] text-ink-faint">
                  Current account value is above the entered peak. Treat the current value as a new peak if it reflects comparable equity.
                </p>
              )}
              {result.state === "at-peak" && (
                <p className="mt-2 max-w-[520px] text-[13px] text-ink-faint">
                  Current account value equals the entered peak. No recovery is required.
                </p>
              )}
              {result.state === "below-peak" && (
                <p className="mt-2 max-w-[520px] text-[13px] text-ink-faint">
                  A {formatPct(result.drawdownPct, 1)} drawdown requires a {formatPct(result.recoveryPct, 2)} gain on the remaining capital to return to the same peak.
                </p>
              )}

              {result.state === "new-high" && (
                <div className="my-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-rule py-5">
                  <Metric label="Above entered peak" value={formatINR(result.excess)} accent />
                  <Metric label="Gain above peak" value={formatPct(result.gainPct, 2)} accent />
                  <Metric label="Entered peak" value={formatINR(result.peak)} />
                  <Metric label="Current value" value={formatINR(result.current)} />
                </div>
              )}

              {result.state === "at-peak" && (
                <div className="my-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-rule py-5">
                  <Metric label="Capital remaining" value="100.0%" />
                  <Metric label="Recovery required" value="0.0%" accent />
                  <Metric label="Rupee drawdown" value={formatINR(0)} />
                  <Metric label="Current value" value={formatINR(result.current)} />
                </div>
              )}

              {result.state === "below-peak" && (
                <>
                  <div className="my-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-rule py-5">
                    <Metric label="Rupee drawdown" value={formatINR(result.loss)} warning />
                    <Metric label="Recovery required" value={`+${formatPct(result.recoveryPct, 2)}`} accent />
                    <Metric label="Capital remaining" value={formatPct(result.remainingPct, 1)} />
                    <Metric label="Rupees back to peak" value={formatINR(result.loss)} />
                  </div>

                  <div>
                    <p className="mb-2 text-[12px] text-ink-faint">Capital path</p>
                    <div
                      className="relative h-3 overflow-hidden rounded-full border border-rule bg-canvas-sunk"
                      aria-label="Current account equity as a percentage of the prior peak"
                    >
                      <div
                        className="h-full rounded-full bg-clay transition-[width] duration-200"
                        style={{ width: `${Math.max(0, Math.min(100, result.remainingPct))}%` }}
                      />
                    </div>
                    <div className="mt-1.5 flex justify-between text-[11px] text-ink-faint">
                      <span>Current equity {formatPct(result.remainingPct, 1)} of peak</span>
                      <span>Peak 100%</span>
                    </div>

                    <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3.5 rounded-vsc-lg border border-rule bg-surface-warm p-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.08em] text-ink-faint">Current value</div>
                        <div className="mt-0.5 font-mono text-[15px] font-semibold text-ink">{formatINR(result.current)}</div>
                      </div>
                      <div className="whitespace-nowrap text-center font-semibold text-growth">
                        →
                        <small className="mt-0.5 block text-[10px] font-semibold text-growth">
                          +{formatPct(result.recoveryPct, 2)} required
                        </small>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.08em] text-ink-faint">Prior peak</div>
                        <div className="mt-0.5 font-mono text-[15px] font-semibold text-ink">{formatINR(result.peak)}</div>
                      </div>
                    </div>
                    <p className="mt-3.5 text-[12px] leading-relaxed text-ink-muted">
                      The rupee amount lost and the rupee amount needed to return to the peak are the same. The percentages differ because recovery begins from a smaller base.
                    </p>
                  </div>
                </>
              )}

              <PostResultCTA className="mt-6" />
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

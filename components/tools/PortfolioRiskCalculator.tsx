"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { computePortfolioAggregate, type PositionRow } from "@/lib/calculators/portfolio-risk";

// Lets a click anywhere in the input's padded box focus the field, since
// the visible box is taller than the native input element it wraps.
function focusFirstInput(event: MouseEvent<HTMLDivElement>) {
  event.currentTarget.querySelector("input")?.focus();
}

const MAX_ROWS = 8;

const EXAMPLE_ACCOUNT = "500000";

const EXAMPLE_ROWS: PositionRow[] = [
  { name: "RELIANCE", group: "Energy", entry: "1500", stop: "1450", shares: "50" },
  { name: "INFY", group: "Technology", entry: "1600", stop: "1520", shares: "30" },
  { name: "HAL", group: "Defence", entry: "4500", stop: "4300", shares: "12" },
  { name: "BEL", group: "Defence", entry: "400", stop: "380", shares: "60" },
];

function blankRow(): PositionRow {
  return { name: "", group: "", entry: "", stop: "", shares: "" };
}

function formatINR(value: number) {
  return `₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function formatPct(value: number, decimals = 2) {
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

const fieldInputClass =
  "w-full min-w-0 appearance-none bg-transparent font-ui text-[16px] font-medium text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
const fieldWrapClass =
  "flex min-h-12 items-center gap-2 rounded-vsc-lg border border-rule bg-surface-warm px-4 py-3 transition-[border-color,box-shadow] duration-150 focus-within:border-growth focus-within:shadow-[0_0_0_3px_rgba(15,122,64,0.08)]";
const miniInputClass =
  "w-full min-w-0 appearance-none bg-transparent font-ui text-[13px] font-medium text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
const miniWrapClass =
  "flex min-h-10 items-center gap-1.5 rounded-vsc-md border border-rule bg-surface px-2.5 py-2 transition-[border-color,box-shadow] duration-150 focus-within:border-growth focus-within:shadow-[0_0_0_3px_rgba(15,122,64,0.08)]";

export function PortfolioRiskCalculator() {
  const [account, setAccount] = useState(EXAMPLE_ACCOUNT);
  const [limit, setLimit] = useState("");
  const [rows, setRows] = useState<PositionRow[]>(() => [blankRow(), blankRow(), blankRow()]);

  const accountValue = Number.parseFloat(account) || 0;
  const limitValue = Number.parseFloat(limit) || 0;

  const aggregate = useMemo(
    () => computePortfolioAggregate(rows, accountValue, limitValue),
    [rows, accountValue, limitValue],
  );

  const {
    rowCalcs,
    activeItems,
    totalRisk,
    totalValue,
    totalRiskPct,
    exposurePct,
    hasLimit,
    remaining,
    usedPct,
    isOverLimit,
    largest,
  } = aggregate;

  // Display-only cap — the pure aggregate returns every group.
  const groups = aggregate.groups.slice(0, 5);

  const updateRow = (index: number, key: keyof PositionRow, value: string) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  const addRow = () => {
    setRows((prev) => (prev.length < MAX_ROWS ? [...prev, blankRow()] : prev));
  };

  const removeRow = (index: number) => {
    setRows((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [blankRow()];
    });
  };

  const loadExample = () => {
    setAccount(EXAMPLE_ACCOUNT);
    setLimit("");
    setRows(EXAMPLE_ROWS);
  };

  const clearPositions = () => {
    setRows([blankRow(), blankRow(), blankRow()]);
  };

  const badgeLabel = hasLimit ? (isOverLimit ? "Above selected limit" : "Within selected limit") : "No risk limit";
  const badgeClass = hasLimit
    ? isOverLimit
      ? "bg-clay-tint text-clay"
      : "bg-growth-tint text-growth-deep"
    : "bg-canvas-sunk text-ink-muted";

  return (
    <section
      aria-label="VSC portfolio risk calculator"
      className="overflow-hidden rounded-vsc-xl border border-rule bg-surface shadow-lift-2"
    >
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-rule p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="mb-5 text-[13px] font-semibold text-ink-faint">Portfolio settings</p>

          <div className="space-y-5">
            <div>
              <label htmlFor="pr-account" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Trading account size
              </label>
              <div className={fieldWrapClass} onClick={focusFirstInput}>
                <span className="shrink-0 text-[15px] font-medium text-ink-faint">₹</span>
                <input
                  id="pr-account"
                  className={fieldInputClass}
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={account}
                  aria-describedby="pr-account-help pr-account-hint"
                  onChange={(event) => setAccount(event.target.value)}
                />
              </div>
              <p id="pr-account-help" className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                Capital used as the denominator for total portfolio risk.
              </p>
              {indianAmountLabel(account) && (
                <p id="pr-account-hint" className="mt-1.5 text-[13px] font-semibold text-growth">
                  {indianAmountLabel(account)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="pr-limit" className="mb-1.5 block text-[14px] font-medium text-ink-muted">
                Maximum total account risk — optional
              </label>
              <div className={fieldWrapClass} onClick={focusFirstInput}>
                <input
                  id="pr-limit"
                  className={fieldInputClass}
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  inputMode="decimal"
                  value={limit}
                  aria-describedby="pr-limit-help pr-limit-hint"
                  onChange={(event) => setLimit(event.target.value)}
                />
                <span className="shrink-0 text-[14px] font-medium text-ink-faint">%</span>
              </div>
              <p id="pr-limit-help" className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">
                The most of your trading account you choose to have at risk across all open positions at the same
                time. VSC does not prescribe a universal limit.
              </p>
              {accountValue > 0 && limitValue > 0 && (
                <p id="pr-limit-hint" className="mt-1.5 text-[13px] font-semibold text-growth">
                  {formatINR((accountValue * limitValue) / 100)} selected maximum risk amount
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex min-h-full flex-col p-5 sm:p-7" aria-live="polite">
          <div className="mb-2 flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold text-ink-faint">Total portfolio risk</p>
              <p className="mt-2 text-[14px] text-ink-muted">Account at risk if all stops are hit</p>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${badgeClass}`}>
              {badgeLabel}
            </span>
          </div>

          {accountValue > 0 ? (
            <>
              <div className="mt-1 flex items-baseline gap-2">
                <strong className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em] text-growth sm:text-[52px]">
                  {formatPct(totalRiskPct, 2)}
                </strong>
              </div>
              <p className="mt-2 max-w-[520px] text-[13px] text-ink-faint">
                {activeItems.length
                  ? `${formatINR(totalRisk)} across ${activeItems.length} active ${activeItems.length === 1 ? "position" : "positions"}`
                  : "Add positions below to calculate aggregate risk."}
              </p>

              <div className="my-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-rule py-5">
                <Metric label="Total rupee risk" value={formatINR(totalRisk)} warning />
                <Metric label="Capital deployed at entry" value={`${formatINR(totalValue)} · ${formatPct(exposurePct, 1)}`} />
                <Metric label="Active positions" value={String(activeItems.length)} />
                {hasLimit ? (
                  <Metric
                    label={isOverLimit ? "Above limit by" : "Risk capacity remaining"}
                    value={formatINR(Math.abs(remaining))}
                    warning={isOverLimit}
                    accent={!isOverLimit}
                  />
                ) : (
                  <Metric label="Maximum total account risk" value="Not set" />
                )}
              </div>

              {hasLimit && (
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3 text-[12px] text-ink-muted">
                    <span>Risk limit used {formatPct(usedPct, 1)}</span>
                    <span>Selected limit {formatPct(limitValue, 2)}</span>
                  </div>
                  <div
                    className="h-3 overflow-hidden rounded-full border border-rule bg-canvas-sunk"
                    aria-label="Combined stop-loss risk compared with the selected risk limit"
                  >
                    <div
                      className={`h-full rounded-full transition-[width] duration-200 ${isOverLimit ? "bg-clay" : "bg-growth"}`}
                      style={{ width: `${Math.min(100, Math.max(0, usedPct))}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11.5px] text-ink-faint">
                    {isOverLimit
                      ? "The combined stop-loss risk is above the limit you entered."
                      : "This compares the current combined stop-loss risk with the limit you entered."}
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="py-3 text-[15px] text-ink-faint">Enter a valid account size.</p>
          )}
        </div>
      </div>

      <div className="border-t border-rule p-5 sm:p-7">
        <div className="mb-3.5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-[22px] font-semibold text-ink">Open positions</p>
            <p className="text-[12.5px] text-ink-faint">
              For long cash-equity positions. Each position&apos;s risk is measured from entry price to stop-loss.
            </p>
          </div>
          <button
            type="button"
            onClick={addRow}
            disabled={rows.length >= MAX_ROWS}
            className="min-h-11 rounded-vsc-md border border-rule bg-surface-warm px-3 text-[13px] font-semibold text-growth disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Add position
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {rows.map((row, index) => {
            const calc = rowCalcs[index];
            return (
              <div
                key={index}
                className="grid grid-cols-2 gap-x-3 gap-y-3 rounded-vsc-lg border border-rule bg-surface-warm p-3 sm:grid-cols-3 lg:grid-cols-[1.15fr_0.9fr_0.8fr_0.8fr_0.7fr_0.95fr_32px] lg:items-start lg:gap-2.5"
              >
                <div>
                  <label htmlFor={`pr-name-${index}`} className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.05em] text-ink-faint">
                    Position
                  </label>
                  <div className={miniWrapClass} onClick={focusFirstInput}>
                    <input
                      id={`pr-name-${index}`}
                      className={miniInputClass}
                      type="text"
                      placeholder="e.g. INFY"
                      value={row.name}
                      onChange={(event) => updateRow(index, "name", event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`pr-group-${index}`} className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.05em] text-ink-faint">
                    Sector / theme
                  </label>
                  <div className={miniWrapClass} onClick={focusFirstInput}>
                    <input
                      id={`pr-group-${index}`}
                      className={miniInputClass}
                      type="text"
                      placeholder="optional"
                      value={row.group}
                      onChange={(event) => updateRow(index, "group", event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`pr-entry-${index}`} className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.05em] text-ink-faint">
                    Entry
                  </label>
                  <div className={miniWrapClass} onClick={focusFirstInput}>
                    <span className="shrink-0 text-[12px] text-ink-faint">₹</span>
                    <input
                      id={`pr-entry-${index}`}
                      className={miniInputClass}
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      value={row.entry}
                      onChange={(event) => updateRow(index, "entry", event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`pr-stop-${index}`} className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.05em] text-ink-faint">
                    Stop
                  </label>
                  <div className={miniWrapClass} onClick={focusFirstInput}>
                    <span className="shrink-0 text-[12px] text-ink-faint">₹</span>
                    <input
                      id={`pr-stop-${index}`}
                      className={miniInputClass}
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      value={row.stop}
                      onChange={(event) => updateRow(index, "stop", event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`pr-shares-${index}`} className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.05em] text-ink-faint">
                    Shares
                  </label>
                  <div className={miniWrapClass} onClick={focusFirstInput}>
                    <input
                      id={`pr-shares-${index}`}
                      className={miniInputClass}
                      type="number"
                      min="0"
                      step="1"
                      inputMode="numeric"
                      value={row.shares}
                      onChange={(event) => updateRow(index, "shares", event.target.value)}
                    />
                  </div>
                </div>

                <div className="lg:pt-[26px]">
                  <div className="text-[10px] uppercase tracking-[0.05em] text-ink-faint">Stop-loss risk</div>
                  <div className={`mt-0.5 font-mono text-[13px] font-semibold ${calc.active ? "text-clay" : "text-ink-faint"}`}>
                    {calc.active ? formatINR(calc.risk) : "—"}
                  </div>
                  <div className="text-[10.5px] text-ink-faint">
                    {calc.active && accountValue > 0 ? `${formatPct(calc.riskPct, 2)} of account` : "stop-loss risk"}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  aria-label={`Remove position ${index + 1}`}
                  className="flex h-8 w-8 items-center justify-center self-start rounded-vsc-md text-[18px] text-ink-faint hover:text-clay lg:mt-[18px] lg:self-auto"
                >
                  ×
                </button>

                {calc.error && <p className="col-span-full text-[11px] text-clay">{calc.error}</p>}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[13px] leading-relaxed text-ink-faint">
            If a stop has moved to or above entry, this tool counts the planned entry-to-stop loss as ₹0. Gap risk
            can still remain.
          </p>
          <div className="flex items-center gap-5">
            <button type="button" onClick={loadExample} className="min-h-11 whitespace-nowrap text-[14px] font-semibold text-growth hover:text-growth-deep">
              Load example
            </button>
            <button type="button" onClick={clearPositions} className="min-h-11 whitespace-nowrap text-[14px] font-semibold text-ink-muted hover:text-ink">
              Clear positions
            </button>
          </div>
        </div>

        {activeItems.length > 0 && (
          <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
            <div className="rounded-vsc-lg border border-rule bg-surface-warm p-4">
              <p className="mb-2.5 text-[12px] text-ink-faint">Largest risk contributor</p>
              {largest && (
                <>
                  <p className="text-[14px] font-semibold text-ink">
                    {largest.row.name.trim() || "Unnamed position"} · <span className="text-clay">{formatINR(largest.calc.risk)}</span>
                  </p>
                  <p className="mt-2 text-[10.8px] leading-relaxed text-ink-faint">
                    {formatPct(largest.calc.riskPct, 2)} of account ·{" "}
                    {formatPct(totalRisk > 0 ? (largest.calc.risk / totalRisk) * 100 : 0, 1)} of total portfolio risk.
                  </p>
                </>
              )}
            </div>

            <div className="rounded-vsc-lg border border-rule bg-surface-warm p-4">
              <p className="mb-2.5 text-[12px] text-ink-faint">Risk by sector / theme</p>
              {groups.length ? (
                groups.map(([name, risk]) => (
                  <div key={name} className="my-1.5 flex items-center justify-between gap-3 text-[12px]">
                    <span className="text-ink-muted">{name}</span>
                    <span className="font-mono font-semibold text-ink">
                      {formatINR(risk)} · {formatPct(accountValue > 0 ? (risk / accountValue) * 100 : 0, 2)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[10.8px] leading-relaxed text-ink-faint">
                  Add optional groups to aggregate risk by sector, theme or another driver.
                </p>
              )}
              <p className="mt-2 text-[10.8px] leading-relaxed text-ink-faint">
                Grouping is descriptive only. It does not estimate statistical correlation.
              </p>
            </div>
          </div>
        )}
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

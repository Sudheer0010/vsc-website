"use client";

import { ChevronDown } from "lucide-react";
import type { MouseEvent } from "react";
import { VSCButton } from "@/components/ui/vsc/VSCButton";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { theoreticalExpectancy, type PathSimulatorValidation } from "@/lib/calculators/trading-expectancy-path-simulator";

export const TRADE_COUNT_OPTIONS = [50, 100, 200, 500, 1000] as const;
export type TradeCount = (typeof TRADE_COUNT_OPTIONS)[number];

// Lets a click anywhere in the input's padded box focus the field, since
// the visible box is taller than the native input element it wraps.
function focusFirstInput(event: MouseEvent<HTMLDivElement>) {
  event.currentTarget.querySelector("input")?.focus();
}

function formatR(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}R`;
}

const inputClass =
  "w-full min-w-0 appearance-none bg-transparent font-ui text-[15px] font-medium text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
const inputWrapClass =
  "flex min-h-11 items-center gap-2 rounded-vsc-lg border border-rule bg-surface-warm px-3.5 py-2.5 transition-[border-color,box-shadow] duration-150 focus-within:border-growth focus-within:shadow-[0_0_0_3px_rgba(15,122,64,0.08)]";

export function PathSimulatorControlRail({
  winRate,
  avgWin,
  avgLoss,
  tradeCount,
  onWinRateChange,
  onAvgWinChange,
  onAvgLossChange,
  onTradeCountChange,
  validation,
  onRun,
}: {
  winRate: string;
  avgWin: string;
  avgLoss: string;
  tradeCount: TradeCount;
  onWinRateChange: (value: string) => void;
  onAvgWinChange: (value: string) => void;
  onAvgLossChange: (value: string) => void;
  onTradeCountChange: (value: TradeCount) => void;
  validation: PathSimulatorValidation;
  onRun: () => void;
}) {
  return (
    <div className="lg:sticky lg:top-[88px] lg:self-start">
      <div className="mb-2 flex items-center gap-2.5 text-[13px] font-semibold text-growth">
        <StepRule size="sm" />
        <span>Advanced · System analysis</span>
      </div>
      <h1 className="font-display text-[21px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[23px]">
        Trading Expectancy Path Simulator
      </h1>
      <p className="mt-2 text-[13.5px] leading-snug text-ink-muted">
        One set of assumptions. Twenty possible trading paths. Explore how sequence alone can change drawdowns,
        losing streaks and realized results.
      </p>

      <p className="mt-3 rounded-vsc-md bg-canvas-sunk px-3 py-2.5 text-[11.5px] leading-snug text-ink-muted">
        Simplified probability model — not a strategy backtest or forecast. Assumes independent trades with stable
        win/loss characteristics.
      </p>

      <div className="mt-5 border-t border-rule pt-5">
        <p className="mb-3 text-[13px] font-semibold text-ink-faint">01 · Set the assumptions</p>

        <div className="space-y-3">
          <div>
            <label htmlFor="sim-win-rate" className="mb-1 block text-[12.5px] font-medium text-ink-muted">
              Win rate
            </label>
            <div className={inputWrapClass} onClick={focusFirstInput}>
              <input
                id="sim-win-rate"
                className={inputClass}
                type="number"
                min="0"
                max="100"
                step="any"
                inputMode="decimal"
                value={winRate}
                onChange={(event) => onWinRateChange(event.target.value)}
              />
              <span className="shrink-0 text-[13px] font-medium text-ink-faint">%</span>
            </div>
          </div>

          <div>
            <label htmlFor="sim-avg-win" className="mb-1 block text-[12.5px] font-medium text-ink-muted">
              Average win (R)
            </label>
            <div className={inputWrapClass} onClick={focusFirstInput}>
              <input
                id="sim-avg-win"
                className={inputClass}
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={avgWin}
                onChange={(event) => onAvgWinChange(event.target.value)}
              />
              <span className="shrink-0 text-[13px] font-medium text-ink-faint">R</span>
            </div>
          </div>

          <div>
            <label htmlFor="sim-avg-loss" className="mb-1 block text-[12.5px] font-medium text-ink-muted">
              Average loss (R)
            </label>
            <div className={inputWrapClass} onClick={focusFirstInput}>
              <input
                id="sim-avg-loss"
                className={inputClass}
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={avgLoss}
                onChange={(event) => onAvgLossChange(event.target.value)}
              />
              <span className="shrink-0 text-[13px] font-medium text-ink-faint">R</span>
            </div>
            <p className="mt-1 text-[11px] leading-snug text-ink-faint">
              Positive magnitude — a full 1R loss is entered as 1.00.
            </p>
          </div>

          <div>
            <label htmlFor="sim-trades" className="mb-1 block text-[12.5px] font-medium text-ink-muted">
              Number of trades
            </label>
            <div className="relative">
              <select
                id="sim-trades"
                value={tradeCount}
                onChange={(event) => onTradeCountChange(Number(event.target.value) as TradeCount)}
                className="min-h-11 w-full appearance-none rounded-vsc-lg border border-rule bg-surface-warm px-3.5 pr-9 font-ui text-[15px] font-medium text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-growth focus:shadow-[0_0_0_3px_rgba(15,122,64,0.08)]"
              >
                {TRADE_COUNT_OPTIONS.map((count) => (
                  <option key={count} value={count}>
                    {count.toLocaleString("en-IN")} trades
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <VSCButton type="button" variant="growth" onClick={onRun} disabled={validation.state !== "valid"} className="mt-4 w-full">
          Run simulation
        </VSCButton>

        {validation.state === "invalid" ? (
          <p className="mt-2.5 text-[12px] text-clay">{validation.message}</p>
        ) : (
          <div className="mt-2.5 rounded-vsc-md border border-rule bg-surface-warm px-3 py-2.5">
            <p className="text-[10.5px] font-medium text-ink-faint">Theoretical expectancy</p>
            <p className="mt-0.5 font-mono text-[12px] leading-snug text-ink">
              ({(validation.winRate / 100).toFixed(2)} × {validation.avgWin.toFixed(2)}) − (
              {(1 - validation.winRate / 100).toFixed(2)} × {validation.avgLoss.toFixed(2)}) ={" "}
              <span className="font-semibold text-growth">
                {formatR(theoreticalExpectancy(validation.winRate, validation.avgWin, validation.avgLoss))}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { ChevronDown } from "lucide-react";
import type { MouseEvent } from "react";
import { VSCButton } from "@/components/ui/vsc/VSCButton";
import { StepRule } from "@/components/ui/vsc/StepRule";
import {
  SIMULATION_RUNS,
  theoreticalExpectancy,
  type PathSimulatorValidation,
} from "@/lib/calculators/trading-expectancy-path-simulator";

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
  "w-full min-w-0 appearance-none bg-transparent font-ui text-[16px] font-medium text-ink outline-none [appearance:textfield] lg:text-[15px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";
const inputWrapClass =
  "flex min-h-11 items-center gap-2 rounded-vsc-lg border border-rule bg-surface-warm px-3.5 py-2.5 transition-[border-color,box-shadow] duration-150 focus-within:border-growth focus-within:shadow-[0_0_0_3px_rgba(15,122,64,0.08)]";
const validationErrorId = "sim-validation-error";

export function PathSimulatorControlRail({
  winRate,
  avgWin,
  avgLoss,
  tradeCount,
  carriedSample,
  onWinRateChange,
  onAvgWinChange,
  onAvgLossChange,
  onTradeCountChange,
  validation,
  onRun,
  isRunning,
  progress,
}: {
  winRate: string;
  avgWin: string;
  avgLoss: string;
  tradeCount: TradeCount;
  /** Sample size the edge was measured on, when arriving from the calculator. */
  carriedSample: number | null;
  onWinRateChange: (value: string) => void;
  onAvgWinChange: (value: string) => void;
  onAvgLossChange: (value: string) => void;
  onTradeCountChange: (value: TradeCount) => void;
  validation: PathSimulatorValidation;
  onRun: () => void;
  isRunning: boolean;
  /** 0..1 across the simulated runs, for the in-progress label. */
  progress: number;
}) {
  const hasValidationError = validation.state === "invalid";
  const winRateValue = Number.parseFloat(winRate);
  const avgWinValue = Number.parseFloat(avgWin);
  const avgLossValue = Number.parseFloat(avgLoss);
  const winRateInvalid = hasValidationError && !(winRateValue > 0 && winRateValue < 100);
  const avgWinInvalid = hasValidationError && !(avgWinValue > 0);
  const avgLossInvalid = hasValidationError && !(avgLossValue > 0);

  return (
    <div className="lg:sticky lg:top-[88px] lg:self-start">
      <div className="mb-2 flex items-center gap-2.5 text-[13px] font-semibold text-growth">
        <StepRule size="sm" />
        <span>Advanced · System analysis</span>
      </div>
      <h1 className="font-display text-[21px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[23px]">
        Trading Edge Stress Test
      </h1>
      <p className="mt-2 text-[13.5px] leading-snug text-ink-muted">
        See the range of outcomes, drawdowns and losing streaks your trading assumptions can produce.
      </p>

      <div className="mt-3 rounded-vsc-md border border-rule bg-surface-warm px-3 py-2.5">
        <p className="text-[12px] leading-snug text-ink-muted">
          Enter an edge you believe you have. The test runs it{" "}
          {SIMULATION_RUNS.toLocaleString("en-IN")} times over the horizon you choose, and reports how
          differently those runs turn out.
        </p>
      </div>

      <p className="mt-3 rounded-vsc-md bg-canvas-sunk px-3 py-2.5 text-[11.5px] leading-snug text-ink-muted">
        <strong className="font-semibold text-ink">R</strong> is one unit of risk — whatever you put at
        stake on a single trade. A trade that makes twice what it risked is +2R, and a full stop-out is
        −1R. Working in R keeps the maths independent of account size.
      </p>

      {carriedSample !== null && carriedSample < 100 && (
        <p className="mt-3 rounded-vsc-md border border-clay/30 bg-clay/5 px-3 py-2.5 text-[11.5px] leading-snug text-ink-muted">
          This edge was measured on {carriedSample.toLocaleString("en-IN")} trades. That is a small sample,
          so treat the assumptions below as rough — the stress test cannot tell you whether they are right.
        </p>
      )}

      <div className="mt-5 border-t border-rule pt-5">
        <p className="mb-3 text-[13px] font-semibold text-ink-faint">01 · Set the assumptions</p>

        <div className="space-y-3">
          <div>
            <label htmlFor="sim-win-rate" className="mb-1 block text-[12.5px] font-medium text-ink-muted">
              Win rate
            </label>
            <p className="mb-1 text-[11px] leading-snug text-ink-faint">
              Share of trades you expect to finish profitable.
            </p>
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
                aria-invalid={winRateInvalid || undefined}
                aria-describedby={winRateInvalid ? validationErrorId : undefined}
                onChange={(event) => onWinRateChange(event.target.value)}
              />
              <span className="shrink-0 text-[13px] font-medium text-ink-faint">%</span>
            </div>
          </div>

          <div>
            <label htmlFor="sim-avg-win" className="mb-1 block text-[12.5px] font-medium text-ink-muted">
              Average win
            </label>
            <p className="mb-1 text-[11px] leading-snug text-ink-faint">
              Typical winner, in multiples of what you risked.
            </p>
            <div className={inputWrapClass} onClick={focusFirstInput}>
              <input
                id="sim-avg-win"
                className={inputClass}
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={avgWin}
                aria-invalid={avgWinInvalid || undefined}
                aria-describedby={avgWinInvalid ? validationErrorId : undefined}
                onChange={(event) => onAvgWinChange(event.target.value)}
              />
              <span className="shrink-0 text-[13px] font-medium text-ink-faint">R</span>
            </div>
          </div>

          <div>
            <label htmlFor="sim-avg-loss" className="mb-1 block text-[12.5px] font-medium text-ink-muted">
              Average loss
            </label>
            <p className="mb-1 text-[11px] leading-snug text-ink-faint">
              Typical loser, in multiples of what you risked.
            </p>
            <div className={inputWrapClass} onClick={focusFirstInput}>
              <input
                id="sim-avg-loss"
                className={inputClass}
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={avgLoss}
                aria-invalid={avgLossInvalid || undefined}
                aria-describedby={avgLossInvalid ? validationErrorId : undefined}
                onChange={(event) => onAvgLossChange(event.target.value)}
              />
              <span className="shrink-0 text-[13px] font-medium text-ink-faint">R</span>
            </div>
            <p className="mt-1 text-[11px] leading-snug text-ink-faint">
              Enter it as a positive number — a full stop-out is 1.00.
            </p>
          </div>

          <div>
            <label htmlFor="sim-trades" className="mb-1 block text-[12.5px] font-medium text-ink-muted">
              How many trades ahead?
            </label>
            <p className="mb-1 text-[11px] leading-snug text-ink-faint">
              The horizon to test — not how many trades you have already taken.
            </p>
            <div className="relative">
              <select
                id="sim-trades"
                value={tradeCount}
                onChange={(event) => onTradeCountChange(Number(event.target.value) as TradeCount)}
                className="min-h-11 w-full appearance-none rounded-vsc-lg border border-rule bg-surface-warm px-3.5 pr-9 font-ui text-[16px] font-medium text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-growth focus:shadow-[0_0_0_3px_rgba(15,122,64,0.08)] lg:text-[15px]"
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

        <VSCButton
          type="button"
          variant="growth"
          onClick={onRun}
          disabled={validation.state !== "valid" || isRunning}
          className="mt-4 w-full"
        >
          {isRunning ? `Running… ${Math.round(progress * 100)}%` : "Run stress test"}
        </VSCButton>
        <p aria-live="polite" className="sr-only">
          {isRunning ? `Simulation ${Math.round(progress * 100)} percent complete` : ""}
        </p>

        {validation.state === "invalid" ? (
          <p
            id={validationErrorId}
            aria-live="polite"
            aria-atomic="true"
            className="mt-2.5 text-[12px] text-clay"
          >
            {validation.message}
          </p>
        ) : (
          <div className="mt-2.5 rounded-vsc-md border border-rule bg-surface-warm px-3 py-2.5">
            <p className="text-[10.5px] font-medium text-ink-faint">
              Your edge, per trade (trading expectancy)
            </p>
            <p className="mt-0.5 font-mono text-[12px] leading-snug text-ink">
              ({(validation.winRate / 100).toFixed(2)} × {validation.avgWin.toFixed(2)}) − (
              {(1 - validation.winRate / 100).toFixed(2)} × {validation.avgLoss.toFixed(2)}) ={" "}
              <span className="font-semibold text-growth">
                {formatR(theoreticalExpectancy(validation.winRate, validation.avgWin, validation.avgLoss))}
              </span>
            </p>
            <p className="mt-1.5 text-[11px] leading-snug text-ink-faint">
              {edgeGloss(theoreticalExpectancy(validation.winRate, validation.avgWin, validation.avgLoss))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Turns the expectancy number into one plain sentence. Kept deterministic:
 * it restates the computed value, it never adds a judgement the maths does
 * not support.
 */
function edgeGloss(expectancy: number) {
  if (expectancy > 0) {
    return `On these assumptions the average trade returns ${expectancy.toFixed(2)}× what it risks.`;
  }
  if (expectancy < 0) {
    return `On these assumptions the average trade loses ${Math.abs(expectancy).toFixed(2)}× what it risks.`;
  }
  return "On these assumptions the average trade breaks even.";
}

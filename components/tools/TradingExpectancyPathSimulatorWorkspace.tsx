"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PathSimulatorControlRail, type TradeCount } from "@/components/tools/PathSimulatorControlRail";
import { PostResultCTA } from "@/components/tools/PostResultCTA";
import { PathSimulatorResults } from "@/components/tools/PathSimulatorResults";
import {
  SIMULATION_RUNS,
  runPathSimulationChunked,
  validatePathSimulatorInputs,
  type PathSimulatorSummary,
} from "@/lib/calculators/trading-expectancy-path-simulator";

const DEFAULTS = {
  winRate: "45",
  avgWin: "1.5",
  avgLoss: "1",
};

type Assumptions = { winRate: number; avgWin: number; avgLoss: number; trades: number };

/**
 * Prefill guard for the hand-off from the Trading Expectancy Calculator.
 *
 * Only the three edge inputs travel across. The calculator's `trades` is a
 * historical sample size — how many trades were measured — while this tool's
 * trade count is a forward horizon. Carrying one into the other would silently
 * equate two different quantities, so the sample size arrives as `sample`,
 * used for a caveat rather than as an input.
 *
 * Accepts only a finite, positive number within an optional bound; anything
 * else falls back to the default rather than seeding a broken form.
 */
function readNumericParam(raw: string | null, max?: number): string | null {
  if (raw === null) return null;
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value) || value <= 0) return null;
  if (max !== undefined && value >= max) return null;
  return String(value);
}

export function TradingExpectancyPathSimulatorWorkspace() {
  const searchParams = useSearchParams();

  // Lazy initialisers, so a prefilled edge seeds the form once and every
  // later keystroke stays under the user's control.
  const [winRate, setWinRate] = useState(
    () => readNumericParam(searchParams.get("winRate"), 100) ?? DEFAULTS.winRate,
  );
  const [avgWin, setAvgWin] = useState(() => readNumericParam(searchParams.get("avgWin")) ?? DEFAULTS.avgWin);
  const [avgLoss, setAvgLoss] = useState(
    () => readNumericParam(searchParams.get("avgLoss")) ?? DEFAULTS.avgLoss,
  );
  const [tradeCount, setTradeCount] = useState<TradeCount>(200);

  const sampleParam = Number.parseInt(searchParams.get("sample") ?? "", 10);
  const carriedSample = Number.isFinite(sampleParam) && sampleParam > 0 ? sampleParam : null;

  const [summary, setSummary] = useState<PathSimulatorSummary | null>(null);
  const [assumptions, setAssumptions] = useState<Assumptions | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const runToken = useRef(0);

  const validation = validatePathSimulatorInputs(winRate, avgWin, avgLoss, String(tradeCount));

  const runSimulation = async () => {
    if (validation.state !== "valid" || isRunning) return;

    const token = runToken.current + 1;
    runToken.current = token;
    setIsRunning(true);
    setProgress(0);

    const { winRate: p, avgWin: w, avgLoss: l, trades: n } = validation;

    try {
      // Progress is throttled to 5% steps. Calling setProgress on every slice
      // meant hundreds of React renders during a single run, and re-rendering
      // the results tree each time starved the frame budget — the measured
      // ~107ms blocks were those renders, not the simulation itself.
      let lastReported = 0;
      const nextSummary = await runPathSimulationChunked(p, w, l, n, SIMULATION_RUNS, (fraction) => {
        if (runToken.current !== token) return;
        if (fraction - lastReported >= 0.05 || fraction === 1) {
          lastReported = fraction;
          setProgress(fraction);
        }
      });

      // A newer run started while this one was yielding — discard this result.
      if (runToken.current !== token) return;

      setSummary(nextSummary);
      setAssumptions({ winRate: p, avgWin: w, avgLoss: l, trades: n });
      setSelectedIndex(null);
      setPreviewIndex(null);
    } finally {
      if (runToken.current === token) setIsRunning(false);
    }
  };

  /**
   * The results below are a snapshot of the assumptions that were live when
   * the stress test was run, but the control rail keeps editing and the
   * per-trade edge readout recomputes on every keystroke. Without this check
   * the page showed a live +4.40R edge directly above results generated at
   * +0.13R. Invalid input counts as stale too: the run button disables, so the
   * numbers on screen can no longer be reproduced from the form.
   */
  const isStale =
    summary !== null &&
    assumptions !== null &&
    (validation.state !== "valid" ||
      validation.winRate !== assumptions.winRate ||
      validation.avgWin !== assumptions.avgWin ||
      validation.avgLoss !== assumptions.avgLoss ||
      validation.trades !== assumptions.trades);

  return (
    <div className="lg:grid lg:grid-cols-[34%_1fr] lg:items-start lg:gap-x-10 xl:gap-x-14">
      <PathSimulatorControlRail
        winRate={winRate}
        avgWin={avgWin}
        avgLoss={avgLoss}
        tradeCount={tradeCount}
        carriedSample={carriedSample}
        onWinRateChange={setWinRate}
        onAvgWinChange={setAvgWin}
        onAvgLossChange={setAvgLoss}
        onTradeCountChange={setTradeCount}
        validation={validation}
        onRun={runSimulation}
        isRunning={isRunning}
        progress={progress}
      />

      <div>
        <PathSimulatorResults
          summary={summary}
          assumptions={assumptions}
          isStale={isStale}
          selectedIndex={selectedIndex}
          previewIndex={previewIndex}
          onSelect={setSelectedIndex}
          onPreview={setPreviewIndex}
        />

        {summary !== null && !isStale && !isRunning && <PostResultCTA className="mt-6" />}
      </div>
    </div>
  );
}

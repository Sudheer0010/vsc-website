"use client";

import { useState } from "react";
import { PathSimulatorControlRail, type TradeCount } from "@/components/tools/PathSimulatorControlRail";
import { PathSimulatorResults } from "@/components/tools/PathSimulatorResults";
import {
  runPathSimulation,
  validatePathSimulatorInputs,
  type PathSimulatorSummary,
} from "@/lib/calculators/trading-expectancy-path-simulator";

const DEFAULTS = {
  winRate: "45",
  avgWin: "1.5",
  avgLoss: "1",
};

const PATH_COUNT = 20;

type Assumptions = { winRate: number; avgWin: number; avgLoss: number; trades: number };

export function TradingExpectancyPathSimulatorWorkspace() {
  const [winRate, setWinRate] = useState(DEFAULTS.winRate);
  const [avgWin, setAvgWin] = useState(DEFAULTS.avgWin);
  const [avgLoss, setAvgLoss] = useState(DEFAULTS.avgLoss);
  const [tradeCount, setTradeCount] = useState<TradeCount>(200);

  const [summary, setSummary] = useState<PathSimulatorSummary | null>(null);
  const [assumptions, setAssumptions] = useState<Assumptions | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const validation = validatePathSimulatorInputs(winRate, avgWin, avgLoss, String(tradeCount));

  const runSimulation = () => {
    if (validation.state !== "valid") return;
    const nextSummary = runPathSimulation(
      validation.winRate,
      validation.avgWin,
      validation.avgLoss,
      validation.trades,
      PATH_COUNT,
    );
    setSummary(nextSummary);
    setAssumptions({
      winRate: validation.winRate,
      avgWin: validation.avgWin,
      avgLoss: validation.avgLoss,
      trades: validation.trades,
    });
    setSelectedIndex(null);
    setPreviewIndex(null);
  };

  const medianPathIndex = summary
    ? summary.paths.reduce(
        (closest, path, index) =>
          Math.abs(path.final - summary.medianFinal) < Math.abs(summary.paths[closest].final - summary.medianFinal)
            ? index
            : closest,
        0,
      )
    : 0;

  return (
    <div className="lg:grid lg:grid-cols-[34%_1fr] lg:items-start lg:gap-x-10 xl:gap-x-14">
      <PathSimulatorControlRail
        winRate={winRate}
        avgWin={avgWin}
        avgLoss={avgLoss}
        tradeCount={tradeCount}
        onWinRateChange={setWinRate}
        onAvgWinChange={setAvgWin}
        onAvgLossChange={setAvgLoss}
        onTradeCountChange={setTradeCount}
        validation={validation}
        onRun={runSimulation}
      />

      <PathSimulatorResults
        summary={summary}
        assumptions={assumptions}
        medianPathIndex={medianPathIndex}
        selectedIndex={selectedIndex}
        previewIndex={previewIndex}
        onSelect={setSelectedIndex}
        onPreview={setPreviewIndex}
      />
    </div>
  );
}

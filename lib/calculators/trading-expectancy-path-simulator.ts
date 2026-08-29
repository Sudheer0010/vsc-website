export type PathSimulatorValidation =
  | { state: "invalid"; message: string }
  | { state: "valid"; winRate: number; avgWin: number; avgLoss: number; trades: number };

export function validatePathSimulatorInputs(
  winRate: string,
  avgWin: string,
  avgLoss: string,
  trades: string,
): PathSimulatorValidation {
  const pRaw = Number.parseFloat(winRate);
  const W = Number.parseFloat(avgWin);
  const L = Number.parseFloat(avgLoss);
  const N = Number.parseInt(trades, 10);

  if (!(pRaw > 0 && pRaw < 100) || !(W > 0) || !(L > 0) || !(N >= 1)) {
    return {
      state: "invalid",
      message: "Win rate must be between 0% and 100%, and average win and average loss must both be positive.",
    };
  }

  return { state: "valid", winRate: pRaw, avgWin: W, avgLoss: L, trades: N };
}

export function theoreticalExpectancy(winRatePct: number, avgWin: number, avgLoss: number): number {
  const p = winRatePct / 100;
  return p * avgWin - (1 - p) * avgLoss;
}

export type SimulatedPath = {
  cumulative: number[];
  final: number;
  maxDrawdown: number;
  longestLossStreak: number;
};

export function generatePath(
  winRatePct: number,
  avgWin: number,
  avgLoss: number,
  trades: number,
  rng: () => number = Math.random,
): SimulatedPath {
  const p = winRatePct / 100;
  const cumulative: number[] = [0];
  let running = 0;
  let peak = 0;
  let maxDrawdown = 0;
  let currentLossStreak = 0;
  let longestLossStreak = 0;

  for (let i = 0; i < trades; i += 1) {
    const isWin = rng() < p;
    running += isWin ? avgWin : -avgLoss;
    cumulative.push(running);

    if (running > peak) peak = running;
    const drawdown = peak - running;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;

    if (isWin) {
      currentLossStreak = 0;
    } else {
      currentLossStreak += 1;
      if (currentLossStreak > longestLossStreak) longestLossStreak = currentLossStreak;
    }
  }

  return { cumulative, final: running, maxDrawdown, longestLossStreak };
}

export type PathSimulatorSummary = {
  theoreticalExpectancy: number;
  theoreticalTotal: number;
  medianFinal: number;
  finalRange: [number, number];
  drawdownRange: [number, number];
  streakRange: [number, number];
  belowZeroCount: number;
  pathCount: number;
  trades: number;
  paths: SimulatedPath[];
};

export function runPathSimulation(
  winRatePct: number,
  avgWin: number,
  avgLoss: number,
  trades: number,
  pathCount = 20,
  rng: () => number = Math.random,
): PathSimulatorSummary {
  const paths = Array.from({ length: pathCount }, () => generatePath(winRatePct, avgWin, avgLoss, trades, rng));

  const finals = paths.map((path) => path.final).sort((a, b) => a - b);
  const drawdowns = paths.map((path) => path.maxDrawdown);
  const streaks = paths.map((path) => path.longestLossStreak);

  const mid = Math.floor(finals.length / 2);
  const medianFinal = finals.length % 2 === 0 ? (finals[mid - 1] + finals[mid]) / 2 : finals[mid];

  return {
    theoreticalExpectancy: theoreticalExpectancy(winRatePct, avgWin, avgLoss),
    theoreticalTotal: theoreticalExpectancy(winRatePct, avgWin, avgLoss) * trades,
    medianFinal,
    finalRange: [finals[0], finals[finals.length - 1]],
    drawdownRange: [Math.min(...drawdowns), Math.max(...drawdowns)],
    streakRange: [Math.min(...streaks), Math.max(...streaks)],
    belowZeroCount: paths.filter((path) => path.final < 0).length,
    pathCount,
    trades,
    paths,
  };
}

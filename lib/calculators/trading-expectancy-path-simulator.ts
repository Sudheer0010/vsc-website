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

/* ------------------------------------------------------------------ *
 * Exact probability
 * ------------------------------------------------------------------ */

/**
 * Prefix table of log(k!) for k = 0..n, so a binomial CDF over n terms costs
 * O(n) instead of O(n^2). Logs keep the factorials representable at n = 1000.
 */
function logFactorialTable(n: number): Float64Array {
  const table = new Float64Array(n + 1);
  for (let k = 2; k <= n; k += 1) table[k] = table[k - 1] + Math.log(k);
  return table;
}

/** P(X < kExclusive) for X ~ Binomial(n, p). */
export function binomialCdfBelow(n: number, p: number, kExclusive: number): number {
  const kMax = Math.min(n, Math.ceil(kExclusive) - 1);
  if (kMax < 0) return 0;
  if (kMax >= n) return 1;

  const lf = logFactorialTable(n);
  const lnP = Math.log(p);
  const lnQ = Math.log(1 - p);

  let total = 0;
  for (let k = 0; k <= kMax; k += 1) {
    total += Math.exp(lf[n] - lf[k] - lf[n - k] + k * lnP + (n - k) * lnQ);
  }
  return Math.min(1, Math.max(0, total));
}

/**
 * The model-implied probability that a run of `trades` finishes below 0R.
 *
 * This is exact, not estimated. Because every win adds exactly +W and every
 * loss subtracts exactly L, the endpoint after N trades with k wins is
 * `W*k - L*(N-k)`. So `final < 0` is equivalent to `k < L*N/(W+L)`, and k is
 * Binomial(N, p). The threshold `L/(W+L)` is the same breakeven win rate the
 * Trading Expectancy Calculator reports, so the two tools agree by construction.
 *
 * Estimating this from a handful of simulated runs was the old approach and it
 * was far too noisy to publish: 20 runs put the estimate anywhere in 0%-15%
 * against a true value of 6.73%.
 *
 * The probability is conditional on the entered assumptions holding exactly —
 * a constant win rate and fixed win/loss magnitudes.
 */
export function probabilityFinishBelowZero(
  winRatePct: number,
  avgWin: number,
  avgLoss: number,
  trades: number,
): number {
  const p = winRatePct / 100;
  const raw = (avgLoss * trades) / (avgWin + avgLoss);

  // Snap to an exact integer when floating point lands a hair either side of
  // one. At W=1.5, L=1, N=200 the threshold is exactly 80: drifting to
  // 80.0000001 would wrongly count k=80 (which finishes at exactly 0R, not
  // below it) as a losing run.
  const nearest = Math.round(raw);
  const kStar = Math.abs(raw - nearest) < 1e-9 ? nearest : raw;

  return binomialCdfBelow(trades, p, kStar);
}

/* ------------------------------------------------------------------ *
 * Percentiles
 * ------------------------------------------------------------------ */

/** Linear-interpolated percentile of an ascending array. `q` is 0..1. */
export function percentileFromSorted(sorted: ArrayLike<number>, q: number): number {
  const n = sorted.length;
  if (n === 0) return Number.NaN;
  if (n === 1) return sorted[0];

  const idx = q * (n - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

/**
 * Nearest-rank percentile of an ascending array — returns a value that was
 * actually observed. Used for losing-streak lengths, where interpolating
 * between 7 and 8 would report a streak of 7.4 trades that cannot occur.
 */
export function percentileNearestRank(sorted: ArrayLike<number>, q: number): number {
  const n = sorted.length;
  if (n === 0) return Number.NaN;
  const rank = Math.ceil(q * n);
  return sorted[Math.min(n - 1, Math.max(0, rank - 1))];
}

/* ------------------------------------------------------------------ *
 * Simulation
 * ------------------------------------------------------------------ */

export type SimulatedPath = {
  cumulative: number[];
  final: number;
  maxDrawdown: number;
  longestLossStreak: number;
};

export type PathOutcome = {
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

/**
 * Same walk as `generatePath` without retaining the per-trade series.
 *
 * Distribution statistics need 10,000 runs. Keeping every cumulative array at
 * the 1,000-trade horizon would hold ~80 MB, so only the small display pool
 * keeps its series and the other runs report summary values alone.
 */
export function generatePathOutcome(
  winRatePct: number,
  avgWin: number,
  avgLoss: number,
  trades: number,
  rng: () => number = Math.random,
): PathOutcome {
  const p = winRatePct / 100;
  let running = 0;
  let peak = 0;
  let maxDrawdown = 0;
  let currentLossStreak = 0;
  let longestLossStreak = 0;

  for (let i = 0; i < trades; i += 1) {
    const isWin = rng() < p;
    running += isWin ? avgWin : -avgLoss;

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

  return { final: running, maxDrawdown, longestLossStreak };
}

/** Runs used for every published statistic. */
export const SIMULATION_RUNS = 10_000;
/** Runs whose full series is retained, to pick the displayed lines from. */
export const DISPLAY_POOL = 300;
/** Lines drawn on the chart. */
export const DISPLAY_PATH_COUNT = 20;

export type PathSimulatorSummary = {
  theoreticalExpectancy: number;
  theoreticalTotal: number;

  /** Simulated percentiles of the endpoint, under the entered assumptions. */
  finalP5: number;
  finalP50: number;
  finalP95: number;

  drawdownP50: number;
  drawdownP95: number;

  streakP50: number;
  streakP95: number;

  /** Exact, from the binomial closed form. */
  probBelowZero: number;
  /** Observed rate across the runs — kept to cross-check the closed form. */
  simulatedBelowZeroRate: number;

  runs: number;
  trades: number;

  /**
   * A representative sample of real simulated runs, spread across the retained
   * pool's endpoints. NOT the p5/p50/p95 runs of the full population.
   */
  displayPaths: SimulatedPath[];
  /** Index within displayPaths whose endpoint is nearest the overall median. */
  medianDisplayIndex: number;
};

type SimBuffers = {
  finals: Float64Array;
  drawdowns: Float64Array;
  streaks: Float64Array;
  pool: SimulatedPath[];
};

function createBuffers(runs: number): SimBuffers {
  return {
    finals: new Float64Array(runs),
    drawdowns: new Float64Array(runs),
    streaks: new Float64Array(runs),
    pool: [],
  };
}

/** Fills runs [from, to) into the buffers. Split into slices by the async runner. */
function simulateInto(
  buffers: SimBuffers,
  from: number,
  to: number,
  winRatePct: number,
  avgWin: number,
  avgLoss: number,
  trades: number,
  poolSize: number,
  rng: () => number,
): void {
  for (let i = from; i < to; i += 1) {
    if (i < poolSize) {
      const path = generatePath(winRatePct, avgWin, avgLoss, trades, rng);
      buffers.pool.push(path);
      buffers.finals[i] = path.final;
      buffers.drawdowns[i] = path.maxDrawdown;
      buffers.streaks[i] = path.longestLossStreak;
    } else {
      const outcome = generatePathOutcome(winRatePct, avgWin, avgLoss, trades, rng);
      buffers.finals[i] = outcome.final;
      buffers.drawdowns[i] = outcome.maxDrawdown;
      buffers.streaks[i] = outcome.longestLossStreak;
    }
  }
}

function finalizeSummary(
  buffers: SimBuffers,
  winRatePct: number,
  avgWin: number,
  avgLoss: number,
  trades: number,
  runs: number,
): PathSimulatorSummary {
  const { finals, drawdowns, streaks, pool } = buffers;

  const sortedFinals = Float64Array.from(finals).sort();
  const sortedDrawdowns = Float64Array.from(drawdowns).sort();
  const sortedStreaks = Float64Array.from(streaks).sort();

  let belowZero = 0;
  for (let i = 0; i < runs; i += 1) if (finals[i] < 0) belowZero += 1;

  // Display lines: real runs from the retained pool, chosen at evenly spaced
  // quantiles of THAT POOL's endpoints — not of the full run population. They
  // are a representative sample, and the UI says so; they are not the p5/p50/p95
  // runs. Claiming that would require retaining a seed per run and regenerating
  // the chosen series, which would mean replacing Math.random with a seeded
  // generator across the whole simulation.
  const poolByFinal = [...pool].sort((a, b) => a.final - b.final);
  const displayCount = Math.min(DISPLAY_PATH_COUNT, poolByFinal.length);
  const displayPaths: SimulatedPath[] = [];
  for (let i = 0; i < displayCount; i += 1) {
    const q = displayCount === 1 ? 0.5 : (i + 0.5) / displayCount;
    displayPaths.push(poolByFinal[Math.min(poolByFinal.length - 1, Math.floor(q * poolByFinal.length))]);
  }

  const finalP50 = percentileFromSorted(sortedFinals, 0.5);
  let medianDisplayIndex = 0;
  for (let i = 1; i < displayPaths.length; i += 1) {
    if (Math.abs(displayPaths[i].final - finalP50) < Math.abs(displayPaths[medianDisplayIndex].final - finalP50)) {
      medianDisplayIndex = i;
    }
  }

  const expectancy = theoreticalExpectancy(winRatePct, avgWin, avgLoss);

  return {
    theoreticalExpectancy: expectancy,
    theoreticalTotal: expectancy * trades,

    finalP5: percentileFromSorted(sortedFinals, 0.05),
    finalP50,
    finalP95: percentileFromSorted(sortedFinals, 0.95),

    drawdownP50: percentileFromSorted(sortedDrawdowns, 0.5),
    drawdownP95: percentileFromSorted(sortedDrawdowns, 0.95),

    streakP50: percentileNearestRank(sortedStreaks, 0.5),
    streakP95: percentileNearestRank(sortedStreaks, 0.95),

    probBelowZero: probabilityFinishBelowZero(winRatePct, avgWin, avgLoss, trades),
    simulatedBelowZeroRate: belowZero / runs,

    runs,
    trades,
    displayPaths,
    medianDisplayIndex,
  };
}

export function runPathSimulation(
  winRatePct: number,
  avgWin: number,
  avgLoss: number,
  trades: number,
  runs: number = SIMULATION_RUNS,
  rng: () => number = Math.random,
): PathSimulatorSummary {
  const poolSize = Math.min(DISPLAY_POOL, runs);
  const buffers = createBuffers(runs);
  simulateInto(buffers, 0, runs, winRatePct, avgWin, avgLoss, trades, poolSize, rng);
  return finalizeSummary(buffers, winRatePct, avgWin, avgLoss, trades, runs);
}

/**
 * Same simulation, computed in slices that yield to the browser between them.
 *
 * Running all 10,000 paths in one synchronous call froze the main thread for
 * ~850 ms at the 1,000-trade horizon on a 4x-throttled CPU — measured, not
 * estimated — with no feedback while it happened. Slicing keeps each block near
 * one frame, so the page stays responsive and can show progress. The maths and
 * the result are identical to `runPathSimulation`; only the scheduling differs.
 */
export async function runPathSimulationChunked(
  winRatePct: number,
  avgWin: number,
  avgLoss: number,
  trades: number,
  runs: number = SIMULATION_RUNS,
  onProgress?: (fraction: number) => void,
  rng: () => number = Math.random,
): Promise<PathSimulatorSummary> {
  const poolSize = Math.min(DISPLAY_POOL, runs);
  const buffers = createBuffers(runs);

  // Target ~20k trade-steps per slice. Measured on a 4x-throttled CPU the
  // simulation sustains roughly 550k steps/sec, so 20k lands near 35 ms —
  // under the 50 ms long-task threshold at every supported horizon. (200k and
  // 60k both measured at ~110 ms per slice, which is why this is not a guess.)
  const chunkRuns = Math.max(1, Math.min(runs, Math.floor(20_000 / Math.max(1, trades))));

  for (let from = 0; from < runs; from += chunkRuns) {
    const to = Math.min(runs, from + chunkRuns);
    simulateInto(buffers, from, to, winRatePct, avgWin, avgLoss, trades, poolSize, rng);
    onProgress?.(to / runs);
    if (to < runs) await yieldToBrowser();
  }

  return finalizeSummary(buffers, winRatePct, avgWin, avgLoss, trades, runs);
}

/**
 * Hands control back to the browser between slices.
 *
 * `setTimeout(0)` is the wrong fallback here: nested timeouts are clamped to
 * ~4 ms, and at the 1,000-trade horizon that clamp alone added hundreds of
 * milliseconds across the run. A MessageChannel message is a macrotask with no
 * clamp, so the browser still gets to paint and handle input between slices
 * without the added delay.
 */
function yieldToBrowser(): Promise<void> {
  const scheduler = (globalThis as { scheduler?: { yield?: () => Promise<void> } }).scheduler;
  if (typeof scheduler?.yield === "function") return scheduler.yield();

  if (typeof MessageChannel === "function") {
    return new Promise((resolve) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = () => {
        channel.port1.close();
        resolve();
      };
      channel.port2.postMessage(undefined);
    });
  }

  return new Promise((resolve) => setTimeout(resolve, 0));
}

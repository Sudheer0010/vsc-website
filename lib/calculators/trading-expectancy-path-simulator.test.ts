import { describe, expect, it } from "vitest";
import {
  DISPLAY_PATH_COUNT,
  binomialCdfBelow,
  generatePath,
  generatePathOutcome,
  percentileFromSorted,
  percentileNearestRank,
  probabilityFinishBelowZero,
  runPathSimulation,
  runPathSimulationChunked,
  theoreticalExpectancy,
  validatePathSimulatorInputs,
} from "./trading-expectancy-path-simulator";

/**
 * Deterministic mulberry32, so statistical assertions cannot flake.
 *
 * A textbook LCG is wrong here: `seed * 1103515245` passes 2^53 immediately in
 * JavaScript, the low bits are lost to floating point, and the stream stops
 * being uniform. That skewed the below-zero rate by 3.6pp against the exact
 * binomial and shifted the median endpoint by five whole steps — an artefact
 * of the generator, not of the model under test.
 */
function seededRng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe("validatePathSimulatorInputs", () => {
  it("rejects out-of-range or non-positive inputs", () => {
    expect(validatePathSimulatorInputs("0", "1.5", "1", "200").state).toBe("invalid");
    expect(validatePathSimulatorInputs("100", "1.5", "1", "200").state).toBe("invalid");
    expect(validatePathSimulatorInputs("45", "0", "1", "200").state).toBe("invalid");
    expect(validatePathSimulatorInputs("45", "1.5", "0", "200").state).toBe("invalid");
    expect(validatePathSimulatorInputs("45", "1.5", "1", "0").state).toBe("invalid");
  });

  it("accepts the production default example", () => {
    const result = validatePathSimulatorInputs("45", "1.5", "1", "200");
    if (result.state !== "valid") throw new Error("expected valid state");
    expect(result.winRate).toBe(45);
    expect(result.avgWin).toBe(1.5);
    expect(result.avgLoss).toBe(1);
    expect(result.trades).toBe(200);
  });
});

describe("theoreticalExpectancy", () => {
  it("matches the documented formula", () => {
    // p=0.45, W=1.5, L=1 -> 0.45*1.5 - 0.55*1 = 0.675 - 0.55 = 0.125
    expect(theoreticalExpectancy(45, 1.5, 1)).toBeCloseTo(0.125, 5);
  });
});

describe("generatePath", () => {
  it("walks a deterministic win/loss sequence correctly", () => {
    // Force win, win, loss, loss, win with a scripted rng against p=0.5
    const script = [0.1, 0.1, 0.9, 0.9, 0.1];
    let i = 0;
    const rng = () => script[i++];

    const path = generatePath(50, 2, 1, 5, rng);

    expect(path.cumulative).toEqual([0, 2, 4, 3, 2, 4]);
    expect(path.final).toBe(4);
    // peak reaches 4 at trade 2, troughs to 2 at trade 4 -> drawdown of 2
    expect(path.maxDrawdown).toBe(2);
    expect(path.longestLossStreak).toBe(2);
  });

  it("produces a cumulative series with trades + 1 points starting at zero", () => {
    const path = generatePath(45, 1.5, 1, 200, Math.random);
    expect(path.cumulative).toHaveLength(201);
    expect(path.cumulative[0]).toBe(0);
  });
});

describe("generatePathOutcome", () => {
  it("reports identical statistics to generatePath for the same rng stream", () => {
    const script = [0.1, 0.1, 0.9, 0.9, 0.1];
    const full = generatePath(50, 2, 1, 5, (() => { let i = 0; return () => script[i++]; })());
    const lean = generatePathOutcome(50, 2, 1, 5, (() => { let i = 0; return () => script[i++]; })());

    expect(lean.final).toBe(full.final);
    expect(lean.maxDrawdown).toBe(full.maxDrawdown);
    expect(lean.longestLossStreak).toBe(full.longestLossStreak);
  });
});

describe("binomialCdfBelow", () => {
  it("returns 0 below the support and 1 above it", () => {
    expect(binomialCdfBelow(10, 0.5, 0)).toBe(0);
    expect(binomialCdfBelow(10, 0.5, 11)).toBe(1);
  });

  it("matches hand-computed small cases", () => {
    // n=3, p=0.5: P(k<1) = P(0) = 1/8
    expect(binomialCdfBelow(3, 0.5, 1)).toBeCloseTo(0.125, 10);
    // P(k<2) = P(0)+P(1) = 1/8 + 3/8 = 0.5
    expect(binomialCdfBelow(3, 0.5, 2)).toBeCloseTo(0.5, 10);
  });

  it("is monotonic in the threshold", () => {
    let prev = -1;
    for (let k = 0; k <= 21; k += 1) {
      const v = binomialCdfBelow(20, 0.45, k);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });
});

describe("probabilityFinishBelowZero", () => {
  it("treats an exactly-zero endpoint as not below zero", () => {
    // W=1, L=1, N=4 -> threshold k* = 2 exactly. k=2 finishes at 0R, which is
    // not below zero, so only k<2 counts. p=0.5 -> P(0)+P(1) = 1/16 + 4/16.
    expect(probabilityFinishBelowZero(50, 1, 1, 4)).toBeCloseTo(5 / 16, 10);
  });

  it("agrees with a large simulation across several parameter sets", () => {
    const cases: Array<[number, number, number, number]> = [
      [45, 1.5, 1, 200],
      [40, 2, 1, 100],
      [55, 1, 1, 500],
      [35, 3, 1, 50],
    ];

    for (const [winRate, W, L, N] of cases) {
      const exact = probabilityFinishBelowZero(winRate, W, L, N);
      const summary = runPathSimulation(winRate, W, L, N, 20_000, seededRng(7));
      // 20k runs: standard error is well under 0.5pp for these probabilities.
      expect(Math.abs(summary.simulatedBelowZeroRate - exact)).toBeLessThan(0.01);
    }
  });

  it("falls as the horizon lengthens for a positive edge", () => {
    const short = probabilityFinishBelowZero(45, 1.5, 1, 50);
    const long = probabilityFinishBelowZero(45, 1.5, 1, 1000);
    expect(long).toBeLessThan(short);
  });

  it("stays a probability for every supported horizon", () => {
    for (const n of [1, 50, 100, 200, 500, 1000]) {
      const p = probabilityFinishBelowZero(45, 1.5, 1, n);
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(1);
    }
  });
});

describe("percentileFromSorted", () => {
  it("returns the endpoints and interpolates between ranks", () => {
    const a = [0, 10, 20, 30, 40];
    expect(percentileFromSorted(a, 0)).toBe(0);
    expect(percentileFromSorted(a, 1)).toBe(40);
    expect(percentileFromSorted(a, 0.5)).toBe(20);
    // idx = 0.25*4 = 1 -> exactly the second element
    expect(percentileFromSorted(a, 0.25)).toBe(10);
    // idx = 0.125*4 = 0.5 -> halfway between 0 and 10
    expect(percentileFromSorted(a, 0.125)).toBe(5);
  });

  it("handles empty and single-element inputs", () => {
    expect(Number.isNaN(percentileFromSorted([], 0.5))).toBe(true);
    expect(percentileFromSorted([7], 0.9)).toBe(7);
  });
});

describe("percentileNearestRank", () => {
  it("only ever returns an observed value", () => {
    const streaks = [1, 2, 2, 3, 8];
    for (const q of [0, 0.1, 0.25, 0.5, 0.75, 0.95, 1]) {
      expect(streaks).toContain(percentileNearestRank(streaks, q));
    }
  });

  it("matches the nearest-rank definition", () => {
    const a = [1, 2, 3, 4];
    expect(percentileNearestRank(a, 0.5)).toBe(2); // ceil(0.5*4)=2 -> index 1
    expect(percentileNearestRank(a, 0.95)).toBe(4); // ceil(0.95*4)=4 -> index 3
  });
});

describe("runPathSimulation", () => {
  it("computes theoretical expectancy and total independently of the random paths", () => {
    const summary = runPathSimulation(45, 1.5, 1, 200, 500, seededRng());
    expect(summary.theoreticalExpectancy).toBeCloseTo(0.125, 5);
    expect(summary.theoreticalTotal).toBeCloseTo(25, 5);
  });

  it("reports the run count and horizon it was given", () => {
    const summary = runPathSimulation(45, 1.5, 1, 200, 500, seededRng());
    expect(summary.runs).toBe(500);
    expect(summary.trades).toBe(200);
  });

  it("displays at most DISPLAY_PATH_COUNT real simulated paths", () => {
    const summary = runPathSimulation(45, 1.5, 1, 100, 1000, seededRng());
    expect(summary.displayPaths).toHaveLength(DISPLAY_PATH_COUNT);
    summary.displayPaths.forEach((path) => {
      expect(path.cumulative).toHaveLength(101);
      expect(path.cumulative[0]).toBe(0);
      // Every displayed line must be a genuine walk, not a constructed curve.
      expect(path.cumulative[path.cumulative.length - 1]).toBeCloseTo(path.final, 10);
      expect(path.maxDrawdown).toBeGreaterThanOrEqual(0);
      expect(path.longestLossStreak).toBeGreaterThanOrEqual(0);
    });
  });

  it("orders the displayed paths by endpoint so the chart spans the range", () => {
    const summary = runPathSimulation(45, 1.5, 1, 200, 2000, seededRng());
    const finals = summary.displayPaths.map((p) => p.final);
    expect([...finals].sort((a, b) => a - b)).toEqual(finals);
  });

  it("points medianDisplayIndex at the displayed path nearest the median endpoint", () => {
    const summary = runPathSimulation(45, 1.5, 1, 200, 2000, seededRng());
    const distances = summary.displayPaths.map((p) => Math.abs(p.final - summary.finalP50));
    expect(Math.min(...distances)).toBe(distances[summary.medianDisplayIndex]);
  });

  it("orders the endpoint percentiles p5 <= p50 <= p95", () => {
    const summary = runPathSimulation(45, 1.5, 1, 200, 5000, seededRng());
    expect(summary.finalP5).toBeLessThanOrEqual(summary.finalP50);
    expect(summary.finalP50).toBeLessThanOrEqual(summary.finalP95);
  });

  it("orders the drawdown and streak percentiles p50 <= p95", () => {
    const summary = runPathSimulation(45, 1.5, 1, 200, 5000, seededRng());
    expect(summary.drawdownP50).toBeLessThanOrEqual(summary.drawdownP95);
    expect(summary.streakP50).toBeLessThanOrEqual(summary.streakP95);
    expect(summary.drawdownP50).toBeGreaterThanOrEqual(0);
  });

  it("reports whole-trade losing streaks", () => {
    const summary = runPathSimulation(45, 1.5, 1, 200, 2000, seededRng());
    expect(Number.isInteger(summary.streakP50)).toBe(true);
    expect(Number.isInteger(summary.streakP95)).toBe(true);
  });

  it("keeps the exact probability close to the observed rate at 10,000 runs", () => {
    const summary = runPathSimulation(45, 1.5, 1, 200, 10_000, seededRng(99));
    expect(Math.abs(summary.simulatedBelowZeroRate - summary.probBelowZero)).toBeLessThan(0.015);
  });

  it("centres the median endpoint near the expected total for a positive edge", () => {
    const summary = runPathSimulation(45, 1.5, 1, 500, 5000, seededRng(3));
    // Mean is 62.5R; the median of this discrete walk sits close to it.
    expect(Math.abs(summary.finalP50 - summary.theoreticalTotal)).toBeLessThan(6);
  });

  it("is deterministic for a fixed rng", () => {
    const a = runPathSimulation(45, 1.5, 1, 100, 500, seededRng(42));
    const b = runPathSimulation(45, 1.5, 1, 100, 500, seededRng(42));
    expect(a.finalP5).toBe(b.finalP5);
    expect(a.finalP50).toBe(b.finalP50);
    expect(a.finalP95).toBe(b.finalP95);
    expect(a.drawdownP95).toBe(b.drawdownP95);
    expect(a.streakP95).toBe(b.streakP95);
    expect(a.simulatedBelowZeroRate).toBe(b.simulatedBelowZeroRate);
  });
});

describe("runPathSimulationChunked", () => {
  it("produces exactly the same summary as the synchronous runner for one rng stream", async () => {
    const sync = runPathSimulation(45, 1.5, 1, 200, 2000, seededRng(11));
    const chunked = await runPathSimulationChunked(45, 1.5, 1, 200, 2000, undefined, seededRng(11));

    expect(chunked.finalP5).toBe(sync.finalP5);
    expect(chunked.finalP50).toBe(sync.finalP50);
    expect(chunked.finalP95).toBe(sync.finalP95);
    expect(chunked.drawdownP50).toBe(sync.drawdownP50);
    expect(chunked.drawdownP95).toBe(sync.drawdownP95);
    expect(chunked.streakP50).toBe(sync.streakP50);
    expect(chunked.streakP95).toBe(sync.streakP95);
    expect(chunked.probBelowZero).toBe(sync.probBelowZero);
    expect(chunked.simulatedBelowZeroRate).toBe(sync.simulatedBelowZeroRate);
    expect(chunked.displayPaths.map((p) => p.final)).toEqual(sync.displayPaths.map((p) => p.final));
    expect(chunked.medianDisplayIndex).toBe(sync.medianDisplayIndex);
  });

  it("reports monotonic progress that ends at 1", async () => {
    const seen: number[] = [];
    await runPathSimulationChunked(45, 1.5, 1, 500, 3000, (f) => seen.push(f), seededRng(5));

    expect(seen.length).toBeGreaterThan(1);
    expect(seen[seen.length - 1]).toBe(1);
    for (let i = 1; i < seen.length; i += 1) expect(seen[i]).toBeGreaterThan(seen[i - 1]);
    seen.forEach((f) => {
      expect(f).toBeGreaterThan(0);
      expect(f).toBeLessThanOrEqual(1);
    });
  });

  it("still returns a complete summary when the whole run fits in one slice", async () => {
    const summary = await runPathSimulationChunked(45, 1.5, 1, 10, 50, undefined, seededRng(2));
    expect(summary.runs).toBe(50);
    expect(summary.displayPaths.length).toBeGreaterThan(0);
    expect(summary.finalP5).toBeLessThanOrEqual(summary.finalP95);
  });
});

describe("runPathSimulationChunked yield fallbacks", () => {
  /**
   * The runner prefers scheduler.yield, falls back to MessageChannel, then to
   * setTimeout. Browser testing confirmed the MessageChannel path keeps total
   * blocking to 31ms at 4x CPU / 1,000 trades, but nothing in CI would catch it
   * silently breaking, so each path is exercised here for identical output.
   */
  async function withGlobals(
    patch: { scheduler?: unknown; messageChannel?: unknown },
    run: () => Promise<unknown>,
  ) {
    const g = globalThis as Record<string, unknown>;
    const hadScheduler = "scheduler" in g;
    const hadChannel = "MessageChannel" in g;
    const prevScheduler = g.scheduler;
    const prevChannel = g.MessageChannel;

    if ("scheduler" in patch) g.scheduler = patch.scheduler;
    if ("messageChannel" in patch) g.MessageChannel = patch.messageChannel;

    try {
      return await run();
    } finally {
      if (hadScheduler) g.scheduler = prevScheduler;
      else delete g.scheduler;
      if (hadChannel) g.MessageChannel = prevChannel;
      else delete g.MessageChannel;
    }
  }

  it("produces identical results with scheduler.yield unavailable (MessageChannel path)", async () => {
    const expected = runPathSimulation(45, 1.5, 1, 200, 2000, seededRng(21));

    const actual = (await withGlobals({ scheduler: undefined }, () =>
      runPathSimulationChunked(45, 1.5, 1, 200, 2000, undefined, seededRng(21)),
    )) as Awaited<ReturnType<typeof runPathSimulationChunked>>;

    expect(actual.finalP5).toBe(expected.finalP5);
    expect(actual.finalP50).toBe(expected.finalP50);
    expect(actual.finalP95).toBe(expected.finalP95);
    expect(actual.drawdownP95).toBe(expected.drawdownP95);
    expect(actual.streakP95).toBe(expected.streakP95);
    expect(actual.probBelowZero).toBe(expected.probBelowZero);
    expect(actual.simulatedBelowZeroRate).toBe(expected.simulatedBelowZeroRate);
  });

  it("produces identical results with neither scheduler.yield nor MessageChannel (setTimeout path)", async () => {
    const expected = runPathSimulation(45, 1.5, 1, 100, 800, seededRng(33));

    const actual = (await withGlobals({ scheduler: undefined, messageChannel: undefined }, () =>
      runPathSimulationChunked(45, 1.5, 1, 100, 800, undefined, seededRng(33)),
    )) as Awaited<ReturnType<typeof runPathSimulationChunked>>;

    expect(actual.finalP50).toBe(expected.finalP50);
    expect(actual.probBelowZero).toBe(expected.probBelowZero);
    expect(actual.simulatedBelowZeroRate).toBe(expected.simulatedBelowZeroRate);
  });

  it("still yields more than once at the maximum horizon", async () => {
    const seen: number[] = [];
    await withGlobals({ scheduler: undefined }, () =>
      runPathSimulationChunked(45, 1.5, 1, 1000, 400, (f) => seen.push(f), seededRng(4)),
    );
    // 20k-step slices at a 1,000-trade horizon means 20 runs per slice.
    expect(seen.length).toBe(20);
    expect(seen[seen.length - 1]).toBe(1);
  });
});

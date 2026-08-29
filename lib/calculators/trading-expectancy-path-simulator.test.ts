import { describe, expect, it } from "vitest";
import {
  generatePath,
  runPathSimulation,
  theoreticalExpectancy,
  validatePathSimulatorInputs,
} from "./trading-expectancy-path-simulator";

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

describe("runPathSimulation", () => {
  it("generates the requested number of independent paths", () => {
    const summary = runPathSimulation(45, 1.5, 1, 200, 20, Math.random);
    expect(summary.paths).toHaveLength(20);
    expect(summary.pathCount).toBe(20);
    expect(summary.trades).toBe(200);
  });

  it("computes theoretical expectancy and total independently of the random paths", () => {
    const summary = runPathSimulation(45, 1.5, 1, 200, 20, Math.random);
    expect(summary.theoreticalExpectancy).toBeCloseTo(0.125, 5);
    expect(summary.theoreticalTotal).toBeCloseTo(25, 5);
  });

  it("is deterministic for a fixed rng and stays internally consistent", () => {
    let seed = 1;
    const rng = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const summary = runPathSimulation(45, 1.5, 1, 50, 20, rng);

    const finals = summary.paths.map((p) => p.final).sort((a, b) => a - b);
    expect(summary.finalRange).toEqual([finals[0], finals[finals.length - 1]]);
    expect(summary.belowZeroCount).toBe(summary.paths.filter((p) => p.final < 0).length);
    summary.paths.forEach((path) => {
      expect(path.maxDrawdown).toBeGreaterThanOrEqual(0);
      expect(path.longestLossStreak).toBeGreaterThanOrEqual(0);
    });
  });
});

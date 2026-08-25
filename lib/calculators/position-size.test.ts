import { describe, expect, it } from "vitest";
import { computePositionSize } from "./position-size";

describe("computePositionSize", () => {
  it("returns empty for invalid inputs", () => {
    expect(computePositionSize("", "1", "1000", "950")).toEqual({
      state: "empty",
      message: "Enter valid values to calculate a position size.",
    });
    expect(computePositionSize("500000", "0", "1000", "950")).toEqual({
      state: "empty",
      message: "Enter valid values to calculate a position size.",
    });
    expect(computePositionSize("500000", "101", "1000", "950")).toEqual({
      state: "empty",
      message: "Enter valid values to calculate a position size.",
    });
    expect(computePositionSize("500000", "1", "0", "950")).toEqual({
      state: "empty",
      message: "Enter valid values to calculate a position size.",
    });
    expect(computePositionSize("500000", "1", "1000", "0")).toEqual({
      state: "empty",
      message: "Enter valid values to calculate a position size.",
    });
  });

  it("flags stop at or above entry", () => {
    const result = computePositionSize("500000", "1", "1000", "1000");
    expect(result).toEqual({
      state: "empty",
      message: "Fix the stop-loss to continue.",
      stopError: true,
    });
  });

  it("returns empty when the risk budget cannot buy one share", () => {
    const result = computePositionSize("1000", "0.01", "1000", "950");
    expect(result).toEqual({
      state: "empty",
      message: "Your selected risk amount is smaller than the stop distance for one share.",
    });
  });

  it("computes the production default example (feasible)", () => {
    const result = computePositionSize("500000", "1", "1000", "950");
    if (result.state !== "ready") throw new Error("expected ready state");
    expect(result.shares).toBe(100);
    expect(result.stopDistance).toBe(50);
    expect(result.positionValue).toBe(100_000);
    expect(result.actualRisk).toBe(5_000);
    expect(result.actualRiskPct).toBeCloseTo(1, 5);
    expect(result.capitalPct).toBeCloseTo(20, 5);
    expect(result.feasible).toBe(true);
  });

  it("marks infeasible positions and computes the cash-only fallback", () => {
    const result = computePositionSize("10000", "50", "1000", "950");
    if (result.state !== "ready") throw new Error("expected ready state");
    // riskAmount = 5000, stopDistance = 50 -> 100 shares -> positionValue 100000 > capital 10000
    expect(result.shares).toBe(100);
    expect(result.feasible).toBe(false);
    expect(result.extraCapital).toBeCloseTo(90_000, 5);
    expect(result.affordableShares).toBe(10);
    expect(result.maxCashRiskPct).toBeCloseTo(5, 5);
  });

  it("allows riskPct at the 100 boundary", () => {
    const result = computePositionSize("500000", "100", "1000", "950");
    expect(result.state).toBe("ready");
  });
});

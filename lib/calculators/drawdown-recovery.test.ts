import { describe, expect, it } from "vitest";
import { computeDrawdownRecovery } from "./drawdown-recovery";

describe("computeDrawdownRecovery", () => {
  it("returns empty for non-positive values", () => {
    expect(computeDrawdownRecovery("0", "700000")).toEqual({
      state: "empty",
      message: "Use positive comparable values to calculate drawdown and recovery.",
    });
    expect(computeDrawdownRecovery("1000000", "-1")).toEqual({
      state: "empty",
      message: "Use positive comparable values to calculate drawdown and recovery.",
    });
  });

  it("reports a new high when current exceeds peak", () => {
    const result = computeDrawdownRecovery("1000000", "1200000");
    if (result.state !== "new-high") throw new Error("expected new-high state");
    expect(result.peak).toBe(1_000_000);
    expect(result.current).toBe(1_200_000);
    expect(result.excess).toBe(200_000);
    expect(result.gainPct).toBeCloseTo(20, 5);
  });

  it("reports at-peak when current equals peak", () => {
    const result = computeDrawdownRecovery("1000000", "1000000");
    expect(result).toEqual({ state: "at-peak", peak: 1_000_000, current: 1_000_000 });
  });

  it("computes the production default example (below peak)", () => {
    const result = computeDrawdownRecovery("1000000", "700000");
    if (result.state !== "below-peak") throw new Error("expected below-peak state");
    expect(result.loss).toBe(300_000);
    expect(result.drawdownPct).toBe(30);
    expect(result.recoveryPct).toBeCloseTo(42.857, 2);
    expect(result.remainingPct).toBe(70);
  });

  it("confirms the well-known 50% drawdown requires a 100% recovery gain", () => {
    const result = computeDrawdownRecovery("100000", "50000");
    if (result.state !== "below-peak") throw new Error("expected below-peak state");
    expect(result.drawdownPct).toBe(50);
    expect(result.recoveryPct).toBe(100);
  });
});

import { describe, expect, it } from "vitest";
import { computeRiskReward, validateRiskReward } from "./risk-reward";

describe("validateRiskReward", () => {
  it("flags a stop at or above entry", () => {
    const v = validateRiskReward("1000", "1000", "1150", "");
    expect(v.stopInvalid).toBe(true);
  });

  it("flags a target at or below entry", () => {
    const v = validateRiskReward("1000", "950", "1000", "");
    expect(v.targetInvalid).toBe(true);
  });

  it("treats an empty quantity as valid-but-absent", () => {
    const v = validateRiskReward("1000", "950", "1150", "");
    expect(v.Q).toBeNull();
    expect(v.qtyInvalid).toBe(false);
  });

  it("flags non-integer, zero and negative quantities", () => {
    expect(validateRiskReward("1000", "950", "1150", "10.5").qtyInvalid).toBe(true);
    expect(validateRiskReward("1000", "950", "1150", "0").qtyInvalid).toBe(true);
    expect(validateRiskReward("1000", "950", "1150", "-5").qtyInvalid).toBe(true);
  });

  it("accepts a valid positive integer quantity", () => {
    const v = validateRiskReward("1000", "950", "1150", "100");
    expect(v.Q).toBe(100);
    expect(v.qtyInvalid).toBe(false);
  });
});

describe("computeRiskReward", () => {
  it("returns empty for invalid trade levels", () => {
    expect(computeRiskReward("1000", "1000", "1150", "")).toEqual({
      state: "empty",
      message: "Enter valid trade levels to calculate the payoff structure.",
    });
    expect(computeRiskReward("1000", "950", "1000", "")).toEqual({
      state: "empty",
      message: "Enter valid trade levels to calculate the payoff structure.",
    });
  });

  it("computes the production default example", () => {
    const result = computeRiskReward("1000", "950", "1150", "");
    if (result.state !== "ready") throw new Error("expected ready state");
    // risk = 50, reward = 150, ratio = 3
    expect(result.risk).toBe(50);
    expect(result.reward).toBe(150);
    expect(result.ratio).toBe(3);
    expect(result.breakeven).toBe(25);
    expect(result.stopPct).toBe(5);
    expect(result.rewardPct).toBe(15);
    expect(result.hasQty).toBe(false);
    expect(result.quantity).toBeNull();
  });

  it("clamps entryPos at the 8/92 bounds for extreme ratios", () => {
    // reward >> risk -> entryPos = risk/(risk+reward)*100 -> near 0, clamped to 8
    const skewedHighReward = computeRiskReward("1000", "999", "2000", "");
    if (skewedHighReward.state !== "ready") throw new Error("expected ready state");
    expect(skewedHighReward.entryPos).toBe(8);

    // risk >> reward -> entryPos near 100, clamped to 92
    const skewedHighRisk = computeRiskReward("1000", "1", "1001", "");
    if (skewedHighRisk.state !== "ready") throw new Error("expected ready state");
    expect(skewedHighRisk.entryPos).toBe(92);
  });

  it("computes plannedRisk and potentialReward when a valid quantity is given", () => {
    const result = computeRiskReward("1000", "950", "1150", "100");
    if (result.state !== "ready") throw new Error("expected ready state");
    expect(result.hasQty).toBe(true);
    expect(result.quantity).toBe(100);
    expect(result.plannedRisk).toBe(5_000);
    expect(result.potentialReward).toBe(15_000);
  });

  it("ignores an invalid quantity in the result while remaining in a ready state", () => {
    const result = computeRiskReward("1000", "950", "1150", "10.5");
    if (result.state !== "ready") throw new Error("expected ready state");
    expect(result.hasQty).toBe(false);
    expect(result.quantity).toBeNull();
    expect(result.plannedRisk).toBeNull();
  });
});

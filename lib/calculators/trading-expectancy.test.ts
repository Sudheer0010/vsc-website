import { describe, expect, it } from "vitest";
import { computeTradingExpectancy, sampleContext } from "./trading-expectancy";

describe("sampleContext", () => {
  it("labels sample sizes at the documented thresholds", () => {
    expect(sampleContext(29).badge).toBe("Limited sample");
    expect(sampleContext(29).tone).toBe("caution");
    expect(sampleContext(30).badge).toBe("Developing sample");
    expect(sampleContext(30).tone).toBe("neutral");
    expect(sampleContext(99).badge).toBe("Developing sample");
    expect(sampleContext(100).badge).toBe("Broader sample");
    expect(sampleContext(100).tone).toBe("broad");
    expect(sampleContext(199).badge).toBe("Broader sample");
    expect(sampleContext(200).badge).toBe("Broad sample");
    expect(sampleContext(200).tone).toBe("broad");
  });
});

describe("computeTradingExpectancy", () => {
  it("returns empty for out-of-range or non-positive inputs", () => {
    expect(computeTradingExpectancy("0", "2", "1", "50").state).toBe("empty");
    expect(computeTradingExpectancy("100", "2", "1", "50").state).toBe("empty");
    expect(computeTradingExpectancy("40", "0", "1", "50").state).toBe("empty");
    expect(computeTradingExpectancy("40", "2", "0", "50").state).toBe("empty");
    expect(computeTradingExpectancy("40", "2", "1", "0").state).toBe("empty");
  });

  it("computes the production default example", () => {
    const result = computeTradingExpectancy("40", "2", "1", "50");
    if (result.state !== "ready") throw new Error("expected ready state");
    // p=0.4, W=2, L=1 -> winContribution 0.8, lossContribution 0.6, expectancy 0.2
    expect(result.winContribution).toBeCloseTo(0.8, 5);
    expect(result.lossContribution).toBeCloseTo(0.6, 5);
    expect(result.expectancy).toBeCloseTo(0.2, 5);
    expect(result.payoff).toBe(2);
    expect(result.expectancyState).toBe("positive");
    // breakeven = L/(W+L)*100 = 1/3*100
    expect(result.breakeven).toBeCloseTo(33.333, 2);
    expect(result.edgeVsBreakeven).toBeCloseTo(6.667, 2);
    expect(result.sample.badge).toBe("Developing sample");
  });

  it("classifies negative expectancy", () => {
    const result = computeTradingExpectancy("30", "1", "2", "50");
    if (result.state !== "ready") throw new Error("expected ready state");
    expect(result.expectancy).toBeLessThan(0);
    expect(result.expectancyState).toBe("negative");
  });

  it("classifies flat expectancy at exact breakeven", () => {
    // payoff 2:1 -> breakeven win rate is 33.333...%; use the exact breakeven value
    const breakevenWinRate = (1 / (2 + 1)) * 100;
    const result = computeTradingExpectancy(String(breakevenWinRate), "2", "1", "50");
    if (result.state !== "ready") throw new Error("expected ready state");
    expect(result.expectancyState).toBe("flat");
  });
});

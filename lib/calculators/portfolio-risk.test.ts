import { describe, expect, it } from "vitest";
import { calcRow, computePortfolioAggregate, type PositionRow } from "./portfolio-risk";

function row(overrides: Partial<PositionRow> = {}): PositionRow {
  return { name: "", group: "", entry: "", stop: "", shares: "", ...overrides };
}

describe("calcRow", () => {
  it("is inactive for a fully blank row", () => {
    expect(calcRow(row(), 500_000)).toEqual({ active: false, risk: 0, value: 0, riskPct: 0, error: "" });
  });

  it("is inactive with an error when partially filled but invalid", () => {
    const result = calcRow(row({ name: "INFY" }), 500_000);
    expect(result.active).toBe(false);
    expect(result.error).toBe("Enter positive entry, stop and share values.");
  });

  it("clamps risk to zero when the stop is at or above entry", () => {
    const result = calcRow(row({ name: "X", entry: "100", stop: "110", shares: "10" }), 500_000);
    expect(result.active).toBe(true);
    expect(result.risk).toBe(0);
    expect(result.value).toBe(1_000);
  });

  it("computes risk, value and riskPct for a valid row", () => {
    const result = calcRow(row({ name: "RELIANCE", entry: "1500", stop: "1450", shares: "50" }), 500_000);
    expect(result.active).toBe(true);
    expect(result.risk).toBe(2_500);
    expect(result.value).toBe(75_000);
    expect(result.riskPct).toBe(0.5);
  });
});

describe("computePortfolioAggregate", () => {
  const productionRows: PositionRow[] = [
    { name: "RELIANCE", group: "Energy", entry: "1500", stop: "1450", shares: "50" },
    { name: "INFY", group: "Technology", entry: "1600", stop: "1520", shares: "30" },
    { name: "HAL", group: "Defence", entry: "4500", stop: "4300", shares: "12" },
    { name: "BEL", group: "Defence", entry: "400", stop: "380", shares: "60" },
  ];

  it("sums risk and value across active rows only, ignoring blanks", () => {
    const rows = [...productionRows, row()];
    const agg = computePortfolioAggregate(rows, 500_000, 0);
    expect(agg.activeItems).toHaveLength(4);
    // 50*50 + 80*30 + 200*12 + 20*60 = 2500 + 2400 + 2400 + 1200 = 8500
    expect(agg.totalRisk).toBe(8_500);
    expect(agg.totalRiskPct).toBeCloseTo(1.7, 5);
  });

  it("reports no limit state when limitValue is not set", () => {
    const agg = computePortfolioAggregate(productionRows, 500_000, 0);
    expect(agg.hasLimit).toBe(false);
    expect(agg.budget).toBe(0);
    expect(agg.remaining).toBe(0);
    expect(agg.usedPct).toBe(0);
    expect(agg.isOverLimit).toBe(false);
  });

  it("flags over-limit exposure when total risk exceeds the budget", () => {
    const agg = computePortfolioAggregate(productionRows, 500_000, 1);
    // budget = 500000 * 1% = 5000; totalRisk = 8500 -> over limit
    expect(agg.hasLimit).toBe(true);
    expect(agg.budget).toBe(5_000);
    expect(agg.remaining).toBe(-3_500);
    expect(agg.usedPct).toBe(170);
    expect(agg.isOverLimit).toBe(true);
  });

  it("stays within limit when the budget covers total risk", () => {
    const agg = computePortfolioAggregate(productionRows, 500_000, 5);
    // budget = 25000
    expect(agg.isOverLimit).toBe(false);
    expect(agg.remaining).toBe(16_500);
  });

  it("picks the largest active risk contributor, or null when none are active", () => {
    const agg = computePortfolioAggregate(productionRows, 500_000, 0);
    expect(agg.largest?.row.name).toBe("RELIANCE");
    expect(agg.largest?.calc.risk).toBe(2_500);

    const empty = computePortfolioAggregate([row(), row()], 500_000, 0);
    expect(empty.largest).toBeNull();
  });

  it("returns all groups sorted by risk descending, with no cap", () => {
    const rows: PositionRow[] = [
      { name: "A", group: "G1", entry: "100", stop: "90", shares: "10" },
      { name: "B", group: "G2", entry: "100", stop: "90", shares: "20" },
      { name: "C", group: "G3", entry: "100", stop: "90", shares: "30" },
      { name: "D", group: "G4", entry: "100", stop: "90", shares: "40" },
      { name: "E", group: "G5", entry: "100", stop: "90", shares: "50" },
      { name: "F", group: "G6", entry: "100", stop: "90", shares: "60" },
      { name: "G", group: "", entry: "100", stop: "90", shares: "5" },
    ];
    const agg = computePortfolioAggregate(rows, 500_000, 0);
    // 6 named groups (empty group excluded), all returned — no slice(0, 5) in the pure layer.
    expect(agg.groups).toHaveLength(6);
    expect(agg.groups[0]).toEqual(["G6", 600]);
    expect(agg.groups[5]).toEqual(["G1", 100]);
  });

  it("aggregates risk for repeated group names", () => {
    const rows: PositionRow[] = [
      { name: "A", group: "Defence", entry: "100", stop: "90", shares: "10" },
      { name: "B", group: "Defence", entry: "200", stop: "180", shares: "5" },
    ];
    const agg = computePortfolioAggregate(rows, 500_000, 0);
    expect(agg.groups).toEqual([["Defence", 200]]);
  });
});

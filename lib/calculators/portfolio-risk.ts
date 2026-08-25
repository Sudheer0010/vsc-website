export type PositionRow = {
  name: string;
  group: string;
  entry: string;
  stop: string;
  shares: string;
};

export type RowCalc = {
  active: boolean;
  risk: number;
  value: number;
  riskPct: number;
  error: string;
};

export function calcRow(row: PositionRow, accountSize: number): RowCalc {
  const entered = row.name.trim() || row.group.trim() || row.entry || row.stop || row.shares;
  if (!entered) {
    return { active: false, risk: 0, value: 0, riskPct: 0, error: "" };
  }

  const E = Number.parseFloat(row.entry);
  const S = Number.parseFloat(row.stop);
  const Q = Number.parseFloat(row.shares);

  if (!(E > 0 && S > 0 && Q > 0)) {
    return { active: false, risk: 0, value: 0, riskPct: 0, error: "Enter positive entry, stop and share values." };
  }

  const risk = Math.max(E - S, 0) * Q;
  const value = E * Q;
  return { active: true, risk, value, riskPct: accountSize > 0 ? (risk / accountSize) * 100 : 0, error: "" };
}

export type PortfolioAggregate = {
  rowCalcs: RowCalc[];
  activeItems: { row: PositionRow; calc: RowCalc }[];
  totalRisk: number;
  totalValue: number;
  totalRiskPct: number;
  exposurePct: number;
  hasLimit: boolean;
  budget: number;
  remaining: number;
  usedPct: number;
  isOverLimit: boolean;
  largest: { row: PositionRow; calc: RowCalc } | null;
  // All groups, sorted by risk descending. Any display cap (e.g. top 5) is
  // a presentation concern and stays in the component.
  groups: [string, number][];
};

export function computePortfolioAggregate(rows: PositionRow[], accountValue: number, limitValue: number): PortfolioAggregate {
  const rowCalcs = rows.map((row) => calcRow(row, accountValue));
  const activeItems = rows.map((row, index) => ({ row, calc: rowCalcs[index] })).filter((item) => item.calc.active);

  const totalRisk = activeItems.reduce((sum, item) => sum + item.calc.risk, 0);
  const totalValue = activeItems.reduce((sum, item) => sum + item.calc.value, 0);
  const totalRiskPct = accountValue > 0 ? (totalRisk / accountValue) * 100 : 0;
  const exposurePct = accountValue > 0 ? (totalValue / accountValue) * 100 : 0;

  const hasLimit = limitValue > 0;
  const budget = hasLimit ? (accountValue * limitValue) / 100 : 0;
  const remaining = hasLimit ? budget - totalRisk : 0;
  const usedPct = hasLimit && budget > 0 ? (totalRisk / budget) * 100 : 0;
  const isOverLimit = hasLimit && totalRisk > budget;

  const largest = activeItems.length ? [...activeItems].sort((a, b) => b.calc.risk - a.calc.risk)[0] : null;

  const groupMap = new Map<string, number>();
  activeItems.forEach(({ row, calc }) => {
    const g = row.group.trim();
    if (!g) return;
    groupMap.set(g, (groupMap.get(g) ?? 0) + calc.risk);
  });
  const groups = [...groupMap.entries()].sort((a, b) => b[1] - a[1]);

  return {
    rowCalcs,
    activeItems,
    totalRisk,
    totalValue,
    totalRiskPct,
    exposurePct,
    hasLimit,
    budget,
    remaining,
    usedPct,
    isOverLimit,
    largest,
    groups,
  };
}

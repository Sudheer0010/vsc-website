export type PositionSizeResult =
  | { state: "empty"; message: string; stopError?: boolean }
  | {
      state: "ready";
      capital: number;
      selectedRiskPct: number;
      stopDistance: number;
      shares: number;
      positionValue: number;
      actualRisk: number;
      actualRiskPct: number;
      capitalPct: number;
      cashRemainingPct: number;
      feasible: boolean;
      extraCapital: number;
      affordableShares: number;
      maxCashRiskPct: number;
    };

export function computePositionSize(capital: string, riskPct: string, entry: string, stop: string): PositionSizeResult {
  const C = Number.parseFloat(capital);
  const R = Number.parseFloat(riskPct);
  const E = Number.parseFloat(entry);
  const S = Number.parseFloat(stop);

  if (!(C > 0) || !(R > 0) || !(R <= 100) || !(E > 0) || !(S > 0)) {
    return { state: "empty", message: "Enter valid values to calculate a position size." };
  }

  if (S >= E) {
    return {
      state: "empty",
      message: "Fix the stop-loss to continue.",
      stopError: true,
    };
  }

  const riskAmount = C * (R / 100);
  const stopDistance = E - S;
  const riskShares = Math.floor(riskAmount / stopDistance);

  if (riskShares < 1) {
    return {
      state: "empty",
      message: "Your selected risk amount is smaller than the stop distance for one share.",
    };
  }

  const positionValue = riskShares * E;
  const actualRisk = riskShares * stopDistance;
  const actualRiskPct = (actualRisk / C) * 100;
  const capitalPct = (positionValue / C) * 100;
  const affordableShares = Math.floor(C / E);
  const cashRemainingPct = Math.max(0, 100 - capitalPct);
  const feasible = positionValue <= C + 1e-9;
  const maxCashRiskAmount = affordableShares * stopDistance;
  const maxCashRiskPct = C > 0 ? (maxCashRiskAmount / C) * 100 : 0;
  const extraCapital = Math.max(0, positionValue - C);

  return {
    state: "ready",
    capital: C,
    selectedRiskPct: R,
    stopDistance,
    shares: riskShares,
    positionValue,
    actualRisk,
    actualRiskPct,
    capitalPct,
    cashRemainingPct,
    feasible,
    extraCapital,
    affordableShares,
    maxCashRiskPct,
  };
}

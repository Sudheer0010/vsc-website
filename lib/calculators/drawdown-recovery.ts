export type DrawdownRecoveryResult =
  | { state: "empty"; message: string }
  | {
      state: "new-high";
      peak: number;
      current: number;
      excess: number;
      gainPct: number;
    }
  | {
      state: "at-peak";
      peak: number;
      current: number;
    }
  | {
      state: "below-peak";
      peak: number;
      current: number;
      loss: number;
      drawdownPct: number;
      recoveryPct: number;
      remainingPct: number;
    };

export function computeDrawdownRecovery(peak: string, current: string): DrawdownRecoveryResult {
  const P = Number.parseFloat(peak);
  const C = Number.parseFloat(current);

  if (!(P > 0) || !(C > 0)) {
    return { state: "empty", message: "Use positive comparable values to calculate drawdown and recovery." };
  }

  if (C > P) {
    return {
      state: "new-high",
      peak: P,
      current: C,
      excess: C - P,
      gainPct: ((C / P) - 1) * 100,
    };
  }

  if (C === P) {
    return { state: "at-peak", peak: P, current: C };
  }

  const loss = P - C;
  return {
    state: "below-peak",
    peak: P,
    current: C,
    loss,
    drawdownPct: (loss / P) * 100,
    recoveryPct: ((P / C) - 1) * 100,
    remainingPct: (C / P) * 100,
  };
}

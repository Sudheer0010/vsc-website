function clampPos(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export type RiskRewardValidation = {
  E: number;
  S: number;
  T: number;
  Q: number | null;
  stopInvalid: boolean;
  targetInvalid: boolean;
  qtyInvalid: boolean;
};

export function validateRiskReward(entry: string, stop: string, target: string, quantity: string): RiskRewardValidation {
  const E = Number.parseFloat(entry);
  const S = Number.parseFloat(stop);
  const T = Number.parseFloat(target);
  const qRaw = quantity.trim();
  const Q = qRaw === "" ? null : Number(qRaw);

  const stopInvalid = Number.isFinite(E) && Number.isFinite(S) && S >= E;
  const targetInvalid = Number.isFinite(E) && Number.isFinite(T) && T <= E;
  const qtyInvalid = qRaw !== "" && (!Number.isFinite(Q) || Q === null || Q <= 0 || !Number.isInteger(Q));

  return { E, S, T, Q, stopInvalid, targetInvalid, qtyInvalid };
}

export type RiskRewardResult =
  | { state: "empty"; message: string }
  | {
      state: "ready";
      entry: number;
      stop: number;
      target: number;
      risk: number;
      reward: number;
      ratio: number;
      breakeven: number;
      stopPct: number;
      rewardPct: number;
      entryPos: number;
      hasQty: boolean;
      quantity: number | null;
      plannedRisk: number | null;
      potentialReward: number | null;
    };

export function computeRiskReward(entry: string, stop: string, target: string, quantity: string): RiskRewardResult {
  const { E, S, T, Q, stopInvalid, targetInvalid, qtyInvalid } = validateRiskReward(entry, stop, target, quantity);

  const baseValid = E > 0 && S > 0 && T > 0 && !stopInvalid && !targetInvalid;

  if (!baseValid) {
    return { state: "empty", message: "Enter valid trade levels to calculate the payoff structure." };
  }

  const risk = E - S;
  const reward = T - E;
  const ratio = reward / risk;
  const breakeven = 100 / (1 + ratio);
  const stopPct = (risk / E) * 100;
  const rewardPct = (reward / E) * 100;
  const total = risk + reward;
  const entryPos = clampPos((risk / total) * 100, 8, 92);
  const hasQty = Q !== null && !qtyInvalid;

  return {
    state: "ready",
    entry: E,
    stop: S,
    target: T,
    risk,
    reward,
    ratio,
    breakeven,
    stopPct,
    rewardPct,
    entryPos,
    hasQty,
    quantity: hasQty ? Q : null,
    plannedRisk: hasQty ? risk * (Q as number) : null,
    potentialReward: hasQty ? reward * (Q as number) : null,
  };
}

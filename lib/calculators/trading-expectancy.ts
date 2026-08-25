export type SampleTone = "caution" | "neutral" | "broad";

export type SampleContext = {
  badge: string;
  tone: SampleTone;
  text: string;
};

export function sampleContext(n: number): SampleContext {
  if (n < 30) {
    return {
      badge: "Limited sample",
      tone: "caution",
      text: "Fewer than 30 trades provides only a very limited expectancy estimate. A few unusual outcomes can dominate the result.",
    };
  }
  if (n < 100) {
    return {
      badge: "Developing sample",
      tone: "neutral",
      text: "This is useful as an early estimate, but it can still move materially as more trades are added.",
    };
  }
  if (n < 200) {
    return {
      badge: "Broader sample",
      tone: "broad",
      text: "A larger sample gives a clearer view of the observed trade distribution, while regime and execution consistency still matter.",
    };
  }
  return {
    badge: "Broad sample",
    tone: "broad",
    text: "More observations reduce sensitivity to individual trades, but historical expectancy can still change when the strategy or market regime changes.",
  };
}

export type TradingExpectancyResult =
  | { state: "empty"; message: string }
  | {
      state: "ready";
      expectancyState: "positive" | "negative" | "flat";
      winRate: number;
      avgWin: number;
      avgLoss: number;
      trades: number;
      lossRate: number;
      winContribution: number;
      lossContribution: number;
      expectancy: number;
      payoff: number;
      breakeven: number;
      edgeVsBreakeven: number;
      sample: SampleContext;
    };

export function computeTradingExpectancy(winRate: string, avgWin: string, avgLoss: string, trades: string): TradingExpectancyResult {
  const pRaw = Number.parseFloat(winRate);
  const W = Number.parseFloat(avgWin);
  const L = Number.parseFloat(avgLoss);
  const N = Number.parseInt(trades, 10);

  if (!(pRaw > 0 && pRaw < 100) || !(W > 0) || !(L > 0) || !(N >= 1)) {
    return {
      state: "empty",
      message:
        "Win rate must be between 0% and 100%, average win/loss must be positive, and sample size must be at least one trade.",
    };
  }

  const p = pRaw / 100;
  const q = 1 - p;
  const winContribution = p * W;
  const lossContribution = q * L;
  const expectancy = winContribution - lossContribution;
  const payoff = W / L;
  const breakeven = (L / (W + L)) * 100;
  const edgeVsBreakeven = pRaw - breakeven;

  const expectancyState: "positive" | "negative" | "flat" =
    expectancy < -0.0000001 ? "negative" : Math.abs(expectancy) <= 0.0000001 ? "flat" : "positive";

  return {
    state: "ready",
    expectancyState,
    winRate: pRaw,
    avgWin: W,
    avgLoss: L,
    trades: N,
    lossRate: q * 100,
    winContribution,
    lossContribution,
    expectancy,
    payoff,
    breakeven,
    edgeVsBreakeven,
    sample: sampleContext(N),
  };
}

import { MarketLetter } from "@/types/market-letter";

/**
 * Chronological order, most recent first. This is the one place that
 * defines "latest" — every page that needs the current letter or the full
 * archive order should import this rather than re-declaring its own copy,
 * which is how the homepage and the blog page previously ended up
 * describing two different letters as "the latest one."
 */
export const sortedMonths = ["JUL", "JUN", "MAY", "APR", "MAR", "FEB", "JAN"];

export const latestMonthKey = sortedMonths[0];

/**
 * JAN–JUN predate the standard letter format (thesis, Framework Review,
 * the trade / surprise sections) — they're migrated here into the new
 * shape using only what their original text already said, restructured
 * rather than reinterpreted. Their `environment` value and Framework
 * Review row are a best-effort read of that original text against
 * Framework 01's three regimes, since the framework's own classification
 * wasn't recorded at the time; treat those two fields on JAN–JUN as a
 * draft worth a second look, not an audited figure. `theTrade` and
 * `whatSurprisedMe` are left unset for all six rather than invented,
 * since no specific trade or surprise was captured in the original text.
 * JUL is the first letter written to the full format and is unabridged.
 */
export const marketLetters: { [key: string]: MarketLetter } = {
  JAN: {
    letterNumber: 1,
    publishedDate: "2026-01-31",
    month: "JANUARY",
    year: 2026,
    description: "Sector leadership screenings and momentum execution models.",
    thesis: "Leadership only emerged in the back half of the month, and only where relative strength was already established.",
    metrics: {
      monthlyReturn: "+12.42%",
      tradesTaken: 9,
      environment: "Neutral",
    },
    frameworkReview: [
      {
        framework: "01 Market Environment",
        interpretation: "Neutral",
        detail: "Momentum improving through the month, but leadership still narrow",
      },
    ],
    sections: {
      marketBehavior: "Momentum conditions improved during the latter half of the month, with selective opportunities emerging in leadership stocks.",
      whatIDid: "I focused only on stocks showing clear leadership and avoided weaker setups. Relative strength names and momentum continuation setups were what worked — everything else stayed on the sidelines.",
      whatImWatching: "Monitoring follow-through in emerging leaders and sector strength.",
    },
  },
  FEB: {
    letterNumber: 2,
    publishedDate: "2026-02-28",
    month: "FEBRUARY",
    year: 2026,
    description: "Capitalizing on banking sector relative strength and Stage 2 breakouts.",
    thesis: "Banking sector strength was decisive enough to justify increasing participation, not just noting it.",
    metrics: {
      monthlyReturn: "+11.82%",
      tradesTaken: 14,
      environment: "Aggressive",
    },
    frameworkReview: [
      {
        framework: "01 Market Environment",
        interpretation: "Aggressive",
        detail: "Sector strength with consistent follow-through, participation increased",
      },
    ],
    sections: {
      marketBehavior: "Banking sector showed strength in early February with consistent follow-through. Quality setups presented multiple times throughout the month with strong conviction.",
      whatIDid: "I increased participation in confirmed setups while maintaining strict risk per trade. HDFC breakouts with 4:1+ risk-reward and banking sector leadership were what worked, backed by consistent discipline on entry confirmation.",
      whatImWatching: "Observing continuation of banking strength and monitoring sector rotation signals.",
    },
  },
  MAR: {
    letterNumber: 3,
    publishedDate: "2026-03-31",
    month: "MARCH",
    year: 2026,
    description: "Strict risk controls during geopolitical volatility cycles.",
    thesis: "One loss was enough evidence to cut exposure to almost nothing.",
    metrics: {
      monthlyReturn: "-1.56%",
      tradesTaken: 1,
      environment: "Defensive",
    },
    frameworkReview: [
      {
        framework: "01 Market Environment",
        interpretation: "Defensive",
        detail: "Failed breakouts rising, geopolitical uncertainty widening",
      },
    ],
    sections: {
      marketBehavior: "Negative bias dominated the market. Failed breakouts increased significantly amid uncertainty surrounding geopolitical developments.",
      whatIDid: "After the first loss, I reduced risk aggressively and kept participation limited as volatility increased. Capital preservation was the only thing that worked this month.",
      whatImWatching: "Monitoring signs of geopolitical cooling and improvement in overall market participation.",
    },
  },
  APR: {
    letterNumber: 4,
    publishedDate: "2026-04-30",
    month: "APRIL",
    year: 2026,
    description: "Preserving capital and managing cash balances during high-volatility ranges.",
    thesis: "Zero trades was the correct number of trades.",
    metrics: {
      monthlyReturn: "0.00%",
      tradesTaken: 0,
      environment: "Defensive",
    },
    frameworkReview: [
      {
        framework: "01 Market Environment",
        interpretation: "Defensive",
        detail: "FII selling accelerating, no conviction setups presented",
      },
    ],
    sections: {
      marketBehavior: "FII selling accelerated as global capital chased AI-driven opportunities in international markets. Rupee depreciation and geopolitical tensions further increased uncertainty.",
      whatIDid: "I maintained a capital preservation approach and avoided forcing trades in low-conviction conditions. Patience and staying defensive were what worked, precisely because there was nothing else to do.",
      whatImWatching: "Monitoring stabilization in global risk sentiment, FII flows, and signs of improving market participation.",
    },
  },
  MAY: {
    letterNumber: 5,
    publishedDate: "2026-05-31",
    month: "MAY",
    year: 2026,
    description: "Allocating capital to AI proxy breakout trends and defense relative strength.",
    thesis: "Broadening participation across AI proxies and defence names was the signal, not any single breakout.",
    metrics: {
      monthlyReturn: "+23.42%",
      tradesTaken: 33,
      environment: "Aggressive",
    },
    frameworkReview: [
      {
        framework: "01 Market Environment",
        interpretation: "Aggressive",
        detail: "Broad participation, improving follow-through across sectors",
        direction: "up",
      },
    ],
    sections: {
      marketBehavior: "Market conditions improved considerably. AI proxy themes and defence-related sectors displayed strong relative strength, leading to broader participation and improved momentum conditions.",
      whatIDid: "I increased participation selectively as follow-through and momentum quality improved. AI proxy opportunities, defence sector leadership, and high-quality momentum setups were what worked.",
      whatImWatching: "Monitoring whether sector leadership broadens further and if momentum conditions remain sustainable.",
    },
  },
  JUN: {
    letterNumber: 6,
    publishedDate: "2026-06-30",
    month: "JUNE",
    year: 2026,
    description: "Navigating sector rotation and trailing leadership setups.",
    thesis: "Improving breakout success rates were a reason to scale back to normal size, not a reason to push further.",
    metrics: {
      monthlyReturn: "+5.82%",
      tradesTaken: 12,
      environment: "Neutral",
    },
    frameworkReview: [
      {
        framework: "01 Market Environment",
        interpretation: "Neutral",
        detail: "Volatility cooling, leadership narrowed to two sectors",
        direction: "down",
      },
    ],
    sections: {
      marketBehavior: "Volatility cooled down as the market established higher support lines. Relative strength leaders emerged in IT and Auto sectors.",
      whatIDid: "I scaled allocations back to normal sizes as breakout success rates improved. IT breakout continuation, Auto sector relative strength, and trailing stops on leaders were what worked.",
      whatImWatching: "Monitoring continuation of leadership themes and overall market volume.",
    },
  },
  JUL: {
    letterNumber: 7,
    publishedDate: "2026-07-24",
    month: "JULY",
    year: 2026,
    description: "How I interpreted markets, managed risk and positioned capital.",
    thesis: "Healthy indices can hide unhealthy opportunities.",
    pullQuote: "The broader indices remained resilient through July, closing the month largely where they started. Almost nothing underneath that resilience held up the same way — most breakout attempts failed to sustain momentum and lacked meaningful follow-through, and the market rewarded patience over activity.",
    metrics: {
      monthlyReturn: "+5.82%",
      tradesTaken: 2,
      environment: "Defensive",
    },
    frameworkReview: [
      {
        framework: "01 Market Environment",
        interpretation: "Defensive",
        detail: "Index resilient, but most breakout attempts failed to sustain momentum",
        direction: "down",
      },
      {
        framework: "05 Trade Management",
        interpretation: "Protect",
        detail: "Reduced frequency sharply, protected both financial and psychological capital",
      },
    ],
    sections: {
      marketBehavior: "The broader indices remained resilient through July, closing the month largely where they started. Almost nothing underneath that resilience held up the same way — most breakout attempts failed to sustain momentum and lacked meaningful follow-through, and the market rewarded patience over activity.",
      whatIDid: "I reduced trading frequency significantly and operated in capital preservation mode throughout the month, avoiding trades as conditions deteriorated rather than forcing exposure to stay active. The two setups I did take passed strict, predefined risk criteria — everything else stayed on the sidelines while I waited for quality rather than manufacturing it.",
      whatImWatching: "Whether sustainable momentum and high-quality breakout structures reappear. Until they do, the priority stays patience, disciplined execution, and improving the process.",
    },
  },
};

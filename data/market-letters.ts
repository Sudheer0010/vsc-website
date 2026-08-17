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

      // PLACEHOLDER content — to be replaced by Sudheer's own writing.
      theMarket: "June was a consolidation month. After the volatility of the prior quarter, the broader indices stabilised — support held on the second retest, and daily ranges compressed as the month progressed. Sector rotation was the dominant story: IT re-emerged as a relative-strength leader after several months of underperformance, and Auto held its post-earnings gains. Metals and PSU banks lagged. Breadth was thinner than the headline index moves suggested — the recovery was carried by two sectors, not four or five.",
      theFrameworkRead: "The Market Environment framework read Neutral through the month: trend intact, breadth narrowing, leadership present but concentrated. The Opportunity Universe filter narrowed to IT names showing new-high relative strength and Auto names holding above their earnings-week ranges. Setup Grading produced more B-grade setups than A-grades — the environment supported participation but didn't reward aggression. Sizing stayed at normal. The improving breakout success rate was a reason to be in position, not a reason to press.",
      thePositions: "Twelve trades taken. Most were IT breakout continuations sized at normal risk. Two Auto-sector adds on relative-strength confirmation. Trailing stops on the strongest names were lifted twice during the month; two positions were exited on stop after brief tests. No new sector exposure outside IT and Auto.",
      theReview: "What worked: sizing discipline. Every trade sat within the per-position risk ceiling — no overreach on setups that felt \"obvious.\" Trailing stops on the leadership names captured the second-half move without giving back the June open.\n\nWhat didn't: no exposure taken in the mid-cap space, which participated more strongly than expected in the second half of the month. The universe filter was reading correctly at month-open but stayed static as breadth improved slightly. Worth revisiting whether the filter should refresh mid-month rather than monthly.",
      theWatch: "Continuation of IT and Auto leadership into July, or the emergence of a third leadership sector. Total market volume — the recovery is thin, and volume expansion (or continued absence) will determine whether this is a durable trend or a range with sector rotation inside it.",
    },
  },
  JUL: {
    letterNumber: 7,
    publishedDate: "2026-07-24",
    dataThrough: "2026-07-31",
    month: "JULY",
    year: 2026,
    description: "The market repeatedly recovered from drawdowns, but weak breadth, poor breakout follow-through and pressure from crude kept the underlying environment difficult.",
    thesis: "Healthy recovery. Weak structure.",
    pullQuote: "The market repeatedly recovered from drawdowns, but weak breadth, poor breakout follow-through and pressure from crude kept the underlying environment difficult.",
    metrics: {
      monthlyReturn: "+7.68%",
      tradesTaken: 6,
      environment: "Defensive",
    },
    // Superseded by marketHealth/vscRead below — the old two-row exhibit
    // (from the pre-Spec-v4 template) no longer matches this letter's
    // content (e.g. it recorded 2 trades; the real figure is 6) and the
    // Framework Review accordion no longer renders once marketHealth is
    // set, so it's left empty rather than carrying stale numbers forward.
    frameworkReview: [],

    subThesis: "The market repeatedly recovered from drawdowns, but weak breadth, poor breakout follow-through and pressure from crude kept the underlying environment difficult.",
    regimeTagEditorial: "Narrow Breadth",

    marketSnapshot: [
      { asset: "NIFTY 50", monthEnd: "24,383.60", mtdPct: 2.17, ytdPct: -6.68, read: "Fragile recovery" },
      { asset: "GOLD", monthEnd: "₹1,42,860 / 10g", mtdPct: 1.11, ytdPct: 7.33, read: "Firm" },
      { asset: "SILVER", monthEnd: "₹2,18,295 / kg", mtdPct: -3.16, ytdPct: -4.85, read: "Cooling" },
      { asset: "CRUDE", monthEnd: "$90.12 / bbl", mtdPct: 23.59, ytdPct: 48.10, read: "Key pressure" },
      { asset: "USD/INR", monthEnd: "95.3706", mtdPct: 0.82, ytdPct: 6.06, read: "INR weaker" },
    ],

    marketHealth: [
      { factor: "Trend", current: "Weak", status: "red", vsPrev: "down", vscRead: "Key structure remained under pressure" },
      { factor: "Breadth", current: "Narrowing", status: "amber", vsPrev: "flat", vscRead: "Participation continued to deteriorate" },
      { factor: "Leadership", current: "Very Concentrated", status: "red", vsPrev: "down", vscRead: "Tradeable leadership stayed narrow" },
      { factor: "Breakout Quality", current: "Poor", status: "red", vsPrev: "down", vscRead: "Follow-through repeatedly failed" },
      { factor: "Volatility", current: "Elevated", status: "amber", vsPrev: "down", vscRead: "Drawdowns followed by fast recoveries" },
    ],
    overallEnvironment: {
      label: "Defensive",
      vsPrev: "down",
      vscRead: "Selectivity over activity",
    },

    // Stored now so Section 04 activates automatically once Letter 006 is
    // backfilled with its own marketHealth/vscRead — nothing else about
    // this letter needs to change when that happens.
    netChange: "The index held up better than opportunity quality: leadership narrowed, breakouts deteriorated and volatility increased, forcing a more defensive playbook.",

    whatHappened: {
      index: {
        headline: "The headline recovered faster than the underlying structure.",
        explanation: "Nifty recovered repeatedly from drawdowns, but remaining below the key 200 EMA kept the broader structure fragile.",
      },
      breadth: {
        headline: "Participation continued to narrow.",
        explanation: "The longer the index remained below its key moving average, the harder it became to find sustained participation underneath it.",
      },
      leadership: {
        headline: "Headline leadership existed, but tradeable leadership stayed narrow.",
        explanation: "IT provided headline strength while, inside the VSC opportunity set, chemicals were among the few areas showing repeatable resilience.",
      },
      flowsRisk: {
        headline: "Crude remained the key external pressure point.",
        explanation: "Strength in crude repeatedly weighed on Nifty, while periods of cooling gave the index room to breathe.",
      },
    },

    // No chart asset exists yet for July (public/research/market-letters/
    // is empty) — left unset rather than fabricated. Content pack names
    // "Nifty 50 vs 200 EMA — July 2026" as the intended chart.

    vscRead: {
      opportunityUniverse: "Narrow",
      setupQuality: "Weak",
      riskAllocation: "Reduced",
      tradeFrequency: "Reduced",
      primaryObjective: "Preservation",
      conclusion: "Fast recoveries did not justify aggressive exposure while breakouts lacked follow-through and the broader structure remained weak.",
    },

    playbook: {
      exposure: "Reduced",
      positionSize: "Below normal",
      preferredSetup: "Mean reversion near moving averages",
      avoided: "Breakout chasing",
      triggerToIncreaseRisk: "Structure and breadth improve",
    },

    monthInReview: {
      monthlyReturn: "+7.68%",
      trades: 6,
      worked: "Mean-reversion setups near moving averages and taking profits progressively rather than waiting for outsized moves.",
      didnt: "Breakouts repeatedly lacked follow-through and often returned toward their original pivots.",
      lesson: "When the market changes, the setup selection has to change with it.",
    },

    watchingNext: {
      conditions: [
        { if: "Nifty reclaims the 200 EMA", then: "become more constructive" },
        { if: "breadth starts expanding", then: "increase participation" },
        { if: "breakout follow-through improves", then: "reconsider breakout setups" },
        { if: "crude remains contained", then: "pressure on Nifty should ease" },
      ],
      currentStance: "Stay defensive until market structure and participation improve.",
    },

    sections: {},
  },
};

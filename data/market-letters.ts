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
 * All seven letters (JAN–JUL) are on the full Template Spec v4 format —
 * see VSC_MARKET_LETTERS_JAN_JUL_2026_CONTENT_PACK_FINAL.md, the approved
 * editorial source for every field below. `metrics`/`frameworkReview`
 * remain on each letter only as legacy compatibility fields for any code
 * path that still reads them (see hasV4Content in
 * lib/market-letter-format.ts) — `frameworkReview` is superseded by
 * `marketHealth`/`vscRead` and left empty rather than carrying stale
 * figures forward, the same treatment JUN and JUL already had. `sections`
 * (the pre-v4 prose fields, `theTrade`, `whatSurprisedMe`) is left `{}` on
 * every letter now that none of them render through the legacy path.
 * JANUARY has no `netChange` and no prior month to compare against, so
 * Zone 04 (What Changed) renders nothing for it by design — see
 * WhatChangedZone in MarketLetterV4.tsx.
 */
export const marketLetters: { [key: string]: MarketLetter } = {
  JAN: {
    letterNumber: 1,
    publishedDate: "2026-01-31",
    month: "JANUARY",
    year: 2026,
    description: "Sector leadership screenings and momentum execution models.",
    thesis: "Weak market. Selective leaders.",
    metrics: {
      monthlyReturn: "+12.42%",
      tradesTaken: 9,
      environment: "Neutral",
    },
    // Superseded by marketHealth/vscRead below, same as JUN/JUL.
    frameworkReview: [],

    subThesis: "The year began with weakening indices and narrowing participation, but relative-strength leaders still produced selective momentum opportunities.",
    regimeTagEditorial: "Narrowing Breadth",

    marketSnapshot: [
      { asset: "NIFTY 50", monthEnd: "25,320.65", mtdPct: -3.10, ytdPct: -3.10, read: "Weakening" },
      { asset: "GOLD", monthEnd: "₹1,65,795 / 10g", mtdPct: 21.21, ytdPct: 21.21, read: "Strong" },
      { asset: "SILVER", monthEnd: "₹3,39,350 / kg", mtdPct: 44.13, ytdPct: 44.13, read: "Leadership" },
      { asset: "CRUDE", monthEnd: "$70.69 / bbl", mtdPct: 16.17, ytdPct: 16.17, read: "Rising pressure" },
      { asset: "USD/INR", monthEnd: "91.8983", mtdPct: 2.20, ytdPct: 2.20, read: "INR weaker" },
    ],

    // vsPrev is "flat" throughout January — there is no December 2025 letter
    // in the archive to compare against, and Zone 04 is skipped entirely
    // for this reason (see WhatChangedZone), so no direction is claimed.
    marketHealth: [
      { factor: "Trend", current: "Weakening", status: "amber", vsPrev: "flat", vscRead: "Index structure lost momentum" },
      { factor: "Breadth", current: "Narrowing", status: "amber", vsPrev: "flat", vscRead: "Participation deteriorated" },
      { factor: "Leadership", current: "Concentrated", status: "amber", vsPrev: "flat", vscRead: "Relative-strength pockets remained" },
      { factor: "Breakout Quality", current: "Fair", status: "amber", vsPrev: "flat", vscRead: "Follow-through was setup-specific" },
      { factor: "Volatility", current: "Controlled", status: "green", vsPrev: "flat", vscRead: "Conditions remained manageable" },
    ],
    overallEnvironment: {
      label: "Cautious",
      vsPrev: "flat",
      vscRead: "Select leaders only",
    },

    whatHappened: {
      index: {
        headline: "The year started on the back foot.",
        explanation: "Nifty weakened through January, setting a difficult tone for the year and reducing the quality of broad-market participation.",
      },
      breadth: {
        headline: "Weakness extended beyond the headline index.",
        explanation: "Participation narrowed across the market, making broad exposure less attractive than selective stock picking.",
      },
      leadership: {
        headline: "Metals stood out while FMCG struggled.",
        explanation: "Relative-strength names inside stronger pockets provided the cleaner momentum opportunities while weaker sectors stayed off the list.",
      },
      flowsRisk: {
        headline: "Foreign selling and rupee weakness weighed on sentiment.",
        explanation: "A weaker rupee, rising crude and foreign selling added pressure to an already soft domestic market.",
      },
    },

    // No chart asset exists yet for January (public/research/market-letters/
    // is empty) — left unset rather than fabricated, same as JUN/JUL.
    // Content pack names "Nifty Metal vs Nifty 50 — January 2026".

    vscRead: {
      opportunityUniverse: "Narrow",
      setupQuality: "Normal",
      riskAllocation: "Reduced",
      tradeFrequency: "Normal",
      primaryObjective: "Balanced",
      conclusion: "Weakening breadth argued against broad exposure, but confirmed relative-strength leaders still offered enough quality for selective participation.",
    },

    playbook: {
      exposure: "Reduced",
      positionSize: "Controlled",
      preferredSetup: "Relative-strength momentum continuation",
      avoided: "Weak and lagging setups",
      triggerToIncreaseRisk: "Leadership and breadth broaden",
    },

    monthInReview: {
      monthlyReturn: "+12.42%",
      trades: 9,
      worked: "Concentrating only on clear relative-strength names and momentum-continuation setups while leaving weaker opportunities alone.",
      didnt: "Broader-market weakness made ordinary breakout setups inconsistent and reduced the number of genuinely attractive trades.",
      lesson: "When breadth weakens, opportunity does not disappear — it concentrates.",
    },

    watchingNext: {
      conditions: [
        { if: "emerging leaders follow through", then: "stay with momentum" },
        { if: "sector strength broadens", then: "increase participation" },
        { if: "breadth begins recovering", then: "become more constructive" },
        { if: "leadership starts failing", then: "reduce exposure" },
      ],
      currentStance: "Stay selective and let relative strength determine where capital is deployed.",
    },

    sections: {},
  },
  FEB: {
    letterNumber: 2,
    publishedDate: "2026-02-28",
    month: "FEBRUARY",
    year: 2026,
    description: "Capitalizing on banking sector relative strength and Stage 2 breakouts.",
    thesis: "Flat index. Strong rotation.",
    metrics: {
      monthlyReturn: "+10.74%",
      tradesTaken: 14,
      environment: "Aggressive",
    },
    frameworkReview: [],

    subThesis: "Nifty remained in consolidation, but strength in banking and consumer-facing sectors created selective opportunities while IT underwent a major breakdown.",
    regimeTagEditorial: "Banking Strength",

    marketSnapshot: [
      { asset: "NIFTY 50", monthEnd: "25,178.65", mtdPct: -0.56, ytdPct: -3.64, read: "Consolidating" },
      { asset: "GOLD", monthEnd: "₹1,58,022 / 10g", mtdPct: -4.69, ytdPct: 15.53, read: "Correcting" },
      { asset: "SILVER", monthEnd: "₹2,60,667 / kg", mtdPct: -23.19, ytdPct: 10.71, read: "Sharp correction" },
      { asset: "CRUDE", monthEnd: "$72.48 / bbl", mtdPct: 2.53, ytdPct: 19.11, read: "Firm" },
      { asset: "USD/INR", monthEnd: "91.0760", mtdPct: -0.99, ytdPct: 1.29, read: "INR firmer" },
    ],

    marketHealth: [
      { factor: "Trend", current: "Intact", status: "amber", vsPrev: "up", vscRead: "Index remained in consolidation" },
      { factor: "Breadth", current: "Mixed", status: "amber", vsPrev: "rerated", vscRead: "Participation varied sharply by sector" },
      { factor: "Leadership", current: "Concentrated", status: "amber", vsPrev: "flat", vscRead: "Banking produced cleaner strength" },
      { factor: "Breakout Quality", current: "Fair", status: "amber", vsPrev: "flat", vscRead: "Follow-through remained setup-specific" },
      { factor: "Volatility", current: "Calm", status: "green", vsPrev: "up", vscRead: "Conditions remained manageable" },
    ],
    overallEnvironment: {
      label: "Neutral",
      vsPrev: "up",
      vscRead: "Follow strength selectively",
    },

    netChange: "The index stayed range-bound, but sector rotation improved the quality of opportunities enough to restore normal participation.",

    whatHappened: {
      index: {
        headline: "Consolidation continued for another month.",
        explanation: "Nifty stayed broadly range-bound even as very large moves developed underneath the headline benchmark.",
      },
      breadth: {
        headline: "The index hid better participation underneath.",
        explanation: "Participation improved selectively rather than through a broad-based advance.",
      },
      leadership: {
        headline: "Sector rotation became the real opportunity.",
        explanation: "Banking and consumer-facing sectors strengthened while IT weakened sharply, making sector selection far more important than index direction.",
      },
      flowsRisk: {
        headline: "External risk increased without breaking market stability.",
        explanation: "Crude and geopolitical uncertainty added risk, but volatility remained contained enough for selective participation.",
      },
    },

    // No chart asset exists yet for February — left unset rather than
    // fabricated. Content pack names "PSU Banks vs Nifty IT — February 2026".

    vscRead: {
      opportunityUniverse: "Normal",
      setupQuality: "Normal",
      riskAllocation: "Normal",
      tradeFrequency: "Normal",
      primaryObjective: "Balanced",
      conclusion: "A consolidating index did not prevent participation where sector leadership, confirmation and follow-through were clearly present.",
    },

    playbook: {
      exposure: "Normal",
      positionSize: "Split risk",
      preferredSetup: "Confirmed banking momentum setups",
      avoided: "Weak-sector breakout attempts",
      triggerToIncreaseRisk: "Leadership broadens and follow-through sustains",
    },

    monthInReview: {
      monthlyReturn: "+10.74%",
      trades: 14,
      worked: "Banking leadership combined with disciplined entry confirmation produced several clean, repeatable opportunities.",
      didnt: "Breakout quality outside the stronger sectors remained inconsistent and required more selectivity.",
      lesson: "A flat index can still contain strong opportunities when sector rotation provides clear leadership.",
    },

    watchingNext: {
      conditions: [
        { if: "banking strength continues", then: "stay with leadership" },
        { if: "leadership broadens", then: "increase participation" },
        { if: "breakout quality improves", then: "allow stronger setups more room" },
        { if: "sector rotation weakens", then: "reduce exposure" },
        { if: "volatility expands", then: "prioritise preservation" },
      ],
      currentStance: "Stay selective and follow confirmed leadership rather than trying to predict the index.",
    },

    sections: {},
  },
  MAR: {
    letterNumber: 3,
    publishedDate: "2026-03-31",
    month: "MARCH",
    year: 2026,
    description: "Strict risk controls during geopolitical volatility cycles.",
    thesis: "Broken market. Risk off.",
    metrics: {
      monthlyReturn: "-1.41%",
      tradesTaken: 1,
      environment: "Defensive",
    },
    frameworkReview: [],

    subThesis: "Nifty suffered a severe drawdown as crude surged, foreign capital exited and market structure deteriorated across the board.",
    regimeTagEditorial: "Broken Structure",

    // USD/INR values are approximate in the source content pack — kept as
    // the "~"-prefixed string for monthEnd (a formatted display string) but
    // rendered as plain numbers for mtdPct/ytdPct, which the data model
    // types as `number` and cannot carry the "~" annotation.
    marketSnapshot: [
      { asset: "NIFTY 50", monthEnd: "22,331.40", mtdPct: -11.31, ytdPct: -14.54, read: "Breaking down" },
      { asset: "GOLD", monthEnd: "₹1,46,730 / 10g", mtdPct: -7.15, ytdPct: 9.01, read: "Volatile" },
      { asset: "SILVER", monthEnd: "₹2,30,135 / kg", mtdPct: -11.71, ytdPct: -0.94, read: "Under pressure" },
      { asset: "CRUDE", monthEnd: "$118.35 / bbl", mtdPct: 63.29, ytdPct: 94.49, read: "Extreme surge" },
      { asset: "USD/INR", monthEnd: "~94.83", mtdPct: 4.1, ytdPct: 5.5, read: "INR weaker" },
    ],

    marketHealth: [
      { factor: "Trend", current: "Deteriorated", status: "red", vsPrev: "down", vscRead: "Primary structure broke down" },
      { factor: "Breadth", current: "Very Narrow", status: "red", vsPrev: "down", vscRead: "Participation collapsed" },
      { factor: "Leadership", current: "Very Concentrated", status: "red", vsPrev: "down", vscRead: "No dependable leadership" },
      { factor: "Breakout Quality", current: "Poor", status: "red", vsPrev: "down", vscRead: "Follow-through unreliable" },
      { factor: "Volatility", current: "High", status: "red", vsPrev: "down", vscRead: "Macro shocks dominated" },
    ],
    overallEnvironment: {
      label: "Defensive",
      vsPrev: "down",
      vscRead: "Protect capital",
    },

    netChange: "A stable consolidation broke into broad deterioration as volatility surged, leadership disappeared and preserving capital became the priority.",

    whatHappened: {
      index: {
        headline: "The market moved from weakness into breakdown.",
        explanation: "Nifty suffered a severe monthly decline and market structure deteriorated decisively.",
      },
      breadth: {
        headline: "Weakness spread across the market.",
        explanation: "The selloff was not confined to isolated sectors; broader participation deteriorated alongside the headline index.",
      },
      leadership: {
        headline: "There was little dependable leadership to trade.",
        explanation: "Isolated strength could not offset deterioration across the market, leaving very few high-conviction opportunities.",
      },
      flowsRisk: {
        headline: "War, crude and foreign selling became the market.",
        explanation: "Surging crude, geopolitical risk, rupee pressure and foreign outflows dominated the trading environment.",
      },
    },

    // No chart asset exists yet for March — left unset rather than
    // fabricated. Content pack names "Nifty 50 vs Brent Crude — March 2026".

    vscRead: {
      opportunityUniverse: "Very Narrow",
      setupQuality: "Poor",
      riskAllocation: "Minimal",
      tradeFrequency: "Low",
      primaryObjective: "Preservation",
      conclusion: "The first failed trade confirmed what the broader market evidence was already showing: this was not an environment in which risk needed to be pressed.",
    },

    playbook: {
      exposure: "Minimal",
      positionSize: "Minimal",
      preferredSetup: "Wait for stability",
      avoided: "Breakouts and forced trades",
      triggerToIncreaseRisk: "Structure and volatility improve",
    },

    monthInReview: {
      monthlyReturn: "-1.41%",
      trades: 1,
      worked: "Treating the first loss as market feedback and cutting exposure before a difficult month could become a damaging one.",
      didnt: "The single trade failed as breakout and momentum conditions deteriorated.",
      lesson: "You do not need to trade every day — or every month — to make money. Avoiding unnecessary drawdowns is part of the process.",
    },

    watchingNext: {
      conditions: [
        { if: "volatility declines", then: "reassess opportunities" },
        { if: "crude begins cooling", then: "reduce macro pressure" },
        { if: "breadth starts recovering", then: "participate selectively" },
        { if: "foreign selling moderates", then: "improve risk assessment" },
        { if: "USD/INR stabilises", then: "become less defensive" },
      ],
      currentStance: "Keep exposure minimal until the market provides evidence that conditions are improving.",
    },

    sections: {},
  },
  APR: {
    letterNumber: 4,
    publishedDate: "2026-04-30",
    month: "APRIL",
    year: 2026,
    description: "Preserving capital and managing cash balances during high-volatility ranges.",
    thesis: "Strong rebound. No conviction.",
    metrics: {
      monthlyReturn: "0.00%",
      tradesTaken: 0,
      environment: "Defensive",
    },
    frameworkReview: [],

    subThesis: "Indian equities rebounded sharply from March's damage, but elevated volatility, geopolitical risk and poor setup quality kept the opportunity set unattractive.",
    regimeTagEditorial: "High Volatility",

    marketSnapshot: [
      { asset: "NIFTY 50", monthEnd: "23,997.55", mtdPct: 7.46, ytdPct: -8.16, read: "Sharp rebound" },
      { asset: "GOLD", monthEnd: "₹1,48,650 / 10g", mtdPct: 1.31, ytdPct: 8.68, read: "Firm" },
      { asset: "SILVER", monthEnd: "₹2,36,882 / kg", mtdPct: 2.93, ytdPct: 0.61, read: "Resilient" },
      { asset: "CRUDE", monthEnd: "$114.01 / bbl", mtdPct: -3.67, ytdPct: 87.36, read: "Extreme pressure" },
      { asset: "USD/INR", monthEnd: "95.2417", mtdPct: 0.62, ytdPct: 5.92, read: "INR weaker" },
    ],

    marketHealth: [
      { factor: "Trend", current: "Recovering", status: "amber", vsPrev: "up", vscRead: "Damage was being repaired" },
      { factor: "Breadth", current: "Improving", status: "green", vsPrev: "up", vscRead: "Recovery spread beyond large caps" },
      { factor: "Leadership", current: "Rotating", status: "amber", vsPrev: "rerated", vscRead: "Strength lacked stable leadership" },
      { factor: "Breakout Quality", current: "Poor", status: "red", vsPrev: "flat", vscRead: "Follow-through remained unreliable" },
      { factor: "Volatility", current: "High", status: "red", vsPrev: "flat", vscRead: "Macro risk dominated conditions" },
    ],
    overallEnvironment: {
      label: "Cautious",
      vsPrev: "up",
      vscRead: "Recovery without sufficient conviction",
    },

    netChange: "Prices recovered sharply from March, but volatility and poor breakout quality kept risk conditions too weak to justify participation.",

    whatHappened: {
      index: {
        headline: "The market rebounded sharply from March's damage.",
        explanation: "Nifty recovered strongly, but price recovery alone did not make the environment immediately tradeable.",
      },
      breadth: {
        headline: "Prices improved faster than conviction.",
        explanation: "Broader participation recovered, but dependable breakout structures remained difficult to identify.",
      },
      leadership: {
        headline: "The rebound lacked dependable tradeable leadership.",
        explanation: "Several pockets participated in the recovery, but VSC did not identify enough high-conviction setups to justify exposure.",
      },
      flowsRisk: {
        headline: "Macro uncertainty remained the dominant risk.",
        explanation: "The U.S.-Iran conflict, crude volatility, foreign outflows and rupee weakness kept risk elevated.",
      },
    },

    // No chart asset exists yet for April — left unset rather than
    // fabricated. Content pack names "Nifty 50 vs Brent Crude — April 2026".

    vscRead: {
      opportunityUniverse: "Very Narrow",
      setupQuality: "Poor",
      riskAllocation: "Minimal",
      tradeFrequency: "None",
      primaryObjective: "Preservation",
      conclusion: "A rising index was not enough reason to participate when setup quality remained poor and external risk was unusually high.",
    },

    playbook: {
      exposure: "Minimal",
      positionSize: "No new risk",
      preferredSetup: "Wait for cleaner structures",
      avoided: "Low-conviction breakout attempts",
      triggerToIncreaseRisk: "Volatility falls and follow-through improves",
    },

    monthInReview: {
      monthlyReturn: "0.00%",
      trades: 0,
      worked: "Staying defensive and refusing to manufacture trades when the opportunity set did not justify taking risk.",
      didnt: "Breakout structures continued to lack the consistency and follow-through required for meaningful participation.",
      lesson: "Zero trades can be the correct number of trades when the market offers no clear edge.",
    },

    watchingNext: {
      conditions: [
        { if: "breakout follow-through improves", then: "re-enter selectively" },
        { if: "volatility declines", then: "gradually increase participation" },
        { if: "broader participation strengthens", then: "become more constructive" },
        { if: "rupee and foreign flows stabilise", then: "improve risk assessment" },
      ],
      currentStance: "Protect capital until better opportunities justify putting it back to work.",
    },

    sections: {},
  },
  MAY: {
    letterNumber: 5,
    publishedDate: "2026-05-31",
    month: "MAY",
    year: 2026,
    description: "Allocating capital to AI proxy breakout trends and defense relative strength.",
    thesis: "Weak index. Strong pockets.",
    metrics: {
      monthlyReturn: "+21.29%",
      tradesTaken: 33,
      environment: "Aggressive",
    },
    frameworkReview: [],

    subThesis: "The broader trend remained weak, but improving follow-through inside AI-linked and defence themes created significantly better trading opportunities.",
    regimeTagEditorial: "Selective Strength",

    // MTD/YTD figures are approximate in the source content pack for
    // several assets this month — rendered as plain numbers, same
    // treatment as March's USD/INR row above.
    marketSnapshot: [
      { asset: "NIFTY 50", monthEnd: "23,547.75", mtdPct: -1.87, ytdPct: -9.88, read: "Under pressure" },
      { asset: "GOLD", monthEnd: "₹1,56,463 / 10g", mtdPct: 5.3, ytdPct: 14.4, read: "Strong" },
      { asset: "SILVER", monthEnd: "₹2,63,350 / kg", mtdPct: 11.2, ytdPct: 11.9, read: "Strong" },
      { asset: "CRUDE", monthEnd: "$92.05 / bbl", mtdPct: -19.26, ytdPct: 51, read: "Cooling" },
      { asset: "USD/INR", monthEnd: "95.3845", mtdPct: 0.6, ytdPct: 6.1, read: "INR weaker" },
    ],

    marketHealth: [
      { factor: "Trend", current: "Weak", status: "red", vsPrev: "down", vscRead: "Index trend remained negative" },
      { factor: "Breadth", current: "Selective", status: "amber", vsPrev: "rerated", vscRead: "Participation improved in pockets" },
      { factor: "Leadership", current: "Concentrated", status: "amber", vsPrev: "rerated", vscRead: "Themes carried opportunity" },
      { factor: "Breakout Quality", current: "Improving", status: "green", vsPrev: "up", vscRead: "Sector follow-through returned" },
      { factor: "Volatility", current: "Elevated", status: "amber", vsPrev: "up", vscRead: "Conditions remained fluid" },
    ],
    overallEnvironment: {
      label: "Constructive",
      vsPrev: "up",
      vscRead: "Opportunity improved selectively",
    },

    netChange: "Headline trend weakened again, but sector-specific momentum and better follow-through created far more tradeable opportunities than April.",

    whatHappened: {
      index: {
        headline: "The headline index did not tell the full story.",
        explanation: "Nifty weakened during May, but selective opportunities underneath the benchmark were substantially better than index performance suggested.",
      },
      breadth: {
        headline: "Participation improved, but not everywhere.",
        explanation: "Strength concentrated in specific themes rather than developing into a broad-based market advance.",
      },
      leadership: {
        headline: "AI proxies and defence became the opportunity centres.",
        explanation: "AI-linked names and defence-related stocks produced stronger momentum and more dependable follow-through than the broader market.",
      },
      flowsRisk: {
        headline: "Cooling crude removed some pressure, but uncertainty remained.",
        explanation: "Crude retreated materially from April's extremes, improving the background even as geopolitical uncertainty remained.",
      },
    },

    // No chart asset exists yet for May — left unset rather than
    // fabricated. Content pack names "Nifty 50 vs Nifty India Defence — May 2026".

    vscRead: {
      opportunityUniverse: "Narrow",
      setupQuality: "Strong",
      riskAllocation: "Normal",
      tradeFrequency: "High",
      primaryObjective: "Growth",
      conclusion: "The index remained weak, but improving momentum and follow-through inside specific themes justified materially higher participation.",
    },

    playbook: {
      exposure: "Increased",
      positionSize: "Normal",
      preferredSetup: "High-quality thematic momentum",
      avoided: "Weak broad-market setups",
      triggerToIncreaseRisk: "Follow-through remains consistent",
    },

    monthInReview: {
      monthlyReturn: "+21.29%",
      trades: 33,
      worked: "Staying flexible and rotating quickly into themes where momentum and follow-through were actually present.",
      didnt: "The market still did not support holding positions passively for extended swing moves.",
      lesson: "A weak index does not mean there are no opportunities — but the market decides where those opportunities exist.",
    },

    watchingNext: {
      conditions: [
        { if: "thematic leadership broadens", then: "remain active" },
        { if: "breakout follow-through sustains", then: "give winners more room" },
        { if: "breadth expands beyond leaders", then: "become more constructive" },
        { if: "momentum begins failing", then: "reduce exposure quickly" },
      ],
      currentStance: "Participate actively, but stay flexible and respect the market's short holding periods.",
    },

    sections: {},
  },
  JUN: {
    letterNumber: 6,
    publishedDate: "2026-06-30",
    month: "JUNE",
    year: 2026,
    description: "Navigating sector rotation and trailing leadership setups.",
    thesis: "Stabilising market. Selective opportunity.",
    metrics: {
      monthlyReturn: "+6.65%",
      tradesTaken: 20,
      environment: "Neutral",
    },
    // Superseded by marketHealth/vscRead below, same as JUL — see that
    // letter's frameworkReview comment for why this is left empty rather
    // than carrying the old two-row exhibit's stale numbers forward.
    frameworkReview: [],

    subThesis: "The index recovered from an intra-month correction, but narrowing breadth and concentrated leadership kept the environment balanced rather than broadly constructive.",
    regimeTagEditorial: "Narrowing Breadth",

    marketSnapshot: [
      { asset: "NIFTY 50", monthEnd: "23,865.75", mtdPct: 1.35, ytdPct: -8.66, read: "Range-bound" },
      { asset: "GOLD", monthEnd: "₹1,41,290 / 10g", mtdPct: -9.70, ytdPct: 4.97, read: "Correcting" },
      { asset: "SILVER", monthEnd: "₹2,25,425 / kg", mtdPct: -14.40, ytdPct: -2.97, read: "Cooling" },
      { asset: "CRUDE", monthEnd: "$72.92 / bbl", mtdPct: -20.78, ytdPct: 19.84, read: "Cooling sharply" },
      { asset: "USD/INR", monthEnd: "94.5975", mtdPct: -0.83, ytdPct: 5.20, read: "INR firmer" },
    ],

    marketHealth: [
      { factor: "Trend", current: "Intact", status: "green", vsPrev: "up", vscRead: "Higher-timeframe structure stabilising" },
      { factor: "Breadth", current: "Narrowing", status: "amber", vsPrev: "down", vscRead: "Participation remained thinner" },
      { factor: "Leadership", current: "Concentrated", status: "amber", vsPrev: "flat", vscRead: "Few pockets carried opportunity" },
      { factor: "Breakout Quality", current: "Improving", status: "amber", vsPrev: "flat", vscRead: "Follow-through started improving" },
      { factor: "Volatility", current: "Controlled", status: "green", vsPrev: "up", vscRead: "Correction was absorbed" },
    ],
    overallEnvironment: {
      label: "Neutral",
      vsPrev: "down",
      vscRead: "Participate without pressing",
    },

    // Stored now so Section 04 activates automatically once Letter 005
    // (May) is backfilled with its own marketHealth/vscRead — nothing else
    // about this letter needs to change when that happens.
    netChange: "The market stabilised and volatility cooled, but leadership stayed concentrated and breadth narrowed, arguing for participation without pressing risk.",

    whatHappened: {
      index: {
        headline: "Correction gave way to recovery.",
        explanation: "Nifty moved through an intra-month correction and recovery, leaving June looking more like consolidation than expansion.",
      },
      breadth: {
        headline: "The recovery was not equally shared.",
        explanation: "Broader participation remained thinner than the headline recovery suggested, keeping the environment selective.",
      },
      leadership: {
        headline: "Opportunity concentrated in a few pockets.",
        explanation: "Within the VSC opportunity set, select IT and Auto names displayed relative-strength characteristics during the recovery.",
      },
      flowsRisk: {
        headline: "Falling crude removed an important pressure point.",
        explanation: "The sharp decline in crude eased one of the major macro pressures that had weighed on Indian equities earlier in the quarter.",
      },
    },

    // No chart asset exists yet for June (public/research/market-letters/
    // is empty) — left unset rather than fabricated, same as JUL. Content
    // pack names "Nifty 50 vs 200 EMA — June 2026" as the intended chart.

    vscRead: {
      opportunityUniverse: "Narrow",
      setupQuality: "Weak",
      riskAllocation: "Normal",
      tradeFrequency: "High",
      primaryObjective: "Balanced",
      conclusion: "Improving breakout success justified participation, but concentrated leadership and predominantly B-grade setups did not justify pressing risk.",
    },

    playbook: {
      exposure: "Normal",
      positionSize: "Normal",
      preferredSetup: "Leadership continuation with trailing stops",
      avoided: "Forcing lower-quality setups",
      triggerToIncreaseRisk: "Breadth and A-grade setups improve",
    },

    monthInReview: {
      monthlyReturn: "+6.65%",
      trades: 20,
      worked: "Sizing discipline and trailing stops helped capture the recovery while progressively protecting gains.",
      didnt: "Limited mid-cap exposure meant missing part of the stronger participation during the second-half recovery.",
      lesson: "Improving conditions are a reason to participate again, not automatically a reason to become aggressive.",
    },

    watchingNext: {
      conditions: [
        { if: "Nifty reclaims the 200 EMA", then: "become more constructive" },
        { if: "breadth broadens", then: "increase participation" },
        { if: "leadership sustains", then: "continue following leaders" },
        { if: "breakout quality improves further", then: "allow trades more room" },
      ],
      currentStance: "Stay neutral and participate selectively while the market continues to stabilise.",
    },

    sections: {},
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

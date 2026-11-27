/**
 * Research Notes — a shorter, evidence-led format distinct from the dated
 * Market Letters and the versioned Frameworks: one market behaviour, one
 * annotated chart, one explicit limit, and a link to the framework it
 * sharpens. Structured (not a `body: string` blob) so every note renders
 * through the same template rather than being hand-built per page.
 */
export interface ResearchNote {
  /** Zero-padded display number, e.g. "001". */
  number: string;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  /** e.g. "August 2026" — display text, not a parsed date. */
  publishedDate: string;
  readingTime: string;
  /** The one-sentence claim — thesis block on the note page, hook line on the archive card. */
  thesis: string;
  /** A short, human-written line for the "new note" email alert — purely
   *  for the inbox, never rendered on the website. Optional — falls back
   *  to `thesis` when a note doesn't specify one. */
  emailHook?: string;

  // --- "One chart" format (Note 001) — optional so a note built from the
  // sections below doesn't have to carry empty chart scaffolding. ---------
  claim?: string[];
  whyItHappens?: string[];
  evidence?: {
    chartImage?: string;
    chartAlt: string;
    chartWidth?: number;
    chartHeight?: number;
    /** Short identifying text shown inside the placeholder until chartImage is set. */
    chartPlaceholderLabel: string[];
    /** Leads with "Exhibit N — ...", ends with the disclaimer as its own paragraph. */
    captionParagraphs: string[];
    afterChartProse: string[];
  };
  /** Rendered as a clay-tinted callout, heading "What it doesn't tell you".
   *  Shared by both note formats — it's the same job (state the limit)
   *  whether the note is chart-led or exercise-led. */
  whatItDoesntTellYou?: string[];
  whereItFeeds?: {
    frameworkLabel: string;
    frameworkHref: string;
    description: string;
  };

  // --- Multi-section, exercise-led format (Note 002 onward) --------------
  /** Compact copy directly under the header, before the thesis line —
   *  no section label, this is the hero, not a research section. */
  openingParagraphs?: string[];
  styleVsInstrument?: {
    styleItems: { label: string; detail: string }[];
    instrumentItems: string[];
    /** e.g. "You can swing trade with options." */
    bridgeParagraphs: string[];
    wrongQuestion: string;
    rightQuestions: string[];
  };
  personalExperience?: {
    heading: string;
    intro: string[];
    /** Short chain rendered with arrows, e.g. ["another setup", "better entries", ...]. */
    chain: string[];
    bridge: string;
    pullQuote: string;
    outro: string[];
  };
  statCards?: {
    stat: string;
    text: string;
    sourceLabel: string;
    sourceHref: string;
  }[];
  statCardsNote?: string[];
  actionSection?: {
    heading: string;
    subheading: string;
    intro: string[];
    labelInstruction: string;
    labelFields: { label: string; options: string }[];
    auditItems: { number: string; label: string; question: string; examples?: string[] }[];
  };
  patternDiagnosis?: {
    heading: string;
    examples: { observation: string; conclusion: string }[];
    emphasis: string;
  };
  nextAction?: {
    heading: string;
    steps: string[];
    emphasis: string;
  };
  finalTakeaway?: {
    avoidQuestion: string;
    askQuestion: string;
    closing: string[];
  };
  caseStudy?: {
    heading: string;
    intro: string[];
    metrics: { name: string; drawdown: string; detail: string }[];
    outro: string[];
    pullQuote: string;
  };
  referencePoints?: {
    heading: string;
    intro: string;
    cards: { tag: string; title: string; body: string }[];
    chart?: {
      image: string;
      alt: string;
      width: number;
      height: number;
      caption: string;
      takeaway: string;
    };
  };
  rallyVsUptrend?: {
    heading: string;
    leftTitle: string;
    rightTitle: string;
    rows: { left: string; right: string }[];
    takeaway: string;
  };
  repairChecklist?: {
    heading: string;
    intro: string;
    items: string[];
    confirmationNote: string;
    closing: string;
  };
  sources?: { title: string; author: string; href: string }[];

  seo: {
    title: string;
    description: string;
  };
}

export const researchNotes: ResearchNote[] = [
  {
    number: "001",
    slug: "three-day-rule",
    category: "EARNINGS BEHAVIOUR",
    title: "Waiting three days after a gap down",
    subtitle: "What the rule protects you from, and what it doesn't",
    publishedDate: "June 2026",
    readingTime: "3 min read",
    thesis: "The three-day rule tells you when not to buy. It never tells you when to.",
    claim: [
      "One of the easiest mistakes after earnings is buying a stock simply because it has fallen sharply.",
      "A stock gaps down 10%, 15% or 20% and suddenly looks cheap. But an earnings gap-down is often not the end of the selling. It can be the beginning of a larger repricing.",
    ],
    whyItHappens: [
      "Institutions holding large positions cannot always exit everything in one session. Selling can continue for days or even weeks. That is why the first bounce after a gap-down should not automatically be treated as recovery.",
      "Day 1 can attract dip buyers and short covering. What matters is what happens after that.",
      "The three-day rule is simple: after a major earnings gap-down, give the stock at least three trading sessions before even considering it.",
      "Not because Day 4 is automatically a buy.",
      "Because those three days give the market time to show whether the selling is actually slowing down.",
    ],
    evidence: {
      chartImage: "/images/research-note-001-chart.png",
      chartAlt: "Jain Resource Recycling Ltd. daily chart, May to August 2026",
      chartPlaceholderLabel: ["Jain Resource Recycling — Daily chart", "May–August 2026"],
      captionParagraphs: [
        "Exhibit 1 — Jain Resource Recycling Ltd., daily chart, May–August 2026. The stock suffered a sharp earnings breakdown in May. After an initial consolidation around ₹385–₹400, that range broke as well. The stock remained in a downtrend for roughly three months and traded near ₹308 by the next earnings period.",
        "Analysis is my own. Not a recommendation.",
      ],
      afterChartProse: [
        "This is exactly why waiting matters.",
        "Buying immediately after the first breakdown would have meant trying to predict where the selling would stop.",
        "But even after three sessions, the stock had not shown enough strength. The short consolidation failed. The previous breakdown was never reclaimed. And the broader downtrend continued.",
      ],
    },
    whatItDoesntTellYou: [
      "This is the part of the rule that matters most.",
      "Three days passing does not create a buy signal.",
      "The three-day rule is a filter. It tells me when not to rush into a stock after an earnings breakdown. Once those three days are over, I still need price to give me a reason to participate.",
      "In this example, three days passed and the answer was still no. The stock continued lower for months.",
      "So the purpose of waiting is not to automatically buy on Day 4. It is to avoid making a decision while the market is still reacting to new information.",
      "The waiting period ends the restriction. It does not start the trade.",
    ],
    whereItFeeds: {
      frameworkLabel: "Framework 03 — Setup Grading",
      frameworkHref: "/frameworks/setup-grading",
      description:
        "A stock can look cheap and still fail the structure, trend and confirmation requirements of a good setup.",
    },
    seo: {
      title: "Waiting Three Days After a Gap Down — Trading Insight 001 | VSC Capital & Advisory",
      description:
        "The three-day rule tells you when not to buy after an earnings gap down. It never tells you when to. An annotated chart of Jain Resource Recycling, May–August 2026.",
    },
  },
  {
    number: "002",
    slug: "test-your-trading-style",
    category: "TRADING PROCESS",
    title: "Find Your Trading Style. Don't Copy Someone Else's.",
    subtitle: "A practical way to test whether intraday, swing or another style actually fits how you make decisions.",
    publishedDate: "August 2026",
    readingTime: "5 min read",
    thesis: "Which type of trading helps me make good decisions again and again?",
    emailHook:
      "Most traders copy the style of whoever's making money. A simple audit of your own trading journal tells you if that style actually fits you.",

    openingParagraphs: [
      "Most traders choose a trading style by looking at the money.",
      "Options look attractive because a small amount can become a large amount.",
      "Intraday trading looks attractive because you can make money today.",
      "Swing trading looks slow compared with both.",
      "So when we see another trader making good money, we naturally want to copy the way they trade.",
      "That may be the wrong place to start.",
    ],

    styleVsInstrument: {
      styleItems: [
        { label: "Intraday", detail: "minutes to hours" },
        { label: "Swing", detail: "days to weeks" },
        { label: "Position", detail: "weeks to months" },
      ],
      instrumentItems: ["Cash / shares", "Futures", "Options"],
      bridgeParagraphs: [
        "You can swing trade with options.",
        "You can intraday trade futures.",
      ],
      wrongQuestion: "Should I trade options or shares?",
      rightQuestions: ["How much time does my setup need?", "Which instrument fits that setup?"],
    },

    personalExperience: {
      heading: "I learnt this the expensive way",
      intro: [
        "I started with options.",
        "Then futures.",
        "Then intraday trading.",
        "Every time the results disappointed me, I thought I needed something else:",
      ],
      chain: ["another setup", "better entries", "more knowledge", "more screen time"],
      bridge: "Eventually I noticed something more useful:",
      pullQuote: "My mistakes changed when the way I traded changed.",
      outro: [
        "When decisions had to be made quickly, I made more mistakes.",
        "When I had time to study the stock, wait for confirmation, decide my risk and then let the trade develop, my execution became cleaner.",
        "That is what pushed me towards swing trading.",
        "Not because swing trading is better.",
        "It simply gave me more time to make the kind of decisions I was good at making.",
      ],
    },

    statCards: [
      {
        stat: "91%",
        text: "of individual equity-derivatives traders in SEBI's FY25 study made a net loss.",
        sourceLabel: "SEBI, 2025",
        sourceHref: "https://www.sebi.gov.in/sebi_data/attachdocs/jul-2025/1751900271726.pdf",
      },
      {
        stat: "7 in 10",
        text: "individual intraday traders in the equity cash segment made losses in SEBI's study.",
        sourceLabel: "SEBI, 2024",
        sourceHref:
          "https://www.sebi.gov.in/media-and-notifications/press-releases/jul-2024/sebi-study-finds-that-7-out-of-10-individual-intraday-traders-in-equity-cash-segment-make-losses_84948.html",
      },
      {
        stat: "Less than 1%",
        text: "of the day traders studied in Taiwan were able to reliably earn positive abnormal returns after fees in the following year.",
        sourceLabel: "Barber, Lee, Liu & Odean",
        sourceHref:
          "https://faculty.haas.berkeley.edu/odean/papers/Day%20Traders/The%20Cross-Section%20of%20Speculator%20Skill.pdf",
      },
    ],
    statCardsNote: [
      "That last number matters.",
      "It means short-term trading can work. A small group clearly showed skill.",
      "But the bar is high.",
    ],

    actionSection: {
      heading: "Test your own style",
      subheading: "Don't answer this with a personality quiz. Open your trading journal.",
      intro: ["Start with your last 20–30 trades."],
      labelInstruction: "First label each trade:",
      labelFields: [
        { label: "Style", options: "Intraday / Swing / Position" },
        { label: "Instrument", options: "Cash / Futures / Options" },
      ],
      auditItems: [
        { number: "1", label: "Result", question: "Did you actually make money after all costs?" },
        { number: "2", label: "Rules", question: "Did you trade the setup you originally planned?" },
        {
          number: "3",
          label: "Mistakes",
          question: "What kept going wrong?",
          examples: ["Early exit", "Oversizing", "Revenge trade", "Missed stop", "Impulsive entry"],
        },
        { number: "4", label: "Pressure", question: "Did the trade give you enough time to think clearly?" },
        {
          number: "5",
          label: "Real life",
          question: "Does this style fit the amount of time you can actually give the market?",
        },
      ],
    },

    patternDiagnosis: {
      heading: "Now look for the repeat",
      examples: [
        {
          observation: "You understand intraday setups... but keep making bad decisions when price moves quickly?",
          conclusion: "Speed may be the problem.",
        },
        {
          observation: "Your swing entries work... but you panic during normal pullbacks?",
          conclusion: "Holding may be the problem.",
        },
        {
          observation: "You get the direction right in options... but the move keeps coming too late?",
          conclusion: "The instrument may be the problem.",
        },
      ],
      emphasis: "Is my edge failing — or am I failing to execute it in this environment?",
    },

    nextAction: {
      heading: "Then run one clean test",
      steps: [
        "Pick the style where your decisions were the most consistent.",
        "Reduce the number of things you're changing.",
        "Trade that style for another defined sample of trades.",
        "Journal it.",
        "Then compare again.",
      ],
      emphasis: "Don't keep jumping between styles before giving yourself enough evidence to learn anything.",
    },

    whatItDoesntTellYou: [
      "A style that feels comfortable is not automatically profitable.",
      "You still need a setup that actually works, proper risk management, and enough trades to separate skill from luck.",
      "Your best fit can also change. More experience, different capital, a new job or more available time can all change the answer.",
      "These studies also don't prove that swing trading is better than intraday or derivatives.",
      "They show something narrower: frequent and short-term trading is difficult, costs matter, and persistent skill exists only among a relatively small group.",
    ],

    finalTakeaway: {
      avoidQuestion: "Which trading style makes the most money?",
      askQuestion: "Where do I make my best decisions repeatedly?",
      closing: ["Find that environment.", "Then get very good at it."],
    },

    sources: [
      {
        title: "Comparative Study of Growth in Equity Derivatives Segment vis-à-vis Cash Market after Recent Measures",
        author: "SEBI (2025)",
        href: "https://www.sebi.gov.in/sebi_data/attachdocs/jul-2025/1751900271726.pdf",
      },
      {
        title: "Analysis of Intraday Trading by Individuals in Equity Cash Segment",
        author: "SEBI (2024)",
        href: "https://www.sebi.gov.in/media-and-notifications/press-releases/jul-2024/sebi-study-finds-that-7-out-of-10-individual-intraday-traders-in-equity-cash-segment-make-losses_84948.html",
      },
      {
        title: "The Cross-Section of Speculator Skill: Evidence from Day Trading — Journal of Financial Markets",
        author: "Barber, Lee, Liu & Odean (2014)",
        href: "https://faculty.haas.berkeley.edu/odean/papers/Day%20Traders/The%20Cross-Section%20of%20Speculator%20Skill.pdf",
      },
      {
        title: "Trading Is Hazardous to Your Wealth — Journal of Finance",
        author: "Barber & Odean (2000)",
        href: "https://faculty.haas.berkeley.edu/odean/papers%20current%20versions/individual_investor_performance_final.pdf",
      },
    ],

    seo: {
      title: "Find Your Trading Style. Don't Copy Someone Else's. | VSC Capital & Advisory",
      description:
        "Most traders copy the style of someone whose results they want. A practical way to test whether intraday, swing trading or another approach actually fits the way you make decisions.",
    },
  },
  {
    number: "003",
    slug: "lower-price-not-opportunity",
    category: "TREND BEHAVIOUR",
    title: "A Lower Price Is Not Always an Opportunity.",
    subtitle: "How to distinguish a normal pullback from a damaged trend before committing capital.",
    publishedDate: "November 2026",
    readingTime: "4 min read",
    thesis: "The first bounce after a breakdown is something to study, not something to chase.",
    emailHook:
      "When a hot market theme corrects 25%–40%, the first sharp bounce looks like a discount. Here is how to tell a damaged trend from genuine repair.",

    openingParagraphs: [
      "When you miss a major market theme, it is natural to wait for another way in. AI infrastructure, data centres, capital markets, wires and cables — there is always a theme that rallied significantly while you remained on the sidelines.",
      "Then comes the first meaningful correction. A stock that looked expensive a few weeks ago suddenly looks cheap, and it becomes tempting to focus on how much it has fallen rather than how it is behaving.",
      "But what if the market is not offering a discount — what if it is reassessing the business? I may not yet know what is driving the weakness, yet price behaviour gives an early reason to become cautious.",
    ],

    caseStudy: {
      heading: "A recent example — wires and cables",
      intro: [
        "The Indian wires and cables sector enjoyed strong investor interest, supported by infrastructure spending, electrification and data centre demand. When these stocks initially corrected, it was tempting to treat the decline as a normal pullback within a larger uptrend.",
      ],
      metrics: [
        { name: "Polycab", drawdown: "−27%", detail: "Below 52W high · 26 Nov 2026" },
        { name: "KEI Industries", drawdown: "−39%", detail: "Below 52W high · 26 Nov 2026" },
      ],
      outro: [
        "During the correction, concerns around emerging competition, product price reductions and inventory losses from falling copper prices became more visible.",
        "The long-term industry opportunity may still exist, but the conditions for a swing trade had changed.",
      ],
      pullQuote: "A promising business does not automatically make a good trading setup.",
    },

    referencePoints: {
      heading: "What I look for in the price",
      intro: "I use moving averages and post-bounce behaviour as reference points to judge the extent of technical damage:",
      cards: [
        {
          tag: "Short-term trend",
          title: "21-day EMA",
          body: "Does the stock respect its short-term average during a pullback, or break below it and repeatedly fail to reclaim it?",
        },
        {
          tag: "Larger trend",
          title: "200-day EMA",
          body: "A sustained breakdown below this average warrants greater caution. Rebuilding structure takes considerably more time.",
        },
        {
          tag: "Observation",
          title: "The first bounce",
          body: "Wait to see what follows a sharp rebound: does the next pullback hold a higher low with sustained buying pressure?",
        },
      ],
      chart: {
        image: "/images/research-note-003-chart.svg",
        alt: "Schematic price diagram comparing lower highs during a breakdown against a declining moving average and a higher-low trend repair",
        width: 720,
        height: 580,
        caption: "Schematic structure — damaged trend (lower highs) transitioning into repair only after reclaiming the moving average and holding a higher low.",
        takeaway: "The size of the first bounce matters less than whether the next pullback forms a higher low.",
      },
    },

    rallyVsUptrend: {
      heading: "Countertrend rally or genuine recovery?",
      leftTitle: "Countertrend rally",
      rightTitle: "Developing uptrend",
      rows: [
        { left: "Fails at declining moving averages", right: "Reclaims and holds key averages" },
        { left: "Buying volume fades", right: "Buying volume strengthens" },
        { left: "Narrow sector participation", right: "Broader participation improves" },
        { left: "Continues forming lower highs", right: "Begins forming higher highs" },
        { left: "Subsequent pullback breaks lows", right: "Subsequent pullback holds higher" },
      ],
      takeaway: "The size of the bounce matters less than what the price does afterwards.",
    },

    repairChecklist: {
      heading: "When I become interested again",
      intro: "After a significant correction, I wait for visible evidence of structural repair:",
      items: [
        "Selling pressure begins to ease.",
        "Price stabilises and builds a recognizable base.",
        "Key moving averages are reclaimed and respected.",
        "Relative strength improves against the broader market.",
        "A clear setup emerges with definable downside risk.",
      ],
      confirmationNote:
        "At the broader market level, improving breadth and a follow-through day can provide additional confirmation.",
      closing: "I do not need to buy at the lowest price. I need a setup that offers a reasonable opportunity relative to the risk involved.",
    },

    whatItDoesntTellYou: [
      "Moving averages are lagging indicators. A stock can briefly break below its 21-day EMA and recover, or reclaim its 200-day EMA and subsequently fail.",
      "Waiting for confirmation means accepting that I may miss the initial part of a recovery. For my style of swing trading, that is an acceptable trade-off.",
      "The objective is not to predict the bottom. It is to participate in a meaningful portion of a sustained move while keeping the downside manageable.",
    ],

    finalTakeaway: {
      avoidQuestion: "How much has this stock fallen?",
      askQuestion: "Has the stock given me a reason to participate again?",
      closing: ["A lower price gets my attention.", "An improving trend earns my capital."],
    },

    whereItFeeds: {
      frameworkLabel: "Framework 03 — Setup Grading",
      frameworkHref: "/frameworks/setup-grading",
      description:
        "A sharp discount alone never earns an A-grade setup — structure, trend alignment and a definable stop still have to confirm.",
    },

    seo: {
      title: "A Lower Price Is Not Always an Opportunity — Trading Insight 003 | VSC Capital & Advisory",
      description:
        "How to distinguish a normal pullback from a damaged trend before committing capital, using the 21-day EMA, 200-day EMA, and higher-low structure.",
    },
  },
];

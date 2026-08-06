import { Article } from "@/types/article";

/**
 * Three of these six used to carry type: "FRAMEWORK" and sat alongside a
 * completely separate frameworkLibrary array (data/frameworks.ts) — two
 * disconnected lists both claiming to represent frameworks, under two
 * different slug schemes, neither linked to the other. Reclassified as
 * Research Notes rather than deleted: the content itself reads as
 * explainer/educational, not VSC's own versioned methodology, so "Note"
 * is the more honest type regardless of the duplication fix.
 *
 * None of the six have a `body` yet — all would show "In progress" on
 * the index, which reads as an abandoned section. `published: false`
 * holds three offstage until they have real content; the three left
 * visible were picked for topic spread (Behaviour, Risk, Market
 * Structure) and least overlap with content that already exists
 * elsewhere (Trading vs Gambling covers the same ground as the FAQ's
 * gambling-comparison answer; Risk Management Rules overlaps Position
 * Sizing Explained).
 */
export const articles: Article[] = [
  {
    id: "why-most-traders-lose",
    title: "Why Most Traders Lose",
    description: "Analyzing the psychological and mechanical reasons why the majority of retail participants blow accounts. Process failures, not market conditions.",
    category: "Psychology",
    primaryTopic: "Behaviour",
    type: "RESEARCH NOTE",
    publishedDate: "20 July 2026",
    readingTime: "6 Min Read",
    featured: false,
    difficulty: "Beginner",
    tags: ["psychology", "risk", "discipline"],
    slug: "why-most-traders-lose"
  },
  {
    id: "position-sizing-explained",
    title: "Position Sizing Explained",
    description: "The mathematical foundation of capital preservation. How to size your positions to define risk before entry and protect wealth.",
    category: "Risk",
    primaryTopic: "Risk",
    type: "RESEARCH NOTE",
    publishedDate: "14 July 2026",
    readingTime: "8 Min Read",
    featured: false,
    difficulty: "Intermediate",
    tags: ["math", "risk", "position-sizing"],
    slug: "position-sizing-explained"
  },
  {
    id: "momentum-investing-basics",
    title: "Momentum Investing Basics",
    description: "Understanding momentum-based strategies, breakout mechanics, and why institutional capital flows create exploitable patterns.",
    category: "Investing",
    primaryTopic: "Momentum",
    type: "RESEARCH NOTE",
    publishedDate: "22 June 2026",
    readingTime: "5 Min Read",
    featured: false,
    difficulty: "Beginner",
    tags: ["momentum", "breakouts", "investing"],
    slug: "momentum-investing-basics",
    published: false
  },
  {
    id: "trading-vs-gambling",
    title: "Trading vs Gambling",
    description: "The fundamental differences between systematic trading and speculation. What separates a professional edge from outcome-driven betting.",
    category: "Investing",
    primaryTopic: "Process",
    type: "RESEARCH NOTE",
    publishedDate: "10 June 2026",
    readingTime: "7 Min Read",
    featured: false,
    difficulty: "Beginner",
    tags: ["philosophy", "edge", "process"],
    slug: "trading-vs-gambling",
    published: false
  },
  {
    id: "risk-management-rules",
    title: "Risk Management Rules",
    description: "Core principles for protecting capital. Stop-losses, position sizing, portfolio limits, and the rules that keep you in the game.",
    category: "Risk",
    primaryTopic: "Risk",
    type: "RESEARCH NOTE",
    publishedDate: "28 May 2026",
    readingTime: "6 Min Read",
    featured: false,
    difficulty: "Intermediate",
    tags: ["risk", "preservation", "rules"],
    slug: "risk-management-rules",
    published: false
  },
  {
    id: "market-structure-analysis",
    title: "Market Structure Analysis",
    description: "How to read market structure, identify trends, and understand supply-demand dynamics that drive price action.",
    category: "Investing",
    primaryTopic: "Market Structure",
    type: "RESEARCH NOTE",
    publishedDate: "12 May 2026",
    readingTime: "9 Min Read",
    featured: false,
    difficulty: "Advanced",
    tags: ["structure", "volume", "trends"],
    slug: "market-structure-analysis"
  }
];

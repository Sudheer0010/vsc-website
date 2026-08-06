import { Framework } from "@/types/framework";

/**
 * The VSC Decision Pipeline — five stages, in order. Each one's output is
 * the next one's input, which is why this is a sequence and not a topic
 * grid: "Risk Management" or "Trading Psychology" as standalone cards
 * implied six unrelated subjects, when the actual system is one process
 * read top to bottom.
 *
 * Version 1 entries carry no `year` — undated is honest; a guessed date
 * isn't. `body` stays empty until a real write-up exists; the framework
 * detail page already says so plainly rather than rendering nothing.
 */
export const frameworkLibrary: Framework[] = [
  {
    slug: "market-environment",
    title: "Market Environment",
    question: "What kind of market is this?",
    desc: "Determines whether the environment is aggressive, neutral, or defensive — and sets the maximum total exposure.",
    primaryTopic: "Market Structure",
    versions: [
      {
        version: 1,
        year: 2026,
        changeNote:
          "Initial version. Three-factor equal-weight model. Sub-dimension scoring for Trend and Leadership Quality. All thresholds provisional — to be calibrated against NSE data over the first 12–24 months.",
      },
    ],
    appliedInLetters: [],
  },
  {
    slug: "opportunity-universe",
    title: "Opportunity Universe",
    question: "What stocks deserve attention?",
    desc: "Filters the market down to a watchlist based on liquidity, price, sector, and relative strength.",
    primaryTopic: "Momentum",
    versions: [{ version: 1, changeNote: "Original." }],
    appliedInLetters: [],
  },
  {
    slug: "setup-grading",
    title: "Setup Grading",
    question: "Which stocks deserve capital?",
    desc: "Grades each setup as A+, A, or B based on trend quality, base quality, volume, and risk-reward. The grade sets the capital cap.",
    primaryTopic: "Momentum",
    versions: [{ version: 1, changeNote: "Original." }],
    appliedInLetters: [],
  },
  {
    slug: "sizing",
    title: "Sizing",
    question: "How much?",
    desc: "Calculates position size from stop-loss distance and capital risk, then caps it by the setup grade. The smaller number wins.",
    primaryTopic: "Risk",
    versions: [{ version: 1, changeNote: "Original." }],
    appliedInLetters: [],
  },
  {
    slug: "trade-management",
    title: "Trade Management",
    question: "Entry, exit, hold, add, partials — what now?",
    desc: "Covers entry triggers, stop placement and movement, pyramiding, partial profits, and exit rules. Everything after the sizing decision.",
    primaryTopic: "Process",
    versions: [{ version: 1, changeNote: "Original." }],
    appliedInLetters: [],
  },
];

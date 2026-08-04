import { Framework } from "@/types/framework";

/**
 * Version 1 entries carry no `year` — these summaries have been live on
 * the site for a while, but nobody confirmed the exact date the
 * underlying framework was first codified, so it stays undated rather
 * than guessed. `body` and `appliedInLetters` are empty until real
 * content and real citations exist; the page says so honestly rather
 * than rendering nothing.
 */
export const frameworkLibrary: Framework[] = [
  {
    slug: "stage-analysis",
    title: "Stage Analysis",
    desc: "Identifying institutional capital footprints and Stage 2 breakout trends.",
    category: "Macro & Regimes",
    primaryTopic: "Market Structure",
    versions: [{ version: 1, changeNote: "Original." }],
    appliedInLetters: [],
  },
  {
    slug: "risk-management",
    title: "Risk Management",
    desc: "Capital preservation rules and mathematical expectation modeling.",
    category: "Risk Rules",
    primaryTopic: "Risk",
    versions: [{ version: 1, changeNote: "Original." }],
    appliedInLetters: [],
  },
  {
    slug: "position-sizing",
    title: "Position Sizing",
    desc: "Defining exact stop-loss margins and allocation sizes.",
    category: "Execution",
    primaryTopic: "Risk",
    versions: [{ version: 1, changeNote: "Original." }],
    appliedInLetters: [],
  },
  {
    slug: "trading-psychology",
    title: "Trading Psychology",
    desc: "Managing emotional variance and sticking to quantitative rules.",
    category: "Psychology",
    primaryTopic: "Behaviour",
    versions: [{ version: 1, changeNote: "Original." }],
    appliedInLetters: [],
  },
  {
    slug: "execution-framework",
    title: "Execution Framework",
    desc: "Systematic buy and sell checklists for repeatable trades.",
    category: "Execution",
    primaryTopic: "Process",
    versions: [{ version: 1, changeNote: "Original." }],
    appliedInLetters: [],
  },
  {
    slug: "business-analysis",
    title: "Business Analysis",
    desc: "Understanding competitive edges, moats, and financial metrics.",
    category: "Macro & Regimes",
    primaryTopic: "Macro",
    versions: [{ version: 1, changeNote: "Original." }],
    appliedInLetters: [],
  },
];

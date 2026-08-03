export interface OfferingItem {
  slug: string;
  title: string;
  /** Compact name for tight layouts (nav-adjacent rows, chips) — `title` is
   * the fuller descriptive form ("Investor Education (Learning Hub)"). */
  shortTitle: string;
  tagline: string;
  description: string;
  whatItIs: string;
  whoItIsFor: string;
  designedForList: string[];
  deliveryFormat: string;
  expectedOutcome: string;
  availability: string;
  pricing: string;
  accent: "blue" | "gold" | "emerald";
  accentColor: string;
  glowColor: string;
  path: string;
  /**
   * The decision-structure fields, used by ThreePillarsOverview on
   * /offerings. Kept on this record rather than duplicated locally so the
   * "which offering is this" facts (title, path, accent) and the "why pick
   * this one" facts (quote, bestIf) can't drift apart from each other.
   */
  quote: string;
  format: string;
  bestIf: string;
  proofLabel: string;
  proofHref: string;
}

export const offeringsConfig: OfferingItem[] = [
  {
    slug: "learning-hub",
    title: "Investor Education (Learning Hub)",
    shortTitle: "Learning Hub",
    tagline: "Professional Market & Momentum Education",
    description: "Build a systematic understanding of markets before risking real capital.",
    whatItIs: "A structured curriculum teaching momentum analysis, regime identification, position sizing models, and risk management.",
    whoItIsFor: "Retail market participants, working professionals, and self-directed investors seeking systematic discipline.",
    designedForList: [
      "Retail Investors",
      "Working Professionals",
      "Beginner Traders",
      "Self-Directed Learners"
    ],
    deliveryFormat: "Self-paced digital modules, interactive case studies, and live research desk briefings.",
    expectedOutcome: "A repeatable decision-making checklist, risk management rules, and drawdown control.",
    availability: "Available Now",
    pricing: "Pricing: To be announced",
    accent: "blue",
    accentColor: "#6F86B7",
    glowColor: "rgba(111, 134, 183, 0.06)",
    path: "/offerings/learning-hub",
    quote: "I'm still learning the mechanics.",
    format: "Self-paced + live desk briefings",
    bestIf: "you're new to markets, or trading without a written process yet.",
    proofLabel: "See the full curriculum",
    proofHref: "/offerings/learning-hub"
  },
  {
    slug: "advantage",
    title: "Portfolio Guidance (VSC Advantage)",
    shortTitle: "VSC Advantage",
    tagline: "Professional Portfolio & Risk Guidance",
    description: "Align your capital structure with concrete growth and mathematical risk gates.",
    whatItIs: "Strategic capital structure guidance aligning portfolio allocation with quantitative risk gates and drawdown limits.",
    whoItIsFor: "High-net-worth investors and portfolio managers requiring disciplined capital preservation and systematic rebalancing.",
    designedForList: [
      "High-Net-Worth Investors",
      "Professionals",
      "Family Offices",
      "Business Owners"
    ],
    deliveryFormat: "Direct research desk consultations, periodic portfolio audits, and regime shift reports.",
    expectedOutcome: "Optimized capital protection, systematic risk control, and structured drawdown management.",
    availability: "Limited Capacity / By Application",
    pricing: "Pricing: To be announced",
    accent: "gold",
    accentColor: "#0F7A40",
    glowColor: "rgba(15, 122, 64, 0.06)",
    path: "/offerings/advantage",
    quote: "I trade already, but my results are inconsistent.",
    format: "Ongoing desk consultations + audits",
    bestIf: "you hold positions but have no defined rule for sizing or exits.",
    proofLabel: "See what a review covers",
    proofHref: "/offerings/advantage"
  },
  {
    slug: "inner-circle",
    title: "Research Circle (Inner Circle)",
    shortTitle: "Inner Circle",
    tagline: "Institutional Research Membership",
    description: "Gain direct access to quantitative audits, macro theme reviews, and codebase parameters.",
    whatItIs: "Direct institutional membership providing quantitative theme audits, macro regime analysis, and proprietary research notes.",
    whoItIsFor: "Advanced traders, family offices, and institutional participants requiring deep quantitative market insights.",
    designedForList: [
      "Institutional Investors",
      "Family Offices",
      "Advanced Traders",
      "Portfolio Managers"
    ],
    deliveryFormat: "Weekly research desk letters, quarterly regime breakdowns, and research archive access.",
    expectedOutcome: "Institutional macro clarity, early regime shift detection, and systematic market insight.",
    availability: "Available Soon",
    pricing: "Pricing: To be announced",
    accent: "emerald",
    accentColor: "#5D8B73",
    glowColor: "rgba(93, 139, 115, 0.06)",
    path: "/offerings/inner-circle",
    quote: "I just want to read good research.",
    format: "Monthly letter + full archive",
    bestIf: "you already run your own book and want a second, independent view.",
    proofLabel: "Read last month's letter, free",
    proofHref: "/blog"
  }
];

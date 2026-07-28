export interface OfferingItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  whatItIs: string;
  whoItIsFor: string;
  deliveryFormat: string;
  expectedOutcome: string;
  availability: string;
  pricing: string;
  accent: "blue" | "gold" | "emerald";
  accentColor: string;
  glowColor: string;
  path: string;
}

export const offeringsConfig: OfferingItem[] = [
  {
    slug: "learning-hub",
    title: "Investor Education (Learning Hub)",
    tagline: "Professional Market & Momentum Education",
    description: "Build a systematic understanding of markets before risking real capital.",
    whatItIs: "A structured curriculum teaching momentum analysis, regime identification, position sizing models, and risk management.",
    whoItIsFor: "Retail market participants, working professionals, and self-directed investors seeking systematic discipline.",
    deliveryFormat: "Self-paced digital modules, interactive case studies, and live research desk briefings.",
    expectedOutcome: "A repeatable decision-making checklist, risk management rules, and drawdown control.",
    availability: "Available Now",
    pricing: "Pricing: To be announced",
    accent: "blue",
    accentColor: "#6F86B7",
    glowColor: "rgba(111, 134, 183, 0.06)",
    path: "/offerings/learning-hub"
  },
  {
    slug: "advantage",
    title: "Portfolio Guidance (VSC Advantage)",
    tagline: "Professional Portfolio & Risk Guidance",
    description: "Align your capital structure with concrete growth and mathematical risk gates.",
    whatItIs: "Strategic capital structure guidance aligning portfolio allocation with quantitative risk gates and drawdown limits.",
    whoItIsFor: "High-net-worth investors and portfolio managers requiring disciplined capital preservation and systematic rebalancing.",
    deliveryFormat: "Direct research desk consultations, periodic portfolio audits, and regime shift reports.",
    expectedOutcome: "Optimized capital protection, systematic risk control, and structured drawdown management.",
    availability: "Limited Capacity / By Application",
    pricing: "Pricing: To be announced",
    accent: "gold",
    accentColor: "#C9A84C",
    glowColor: "rgba(201, 168, 76, 0.06)",
    path: "/offerings/advantage"
  },
  {
    slug: "inner-circle",
    title: "Research Circle (Inner Circle)",
    tagline: "Institutional Research Membership",
    description: "Gain direct access to quantitative audits, macro theme reviews, and codebase parameters.",
    whatItIs: "Direct institutional membership providing quantitative theme audits, macro regime analysis, and proprietary research notes.",
    whoItIsFor: "Advanced traders, family offices, and institutional participants requiring deep quantitative market insights.",
    deliveryFormat: "Weekly research desk letters, quarterly regime breakdowns, and research archive access.",
    expectedOutcome: "Institutional macro clarity, early regime shift detection, and systematic market insight.",
    availability: "Available Soon",
    pricing: "Pricing: To be announced",
    accent: "emerald",
    accentColor: "#5D8B73",
    glowColor: "rgba(93, 139, 115, 0.06)",
    path: "/offerings/inner-circle"
  }
];

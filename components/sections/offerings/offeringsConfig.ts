export interface OfferingItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  accent: "blue" | "gold" | "emerald";
  accentColor: string;
  glowColor: string;
  path: string;
}

export const offeringsConfig: OfferingItem[] = [
  {
    slug: "learning-hub",
    title: "Learning Hub",
    tagline: "Professional Trading Education",
    description: "Build a systematic understanding of markets before risking real capital.",
    accent: "blue",
    accentColor: "#6F86B7",
    glowColor: "rgba(111, 134, 183, 0.06)",
    path: "/offerings/learning-hub"
  },
  {
    slug: "advantage",
    title: "VSC Advantage",
    tagline: "Professional Portfolio Advisory",
    description: "Align your capital structure with concrete growth and mathematical risk gates.",
    accent: "gold",
    accentColor: "#C9A84C",
    glowColor: "rgba(201, 168, 76, 0.06)",
    path: "/offerings/advantage"
  },
  {
    slug: "inner-circle",
    title: "Inner Circle",
    tagline: "Institutional Research Membership",
    description: "Gain direct access to quantitative audits, macro theme reviews, and codebase parameters.",
    accent: "emerald",
    accentColor: "#5D8B73",
    glowColor: "rgba(93, 139, 115, 0.06)",
    path: "/offerings/inner-circle"
  }
];

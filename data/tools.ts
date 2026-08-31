/**
 * The tool catalogue, in one place.
 *
 * Three surfaces state facts about this list and all three had drifted apart:
 * /tools rendered five core cards plus one advanced card, /research labelled
 * the same shelf "5 tools", and app/sitemap.ts hand-listed five of the six
 * routes (the path simulator, added later, was never added there). Deriving
 * the count and the routes from this array means a seventh tool cannot ship
 * with a stale label or a missing sitemap entry again.
 */

export type Tool = {
  category: string;
  title: string;
  description: string;
  href: string;
  /** Core cards span two grid columns when they close an odd row. */
  span?: boolean;
};

export const coreTools: Tool[] = [
  {
    category: "Pre-trade",
    title: "Position Size Calculator",
    description: "Size a position from account risk, entry and stop-loss.",
    href: "/tools/position-size-calculator",
    span: false,
  },
  {
    category: "Pre-trade",
    title: "Risk–Reward Ratio Calculator",
    description: "Compare planned reward against the risk taken.",
    href: "/tools/risk-reward-calculator",
    span: false,
  },
  {
    category: "Portfolio risk",
    title: "Portfolio Risk Calculator",
    description: "See total stop-loss risk across your open positions.",
    href: "/tools/portfolio-risk-calculator",
    span: false,
  },
  {
    category: "Account risk",
    title: "Drawdown & Recovery Calculator",
    description: "Measure a loss and the return required to recover it.",
    href: "/tools/drawdown-recovery-calculator",
    span: false,
  },
  {
    category: "System review",
    title: "Trading Expectancy Calculator",
    description: "Estimate whether your trading process has positive mathematical expectancy.",
    href: "/tools/trading-expectancy-calculator",
    span: true,
  },
];

export const advancedTools: Tool[] = [
  {
    category: "Advanced · System analysis",
    title: "Trading Expectancy Path Simulator",
    description:
      "See how the same theoretical trading edge can produce very different equity paths, drawdowns and losing streaks.",
    href: "/tools/trading-expectancy-path-simulator",
  },
];

export const allTools: Tool[] = [...coreTools, ...advancedTools];

/** What /research's shelf label states. */
export const toolCount = allTools.length;

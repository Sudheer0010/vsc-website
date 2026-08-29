/**
 * Real VSC copy, shared across all three lab directions so the comparison
 * is about visual language only — not different words doing the work.
 */

export const HERO_COPY = {
  eyebrow: "Process over prediction",
  headline: "A smarter way to build and protect capital.",
  body: "A rules-based framework for market structure, trend strength and risk. It decides how much capital is deployed — and when none of it should be.",
  cta: "Read the research",
};

export const BELIEF_COPY = {
  heading: "What VSC is built on.",
  sub: "Three principles that should survive every stage of the business.",
  items: [
    {
      number: "01",
      title: "Client-First Philosophy",
      shortLine: "Useful before impressive.",
      body: "Everything VSC builds should help someone make a clearer decision.",
    },
    {
      number: "02",
      title: "Research-Led Discipline",
      shortLine: "Research before action. Process before prediction.",
      body: "Evidence guides the view. Discipline guides the decision.",
    },
    {
      number: "03",
      title: "Partnership Built on Trust",
      shortLine: "Show the work. State the limits.",
      body: "Trust compounds through transparency, consistency and honest communication.",
    },
  ],
};

export const GATES_COPY = {
  eyebrow: "The process",
  heading: "Five gates. Capital passes all of them or none.",
  stages: [
    { id: "scan", name: "Scan", gate: "Liquidity and relative strength above floor", detail: "The universe is filtered before anything is judged. Instruments too thin to exit cleanly never reach the next stage, regardless of how good the story is." },
    { id: "validate", name: "Validate", gate: "Trend, momentum and breadth agree", detail: "A setup that would be taken in a constructive regime is declined in a deteriorating one. The same chart is not the same trade in different weather." },
    { id: "execute", name: "Execute", gate: "Maximum 2% of capital at risk per trade", detail: "The exit is defined before the entry. Position size is whatever makes that predefined loss equal 2% — so the strength of an opinion cannot quietly increase the amount at stake." },
    { id: "monitor", name: "Monitor", gate: "Exposure tracks the prevailing regime", detail: "When risk stops being compensated, exposure comes down and stays down. Holding cash is an active decision here, not a failure to find ideas." },
    { id: "review", name: "Review", gate: "Every closed position is logged and read", detail: "A profitable trade taken outside the rules is recorded as a process failure. A loss taken correctly is not. Otherwise luck rewrites the method." },
  ],
};

export const RISK_COPY = {
  lead: "When markets get riskier, put",
  emphasis: "less money at risk",
  principles: [
    { number: "01", title: "Trade less when the market gets weaker.", body: "When good opportunities are hard to find, there is no need to keep all the money in the market." },
    { number: "02", title: "Cash is also a choice.", body: "Sometimes waiting is better than forcing a trade." },
    { number: "03", title: "Protect capital first.", body: "A strong idea is never a reason to ignore risk." },
  ],
};

export const HOW_WE_HELP_COPY = {
  heading: "How VSC can help.",
  sub: "Learn. Grow. Connect.",
  verticals: [
    { number: "01", label: "VSC EDUCATION", verb: "LEARN.", tagline: "Build market knowledge and develop a skill you can keep improving.", body: "Understand markets, trading and risk before putting serious money behind decisions." },
    { number: "02", label: "VSC CAPITAL", verb: "GROW.", tagline: "Put capital to work with research and a clear process.", body: "Research, frameworks and disciplined decision-making for people who want to grow capital systematically." },
    { number: "03", label: "VSC COMMUNITY", verb: "CONNECT.", tagline: "Get better around people who take markets seriously.", body: "Discuss markets, challenge ideas and keep improving with other serious participants." },
  ],
  cta: "Explore all offerings",
};

export const DRAWDOWN_COPY = {
  heading: "Everyone looks good on the way up. The difference shows on the way down.",
  closing: "Seeing risk early matters only if you act on it.",
  alwaysInvested: {
    label: "Stay fully invested",
    body: "The full fall is taken, so there is more ground to recover.",
  },
  riskManaged: {
    label: "Reduce risk when the market weakens",
    body: "Move more to cash when conditions worsen. Add back when they improve.",
  },
  annotations: {
    weaken: "Market weakens — reduce risk",
    holdCash: "Hold more cash here",
    improve: "Market improves — add back",
  },
  caption: "Illustration only — not a live portfolio or forecast.",
  /** Same SVG paths as production DrawdownStory — factual meaning preserved exactly. */
  alwaysInvestedPath:
    "M 8 206 C 60 198, 110 172, 158 150 C 182 139, 196 130, 208 124 " +
    "C 232 118, 250 130, 272 152 C 300 180, 322 214, 352 232 " +
    "C 380 246, 404 240, 430 222 C 470 194, 510 150, 560 112 C 578 99, 588 92, 594 88",
  riskManagedPath:
    "M 8 206 C 60 198, 110 172, 158 150 C 182 139, 196 130, 208 124 " +
    "C 224 120, 236 128, 248 138 C 258 146, 266 150, 280 151 " +
    "C 310 153, 340 152, 372 150 C 396 149, 412 146, 428 138 " +
    "C 462 120, 500 88, 540 62 C 562 48, 580 38, 594 32",
};

export const RESEARCH_COPY = {
  heading: "We don't publish news. We publish thinking.",
  body: "Research is where the work lives — how we read markets, what we learn from them, and how those ideas become a process.",
  cta: "Explore Research",
};

export const CTA_COPY = {
  eyebrow: "Not sure where to begin?",
  heading: "Start here.",
  body: "A short path through what VSC believes, how the process works, and the work behind it.",
  primary: "Start here",
  secondary: "Already know what you're looking for? Enquire",
};

export const COMPLIANCE_COPY = {
  body: "VSC Capital & Advisory is in the process of applying for SEBI Research Analyst (RA) registration. Until registration is granted, all content, execution setups, and communications are strictly for educational and research purposes. Nothing here constitutes personalised investment advice or a solicitation to buy or sell any security.",
  registration: "MSME registered · UDYAM-AP-17-0067701 · NIC 66190",
};

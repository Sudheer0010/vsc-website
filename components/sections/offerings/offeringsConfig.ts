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
   * The decision-structure fields, used by StartWhereYouAre (formerly
   * ThreePillarsOverview) on /offerings. Kept on this record rather than
   * duplicated locally so the "which offering is this" facts (title,
   * path, accent) and the "why pick this one" facts (quote, bestIf)
   * can't drift apart from each other.
   */
  quote: string;
  format: string;
  bestIf: string;
  proofLabel: string;
  proofHref: string;
  /**
   * The hierarchy axis (v2.1 §1.2): access, not price. "tier" drives the
   * row's visual treatment (paper / cream / matte-black); stateLabel and
   * availabilityShort are the two facts the row states about that access.
   * availabilityShort deliberately does NOT claim a review cadence for
   * Inner Circle ("quarterly") or a frequency for Advantage ("monthly") —
   * neither is anywhere in this file's other fields, and inventing one
   * here would be exactly the kind of unverified specific claim this site
   * has spent this whole project removing.
   */
  tier: "open" | "apply" | "invite";
  stateLabel: string;
  availabilityShort: string;
  /**
   * The homepage journey vocabulary — Learn / Grow / Connect. Numbered so
   * the offerings panel header can state the stage ("01 · Learn")
   * while the row beside it still states availability; stateLabel keeps
   * carrying the access fact ("01 · Open") for the tab strip.
   */
  stageLabel: string;
}

export const offeringsConfig: OfferingItem[] = [
  {
    slug: "learning-hub",
    title: "Investor Education (Learning Hub)",
    shortTitle: "VSC Learn",
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
    format: "Six modules, self-paced, with live desk briefings.",
    bestIf: "you're new to markets, or trading without a written process yet.",
    proofLabel: "See the full curriculum",
    proofHref: "/offerings/learning-hub",
    tier: "open",
    stateLabel: "01 · Open",
    availabilityShort: "Available now",
    stageLabel: "01 · Learn"
  },
  {
    slug: "advantage",
    title: "Process Review (VSC Advantage)",
    shortTitle: "VSC Advantage",
    tagline: "Process and Risk Review",
    description: "Review how you choose trades, size risk and learn from your own past decisions.",
    whatItIs: "A structured review of your trading process — entry rules, position sizing and exits — measured against defined risk gates.",
    whoItIsFor: "Active traders and self-directed investors who hold positions but have no written rule for sizing or exits.",
    designedForList: [
      "Active Traders",
      "Self-Directed Investors",
      "Working Professionals",
      "Business Owners"
    ],
    deliveryFormat: "Direct research desk sessions and periodic reviews of your own trading record.",
    expectedOutcome: "A written sizing and exit rule, and a clear view of where your decisions repeat the same mistakes.",
    availability: "Limited Capacity / By Application",
    pricing: "Pricing: To be announced",
    accent: "gold",
    accentColor: "#0F7A40",
    glowColor: "rgba(15, 122, 64, 0.06)",
    path: "/offerings/advantage",
    quote: "I trade already, but my results are inconsistent.",
    format: "Periodic review of your process against defined risk gates.",
    bestIf: "you hold positions but have no defined rule for sizing or exits.",
    proofLabel: "See what a review covers",
    proofHref: "/offerings/advantage",
    tier: "apply",
    stateLabel: "02 · By application",
    availabilityShort: "Limited capacity",
    stageLabel: "02 · Grow"
  },
  {
    slug: "inner-circle",
    title: "VSC Community",
    shortTitle: "VSC Community",
    tagline: "Market discussion community",
    description: "Discuss markets, share what you are learning and challenge ideas — without tips or noise.",
    whatItIs: "A room for market discussion, shared learning and second opinions — not a signal group and not a letter.",
    whoItIsFor: "Market participants who understand the basics and want to keep improving alongside people who take markets seriously.",
    designedForList: [
      "Self-Directed Traders",
      "Working Professionals",
      "Long-Term Investors",
      "Serious Learners"
    ],
    deliveryFormat: "Ongoing market discussion, shared observations and open questions between members.",
    expectedOutcome: "A second opinion before capital moves, and exposure to how other participants reason.",
    availability: "In Development",
    pricing: "Pricing: To be announced",
    accent: "emerald",
    accentColor: "#5D8B73",
    glowColor: "rgba(93, 139, 115, 0.06)",
    path: "/offerings/inner-circle",
    /**
     * Rewritten per v2.1 §3. The Research page already publishes every
     * letter for free — describing Inner Circle as "the letter" put it in
     * direct competition with something else on this site that's free.
     * Its actual value is what the letter isn't: the room, the argument,
     * the second opinion before capital moves. Never say "free" here.
     */
    quote: "I want to get better around people who take markets seriously.",
    format: "Market discussions, shared learning and different points of view — without tips or noise.",
    bestIf: "you understand the basics and want to keep learning, discussing ideas and improving alongside other market participants.",
    proofLabel: "Explore the community",
    proofHref: "/offerings/inner-circle",
    tier: "invite",
    stateLabel: "03 · In development",
    availabilityShort: "In development",
    stageLabel: "03 · Connect"
  }
];

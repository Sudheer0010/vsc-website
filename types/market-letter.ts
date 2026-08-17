/** Framework 01's three regimes — the only values the environment metric takes. */
export type LetterEnvironment = "Aggressive" | "Neutral" | "Defensive";

// ---------------------------------------------------------------------------
// Template Spec v4 — locked vocabularies (see MARKETLETTERTEMPLATESPECv4.md
// and MARKETLETTERDATADICTIONARYv1.0.md). Enforced at compile time so a
// letter can't carry a rating value the dictionary doesn't define.
// ---------------------------------------------------------------------------

/**
 * Semantic state for a Market Health factor / Overall Environment row.
 * "amber" is a data-layer value only — see Presentation Layer note in
 * MarketHealthPanel: the site has no amber/orange brand token, so amber
 * renders with the same neutral/watchful grey treatment used elsewhere on
 * the site for a middle state, not a new colour.
 */
export type StatusColour = "green" | "amber" | "red";

/** vs-previous-month indicator for a Market Health row. */
export type ArrowDirection = "up" | "down" | "flat" | "rerated";

export type MarketEnvironmentValue =
  | "Favourable"
  | "Constructive"
  | "Neutral"
  | "Cautious"
  | "Defensive";

export type OpportunityUniverseValue = "Broad" | "Normal" | "Narrow" | "Very Narrow";

export type SetupQualityValue = "Strong" | "Normal" | "Weak" | "Poor";

export type RiskAllocationValue = "Increased" | "Normal" | "Reduced" | "Minimal";

export type TradeFrequencyValue = "High" | "Normal" | "Reduced" | "Low" | "None";

export type PrimaryObjectiveValue = "Growth" | "Balanced" | "Preservation";

/** The five Market Health factors, fixed order, never renamed. */
export type HealthFactor = "Trend" | "Breadth" | "Leadership" | "Breakout Quality" | "Volatility";

/** The five Market Snapshot assets, fixed order, never substituted. */
export type SnapshotAsset = "NIFTY 50" | "GOLD" | "SILVER" | "CRUDE" | "USD/INR";

/** One row of Section 02 — Market Snapshot. Exactly 5, in SnapshotAsset order. */
export interface MarketSnapshotRow {
  asset: SnapshotAsset;
  /** Formatted string including unit, e.g. "₹1,42,860 / 10g". */
  monthEnd: string;
  /** Percent, signed. */
  mtdPct: number;
  /** Percent, signed. */
  ytdPct: number;
  /** Snapshot Read verdict, ≤ 3 words. */
  read: string;
}

/** One row of Section 03 — Market Health. Exactly 5, in HealthFactor order. */
export interface MarketHealthRow {
  factor: HealthFactor;
  /** Current-state label, ≤ 2 words, e.g. "Narrow". */
  current: string;
  status: StatusColour;
  vsPrev: ArrowDirection;
  /** ≤ 6 words. */
  vscRead: string;
}

export interface OverallEnvironment {
  /** Canonical market-regime source — every other regime display derives
   *  from this field. Never duplicated elsewhere. */
  label: MarketEnvironmentValue;
  vsPrev: ArrowDirection;
  /** ≤ 6 words. */
  vscRead: string;
}

/** Present only when Sudheer manually overrides the heuristic Overall rating. */
export interface EnvironmentOverride {
  from: MarketEnvironmentValue;
  to: MarketEnvironmentValue;
  /** ≤ 25 words, single sentence. */
  reason: string;
}

/** Section 05 — What Happened. Four fixed blocks, in this order. */
export interface WhatHappenedBlock {
  /** ≤ 12 words. */
  headline: string;
  /** ≤ 25 words. */
  explanation: string;
}

export interface WhatHappened {
  index: WhatHappenedBlock;
  breadth: WhatHappenedBlock;
  leadership: WhatHappenedBlock;
  flowsRisk: WhatHappenedBlock;
}

/** Section 06 — One Chart That Matters. Optional; omit cleanly when absent. */
export interface LetterChart {
  /** ≤ 8 words. */
  title: string;
  /** Absolute path under /public — no remote URLs, no inline SVG. */
  image: string;
  /** ≤ 30 words. */
  caption: string;
}

/** Section 07 — VSC Read. Market Environment row is NOT stored here — it
 *  renders overallEnvironment.label verbatim. */
export interface VscRead {
  opportunityUniverse: OpportunityUniverseValue;
  setupQuality: SetupQualityValue;
  /** Canonical source for Section 04 Block B (VSC posture). */
  riskAllocation: RiskAllocationValue;
  /** Canonical source — mirrored (not duplicated) in Playbook. */
  tradeFrequency: TradeFrequencyValue;
  primaryObjective: PrimaryObjectiveValue;
  /** ≤ 30 words, one sentence. */
  conclusion: string;
}

/** Section 08 — VSC Playbook. tradeFrequency is NOT stored here — it mirrors
 *  vscRead.tradeFrequency at render time. */
export interface Playbook {
  /** Canonical exposure source — header tag 3 and Section 09 both derive
   *  from this. */
  exposure: string;
  positionSize: string;
  /** ≤ 8 words. */
  preferredSetup: string;
  /** ≤ 8 words. */
  avoided: string;
  /** ≤ 12 words. */
  triggerToIncreaseRisk: string;
}

/** Section 09 — VSC Month in Review. Exposure is NOT stored here — it
 *  mirrors playbook.exposure at render time. */
export interface MonthInReview {
  /** e.g. "+7.68%". */
  monthlyReturn: string;
  trades: number;
  /** ≤ 20 words. */
  worked: string;
  /** ≤ 20 words. */
  didnt: string;
  /** ≤ 25 words. */
  lesson: string;
}

/** Section 10 — Watching Next. */
export interface WatchingNext {
  /** 3–4 entries. if ≤ 8 words, then ≤ 6 words. */
  conditions: { if: string; then: string }[];
  /** ≤ 15 words. */
  currentStance: string;
}

/**
 * One row of the Framework Review exhibit. Rows are ordered 01–05 but the
 * array itself may hold fewer than five — the standard format's own rule
 * is "publish the rows you can sustain, not the rows that look complete."
 * `detail` carries the supporting evidence/figures; `direction` only
 * appears on rows with a real month-over-month comparison to show.
 */
export interface FrameworkReviewRow {
  framework: string;
  interpretation: string;
  detail: string;
  direction?: "up" | "down";
}

export interface MarketLetter {
  /** Sequential, permanent, never reused — Letter 001 is Jan 2026. */
  letterNumber: number;
  /** ISO date (YYYY-MM-DD) the letter actually went out, not the 1st of
   *  the month as a stand-in. Drives the citable byline and structured
   *  data's datePublished. */
  publishedDate: string;
  /** ISO date — for backfilled letters, the last day of data the letter
   *  actually reflects. Meta line reads "Data through {dataThrough}"
   *  instead of "Published {publishedDate}" when set. */
  dataThrough?: string;
  /** ISO date — present only if a backfilled letter was later revised.
   *  Never overwrites publishedDate; both render in the meta line. */
  revisedDate?: string;
  month: string;
  year: number;
  /** SEO/RSS summary — a different job from `thesis` (the on-page idea of
   *  the month), so it stays a separate field rather than being replaced. */
  description?: string;
  /** The one sentence a reader could repeat a week later. Required for
   *  every letter — if it can't be written, the letter isn't ready. */
  thesis: string;
  /** A longer excerpt for editorial contexts (e.g. the Research page's
   *  Featured Publication card) where the thesis alone reads too clipped.
   *  Optional — falls back to `thesis` when a letter doesn't specify one. */
  pullQuote?: string;
  /** A short, human-written line for the "new letter" email alert — a
   *  different job from `thesis` (the on-page idea of the month) and from
   *  `pullQuote` (an on-page editorial excerpt). Purely for the inbox;
   *  never rendered on the website. Optional — falls back to `thesis`. */
  emailHook?: string;
  metrics: {
    monthlyReturn: string;
    tradesTaken: number;
    environment: LetterEnvironment;
  };
  /** 1–5 rows. See `FrameworkReviewRow` — not every framework's tracking
   *  exists for every month, and a short accurate exhibit beats a full
   *  one that quietly goes stale. */
  frameworkReview: FrameworkReviewRow[];

  // -------------------------------------------------------------------
  // Template Spec v4 fields. All optional — a letter carries these once
  // it migrates to the new 7-zone renderer; legacy letters leave every
  // one of these undefined and keep rendering through the old path.
  // Canonical-source fields (overallEnvironment.label, playbook.exposure,
  // vscRead.riskAllocation, vscRead.tradeFrequency) are never duplicated
  // elsewhere — see MARKETLETTERTEMPLATESPECv4.md.
  // -------------------------------------------------------------------

  /** Section 01 — ≤ 22 words, one sentence. */
  subThesis?: string;
  /** Section 01 — regime tag 2, the author's editorial highlight, ≤ 2
   *  words. Tag 1 derives from overallEnvironment.label, tag 3 from
   *  playbook.exposure — neither is stored. */
  regimeTagEditorial?: string;

  /** Section 02 — exactly 5 rows, SnapshotAsset order. */
  marketSnapshot?: MarketSnapshotRow[];

  /** Section 03 — exactly 5 rows, HealthFactor order. */
  marketHealth?: MarketHealthRow[];
  overallEnvironment?: OverallEnvironment;
  environmentOverride?: EnvironmentOverride;

  /** Section 04 — editorial-only stored content, ≤ 30 words. The two
   *  comparison blocks themselves are derived at render time from this
   *  letter's and the previous letter's `marketHealth`/`vscRead`, never
   *  stored. */
  netChange?: string;

  /** Section 05. */
  whatHappened?: WhatHappened;

  /** Section 06 — optional. Omit cleanly (no placeholder) when unset. */
  chart?: LetterChart;

  /** Section 07. */
  vscRead?: VscRead;

  /** Section 08. */
  playbook?: Playbook;

  /** Section 09. */
  monthInReview?: MonthInReview;

  /** Section 10. */
  watchingNext?: WatchingNext;

  sections: {
    marketBehavior: string;
    whatIDid: string;
    /** Optional: letters published before this format existed don't have
     *  a captured trade to walk through, and inventing one would misstate
     *  the record. Required for every letter going forward. */
    theTrade?: string;
    /** Optional for the same reason as `theTrade`. Non-negotiable for new
     *  letters — see the editorial template. */
    whatSurprisedMe?: string;
    whatImWatching: string;
    /**
     * The five-section structured body (Architecture doc's expanded
     * template). All optional, and all-or-nothing in practice: once any
     * one of these is populated, the letter page renders this set instead
     * of the older three-section body above — see the letter page's own
     * rendering rule. Letters that don't use this format simply leave all
     * five undefined and keep rendering the older structure untouched.
     */
    /** Objective market observation. */
    theMarket?: string;
    /** How the frameworks read the month. */
    theFrameworkRead?: string;
    /** Trades taken, sizing, exits. */
    thePositions?: string;
    /** What worked, what didn't. */
    theReview?: string;
    /** Forward-looking signals. */
    theWatch?: string;
  };
}

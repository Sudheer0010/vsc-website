/** Framework 01's three regimes — the only values the environment metric takes. */
export type LetterEnvironment = "Aggressive" | "Neutral" | "Defensive";

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

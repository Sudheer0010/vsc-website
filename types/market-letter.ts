export interface MarketLetter {
  /** Sequential, permanent, never reused — Letter 001 is Jan 2026. */
  letterNumber: number;
  /** ISO date (YYYY-MM-DD) the letter actually went out, not the 1st of
   *  the month as a stand-in. Drives the citable byline and structured
   *  data's datePublished. */
  publishedDate: string;
  month: string;
  year: number;
  description?: string;
  metrics: {
    [key: string]: string;
  };
  sections: {
    "Market Environment"?: string;
    "What Worked"?: string[];
    "Adjustment"?: string[];
    "Looking Ahead"?: string;
  };
}

/**
 * Research Notes — a shorter, evidence-led format distinct from the dated
 * Market Letters and the versioned Frameworks: one market behaviour, one
 * annotated chart, one explicit limit, and a link to the framework it
 * sharpens. Structured (not a `body: string` blob) so every note renders
 * through the same template rather than being hand-built per page.
 */
export interface ResearchNote {
  /** Zero-padded display number, e.g. "001". */
  number: string;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  /** e.g. "August 2026" — display text, not a parsed date. */
  publishedDate: string;
  readingTime: string;
  /** The one-sentence claim — thesis block on the note page, hook line on the archive card. */
  thesis: string;
  claim: string[];
  whyItHappens: string[];
  evidence: {
    chartImage?: string;
    chartAlt: string;
    /** Short identifying text shown inside the placeholder until chartImage is set. */
    chartPlaceholderLabel: string[];
    /** Leads with "Exhibit N — ...", ends with the disclaimer as its own paragraph. */
    captionParagraphs: string[];
    afterChartProse: string[];
  };
  whatItDoesntTellYou: string[];
  whereItFeeds: {
    frameworkLabel: string;
    frameworkHref: string;
    description: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export const researchNotes: ResearchNote[] = [
  {
    number: "001",
    slug: "three-day-rule",
    category: "EARNINGS BEHAVIOUR",
    title: "Waiting three days after a gap down",
    subtitle: "What the rule protects you from, and what it doesn't",
    publishedDate: "August 2026",
    readingTime: "3 min read",
    thesis: "The three-day rule tells you when not to buy. It never tells you when to.",
    claim: [
      "One of the easiest mistakes after earnings is buying a stock simply because it has fallen sharply.",
      "A stock gaps down 10%, 15% or 20% and suddenly looks cheap. But an earnings gap-down is often not the end of the selling. It can be the beginning of a larger repricing.",
    ],
    whyItHappens: [
      "Institutions holding large positions cannot always exit everything in one session. Selling can continue for days or even weeks. That is why the first bounce after a gap-down should not automatically be treated as recovery.",
      "Day 1 can attract dip buyers and short covering. What matters is what happens after that.",
      "The three-day rule is simple: after a major earnings gap-down, give the stock at least three trading sessions before even considering it.",
      "Not because Day 4 is automatically a buy.",
      "Because those three days give the market time to show whether the selling is actually slowing down.",
    ],
    evidence: {
      chartImage: "/images/research-note-001-chart.png",
      chartAlt: "Jain Resource Recycling Ltd. daily chart, May to August 2026",
      chartPlaceholderLabel: ["Jain Resource Recycling — Daily chart", "May–August 2026"],
      captionParagraphs: [
        "Exhibit 1 — Jain Resource Recycling Ltd., daily chart, May–August 2026. The stock suffered a sharp earnings breakdown in May. After an initial consolidation around ₹385–₹400, that range broke as well. The stock remained in a downtrend for roughly three months and traded near ₹308 by the next earnings period.",
        "Analysis is my own. Not a recommendation.",
      ],
      afterChartProse: [
        "This is exactly why waiting matters.",
        "Buying immediately after the first breakdown would have meant trying to predict where the selling would stop.",
        "But even after three sessions, the stock had not shown enough strength. The short consolidation failed. The previous breakdown was never reclaimed. And the broader downtrend continued.",
      ],
    },
    whatItDoesntTellYou: [
      "This is the part of the rule that matters most.",
      "Three days passing does not create a buy signal.",
      "The three-day rule is a filter. It tells me when not to rush into a stock after an earnings breakdown. Once those three days are over, I still need price to give me a reason to participate.",
      "In this example, three days passed and the answer was still no. The stock continued lower for months.",
      "So the purpose of waiting is not to automatically buy on Day 4. It is to avoid making a decision while the market is still reacting to new information.",
      "The waiting period ends the restriction. It does not start the trade.",
    ],
    whereItFeeds: {
      frameworkLabel: "Framework 03 — Setup Grading",
      frameworkHref: "/frameworks/setup-grading",
      description:
        "A stock can look cheap and still fail the structure, trend and confirmation requirements of a good setup.",
    },
    seo: {
      title: "Waiting Three Days After a Gap Down — Research Note 001 | VSC Capital",
      description:
        "The three-day rule tells you when not to buy after an earnings gap down. It never tells you when to. An annotated chart of Jain Resource Recycling, May–August 2026.",
    },
  },
];

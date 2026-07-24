export interface MarketLetter {
  month: string;
  year: number;
  metrics: {
    [key: string]: string;
  };
  sections: {
    "Market Environment"?: string;
    "What Worked"?: string[];
    "Adjustment"?: string;
    "Looking Ahead"?: string;
  };
}

export const marketLetters: { [key: string]: MarketLetter } = {
  JAN: {
    month: "JANUARY",
    year: 2026,
    metrics: {
      "Monthly Return": "+12.42%",
      "Risk / Trade": "1.5%",
      "Trades": "9",
      "Market Type": "Selective Themes"
    },
    sections: {
      "Market Environment": "Momentum conditions improved during the latter half of the month, with selective opportunities emerging in leadership stocks.",
      "What Worked": ["Relative strength names", "Momentum continuation setups"],
      "Adjustment": "Focused only on stocks showing clear leadership and avoided weaker setups.",
      "Looking Ahead": "Monitoring follow-through in emerging leaders and sector strength."
    }
  },
  FEB: {
    month: "FEBRUARY",
    year: 2026,
    metrics: {
      "Monthly Return": "+11.82%",
      "Risk / Trade": "1.5%",
      "Trades": "14",
      "Market Type": "Selective Themes"
    },
    sections: {
      "Market Environment": "Banking sector showed strength in early February with consistent follow-through. Quality setups presented multiple times throughout the month with strong conviction.",
      "What Worked": ["HDFC breakouts with 4:1+ risk-reward", "Banking sector leadership", "Consistent discipline on entry confirmation"],
      "Adjustment": "Increased participation in confirmed setups while maintaining strict risk per trade at 1.5%.",
      "Looking Ahead": "Observing continuation of banking strength and monitoring sector rotation signals."
    }
  },
  MAR: {
    month: "MARCH",
    year: 2026,
    metrics: {
      "Monthly Return": "-1.56%",
      "Risk / Trade": "1.5%",
      "Trades": "1",
      "Market Type": "Negative Bias"
    },
    sections: {
      "Market Environment": "Negative bias dominated the market. Failed breakouts increased significantly amid uncertainty surrounding Iran war developments.",
      "What Worked": ["Capital preservation"],
      "Adjustment": "After the first loss, risk was reduced aggressively and participation remained limited as crude oil volatility increased.",
      "Looking Ahead": "Monitoring signs of geopolitical cooling and improvement in overall market participation."
    }
  },
  APR: {
    month: "APRIL",
    year: 2026,
    metrics: {
      "Monthly Return": "0.00%",
      "Risk / Trade": "1.5%",
      "Trades": "0",
      "Market Type": "Defensive"
    },
    sections: {
      "Market Environment": "FII selling accelerated as global capital chased AI-driven opportunities in international markets. Rupee depreciation and geopolitical tensions further increased uncertainty.",
      "What Worked": ["Patience", "Staying defensive"],
      "Adjustment": "Maintained a capital preservation approach and avoided forcing trades in low-conviction conditions.",
      "Looking Ahead": "Monitoring stabilization in global risk sentiment, FII flows, and signs of improving market participation."
    }
  },
  MAY: {
    month: "MAY",
    year: 2026,
    metrics: {
      "Monthly Return": "+23.42%",
      "Risk / Trade": "1.5%",
      "Trades": "33",
      "Market Type": "Selective Themes"
    },
    sections: {
      "Market Environment": "Market conditions improved considerably. AI proxy themes and defence-related sectors displayed strong relative strength, leading to broader participation and improved momentum conditions.",
      "What Worked": ["AI proxy opportunities", "Defence sector leadership", "High-quality momentum setups"],
      "Adjustment": "Increased participation selectively as follow-through and momentum quality improved.",
      "Looking Ahead": "Monitoring whether sector leadership broadens further and if momentum conditions remain sustainable."
    }
  }
};

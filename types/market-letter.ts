export interface MarketLetter {
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

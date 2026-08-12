import React from "react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { SubPageHero } from "@/components/sections/offerings/SubPageHero";
import { ModuleCard } from "@/components/sections/offerings/ModuleCard";
import { RiskGatesChart } from "@/components/sections/offerings/RiskGatesChart";
import { ClosingCTA } from "@/components/sections/offerings/ClosingCTA";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import {
  ShieldCheck,
  Sliders,
  Compass,
  BarChart3,
  CheckSquare,
  Headphones,
} from "lucide-react";

const modules = [
  {
    number: "Module 01",
    title: "Capital Structure & Asset Allocation",
    icon: ShieldCheck,
    items: [
      "Strategic asset weightings",
      "Equity & cash allocation rules",
      "Sector exposure limits",
      "Capital preservation thresholds",
    ],
  },
  {
    number: "Module 02",
    title: "Quantitative Risk Gates",
    icon: Sliders,
    items: [
      "Maximum portfolio drawdown limits",
      "Individual trade risk bounds (1.5% rule)",
      "Dynamic stop-loss parameters",
      "Correlation risk controls",
    ],
  },
  {
    number: "Module 03",
    title: "Regime-Based Rebalancing",
    icon: Compass,
    items: [
      "Market regime classification",
      "Cash deployment triggers",
      "Volatility contraction scaling",
      "Momentum trend confirmations",
    ],
  },
  {
    number: "Module 04",
    title: "Portfolio Audit & Risk Stressing",
    icon: BarChart3,
    items: [
      "Monthly portfolio health checks",
      "Tail-risk scenario testing",
      "Liquidity & slippage audits",
      "Position concentration limits",
    ],
  },
  {
    number: "Module 05",
    title: "Execution Discipline & Rule-Based Entry",
    icon: CheckSquare,
    items: [
      "Systematic entry checklists",
      "Scaling in & scaling out parameters",
      "Trailing stop management",
      "Pre-trade risk validation",
    ],
  },
  {
    number: "Module 06",
    title: "Direct Research Desk Advisory",
    icon: Headphones,
    items: [
      "1-on-1 strategic portfolio reviews",
      "Custom risk gate adjustments",
      "Real-time market regime alerts",
      "Ongoing risk desk guidance",
    ],
  },
];

export default function AdvantagePage() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <PaperGrain />
      <AmbientLightPool color="rgba(15, 122, 64, 0.05)" className="left-[50%] top-[25%] -translate-x-1/2 scale-[1.5]" />

      <main className="relative w-full z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-16 sm:mb-20">
            <SubPageHero
              eyebrow="Offerings // VSC Advantage"
              title="VSC Advantage"
              description="Strategic portfolio guidance that aligns your capital allocation with quantitative risk gates, drawdown limits, and mathematical position sizing."
            />
          </div>

          <div className="mb-20">
            <Exhibit
              number={1}
              label="Risk gates"
              caption="Illustrative. The per-trade bound shown (1.5%) is applied consistently across every position; the portfolio-level drawdown limit is a standing risk rule, not a published percentage."
            >
              <RiskGatesChart />
            </Exhibit>
          </div>

          <h2 className="mb-10 font-display text-2xl font-normal tracking-tight text-ink sm:text-3xl">
            VSC Advantage Includes
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <ModuleCard
                key={mod.number}
                number={mod.number}
                title={mod.title}
                icon={mod.icon}
                items={mod.items}
              />
            ))}
          </div>
        </div>
      </main>

      <ClosingCTA
        headline="Ready for a review?"
        subline="No pitch and no obligation — a conversation about your current positions and whether this fits."
      />
    </div>
  );
}

import React from "react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { SubPageHero } from "@/components/sections/offerings/SubPageHero";
import { ModuleCard } from "@/components/sections/offerings/ModuleCard";
import { HorizontalRail } from "@/components/sections/offerings/HorizontalRail";
import { ClosingCTA } from "@/components/sections/offerings/ClosingCTA";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import {
  BookOpen,
  LineChart,
  TrendingUp,
  ShieldAlert,
  Brain,
  Users,
} from "lucide-react";

const modules = [
  {
    number: "Module 01",
    title: "Market Foundations",
    icon: BookOpen,
    railLabel: "Foundations",
    items: ["Market structure", "Participants & capital flow", "Understanding price behaviour"],
  },
  {
    number: "Module 02",
    title: "Technical Analysis",
    icon: LineChart,
    railLabel: "Technicals",
    items: ["Trend analysis", "Support & resistance", "Chart patterns", "Multi-timeframe analysis"],
  },
  {
    number: "Module 03",
    title: "Momentum Investing Framework",
    icon: TrendingUp,
    railLabel: "Momentum",
    items: ["Relative strength", "Breakout strategies", "Sector rotation", "Stock selection process"],
  },
  {
    number: "Module 04",
    title: "Risk & Portfolio Management",
    icon: ShieldAlert,
    railLabel: "Risk",
    items: ["Position sizing", "Capital allocation", "Risk management framework", "Trade management"],
  },
  {
    number: "Module 05",
    title: "Trading Psychology & Process",
    icon: Brain,
    railLabel: "Psychology",
    items: ["Decision making", "Emotional discipline", "Trading journal", "Building consistency"],
  },
  {
    number: "Module 06",
    title: "Mentorship & Community",
    icon: Users,
    railLabel: "Mentorship",
    items: ["Live 1-to-1 guidance", "Weekly doubt-clearing sessions", "Practical assignments", "Ongoing support"],
  },
];

export default function LearningHubPage() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <PaperGrain />
      <AmbientLightPool color="rgba(111, 134, 183, 0.05)" className="left-[50%] top-[25%] -translate-x-1/2 scale-[1.5]" />

      <main className="relative w-full z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-16 sm:mb-20">
            <SubPageHero
              title="VSC Learn"
              description="A professional learning framework built to develop systematic market structure analysis, technical setups, and risk bounds before committing capital."
            />
          </div>

          <div className="mb-20">
            <Exhibit
              number={1}
              label="Curriculum path"
              caption="Six modules that build on each other in order — a sequence, not a menu to pick from."
            >
              <HorizontalRail steps={modules.map((m) => m.railLabel)} />
            </Exhibit>
          </div>

          <h2 className="mb-10 font-display text-2xl font-normal tracking-tight text-ink sm:text-3xl">
            VSC Learn Includes
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
        headline="Start with structure."
        subline="Six modules. One clear path through the markets."
        ctaLabel="Enquire about VSC Learn →"
        faqLabel="Read the FAQ →"
      />
    </div>
  );
}

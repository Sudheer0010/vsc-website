import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { SubPageHero } from "@/components/sections/offerings/SubPageHero";
import { ModuleCard } from "@/components/sections/offerings/ModuleCard";
import { HorizontalRail } from "@/components/sections/offerings/HorizontalRail";
import { ClosingCTA } from "@/components/sections/offerings/ClosingCTA";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import {
  FileText,
  Globe,
  Cpu,
  Code2,
  Layers,
  Database,
} from "lucide-react";

const modules = [
  {
    number: "Module 01",
    title: "Institutional Market Letters",
    icon: FileText,
    items: [
      "Full monthly research publications",
      "Macro market environment audits",
      "Sector leadership rankings",
      "Monthly return & trade attribution",
    ],
  },
  {
    number: "Module 02",
    title: "Macro Regime Shift Analysis",
    icon: Globe,
    items: [
      "Early trend transition alerts",
      "Liquidity & FII flow monitoring",
      "Inter-market breadth indicators",
      "Global risk sentiment tracking",
    ],
  },
  {
    number: "Module 03",
    title: "Quantitative Theme Audits",
    icon: Cpu,
    items: [
      "High-conviction sector breakdowns",
      "Stage 2 breakout screenings",
      "Relative strength rankings",
      "Stock candidate shortlists",
    ],
  },
  {
    number: "Module 04",
    title: "Codebase & Parameter Research",
    icon: Code2,
    items: [
      "Algorithmic screening logic",
      "Backtested setup statistics",
      "Volatility adjustment matrices",
      "System parameter documentation",
    ],
  },
  {
    number: "Module 05",
    title: "Quarterly Macro Strategy Reviews",
    icon: Layers,
    items: [
      "Deep-dive quarterly trend reports",
      "Strategic portfolio positioning",
      "Risk-reward regime outlooks",
      "Institutional Q&A briefings",
    ],
  },
  {
    number: "Module 06",
    title: "Private Research Archive Access",
    icon: Database,
    items: [
      "Complete historical letter vault",
      "Searchable framework index",
      "Downloadable research PDFs",
      "Institutional member Q&A desk",
    ],
  },
];

const MONTH_STAGES = ["Letter published", "Member discussion", "Idea review", "Positions argued"];

export default function InnerCirclePage() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <Navbar />
      <PaperGrain />
      <AmbientLightPool color="rgba(93, 139, 115, 0.05)" className="left-[50%] top-[25%] -translate-x-1/2 scale-[1.5]" />

      <main className="relative w-full z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-16 sm:mb-20">
            <SubPageHero
              eyebrow="Offerings // Inner Circle"
              title="VSC Inner Circle"
              description="A closed research desk for people who already run their own book. The published letters show how I think — Inner Circle is where that thinking gets tested before it becomes a position."
            />

            {/* v2.1 §3.3 — points at what's already public rather than
                re-describing the letter as this offering's value, since the
                letter is free on the Research page and Inner Circle isn't
                (and should never be described using that word). */}
            <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-soft">
              Every monthly letter is published in full on the{" "}
              <Link href="/blog" className="font-semibold text-growth underline-offset-4 hover:underline">
                Research page
              </Link>
              . That&apos;s the artifact. Membership is the room around it — the
              discussion, the pushback, the second opinion before capital moves.
            </p>
          </div>

          <div className="mb-20">
            <Exhibit
              number={1}
              label="What a month looks like"
              caption="The shape of a typical month. Timing varies with the market, not a fixed schedule."
            >
              <HorizontalRail steps={MONTH_STAGES} />
            </Exhibit>
          </div>

          <h2 className="mb-10 font-display text-2xl font-normal tracking-tight text-ink sm:text-3xl">
            Inner Circle Includes
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
        headline="Request an invitation"
        subline="Tell me about your book and what you're looking for — membership is by invitation, reviewed directly, not sold through a form."
      />
      <Footer />
    </div>
  );
}

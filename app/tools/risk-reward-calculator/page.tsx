import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { RiskRewardCalculator } from "@/components/tools/RiskRewardCalculator";
import { StepRule } from "@/components/ui/vsc/StepRule";

export const metadata: Metadata = {
  title: "Risk–Reward Ratio Calculator | VSC Capital & Advisory",
  description:
    "Calculate planned reward-to-risk, risk per share, reward per share and breakeven win rate for a long equity trade.",
  alternates: { canonical: "/tools/risk-reward-calculator" },
  openGraph: {
    type: "website",
    url: "https://vsccapital.in/tools/risk-reward-calculator",
    title: "Risk–Reward Ratio Calculator | VSC Capital & Advisory",
    description:
      "Calculate planned reward-to-risk, risk per share, reward per share and breakeven win rate for a long equity trade.",
  },
};

export default function RiskRewardCalculatorPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-canvas text-ink">
      <PaperGrain />
      <main id="main-content" className="relative z-10 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="container max-w-[1120px]">
          <Link
            href="/tools"
            className="mb-8 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-growth hover:text-growth-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All tools
          </Link>

          <header className="mb-8 max-w-[760px] md:mb-10">
            <div className="mb-3 flex items-center gap-3 text-[13px] font-semibold text-growth">
              <StepRule size="sm" />
              <span>Trade planning</span>
            </div>
            <h1 className="text-step-3 md:text-step-4">Risk–Reward Ratio Calculator</h1>
            <p className="mt-4 max-w-[650px] text-[16px] leading-relaxed text-ink-muted sm:text-[17px]">
              Compare the planned reward with the planned risk using your entry, stop-loss and target. Quantity is optional if you also want the rupee outcome.
            </p>
          </header>

          <RiskRewardCalculator />

          <section className="mt-10 border-l-[3px] border-growth bg-surface/60 px-5 py-4 text-[15px] leading-relaxed text-ink-muted sm:px-6">
            <strong className="font-semibold text-ink">VSC principle:</strong> A stop should come from invalidation. A target should come from market structure. The ratio is the consequence — not something you manufacture by moving either level.
          </section>

          <section className="mt-12">
            <h2 className="text-step-2">How the calculation works</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <HowCard step="01" title="Define the trade">
                Set the entry, the stop where the setup is invalidated, and a realistic target based on the trade plan.
              </HowCard>
              <HowCard step="02" title="Measure both distances">
                Entry − stop is the planned risk per share. Target − entry is the potential reward per share.
              </HowCard>
              <HowCard step="03" title="Compare the payoff">
                Reward per share ÷ risk per share gives the Reward : Risk ratio. The ratio does not estimate the chance of success.
              </HowCard>
            </div>
            <p className="mt-5 text-[14px] text-ink-muted">
              Core formula: <span className="font-mono text-ink">Reward : Risk = (Target − Entry) ÷ (Entry − Stop)</span>
            </p>
          </section>

          <aside className="mt-12 max-w-[850px] border-t border-rule pt-5 text-[13px] leading-relaxed text-ink-faint">
            <strong className="font-semibold text-ink-muted">Educational tool only.</strong> The target is a planned level, not a forecast or guarantee. A stop-loss price is also not a guaranteed execution price; gaps, slippage, brokerage and transaction costs can change realised results. *Breakeven win rate is a mathematical threshold based on the planned reward/risk relationship and assumes wins and losses occur at those planned levels; it does not estimate the probability of this specific trade succeeding.
          </aside>
        </div>
      </main>
    </div>
  );
}

function HowCard({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-vsc-lg border border-rule bg-surface p-5 shadow-lift-1">
      <div className="mb-2 text-[12px] font-semibold text-growth">{step}</div>
      <h3 className="text-[18px]">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{children}</p>
    </article>
  );
}

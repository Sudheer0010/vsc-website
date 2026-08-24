import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { TradingExpectancyCalculator } from "@/components/tools/TradingExpectancyCalculator";
import { StepRule } from "@/components/ui/vsc/StepRule";

export const metadata: Metadata = {
  title: "Trading Expectancy Calculator | VSC Capital & Advisory",
  description:
    "Combine win rate with average winner and average loser, in units of initial risk, to calculate the mathematical expectancy of a trading process.",
  alternates: { canonical: "/tools/trading-expectancy-calculator" },
  openGraph: {
    type: "website",
    url: "https://vsccapital.in/tools/trading-expectancy-calculator",
    title: "Trading Expectancy Calculator | VSC Capital & Advisory",
    description:
      "Combine win rate with average winner and average loser, in units of initial risk, to calculate the mathematical expectancy of a trading process.",
  },
};

export default function TradingExpectancyCalculatorPage() {
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
              <span>System evaluation</span>
            </div>
            <h1 className="text-step-3 md:text-step-4">Trading Expectancy Calculator</h1>
            <p className="mt-4 max-w-[650px] text-[16px] leading-relaxed text-ink-muted sm:text-[17px]">
              Combine win rate with the size of your average winners and losers to estimate the mathematical expectancy of a trading process — in units of initial risk.
            </p>
          </header>

          <TradingExpectancyCalculator />

          <section className="mt-10 border-l-[3px] border-growth bg-surface/60 px-5 py-4 text-[15px] leading-relaxed text-ink-muted sm:px-6">
            <strong className="font-semibold text-ink">VSC principle:</strong> Win rate alone is not an edge. A trading process has positive expectancy only when the size and frequency of wins outweigh the size and frequency of losses.
          </section>

          <section className="mt-12">
            <h2 className="text-step-2">How expectancy works</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <HowCard step="01" title="Measure what actually happened">
                Use a consistent set of completed trades to calculate observed win rate, average winner and average loser.
              </HowCard>
              <HowCard step="02" title="Weight wins and losses">
                Multiply each average outcome by how frequently it occurs. Expectancy is the difference between those two contributions.
              </HowCard>
              <HowCard step="03" title="Judge the estimate cautiously">
                A positive historical expectancy is evidence from the sample — not proof that the same distribution will persist in future market regimes.
              </HowCard>
            </div>
            <p className="mt-5 text-[14px] text-ink-muted">
              Core formula: <span className="font-mono text-ink">Expectancy = (Win rate × Avg winner) − (Loss rate × Avg loser)</span>
            </p>

            <div className="mt-5 rounded-vsc-lg border border-growth-tint bg-growth-wash p-5 text-[14px] leading-relaxed text-ink-muted">
              <strong className="font-semibold text-ink">What is 1R?</strong> R is the initial risk unit for a trade. If the amount initially risked is ₹5,000, then +2R represents +₹10,000 and −1R represents −₹5,000. Expressing outcomes in R helps compare trades even when position sizes differ.
            </div>
          </section>

          <aside className="mt-12 max-w-[850px] border-t border-rule pt-5 text-[13px] leading-relaxed text-ink-faint">
            <strong className="font-semibold text-ink-muted">Educational tool only.</strong> Expectancy is an estimate derived from the statistics entered. It is not a forecast of the next trade, a guarantee of profitability, or proof that a strategy has a persistent edge. The estimate can be distorted by small samples, outlier trades, changing market regimes, inconsistent execution, selection bias, and costs or slippage that are not reflected in the underlying trade results. The sample-size note is contextual guidance, not a statistical confidence interval or significance test.
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

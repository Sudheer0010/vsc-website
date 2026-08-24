import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { StepRule } from "@/components/ui/vsc/StepRule";

export const metadata: Metadata = {
  title: "Trading Tools | VSC Capital & Advisory",
  description:
    "Practical trading and risk-management tools built around VSC frameworks, starting with position sizing for long cash-equity trades.",
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    url: "https://vsccapital.in/tools",
    title: "Trading Tools | VSC Capital & Advisory",
    description:
      "Practical trading and risk-management tools built around VSC frameworks.",
  },
};

export default function ToolsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-canvas text-ink">
      <PaperGrain />
      <main id="main-content" className="relative z-10 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="container max-w-[1120px]">
          <Link
            href="/research"
            className="mb-8 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-growth hover:text-growth-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Research
          </Link>

          <header className="max-w-[760px]">
            <div className="mb-3 flex items-center gap-3 text-[13px] font-semibold text-growth">
              <StepRule size="sm" />
              <span>Practical tools</span>
            </div>
            <h1 className="text-step-3 md:text-step-4">Tools built around the process.</h1>
            <p className="mt-5 max-w-[650px] text-[16px] leading-relaxed text-ink-muted sm:text-[17px]">
              Simple utilities for decisions that should be calculated, not guessed. Each tool is designed around a defined VSC risk or trading framework.
            </p>
          </header>

          <section className="mt-12 border-t border-rule pt-10">
            <article className="group max-w-[760px] rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift-3 sm:p-8">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 text-[13px] font-semibold text-growth">Risk management</p>
                  <h2 className="text-step-2">Position Size Calculator</h2>
                </div>
                <StepRule className="mt-1 shrink-0" active />
              </div>
              <p className="max-w-[58ch] text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
                Convert account size, planned entry, stop-loss and maximum account risk into a risk-based share quantity — then check whether the position can be funded with available cash.
              </p>
              <Link
                href="/tools/position-size-calculator"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-growth hover:text-growth-deep"
              >
                Open calculator
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </article>

            <article className="group mt-6 max-w-[760px] rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift-3 sm:p-8">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 text-[13px] font-semibold text-growth">Trade planning</p>
                  <h2 className="text-step-2">Risk–Reward Ratio Calculator</h2>
                </div>
                <StepRule className="mt-1 shrink-0" active />
              </div>
              <p className="max-w-[58ch] text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
                Compare planned reward against planned risk from your entry, stop-loss and target — with risk per share, reward per share and breakeven win rate.
              </p>
              <Link
                href="/tools/risk-reward-calculator"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-growth hover:text-growth-deep"
              >
                Open calculator
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </article>

            <article className="group mt-6 max-w-[760px] rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift-3 sm:p-8">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 text-[13px] font-semibold text-growth">Capital preservation</p>
                  <h2 className="text-step-2">Drawdown &amp; Recovery Calculator</h2>
                </div>
                <StepRule className="mt-1 shrink-0" active />
              </div>
              <p className="max-w-[58ch] text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
                Measure the percentage decline from a prior peak to a current account value, and the gain required on the remaining capital to recover.
              </p>
              <Link
                href="/tools/drawdown-recovery-calculator"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-growth hover:text-growth-deep"
              >
                Open calculator
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </article>

            <article className="group mt-6 max-w-[760px] rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lift-3 sm:p-8">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 text-[13px] font-semibold text-growth">System evaluation</p>
                  <h2 className="text-step-2">Trading Expectancy Calculator</h2>
                </div>
                <StepRule className="mt-1 shrink-0" active />
              </div>
              <p className="max-w-[58ch] text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
                Combine win rate with average winner and average loser, in units of initial risk, to calculate the mathematical expectancy of a trading process.
              </p>
              <Link
                href="/tools/trading-expectancy-calculator"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-growth hover:text-growth-deep"
              >
                Open calculator
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}

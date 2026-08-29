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

const TOOLS = [
  {
    category: "Pre-trade",
    title: "Position Size Calculator",
    description: "Size a position from account risk, entry and stop-loss.",
    href: "/tools/position-size-calculator",
    span: false,
  },
  {
    category: "Pre-trade",
    title: "Risk–Reward Ratio Calculator",
    description: "Compare planned reward against the risk taken.",
    href: "/tools/risk-reward-calculator",
    span: false,
  },
  {
    category: "Portfolio risk",
    title: "Portfolio Risk Calculator",
    description: "See total stop-loss risk across your open positions.",
    href: "/tools/portfolio-risk-calculator",
    span: false,
  },
  {
    category: "Account risk",
    title: "Drawdown & Recovery Calculator",
    description: "Measure a loss and the return required to recover it.",
    href: "/tools/drawdown-recovery-calculator",
    span: false,
  },
  {
    category: "System review",
    title: "Trading Expectancy Calculator",
    description: "Estimate whether your trading process has positive mathematical expectancy.",
    href: "/tools/trading-expectancy-calculator",
    span: true,
  },
] as const;

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
              Built for decisions that should be calculated, not guessed — from individual trade planning to deeper system analysis.
            </p>
          </header>

          <div className="mt-12 max-w-[650px] border-t border-rule pt-10">
            <h2 className="text-step-2">Core Trading Tools</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
              Focused calculators for trade planning, position risk and system review.
            </p>
          </div>

          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group flex flex-col rounded-vsc-xl border border-rule bg-surface p-4 shadow-lift-1 transition-[border-color,box-shadow] duration-200 hover:border-growth/40 hover:shadow-lift-2 sm:p-5 ${
                  tool.span ? "sm:col-span-2" : ""
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1.5 text-[12px] font-semibold text-growth">{tool.category}</p>
                    <h2 className="text-step-1 transition-colors duration-200 group-hover:text-growth-deep">{tool.title}</h2>
                  </div>
                  <StepRule className="mt-1 shrink-0" active />
                </div>
                <p className="max-w-[58ch] text-[14px] leading-relaxed text-ink-muted">{tool.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-growth">
                  Open calculator
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </section>

          <div className="mt-20 max-w-[650px] border-t border-rule pt-10 md:mt-28">
            <h2 className="text-step-2">Advanced Trading Tools</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
              Explore how a trading system may behave across different sequences, probabilities and risk conditions.
            </p>
          </div>

          <section className="mt-6">
            <Link
              href="/tools/trading-expectancy-path-simulator"
              className="group flex flex-col rounded-vsc-xl border border-rule bg-surface p-4 shadow-lift-1 transition-[border-color,box-shadow] duration-200 hover:border-growth/40 hover:shadow-lift-2 sm:p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1.5 text-[12px] font-semibold text-growth">Advanced · System analysis</p>
                  <h3 className="text-step-1 transition-colors duration-200 group-hover:text-growth-deep">Trading Expectancy Path Simulator</h3>
                </div>
                <StepRule className="mt-1 shrink-0" active />
              </div>
              <p className="max-w-[58ch] text-[14px] leading-relaxed text-ink-muted">
                See how the same theoretical trading edge can produce very different equity paths, drawdowns and losing streaks.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-growth">
                Open simulator
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { PortfolioRiskCalculator } from "@/components/tools/PortfolioRiskCalculator";
import { StepRule } from "@/components/ui/vsc/StepRule";

export const metadata: Metadata = {
  title: "Portfolio Risk Calculator | VSC Capital & Advisory",
  description:
    "Calculate total portfolio risk across up to eight open positions — total rupee risk, risk concentration by sector or theme, and an optional risk-limit comparison.",
  alternates: { canonical: "/tools/portfolio-risk-calculator" },
  openGraph: {
    type: "website",
    url: "https://vsccapital.in/tools/portfolio-risk-calculator",
    title: "Portfolio Risk Calculator | VSC Capital & Advisory",
    description:
      "Calculate total portfolio risk across up to eight open positions — total rupee risk, risk concentration by sector or theme, and an optional risk-limit comparison.",
  },
};

export default function PortfolioRiskCalculatorPage() {
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
              <span>Portfolio risk</span>
            </div>
            <h1 className="text-step-3 md:text-step-4">Portfolio Risk Calculator</h1>
            <p className="mt-4 max-w-[650px] text-[16px] leading-relaxed text-ink-muted sm:text-[17px]">
              See how much of your trading account is at risk if every open position reaches its stop-loss — and
              where that risk is concentrated.
            </p>
          </header>

          <PortfolioRiskCalculator />

          <section className="mt-10 border-l-[3px] border-growth bg-surface/60 px-5 py-4 text-[15px] leading-relaxed text-ink-muted sm:px-6">
            <strong className="font-semibold text-ink">VSC principle:</strong> Per-trade discipline can still create
            portfolio-level risk. The whole book matters — especially when several positions depend on the same
            market driver.
          </section>

          <section className="mt-12">
            <h2 className="text-step-2">How the calculation works</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <HowCard step="01" title="Measure each position">
                For a long position, stop-loss risk is the entry-to-stop distance multiplied by the share quantity.
              </HowCard>
              <HowCard step="02" title="Add the open risk">
                Sum the stop-loss risk across all active positions. This is the rupee risk currently committed
                across the book.
              </HowCard>
              <HowCard step="03" title="Compare with account size">
                Divide total stop-loss risk by trading capital to express the combined risk as total portfolio risk.
              </HowCard>
            </div>
            <p className="mt-5 text-[14px] text-ink-muted">
              Core formulas: <span className="font-mono text-ink">Position risk = max(Entry − Stop, 0) × Shares</span>{" "}
              · <span className="font-mono text-ink">Total account risk % = Σ Position risk ÷ Account size</span>
            </p>

            <div className="mt-5 rounded-vsc-lg border border-growth-tint bg-growth-wash p-5 text-[14px] leading-relaxed text-ink-muted">
              <strong className="font-semibold text-ink">Sector / themes are descriptive, not correlation estimates.</strong>{" "}
              The optional group field lets you see how much stop-loss risk sits in simple buckets such as
              &ldquo;Banks&rdquo;, &ldquo;Defence&rdquo; or &ldquo;AI/Data Centre&rdquo;. It does not calculate
              statistical correlation or diversification benefit.
            </div>
          </section>

          <aside className="mt-12 max-w-[900px] border-t border-rule pt-5 text-[13px] leading-relaxed text-ink-faint">
            <strong className="font-semibold text-ink-muted">Educational tool only.</strong> This calculator
            estimates planned entry-to-stop risk for long cash-equity positions and sums that risk across the
            entered portfolio. It does not measure mark-to-market drawdown from current prices, statistical
            portfolio risk, Value at Risk, or correlation-adjusted risk. Stop prices do not guarantee execution at
            those prices; gaps, slippage, liquidity events and correlated market moves can produce realised losses
            larger than the calculated stop-loss risk. A stop at or above entry is treated as zero planned loss
            relative to cost basis, but gap risk remains. Sector/theme groups are simple aggregations and do not
            establish actual correlation.
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

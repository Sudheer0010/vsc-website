import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { PositionSizeCalculator } from "@/components/tools/PositionSizeCalculator";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { OG_IMAGES } from "@/lib/seo";
import { toolBreadcrumbJsonLd } from "@/lib/tool-seo";
import { RelatedLinks, ReadTheResult, ReadItem } from "@/components/tools/RelatedLinks";

export const metadata: Metadata = {
  title: "Position Size Calculator | VSC Capital & Advisory",
  description:
    "Calculate a risk-based equity position size from trading capital, maximum account risk, planned entry and stop-loss.",
  alternates: { canonical: "/tools/position-size-calculator" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    url: "https://vsccapital.in/tools/position-size-calculator",
    title: "Position Size Calculator | VSC Capital & Advisory",
    description:
      "Calculate a risk-based equity position size from trading capital, maximum account risk, planned entry and stop-loss.",
  },
};

export default function PositionSizeCalculatorPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolBreadcrumbJsonLd("Position Size Calculator", "/tools/position-size-calculator")),
        }}
      />
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
              <span>Risk management</span>
            </div>
            <h1 className="text-step-3 md:text-step-4">Position Size Calculator</h1>
            <p className="mt-4 max-w-[650px] text-[16px] leading-relaxed text-ink-muted sm:text-[17px]">
              Enter your trading capital, maximum account risk, planned entry and stop-loss. The calculator shows the risk-based share quantity and whether your available cash can fund it.
            </p>
          </header>

          <PositionSizeCalculator />

          <section className="mt-10 border-l-[3px] border-growth bg-surface/60 px-5 py-4 text-[15px] leading-relaxed text-ink-muted sm:px-6">
            <strong className="font-semibold text-ink">VSC principle:</strong> The stop comes from the trade setup. Account risk defines how much you are prepared to lose. Position size connects the two.
          </section>

          <section className="mt-12">
            <h2 className="text-step-2">How the calculation works</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <HowCard step="01" title="Define the loss limit">
                Trading capital × max account risk gives the rupee amount you are prepared to risk if the stop is reached.
              </HowCard>
              <HowCard step="02" title="Measure the stop distance">
                Entry price − stop-loss gives the planned loss per share for a long equity trade.
              </HowCard>
              <HowCard step="03" title="Calculate the quantity">
                Risk amount ÷ loss per share gives the risk-based share quantity. Available cash is then checked separately.
              </HowCard>
            </div>
            <p className="mt-5 text-[14px] text-ink-muted">
              Core formula: <span className="font-mono text-ink">Position size = (Capital × Risk %) ÷ (Entry − Stop)</span>
            </p>
          </section>

          <ReadTheResult>
            <ReadItem term="Risk-based quantity">
              The share count at which a stop-loss exit costs exactly your stated account risk. It is a ceiling set by risk, not a recommendation to buy that quantity.
            </ReadItem>
            <ReadItem term="Cash-funded quantity">
              What your available cash can actually pay for. When it is lower than the risk-based quantity, cash is the binding constraint and the smaller number is the tradeable size.
            </ReadItem>
            <ReadItem term="A wide stop shrinks the size">
              Entry-to-stop distance sits in the denominator, so a wider stop produces a smaller quantity for the same rupee risk. That is the formula working, not a fault in the setup.
            </ReadItem>
            <ReadItem term="The risk amount is fixed first">
              Changing entry or stop changes the quantity, never the rupee amount at risk. If the resulting size feels too small, the constraint is the stop distance or the risk percentage.
            </ReadItem>
          </ReadTheResult>

          <RelatedLinks
            frameworks={[
              { href: "/frameworks/sizing", label: "Framework 04 — Sizing", note: "How VSC caps a position by stop distance and capital risk, then again by setup grade. The smaller of the two numbers wins." },
            ]}
            tools={[
              { href: "/tools/risk-reward-calculator", label: "Risk–Reward Ratio Calculator", note: "Check whether the same entry and stop justify the trade before sizing it." },
              { href: "/tools/portfolio-risk-calculator", label: "Portfolio Risk Calculator", note: "See what this position adds to the risk already open across the book." },
            ]}
          />

          <aside className="mt-12 max-w-[820px] border-t border-rule pt-5 text-[13px] leading-relaxed text-ink-faint">
            <strong className="font-semibold text-ink-muted">Educational tool only.</strong> This calculator illustrates a risk-based position-sizing method for long cash-equity trades. It does not constitute investment advice or a recommendation. A stop-loss price is a planned exit level, not a guarantee of execution at that exact price; gaps and slippage can result in a different realised loss.
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

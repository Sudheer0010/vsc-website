import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { DrawdownRecoveryCalculator } from "@/components/tools/DrawdownRecoveryCalculator";
import { StepRule } from "@/components/ui/vsc/StepRule";

export const metadata: Metadata = {
  title: "Drawdown & Recovery Calculator | VSC Capital & Advisory",
  description:
    "Calculate the percentage drawdown from a prior peak to a current account value, and the gain required on the remaining capital to recover.",
  alternates: { canonical: "/tools/drawdown-recovery-calculator" },
  openGraph: {
    type: "website",
    url: "https://vsccapital.in/tools/drawdown-recovery-calculator",
    title: "Drawdown & Recovery Calculator | VSC Capital & Advisory",
    description:
      "Calculate the percentage drawdown from a prior peak to a current account value, and the gain required on the remaining capital to recover.",
  },
};

export default function DrawdownRecoveryCalculatorPage() {
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
              <span>Capital preservation</span>
            </div>
            <h1 className="text-step-3 md:text-step-4">Drawdown &amp; Recovery Calculator</h1>
            <p className="mt-4 max-w-[650px] text-[16px] leading-relaxed text-ink-muted sm:text-[17px]">
              Measure how far account equity has fallen from a prior peak — and the return required to recover from the smaller capital base.
            </p>
          </header>

          <DrawdownRecoveryCalculator />

          <section className="mt-10 border-l-[3px] border-growth bg-surface/60 px-5 py-4 text-[15px] leading-relaxed text-ink-muted sm:px-6">
            <strong className="font-semibold text-ink">VSC principle:</strong> A loss and the gain required to recover are not symmetrical. The deeper the drawdown, the harder the recovery becomes.
          </section>

          <section className="mt-12">
            <h2 className="text-step-2">How the calculation works</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <HowCard step="01" title="Define the peak">
                Choose the comparable account value that represents the prior equity high you are measuring from.
              </HowCard>
              <HowCard step="02" title="Measure the decline">
                Drawdown is the percentage decline from that peak to the current account value.
              </HowCard>
              <HowCard step="03" title="Measure the recovery">
                The required gain is calculated from the smaller remaining capital base, so it rises faster than the drawdown.
              </HowCard>
            </div>
            <p className="mt-5 text-[14px] text-ink-muted">
              Core formulas: <span className="font-mono text-ink">Drawdown = (Peak − Current) ÷ Peak</span> ·{" "}
              <span className="font-mono text-ink">Recovery = (Peak ÷ Current) − 1</span>
            </p>
          </section>

          <aside className="mt-12 max-w-[840px] border-t border-rule pt-5 text-[13px] leading-relaxed text-ink-faint">
            <strong className="font-semibold text-ink-muted">Educational tool only.</strong> This calculator measures point-in-time drawdown from an entered peak to an entered current value; it does not calculate maximum drawdown across an account history. Results can be misleading when the two values are not comparable because of deposits, withdrawals, transfers or other external cash flows. Recovery required is a mathematical return to the prior peak, not a forecast, expected return or estimate of how long recovery will take.
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

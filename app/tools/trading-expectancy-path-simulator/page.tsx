import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { TradingExpectancyPathSimulatorWorkspace } from "@/components/tools/TradingExpectancyPathSimulatorWorkspace";
import { Suspense, type ReactNode } from "react";
import { OG_IMAGES } from "@/lib/seo";
import { toolBreadcrumbJsonLd } from "@/lib/tool-seo";
import { RelatedLinks } from "@/components/tools/RelatedLinks";
import { SIMULATION_RUNS } from "@/lib/calculators/trading-expectancy-path-simulator";

export const metadata: Metadata = {
  title: "Trading Edge Stress Test | VSC Capital & Advisory",
  description:
    "Monte Carlo stress test for a trading edge: 10,000 runs from your win rate and payoff, showing the range of outcomes, drawdowns and losing streaks it can produce.",
  alternates: { canonical: "/tools/trading-expectancy-path-simulator" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    url: "https://vsccapital.in/tools/trading-expectancy-path-simulator",
    title: "Trading Edge Stress Test | VSC Capital & Advisory",
    description:
      "Monte Carlo stress test for a trading edge: 10,000 runs from your win rate and payoff, showing the range of outcomes, drawdowns and losing streaks it can produce.",
  },
};

export default function TradingExpectancyPathSimulatorPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            toolBreadcrumbJsonLd(
              "Trading Edge Stress Test",
              "/tools/trading-expectancy-path-simulator",
            ),
          ),
        }}
      />
      <PaperGrain />
      <main id="main-content" className="relative z-10 pb-16 pt-24 md:pb-20 md:pt-28">
        <div className="container">
          <Link
            href="/tools"
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-[13.5px] font-semibold text-growth hover:text-growth-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All tools
          </Link>

          {/* Required boundary: the workspace reads search params to accept a
              prefilled edge from the Trading Expectancy Calculator, and a
              statically rendered page that calls useSearchParams fails the
              production build without one. */}
          <Suspense fallback={<div className="min-h-[420px]" />}>
            <TradingExpectancyPathSimulatorWorkspace />
          </Suspense>

          <div className="mt-16 max-w-[820px]">
            <section>
              <h2 className="text-step-2">What this stress test answers</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
                One question: <em>if this trading edge is roughly real, how difficult could the journey
                still become?</em> You supply a win rate, an average win and an average loss in R. The tool
                runs that edge {SIMULATION_RUNS.toLocaleString("en-IN")} times as a Monte Carlo simulation
                over the horizon you choose, then reports the range of endpoints, the drawdowns and the
                losing streaks those runs contained.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
                <strong className="font-semibold text-ink">R</strong> is one unit of risk &mdash; whatever
                you stake on a single trade. A winner worth twice its risk is +2R; a full stop-out is
                &minus;1R. Working in R keeps every figure independent of account size.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-step-2">Why the runs differ</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
                Every run uses identical assumptions, and they still end up in different places for two
                separate reasons.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <SimCard title="How many wins you get">
                  Each run draws its own wins and losses, so the <em>count</em> varies from run to run.
                  That sampling variance is what moves the endpoint. Over 200 trades at a 45% win rate,
                  some runs land 80 winners and some land 100.
                </SimCard>
                <SimCard title="What order they arrive in">
                  Two runs with the same number of wins can still feel completely different. Sequencing is
                  what determines how deep the drawdowns get and how long the losing streaks run.
                </SimCard>
              </div>
              <p className="mt-5 text-[14px] text-ink-muted">
                Trading expectancy per trade:{" "}
                <span className="font-mono text-ink">
                  E = (Win rate &times; Avg win) &minus; (Loss rate &times; Avg loss)
                </span>
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-step-2">How the numbers are produced</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <SimCard title="Simulated percentiles">
                  The endpoint range, the drawdown and the losing streak are percentiles across all{" "}
                  {SIMULATION_RUNS.toLocaleString("en-IN")} runs, under the assumptions you entered. They
                  are reported as the 5th, 50th and 95th percentile rather than the best and worst run,
                  because a single extreme run is unstable &mdash; it gets more extreme simply by
                  simulating more.
                </SimCard>
                <SimCard title="An exact probability">
                  The model-implied chance of finishing below 0R is not estimated from the runs. Because
                  every win and loss has a fixed size, the endpoint depends only on how many trades won,
                  which follows a binomial distribution &mdash; so the probability has a closed form and is
                  computed exactly. It is conditional on the entered constant win rate and fixed payoffs.
                </SimCard>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-step-2">What the model leaves out</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
                Each trade is an independent draw at a constant win rate, and every win is exactly your
                average win while every loss is exactly your average loss. The model does not represent
                variation in individual trade sizes, tail losses, gaps, slippage, costs, changing market
                regimes, or an edge that decays over time. Real results may differ materially from these
                figures, and may be more extreme in either direction.
              </p>
            </section>

            <RelatedLinks
              frameworks={[
                {
                  href: "/frameworks/trade-management",
                  label: "Framework 05 \u2014 Trade Management",
                  note: "The exit and stop rules that decide how deep a losing sequence is allowed to run.",
                },
              ]}
              tools={[
                {
                  href: "/tools/trading-expectancy-calculator",
                  label: "Trading Expectancy Calculator",
                  note: "Measure the expectancy of your own completed trades, then bring it here to stress-test.",
                },
                {
                  href: "/tools/drawdown-recovery-calculator",
                  label: "Drawdown & Recovery Calculator",
                  note: "Convert a simulated drawdown into the gain required to recover from it.",
                },
              ]}
            />

            <aside className="mt-12 border-t border-rule pt-5 text-[13px] leading-relaxed text-ink-faint">
              <strong className="font-semibold text-ink-muted">Educational tool only.</strong> These runs are
              randomly generated from the assumptions you enter. They are not a backtest, a forecast, or a
              projection of any account, and the tool cannot tell you whether your assumptions are correct.
              Results differ on every run.
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function SimCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-vsc-lg border border-rule bg-surface p-5 shadow-lift-1">
      <h3 className="text-[18px]">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{children}</p>
    </article>
  );
}

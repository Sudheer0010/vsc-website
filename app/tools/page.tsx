import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allTools } from "@/data/tools";
import { OG_IMAGES } from "@/lib/seo";
import { VSCButton } from "@/components/ui/vsc/VSCButton";

export const metadata: Metadata = {
  title: "Trading Tools | VSC Capital & Advisory",
  description:
    "Plan individual trades, measure portfolio risk, and test a trading process with six practical VSC tools.",
  alternates: { canonical: "/tools" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    url: "https://vsccapital.in/tools",
    title: "Trading Tools | VSC Capital & Advisory",
    description:
      "Plan individual trades, measure portfolio risk, and test a trading process with six practical VSC tools.",
  },
};

type ToolEntry = {
  title: string;
  href: string;
  badge: string;
  description: string;
  detail: string;
  ctaLabel?: string;
};

function indexTool(
  href: string,
  details: Omit<ToolEntry, "title" | "href">,
): ToolEntry {
  const tool = allTools.find((candidate) => candidate.href === href);

  if (!tool) {
    throw new Error(`Missing tool catalogue entry for ${href}`);
  }

  return {
    title: tool.title,
    href: tool.href,
    ...details,
  };
}

const decisionGroups = [
  {
    number: "01",
    title: "Plan the trade",
    summary: "Calculate share quantity and payoff ratio before placing an order.",
    tools: [
      indexTool("/tools/position-size-calculator", {
        badge: "Pre-trade · Core",
        description: "Know exactly how many shares to buy so a stop-loss hit stays within your account risk limit.",
        detail: "Uses capital, risk %, entry & stop",
      }),
      indexTool("/tools/risk-reward-calculator", {
        badge: "Pre-trade",
        description: "Compare your planned upside against downside before committing capital to a setup.",
        detail: "Checks payoff ratio & breakeven win rate",
      }),
    ],
  },
  {
    number: "02",
    title: "Measure the portfolio",
    summary: "Check combined open risk and see how drawdowns compound.",
    tools: [
      indexTool("/tools/portfolio-risk-calculator", {
        badge: "Portfolio · DIY check",
        description: "Add your open positions and stops to see total capital at risk across stocks and sectors.",
        detail: "Tracks multi-position exposure & limits",
      }),
      indexTool("/tools/drawdown-recovery-calculator", {
        badge: "Account risk",
        description: "See the percentage gain required to recover from any drawdown as losses deepen.",
        detail: "Illustrates asymmetric loss recovery math",
      }),
    ],
  },
  {
    number: "03",
    title: "Test the system",
    summary: "Evaluate whether your rules hold up across dozens of trades.",
    tools: [
      indexTool("/tools/trading-expectancy-calculator", {
        badge: "System review",
        description: "Measure whether your win rate and average payoff produce a positive mathematical edge.",
        detail: "Computes expectancy per trade in R",
      }),
      indexTool("/tools/trading-expectancy-path-simulator", {
        badge: "Simulation · 10,000 paths",
        description: "See how the same trading edge can produce very different equity curves and losing streaks.",
        detail: "Reports p5 / p50 / p95 & drawdown range",
        ctaLabel: "Launch simulator",
      }),
    ],
  },
] as const;

export default function ToolsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      <main id="main-content" className="pb-20 pt-28 sm:pt-32 md:pb-24 md:pt-34">
        <div className="container mx-auto max-w-[1200px] px-6 sm:px-10">
          {/* Header with quick jump navigation */}
          <header className="grid gap-6 border-b border-rule pb-9 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-6">
              <span className="eyebrow">Trading tools</span>
              <h1 className="font-display mt-3 text-[clamp(2.25rem,3.9vw,3.35rem)] font-bold leading-[1.03] tracking-[-0.03em] text-ink text-balance">
                Calculate before you commit.
              </h1>
              <p className="mt-3 max-w-[46ch] text-[16.5px] leading-[1.6] text-ink-soft">
                Six free calculators to size position risk, check portfolio exposure, and stress-test a trading
                process &mdash; no sign-up required.
              </p>
            </div>

            <nav aria-label="Jump to tool group" className="lg:col-span-6">
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {decisionGroups.map((group) => (
                  <a
                    key={group.number}
                    href={`#tools-group-${group.number}`}
                    className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-vsc-md border border-rule bg-surface px-3.5 py-2 text-[13px] font-semibold text-ink shadow-lift-1 transition-colors hover:border-growth hover:text-growth"
                  >
                    <span className="font-mono text-[11.5px] tabular-nums text-growth">{group.number}</span>
                    <span>{group.title}</span>
                  </a>
                ))}
              </div>
            </nav>
          </header>

          {/* 3-stage workflow groups with uniform card surfaces */}
          <div aria-label="Trading decision tools" className="divide-y divide-rule">
            {decisionGroups.map((group) => {
              const headingId = `tools-group-${group.number}`;

              return (
                <section
                  key={group.number}
                  id={headingId}
                  aria-labelledby={`${headingId}-label`}
                  className="scroll-mt-28 py-12 sm:py-14"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    <header className="lg:col-span-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[15px] font-semibold tabular-nums text-growth">
                          {group.number}
                        </span>
                        <h2
                          id={`${headingId}-label`}
                          className="font-display text-[24px] font-semibold tracking-tight text-ink sm:text-[26px]"
                        >
                          {group.title}
                        </h2>
                      </div>
                      <p className="mt-3 max-w-[34ch] text-[15.5px] leading-relaxed text-ink-soft">
                        {group.summary}
                      </p>
                    </header>

                    <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
                      {group.tools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="group flex min-h-[236px] flex-col rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-growth/50 hover:shadow-lift-2 sm:p-7"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex rounded-full bg-growth-wash px-3 py-1 text-[12px] font-semibold text-growth-deep">
                              {tool.badge}
                            </span>
                          </div>

                          <h3 className="mt-4 font-display text-[21px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink transition-colors group-hover:text-growth-deep sm:text-[22px]">
                            {tool.title}
                          </h3>

                          <p className="mt-2.5 mb-5 text-[15px] leading-[1.6] text-ink-soft">
                            {tool.description}
                          </p>

                          <div className="mt-auto flex items-center justify-between gap-3 border-t border-rule pt-4">
                            <span className="text-[12.5px] text-ink-muted">{tool.detail}</span>
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-growth">
                              {tool.ctaLabel ?? "Open"}
                              <ArrowRight
                                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Closing callout: human portfolio review + framework link */}
          <section
            aria-labelledby="tools-review-heading"
            className="mt-4 rounded-vsc-xl border border-rule bg-canvas-sunk p-7 sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-7">
                <span className="eyebrow">Portfolio risk check</span>
                <h2
                  id="tools-review-heading"
                  className="font-display mt-3 text-[clamp(1.6rem,2.6vw,2.15rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink"
                >
                  Want a second look at your open positions?
                </h2>
                <p className="mt-3 max-w-[54ch] text-[15.5px] leading-relaxed text-ink-soft">
                  Start with the Portfolio Risk Calculator for an instant self-check, or request a free educational
                  portfolio strength review &mdash; no stock tips, no sales pitch.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
                <VSCButton href="/enquire?portfolio=1" variant="growth">
                  <span className="inline-flex items-center gap-2">
                    Request free review
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </VSCButton>
                <Link
                  href="/frameworks/sizing"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-semibold text-ink transition-colors hover:text-growth"
                >
                  Sizing framework <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allTools } from "@/data/tools";
import { OG_IMAGES } from "@/lib/seo";

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
  description: string;
  label?: string;
  secondary?: string;
};

function indexTool(
  href: string,
  description: string,
  details: Pick<ToolEntry, "label" | "secondary"> = {},
): ToolEntry {
  const tool = allTools.find((candidate) => candidate.href === href);

  if (!tool) {
    throw new Error(`Missing tool catalogue entry for ${href}`);
  }

  return {
    title: tool.title,
    href: tool.href,
    description,
    ...details,
  };
}

const decisionGroups = [
  {
    number: "01",
    title: "Plan the Trade",
    tools: [
      indexTool(
        "/tools/position-size-calculator",
        "Know how much you can afford to risk before entering.",
      ),
      indexTool(
        "/tools/risk-reward-calculator",
        "See whether the planned reward justifies the risk.",
      ),
    ],
  },
  {
    number: "02",
    title: "Measure the Portfolio",
    tools: [
      indexTool(
        "/tools/portfolio-risk-calculator",
        "See the total stop-loss risk across your open positions.",
        {
          label: "DIY portfolio check",
          secondary: "Want a human second look? VSC can review it free.",
        },
      ),
      indexTool(
        "/tools/drawdown-recovery-calculator",
        "Understand what a loss requires to recover from.",
      ),
    ],
  },
  {
    number: "03",
    title: "Test the System",
    tools: [
      indexTool(
        "/tools/trading-expectancy-calculator",
        "Measure whether the trading process has a positive mathematical edge.",
      ),
      indexTool(
        "/tools/trading-expectancy-path-simulator",
        "See how the same edge can produce very different equity paths.",
        { label: "Simulation" },
      ),
    ],
  },
] as const;

const principles = [
  {
    title: "Size deliberately",
    description: "Know the risk before entering.",
  },
  {
    title: "Measure the portfolio",
    description: "One trade can look safe while the portfolio isn't.",
  },
  {
    title: "Test the process",
    description: "A good outcome and a good system are not the same thing.",
  },
] as const;

export default function ToolsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      <main id="main-content" className="pb-16 pt-28 sm:pt-32 md:pb-24 md:pt-36">
        <div className="container max-w-[1120px]">
          <header className="grid gap-7 border-b border-rule pb-12 sm:pb-14 md:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)] md:items-end md:gap-12 md:pb-16">
            <h1 className="max-w-[760px] text-step-4 text-balance">
              Calculate before you commit.
            </h1>
            <p className="max-w-[34ch] text-[17px] leading-[1.55] text-ink-soft sm:text-[19px]">
              Size the trade. Measure the portfolio. Test the process.
            </p>
          </header>

          <div aria-label="Trading decision tools">
            {decisionGroups.map((group) => {
              const headingId = `tools-group-${group.number}`;

              return (
                <section
                  key={group.number}
                  aria-labelledby={headingId}
                  className="border-b border-rule"
                >
                  <div className="grid md:grid-cols-[minmax(0,0.75fr)_minmax(0,2.25fr)] md:gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
                    <header className="flex items-baseline gap-4 py-7 md:block md:py-10">
                      <p className="font-mono text-[32px] font-medium leading-none tabular-nums text-growth md:text-[42px]">
                        {group.number}
                      </p>
                      <h2
                        id={headingId}
                        className="text-[13px] font-semibold uppercase leading-[1.35] tracking-[0.07em] text-ink-soft md:mt-4 md:max-w-[13rem] md:text-[14px]"
                      >
                        {group.title}
                      </h2>
                    </header>

                    <div className="grid border-t border-rule md:border-t-0 lg:grid-cols-2 lg:divide-x lg:divide-rule">
                      {group.tools.map((tool, index) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className={`group relative flex min-h-11 flex-col py-8 transition-colors duration-200 hover:text-growth-deep active:bg-canvas-sunk/60 sm:py-9 md:py-10 lg:min-h-[212px] lg:px-8 ${
                            index === 0
                              ? "lg:pl-0"
                              : "border-t border-rule lg:border-t-0 lg:pr-0"
                          }`}
                        >
                          <div className="mb-3 min-h-4">
                            {tool.label ? (
                              <p className="font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.08em] text-growth">
                                {tool.label}
                              </p>
                            ) : null}
                          </div>
                          <h3 className="max-w-[20ch] font-display text-[clamp(1.45rem,2.3vw,2rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-ink text-balance transition-colors duration-200 group-hover:text-growth-deep">
                            {tool.title}
                          </h3>
                          <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.6] text-ink-muted sm:text-[16px]">
                            {tool.description}
                          </p>
                          {tool.secondary ? (
                            <p className="mt-3 max-w-[46ch] text-[13px] leading-[1.55] text-ink-muted">
                              {tool.secondary}
                            </p>
                          ) : null}
                          <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-[14px] font-semibold text-growth">
                            Open tool
                            <ArrowRight
                              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <section
            aria-labelledby="tools-philosophy-heading"
            className="mt-16 border-y border-rule py-10 sm:mt-20 md:grid md:grid-cols-[minmax(0,0.72fr)_minmax(0,2.28fr)] md:gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14"
          >
            <h2
              id="tools-philosophy-heading"
              className="text-[14px] font-semibold text-ink-soft"
            >
              What these tools are for
            </h2>

            <div className="mt-7 md:mt-0">
              <p className="max-w-[700px] font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-ink text-balance">
                <span className="block">They don&apos;t predict the market.</span>
                <span className="block text-ink-soft">
                  They help define the decision before money is at risk.
                </span>
              </p>

              <div className="mt-9 grid gap-6 sm:grid-cols-3 sm:gap-0">
                {principles.map((principle, index) => (
                  <div
                    key={principle.title}
                    className={`border-t border-rule pt-4 sm:min-h-[112px] sm:px-5 ${
                      index === 0 ? "sm:pl-0" : "sm:border-l"
                    } ${index === principles.length - 1 ? "sm:pr-0" : ""}`}
                  >
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.07em] text-growth">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-[30ch] text-[14px] leading-[1.55] text-ink-muted">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

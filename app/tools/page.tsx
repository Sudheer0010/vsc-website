import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { OG_IMAGES } from "@/lib/seo";
import { coreTools, advancedTools } from "@/data/tools";

export const metadata: Metadata = {
  title: "Trading Tools | VSC Capital & Advisory",
  description:
    "Practical trading and risk-management tools built around VSC frameworks, starting with position sizing for long cash-equity trades.",
  alternates: { canonical: "/tools" },
  openGraph: {
    images: OG_IMAGES,
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
            {coreTools.map((tool) => (
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
              href={advancedTools[0].href}
              className="group flex flex-col rounded-vsc-xl border border-rule bg-surface p-4 shadow-lift-1 transition-[border-color,box-shadow] duration-200 hover:border-growth/40 hover:shadow-lift-2 sm:p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1.5 text-[12px] font-semibold text-growth">{advancedTools[0].category}</p>
                  <h3 className="text-step-1 transition-colors duration-200 group-hover:text-growth-deep">{advancedTools[0].title}</h3>
                </div>
                <StepRule className="mt-1 shrink-0" active />
              </div>
              <p className="max-w-[58ch] text-[14px] leading-relaxed text-ink-muted">
                {advancedTools[0].description}
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

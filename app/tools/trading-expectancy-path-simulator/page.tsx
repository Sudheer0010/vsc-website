import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { TradingExpectancyPathSimulatorWorkspace } from "@/components/tools/TradingExpectancyPathSimulatorWorkspace";

export const metadata: Metadata = {
  title: "Trading Expectancy Path Simulator | VSC Capital & Advisory",
  description:
    "Explore how the same theoretical trading edge can produce very different equity paths, drawdowns and losing streaks.",
  alternates: { canonical: "/tools/trading-expectancy-path-simulator" },
  openGraph: {
    type: "website",
    url: "https://vsccapital.in/tools/trading-expectancy-path-simulator",
    title: "Trading Expectancy Path Simulator | VSC Capital & Advisory",
    description:
      "Explore how the same theoretical trading edge can produce very different equity paths, drawdowns and losing streaks.",
  },
};

export default function TradingExpectancyPathSimulatorPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-canvas text-ink">
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

          <TradingExpectancyPathSimulatorWorkspace />
        </div>
      </main>
    </div>
  );
}

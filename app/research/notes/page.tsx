import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { ResearchNotesArchive } from "@/components/sections/research-notes/ResearchNotesArchive";
import { researchNotes } from "@/data/research-notes";

export const metadata: Metadata = {
  title: "Trading Insights | VSC Capital",
  description:
    "Trading ideas you can actually use — shorter, evidence-led notes that each sharpen a specific framework.",
  alternates: { canonical: "/research/notes" },
  openGraph: {
    type: "website",
    title: "Trading Insights | VSC Capital",
    description:
      "Trading ideas you can actually use — shorter, evidence-led notes that each sharpen a specific framework.",
    url: "/research/notes",
  },
};

export default function ResearchNotesIndex() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <PaperGrain />
      <AmbientLightPool color="rgba(15, 122, 64, 0.04)" className="left-[50%] top-[600px] scale-[1.4]" />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container max-w-[900px]">
          <Link
            href="/research"
            className="group mb-8 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Research
          </Link>

          <header className="mb-12 select-none">
            <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              Research
            </span>
            <h1 className="mb-4 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
              Trading Insights
            </h1>
            <p className="max-w-[58ch] text-[18px] leading-relaxed text-ink-soft">
              Trading ideas you can actually use.
            </p>
          </header>

          <ResearchNotesArchive notes={researchNotes} />
        </div>
      </main>
    </div>
  );
}

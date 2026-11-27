import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { MarketLetterArchive } from "@/components/sections/blog/MarketLetterArchive";
import { marketLetters, sortedMonths } from "@/data/market-letters";

export default function LettersIndex() {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-canvas text-ink">
      <PaperGrain />
      <AmbientLightPool color="rgba(15, 122, 64, 0.04)" className="left-[50%] top-[600px] scale-[1.4]" />

      <main className="relative z-10 w-full pb-20 pt-24 md:pt-28">
        <div className="container max-w-[1200px]">
          <Link
            href="/research"
            className="group mb-5 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Research
          </Link>

          <MarketLetterArchive
            sortedMonths={sortedMonths}
            marketLetters={marketLetters}
          />
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { letterHref } from "@/lib/letter-urls";

/**
 * A guided path, not a list (Architecture doc §8). Three steps, not four —
 * "how the framework works" is left out on purpose: the doc's own rule is
 * "never publish a step that has no content behind it," and the Framework
 * Library doesn't have real write-ups yet. Add it back once it does.
 */
const RECENT_FIVE = sortedMonths.slice(0, 5);

export default function StartHere() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <Navbar />
      <PaperGrain />
      <AmbientLightPool color="rgba(15, 122, 64, 0.04)" className="left-[50%] top-[600px] scale-[1.4]" />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
            NEW TO VSC?
          </span>
          <h1 className="mb-6 font-display text-4xl font-normal leading-[1.1] text-ink sm:text-5xl">
            Start here.
          </h1>
          <p className="mb-16 max-w-[58ch] text-[18px] leading-relaxed text-ink-soft">
            Three steps, in order. Nothing here is padded to look bigger than it is — this is the
            short, complete version of getting to know how I think.
          </p>

          <ol className="flex flex-col gap-16">
            <li>
              <div className="mb-3 font-mono text-sm font-semibold text-growth">01</div>
              <h2 className="mb-3 font-display text-2xl font-normal text-ink sm:text-3xl">
                What VSC believes
              </h2>
              <p className="mb-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-soft">
                The manifesto, the origin, and the founder — in one place, in my own words.
              </p>
              <Link href="/about" className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-growth">
                Read About VSC
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </li>

            <li>
              <div className="mb-3 font-mono text-sm font-semibold text-growth">02</div>
              <h2 className="mb-3 font-display text-2xl font-normal text-ink sm:text-3xl">
                Five market letters
              </h2>
              <p className="mb-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-soft">
                The most recent five, in order. Every letter uses the same fixed structure, so
                these are enough to see how the process actually reads month to month.
              </p>
              <ul className="mb-4 flex flex-col gap-2">
                {RECENT_FIVE.map((key) => {
                  const letter = marketLetters[key];
                  const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();
                  return (
                    <li key={key}>
                      <Link href={letterHref(key)} className="font-mono text-sm text-ink hover:text-growth">
                        Letter {String(letter.letterNumber).padStart(3, "0")} — {monthName} {letter.year}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link href="/letters" className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-growth">
                View the full archive
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </li>

            <li>
              <div className="mb-3 font-mono text-sm font-semibold text-growth">03</div>
              <h2 className="mb-3 font-display text-2xl font-normal text-ink sm:text-3xl">
                Recommended reading
              </h2>
              <p className="mb-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-soft">
                Books, annual letters, and talks that shaped the framework — not generated, hand-picked.
              </p>
              <Link href="/reading" className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-growth">
                Open the Reading Desk
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </li>
          </ol>

          <div className="mt-20 border-t border-rule pt-10 text-center">
            <p className="mb-4 font-mono text-sm text-ink-soft">
              Read those, and you&apos;ll know whether it&apos;s worth a conversation.
            </p>
            <Link
              href="/enquire"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-gold px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-accent-gold-light"
            >
              Enquire &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { getReadingTime } from "@/lib/reading-time";
import { LetterCardGrid } from "@/components/sections/start/LetterCardGrid";

/**
 * A guided path, not a list (Architecture doc §8). Four steps — the
 * decision pipeline is now in it, because /frameworks itself carries real
 * content (the five-stage diagram and questions), not just placeholder
 * cards, so it clears the doc's own "never publish a step with no content
 * behind it" bar.
 */
const RECENT_FIVE = sortedMonths.slice(0, 5);

/**
 * Step 3's time is real, computed from the same getReadingTime() the rest
 * of the site uses for these letters — not a typed-in guess. Steps 1, 2,
 * and 4 point at pages/data with no modeled word count or reading-time
 * field (About is static prose, frameworks and reading-list items carry
 * no time field), so those three stay editorial estimates.
 */
const STEP_1_MIN = 4;
const STEP_2_MIN = 6;
const STEP_3_MIN = RECENT_FIVE.reduce((total, key) => total + getReadingTime(marketLetters[key]), 0);
const STEP_4_MIN = 3;

function StepMeta({ number, minutes }: { number: string; minutes: number }) {
  return (
    <div className="font-mono text-sm font-semibold">
      <span className="text-growth">{number}</span>
      <span className="mx-1.5 text-ink-faint">&middot;</span>
      <span className="text-ink-faint">{minutes} min</span>
    </div>
  );
}

function StepCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group mt-5 inline-flex min-h-[44px] items-center gap-2 font-mono text-sm font-semibold text-growth">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export default function StartHere() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <PaperGrain />
      <AmbientLightPool color="rgba(15, 122, 64, 0.04)" className="left-[50%] top-[600px] scale-[1.4]" />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container mx-auto max-w-[740px] px-4 sm:px-6">
          <Link
            href="/research"
            className="group mb-8 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Research
          </Link>

          <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
            NEW TO VSC?
          </span>
          <h1 className="mb-6 font-display text-4xl font-normal leading-[1.1] text-ink sm:text-5xl">
            Start here.
          </h1>
          <p className="mb-16 max-w-[58ch] text-[18px] leading-relaxed text-ink-soft">
            Four steps, in order. The shortest way to understand how VSC thinks.
          </p>

          <ol className="flex flex-col divide-y divide-rule">
            <li className="pb-10">
              <StepMeta number="01" minutes={STEP_1_MIN} />
              <h2 className="mt-3 font-display text-2xl font-normal text-ink sm:text-3xl">
                What VSC believes
              </h2>
              <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-ink-soft">
                The manifesto, the origin, and the founder — in one place, in my own words.
              </p>
              <StepCTA href="/about">Read About VSC</StepCTA>
            </li>

            <li className="py-10">
              <StepMeta number="02" minutes={STEP_2_MIN} />
              <h2 className="mt-3 font-display text-2xl font-normal text-ink sm:text-3xl">
                How the decision pipeline works
              </h2>
              <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-ink-soft">
                Five frameworks, in order — from reading the market to managing a trade.
              </p>
              <StepCTA href="/research#framework-library">Browse the framework library</StepCTA>
            </li>

            <li className="py-10">
              <StepMeta number="03" minutes={STEP_3_MIN} />
              <h2 className="mt-3 font-display text-2xl font-normal text-ink sm:text-3xl">
                Five market letters
              </h2>
              <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-ink-soft">
                The most recent five, in order. Every letter uses the same fixed structure, so
                these are enough to see how the process actually reads month to month.
              </p>

              <div className="mt-6">
                <LetterCardGrid monthKeys={RECENT_FIVE} marketLetters={marketLetters} />
              </div>

              <StepCTA href="/letters">View the full archive</StepCTA>
            </li>

            <li className="pt-10">
              <StepMeta number="04" minutes={STEP_4_MIN} />
              <h2 className="mt-3 font-display text-2xl font-normal text-ink sm:text-3xl">
                Recommended reading
              </h2>
              <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-ink-soft">
                Books, annual letters, and talks that shaped the framework — not generated, hand-picked.
              </p>
              <StepCTA href="/reading">Open the Reading Desk</StepCTA>
            </li>
          </ol>

          <div className="mt-20 border-t border-rule pt-12 text-center">
            <p className="mb-6 font-display text-xl font-normal leading-snug text-ink sm:text-2xl">
              That&apos;s enough to understand how VSC thinks.
            </p>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-gold px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-accent-gold-light"
            >
              Explore Research &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

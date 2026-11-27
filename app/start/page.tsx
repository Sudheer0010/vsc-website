import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { getReadingTime } from "@/lib/reading-time";
import { LetterCardGrid } from "@/components/sections/start/LetterCardGrid";
import { VSCButton } from "@/components/ui/vsc/VSCButton";

/**
 * A guided four-step orientation path on Daylight Growth surfaces.
 * Groups foundation reading (01–02) side-by-side, puts live monthly proof (03)
 * in a dedicated two-column band, and pairs deeper reading (04) with direct
 * practical next steps (/tools, /enquire?portfolio=1).
 */
const RECENT_FIVE = sortedMonths.slice(0, 5);

const STEP_1_MIN = 4;
const STEP_2_MIN = 6;
const STEP_3_MIN = RECENT_FIVE.reduce((total, key) => total + getReadingTime(marketLetters[key]), 0);
const STEP_4_MIN = 3;
const TOTAL_MIN = STEP_1_MIN + STEP_2_MIN + STEP_3_MIN + STEP_4_MIN;

const ROUTE_INDEX = [
  { id: "step-01", number: "01", title: "What I believe", minutes: STEP_1_MIN },
  { id: "step-02", number: "02", title: "The 5-gate process", minutes: STEP_2_MIN },
  { id: "step-03", number: "03", title: "Five market letters", minutes: STEP_3_MIN },
  { id: "step-04", number: "04", title: "Recommended reading", minutes: STEP_4_MIN },
] as const;

function StepMeta({ number, minutes }: { number: string; minutes: number }) {
  return (
    <div className="flex items-center gap-2 text-[13px] font-semibold">
      <span className="inline-flex h-6 w-7 items-center justify-center rounded-md bg-growth-tint font-mono text-[12px] tabular-nums text-growth-deep">
        {number}
      </span>
      <span className="font-mono tabular-nums text-ink-muted">{minutes} min</span>
    </div>
  );
}

function StepCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group mt-auto inline-flex min-h-[44px] items-center gap-2 pt-5 text-[14.5px] font-semibold text-growth transition-colors hover:text-growth-deep"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

export default function StartHere() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-canvas text-ink">
      <main id="main-content" className="pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-36">
        <div className="container mx-auto max-w-[1200px] px-6 sm:px-10">
          {/* Top navigation breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-4 text-[14px]">
            <Link
              href="/research"
              className="group inline-flex min-h-[44px] items-center gap-2 font-medium text-ink-muted transition-colors hover:text-growth"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              Back to Research
            </Link>
            <span aria-hidden="true" className="text-rule-strong">/</span>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center font-medium text-ink-muted transition-colors hover:text-growth"
            >
              Home
            </Link>
          </nav>

          {/* Orientation header + Route Map */}
          <header className="grid gap-10 border-b border-rule pb-12 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <span className="eyebrow">New to VSC</span>
              <h1 className="font-display mt-3 text-step-4 font-bold tracking-[-0.03em] text-ink">
                Start here.
              </h1>
              <p className="mt-4 max-w-[50ch] text-[17px] leading-[1.65] text-ink-soft">
                Four steps in order &mdash; from what VSC believes and how the five-gate process works, to the live
                monthly letters and foundational reading.
              </p>
            </div>

            <aside
              aria-label="Guided path overview"
              className="rounded-vsc-xl border border-rule bg-surface p-5 shadow-lift-1 sm:p-6 lg:col-span-5"
            >
              <div className="flex items-center justify-between gap-2 border-b border-rule pb-3 text-[13px]">
                <span className="font-semibold text-ink">Your 4-step path</span>
                <span className="font-mono tabular-nums text-ink-muted">~{TOTAL_MIN} min total</span>
              </div>
              <ol className="mt-2 divide-y divide-rule">
                {ROUTE_INDEX.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex min-h-[44px] items-center justify-between gap-3 py-2 text-[14px] transition-colors hover:text-growth"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[12px] font-semibold tabular-nums text-growth">
                          {item.number}
                        </span>
                        <span className="font-medium text-ink group-hover:text-growth">{item.title}</span>
                      </span>
                      <span className="font-mono text-[12px] tabular-nums text-ink-faint">{item.minutes} min</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          </header>

          {/* Phase 1: Foundation (01 & 02 side by side) */}
          <section aria-label="Philosophy and method" className="mt-12 grid gap-6 md:grid-cols-2">
            <article
              id="step-01"
              className="flex scroll-mt-28 flex-col rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <StepMeta number="01" minutes={STEP_1_MIN} />
              <h2 className="mt-4 font-display text-[24px] font-semibold leading-tight tracking-tight text-ink sm:text-[26px]">
                What VSC believes
              </h2>
              <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">
                The manifesto, the origin, and the founder &mdash; why capital protection comes first, in my own words.
              </p>
              <StepCTA href="/about">Read About VSC</StepCTA>
            </article>

            <article
              id="step-02"
              className="flex scroll-mt-28 flex-col rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <StepMeta number="02" minutes={STEP_2_MIN} />
              <h2 className="mt-4 font-display text-[24px] font-semibold leading-tight tracking-tight text-ink sm:text-[26px]">
                How the decision pipeline works
              </h2>
              <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">
                Five versioned frameworks in order &mdash; from reading market conditions to sizing and managing a trade.
              </p>
              <StepCTA href="/research#framework-library">Browse the framework library</StepCTA>
            </article>
          </section>

          {/* Phase 2: Live monthly proof (03 split band) */}
          <section
            id="step-03"
            aria-labelledby="step-03-heading"
            className="mt-8 scroll-mt-28 rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-8 lg:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
              <div className="lg:col-span-5">
                <StepMeta number="03" minutes={STEP_3_MIN} />
                <h2
                  id="step-03-heading"
                  className="mt-4 font-display text-[24px] font-semibold leading-tight tracking-tight text-ink sm:text-[28px]"
                >
                  Five recent market letters
                </h2>
                <p className="mt-3 max-w-[44ch] text-[15.5px] leading-relaxed text-ink-soft">
                  Every monthly letter follows the same fixed structure. Reading the recent five shows how the rules
                  adjust exposure month by month.
                </p>
                <StepCTA href="/letters">View all {sortedMonths.length} letters</StepCTA>
              </div>

              <div className="lg:col-span-7">
                <LetterCardGrid monthKeys={RECENT_FIVE} marketLetters={marketLetters} />
              </div>
            </div>
          </section>

          {/* Phase 3: Deeper reading (04) + Practical next action */}
          <section aria-label="Further reading and tools" className="mt-8 grid gap-6 lg:grid-cols-12">
            <article
              id="step-04"
              className="flex scroll-mt-28 flex-col rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8 lg:col-span-5"
            >
              <StepMeta number="04" minutes={STEP_4_MIN} />
              <h2 className="mt-4 font-display text-[24px] font-semibold leading-tight tracking-tight text-ink">
                Recommended reading
              </h2>
              <p className="mt-3 max-w-[42ch] text-[15.5px] leading-relaxed text-ink-soft">
                Books, annual letters, and talks that shaped the framework &mdash; hand-picked, not generated.
              </p>
              <StepCTA href="/reading">Open the Reading Desk</StepCTA>
            </article>

            <div className="flex flex-col justify-between rounded-vsc-xl border border-growth/25 bg-growth-wash p-6 sm:p-8 lg:col-span-7">
              <div>
                <span className="eyebrow">Put it into practice</span>
                <h2 className="mt-2 font-display text-[24px] font-semibold leading-tight tracking-tight text-ink sm:text-[26px]">
                  That&apos;s enough to understand how VSC thinks.
                </h2>
                <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
                  Explore the full research archive, test your own position sizing in the calculators, or request a
                  free educational portfolio strength check.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <VSCButton href="/research" variant="growth">
                  <span className="inline-flex items-center gap-2">
                    Explore Research
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </VSCButton>
                <Link
                  href="/tools"
                  className="inline-flex min-h-[44px] items-center rounded-vsc-md border border-rule-strong bg-surface px-4 py-2.5 text-[14.5px] font-semibold text-ink transition-colors hover:border-growth hover:text-growth"
                >
                  Open Trading Tools
                </Link>
                <Link
                  href="/enquire?portfolio=1"
                  className="inline-flex min-h-[44px] items-center text-[14.5px] font-semibold text-growth hover:text-growth-deep"
                >
                  Portfolio review &rarr;
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

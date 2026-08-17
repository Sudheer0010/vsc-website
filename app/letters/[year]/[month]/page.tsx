import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { AnimatedMetric } from "@/components/ui/vsc/AnimatedMetric";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { FrameworkReviewRow } from "@/types/market-letter";
import { getReadingTime } from "@/lib/reading-time";
import { formatLongDate } from "@/lib/format-date";
import { letterHref, monthKeyFromParams } from "@/lib/letter-urls";
import { hasV4Content } from "@/lib/market-letter-format";
import { MarketLetterV4 } from "@/components/sections/letters/MarketLetterV4";

interface LetterPageProps {
  params: Promise<{ year: string; month: string }>;
}

export function generateStaticParams() {
  return sortedMonths.map((key) => {
    const href = letterHref(key); // /letters/{year}/{month}
    const [, , year, month] = href.split("/");
    return { year, month };
  });
}

function getLetterOrNotFound(year: string, month: string) {
  const key = monthKeyFromParams(year, month);
  if (!key) return null;
  return { key, letter: marketLetters[key] };
}

/** Splits on blank lines so multi-paragraph fields render as real <p> tags. */
function paragraphs(text: string): string[] {
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

function MetricCell({
  label,
  value,
  tone,
  isWord,
}: {
  label: string;
  value: string;
  tone: "growth" | "clay" | "ink";
  isWord?: boolean;
}) {
  const toneClass = tone === "growth" ? "text-growth" : tone === "clay" ? "text-clay" : "text-ink";
  return (
    <div className="flex flex-col items-center gap-2 py-2 text-center">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
        {label}
      </span>
      {isWord ? (
        <span className={`font-display text-xl font-medium sm:text-2xl ${toneClass}`}>{value}</span>
      ) : (
        <AnimatedMetric value={value} className={`font-display text-2xl font-semibold sm:text-3xl ${toneClass}`} />
      )}
    </div>
  );
}

/**
 * Shown only on letters that haven't migrated to the five-section
 * structured body yet (gated on !hasStructuredBody below) — once a letter
 * sets theFrameworkRead, this content lives in "The Framework Read"
 * section instead and the accordion disappears on its own.
 */
function FrameworkReviewExhibit({ rows }: { rows: FrameworkReviewRow[] }) {
  return (
    <div className="mb-8 rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-8">
      <span className="mb-5 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        Framework Review
      </span>
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div
            key={row.framework}
            className={`flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
              i > 0 ? "border-t border-rule" : ""
            }`}
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-faint sm:w-52 sm:shrink-0">
              {row.framework}
            </span>
            <div className="flex-1">
              <p className="text-[16px] font-medium text-ink">{row.interpretation}</p>
              <p className="mt-1 font-mono text-[12px] text-ink-faint">{row.detail}</p>
            </div>
            {row.direction && (
              <span
                className={`shrink-0 text-[14px] font-bold ${row.direction === "down" ? "text-clay" : "text-growth"}`}
                aria-hidden="true"
              >
                {row.direction === "down" ? "▼" : "▲"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProseSection({ heading, text }: { heading: string; text: string }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">{heading}</h2>
      <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
        {paragraphs(text).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export async function generateMetadata({ params }: LetterPageProps): Promise<Metadata> {
  const { year, month } = await params;
  const found = getLetterOrNotFound(year, month);
  if (!found) return {};

  const { letter } = found;
  const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();
  const title = `${monthName} ${letter.year} Market Letter · Letter ${String(letter.letterNumber).padStart(3, "0")} | VSC Capital & Advisory`;
  const description = letter.description || letter.thesis;
  const canonical = letterHref(found.key);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      publishedTime: letter.publishedDate,
    },
  };
}

export default async function LetterPage({ params }: LetterPageProps) {
  const { year, month } = await params;
  const found = getLetterOrNotFound(year, month);
  if (!found) notFound();

  const { key: monthKey, letter } = found;
  const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();
  const currentIndex = sortedMonths.indexOf(monthKey);
  const prevMonthKey = currentIndex < sortedMonths.length - 1 ? sortedMonths[currentIndex + 1] : null;
  const nextMonthKey = currentIndex > 0 ? sortedMonths[currentIndex - 1] : null;

  const getLetterName = (key: string | null) => {
    if (!key) return "";
    const l = marketLetters[key];
    return `${l.month.charAt(0) + l.month.slice(1).toLowerCase()} ${l.year}`;
  };

  const isNegativeReturn = letter.metrics.monthlyReturn.trim().startsWith("-");

  const { theMarket, theFrameworkRead, thePositions, theReview, theWatch } = letter.sections;
  const hasStructuredBody = Boolean(theMarket || theFrameworkRead || thePositions || theReview || theWatch);
  const isV4 = hasV4Content(letter);
  const previousLetter = prevMonthKey ? marketLetters[prevMonthKey] : null;
  const readTime = getReadingTime(letter);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${monthName} ${letter.year} Market Letter`,
    description: letter.description || letter.thesis,
    datePublished: letter.publishedDate,
    dateModified: letter.publishedDate,
    author: {
      "@type": "Person",
      name: "Sudheer Vobhilineni",
    },
    publisher: {
      "@type": "Organization",
      name: "VSC Capital & Advisory",
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress />
      <PaperGrain />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/research"
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Research
          </Link>

          {isV4 ? (
            <MarketLetterV4
              letter={letter}
              previousLetter={previousLetter}
              previousMonthKey={prevMonthKey}
              readTime={readTime}
            />
          ) : (
            <>
              {/* 1. Header */}
              <header className="mb-7 select-none text-center">
                <span className="mb-3 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                  Research Archive · Market Letter
                </span>
                <h1 className="mb-3 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
                  {monthName} {letter.year}
                </h1>
                <div className="font-mono text-xs text-ink-faint">
                  Letter {String(letter.letterNumber).padStart(3, "0")} · Published {formatLongDate(letter.publishedDate)} · {readTime} minute read
                </div>
              </header>

              {/* 2. The Thesis — impossible to scroll past */}
              <div className="mb-8 rounded-vsc-xl bg-growth-tint p-6 text-center sm:p-9">
                <p className="font-display text-[21px] font-medium leading-snug text-ink sm:text-[24px]">
                  {letter.thesis}
                </p>
              </div>

              {/* 3. Metrics strip */}
              <div className="mb-8 grid grid-cols-2 gap-4 py-6 sm:grid-cols-3">
                <MetricCell
                  label="Monthly Return"
                  value={letter.metrics.monthlyReturn}
                  tone={isNegativeReturn ? "clay" : "growth"}
                />
                <MetricCell label="Trades Taken" value={String(letter.metrics.tradesTaken)} tone="ink" />
                <MetricCell label="Environment" value={letter.metrics.environment} tone="ink" isWord />
              </div>

              {/* 3b. Framework Review — only for letters not yet migrated to the structured body */}
              {!hasStructuredBody && <FrameworkReviewExhibit rows={letter.frameworkReview} />}

              {/* 4. Prose sections */}
              <div className="flex flex-col gap-9 text-left">
                {hasStructuredBody ? (
                  <>
                    {theMarket && <ProseSection heading="The Market" text={theMarket} />}
                    {theFrameworkRead && <ProseSection heading="The Framework Read" text={theFrameworkRead} />}
                    {thePositions && <ProseSection heading="The Positions" text={thePositions} />}
                    {theReview && <ProseSection heading="The Review" text={theReview} />}
                    {theWatch && <ProseSection heading="The Watch" text={theWatch} />}
                  </>
                ) : (
                  <>
                    <ProseSection heading="What the market was doing" text={letter.sections.marketBehavior ?? ""} />
                    <ProseSection heading="What I did about it" text={letter.sections.whatIDid ?? ""} />

                    {letter.sections.theTrade && (
                      <section className="flex flex-col gap-4">
                        <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                          The trade that explains the month
                        </h2>
                        <div className="rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-8">
                          <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
                            {paragraphs(letter.sections.theTrade).map((p, i) => (
                              <p key={i}>{p}</p>
                            ))}
                          </div>
                        </div>
                      </section>
                    )}

                    {letter.sections.whatSurprisedMe && (
                      <section className="flex flex-col gap-4">
                        <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">What surprised me</h2>
                        <div className="border-l-[3px] border-clay py-1 pl-5">
                          <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
                            {paragraphs(letter.sections.whatSurprisedMe).map((p, i) => (
                              <p key={i}>{p}</p>
                            ))}
                          </div>
                        </div>
                      </section>
                    )}

                    <ProseSection heading="What I'm watching" text={letter.sections.whatImWatching ?? ""} />
                  </>
                )}
              </div>
            </>
          )}

          {/* 5. Previous/Next Navigation */}
          <div className="select-none pt-10">
            <div className="h-px w-full bg-rule" />
            <span className="mb-4 mt-6 block text-center font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
              RESEARCH ARCHIVE
            </span>

            <div className="flex items-center justify-between font-mono text-xs text-growth">
              <div>
                {prevMonthKey ? (
                  <Link href={letterHref(prevMonthKey)} className="transition-colors duration-200 hover:text-ink">
                    &larr; {getLetterName(prevMonthKey)}
                  </Link>
                ) : (
                  <span className="text-ink-faint">&larr; End of Archive</span>
                )}
              </div>

              <div>
                {nextMonthKey ? (
                  <Link href={letterHref(nextMonthKey)} className="transition-colors duration-200 hover:text-ink">
                    {getLetterName(nextMonthKey)} &rarr;
                  </Link>
                ) : (
                  <span className="text-ink-faint">Latest Publication</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

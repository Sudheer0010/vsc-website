import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { Byline } from "@/components/ui/vsc/Byline";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { AnimatedMetric } from "@/components/ui/vsc/AnimatedMetric";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { getReadingTime } from "@/lib/reading-time";
import { formatLongDate } from "@/lib/format-date";
import { letterHref, monthKeyFromParams } from "@/lib/letter-urls";

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

export async function generateMetadata({ params }: LetterPageProps): Promise<Metadata> {
  const { year, month } = await params;
  const found = getLetterOrNotFound(year, month);
  if (!found) return {};

  const { letter } = found;
  const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();
  const title = `${monthName} ${letter.year} Market Letter · Letter ${String(letter.letterNumber).padStart(3, "0")} | VSC Capital & Advisory`;
  const description = letter.description || `Letter ${letter.letterNumber}: what the market did, what the framework said, and where exposure stands now.`;
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${monthName} ${letter.year} Market Letter`,
    description: letter.description,
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
      <Navbar />
      <PaperGrain />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          {/* 1. Report Header */}
          <div className="market-letter-header mb-12 select-none text-center">
            <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
              RESEARCH ARCHIVE
            </div>
            <h4 className="mb-2 font-display text-lg font-normal italic text-accent-gold sm:text-xl">
              Market Letter
            </h4>
            <h1 className="mb-6 font-display text-4xl font-normal leading-none text-ink sm:text-5xl">
              {monthName} {letter.year}
            </h1>
            <div className="font-mono text-xs text-ink-faint">
              Letter {String(letter.letterNumber).padStart(3, "0")} · Published {formatLongDate(letter.publishedDate)} · {getReadingTime(letter)} minute read
            </div>
          </div>

          {/* 2. KPI Metrics Grid */}
          <div className="mb-16 grid grid-cols-2 gap-4 border-y border-rule py-8 select-none md:grid-cols-4">
            {Object.keys(letter.metrics).map((key) => {
              const value = letter.metrics[key];
              const isMarketType = key === "Market Type";
              const isLoss = value.includes("-");

              let classNames = "mt-3 block font-display text-2xl font-semibold sm:text-3xl";
              if (isMarketType) classNames += " text-ink text-lg sm:text-xl font-normal mt-3";
              else if (isLoss) classNames += " text-loss";
              else classNames += " text-[#0F7A40]";

              return (
                <div className="flex flex-col justify-between py-2 text-center" key={key}>
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">{key}</div>
                  <AnimatedMetric value={value} className={classNames} />
                </div>
              );
            })}
          </div>

          {/* 3. Narrative Flow Stack */}
          <div className="flex flex-col gap-16 text-left">
            {letter.sections["Market Environment"] && (
              <div className="flex flex-col gap-4">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-gold">
                  Market Environment
                </h2>
                <div className="mb-2 h-px w-full bg-canvas-sunk" />
                <p className="font-mono text-base leading-[1.8] text-ink sm:text-[18px]">
                  {letter.sections["Market Environment"]}
                </p>
              </div>
            )}

            {letter.sections["What Worked"] && (
              <div className="flex flex-col gap-4">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-gold">
                  What Worked
                </h2>
                <div className="mb-2 h-px w-full bg-canvas-sunk" />
                <ul className="flex list-none flex-col gap-4 font-mono text-base leading-[1.8] text-ink sm:text-[18px]">
                  {letter.sections["What Worked"].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-lg leading-none text-accent-gold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {letter.sections["Adjustment"] && (
              <div className="flex flex-col gap-4">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-gold">
                  Tactical Adjustment
                </h2>
                <div className="mb-2 h-px w-full bg-canvas-sunk" />
                <ul className="flex list-none flex-col gap-4 font-mono text-base leading-[1.8] text-ink sm:text-[18px]">
                  {letter.sections["Adjustment"].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-lg leading-none text-accent-gold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {letter.sections["Looking Ahead"] && (
              <div className="flex flex-col gap-4">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-gold">
                  Looking Ahead
                </h2>
                <div className="mb-2 h-px w-full bg-canvas-sunk" />
                <p className="whitespace-pre-line font-mono text-base leading-[1.8] text-ink sm:text-[18px]">
                  {letter.sections["Looking Ahead"]}
                </p>
              </div>
            )}
          </div>

          {/* Byline, immediately above the closing navigation. */}
          <div className="mt-16">
            <Byline variant="full" />
            <div className="mt-6 h-px w-full bg-rule" />
          </div>

          {/* 4. Previous/Next Navigation */}
          <div className="select-none pt-8">
            <span className="mb-6 block text-center font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
              RESEARCH ARCHIVE
            </span>

            <div className="flex items-center justify-between font-mono text-xs text-accent-gold">
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

            <div className="mt-8 text-center">
              <Link href="/letters" className="font-mono text-[11px] text-ink-muted hover:text-ink link-underline">
                &larr; Back to the archive
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

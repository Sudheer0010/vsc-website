import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { letterHref } from "@/lib/letter-urls";
import { formatLongDate } from "@/lib/format-date";

/**
 * The canonical subscribe destination — where LinkedIn posts and every
 * other off-site link point. The three most recent letters do the selling:
 * a reader can judge quality by reading two real sentences before handing
 * over an email address, rather than being told the letter is good.
 */

const PAGE_DESCRIPTION =
  "A monthly letter on what the market did, what the process observed, and what surprised us.";

export const metadata: Metadata = {
  title: "VSC Market Letter | VSC Capital & Advisory",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/letter" },
  openGraph: {
    type: "website",
    url: "/letter",
    title: "VSC Market Letter",
    description: PAGE_DESCRIPTION,
  },
};

/** First `count` sentences of a field — a safe excerpt even if a future letter's copy runs long. */
function firstSentences(text: string, count: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+(\s+|$)/g);
  if (!sentences) return text;
  return sentences.slice(0, count).join("").trim();
}

function LetterExcerptCard({ monthKey }: { monthKey: string }) {
  const letter = marketLetters[monthKey];
  const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();
  const excerpt = firstSentences(letter.sections.marketBehavior, 2);

  return (
    <Link
      href={letterHref(monthKey)}
      className="group flex h-full flex-col rounded-vsc-lg border border-rule bg-surface p-6 transition-colors duration-200 hover:border-growth/40 sm:p-7"
    >
      <div className="border-b border-rule pb-4">
        <span className="block font-display text-xl font-medium text-ink transition-colors duration-200 group-hover:text-growth-deep">
          {monthName} {letter.year}
        </span>
        <span className="mt-1 block font-mono text-[11px] text-ink-faint">
          Letter {String(letter.letterNumber).padStart(3, "0")} · {formatLongDate(letter.publishedDate)}
        </span>
      </div>

      <p className="mt-4 font-display text-[17px] font-normal leading-snug text-ink">
        {letter.thesis}
      </p>

      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">{excerpt}</p>

      <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-growth">
        Read the full letter
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-physical group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function WhatArrives() {
  const items = [
    "Each month's Market Letter on the first working day",
    "Research Notes as they're published (2–4 per month)",
    "Framework revisions when they happen",
  ];

  return (
    <div>
      <p className="text-[17px] font-medium text-ink">Subscribers receive:</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-soft">
            <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-growth" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[15px] text-ink-muted">
        That&apos;s it. Roughly 3–5 emails per month.
      </p>
    </div>
  );
}

export default function LetterPage() {
  const recentMonths = sortedMonths.slice(0, 3);

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <PaperGrain />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container mx-auto max-w-[1120px] px-4 sm:px-6">
          <header className="mx-auto max-w-[560px] text-center">
            <h1 className="font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
              VSC Market Letter
            </h1>
            <p className="mt-4 text-[18px] leading-relaxed text-ink-soft">{PAGE_DESCRIPTION}</p>
          </header>

          <section className="mt-16 sm:mt-20">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {recentMonths.map((key) => (
                <LetterExcerptCard key={key} monthKey={key} />
              ))}
            </div>
          </section>

          <section className="mx-auto mt-16 max-w-[560px] border-t border-rule pt-16 sm:mt-20 sm:pt-20">
            <EmailCapture />
          </section>

          <section className="mx-auto mt-16 max-w-[560px] border-t border-rule pt-16 sm:mt-20 sm:pt-20">
            <WhatArrives />
          </section>
        </div>
      </main>
    </div>
  );
}

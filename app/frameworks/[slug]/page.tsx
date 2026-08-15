import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { frameworkLibrary } from "@/data/frameworks";
import { marketLetters } from "@/data/market-letters";
import { frameworkHref, frameworkVersionHref, currentVersion } from "@/lib/framework-urls";
import { letterHref } from "@/lib/letter-urls";
import { ArrowLeft } from "lucide-react";
import { MarketEnvironmentFramework } from "@/components/sections/frameworks/MarketEnvironmentFramework";
import { OpportunityUniverseFramework } from "@/components/sections/frameworks/OpportunityUniverseFramework";
import { SetupGradingFramework } from "@/components/sections/frameworks/SetupGradingFramework";
import { SizingFramework } from "@/components/sections/frameworks/SizingFramework";
import { TradeManagementFramework } from "@/components/sections/frameworks/TradeManagementFramework";

interface FrameworkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return frameworkLibrary.map((fw) => ({ slug: fw.slug }));
}

export async function generateMetadata({ params }: FrameworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const fw = frameworkLibrary.find((f) => f.slug === slug);
  if (!fw) return {};

  if (fw.slug === "opportunity-universe") {
    const title = "Opportunity Universe — Framework 02 | VSC Capital";
    const description =
      "A systematic process for reducing a universe of 2,000 stocks into a focused watchlist of 20–40 names worthy of further study.";
    const canonical = frameworkHref(fw);
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { type: "article", title, description, url: canonical },
    };
  }

  if (fw.slug === "setup-grading") {
    const title = "Setup Grading — Framework 03 | VSC Capital";
    const description =
      "A three-layer decision architecture for deciding which trading setups deserve capital: eligibility, integrity, then quality ranking.";
    const canonical = frameworkHref(fw);
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { type: "article", title, description, url: canonical },
    };
  }

  if (fw.slug === "sizing") {
    const title = "Sizing — Framework 04 | VSC Capital";
    const description =
      "Three questions determine position size: can I afford the risk, does the setup deserve the capital, and is there room in the portfolio.";
    const canonical = frameworkHref(fw);
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { type: "article", title, description, url: canonical },
    };
  }

  if (fw.slug === "trade-management") {
    const title = "Trade Management — Framework 05 | VSC Capital";
    const description =
      "What happens after capital is committed: when stops move, when positions grow, when they shrink, and when the trade ends.";
    const canonical = frameworkHref(fw);
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { type: "article", title, description, url: canonical },
    };
  }

  const title = `${fw.title} | Framework Library | VSC Capital & Advisory`;
  const description = fw.desc;
  const canonical = frameworkHref(fw);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { type: "article", title, description, url: canonical },
  };
}

export default async function FrameworkPage({ params }: FrameworkPageProps) {
  const { slug } = await params;
  const fw = frameworkLibrary.find((f) => f.slug === slug);
  if (!fw) notFound();

  // Market Environment has real content — prose, tables, five inline-SVG
  // exhibits — a different shape from the generic "body: string" template
  // below, which the other four frameworks still use while unwritten.
  if (fw.slug === "market-environment") {
    return <MarketEnvironmentFramework />;
  }
  if (fw.slug === "opportunity-universe") {
    return <OpportunityUniverseFramework />;
  }
  if (fw.slug === "setup-grading") {
    return <SetupGradingFramework />;
  }
  if (fw.slug === "sizing") {
    return <SizingFramework />;
  }
  if (fw.slug === "trade-management") {
    return <TradeManagementFramework />;
  }

  const current = currentVersion(fw);

  const jsonLd = fw.body
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: fw.title,
        description: fw.desc,
        author: { "@type": "Person", name: "Sudheer Vobhilineni" },
        publisher: { "@type": "Organization", name: "VSC Capital & Advisory" },
      }
    : null;

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <ReadingProgress />
      <PaperGrain />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/research#framework-library"
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Research
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
              {fw.primaryTopic}
            </span>
            {fw.category && (
              <span className="font-mono text-[10px] text-ink-faint bg-canvas-sunk px-2.5 py-0.5 rounded-full border border-rule">
                {fw.category}
              </span>
            )}
          </div>

          <h1 className="mb-4 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
            {fw.title}
          </h1>

          <p className="mb-12 max-w-[60ch] text-[18px] leading-relaxed text-ink-soft">
            {fw.desc}
          </p>

          {fw.body ? (
            <p className="whitespace-pre-line font-mono text-base leading-[1.8] text-ink sm:text-[18px]">
              {fw.body}
            </p>
          ) : (
            <div className="rounded-xl border border-rule bg-canvas-sunk px-6 py-8 text-center">
              <p className="font-mono text-sm font-semibold text-ink-soft">Full write-up in progress</p>
              <p className="mt-2 font-mono text-xs text-ink-faint">
                The summary above is live; the complete framework hasn&apos;t been published yet.
              </p>
            </div>
          )}

          {fw.appliedInLetters.length > 0 && (
            <div className="mt-16 border-t border-rule pt-8">
              <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-accent-gold">
                Applied in
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-ink">
                {fw.appliedInLetters.map((monthKey, i) => {
                  const letter = marketLetters[monthKey];
                  if (!letter) return null;
                  const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();
                  return (
                    <span key={monthKey}>
                      {i > 0 && <span className="mr-4 text-ink-faint">·</span>}
                      <Link href={letterHref(monthKey)} className="text-growth link-underline">
                        Letter {String(letter.letterNumber).padStart(3, "0")} ({monthName} {letter.year})
                      </Link>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Revision history (§6.1) — the change note is the point, not
              the version number. */}
          {fw.versions.length > 0 && (
            <div className="mt-16 border-t border-rule pt-8">
              <h2 className="mb-6 font-mono text-xs font-semibold uppercase tracking-wider text-accent-gold">
                Revision history
              </h2>
              <div className="flex flex-col gap-6">
                {[...fw.versions].reverse().map((v) => {
                  const isCurrent = current !== null && v.version === current.version;
                  return (
                    <div key={v.version} className="flex flex-col gap-1">
                      <div className="font-mono text-sm font-semibold text-ink">
                        Version {v.version}
                        {v.year ? ` · ${v.year}` : ""}
                        {isCurrent ? " · current" : ""}
                      </div>
                      <p className="max-w-[60ch] font-mono text-sm leading-relaxed text-ink-soft">
                        {v.changeNote}
                      </p>
                      {!isCurrent && (
                        <Link
                          href={frameworkVersionHref(fw, v.version)}
                          className="mt-1 font-mono text-xs text-growth hover:underline"
                        >
                          View this version →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-16 border-t border-rule pt-8">
            <EmailCapture context="Frameworks are revised as the market teaches us something. Subscribers get the revision and the reason." />
          </div>
        </div>
      </main>
    </div>
  );
}

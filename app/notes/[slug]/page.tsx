import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { Byline } from "@/components/ui/vsc/Byline";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { articles } from "@/data/research";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles
    .filter((a) => a.type === "RESEARCH NOTE" && a.published !== false)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = articles.find((a) => a.slug === slug && a.type === "RESEARCH NOTE" && a.published !== false);
  if (!note) return {};

  const title = `${note.title} | Trading Insights | VSC Capital & Advisory`;
  const description = note.description;
  const canonical = `/notes/${note.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { type: "article", title, description, url: canonical },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = articles.find((a) => a.slug === slug && a.type === "RESEARCH NOTE" && a.published !== false);
  if (!note) notFound();

  const related = (note.relatedSlugs ?? [])
    .map((s) => articles.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => !!a);

  const jsonLd = note.body
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: note.title,
        description: note.description,
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
            href="/notes"
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Trading Insights
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
              {note.primaryTopic ?? note.category}
            </span>
            <span className="font-mono text-[10px] text-ink-faint">{note.publishedDate}</span>
          </div>

          <h1 className="mb-4 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
            {note.title}
          </h1>

          <p className="mb-12 max-w-[60ch] text-[18px] leading-relaxed text-ink-soft">
            {note.description}
          </p>

          {note.body ? (
            <p className="whitespace-pre-line font-mono text-base leading-[1.8] text-ink sm:text-[18px]">
              {note.body}
            </p>
          ) : (
            <div className="rounded-xl border border-rule bg-canvas-sunk px-6 py-8 text-center">
              <p className="font-mono text-sm font-semibold text-ink-soft">Full note in progress</p>
              <p className="mt-2 font-mono text-xs text-ink-faint">
                The summary above is live; the complete note hasn&apos;t been published yet.
              </p>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-16 border-t border-rule pt-8">
              <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-accent-gold">
                Related
              </h2>
              <div className="flex flex-col gap-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/notes/${r.slug}`} className="font-mono text-sm text-growth link-underline">
                    {r.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16">
            <Byline variant="full" />
            <div className="mt-6 h-px w-full bg-rule" />
          </div>
        </div>
      </main>
    </div>
  );
}

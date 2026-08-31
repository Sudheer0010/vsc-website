import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { ResearchNoteTemplate } from "@/components/sections/research-notes/ResearchNoteTemplate";
import { researchNotes } from "@/data/research-notes";
import { OG_IMAGES } from "@/lib/seo";

interface ResearchNotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return researchNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: ResearchNotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = researchNotes.find((n) => n.slug === slug);
  if (!note) return {};

  const canonical = `/research/notes/${note.slug}`;

  return {
    title: note.seo.title,
    description: note.seo.description,
    alternates: { canonical },
    openGraph: {
      images: OG_IMAGES,
      type: "article",
      title: note.seo.title,
      description: note.seo.description,
      url: canonical,
    },
  };
}

export default async function ResearchNotePage({ params }: ResearchNotePageProps) {
  const { slug } = await params;
  const index = researchNotes.findIndex((n) => n.slug === slug);
  if (index === -1) notFound();

  const note = researchNotes[index];
  const prevNote = index > 0 ? researchNotes[index - 1] : null;
  const nextNote = index < researchNotes.length - 1 ? researchNotes[index + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.seo.description,
    author: { "@type": "Person", name: "Sudheer Vobhilineni" },
    publisher: { "@type": "Organization", name: "VSC Capital & Advisory" },
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
        <ResearchNoteTemplate note={note} prevNote={prevNote} nextNote={nextNote} />
      </main>
    </div>
  );
}

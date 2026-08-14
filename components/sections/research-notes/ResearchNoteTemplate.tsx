import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ResearchNote } from "@/data/research-notes";
import { ImageLightbox } from "@/components/ui/vsc/ImageLightbox";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";

/**
 * One market behaviour, one chart, one limit — shared shell for every
 * Research Note so a new note only ever means adding a data entry, not a
 * new page. Body copy is the site's body face throughout (Instrument
 * Sans); mono is reserved for the eyebrow, section labels, meta line, and
 * the chart caption, matching the treatment already established on the
 * Market Letter pages.
 */

function paragraphs(lines: string[]) {
  return lines.map((line, i) => (
    <p key={i}>{line}</p>
  ));
}

function NoteSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {label}
        </span>
        <div className="mt-3 h-px w-full bg-rule" />
      </div>
      <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}

interface ResearchNoteTemplateProps {
  note: ResearchNote;
  prevNote: ResearchNote | null;
  nextNote: ResearchNote | null;
}

export function ResearchNoteTemplate({ note, prevNote, nextNote }: ResearchNoteTemplateProps) {
  const hasAdjacentNotes = Boolean(prevNote || nextNote);

  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6">
      <Link
        href="/research/notes"
        className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        Back to Research Notes
      </Link>

      {/* Header */}
      <header className="mb-10 select-none">
        <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Research Note {note.number} · {note.category}
        </span>
        <h1 className="mb-4 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
          {note.title}
        </h1>
        <p className="mb-4 max-w-[60ch] text-[18px] leading-relaxed text-ink-soft">
          {note.subtitle}
        </p>
        <div className="font-mono text-xs text-ink-faint">
          Published {note.publishedDate} · {note.readingTime}
        </div>
      </header>

      {/* Thesis — the one line impossible to scroll past */}
      <div className="mb-12 border-l-[3px] border-growth bg-growth-tint py-6 pl-6 pr-6 sm:py-8 sm:pl-8 sm:pr-8">
        <p className="text-[19px] font-medium leading-snug text-growth-deep sm:text-[20px]">
          {note.thesis}
        </p>
      </div>

      <div className="flex flex-col gap-14 text-left">
        <NoteSection label="The claim">{paragraphs(note.claim)}</NoteSection>

        <NoteSection label="Why it happens">{paragraphs(note.whyItHappens)}</NoteSection>

        <NoteSection label="The evidence">
          <div>
            <div className="flex min-h-[200px] items-center justify-center rounded-vsc-lg border border-rule bg-canvas-sunk p-6 sm:min-h-[300px]">
              {note.evidence.chartImage ? (
                <ImageLightbox
                  src={note.evidence.chartImage}
                  alt={note.evidence.chartAlt}
                  width={1886}
                  height={758}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-center font-mono text-xs text-ink-faint">
                  <p>[Chart image placeholder]</p>
                  {note.evidence.chartPlaceholderLabel.map((line, i) => (
                    <p key={i} className="mt-1">{line}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-2 text-sm italic leading-relaxed text-ink-faint">
              {paragraphs(note.evidence.captionParagraphs)}
            </div>
          </div>
          {paragraphs(note.evidence.afterChartProse)}
        </NoteSection>

        <NoteSection label="What it doesn't tell you">
          <div className="flex flex-col gap-4 border-l-[3px] border-clay bg-clay-tint py-6 pl-6 pr-6 text-[17px] leading-relaxed text-ink-soft sm:py-7 sm:pl-7 sm:pr-7">
            {paragraphs(note.whatItDoesntTellYou)}
          </div>
        </NoteSection>

        <NoteSection label="Where it feeds">
          <Link
            href={note.whereItFeeds.frameworkHref}
            className="group inline-flex items-center gap-2 font-semibold text-growth transition-colors hover:text-growth-deep"
          >
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            {note.whereItFeeds.frameworkLabel}
          </Link>
          <p className="text-[15px] text-ink-soft">{note.whereItFeeds.description}</p>
        </NoteSection>

        <EmailCapture context="This note is part of an ongoing research series." />
      </div>

      {/* Footer */}
      <div className="select-none pt-16">
        <div className="h-px w-full bg-rule" />
        <span className="mb-6 mt-10 block font-mono text-xs text-ink-faint">
          Published {note.publishedDate}
        </span>

        {hasAdjacentNotes && (
          <div className="mb-8 flex items-center justify-between font-mono text-xs text-growth">
            <div>
              {prevNote ? (
                <Link href={`/research/notes/${prevNote.slug}`} className="transition-colors duration-200 hover:text-ink">
                  &larr; {prevNote.title}
                </Link>
              ) : (
                <span className="text-ink-faint">&larr; End of Archive</span>
              )}
            </div>
            <div>
              {nextNote ? (
                <Link href={`/research/notes/${nextNote.slug}`} className="transition-colors duration-200 hover:text-ink">
                  {nextNote.title} &rarr;
                </Link>
              ) : (
                <span className="text-ink-faint">Latest Note</span>
              )}
            </div>
          </div>
        )}

        <Link href="/research/notes" className="font-mono text-[11px] text-ink-muted hover:text-ink link-underline">
          &larr; Back to Research Notes
        </Link>
      </div>
    </div>
  );
}

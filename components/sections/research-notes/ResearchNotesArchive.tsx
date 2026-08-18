import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResearchNote } from "@/data/research-notes";

/**
 * Compact editorial cards in a 2-up grid — meta line, title, thesis, and a
 * small read affordance, sized to hold their content without stretching
 * into a fixed tall box. Built to hold dozens of cards without the grid
 * turning into a wall of padding.
 */
export function ResearchNotesArchive({ notes }: { notes: ResearchNote[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {notes.map((note) => (
        <Link
          key={note.slug}
          href={`/research/notes/${note.slug}`}
          className="group flex flex-col justify-between gap-3 rounded-vsc-lg border border-rule bg-canvas-sunk p-5 transition-colors duration-200 hover:border-growth/40 sm:p-6"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              <span>Insight {note.number} · {note.category}</span>
              <span className="font-normal normal-case tracking-normal text-ink-faint">
                {note.publishedDate}
              </span>
            </div>

            <h2 className="text-[17px] font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-growth">
              {note.title}
            </h2>

            <p className="line-clamp-3 text-[14px] leading-relaxed text-ink-muted">
              {note.thesis}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-growth">
            Read insight
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}

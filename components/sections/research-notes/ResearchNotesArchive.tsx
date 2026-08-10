import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResearchNote } from "@/data/research-notes";

/**
 * One card per row, full width — not a grid. A note's thesis line is the
 * whole reason to click through, and a multi-column grid would truncate
 * it into an unreadable fragment. Built to hold dozens of rows without
 * changing shape.
 */
export function ResearchNotesArchive({ notes }: { notes: ResearchNote[] }) {
  return (
    <div className="flex flex-col gap-6">
      {notes.map((note) => (
        <Link key={note.slug} href={`/research/notes/${note.slug}`} className="group block">
          <div className="rounded-vsc-lg border border-rule bg-canvas-sunk p-6 transition-colors duration-200 group-hover:border-growth/40 sm:p-8">
            <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {note.number} · {note.category}
            </div>

            <h2 className="mb-2 text-[19px] font-semibold text-ink sm:text-[20px]">
              {note.title}
            </h2>

            <p className="mb-6 max-w-[62ch] text-[16px] leading-relaxed text-ink-muted">
              {note.thesis}
            </p>

            <div className="flex items-center justify-between border-t border-rule pt-4">
              <span className="font-mono text-[11px] text-ink-faint">
                Published {note.publishedDate}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-growth">
                Read note
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

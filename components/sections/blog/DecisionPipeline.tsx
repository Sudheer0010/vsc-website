import { Framework } from "@/types/framework";
import { ExpandablePipeline } from "@/components/sections/frameworks/ExpandablePipeline";

interface DecisionPipelineProps {
  frameworkLibrary: Framework[];
}

/**
 * The old static pipeline diagram plus five framework cards below it
 * repeated the same information — both showed number, title, and
 * question, with the cards adding only a status badge and a link. Now a
 * single interactive `ExpandablePipeline` carries both jobs: collapsed, it
 * reads as the sequence diagram; expanding a node reveals what the card
 * used to show, in place.
 */
export function DecisionPipeline({ frameworkLibrary }: DecisionPipelineProps) {
  return (
    <section className="py-24 border-t border-rule">
      {/* 1a — Hero */}
      <div className="mb-16 max-w-[640px] select-none">
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Evergreen systems
        </span>
        <h1 className="mb-5 font-display text-3xl font-normal leading-[1.2] text-ink md:text-[38px]">
          The VSC Decision Pipeline
        </h1>
        <p className="max-w-[56ch] text-[17px] leading-relaxed text-ink-soft">
          Five frameworks, in order. Each one answers one question. The
          output of each becomes the input for the next.
        </p>
      </div>

      {/* 1b — Expandable pipeline */}
      <div className="mb-20">
        <ExpandablePipeline frameworkLibrary={frameworkLibrary} />
      </div>

      {/* 1c — Closing line */}
      <p className="mt-14 max-w-[60ch] font-mono text-sm leading-relaxed text-ink-faint">
        Each framework is versioned and dated. When a framework changes,
        the old version stays reachable and the page says what changed
        and why.
      </p>
    </section>
  );
}

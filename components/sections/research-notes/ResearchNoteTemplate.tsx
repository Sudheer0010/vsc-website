import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ResearchNote } from "@/data/research-notes";
import { ImageLightbox } from "@/components/ui/vsc/ImageLightbox";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { AnimatedMetric } from "@/components/ui/vsc/AnimatedMetric";

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

function StyleVsInstrumentBlock({ data }: { data: NonNullable<ResearchNote["styleVsInstrument"]> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-vsc-lg border border-rule bg-canvas-sunk p-5 sm:p-6">
        <span className="mb-3 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Trading style
        </span>
        <ul className="flex flex-col gap-2.5">
          {data.styleItems.map((item) => (
            <li key={item.label} className="flex items-baseline justify-between gap-3 text-[16px]">
              <span className="font-semibold text-ink">{item.label}</span>
              <span className="text-right text-ink-muted">{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-vsc-lg border border-rule bg-canvas-sunk p-5 sm:p-6">
        <span className="mb-3 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Trading instrument
        </span>
        <ul className="flex flex-col gap-2.5">
          {data.instrumentItems.map((item) => (
            <li key={item} className="text-[16px] font-semibold text-ink">{item}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 text-[16px] leading-relaxed text-ink-soft sm:col-span-2">
        {data.bridgeParagraphs.map((line, i) => (
          <p key={i}>{line}</p>
        ))}

        <div className="mt-1 flex flex-col gap-4 sm:flex-row">
          <div className="border-l-2 border-rule-strong pl-4 sm:w-1/2">
            <span className="mb-1 block text-[13px] font-semibold text-ink-faint">Not the right question</span>
            <p className="text-ink-muted">&ldquo;{data.wrongQuestion}&rdquo;</p>
          </div>
          <div className="border-l-2 border-growth pl-4 sm:w-1/2">
            <span className="mb-1 block text-[13px] font-semibold text-growth">Ask instead</span>
            {data.rightQuestions.map((q, i) => (
              <p key={i} className="font-medium text-ink">&ldquo;{q}&rdquo;</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalExperienceBlock({ data }: { data: NonNullable<ResearchNote["personalExperience"]> }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-normal text-ink">{data.heading}</h2>

      <div className="flex flex-col gap-3 text-[16px] leading-relaxed text-ink-soft">
        {data.intro.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[13px] text-ink-faint">
        {data.chain.map((step, i) => (
          <span key={step} className="inline-flex items-center gap-2">
            {i > 0 && <ArrowRight className="h-3 w-3 shrink-0" aria-hidden="true" />}
            {step}
          </span>
        ))}
      </div>

      <p className="text-[16px] leading-relaxed text-ink-soft">{data.bridge}</p>

      <blockquote className="border-l-2 border-growth-deep pl-5 font-display text-[22px] font-medium italic leading-snug text-ink sm:text-[24px]">
        &ldquo;{data.pullQuote}&rdquo;
      </blockquote>

      <div className="flex flex-col gap-3 text-[16px] leading-relaxed text-ink-soft">
        {data.outro.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </section>
  );
}

function StatCards({ note }: { note: ResearchNote }) {
  const cards = note.statCards;
  if (!cards) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.sourceLabel}
            className="flex flex-col gap-3 rounded-vsc-lg border border-rule bg-canvas-sunk p-5 sm:p-6"
          >
            <AnimatedMetric
              value={card.stat}
              className="font-display text-[36px] font-semibold leading-none text-growth-deep sm:text-[40px]"
            />
            <p className="text-[15px] leading-relaxed text-ink-soft">{card.text}</p>
            <a
              href={card.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-growth transition-colors hover:text-growth-deep"
            >
              {card.sourceLabel}
              {" "}study &rarr;
            </a>
          </div>
        ))}
      </div>

      {note.statCardsNote && (
        <div className="flex flex-col gap-2 text-[16px] leading-relaxed text-ink-soft">
          {note.statCardsNote.map((line, i) => (
            <p key={i} className={i === 0 ? "font-semibold text-ink" : undefined}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionSection({ data }: { data: NonNullable<ResearchNote["actionSection"]> }) {
  return (
    <section className="flex flex-col gap-6 rounded-vsc-lg border border-growth/30 bg-growth-wash p-6 sm:p-8">
      <div>
        <h2 className="mb-2 font-display text-2xl font-normal text-ink sm:text-[28px]">{data.heading}</h2>
        <p className="text-[16px] leading-relaxed text-ink-soft">{data.subheading}</p>
      </div>

      <div className="flex flex-col gap-3 text-[16px] leading-relaxed text-ink-soft">
        {data.intro.map((line, i) => (
          <p key={i}>{line}</p>
        ))}

        <div>
          <p className="mb-2 font-semibold text-ink">{data.labelInstruction}</p>
          <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-6">
            {data.labelFields.map((field) => (
              <p key={field.label} className="font-mono text-[13px] text-ink-muted">
                <span className="font-semibold text-ink">{field.label}:</span> {field.options}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-rule border-t border-rule">
        {data.auditItems.map((item) => (
          <div key={item.number} className="flex gap-4 py-4">
            <span className="font-mono text-[13px] font-semibold text-growth">{item.number}</span>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                {item.label}
              </span>
              <p className="text-[16px] leading-snug text-ink">{item.question}</p>
              {item.examples && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {item.examples.map((ex) => (
                    <span
                      key={ex}
                      className="rounded-full border border-rule-strong bg-surface px-2.5 py-1 text-[12px] text-ink-muted"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PatternDiagnosis({ data }: { data: NonNullable<ResearchNote["patternDiagnosis"]> }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-display text-2xl font-normal text-ink">{data.heading}</h2>

      <div className="flex flex-col gap-4">
        {data.examples.map((ex, i) => (
          <div key={i} className="rounded-vsc-lg border border-rule bg-canvas-sunk p-5 sm:p-6">
            <p className="mb-2 text-[16px] leading-relaxed text-ink-soft">{ex.observation}</p>
            <p className="font-semibold text-growth-deep">{ex.conclusion}</p>
          </div>
        ))}
      </div>

      <div className="border-l-[3px] border-growth bg-growth-tint py-6 pl-6 pr-6 sm:py-7 sm:pl-7 sm:pr-7">
        <p className="text-[19px] font-medium leading-snug text-growth-deep sm:text-[20px]">{data.emphasis}</p>
      </div>
    </section>
  );
}

function NextActionBlock({ data }: { data: NonNullable<ResearchNote["nextAction"]> }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-normal text-ink">{data.heading}</h2>
      <ol className="flex flex-col gap-2.5 text-[17px] leading-relaxed text-ink-soft">
        {data.steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="font-mono text-[13px] font-semibold text-ink-faint">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="font-medium text-ink">{data.emphasis}</p>
    </section>
  );
}

function FinalTakeaway({ data }: { data: NonNullable<ResearchNote["finalTakeaway"]> }) {
  return (
    <section className="flex flex-col gap-6 border-t border-rule pt-10 text-center sm:pt-12">
      <div className="mx-auto flex max-w-[46ch] flex-col gap-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Don&apos;t ask
        </span>
        <p className="text-[18px] text-ink-muted line-through decoration-1 decoration-ink-faint">
          &ldquo;{data.avoidQuestion}&rdquo;
        </p>
        <span className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
          Ask
        </span>
        <p className="font-display text-[26px] font-medium leading-snug text-ink sm:text-[30px]">
          &ldquo;{data.askQuestion}&rdquo;
        </p>
      </div>
      <div className="flex flex-col gap-1 text-[17px] font-medium text-ink-soft">
        {data.closing.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </section>
  );
}

function CaseStudyBlock({ data }: { data: NonNullable<ResearchNote["caseStudy"]> }) {
  return (
    <section className="rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-8">
      <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        Case Study
      </span>
      <h2 className="mt-2 font-display text-2xl font-normal text-ink sm:text-[26px]">{data.heading}</h2>

      <div className="mt-4 flex flex-col gap-3 text-[16px] leading-relaxed text-ink-soft">
        {data.intro.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {data.metrics.map((m) => (
          <div key={m.name} className="rounded-vsc-lg border border-rule bg-surface p-5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-ink">{m.name}</span>
              <span className="font-mono text-[12px] text-ink-faint">{m.detail}</span>
            </div>
            <div className="mt-2 font-display text-3xl font-semibold tracking-tight text-clay">{m.drawdown}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 text-[16px] leading-relaxed text-ink-soft">
        {data.outro.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <blockquote className="mt-6 border-l-2 border-growth-deep pl-4 font-display text-[20px] font-medium italic leading-snug text-ink sm:text-[22px]">
        &ldquo;{data.pullQuote}&rdquo;
      </blockquote>
    </section>
  );
}

function ReferencePointsBlock({ data }: { data: NonNullable<ResearchNote["referencePoints"]> }) {
  return (
    <section className="flex flex-col gap-5">
      <div>
        <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Price Structure
        </span>
        <div className="mt-3 h-px w-full bg-rule" />
      </div>

      <div>
        <h2 className="font-display text-2xl font-normal text-ink sm:text-[26px]">{data.heading}</h2>
        <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">{data.intro}</p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-3">
        {data.cards.map((card) => (
          <div key={card.title} className="flex flex-col rounded-vsc-lg border border-rule bg-surface p-5 shadow-lift-1">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-growth">
              {card.tag}
            </span>
            <h3 className="mt-2 font-display text-[18px] font-semibold leading-snug text-ink">{card.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{card.body}</p>
          </div>
        ))}
      </div>

      {data.chart && (
        <figure className="rounded-vsc-xl border border-rule bg-surface p-5 shadow-lift-1 sm:p-6">
          <div className="overflow-hidden rounded-vsc-lg border border-rule bg-surface">
            <ImageLightbox
              src={data.chart.image}
              alt={data.chart.alt}
              width={data.chart.width}
              height={data.chart.height}
              className="mx-auto h-auto max-h-[360px] w-full object-contain"
            />
          </div>
          <figcaption className="mt-4 flex flex-col gap-1.5 border-t border-rule pt-3">
            <span className="text-[14px] font-medium text-ink-soft">{data.chart.caption}</span>
            <span className="text-[14px] font-semibold text-growth">{data.chart.takeaway}</span>
          </figcaption>
        </figure>
      )}
    </section>
  );
}

function RallyVsUptrendBlock({ data }: { data: NonNullable<ResearchNote["rallyVsUptrend"]> }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-display text-2xl font-normal text-ink sm:text-[26px]">{data.heading}</h2>

      <div className="overflow-hidden rounded-vsc-xl border border-rule bg-surface">
        <div className="grid grid-cols-2 border-b border-rule text-[12px] font-semibold uppercase tracking-[0.12em]">
          <div className="bg-clay-tint/70 px-4 py-3 font-mono text-clay sm:px-6">{data.leftTitle}</div>
          <div className="border-l border-rule bg-growth-wash px-4 py-3 font-mono text-growth-deep sm:px-6">
            {data.rightTitle}
          </div>
        </div>
        <div className="divide-y divide-rule">
          {data.rows.map((row) => (
            <div key={row.left} className="grid grid-cols-2 text-[14.5px] leading-snug sm:text-[15.5px]">
              <div className="px-4 py-3.5 text-ink-soft sm:px-6">{row.left}</div>
              <div className="border-l border-rule px-4 py-3.5 font-medium text-ink sm:px-6">{row.right}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[16px] font-semibold text-ink">{data.takeaway}</p>
    </section>
  );
}

function RepairChecklistBlock({ data }: { data: NonNullable<ResearchNote["repairChecklist"]> }) {
  return (
    <section className="flex flex-col gap-5 rounded-vsc-xl border border-growth/25 bg-growth-wash p-6 sm:p-8">
      <div>
        <h2 className="font-display text-2xl font-normal text-ink sm:text-[26px]">{data.heading}</h2>
        <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{data.intro}</p>
      </div>

      <ol className="divide-y divide-growth/15 border-y border-growth/15">
        {data.items.map((item, i) => (
          <li key={item} className="flex items-baseline gap-3.5 py-3 text-[15.5px] leading-snug text-ink">
            <span className="shrink-0 font-mono text-[12px] font-semibold tabular-nums text-growth">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      <p className="text-[15px] leading-relaxed text-ink-soft">{data.confirmationNote}</p>
      <p className="text-[16px] font-semibold leading-snug text-growth-deep">{data.closing}</p>
    </section>
  );
}

function SourcesList({ sources }: { sources: NonNullable<ResearchNote["sources"]> }) {
  return (
    <section className="flex flex-col gap-4 border-t border-rule pt-8">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        Sources
      </span>
      <ul className="flex flex-col gap-4">
        {sources.map((source) => (
          <li key={source.href} className="text-[14px] leading-relaxed text-ink-muted">
            <span className="block font-semibold text-ink-soft">{source.author}</span>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-ink-muted hover:text-growth"
            >
              {source.title}
            </a>
          </li>
        ))}
      </ul>
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
        className="group mb-8 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        Back to Trading Insights
      </Link>

      {/* Header */}
      <header className="mb-10 select-none">
        <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Trading Insight {note.number} · {note.category}
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

      {/* Compact hero copy — no section label, this is the opening, not a research section */}
      {note.openingParagraphs && (
        <div className="mb-8 flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
          {paragraphs(note.openingParagraphs)}
        </div>
      )}

      {/* Thesis — the one line impossible to scroll past */}
      <div className="mb-12 border-l-[3px] border-growth bg-growth-tint py-6 pl-6 pr-6 sm:py-8 sm:pl-8 sm:pr-8">
        <p className="text-[19px] font-medium leading-snug text-growth-deep sm:text-[20px]">
          {note.thesis}
        </p>
      </div>

      <div className="flex flex-col gap-10 text-left sm:gap-12">
        {note.claim && <NoteSection label="The claim">{paragraphs(note.claim)}</NoteSection>}

        {note.whyItHappens && (
          <NoteSection label="Why it happens">{paragraphs(note.whyItHappens)}</NoteSection>
        )}

        {note.caseStudy && <CaseStudyBlock data={note.caseStudy} />}

        {note.referencePoints && <ReferencePointsBlock data={note.referencePoints} />}

        {note.rallyVsUptrend && <RallyVsUptrendBlock data={note.rallyVsUptrend} />}

        {note.repairChecklist && <RepairChecklistBlock data={note.repairChecklist} />}

        {note.styleVsInstrument && <StyleVsInstrumentBlock data={note.styleVsInstrument} />}

        {note.personalExperience && <PersonalExperienceBlock data={note.personalExperience} />}

        {note.evidence && (
          <NoteSection label="The evidence">
            <div>
              <div className="flex min-h-[200px] items-center justify-center rounded-vsc-lg border border-rule bg-canvas-sunk p-6 sm:min-h-[300px]">
                {note.evidence.chartImage ? (
                  <ImageLightbox
                    src={note.evidence.chartImage}
                    alt={note.evidence.chartAlt}
                    width={note.evidence.chartWidth ?? 1886}
                    height={note.evidence.chartHeight ?? 758}
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
        )}

        {note.statCards && <StatCards note={note} />}

        {note.actionSection && <ActionSection data={note.actionSection} />}

        {note.patternDiagnosis && <PatternDiagnosis data={note.patternDiagnosis} />}

        {note.nextAction && <NextActionBlock data={note.nextAction} />}

        {note.whatItDoesntTellYou && (
          <NoteSection label="What it doesn't tell you">
            <div className="flex flex-col gap-4 border-l-[3px] border-clay bg-clay-tint py-6 pl-6 pr-6 text-[17px] leading-relaxed text-ink-soft sm:py-7 sm:pl-7 sm:pr-7">
              {paragraphs(note.whatItDoesntTellYou)}
            </div>
          </NoteSection>
        )}

        {note.finalTakeaway && <FinalTakeaway data={note.finalTakeaway} />}

        {note.whereItFeeds && (
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
        )}

        {note.sources && <SourcesList sources={note.sources} />}

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
                <Link
                  href={`/research/notes/${prevNote.slug}`}
                  className="-my-[14px] inline-flex min-h-[44px] items-center py-[14px] transition-colors duration-200 hover:text-ink"
                >
                  &larr; {prevNote.title}
                </Link>
              ) : (
                <span className="text-ink-faint">&larr; End of Archive</span>
              )}
            </div>
            <div>
              {nextNote ? (
                <Link
                  href={`/research/notes/${nextNote.slug}`}
                  className="-my-[14px] inline-flex min-h-[44px] items-center py-[14px] transition-colors duration-200 hover:text-ink"
                >
                  {nextNote.title}
                  {" "}&rarr;
                </Link>
              ) : (
                <span className="text-ink-faint">Latest Note</span>
              )}
            </div>
          </div>
        )}

        <Link
          href="/research/notes"
          className="-my-[15px] inline-flex min-h-[44px] items-center py-[15px] font-mono text-[11px] text-ink-muted hover:text-ink link-underline"
        >
          &larr; Back to Trading Insights
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";
import {
  MarketLetter,
  StatusColour,
  ArrowDirection,
  MarketEnvironmentValue,
} from "@/types/market-letter";
import { AnimatedMetric } from "@/components/ui/vsc/AnimatedMetric";
import { formatLongDate } from "@/lib/format-date";

const MONTHS_FULL = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

function toTitleCase(word: string): string {
  return word.charAt(0) + word.slice(1).toLowerCase();
}

/** The calendar month following this letter's — used only for the Zone 7
 *  "Looking into {month}" heading, never for any data lookup. */
function nextMonthLabel(month: string): string {
  const index = MONTHS_FULL.indexOf(month.toUpperCase());
  if (index === -1) return "next month";
  return toTitleCase(MONTHS_FULL[(index + 1) % 12]);
}

// ---------------------------------------------------------------------------
// Status / direction visual language
//
// The dictionary's rating system is three states (green / amber / red), but
// the site's palette only defines two semantic colours (growth-green,
// clay-red) plus neutral ink/canvas tones — its one existing three-state
// precedent (the Market Environment framework page) already resolves this
// by rendering the middle state in neutral grey rather than inventing an
// orange token, and this reuses that same convention rather than adding a
// new brand colour for one section.
// ---------------------------------------------------------------------------

const STATUS_STYLES: Record<StatusColour, { dot: string; text: string }> = {
  green: { dot: "bg-growth", text: "text-growth" },
  amber: { dot: "bg-ink-faint", text: "text-ink-faint" },
  red: { dot: "bg-clay", text: "text-clay" },
};

function StatusDot({ status }: { status: StatusColour }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${STATUS_STYLES[status].dot}`}
    />
  );
}

const ARROW_STYLES: Record<ArrowDirection, { symbol: string; text: string; label: string }> = {
  up: { symbol: "↑", text: "text-growth", label: "improved" },
  down: { symbol: "↓", text: "text-clay", label: "deteriorated" },
  flat: { symbol: "→", text: "text-ink-faint", label: "unchanged" },
  rerated: { symbol: "↔", text: "text-ink-faint", label: "re-rated" },
};

function ArrowMark({ direction }: { direction: ArrowDirection }) {
  const style = ARROW_STYLES[direction];
  return (
    <span className={`font-mono text-[13px] font-semibold ${style.text}`} title={style.label} aria-hidden="true">
      {style.symbol}
    </span>
  );
}

/** Chip tone for the header's market-regime tag — reuses existing tint
 *  tokens (growth-tint / clay-tint) rather than a dedicated chip palette. */
function regimeToneClasses(label: MarketEnvironmentValue): string {
  switch (label) {
    case "Favourable":
    case "Constructive":
      return "border-growth/25 bg-growth-tint text-growth-deep";
    case "Defensive":
      return "border-clay/25 bg-clay-tint text-clay";
    case "Cautious":
    case "Neutral":
    default:
      return "border-rule bg-canvas-sunk text-ink-soft";
  }
}

function RegimeTag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}

function ZoneHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
      {children}
    </span>
  );
}

function SignedPercent({ value, suffix }: { value: number; suffix: string }) {
  const positive = value >= 0;
  return (
    <span className={`font-mono text-[12px] font-medium ${positive ? "text-growth" : "text-clay"}`}>
      {positive ? "▲" : "▼"} {positive ? "+" : ""}
      {value.toFixed(2)}% {suffix}
    </span>
  );
}

/** Section 01, collapsed into Zone 1 — thesis merges into the header, no
 *  standalone pale-green quote box (removed per Spec v4). */
function MonthInGlance({ letter, readTime }: { letter: MarketLetter; readTime: number }) {
  const monthName = toTitleCase(letter.month);
  const paddedNumber = String(letter.letterNumber).padStart(3, "0");
  const regime = letter.overallEnvironment!.label;
  const tag3 = `${letter.playbook!.exposure.toUpperCase()} EXPOSURE`;

  const metaParts: string[] = [`Letter ${paddedNumber}`];
  metaParts.push(letter.dataThrough ? `Data through ${formatLongDate(letter.dataThrough)}` : `Published ${formatLongDate(letter.publishedDate)}`);
  if (letter.revisedDate) metaParts.push(`Revised ${formatLongDate(letter.revisedDate)}`);
  metaParts.push(`${readTime} min read`);

  return (
    <header className="mb-10 select-none text-center">
      <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
        {monthName} {letter.year} &mdash; Market Letter {paddedNumber}
      </span>
      <h1 className="mb-4 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
        {letter.thesis}
      </h1>
      {letter.subThesis && (
        <p className="mx-auto mb-6 max-w-[52ch] text-[17px] leading-relaxed text-ink-soft">{letter.subThesis}</p>
      )}
      <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
        <RegimeTag className={regimeToneClasses(regime)}>{regime}</RegimeTag>
        {letter.regimeTagEditorial && (
          <RegimeTag className="border-rule bg-canvas-sunk text-ink-soft">{letter.regimeTagEditorial}</RegimeTag>
        )}
        <RegimeTag className="border-rule bg-canvas-sunk text-ink-soft">{tag3}</RegimeTag>
      </div>
      <div className="font-mono text-xs text-ink-faint">{metaParts.join(" · ")}</div>
    </header>
  );
}

/** Section 02. */
function MarketSnapshotZone({ letter }: { letter: MarketLetter }) {
  return (
    <section className="flex flex-col gap-5">
      <ZoneHeading>Market Snapshot</ZoneHeading>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {letter.marketSnapshot!.map((row) => (
          <div
            key={row.asset}
            className="flex flex-col items-center gap-2 rounded-vsc-lg border border-rule bg-surface p-5 text-center"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
              {row.asset}
            </span>
            <span className="font-display text-xl font-medium text-ink">{row.monthEnd}</span>
            <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <SignedPercent value={row.mtdPct} suffix="MTD" />
              <SignedPercent value={row.ytdPct} suffix="YTD" />
            </span>
            <span className="font-mono text-[11px] font-semibold text-growth">{row.read}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Section 03. Panel is capped narrower than the article column (~820px)
 *  and rows use a fixed-track grid rather than flex+justify-between, so
 *  factor/status/read stay visually grouped instead of spreading to the
 *  row's full width. */
function MarketHealthZone({ letter }: { letter: MarketLetter }) {
  const overall = letter.overallEnvironment!;
  return (
    <section className="flex flex-col gap-5">
      <ZoneHeading>Market Health</ZoneHeading>
      <div className="mx-auto w-full max-w-[820px] rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-8">
        <div className="flex flex-col">
          {letter.marketHealth!.map((row, i) => (
            <div
              key={row.factor}
              className={`flex flex-col gap-1.5 py-4 sm:grid sm:grid-cols-[9rem_auto_1fr] sm:items-baseline sm:gap-x-6 ${
                i > 0 ? "border-t border-rule" : ""
              }`}
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                {row.factor}
              </span>
              <div className="flex items-baseline gap-2">
                <StatusDot status={row.status} />
                <p className="text-[16px] font-medium text-ink">{row.current}</p>
                <ArrowMark direction={row.vsPrev} />
              </div>
              <p className="font-mono text-[12px] text-ink-muted">{row.vscRead}</p>
            </div>
          ))}

          <div className="flex flex-col gap-1.5 border-t-2 border-rule-strong py-4 sm:grid sm:grid-cols-[9rem_auto_1fr] sm:items-baseline sm:gap-x-6">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink">
              Overall
            </span>
            <div className="flex items-baseline gap-2">
              <p className="font-display text-[17px] font-medium text-ink">{overall.label}</p>
              <ArrowMark direction={overall.vsPrev} />
            </div>
            <p className="font-mono text-[12px] text-ink-muted">{overall.vscRead}</p>
          </div>
          {letter.environmentOverride && (
            <p className="pt-1 font-mono text-[11px] italic text-ink-muted">
              Overall re-rated from {letter.environmentOverride.from} to {letter.environmentOverride.to} &mdash;{" "}
              {letter.environmentOverride.reason}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/** Section 04. Entirely derived from current + previous letter — nothing
 *  about the comparison itself is stored except the editorial `netChange`
 *  line. Renders nothing if the previous letter hasn't migrated yet. */
function WhatChangedZone({
  letter,
  previousLetter,
  previousMonthName,
  currentMonthName,
}: {
  letter: MarketLetter;
  previousLetter: MarketLetter | null;
  previousMonthName: string;
  currentMonthName: string;
}) {
  if (!previousLetter?.marketHealth || !letter.marketHealth) return null;

  const prevRisk = previousLetter.vscRead?.riskAllocation;
  const currRisk = letter.vscRead?.riskAllocation;

  return (
    <section className="flex flex-col gap-5">
      <ZoneHeading>What Changed</ZoneHeading>

      <div className="mx-auto flex w-full max-w-[740px] flex-col gap-5">
        <div className="rounded-vsc-xl border border-rule bg-surface p-6 sm:p-8">
          <div className="flex flex-col">
            <span className="mb-1 text-center font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
              {previousMonthName} &rarr; {currentMonthName}
            </span>
            {letter.marketHealth.map((row) => {
              const prevRow = previousLetter.marketHealth!.find((p) => p.factor === row.factor);
              return (
                <div
                  key={row.factor}
                  className="grid grid-cols-[7rem_1fr_1.25rem_1fr] items-baseline gap-x-2 border-t border-rule py-2.5 first:border-t-0 sm:grid-cols-[8rem_1fr_1.5rem_1fr] sm:gap-x-3"
                >
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                    {row.factor}
                  </span>
                  <span className="text-[15px] text-ink-soft">{prevRow?.current ?? "—"}</span>
                  <span className="text-center font-mono text-[13px] text-ink-faint" aria-hidden="true">
                    &rarr;
                  </span>
                  <span className="text-[15px] font-medium text-ink">{row.current}</span>
                </div>
              );
            })}
          </div>

          {prevRisk && currRisk && (
            <p className="mt-5 border-t border-rule pt-4 text-center font-mono text-[12px] text-ink-soft">
              VSC posture: <span className="font-semibold text-ink">{prevRisk}</span> &rarr;{" "}
              <span className="font-semibold text-ink">{currRisk}</span>
            </p>
          )}
        </div>

        {letter.netChange && <p className="text-[16px] leading-relaxed text-ink-soft">{letter.netChange}</p>}
      </div>
    </section>
  );
}

/** Sections 05 + 06 collapsed — one heading, one flow. The chart (if any)
 *  renders directly beneath the four blocks with no separate heading; if
 *  absent, the zone simply ends after the blocks. */
function WhatHappenedZone({ letter }: { letter: MarketLetter }) {
  const blocks = [
    { label: "Index", ...letter.whatHappened!.index },
    { label: "Breadth", ...letter.whatHappened!.breadth },
    { label: "Leadership", ...letter.whatHappened!.leadership },
    { label: "Flows / Risk", ...letter.whatHappened!.flowsRisk },
  ];

  return (
    <section className="flex flex-col gap-6">
      <ZoneHeading>What Happened</ZoneHeading>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
        {blocks.map((block) => (
          <div key={block.label} className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
              {block.label}
            </span>
            <p className="text-[16px] font-semibold leading-snug text-ink">{block.headline}</p>
            <p className="text-[15px] leading-relaxed text-ink-soft">{block.explanation}</p>
          </div>
        ))}
      </div>

      {letter.chart && (
        <div className="flex flex-col gap-3 pt-2">
          <span className="font-mono text-[11px] text-ink-faint">{letter.chart.title}</span>
          <div className="overflow-hidden rounded-vsc-lg border border-rule">
            <Image
              src={letter.chart.image}
              alt={letter.chart.title}
              width={1200}
              height={675}
              className="h-auto w-full"
            />
          </div>
          <p className="font-medium text-growth text-[15px] leading-relaxed">What matters: {letter.chart.caption}</p>
        </div>
      )}
    </section>
  );
}

/** A tight label/value row for VscViewZone's action rows — a fixed
 *  label width keeps values close to their labels (one relationship, not
 *  two pieces of text at opposite ends of a wide row) while still lining
 *  values up down the table. */
function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-x-5 border-t border-rule py-2.5 first:border-t-0">
      <span className="w-[9.5rem] shrink-0 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
        {label}
      </span>
      <span className="min-w-0 flex-1 text-[16px] font-semibold text-ink">{value}</span>
    </div>
  );
}

/** Sections 07 + 08 collapsed into one diagnosis-then-action read. Diagnosis
 *  renders as three scannable chips (reusing the header's RegimeTag look,
 *  not a new visual language); action renders as four tight rows derived
 *  from the Playbook fields — riskAllocation, tradeFrequency and
 *  primaryObjective stay in the data model but are not surfaced here.
 *  Constrained to a narrower, centred column (rather than the article's
 *  full width) so this reads as VSC's reasoning column, not a spreadsheet
 *  spanning the page. */
function VscViewZone({ letter }: { letter: MarketLetter }) {
  const read = letter.vscRead!;
  const playbook = letter.playbook!;
  const regime = letter.overallEnvironment!.label;

  const actionRows: [string, string][] = [
    ["Positioning", `${playbook.exposure} exposure · ${playbook.positionSize.trim().split(/\s+/).join("-")} sizing`],
    ["Preferred", playbook.preferredSetup],
    ["Avoid", playbook.avoided],
    ["Increase risk when", playbook.triggerToIncreaseRisk.replace(/\s+and\s+/gi, " + ")],
  ];

  return (
    <section className="flex flex-col gap-5">
      <ZoneHeading>VSC View</ZoneHeading>

      <div className="mx-auto flex w-full max-w-[540px] flex-col gap-5">
        <div className="flex flex-wrap justify-center gap-2">
          <RegimeTag className={regimeToneClasses(regime)}>{regime}</RegimeTag>
          <RegimeTag className="border-rule bg-canvas-sunk text-ink-soft">{read.opportunityUniverse}</RegimeTag>
          <RegimeTag className="border-rule bg-canvas-sunk text-ink-soft">{read.setupQuality} setups</RegimeTag>
        </div>

        <div className="flex flex-col">
          {actionRows.map(([label, value]) => (
            <DataRow key={label} label={label} value={value} />
          ))}
        </div>

        <p className="text-center font-display text-[19px] font-medium italic leading-snug text-growth-deep">
          {read.conclusion}
        </p>
      </div>
    </section>
  );
}

/** Sections 09 + 10 collapsed — this month's reflection and next month's
 *  forward frame close the letter as one conversation. Never renders
 *  capital deployed, exact rupee P&L, win rate, profit factor, or
 *  best/worst day — only monthlyReturn %, trades, and exposure. */
function MonthAndNextZone({ letter }: { letter: MarketLetter }) {
  const review = letter.monthInReview!;
  const watching = letter.watchingNext!;
  const monthName = toTitleCase(letter.month);
  const isNegative = review.monthlyReturn.trim().startsWith("-");

  return (
    <section className="flex flex-col gap-7">
      <ZoneHeading>VSC &mdash; {monthName}</ZoneHeading>

      <div className="grid grid-cols-3 gap-4 border-b border-rule pb-7">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <AnimatedMetric
            value={review.monthlyReturn}
            className={`font-display text-2xl font-semibold sm:text-3xl ${isNegative ? "text-clay" : "text-growth"}`}
          />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
            Monthly Return
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <AnimatedMetric value={String(review.trades)} className="font-display text-2xl font-semibold text-ink sm:text-3xl" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Trades</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="font-display text-xl font-medium text-ink sm:text-2xl">{letter.playbook!.exposure}</span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Exposure</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-[16px] leading-relaxed text-ink-soft">
        <p><span className="font-semibold text-ink">Worked:</span> {review.worked}</p>
        <p><span className="font-semibold text-ink">Didn&apos;t:</span> {review.didnt}</p>
        <p><span className="font-semibold text-ink">Lesson:</span> {review.lesson}</p>
      </div>

      <div className="flex items-center gap-3 text-ink-faint">
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
          Looking into {nextMonthLabel(letter.month)}
        </span>
        <span className="h-px flex-1 bg-rule" />
      </div>

      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5">
        <div className="flex flex-col gap-2.5">
          {watching.conditions.map((c, i) => (
            <div key={i} className="grid grid-cols-2 items-baseline gap-x-4 font-mono text-[13px]">
              <span className="text-ink-soft">If {c.if}</span>
              <span className="text-right text-growth">&rarr; {c.then}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-[16px] font-medium text-ink">Current stance: {watching.currentStance}</p>
      </div>
    </section>
  );
}

export function MarketLetterV4({
  letter,
  previousLetter,
  previousMonthKey,
  readTime,
}: {
  letter: MarketLetter;
  previousLetter: MarketLetter | null;
  previousMonthKey: string | null;
  readTime: number;
}) {
  return (
    <div className="flex flex-col gap-14">
      <MonthInGlance letter={letter} readTime={readTime} />
      <MarketSnapshotZone letter={letter} />
      <MarketHealthZone letter={letter} />
      <WhatChangedZone
        letter={letter}
        previousLetter={previousLetter}
        previousMonthName={previousMonthKey ? toTitleCase(previousLetter?.month ?? "") : ""}
        currentMonthName={toTitleCase(letter.month)}
      />
      <WhatHappenedZone letter={letter} />
      <VscViewZone letter={letter} />
      <MonthAndNextZone letter={letter} />
    </div>
  );
}

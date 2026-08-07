import React from "react";
import { Check, ArrowDown } from "lucide-react";

/**
 * Four exhibits for the Setup Grading framework page. The hero (the three
 * layers) is inline SVG — a genuine branching diagram where relative
 * position carries meaning. The other three are HTML/CSS cards, following
 * the precedent set on Frameworks 01 and 02 (the Framework Snapshot card,
 * the exclusion chips, the framework-comparison cards): text-heavy content
 * that needs to reflow on mobile reads better as real HTML than as SVG
 * text, which doesn't wrap.
 */

const MONO = "var(--font-mono)";
const UI = "var(--font-ui)";

/* ------------------------------------------------------------------ */
/* 1. The Three Layers — hero. Desktop: a staircase SVG matching the    */
/*    brief's diagram exactly. Mobile: a linear HTML stack — the exit    */
/*    boxes (Discard/Skip) are visually smaller and clay-toned with no   */
/*    outgoing arrow, so "dead end" reads from styling rather than from  */
/*    a side-by-side branch that doesn't fit a narrow screen.            */
/* ------------------------------------------------------------------ */

function ThreeLayersDesktop() {
  const width = 700;
  const l1 = { x: 20, y: 20, w: 660, h: 64 };
  const discard = { x: 20, y: 124, w: 140, h: 60 };
  const l2 = { x: 190, y: 124, w: 490, h: 76 };
  const skip = { x: 190, y: 240, w: 140, h: 60 };
  const l3 = { x: 360, y: 240, w: 320, h: 92 };
  const grade = { x: 360, y: 368, w: 320, h: 64 };
  const height = grade.y + grade.h + 20;

  const cx = (b: { x: number; w: number }) => b.x + b.w / 2;
  const bottom = (b: { y: number; h: number }) => b.y + b.h;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="three-layers-title three-layers-desc"
      width="100%"
      style={{ height: "auto" }}
      className="hidden sm:block"
    >
      <title id="three-layers-title">The three-layer setup grading architecture.</title>
      <desc id="three-layers-desc">
        Layer 1, Eligibility, asks whether this is a setup I trade. If no, the candidate
        is discarded — not a setup. If yes, it proceeds to Layer 2, Integrity, which asks
        whether it satisfies its own non-negotiable rules. If it fails, it is skipped —
        also not a setup. If it passes, it proceeds to Layer 3, Quality, which scores five
        dimensions to produce a grade of A, B, C, or no allocation today.
      </desc>

      <defs>
        <marker id="arrowhead-layers" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--rule-strong)" />
        </marker>
      </defs>

      {/* Layer 1 */}
      <rect x={l1.x} y={l1.y} width={l1.w} height={l1.h} rx={8} fill="var(--canvas-sunk)" stroke="var(--rule)" />
      <text x={l1.x + 20} y={l1.y + 26} style={{ font: `700 12px ${MONO}`, fill: "var(--ink)", letterSpacing: "0.04em" }}>
        LAYER 1 — ELIGIBILITY
      </text>
      <text x={l1.x + 20} y={l1.y + 48} style={{ font: `400 15px ${UI}`, fill: "var(--ink-soft)" }}>
        Is this a setup I trade?
      </text>

      {/* L1 -> Discard / Layer 2 connectors */}
      <line x1={cx(discard)} y1={bottom(l1)} x2={cx(discard)} y2={discard.y} stroke="var(--rule-strong)" strokeWidth={1.5} markerEnd="url(#arrowhead-layers)" />
      <line x1={cx(l2)} y1={bottom(l1)} x2={cx(l2)} y2={l2.y} stroke="var(--rule-strong)" strokeWidth={1.5} markerEnd="url(#arrowhead-layers)" />
      <text x={cx(discard)} y={(bottom(l1) + discard.y) / 2 + 4} textAnchor="middle" style={{ font: `700 10px ${MONO}`, fill: "var(--ink-faint)", letterSpacing: "0.06em" }}>NO</text>
      <text x={cx(l2)} y={(bottom(l1) + l2.y) / 2 + 4} textAnchor="middle" style={{ font: `700 10px ${MONO}`, fill: "var(--ink-faint)", letterSpacing: "0.06em" }}>YES</text>

      {/* Discard */}
      <rect x={discard.x} y={discard.y} width={discard.w} height={discard.h} rx={6} fill="var(--clay-tint)" />
      <text x={cx(discard)} y={discard.y + 24} textAnchor="middle" style={{ font: `700 11px ${MONO}`, fill: "var(--clay)", letterSpacing: "0.04em" }}>DISCARD</text>
      <text x={cx(discard)} y={discard.y + 42} textAnchor="middle" style={{ font: `400 10px ${MONO}`, fill: "var(--clay)" }}>Not a setup</text>

      {/* Layer 2 */}
      <rect x={l2.x} y={l2.y} width={l2.w} height={l2.h} rx={8} fill="var(--canvas-sunk)" stroke="var(--rule)" />
      <text x={l2.x + 20} y={l2.y + 26} style={{ font: `700 12px ${MONO}`, fill: "var(--ink)", letterSpacing: "0.04em" }}>
        LAYER 2 — INTEGRITY
      </text>
      <text x={l2.x + 20} y={l2.y + 48} style={{ font: `400 15px ${UI}`, fill: "var(--ink-soft)" }}>
        Does it satisfy its non-negotiable rules?
      </text>

      {/* L2 -> Skip / Layer 3 connectors */}
      <line x1={cx(skip)} y1={bottom(l2)} x2={cx(skip)} y2={skip.y} stroke="var(--rule-strong)" strokeWidth={1.5} markerEnd="url(#arrowhead-layers)" />
      <line x1={cx(l3)} y1={bottom(l2)} x2={cx(l3)} y2={l3.y} stroke="var(--rule-strong)" strokeWidth={1.5} markerEnd="url(#arrowhead-layers)" />
      <text x={cx(skip)} y={(bottom(l2) + skip.y) / 2 + 4} textAnchor="middle" style={{ font: `700 10px ${MONO}`, fill: "var(--ink-faint)", letterSpacing: "0.06em" }}>FAIL</text>
      <text x={cx(l3)} y={(bottom(l2) + l3.y) / 2 + 4} textAnchor="middle" style={{ font: `700 10px ${MONO}`, fill: "var(--ink-faint)", letterSpacing: "0.06em" }}>PASS</text>

      {/* Skip */}
      <rect x={skip.x} y={skip.y} width={skip.w} height={skip.h} rx={6} fill="var(--clay-tint)" />
      <text x={cx(skip)} y={skip.y + 24} textAnchor="middle" style={{ font: `700 11px ${MONO}`, fill: "var(--clay)", letterSpacing: "0.04em" }}>SKIP</text>
      <text x={cx(skip)} y={skip.y + 42} textAnchor="middle" style={{ font: `400 10px ${MONO}`, fill: "var(--clay)" }}>Not a setup</text>

      {/* Layer 3 — the destination, green-tinted with a left border */}
      <rect x={l3.x} y={l3.y} width={l3.w} height={l3.h} rx={8} fill="var(--growth-tint)" />
      <rect x={l3.x} y={l3.y} width={4} height={l3.h} fill="var(--growth)" />
      <text x={l3.x + 20} y={l3.y + 26} style={{ font: `700 12px ${MONO}`, fill: "var(--growth)", letterSpacing: "0.04em" }}>
        LAYER 3 — QUALITY
      </text>
      <text x={l3.x + 20} y={l3.y + 48} style={{ font: `400 15px ${UI}`, fill: "var(--ink)" }}>
        How good is this instance?
      </text>
      <text x={l3.x + 20} y={l3.y + 70} style={{ font: `400 13px ${MONO}`, fill: "var(--ink-faint)" }}>
        Score 5 dimensions.
      </text>

      {/* L3 -> Grade */}
      <line x1={cx(l3)} y1={bottom(l3)} x2={cx(grade)} y2={grade.y} stroke="var(--rule-strong)" strokeWidth={1.5} markerEnd="url(#arrowhead-layers)" />

      {/* Grade */}
      <rect x={grade.x} y={grade.y} width={grade.w} height={grade.h} rx={8} fill="var(--growth)" />
      <text x={cx(grade)} y={grade.y + 28} textAnchor="middle" style={{ font: `700 14px ${MONO}`, fill: "var(--canvas)", letterSpacing: "0.06em" }}>
        GRADE
      </text>
      <text x={cx(grade)} y={grade.y + 48} textAnchor="middle" style={{ font: `600 13px ${MONO}`, fill: "var(--canvas)" }}>
        A · B · C · Unfunded
      </text>
    </svg>
  );
}

function MobileLayerBox({
  layer,
  name,
  question,
  detail,
  active,
}: {
  layer: string;
  name: string;
  question: string;
  detail?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-vsc-lg p-5 ${active ? "border-l-[3px] bg-growth-tint" : "border border-rule bg-canvas-sunk"}`}
      style={active ? { borderLeftColor: "var(--growth)" } : undefined}
    >
      <span
        className="block font-mono text-[11px] font-semibold uppercase tracking-[0.06em]"
        style={{ color: active ? "var(--growth)" : "var(--ink)" }}
      >
        Layer {layer} — {name}
      </span>
      <p className="mt-1.5 text-[14px] text-ink-soft">{question}</p>
      {detail && <p className="mt-1 font-mono text-[12px] text-ink-faint">{detail}</p>}
    </div>
  );
}

function MobileBranchRow({
  yes,
  yesLabel,
  no,
  noLabel,
}: {
  yes: string;
  yesLabel: string;
  no: string;
  noLabel: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-vsc-md bg-clay-tint px-3 py-2.5">
        <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-clay">{noLabel}</span>
        <span className="mt-0.5 block font-mono text-[11px] text-clay">{no}</span>
      </div>
      <div className="rounded-vsc-md border border-rule px-3 py-2.5">
        <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">{yesLabel}</span>
        <span className="mt-0.5 block font-mono text-[11px] text-ink-soft">{yes}</span>
      </div>
    </div>
  );
}

function ThreeLayersMobile() {
  return (
    <div className="flex flex-col gap-3 sm:hidden">
      <MobileLayerBox layer="1" name="Eligibility" question="Is this a setup I trade?" />
      <MobileBranchRow noLabel="NO" no="Discard — not a setup" yesLabel="YES" yes="Continue" />
      <MobileLayerBox layer="2" name="Integrity" question="Does it satisfy its non-negotiable rules?" />
      <MobileBranchRow noLabel="FAIL" no="Skip — not a setup" yesLabel="PASS" yes="Continue" />
      <MobileLayerBox active layer="3" name="Quality" question="How good is this instance?" detail="Score 5 dimensions." />
      <div className="flex justify-center py-1" aria-hidden="true">
        <ArrowDown className="h-4 w-4 text-ink-faint" />
      </div>
      <div className="rounded-vsc-lg bg-growth p-5 text-center">
        <span className="block font-mono text-[13px] font-bold uppercase tracking-[0.06em] text-canvas">Grade</span>
        <span className="mt-1 block font-mono text-[12px] font-semibold text-canvas">A · B · C · Unfunded</span>
      </div>
    </div>
  );
}

export function ThreeLayersExhibit() {
  return (
    <>
      <ThreeLayersDesktop />
      <ThreeLayersMobile />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 2. The Integrity Gates — five pass/fail cards, HTML not SVG: this is */
/*    a card grid, not a spatial diagram, so it needs real reflow.      */
/* ------------------------------------------------------------------ */

const GATES: { name: string; desc: string }[] = [
  { name: "Setup Definition", desc: "The pattern's defining conditions are present" },
  { name: "Relative Strength", desc: "Minimum strength versus the index is present" },
  { name: "Volume", desc: "Minimum participation at the trigger" },
  { name: "Risk", desc: "Stop distance is within acceptable limits" },
  { name: "Market Regime", desc: "The environment supports this setup type" },
];

export function IntegrityGatesExhibit() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {GATES.map((gate) => (
        <div key={gate.name} className="relative rounded-vsc-lg border border-rule bg-canvas-sunk p-5">
          <Check className="absolute right-4 top-4 h-3.5 w-3.5 text-growth" strokeWidth={3} aria-hidden="true" />
          <span className="block pr-6 font-mono text-[12px] font-bold uppercase tracking-wide text-ink">
            {gate.name}
          </span>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-faint">{gate.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. The Quality Scorecard — the scoring instrument itself, and the    */
/*    grade badge it shares with the "What The Grades Mean" section.    */
/* ------------------------------------------------------------------ */

export type Grade = "A" | "B" | "C" | null;

export function GradeBadge({ grade }: { grade: Grade }) {
  if (grade === "A") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-growth font-mono text-[13px] font-bold text-canvas">
        A
      </span>
    );
  }
  if (grade === "B") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-growth-tint font-mono text-[13px] font-bold text-growth">
        B
      </span>
    );
  }
  if (grade === "C") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule bg-canvas-sunk font-mono text-[13px] font-bold text-ink">
        C
      </span>
    );
  }
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center font-mono text-[11px] font-semibold text-ink-faint">
      —
    </span>
  );
}

const SCORECARD_DIMENSIONS = [
  "Trend Quality",
  "Structure Quality",
  "Relative Strength Quality",
  "Volume Quality",
  "Opportunity Quality",
];

const GRADE_THRESHOLDS: { range: string; grade: Grade; label: string }[] = [
  { range: "9–10", grade: "A", label: "Exceptional — allocate first" },
  { range: "7–8", grade: "B", label: "Strong — tradable" },
  { range: "5–6", grade: "C", label: "Acceptable — only when scarce" },
  { range: "< 5", grade: null, label: "Valid setup, no allocation today" },
];

export function QualityScorecardExhibit() {
  return (
    <div className="rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[13px] font-bold uppercase tracking-[0.06em] text-ink">
          Quality Scorecard
        </span>
        <span className="font-mono text-[11px] italic text-ink-faint">
          (only reached after Layers 1 and 2 pass)
        </span>
      </div>

      <div className="flex flex-col">
        {SCORECARD_DIMENSIONS.map((dim, i) => (
          <div
            key={dim}
            className={`flex items-center justify-between py-3 ${i > 0 ? "border-t border-rule" : ""}`}
          >
            <span className="text-[15px] text-ink">{dim}</span>
            <span className="font-mono text-[13px] tracking-[0.2em] text-ink-faint">0 · 1 · 2</span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t-2 border-rule-strong py-3">
        <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-ink">Total</span>
        <span className="font-mono text-[13px] font-semibold text-ink-faint">/ 10</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-rule pt-5">
        {GRADE_THRESHOLDS.map((t) => (
          <div key={t.label} className="flex items-center gap-4">
            <span className="w-12 shrink-0 font-mono text-[12px] font-semibold text-ink-faint">{t.range}</span>
            <GradeBadge grade={t.grade} />
            <span className="text-[14px] text-ink-soft">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Two Rejections — a side-by-side contrast, HTML cards.             */
/* ------------------------------------------------------------------ */

export function TwoRejectionsExhibit() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="rounded-vsc-lg border border-clay/25 bg-clay-tint p-6 sm:p-7">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
          Gate Failure
        </span>
        <p className="mt-4 text-[16px] font-medium text-ink">Relative strength negative.</p>
        <div className="mt-4 flex flex-col gap-1.5 text-[14px] leading-relaxed text-ink-faint">
          <p>Not a setup.</p>
          <p>Does not enter the ranking.</p>
          <p>Nothing to reconsider.</p>
        </div>
      </div>

      <div className="rounded-vsc-lg border border-rule bg-canvas-sunk p-6 sm:p-7">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Low Score
        </span>
        <p className="mt-4 text-[16px] font-medium text-ink">
          Every gate passed.
          <br />
          Total score: 4.
        </p>
        <div className="mt-4 flex flex-col gap-1.5 text-[14px] leading-relaxed text-ink-faint">
          <p>A valid setup that lost to better opportunities today.</p>
          <p>May grade higher next week.</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { ArrowDown, RotateCcw } from "lucide-react";

/**
 * Four exhibits for the Trade Management framework page. Exhibits 1 and 4
 * are genuine spatial diagrams (a branching lifecycle, a return loop) so
 * they're inline SVG with an HTML fallback for narrow screens, matching
 * the split used for Framework 03's hero and Framework 04's convergence
 * diagram. Exhibits 2 and 3 are card/list content — HTML, same call made
 * throughout this series.
 */

const MONO = "var(--font-mono)";
const UI = "var(--font-ui)";

/* ------------------------------------------------------------------ */
/* 1. The Trade Lifecycle — hero. Three phases in sequence; two modes    */
/*    branching in parallel from Manage, never from each other.         */
/* ------------------------------------------------------------------ */

function TradeLifecycleDesktop() {
  const width = 700;
  const colW = 200;
  const gap = 30;
  const colX = (i: number) => 20 + i * (colW + gap);
  const centerX = (i: number) => colX(i) + colW / 2;

  const row1Y = 20;
  const row1H = 84;
  const row1Bottom = row1Y + row1H;

  const branchStemBottom = row1Bottom + 26;
  const modeW = 220;
  const protectX = centerX(1) - 25 - modeW; // left of Manage's center
  const compoundX = centerX(1) + 25;
  const protectCx = protectX + modeW / 2;
  const compoundCx = compoundX + modeW / 2;
  const modeY = branchStemBottom + 22;
  const modeH = 130;
  const modeBottom = modeY + modeH;

  const ruleY = modeBottom + 26;
  const noteY = ruleY + 30;
  const height = noteY + 16;

  const PHASES = [
    { name: "COMMIT", lines: ["Capital moves.", "Risk becomes real."] },
    { name: "MANAGE", lines: ["Two modes."] },
    { name: "EXIT", lines: ["Thesis ends."] },
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="lifecycle-title lifecycle-desc"
      width="100%"
      style={{ height: "auto" }}
      className="hidden sm:block"
    >
      <title id="lifecycle-title">The trade lifecycle: commit, manage, exit.</title>
      <desc id="lifecycle-desc">
        Three phases in sequence. Commit: capital moves and risk becomes real. Manage: two
        modes. Exit: the thesis ends. Inside Manage, two parallel modes branch downward,
        never into each other. Protect: reduce risk when conditions turn or reward no
        longer justifies it. Compound: add capital when the market has already proven the
        thesis correct. The default state beneath both modes is unchanged.
      </desc>

      <defs>
        <marker id="arrowhead-lifecycle" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--rule-strong)" />
        </marker>
      </defs>

      {/* Row 1 — Commit / Manage / Exit */}
      {PHASES.map((phase, i) => (
        <g key={phase.name}>
          <rect x={colX(i)} y={row1Y} width={colW} height={row1H} rx={8} fill="var(--canvas-sunk)" stroke="var(--rule)" />
          <text x={centerX(i)} y={row1Y + 28} textAnchor="middle" style={{ font: `700 14px ${MONO}`, fill: "var(--ink)", letterSpacing: "0.04em" }}>
            {phase.name}
          </text>
          {phase.lines.map((line, li) => (
            <text
              key={line}
              x={centerX(i)}
              y={row1Y + 50 + li * 16}
              textAnchor="middle"
              style={{ font: `400 12px ${UI}`, fill: "var(--ink-faint)" }}
            >
              {line}
            </text>
          ))}
          {i < PHASES.length - 1 && (
            <line
              x1={colX(i) + colW}
              y1={row1Y + row1H / 2}
              x2={colX(i + 1)}
              y2={row1Y + row1H / 2}
              stroke="var(--rule-strong)"
              strokeWidth={1.5}
              markerEnd="url(#arrowhead-lifecycle)"
            />
          )}
        </g>
      ))}

      {/* Branch stem from Manage down to the split */}
      <line
        x1={centerX(1)} y1={row1Bottom} x2={centerX(1)} y2={branchStemBottom}
        stroke="var(--rule-strong)" strokeWidth={1.5}
      />
      <line
        x1={protectCx} y1={branchStemBottom} x2={compoundCx} y2={branchStemBottom}
        stroke="var(--rule-strong)" strokeWidth={1.5}
      />
      <line
        x1={protectCx} y1={branchStemBottom} x2={protectCx} y2={modeY}
        stroke="var(--rule-strong)" strokeWidth={1.5}
      />
      <line
        x1={compoundCx} y1={branchStemBottom} x2={compoundCx} y2={modeY}
        stroke="var(--rule-strong)" strokeWidth={1.5}
      />

      {/* Protect */}
      <text x={protectCx} y={modeY - 6} textAnchor="middle" style={{ font: `700 14px ${MONO}`, fill: "var(--clay)" }}>▼</text>
      <rect x={protectX} y={modeY} width={modeW} height={modeH} rx={8} fill="var(--clay-tint)" />
      <text x={protectCx} y={modeY + 24} textAnchor="middle" style={{ font: `700 13px ${MONO}`, fill: "var(--clay)", letterSpacing: "0.04em" }}>
        PROTECT
      </text>
      {["Reduce risk when", "conditions turn or reward", "no longer justifies it"].map((line, li) => (
        <text key={line} x={protectCx} y={modeY + 48 + li * 17} textAnchor="middle" style={{ font: `400 11px ${UI}`, fill: "var(--ink-soft)" }}>
          {line}
        </text>
      ))}

      {/* Compound */}
      <text x={compoundCx} y={modeY - 6} textAnchor="middle" style={{ font: `700 14px ${MONO}`, fill: "var(--growth)" }}>▲</text>
      <rect x={compoundX} y={modeY} width={modeW} height={modeH} rx={8} fill="var(--growth-tint)" />
      <text x={compoundCx} y={modeY + 24} textAnchor="middle" style={{ font: `700 13px ${MONO}`, fill: "var(--growth)", letterSpacing: "0.04em" }}>
        COMPOUND
      </text>
      {["Add capital when the", "market has already proven", "the thesis correct"].map((line, li) => (
        <text key={line} x={compoundCx} y={modeY + 48 + li * 17} textAnchor="middle" style={{ font: `400 11px ${UI}`, fill: "var(--ink-soft)" }}>
          {line}
        </text>
      ))}

      {/* Default state */}
      <line x1={20} y1={ruleY} x2={width - 20} y2={ruleY} stroke="var(--rule)" strokeWidth={1} />
      <text x={width / 2} y={noteY} textAnchor="middle" style={{ font: `600 12px ${MONO}`, fill: "var(--ink-faint)", letterSpacing: "0.04em" }}>
        DEFAULT STATE: unchanged
      </text>
    </svg>
  );
}

function LifecyclePhaseCardMobile({ name, lines, active }: { name: string; lines: string[]; active?: boolean }) {
  return (
    <div className={`rounded-vsc-lg p-5 ${active ? "border-l-[3px] bg-growth-tint" : "border border-rule bg-canvas-sunk"}`} style={active ? { borderLeftColor: "var(--growth)" } : undefined}>
      <span className="block font-mono text-[13px] font-bold uppercase tracking-[0.04em] text-ink">{name}</span>
      {lines.map((line) => (
        <span key={line} className="mt-1 block text-[13px] text-ink-faint">{line}</span>
      ))}
    </div>
  );
}

function TradeLifecycleMobile() {
  return (
    <div className="flex flex-col gap-3 sm:hidden">
      <LifecyclePhaseCardMobile name="COMMIT" lines={["Capital moves.", "Risk becomes real."]} />
      <div className="flex justify-center" aria-hidden="true"><ArrowDown className="h-3.5 w-3.5 text-ink-faint" /></div>
      <LifecyclePhaseCardMobile name="MANAGE" lines={["Two modes."]} />

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-vsc-md bg-clay-tint px-3 py-3">
          <span className="block font-mono text-[11px] font-bold text-clay">▼ PROTECT</span>
          <span className="mt-1.5 block text-[11px] leading-relaxed text-ink-soft">
            Reduce risk when conditions turn
          </span>
        </div>
        <div className="rounded-vsc-md bg-growth-tint px-3 py-3">
          <span className="block font-mono text-[11px] font-bold text-growth">▲ COMPOUND</span>
          <span className="mt-1.5 block text-[11px] leading-relaxed text-ink-soft">
            Add capital when proven correct
          </span>
        </div>
      </div>

      <div className="flex justify-center" aria-hidden="true"><ArrowDown className="h-3.5 w-3.5 text-ink-faint" /></div>
      <LifecyclePhaseCardMobile name="EXIT" lines={["Thesis ends."]} />

      <div className="mt-1 border-t border-rule pt-3 text-center">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
          Default state: unchanged
        </span>
      </div>
    </div>
  );
}

export function TradeLifecycleExhibit() {
  return (
    <>
      <TradeLifecycleDesktop />
      <TradeLifecycleMobile />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Two Paths — regime-dependent management, HTML cards.              */
/* ------------------------------------------------------------------ */

export function TwoPathsExhibit() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-vsc-lg border-l-[3px] bg-growth-tint p-6" style={{ borderLeftColor: "var(--growth)" }}>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            Conditions Constructive
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[15px] font-bold text-growth" aria-hidden="true">▲</span>
            <span className="font-mono text-[13px] font-bold uppercase tracking-wide text-growth">Compound</span>
          </div>
          <ul className="mt-4 flex flex-col gap-2 text-[14px] text-ink">
            <li>Give the trend room</li>
            <li>Trail the stop</li>
            <li>Add on proven strength</li>
            <li>Stay involved</li>
          </ul>
          <p className="mt-4 border-t border-growth/20 pt-4 text-[13px] italic leading-relaxed text-ink-faint">
            The trade is allowed to develop.
          </p>
        </div>

        <div className="rounded-vsc-lg border-l-[3px] bg-clay-tint p-6" style={{ borderLeftColor: "var(--clay)" }}>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            Conditions Unstable
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[15px] font-bold text-clay" aria-hidden="true">▼</span>
            <span className="font-mono text-[13px] font-bold uppercase tracking-wide text-clay">Protect</span>
          </div>
          <ul className="mt-4 flex flex-col gap-2 text-[14px] text-ink">
            <li>Take partial profit</li>
            <li>Raise the stop</li>
            <li>Reduce exposure</li>
            <li>Protect capital</li>
          </ul>
          <p className="mt-4 border-t border-clay/20 pt-4 text-[13px] italic leading-relaxed text-ink-faint">
            The trade is allowed less rope.
          </p>
        </div>
      </div>

      <p className="text-center text-[15px] text-ink">
        Same trade. Different environment. Different response.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. What Earns What — adjustment-to-evidence table, HTML rows.        */
/* ------------------------------------------------------------------ */

const EARNS_ROWS: { marker: "up" | "down"; adjustment: string; desc: string }[] = [
  {
    marker: "up",
    adjustment: "Stop moves up",
    desc: "The trade has advanced far enough that the original risk no longer needs carrying",
  },
  {
    marker: "up",
    adjustment: "Position increases",
    desc: "The market has already proven the thesis correct — never before",
  },
  {
    marker: "down",
    adjustment: "Partial taken",
    desc: "Conditions have turned, or the remaining reward no longer justifies the remaining risk",
  },
];

export function WhatEarnsWhatExhibit() {
  return (
    <div className="rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-8">
      <div className="mb-4 flex items-center justify-between border-b border-rule-strong pb-2 sm:mb-5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          Adjustment
        </span>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          Earned When
        </span>
      </div>
      <div className="flex flex-col">
        {EARNS_ROWS.map((row, i) => (
          <div
            key={row.adjustment}
            className={`flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:gap-6 ${
              i > 0 ? "border-t border-rule" : ""
            }`}
          >
            <div className="flex shrink-0 items-center gap-2 sm:w-48">
              <span
                className={`text-[14px] font-bold ${row.marker === "up" ? "text-growth" : "text-clay"}`}
                aria-hidden="true"
              >
                {row.marker === "up" ? "▲" : "▼"}
              </span>
              <span className="text-[14px] font-semibold text-ink">{row.adjustment}</span>
            </div>
            <p className="text-[14px] leading-relaxed text-ink-soft">{row.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. The Loop — the pipeline returns to Framework 01. Desktop: SVG      */
/*    with a curved return path. Mobile: a compact list with a single    */
/*    return-arrow icon rather than the full curve.                      */
/* ------------------------------------------------------------------ */

const LOOP_STAGES = [
  "Market Environment",
  "Opportunity Universe",
  "Setup Grading",
  "Sizing",
  "Trade Management",
];

function TheLoopDesktop() {
  const width = 480;
  const rowH = 46;
  const startY = 26;
  const nodeX = 24;
  const curveX = 452;
  const height = startY + rowH * (LOOP_STAGES.length - 1) + 30;

  const stage5Y = startY + rowH * (LOOP_STAGES.length - 1);
  const loopTopY = startY - 20;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="loop-title loop-desc"
      width="100%"
      style={{ height: "auto" }}
      className="hidden sm:block"
    >
      <title id="loop-title">The pipeline returns to Framework 01.</title>
      <desc id="loop-desc">
        Five stages in a vertical list: Market Environment, Opportunity Universe, Setup
        Grading, Sizing, and Trade Management, the current stage. A curved arrow returns
        from the end of Trade Management back to the top of Market Environment, showing
        that the pipeline is a repeating cycle, not a one-time sequence.
      </desc>

      <defs>
        <marker id="arrowhead-loop" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--rule-strong)" />
        </marker>
        <marker id="arrowhead-loop-return" markerWidth={9} markerHeight={9} refX={4.5} refY={4.5} orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill="var(--growth)" />
        </marker>
      </defs>

      {/* Down arrows between consecutive stages */}
      {LOOP_STAGES.slice(0, -1).map((stage, i) => (
        <line
          key={stage}
          x1={nodeX}
          y1={startY + rowH * i + 8}
          x2={nodeX}
          y2={startY + rowH * (i + 1) - 10}
          stroke="var(--rule-strong)"
          strokeWidth={1.5}
          markerEnd="url(#arrowhead-loop)"
        />
      ))}

      {LOOP_STAGES.map((stage, i) => {
        const isCurrent = i === LOOP_STAGES.length - 1;
        const cy = startY + rowH * i;
        return (
          <text
            key={stage}
            x={nodeX}
            y={cy + 4}
            style={{
              font: `${isCurrent ? 700 : 500} 13px ${MONO}`,
              fill: isCurrent ? "var(--growth)" : "var(--ink-faint)",
            }}
          >
            {String(i + 1).padStart(2, "0")} — {stage.toUpperCase()}
          </text>
        );
      })}

      {/* Curved return path: from stage 5's row, right and up, back to just above stage 1 */}
      <path
        d={`M 300 ${stage5Y} C ${curveX} ${stage5Y}, ${curveX} ${loopTopY}, 60 ${loopTopY}`}
        fill="none"
        stroke="var(--growth)"
        strokeWidth={1.75}
        markerEnd="url(#arrowhead-loop-return)"
      />
    </svg>
  );
}

function TheLoopMobile() {
  return (
    <div className="flex flex-col gap-2 sm:hidden">
      {LOOP_STAGES.map((stage, i) => {
        const isCurrent = i === LOOP_STAGES.length - 1;
        return (
          <div
            key={stage}
            className={`flex items-center gap-2 font-mono text-[12px] ${
              isCurrent ? "font-bold text-growth" : "text-ink-faint"
            }`}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span>{stage}</span>
          </div>
        );
      })}
      <div className="mt-2 flex items-center justify-center gap-2 border-t border-rule pt-3" aria-hidden="true">
        <RotateCcw className="h-3.5 w-3.5 text-growth" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-growth">
          Back to Framework 01
        </span>
      </div>
    </div>
  );
}

export function TheLoopExhibit() {
  return (
    <>
      <TheLoopDesktop />
      <TheLoopMobile />
    </>
  );
}

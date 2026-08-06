import React from "react";

/**
 * Four inline SVG diagrams for the Market Environment framework page.
 * All colour comes from CSS custom properties (via `var(--token)` inside
 * `style`/`fill`/`stroke` attributes) so nothing here needs to change if
 * the Daylight Growth tokens ever do. Text uses the site's own font
 * stack (`var(--font-mono)`, `var(--font-ui)`) rather than an embedded
 * face — SVG text inherits fonts the same way HTML does as long as the
 * family is available to the page, so there's no need to bundle one.
 */

const MONO = "var(--font-mono)";
const UI = "var(--font-ui)";

/* ------------------------------------------------------------------ */
/* 1. Pipeline map — small, near the top, stage 1 highlighted          */
/* ------------------------------------------------------------------ */

const PIPELINE_STAGES = [
  "Market Environment",
  "Opportunity Universe",
  "Setup Grading",
  "Sizing",
  "Trade Management",
];

export function PipelineMapExhibit({ activeIndex = 0 }: { activeIndex?: number }) {
  const rowH = 46;
  const startY = 26;
  const width = 460;
  const height = startY + rowH * (PIPELINE_STAGES.length - 1) + 26;
  const nodeX = 24;
  const activeStage = PIPELINE_STAGES[activeIndex];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="pipeline-map-title pipeline-map-desc"
      width="100%"
      style={{ height: "auto", display: "block" }}
    >
      <title id="pipeline-map-title">The five-stage decision pipeline.</title>
      <desc id="pipeline-map-desc">
        A vertical list of five stages, in order: 1 Market Environment, 2 Opportunity
        Universe, 3 Setup Grading, 4 Sizing, 5 Trade Management. Stage {activeIndex + 1},{" "}
        {activeStage}, is highlighted as the current page; the other stages are shown
        muted.
      </desc>

      {/* hairline spine */}
      <line
        x1={nodeX}
        y1={startY}
        x2={nodeX}
        y2={startY + rowH * (PIPELINE_STAGES.length - 1)}
        stroke="var(--rule)"
        strokeWidth={1}
      />

      {PIPELINE_STAGES.map((stage, i) => {
        const cy = startY + rowH * i;
        const isCurrent = i === activeIndex;
        return (
          <g key={stage}>
            {isCurrent && (
              <rect
                x={8}
                y={cy - 16}
                width={width - 16}
                height={32}
                rx={8}
                fill="var(--growth-tint)"
              />
            )}
            <circle
              cx={nodeX}
              cy={cy}
              r={7}
              fill={isCurrent ? "var(--growth)" : "var(--canvas)"}
              stroke={isCurrent ? "var(--growth)" : "var(--rule-strong)"}
              strokeWidth={1.5}
            />
            <text
              x={nodeX + 22}
              y={cy + 4}
              style={{
                font: `${isCurrent ? 700 : 500} 13px ${MONO}`,
                fill: isCurrent ? "var(--growth)" : "var(--ink-faint)",
              }}
            >
              {i + 1} — {stage}
              {isCurrent ? "  (you are here)" : ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. The scoring flow — factors -> resolver -> regime                 */
/* ------------------------------------------------------------------ */

type Verdict = "POS" | "NEU" | "NEG";

function VerdictChip({ x, y, kind }: { x: number; y: number; kind: Verdict }) {
  const map: Record<Verdict, { fill: string; text: string; label: string }> = {
    POS: { fill: "var(--growth-tint)", text: "var(--growth)", label: "POS" },
    NEU: { fill: "var(--canvas-sunk)", text: "var(--ink-faint)", label: "NEU" },
    NEG: { fill: "var(--clay-tint)", text: "var(--clay)", label: "NEG" },
  };
  const c = map[kind];
  return (
    <g>
      <rect x={x} y={y} width={40} height={18} rx={9} fill={c.fill} />
      <text
        x={x + 20}
        y={y + 13}
        textAnchor="middle"
        style={{ font: `700 10px ${MONO}`, fill: c.text, letterSpacing: "0.04em" }}
      >
        {c.label}
      </text>
    </g>
  );
}

const FACTOR_BOXES = [
  { name: "Trend", sub: "Structure · Location · Slope" },
  { name: "Breadth", sub: "Participation across the market" },
  { name: "Leadership Quality", sub: "Breakouts · Highs · Sectors" },
];

const REGIME_BOXES: { count: string; regime: string; exposure: string; tone: "growth" | "ink" | "clay" }[] = [
  { count: "3 positive", regime: "Aggressive", exposure: "Max exposure 80–100%", tone: "growth" },
  { count: "2 positive", regime: "Neutral", exposure: "Max exposure 40–60%", tone: "ink" },
  { count: "0–1 positive", regime: "Defensive", exposure: "Max exposure 0–20%", tone: "clay" },
];

export function ScoringFlowExhibit() {
  const boxW = 220;
  const gap = 30;
  const width = boxW * 3 + gap * 2 + 40;
  const box1Y = 24;
  const box1H = 140;
  const arrow1Y2 = box1Y + box1H + 34;
  const resolverY = arrow1Y2;
  const resolverH = 56;
  const arrow2Y2 = resolverY + resolverH + 34;
  const box3Y = arrow2Y2;
  const box3H = 96;
  const height = box3Y + box3H + 20;

  const colX = (i: number) => 20 + i * (boxW + gap);
  const centerX = (i: number) => colX(i) + boxW / 2;

  const toneFill: Record<string, string> = {
    growth: "var(--growth)",
    ink: "var(--ink)",
    clay: "var(--clay)",
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="scoring-flow-title scoring-flow-desc"
      width="100%"
      style={{ height: "auto", display: "block" }}
    >
      <title id="scoring-flow-title">The scoring flow, from factors to regime.</title>
      <desc id="scoring-flow-desc">
        Three factor boxes — Trend, Breadth, and Leadership Quality — each classified
        Positive, Neutral, or Negative. Arrows converge these into a box labelled
        &quot;Count the Positive factors,&quot; which resolves into one of three regimes:
        three positive factors gives Aggressive with maximum exposure 80 to 100 percent;
        two positive gives Neutral with maximum exposure 40 to 60 percent; zero or one
        positive gives Defensive with maximum exposure 0 to 20 percent.
      </desc>

      {/* Row 1 — factor boxes */}
      {FACTOR_BOXES.map((f, i) => (
        <g key={f.name}>
          <rect
            x={colX(i)}
            y={box1Y}
            width={boxW}
            height={box1H}
            rx={10}
            fill="var(--surface)"
            stroke="var(--rule)"
          />
          <text
            x={colX(i) + 16}
            y={box1Y + 30}
            style={{ font: `600 15px ${UI}`, fill: "var(--ink)" }}
          >
            {f.name}
          </text>
          <text
            x={colX(i) + 16}
            y={box1Y + 52}
            style={{ font: `400 11px ${MONO}`, fill: "var(--ink-faint)" }}
          >
            {f.sub}
          </text>
          <VerdictChip x={colX(i) + 16} y={box1Y + 90} kind="POS" />
          <VerdictChip x={colX(i) + 16 + 46} y={box1Y + 90} kind="NEU" />
          <VerdictChip x={colX(i) + 16 + 92} y={box1Y + 90} kind="NEG" />
        </g>
      ))}

      {/* Arrows converging into resolver */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={centerX(i)}
          y1={box1Y + box1H}
          x2={width / 2}
          y2={resolverY}
          stroke="var(--rule-strong)"
          strokeWidth={1.5}
          markerEnd="url(#arrowhead-flow)"
        />
      ))}

      {/* Resolver box */}
      <rect
        x={width / 2 - 140}
        y={resolverY}
        width={280}
        height={resolverH}
        rx={10}
        fill="var(--ink)"
      />
      <text
        x={width / 2}
        y={resolverY + resolverH / 2 + 5}
        textAnchor="middle"
        style={{ font: `600 13px ${MONO}`, fill: "var(--canvas)" }}
      >
        Count the Positive factors
      </text>

      {/* Arrows from resolver into regime boxes */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={width / 2}
          y1={resolverY + resolverH}
          x2={centerX(i)}
          y2={box3Y}
          stroke="var(--rule-strong)"
          strokeWidth={1.5}
          markerEnd="url(#arrowhead-flow)"
        />
      ))}

      {/* Row 3 — regime boxes */}
      {REGIME_BOXES.map((r, i) => (
        <g key={r.regime}>
          <rect
            x={colX(i)}
            y={box3Y}
            width={boxW}
            height={box3H}
            rx={10}
            fill="var(--surface)"
            stroke={toneFill[r.tone]}
            strokeWidth={1.5}
          />
          <text
            x={centerX(i)}
            y={box3Y + 26}
            textAnchor="middle"
            style={{ font: `600 11px ${MONO}`, fill: "var(--ink-faint)", letterSpacing: "0.04em" }}
          >
            {r.count.toUpperCase()}
          </text>
          <text
            x={centerX(i)}
            y={box3Y + 52}
            textAnchor="middle"
            style={{ font: `700 20px ${UI}`, fill: toneFill[r.tone] }}
          >
            {r.regime}
          </text>
          <text
            x={centerX(i)}
            y={box3Y + 76}
            textAnchor="middle"
            style={{ font: `400 11px ${MONO}`, fill: "var(--ink-faint)" }}
          >
            {r.exposure}
          </text>
        </g>
      ))}

      <defs>
        <marker
          id="arrowhead-flow"
          markerWidth={8}
          markerHeight={8}
          refX={4}
          refY={4}
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--rule-strong)" />
        </marker>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Reusable sub-scoring exhibit — used for Trend and Leadership     */
/* ------------------------------------------------------------------ */

export interface SubScoringColumn {
  heading: string;
  positive: string;
  neutral: string;
  negative: string;
}

export function SubScoringExhibit({
  columns,
  resolverLines,
  titleId,
  title,
  desc,
}: {
  columns: SubScoringColumn[];
  resolverLines: [string, string, string];
  titleId: string;
  title: string;
  desc: string;
}) {
  const colW = 220;
  const gap = 30;
  const width = colW * 3 + gap * 2 + 40;
  const headerY = 24;
  const rowH = 46;
  const rowsStartY = headerY + 26;
  const rowsEndY = rowsStartY + rowH * 3;
  const arrowEndY = rowsEndY + 34;
  const resolverH = 74;
  const height = arrowEndY + resolverH + 20;

  const colX = (i: number) => 20 + i * (colW + gap);

  const rows: { key: "positive" | "neutral" | "negative"; label: string; fill: string; text: string }[] = [
    { key: "positive", label: "Positive", fill: "var(--growth-tint)", text: "var(--growth)" },
    { key: "neutral", label: "Neutral", fill: "var(--canvas-sunk)", text: "var(--ink-faint)" },
    { key: "negative", label: "Negative", fill: "var(--clay-tint)", text: "var(--clay)" },
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${titleId}-title ${titleId}-desc`}
      width="100%"
      style={{ height: "auto", display: "block" }}
    >
      <title id={`${titleId}-title`}>{title}</title>
      <desc id={`${titleId}-desc`}>{desc}</desc>

      {columns.map((col, i) => (
        <g key={col.heading}>
          <text
            x={colX(i)}
            y={headerY}
            style={{ font: `700 11px ${MONO}`, fill: "var(--ink)", letterSpacing: "0.08em" }}
          >
            {col.heading.toUpperCase()}
          </text>
          {rows.map((row, r) => {
            const y = rowsStartY + rowH * r;
            return (
              <g key={row.key}>
                <rect x={colX(i)} y={y} width={colW} height={rowH - 6} rx={6} fill={row.fill} />
                <text
                  x={colX(i) + 12}
                  y={y + 18}
                  style={{ font: `700 11px ${MONO}`, fill: row.text }}
                >
                  {row.label}
                </text>
                <text
                  x={colX(i) + colW - 12}
                  y={y + 33}
                  textAnchor="end"
                  style={{ font: `400 12px ${MONO}`, fill: "var(--ink-soft)" }}
                >
                  {col[row.key]}
                </text>
              </g>
            );
          })}
        </g>
      ))}

      {/* Arrow down to resolver */}
      <line
        x1={width / 2}
        y1={rowsEndY + 4}
        x2={width / 2}
        y2={arrowEndY}
        stroke="var(--rule-strong)"
        strokeWidth={1.5}
        markerEnd="url(#arrowhead-sub)"
      />

      <rect
        x={width / 2 - 220}
        y={arrowEndY}
        width={440}
        height={resolverH}
        rx={10}
        fill="var(--ink)"
      />
      {resolverLines.map((line, i) => (
        <text
          key={i}
          x={width / 2}
          y={arrowEndY + 22 + i * 18}
          textAnchor="middle"
          style={{ font: `${i === 2 ? 400 : 600} 11px ${MONO}`, fill: "var(--canvas)" }}
        >
          {line}
        </text>
      ))}

      <defs>
        <marker id="arrowhead-sub" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--rule-strong)" />
        </marker>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Breadth zones — a simple three-zone bar, not a sub-scorer.       */
/*    Breadth doesn't have three independent sub-dimensions that vote  */
/*    the way Trend and Leadership Quality do, so this stays a single  */
/*    reading split into three zones rather than borrowing the         */
/*    three-column sub-scoring template it doesn't actually fit.       */
/* ------------------------------------------------------------------ */

const BREADTH_ZONES: { label: string; status: string; fill: string; text: string }[] = [
  { label: "<40%", status: "Negative", fill: "var(--clay-tint)", text: "var(--clay)" },
  { label: "40–60%", status: "Neutral", fill: "var(--canvas-sunk)", text: "var(--ink-faint)" },
  { label: ">60%", status: "Positive", fill: "var(--growth-tint)", text: "var(--growth)" },
];

export function BreadthZonesExhibit() {
  const width = 700;
  const trackX = 30;
  const trackW = width - 60;
  const segW = trackW / 3;
  const topLabelY = 24;
  const barY = 38;
  const barH = 40;
  const statusLabelY = barY + barH + 26;
  const endLabelY = statusLabelY + 26;
  const height = endLabelY + 16;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="breadth-zones-title breadth-zones-desc"
      width="100%"
      style={{ height: "auto", display: "block" }}
    >
      <title id="breadth-zones-title">Breadth zones, negative to positive.</title>
      <desc id="breadth-zones-desc">
        A single horizontal bar in three zones. Below 40 percent of stocks above their
        50-day moving average is Negative. 40 to 60 percent is Neutral. Above 60 percent
        is Positive, described as broad participation; below 40 percent is described as
        weak participation.
      </desc>

      {BREADTH_ZONES.map((zone, i) => {
        const x = trackX + segW * i;
        const w = i === BREADTH_ZONES.length - 1 ? width - trackX - x : segW;
        const cx = x + w / 2;
        return (
          <g key={zone.label}>
            <rect x={x} y={barY} width={w} height={barH} fill={zone.fill} />
            <text
              x={cx}
              y={topLabelY}
              textAnchor="middle"
              style={{ font: `700 12px ${MONO}`, fill: zone.text }}
            >
              {zone.label}
            </text>
            <text
              x={cx}
              y={statusLabelY}
              textAnchor="middle"
              style={{ font: `600 12px ${MONO}`, fill: zone.text }}
            >
              {zone.status}
            </text>
          </g>
        );
      })}

      <text
        x={trackX}
        y={endLabelY}
        style={{ font: `400 11px ${MONO}`, fill: "var(--ink-faint)" }}
      >
        ← weak participation
      </text>
      <text
        x={width - trackX}
        y={endLabelY}
        textAnchor="end"
        style={{ font: `400 11px ${MONO}`, fill: "var(--ink-faint)" }}
      >
        broad →
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Exposure ladder — a single segmented 0-100% track                */
/* ------------------------------------------------------------------ */

export function ExposureLadderExhibit() {
  const width = 700;
  const trackX = 30;
  const trackW = width - 60;
  const trackY = 40;
  const trackH = 40;
  const labelY = trackY + trackH + 24;
  const noteY = labelY + 34;
  const height = noteY + 20;

  const pctToX = (pct: number) => trackX + (pct / 100) * trackW;

  const segments = [
    { from: 0, to: 20, fill: "var(--clay)", label: "Defensive · 0–20%", labelFill: "var(--clay)" },
    { from: 20, to: 40, fill: "var(--rule-strong)", opacity: 0.35, label: "Transition", labelFill: "var(--ink-faint)" },
    { from: 40, to: 60, fill: "var(--ink)", label: "Neutral · 40–60%", labelFill: "var(--ink)" },
    { from: 60, to: 80, fill: "var(--rule-strong)", opacity: 0.35, label: "Transition", labelFill: "var(--ink-faint)" },
    { from: 80, to: 100, fill: "var(--growth)", label: "Aggressive · 80–100%", labelFill: "var(--growth)" },
  ];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="ladder-title ladder-desc"
      width="100%"
      style={{ height: "auto", display: "block" }}
    >
      <title id="ladder-title">The exposure ladder, 0 to 100 percent.</title>
      <desc id="ladder-desc">
        A horizontal scale from 0 to 100 percent exposure, divided into five segments.
        Defensive spans 0 to 20 percent. A transition zone spans 20 to 40 percent.
        Neutral spans 40 to 60 percent. A second transition zone spans 60 to 80 percent.
        Aggressive spans 80 to 100 percent. The two transition zones are shown as a
        lighter tint than the three named regimes, noting that evidence is shifting and
        positions should be taken small and scaled as breakouts confirm.
      </desc>

      {segments.map((seg) => (
        <rect
          key={seg.label + seg.from}
          x={pctToX(seg.from)}
          y={trackY}
          width={pctToX(seg.to) - pctToX(seg.from)}
          height={trackH}
          fill={seg.fill}
          opacity={seg.opacity ?? 1}
        />
      ))}

      {segments.map((seg) => (
        <text
          key={"label-" + seg.label + seg.from}
          x={(pctToX(seg.from) + pctToX(seg.to)) / 2}
          y={labelY}
          textAnchor="middle"
          style={{ font: `${seg.label === "Transition" ? 400 : 700} 11px ${MONO}`, fill: seg.labelFill }}
        >
          {seg.label}
        </text>
      ))}

      <text
        x={width / 2}
        y={noteY}
        textAnchor="middle"
        style={{ font: `400 11px ${MONO}`, fill: "var(--ink-faint)" }}
      >
        Transition zones: evidence shifting — take small test positions, scale as breakouts confirm.
      </text>
    </svg>
  );
}

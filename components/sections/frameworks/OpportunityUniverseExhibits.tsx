import React from "react";

/**
 * Two inline SVG diagrams for the Opportunity Universe framework page.
 * Same convention as MarketEnvironmentExhibits.tsx: colour and type come
 * from the site's own CSS custom properties and font stack via `var(...)`,
 * so nothing here needs to change if the Daylight Growth tokens ever do.
 */

const MONO = "var(--font-mono)";

/* ------------------------------------------------------------------ */
/* 1. Opportunity Funnel — six stages, narrowing left-aligned bars     */
/* ------------------------------------------------------------------ */

interface FunnelStage {
  label: string;
  count: string;
  widthFrac: number;
  tone: "dark" | "mid" | "green";
}

const FUNNEL_STAGES: FunnelStage[] = [
  { label: "NSE Universe", count: "~2,000", widthFrac: 1.0, tone: "dark" },
  { label: "After Structural Exclusions", count: "~1,200", widthFrac: 0.8, tone: "mid" },
  { label: "After Tradability Filters", count: "~500", widthFrac: 0.6, tone: "mid" },
  { label: "Leadership Review", count: "~150", widthFrac: 0.46, tone: "mid" },
  { label: "Chart Review", count: "100–150", widthFrac: 0.38, tone: "mid" },
  { label: "Watchlist", count: "20–40", widthFrac: 0.3, tone: "green" },
];

export function OpportunityFunnelExhibit() {
  const width = 640;
  const trackX = 20;
  const maxBarW = width - trackX * 2;
  const barH = 44;
  const gap = 30;
  const rowStep = barH + gap;
  const startY = 24;
  const height = startY + rowStep * (FUNNEL_STAGES.length - 1) + barH + 12;
  const arrowX = trackX + 24;

  const toneFill: Record<FunnelStage["tone"], { fill: string; text: string; stroke?: string }> = {
    dark: { fill: "var(--ink)", text: "var(--canvas)" },
    mid: { fill: "var(--canvas-sunk)", text: "var(--ink)", stroke: "var(--rule)" },
    green: { fill: "var(--growth)", text: "var(--canvas)" },
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="funnel-title funnel-desc"
      width="100%"
      style={{ height: "auto", display: "block" }}
    >
      <title id="funnel-title">The opportunity funnel, from the full universe to a watchlist.</title>
      <desc id="funnel-desc">
        A narrowing funnel of six stages. NSE Universe, about 2,000 stocks. After
        Structural Exclusions, about 1,200. After Tradability Filters, about 500.
        Leadership Review, about 150. Chart Review, 100 to 150. Watchlist, the final
        output, 20 to 40 stocks.
      </desc>

      {FUNNEL_STAGES.map((stage, i) => {
        const y = startY + rowStep * i;
        const w = maxBarW * stage.widthFrac;
        const tone = toneFill[stage.tone];
        return (
          <g key={stage.label}>
            <rect
              x={trackX}
              y={y}
              width={w}
              height={barH}
              fill={tone.fill}
              stroke={tone.stroke}
              strokeWidth={tone.stroke ? 1 : 0}
            />
            <text
              x={trackX + 14}
              y={y + barH / 2 + 5}
              style={{ font: `600 13px ${MONO}`, fill: tone.text }}
            >
              {stage.label}
            </text>
            <text
              x={trackX + w - 14}
              y={y + barH / 2 + 5}
              textAnchor="end"
              style={{ font: `700 13px ${MONO}`, fill: tone.text }}
            >
              {stage.count}
            </text>
            {i < FUNNEL_STAGES.length - 1 && (
              <line
                x1={arrowX}
                y1={y + barH}
                x2={arrowX}
                y2={y + barH + gap}
                stroke="var(--ink-faint)"
                strokeWidth={1.5}
                markerEnd="url(#arrowhead-funnel)"
              />
            )}
          </g>
        );
      })}

      <defs>
        <marker id="arrowhead-funnel" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--ink-faint)" />
        </marker>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Top-down flow — a paired contrast, correct vs rejected order     */
/* ------------------------------------------------------------------ */

const APPROACH_STEPS = ["Market", "Sector / Theme", "Stock"];
const REJECTED_STEPS = ["Stock", "Sector", "Market"];

export function TopDownFlowExhibit() {
  const colW = 190;
  const gap = 40;
  const sidePad = 20;
  const width = sidePad * 2 + colW * 2 + gap;
  const headerY = 22;
  const boxW = 150;
  const boxH = 40;
  const boxGap = 30;
  const rowStep = boxH + boxGap;
  const boxStartY = 44;
  const height = boxStartY + rowStep * 2 + boxH + 16;

  const colX = (i: number) => sidePad + i * (colW + gap);
  const boxX = (i: number) => colX(i) + (colW - boxW) / 2;
  const centerX = (i: number) => colX(i) + colW / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="topdown-title topdown-desc"
      width="100%"
      style={{ height: "auto", display: "block" }}
    >
      <title id="topdown-title">Direction of analysis: my approach versus the rejected approach.</title>
      <desc id="topdown-desc">
        Two vertical flows side by side. My approach, on the left, moves from Market to
        Sector or Theme to Stock. Not this, on the right, moves from Stock to Sector to
        Market and is shown struck through as rejected.
      </desc>

      {/* Left column — my approach */}
      <text
        x={centerX(0)}
        y={headerY}
        textAnchor="middle"
        style={{ font: `700 11px ${MONO}`, fill: "var(--growth)", letterSpacing: "0.08em" }}
      >
        MY APPROACH
      </text>
      {APPROACH_STEPS.map((step, i) => {
        const y = boxStartY + rowStep * i;
        return (
          <g key={step}>
            <rect
              x={boxX(0)}
              y={y}
              width={boxW}
              height={boxH}
              rx={8}
              fill="var(--growth-tint)"
              stroke="var(--growth)"
              strokeWidth={1}
            />
            <text
              x={centerX(0)}
              y={y + boxH / 2 + 5}
              textAnchor="middle"
              style={{ font: `600 12px ${MONO}`, fill: "var(--growth)" }}
            >
              {step}
            </text>
            {i < APPROACH_STEPS.length - 1 && (
              <line
                x1={centerX(0)}
                y1={y + boxH}
                x2={centerX(0)}
                y2={y + boxH + boxGap}
                stroke="var(--growth)"
                strokeWidth={1.5}
                markerEnd="url(#arrowhead-topdown-a)"
              />
            )}
          </g>
        );
      })}

      {/* Right column — rejected approach */}
      <text
        x={centerX(1)}
        y={headerY}
        textAnchor="middle"
        style={{ font: `700 11px ${MONO}`, fill: "var(--clay)", letterSpacing: "0.08em" }}
      >
        NOT THIS
      </text>
      {REJECTED_STEPS.map((step, i) => {
        const y = boxStartY + rowStep * i;
        return (
          <g key={step}>
            <rect
              x={boxX(1)}
              y={y}
              width={boxW}
              height={boxH}
              rx={8}
              fill="var(--clay-tint)"
              stroke="var(--clay)"
              strokeWidth={1}
            />
            <text
              x={centerX(1)}
              y={y + boxH / 2 + 5}
              textAnchor="middle"
              style={{ font: `600 12px ${MONO}`, fill: "var(--clay)" }}
            >
              {step}
            </text>
            {i < REJECTED_STEPS.length - 1 && (
              <line
                x1={centerX(1)}
                y1={y + boxH}
                x2={centerX(1)}
                y2={y + boxH + boxGap}
                stroke="var(--clay)"
                strokeWidth={1.5}
                markerEnd="url(#arrowhead-topdown-b)"
              />
            )}
          </g>
        );
      })}

      {/* Subtle strike-through over the rejected column */}
      <line
        x1={colX(1) - 6}
        y1={boxStartY - 8}
        x2={colX(1) + colW + 6}
        y2={boxStartY + rowStep * 2 + boxH + 8}
        stroke="var(--clay)"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.45}
      />

      <defs>
        <marker id="arrowhead-topdown-a" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--growth)" />
        </marker>
        <marker id="arrowhead-topdown-b" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--clay)" />
        </marker>
      </defs>
    </svg>
  );
}

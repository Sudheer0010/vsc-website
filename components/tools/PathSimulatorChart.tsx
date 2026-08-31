"use client";

import { useMemo } from "react";
import type { SimulatedPath } from "@/lib/calculators/trading-expectancy-path-simulator";

const WIDTH = 640;
const HEIGHT = 300;
const MARGIN = { top: 16, right: 16, bottom: 30, left: 46 };
const Y_TICK_FRACTIONS = [0, 0.25, 0.5, 0.75, 1] as const;
/** Points drawn per path. The plot is ~580px wide, so more is invisible detail. */
const MAX_POINTS_PER_PATH = 320;

/**
 * Bucketed min/max decimation.
 *
 * At the 1,000-trade horizon, 20 paths meant 20,020 SVG points and a measured
 * 196 ms render block on a 4x-throttled CPU — longer than any simulation slice.
 * Plain stride sampling would fix the cost but could skip the trough that makes
 * a drawdown visible, so each bucket keeps both its lowest and highest point.
 * The drawn envelope stays honest; only redundant points are dropped.
 */
function decimate(values: number[], maxPoints: number): Array<[number, number]> {
  const n = values.length;
  if (n <= maxPoints) return values.map((v, i) => [i, v]);

  const buckets = Math.floor(maxPoints / 2);
  const size = n / buckets;
  const out: Array<[number, number]> = [[0, values[0]]];

  for (let b = 0; b < buckets; b += 1) {
    const start = Math.floor(b * size);
    const end = Math.min(n, Math.floor((b + 1) * size));
    if (end <= start) continue;

    let minI = start;
    let maxI = start;
    for (let i = start; i < end; i += 1) {
      if (values[i] < values[minI]) minI = i;
      if (values[i] > values[maxI]) maxI = i;
    }
    const [first, second] = minI <= maxI ? [minI, maxI] : [maxI, minI];
    out.push([first, values[first]]);
    if (second !== first) out.push([second, values[second]]);
  }

  out.push([n - 1, values[n - 1]]);
  return out;
}

function formatR(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}R`;
}

export function PathSimulatorChart({
  paths,
  trades,
  percentiles,
  medianPathIndex,
  selectedIndex,
  onSelect,
  previewIndex,
  onPreview,
}: {
  paths: SimulatedPath[];
  trades: number;
  /** Endpoint percentiles across every simulated run, not just the drawn ones. */
  percentiles?: { p5: number; p50: number; p95: number };
  medianPathIndex: number;
  selectedIndex: number | null;
  onSelect: (index: number | null) => void;
  previewIndex: number | null;
  onPreview: (index: number | null) => void;
}) {
  const emphasizedIndex = previewIndex ?? selectedIndex ?? medianPathIndex;

  const { xScale, yScale, zeroY, yTicks } = useMemo(() => {
    const plotWidth = WIDTH - MARGIN.left - MARGIN.right;
    const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

    const values = paths.flatMap((path) => path.cumulative);
    const bounds = percentiles ? [percentiles.p5, percentiles.p50, percentiles.p95] : [];
    const minValue = Math.min(0, ...values, ...bounds);
    const maxValue = Math.max(0, ...values, ...bounds);
    const pad = (maxValue - minValue) * 0.08 || 1;
    const domainMin = minValue - pad;
    const domainMax = maxValue + pad;

    const xScale = (tradeIndex: number) => MARGIN.left + (tradeIndex / trades) * plotWidth;
    const yScale = (value: number) => MARGIN.top + ((domainMax - value) / (domainMax - domainMin)) * plotHeight;

    const tickSpacing = (domainMax - domainMin) / (Y_TICK_FRACTIONS.length - 1);
    const yTicks = Y_TICK_FRACTIONS.map((fraction) => domainMin + fraction * (domainMax - domainMin)).filter(
      (value) => Math.abs(value) > tickSpacing * 0.15,
    );

    return { xScale, yScale, zeroY: yScale(0), yTicks };
  }, [paths, trades, percentiles]);

  const drawnPaths = useMemo(
    () => paths.map((path) => decimate(path.cumulative, MAX_POINTS_PER_PATH)),
    [paths],
  );

  return (
    <div className="overflow-hidden rounded-vsc-lg border border-rule bg-surface p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] text-ink-faint">Hover to inspect a path. Click or tap to keep it in focus.</p>
        {selectedIndex !== null && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="min-h-8 text-[12.5px] font-semibold text-growth hover:text-growth-deep"
          >
            Show all paths
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={`Line chart of cumulative R for ${paths.length} simulated trading paths over ${trades} trades, each starting at zero.`}
          className="h-auto w-full min-w-[480px]"
        >
          {yTicks.map((value) => (
            <g key={value}>
              <line
                x1={MARGIN.left}
                y1={yScale(value)}
                x2={WIDTH - MARGIN.right}
                y2={yScale(value)}
                stroke="var(--rule)"
                strokeWidth="1"
              />
              <text
                x={MARGIN.left}
                y={yScale(value) - 4}
                style={{ font: "500 11px var(--font-ui)", fill: "var(--ink-faint)" }}
              >
                {formatR(value)}
              </text>
            </g>
          ))}

          <line
            x1={MARGIN.left}
            y1={zeroY}
            x2={WIDTH - MARGIN.right}
            y2={zeroY}
            stroke="var(--rule-strong)"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <text x={MARGIN.left} y={zeroY - 4} style={{ font: "600 11px var(--font-ui)", fill: "var(--ink-faint)" }}>
            0R
          </text>

          {percentiles &&
            (
              [
                { value: percentiles.p95, label: "95th" },
                { value: percentiles.p50, label: "median" },
                { value: percentiles.p5, label: "5th" },
              ] as const
            ).map((marker) => (
              <g key={marker.label}>
                <line
                  x1={MARGIN.left}
                  y1={yScale(marker.value)}
                  x2={WIDTH - MARGIN.right}
                  y2={yScale(marker.value)}
                  stroke="var(--growth)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  opacity="0.55"
                />
                <text
                  x={WIDTH - MARGIN.right}
                  y={yScale(marker.value) - 4}
                  textAnchor="end"
                  style={{ font: "600 10px var(--font-ui)", fill: "var(--growth)" }}
                >
                  {marker.label} {formatR(marker.value)}
                </text>
              </g>
            ))}

          <line
            x1={MARGIN.left}
            y1={MARGIN.top}
            x2={MARGIN.left}
            y2={HEIGHT - MARGIN.bottom}
            stroke="var(--rule)"
            strokeWidth="1"
          />
          <line
            x1={MARGIN.left}
            y1={HEIGHT - MARGIN.bottom}
            x2={WIDTH - MARGIN.right}
            y2={HEIGHT - MARGIN.bottom}
            stroke="var(--rule)"
            strokeWidth="1"
          />

          <text x={MARGIN.left} y={HEIGHT - 6} style={{ font: "500 11px var(--font-ui)", fill: "var(--ink-faint)" }}>
            Trade 0
          </text>
          <text
            x={WIDTH - MARGIN.right}
            y={HEIGHT - 6}
            textAnchor="end"
            style={{ font: "500 11px var(--font-ui)", fill: "var(--ink-faint)" }}
          >
            Trade {trades}
          </text>

          {paths
            .map((path, index) => ({ path, index }))
            .sort((a, b) => (a.index === emphasizedIndex ? 1 : b.index === emphasizedIndex ? -1 : 0))
            .map(({ path, index }) => {
              const isEmphasized = emphasizedIndex === index;
              const d = (drawnPaths[index] ?? [])
                .map(([i, value], k) => `${k === 0 ? "M" : "L"}${xScale(i)},${yScale(value)}`)
                .join(" ");

              return (
                <g key={index}>
                  {/* Wide invisible stroke as the actual click/tap/focus target —
                      the visible 1.25px line is too thin to hit reliably when
                      20 paths overlap. */}
                  <path
                    d={d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={14}
                    style={{ pointerEvents: "stroke", outline: "none" }}
                    className="cursor-pointer"
                    onClick={() => onSelect(index)}
                    onMouseEnter={() => onPreview(index)}
                    onMouseLeave={() => onPreview(null)}
                    onFocus={() => onPreview(index)}
                    onBlur={() => onPreview(null)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelect(index);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={index === (selectedIndex ?? medianPathIndex)}
                    aria-label={`Path ${index + 1} of ${paths.length}, final ${formatR(path.final)}`}
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke={isEmphasized ? "var(--growth)" : "var(--ink-faint)"}
                    strokeWidth={isEmphasized ? 2.25 : 1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={isEmphasized ? 1 : 0.18}
                    className="pointer-events-none transition-opacity duration-150"
                  />
                </g>
              );
            })}
        </svg>
      </div>
    </div>
  );
}

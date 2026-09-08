"use client";

import React, { useEffect, useRef, useState } from "react";
import { buildContourField, CONTOUR_FIELD_VIEWBOX, type SafeArea } from "@/lib/contourField";
import { useHydratedReducedMotion } from "@/components/ui/vsc/useHydratedReducedMotion";

/**
 * Signal Field decorative background — deterministic SVG contour lines.
 * Purely decorative: aria-hidden, no pointer events, carries no
 * information a sighted user doesn't also get from the foreground content.
 *
 * Animation (when `animate`) is a single CSS transform drift, stopped by
 * prefers-reduced-motion and paused while the field is offscreen or the
 * tab is hidden — same governing rules the rest of this site's motion
 * already follows (see Reveal, ExposureInstrument).
 */
export interface ContourFieldProps {
  /** Deterministic seed — same seed always renders the same geometry. */
  seed: number;
  layers?: number;
  density?: number;
  strokeColor: string;
  /** Multiplies each layer's own computed opacity. */
  baseOpacity?: number;
  /** Whether the layers drift. Ignored under reduced motion. */
  animate?: boolean;
  /** Thins (does not erase) contours beneath this region, 0–1 coords. */
  safeArea?: SafeArea;
  /** Fades the whole field from visible at the top to transparent by ~18% down — used for the Five Gates → Risk transition echo. */
  fadeFromTop?: boolean;
  className?: string;
}

function useInViewPause(ref: React.RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver((entries) => setActive(entries.some((e) => e.isIntersecting)), {
      threshold: 0.01,
    });
    io.observe(el);

    const onVisibility = () => setActive(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);

  return active;
}

export function ContourField({
  seed,
  layers = 2,
  density = 7,
  strokeColor,
  baseOpacity = 1,
  animate = false,
  safeArea,
  fadeFromTop = false,
  className,
}: ContourFieldProps) {
  const reduce = useHydratedReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInViewPause(ref);
  const running = animate && !reduce && inView;

  const geometry = React.useMemo(() => buildContourField(seed, layers, density), [seed, layers, density]);
  const maskId = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={["vsc-contour-field pointer-events-none absolute inset-0 overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
    >
      <svg viewBox={CONTOUR_FIELD_VIEWBOX} preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="presentation">
        <defs>
          {safeArea ? (
            <mask id={`safe-${maskId}`} maskUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
              <rect x="0" y="0" width="1" height="1" fill="white" />
              <rect x={safeArea.x} y={safeArea.y} width={safeArea.w} height={safeArea.h} fill="black" fillOpacity="0.55" />
            </mask>
          ) : null}
          {fadeFromTop ? (
            <linearGradient id={`fade-${maskId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="18%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          ) : null}
          {fadeFromTop ? (
            <mask id={`topfade-${maskId}`} maskUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
              <rect x="0" y="0" width="1" height="1" fill={`url(#fade-${maskId})`} />
            </mask>
          ) : null}
        </defs>
        <g mask={safeArea ? `url(#safe-${maskId})` : fadeFromTop ? `url(#topfade-${maskId})` : undefined}>
          {geometry.map((layer, li) => (
            <g
              key={li}
              className={running ? "vsc-contour-drift" : undefined}
              style={
                {
                  "--vsc-drift-x": `${li % 2 === 0 ? -14 : 14}px`,
                  "--vsc-drift-y": `${-6 - li * 2}px`,
                  "--vsc-drift-dur": `${26 + li * 6}s`,
                } as React.CSSProperties
              }
            >
              {layer.paths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={strokeColor}
                  strokeOpacity={layer.opacity * baseOpacity}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

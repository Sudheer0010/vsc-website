"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ANNOTATIONS,
  ANNOTATIONS_MOBILE,
  BEAT_A,
  BEAT_B,
  BEAT_C,
  BEAT_D,
  CHART_VIEW_H,
  CHART_VIEW_W,
  ENTRY_POINT,
  EYEBROW,
  PRICE_PATH_D,
  PRICE_PATH_LENGTH,
  QUESTIONS,
  REGIME_BAND_H,
  REGIME_X_END,
  REGIME_X_START,
  REGIME_Y,
  RING_POINT,
  STOP_X_END,
  STOP_X_START,
  STOP_Y,
  STRENGTH_PATH_D,
  STRENGTH_PATH_LENGTH,
  pointAtT,
  pointAtX,
} from "@/lib/whyVscExists";

/**
 * "Why VSC exists" — the pinned scroll chapter between the arrival hero and
 * BeliefSection ("Three principles. One discipline."). One price chart read
 * twice: first drowning in 30 news annotations, then wiped to the five
 * Framework Library questions.
 *
 * Revision 1 of this component (see conversation history) corrected the
 * scale of the chart, the anchoring of the annotations, the five marks, the
 * wipe's visual presence, the copy column's positioning, the hero handoff,
 * and the chapter→01 handoff. Notes on choices made are inline where they
 * matter.
 *
 * The pin is CSS `position: sticky`, not ScrollTrigger's JS pin — that
 * reserves the chapter's scroll height before any JS runs (the Tailwind
 * `h-[…vh]` class below), so there is no pin-spacer layout shift. The pin
 * now spans the chapter's full 0–100%, including the chapter→01 handoff —
 * revision 1 moved that off a separate trailing block (which produced a
 * hard-edged rectangle) and onto two full-viewport layers inside the same
 * pinned timeline.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const leftPct = (x: number) => `${(x / CHART_VIEW_W) * 100}%`;
const topPct = (y: number) => `${(y / CHART_VIEW_H) * 100}%`;

// dx is also an alignment signal (see labelAlignClass): 0 centres the label
// on its anchor, positive/negative starts or ends it there instead. Marks 1
// and 4 sit at the chart's left edge, so their labels must start-align
// (extend rightward) rather than centre, or half the text runs off-canvas.
const MARK_LABELS = [
  { anchor: { x: REGIME_X_START, y: REGIME_Y + REGIME_BAND_H / 2 }, dx: 6, dy: 0 },
  { anchor: pointAtX(560), dx: 0, dy: -22 },
  { anchor: ENTRY_POINT, dx: 20, dy: 2 },
  { anchor: { x: STOP_X_START, y: STOP_Y }, dx: 2, dy: 18 },
  { anchor: RING_POINT, dx: 16, dy: -28 },
] as const;

function labelAlignClass(dx: number) {
  if (dx > 0) return "";
  if (dx < 0) return "-translate-x-full";
  return "-translate-x-1/2";
}

function QuestionLabel({ index, className = "" }: { index: number; className?: string }) {
  const m = MARK_LABELS[index];
  return (
    <span
      className={`absolute -translate-y-1/2 max-w-[46vw] font-mono text-[15px] leading-snug text-vsc-dark-ink sm:max-w-[26vw] ${labelAlignClass(m.dx)} ${className}`}
      style={{ left: leftPct(m.anchor.x + m.dx), top: topPct(m.anchor.y + m.dy) }}
    >
      <span className="mr-1.5 text-vsc-dark-accent">{index + 1}</span>
      {QUESTIONS[index]}
    </span>
  );
}

/** The five marks, static (used by the reduced-motion frame). All full-opacity VSC green. */
function ChartMarks() {
  return (
    <>
      <rect
        x={REGIME_X_START}
        y={REGIME_Y}
        width={REGIME_X_END - REGIME_X_START}
        height={REGIME_BAND_H}
        className="fill-growth"
        fillOpacity={0.18}
      />
      <line x1={REGIME_X_START} y1={REGIME_Y} x2={REGIME_X_END} y2={REGIME_Y} className="stroke-growth" strokeWidth={1} />
      <path d={STRENGTH_PATH_D} fill="none" className="stroke-growth" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={ENTRY_POINT.x} cy={ENTRY_POINT.y} r={4} className="fill-growth" />
      <line x1={STOP_X_START} y1={STOP_Y} x2={STOP_X_END} y2={STOP_Y} className="stroke-growth" strokeWidth={1} strokeDasharray="3 3" />
      <circle cx={RING_POINT.x} cy={RING_POINT.y} r={4} fill="none" className="stroke-growth" strokeWidth={1.5} />
    </>
  );
}

/** prefers-reduced-motion: three static stacked frames, normal scroll. */
function StaticFrames() {
  return (
    <section className="relative w-full overflow-hidden bg-[#080F0B] py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="mb-4 w-fit border-b border-vsc-dark-hairline pb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-vsc-dark-accent">
          {EYEBROW}
        </div>

        {/* Frame 1 — first reading */}
        <div className="grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <p className="font-display text-[8vw] font-semibold leading-tight text-vsc-dark-ink sm:text-[4.4vw] lg:text-[2.2vw]">
              {BEAT_B}
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="relative mx-auto w-full" style={{ aspectRatio: `${CHART_VIEW_W}/${CHART_VIEW_H}`, maxHeight: "42vh" }}>
              <svg
                viewBox={`0 0 ${CHART_VIEW_W} ${CHART_VIEW_H}`}
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="A single price chart, crowded with market-news annotations that explain every move but say nothing about what to do."
              >
                <path d={PRICE_PATH_D} fill="none" className="stroke-vsc-dark-accent" strokeWidth={1.5} />
              </svg>
              <div className="pointer-events-none absolute inset-0">
                {ANNOTATIONS.slice(0, 12).map((a) => {
                  const anchor = pointAtT(a.t);
                  return (
                    <span
                      key={a.label}
                      className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[13px] text-vsc-dark-ink-muted"
                      style={{ left: leftPct(anchor.x + a.dx), top: topPct(anchor.y + a.dy) }}
                    >
                      {a.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Frame 2 — second reading */}
        <div className="grid gap-10 border-t border-vsc-dark-hairline py-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <p className="font-editorial text-[7vw] [font-style:italic] text-vsc-dark-accent sm:text-[3.4vw] lg:text-[1.8vw]">{BEAT_C}</p>
          </div>
          <div className="lg:col-span-7">
            <div className="relative mx-auto w-full" style={{ aspectRatio: `${CHART_VIEW_W}/${CHART_VIEW_H}`, maxHeight: "42vh" }}>
              <svg
                viewBox={`0 0 ${CHART_VIEW_W} ${CHART_VIEW_H}`}
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="The same price chart, bare except for five marks: the regime, where strength is, the entry, the stop, and where the position is managed."
              >
                <path d={PRICE_PATH_D} fill="none" className="stroke-vsc-dark-accent" strokeWidth={1.5} />
                <ChartMarks />
              </svg>
              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                {QUESTIONS.map((_, i) => (
                  <QuestionLabel key={i} index={i} />
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-2 lg:hidden">
              {QUESTIONS.map((q, i) => (
                <p key={i} className="font-mono text-[13px] leading-snug text-vsc-dark-ink">
                  <span className="mr-1.5 text-vsc-dark-accent">{i + 1}</span>
                  {q}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Frame 3 — Beat D */}
        <div className="max-w-[60ch] border-t border-vsc-dark-hairline py-12">
          <span className="text-[13px] font-semibold text-vsc-dark-ink-muted">{BEAT_D.headline}</span>
          <h2 className="font-editorial mt-3 max-w-[20ch] text-[10vw] leading-[0.95] text-vsc-dark-ink sm:text-[5.6vw] lg:text-[3vw]">
            {BEAT_D.statement}
          </h2>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-vsc-dark-ink-muted">{BEAT_D.support}</p>
        </div>
      </div>
    </section>
  );
}

/** Full pinned, scroll-scrubbed experience — motion allowed. */
function ScrubbedChapter() {
  const rootRef = useRef<HTMLElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const chartGroupRef = useRef<HTMLDivElement | null>(null);
  const copyBoxRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);

  const beatARef = useRef<HTMLParagraphElement | null>(null);
  const beatBRef = useRef<HTMLParagraphElement | null>(null);
  const beatCRef = useRef<HTMLParagraphElement | null>(null);
  const beatDRef = useRef<HTMLDivElement | null>(null);

  const priceLineRef = useRef<SVGPathElement | null>(null);
  const regimeBandRef = useRef<SVGRectElement | null>(null);
  const regimeEdgeRef = useRef<SVGLineElement | null>(null);
  const strengthLineRef = useRef<SVGPathElement | null>(null);
  const entryDotRef = useRef<SVGCircleElement | null>(null);
  const stopLineRef = useRef<SVGLineElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const cursorLineRef = useRef<SVGLineElement | null>(null);
  const cursorTrailRef = useRef<SVGRectElement | null>(null);
  const leaderClipRectRef = useRef<SVGRectElement | null>(null);
  const leadersGroupRef = useRef<SVGGElement | null>(null);

  const annotationsWrapRef = useRef<HTMLDivElement | null>(null);
  const annotationRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const leaderRefs = useRef<Array<SVGLineElement | null>>([]);
  const mobileAnnotationRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const mobileLeaderRefs = useRef<Array<SVGLineElement | null>>([]);
  const markLabelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const mobileQuestionsRef = useRef<HTMLDivElement | null>(null);

  const darkLayerRef = useRef<HTMLDivElement | null>(null);
  const handoffNumeralRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pinEl = pinWrapperRef.current;
      const beatA = beatARef.current;
      if (!pinEl || !beatA) return;

      // --- Beat A's 0–12% "travel": measure where it naturally sits (inside
      // the shared copy box) and where the viewport's centre is, then park it
      // there — large and centred — as the true starting point. Everything
      // after 12% is opacity-only (§5): once it settles at (0,0,scale:1) it
      // never moves again, matching B/C/D which never move at all. ----------
      // Measuring this box's rect is only safe on the x-axis: the sticky
      // container spans the full viewport width whether or not it has
      // actually stuck yet, so rect.left/width are stable at any scroll
      // position. rect.top is not — before the container sticks, it sits at
      // its natural in-flow position (anywhere), so measuring "now" (mount
      // time, scroll position 0) would bake in the wrong offset. The
      // column's own `top-1/2 -translate-y-1/2` already centres it exactly
      // on the viewport's vertical middle once stuck, by construction —
      // so the travel needed on the y-axis is always 0, and doesn't need
      // measuring at all.
      const rect = beatA.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const viewportCenterX = window.innerWidth / 2;
      const travelX = viewportCenterX - elCenterX;

      gsap.set(beatA, { x: travelX, y: 0, scale: 1.7, opacity: 0 });

      // --- Hero → chapter handoff -----------------------------------------
      // Fallback taken: converging the hero's ContourField geometry into the
      // price line would mean reaching into a primitive shared by six other
      // sections (About, Offerings, Research, Enquire, ProcessStepper…) to
      // add a one-off progress hook — out of this component's isolation.
      // Instead the contours fade out over the hero's last stretch of
      // scroll, and — this is the fix for the ~1.5s empty screen — that same
      // stretch also brings the eyebrow and Beat A fully in and draws the
      // first 20% of the price line, so the chapter is already alive by the
      // moment the hero's bottom edge leaves the viewport, not starting from
      // a blank slate (or a frame showing only the eyebrow, which is why the
      // eyebrow is on this same fade rather than always-on). Both elements
      // sit off-screen while this runs (the chapter hasn't scrolled into
      // view yet); it's still real DOM state, so the chapter's very first
      // visible frame already shows it.
      const heroContour = document.getElementById("wvce-hero-contour");
      const heroSection = document.getElementById("arrival");
      gsap.set(eyebrowRef.current, { opacity: 0 });
      if (heroContour && heroSection) {
        gsap.set(priceLineRef.current, { strokeDashoffset: PRICE_PATH_LENGTH });
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        heroTl.to(heroContour, { opacity: 0, ease: "none" }, 0);
        heroTl.to([beatA, eyebrowRef.current], { opacity: 1, ease: "none" }, 0);
        heroTl.to(priceLineRef.current, { strokeDashoffset: PRICE_PATH_LENGTH * 0.8, ease: "none" }, 0);
      } else {
        gsap.set(eyebrowRef.current, { opacity: 1 });
      }

      // --- Initial state for everything else the master timeline drives ---
      gsap.set([beatBRef.current, beatCRef.current, beatDRef.current], { opacity: 0 });
      gsap.set(
        [
          regimeBandRef.current,
          regimeEdgeRef.current,
          strengthLineRef.current,
          entryDotRef.current,
          stopLineRef.current,
          ringRef.current,
          cursorLineRef.current,
          cursorTrailRef.current,
          mobileQuestionsRef.current,
          ...markLabelRefs.current,
        ],
        { opacity: 0 }
      );
      gsap.set(regimeBandRef.current, { attr: { width: 0 } });
      gsap.set(entryDotRef.current, { attr: { r: 0 } });
      gsap.set(ringRef.current, { attr: { r: 2 } });
      gsap.set(annotationRefs.current, { opacity: 0 });
      gsap.set(leaderRefs.current, { opacity: 0 });
      gsap.set(mobileAnnotationRefs.current, { opacity: 0 });
      gsap.set(mobileLeaderRefs.current, { opacity: 0 });

      // --- Master timeline, scrubbed across the chapter's full 0–100% -----
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onEnter: () => {
            if (annotationsWrapRef.current) annotationsWrapRef.current.style.willChange = "transform";
            if (chartGroupRef.current) chartGroupRef.current.style.willChange = "transform";
          },
          onLeave: () => {
            if (annotationsWrapRef.current) annotationsWrapRef.current.style.willChange = "";
            if (chartGroupRef.current) chartGroupRef.current.style.willChange = "";
          },
        },
      });

      // --- Revision 5 pacing: explicit holds. Every window below either
      // animates something or is a deliberate hold — nothing is scheduled
      // inside a hold window, by construction, so "nothing moves" isn't a
      // property to double-check afterward, it's just what an empty window
      // means. ------------------------------------------------------------

      // 0–12: Beat A travels from viewport-centre into the copy column while
      // shrinking; opacity finishes by 3% regardless (§6), well ahead of the
      // 12% the position settles. No explicit "from" on opacity or
      // dashoffset — both continue smoothly from whatever the hero handoff
      // left them at instead of snapping back to hidden.
      tl.to(beatA, { opacity: 1, duration: 3, ease: "none" }, 0);
      tl.to(beatA, { x: 0, y: 0, scale: 1, duration: 12, ease: "power2.out" }, 0);
      tl.to(priceLineRef.current, { strokeDashoffset: PRICE_PATH_LENGTH * 0.65, duration: 12, ease: "none" }, 0);

      // 12–36: first reading builds — line finishes, annotations stagger in,
      // density peaks exactly at 36. Beat A clears fully (no dim "quiet
      // context" ghost) early in this window so it's gone well before Beat B.
      tl.to(priceLineRef.current, { strokeDashoffset: 0, duration: 24, ease: "none" }, 12);
      tl.to(beatA, { opacity: 0, duration: 4 }, 14);
      // The base line dips to 45% opacity in the last stretch before the
      // hold so the (non-overlapping) labels still read as crowding it,
      // rather than relying on text sitting on top of text — and it's fully
      // settled by 36, not still moving into the 36–47 hold/Beat-B window.
      tl.to(priceLineRef.current, { opacity: 0.45, duration: 10, ease: "none" }, 26);

      const desktopGroups = Math.max(...ANNOTATIONS.map((a) => a.group)) + 1;
      ANNOTATIONS.forEach((a, i) => {
        const groupStart = 12 + a.group * (24 / desktopGroups);
        const jitter = (i % 4) * 0.15;
        const targets = [annotationRefs.current[i], leaderRefs.current[i]].filter(Boolean);
        tl.fromTo(targets, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "none" }, groupStart + jitter);
      });

      // Mobile: streamed pairs, at most 6 on screen at once — each pair
      // fades in, holds, then fades out as the next pair arrives, so volume
      // reads as turnover rather than simultaneous count. Compressed into
      // the same 12–36 build window.
      const mobilePairs = Math.max(...ANNOTATIONS_MOBILE.map((a) => a.group)) + 1;
      const mobileSpacing = 20 / (mobilePairs - 1); // starts span 12→32
      for (let pair = 0; pair < mobilePairs; pair++) {
        const start = 12 + pair * mobileSpacing;
        const targets = ANNOTATIONS_MOBILE.map((a, i) => (a.group === pair ? [mobileAnnotationRefs.current[i], mobileLeaderRefs.current[i]] : []))
          .flat()
          .filter(Boolean);
        tl.fromTo(targets, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "none" }, start);
        tl.fromTo(targets, { opacity: 1 }, { opacity: 0, duration: 0.8, ease: "none" }, start + 4.5);
      }

      // 36–39: Beat B fades in, opacity only. The chart's very slight drift
      // also finishes here, not during the hold that follows.
      tl.to(beatBRef.current, { opacity: 1, duration: 3 }, 36);
      tl.to(chartGroupRef.current, { y: "+=3", duration: 3, ease: "none" }, 36);

      // 39–47: HOLD. Beat B + peak density. Nothing scheduled.

      // 47–50: Beat B fades out; annotations freeze and dim together.
      tl.to(beatBRef.current, { opacity: 0, duration: 3 }, 47);
      tl.to([annotationsWrapRef.current, leadersGroupRef.current], { opacity: 0.25, duration: 3 }, 47);

      // 50–58: the wipe. Cursor sweeps left to right with a trailing
      // gradient, clip-path tracking its x exactly (same start/duration/
      // ease, so the two can never visibly drift apart); Beat C fades in at
      // 55, mid-sweep, and the cursor fades out over the wipe's last stretch.
      tl.fromTo(cursorLineRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, 50);
      tl.set(cursorTrailRef.current, { opacity: 1 }, 50);
      tl.fromTo(
        [cursorLineRef.current, cursorTrailRef.current],
        { attr: { x1: 0, x2: 0 } },
        { attr: { x1: CHART_VIEW_W, x2: CHART_VIEW_W }, duration: 8, ease: "none" },
        50
      );
      tl.fromTo(cursorTrailRef.current, { attr: { x: -60 } }, { attr: { x: CHART_VIEW_W - 60 }, duration: 8, ease: "none" }, 50);
      tl.fromTo(
        leaderClipRectRef.current,
        { attr: { x: 0, width: CHART_VIEW_W } },
        { attr: { x: CHART_VIEW_W, width: 0 }, duration: 8, ease: "none" },
        50
      );
      tl.fromTo(
        annotationsWrapRef.current,
        { clipPath: "inset(0% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 100%)", duration: 8, ease: "none" },
        50
      );
      tl.to(priceLineRef.current, { opacity: 1, duration: 2 }, 50); // back to normal as the wipe clears it
      tl.fromTo(beatCRef.current, { opacity: 0 }, { opacity: 1, duration: 2.5 }, 55);
      tl.to([cursorLineRef.current, cursorTrailRef.current], { opacity: 0, duration: 3 }, 55);

      // 58–66: HOLD. Bare chart + Beat C. Nothing scheduled.

      // 66–77: five marks draw at 2% intervals, all finished by 77. Beat C
      // stays visible through this — the structure arrives while the
      // sentence is still on screen.
      const markStarts = [66, 68, 70, 72, 74];

      tl.to(regimeBandRef.current, { opacity: 1, attr: { width: REGIME_X_END - REGIME_X_START }, duration: 6, ease: "none" }, markStarts[0]);
      tl.fromTo(regimeEdgeRef.current, { attr: { x2: REGIME_X_START } }, { opacity: 1, attr: { x2: REGIME_X_END }, duration: 6, ease: "none" }, markStarts[0]);
      tl.fromTo(
        strengthLineRef.current,
        { strokeDashoffset: STRENGTH_PATH_LENGTH },
        { opacity: 1, strokeDashoffset: 0, duration: 6, ease: "none" },
        markStarts[1]
      );
      tl.to(entryDotRef.current, { opacity: 1, attr: { r: 4 }, duration: 5, ease: "none" }, markStarts[2]);
      tl.fromTo(stopLineRef.current, { attr: { x2: STOP_X_START } }, { opacity: 1, attr: { x2: STOP_X_END }, duration: 4, ease: "none" }, markStarts[3]);
      tl.to(ringRef.current, { opacity: 1, attr: { r: 4 }, duration: 3, ease: "none" }, markStarts[4]);

      markStarts.forEach((start, i) => {
        tl.to(markLabelRefs.current[i], { opacity: 1, duration: 1.2 }, start + 1.5);
      });
      // mobile's stacked question list stands in for the five overlaid
      // labels (see the JSX above) — one fade covering the same window
      tl.fromTo(mobileQuestionsRef.current, { opacity: 0 }, { opacity: 1, duration: 4 }, markStarts[0] + 1.5);

      // 77–80: Beat C fades out.
      tl.to(beatCRef.current, { opacity: 0, duration: 3 }, 77);

      // 80–84: HOLD. Five questions, empty left column. Nothing scheduled.

      // 84–87: Beat D fades in; the chart's small settle-scale finishes here
      // too, not during the 87–93 hold.
      tl.fromTo(beatDRef.current, { opacity: 0 }, { opacity: 1, duration: 3 }, 84);
      tl.to(chartGroupRef.current, { scale: 0.92, duration: 3, ease: "power1.out" }, 84);

      // 87–93: HOLD. Beat D + five questions. Nothing scheduled.

      // 93–100: chapter → 01 handoff, unpinning at 93. Two full-viewport
      // layers (dark and warm), the dark one translating fully off-screen
      // via transform — no clip-path, no rect, so there is no seam or corner
      // block at any point in the range. The scene's own content fades out
      // first so only the two layers are doing anything by the time the
      // dark one starts moving.
      tl.to([contentRef.current], { opacity: 0, duration: 3, ease: "none" }, 93);
      tl.fromTo(darkLayerRef.current, { xPercent: 0 }, { xPercent: -100, duration: 7, ease: "none" }, 93);
      // The numeral travels in from roughly where the chart/marks sat (right
      // of centre, mid-height) up into its resting corner, so it visibly
      // rises into the space the marks vacate rather than just fading in
      // place.
      tl.fromTo(
        handoffNumeralRef.current,
        { opacity: 0, x: 380, y: 220, scale: 0.55 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 7, ease: "none" },
        93
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative w-full bg-[#080F0B]">
      <div ref={pinWrapperRef} className="relative h-[320vh] lg:h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* warm layer, behind everything — revealed by the dark layer sliding away */}
          <div className="absolute inset-0 z-0 bg-surface">
            <span
              ref={handoffNumeralRef}
              aria-hidden="true"
              className="font-editorial pointer-events-none absolute -left-10 -top-16 select-none text-[46vw] leading-none text-growth/[0.04] sm:text-[24vw]"
            >
              01
            </span>
          </div>

          {/* dark layer — the scene's real background for 0–85%, then
              slides fully off-screen by transform for the handoff-out */}
          <div ref={darkLayerRef} className="absolute inset-0 z-10 bg-[#080F0B]" />

          {/* the scene itself */}
          <div ref={contentRef} className="absolute inset-0 z-20">
            <div
              ref={eyebrowRef}
              className="absolute left-6 top-28 z-20 w-fit border-b border-vsc-dark-hairline pb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-vsc-dark-accent sm:left-10 sm:top-32"
            >
              {EYEBROW}
            </div>

            <div className="flex h-full flex-col justify-start pt-28 sm:pt-32 lg:block lg:h-full lg:pt-0 px-6 sm:px-10 lg:px-0">
              {/* copy column — beats crossfade in place, same box, same x */}
              <div
                ref={copyBoxRef}
                className="w-[34ch] max-w-full lg:absolute lg:left-[6vw] lg:top-1/2 lg:w-[34ch] lg:-translate-y-1/2"
              >
                <div className="relative w-full min-h-[360px] sm:min-h-[300px] lg:min-h-[220px]">
                  <p
                    ref={beatARef}
                    className="absolute inset-0 flex items-center font-display text-[11vw] font-bold leading-[0.98] tracking-[-0.02em] text-vsc-dark-ink sm:text-[6vw] lg:text-[3.4vw]"
                  >
                    {BEAT_A}
                  </p>
                  <p
                    ref={beatBRef}
                    className="absolute inset-0 flex items-center font-display text-[8vw] font-semibold leading-snug text-vsc-dark-ink sm:text-[4.2vw] lg:text-[2.3vw]"
                  >
                    {BEAT_B}
                  </p>
                  <p
                    ref={beatCRef}
                    className="font-editorial absolute inset-0 flex items-center text-[7vw] [font-style:italic] text-vsc-dark-accent sm:text-[3.6vw] lg:text-[2vw]"
                  >
                    {BEAT_C}
                  </p>
                  <div ref={beatDRef} className="absolute inset-0 flex flex-col justify-center">
                    <span className="text-[13px] font-semibold text-vsc-dark-ink-muted">{BEAT_D.headline}</span>
                    <h2 className="font-editorial mt-3 text-[9vw] leading-[0.95] text-vsc-dark-ink sm:text-[5.4vw] lg:text-[3vw]">
                      {BEAT_D.statement}
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-vsc-dark-ink-muted">{BEAT_D.support}</p>
                  </div>
                </div>
              </div>

              {/* chart column — dominates the frame: min(58vw,1100px) wide,
                  vertically centred, left edge at ~38vw on desktop */}
              <div className="mt-6 lg:mt-0 lg:absolute lg:left-[38vw] lg:top-1/2 lg:-translate-y-1/2">
                <div
                  ref={chartGroupRef}
                  className="relative mx-auto aspect-[800/420] w-full max-h-[42vh] lg:max-h-none lg:w-[min(58vw,1100px)]"
                >
                  <svg
                    viewBox={`0 0 ${CHART_VIEW_W} ${CHART_VIEW_H}`}
                    preserveAspectRatio="xMidYMid meet"
                    className="absolute inset-0 h-full w-full"
                    role="img"
                    aria-label="A single price chart. First it fills with market-news annotations that explain every move but say nothing about what to do; a sweep clears them, leaving five plain questions: what market are we in, where is strength already, is this a setup, how much and where am I wrong, and what does the market have to earn."
                  >
                    <defs>
                      <clipPath id="wvce-leader-clip">
                        <rect ref={leaderClipRectRef} x={0} y={-20} width={CHART_VIEW_W} height={CHART_VIEW_H + 40} />
                      </clipPath>
                      <linearGradient id="wvce-cursor-trail" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--growth)" stopOpacity="0" />
                        <stop offset="100%" stopColor="var(--growth)" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>

                    <g ref={leadersGroupRef} clipPath="url(#wvce-leader-clip)">
                      <g className="hidden lg:block">
                        {ANNOTATIONS.map((a, i) => {
                          const anchor = pointAtT(a.t);
                          return (
                            <line
                              key={a.label}
                              ref={(el) => {
                                leaderRefs.current[i] = el;
                              }}
                              x1={anchor.x}
                              y1={anchor.y}
                              x2={anchor.x + a.dx}
                              y2={anchor.y + a.dy}
                              className="stroke-vsc-dark-accent/60"
                              strokeWidth={0.5}
                            />
                          );
                        })}
                      </g>
                      <g className="lg:hidden">
                        {ANNOTATIONS_MOBILE.map((a, i) => {
                          const anchor = pointAtT(a.t);
                          return (
                            <line
                              key={a.label}
                              ref={(el) => {
                                mobileLeaderRefs.current[i] = el;
                              }}
                              x1={anchor.x}
                              y1={anchor.y}
                              x2={anchor.x + a.dx}
                              y2={anchor.y + a.dy}
                              className="stroke-vsc-dark-accent/60"
                              strokeWidth={0.5}
                            />
                          );
                        })}
                      </g>
                    </g>

                    <path
                      ref={priceLineRef}
                      d={PRICE_PATH_D}
                      fill="none"
                      className="stroke-vsc-dark-accent"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ strokeDasharray: PRICE_PATH_LENGTH }}
                    />

                    {/* mark 1 — regime band */}
                    <rect ref={regimeBandRef} x={REGIME_X_START} y={REGIME_Y} width={0} height={REGIME_BAND_H} className="fill-growth" fillOpacity={0.18} />
                    <line ref={regimeEdgeRef} x1={REGIME_X_START} y1={REGIME_Y} x2={REGIME_X_START} y2={REGIME_Y} className="stroke-growth" strokeWidth={1} />

                    {/* mark 2 — strength segment */}
                    <path
                      ref={strengthLineRef}
                      d={STRENGTH_PATH_D}
                      fill="none"
                      className="stroke-growth"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ strokeDasharray: STRENGTH_PATH_LENGTH }}
                    />

                    {/* mark 3 — entry */}
                    <circle ref={entryDotRef} cx={ENTRY_POINT.x} cy={ENTRY_POINT.y} r={0} className="fill-growth" />

                    {/* mark 4 — stop */}
                    <line ref={stopLineRef} x1={STOP_X_START} y1={STOP_Y} x2={STOP_X_START} y2={STOP_Y} className="stroke-growth" strokeWidth={1} strokeDasharray="3 3" />

                    {/* mark 5 — exit ring */}
                    <circle ref={ringRef} cx={RING_POINT.x} cy={RING_POINT.y} r={2} fill="none" className="stroke-growth" strokeWidth={1.5} />

                    {/* the wipe cursor and its trailing gradient */}
                    <rect ref={cursorTrailRef} x={-60} y={-24} width={60} height={CHART_VIEW_H + 48} fill="url(#wvce-cursor-trail)" />
                    <line ref={cursorLineRef} x1={0} y1={-24} x2={0} y2={CHART_VIEW_H + 24} className="stroke-growth" strokeWidth={1.5} />
                  </svg>

                  <div ref={annotationsWrapRef} className="pointer-events-none absolute inset-0">
                    <div className="hidden lg:block">
                      {ANNOTATIONS.map((a, i) => {
                        const anchor = pointAtT(a.t);
                        return (
                          <span
                            key={a.label}
                            ref={(el) => {
                              annotationRefs.current[i] = el;
                            }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[12px] text-vsc-dark-ink-muted"
                            style={{ left: leftPct(anchor.x + a.dx), top: topPct(anchor.y + a.dy) }}
                          >
                            {a.label}
                          </span>
                        );
                      })}
                    </div>
                    <div className="lg:hidden">
                      {ANNOTATIONS_MOBILE.map((a, i) => {
                        const anchor = pointAtT(a.t);
                        return (
                          <span
                            key={a.label}
                            ref={(el) => {
                              mobileAnnotationRefs.current[i] = el;
                            }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] text-vsc-dark-ink-muted"
                            style={{ left: leftPct(anchor.x + a.dx), top: topPct(anchor.y + a.dy) }}
                          >
                            {a.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* the chart itself is small enough on mobile that five
                      overlaid multi-word labels crowd and cross each other,
                      so the marks stay on the chart but their questions move
                      to the stacked list below on narrow screens instead */}
                  <div className="pointer-events-none absolute inset-0 hidden lg:block">
                    {QUESTIONS.map((_, i) => {
                      const m = MARK_LABELS[i];
                      return (
                        <span
                          key={i}
                          ref={(el) => {
                            markLabelRefs.current[i] = el;
                          }}
                          className={`absolute -translate-y-1/2 max-w-[26vw] font-mono text-[15px] leading-snug text-vsc-dark-ink ${labelAlignClass(m.dx)}`}
                          style={{ left: leftPct(m.anchor.x + m.dx), top: topPct(m.anchor.y + m.dy) }}
                        >
                          <span className="mr-1.5 text-vsc-dark-accent">{i + 1}</span>
                          {QUESTIONS[i]}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div ref={mobileQuestionsRef} className="mt-4 space-y-1 lg:hidden">
                  {QUESTIONS.map((q, i) => (
                    <p key={i} className="font-mono text-[13px] leading-snug text-vsc-dark-ink">
                      <span className="mr-1.5 text-vsc-dark-accent">{i + 1}</span>
                      {q}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyVscExists() {
  // framer-motion's useReducedMotion reads matchMedia synchronously on the
  // client, so it can already disagree with the server on the very first
  // render — picking a whole different tree (StaticFrames vs ScrubbedChapter)
  // on that mismatch throws a hydration error. Rendering ScrubbedChapter
  // unconditionally until after mount keeps the first client render
  // identical to the server's, then swaps client-side (a normal post-mount
  // update, not a hydration diff) if the visitor actually prefers reduced
  // motion.
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Deliberate mount-gate (the standard fix for a value, like matchMedia
    // here, that can only be read after hydration): this is the one render
    // the flag is allowed to change on, not an update loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (mounted && reduce) return <StaticFrames />;
  return <ScrubbedChapter />;
}

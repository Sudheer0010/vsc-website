"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { offeringsConfig } from "./offeringsConfig";

/**
 * Three sibling rows, not three identical cards in one container
 * (v2.1 §1). The previous version gave all three offerings the same
 * shape — quote, name, best-if, link, inside one shared white card —
 * which meant identical structure regardless of what actually differs
 * between them. It read as flat because the template was flat, not
 * because the copy was weak.
 *
 * The hierarchy axis here is access, not price: Learning Hub is open
 * now, Advantage is by application, Inner Circle is by invitation. That
 * preserves "these aren't tiers of the same thing" — the treatment ranks
 * how you get in, not which one costs more or is "better."
 *
 * Inner Circle's matte-black block is the ONLY inverted treatment on the
 * entire site. Its scarcity is the exclusivity signal — reusing this
 * anywhere else would spend that signal and it stops meaning anything.
 * Colours are hardcoded (not added as reusable tokens) specifically so
 * nothing else can casually reach for them.
 */

const TIER_STYLES: Record<
  string,
  { wrapper: string; state: string; avail: string; name: string; spec: string; fit: string; cta: string }
> = {
  open: {
    wrapper: "bg-surface border-l-[3px] border-l-growth",
    state: "text-growth",
    avail: "text-ink-faint",
    name: "text-ink",
    spec: "text-ink-muted",
    fit: "text-ink-soft",
    cta: "text-growth",
  },
  apply: {
    wrapper: "bg-canvas-sunk border-l-[3px] border-l-ink",
    state: "text-ink",
    avail: "text-ink-faint",
    name: "text-ink",
    spec: "text-ink-muted",
    fit: "text-ink-soft",
    cta: "text-growth",
  },
  invite: {
    wrapper: "border-l-[3px] border-l-growth",
    state: "",
    avail: "",
    name: "",
    spec: "",
    fit: "",
    cta: "",
  },
};

export function ThreePillarsOverview() {
  return (
    <section id="offerings-overview" className="relative w-full border-b border-rule bg-canvas py-20 sm:py-28">
      <div className="container mx-auto max-w-[880px]">
        <Reveal className="max-w-[46ch]">
          <h2 className="font-display text-ink">Start where you are.</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            These aren&apos;t tiers of the same thing — they fit different
            situations. Find the sentence that sounds like you.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 sm:mt-14">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {offeringsConfig.map((row) => {
              const isInvite = row.tier === "invite";
              const t = TIER_STYLES[row.tier];
              return (
                <article
                  key={row.slug}
                  className={`flex flex-col rounded-vsc-lg p-7 sm:p-9 ${t.wrapper}`}
                  style={isInvite ? { backgroundColor: "#111110", color: "#F2EFE6" } : undefined}
                >
                  <header
                    className={`mb-6 flex items-baseline justify-between border-b pb-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] ${isInvite ? "" : "border-rule"}`}
                    style={isInvite ? { borderColor: "rgba(242,239,230,.18)" } : undefined}
                  >
                    <span style={isInvite ? { color: "#7FB894" } : undefined} className={t.state}>
                      {row.stateLabel}
                    </span>
                    <span style={isInvite ? { color: "rgba(242,239,230,.62)" } : undefined} className={t.avail}>
                      {row.availabilityShort}
                    </span>
                  </header>

                  <blockquote
                    className="max-w-[24ch] font-display text-[clamp(20px,2.2vw,26px)] font-medium leading-snug"
                    style={isInvite ? { color: "#F2EFE6" } : undefined}
                  >
                    &ldquo;{row.quote}&rdquo;
                  </blockquote>

                  <h3
                    className={`mb-1.5 mt-5 text-[17px] font-semibold ${t.name}`}
                    style={isInvite ? { color: "#F2EFE6" } : undefined}
                  >
                    {row.shortTitle}
                  </h3>

                  <p
                    className={`mb-5 font-mono text-[13px] ${t.spec}`}
                    style={isInvite ? { color: "rgba(242,239,230,.62)" } : undefined}
                  >
                    {row.format}
                  </p>

                  <p
                    className={`mb-6 max-w-[52ch] text-[15px] leading-relaxed ${t.fit}`}
                    style={isInvite ? { color: "#F2EFE6" } : undefined}
                  >
                    <span className="font-semibold" style={isInvite ? { color: "#F2EFE6" } : { color: "var(--ink)" }}>
                      Best if
                    </span>{" "}
                    {row.bestIf}
                  </p>

                  <Link
                    href={row.proofHref}
                    className={`group mt-auto inline-flex w-fit items-center gap-1.5 text-[14px] font-semibold ${t.cta}`}
                    style={isInvite ? { color: "#7FB894" } : undefined}
                  >
                    {row.proofLabel}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-physical group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-6">
          <p className="text-[13.5px] text-ink-faint">
            None of the three are priced publicly yet — pricing is shared
            plainly once we know which one fits, not gated behind a form.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * The business, not the product list — three verticals VSC is being built
 * around (Education / Capital / Growth), each fronted by the human verb it
 * exists to deliver (Learn / Grow / Connect). Deliberately not the same
 * shape as /offerings: no product names as headings, no per-column links —
 * this explains the architecture the offerings sit inside, and only the
 * bottom line sends anyone anywhere.
 */

const VERTICALS = [
  {
    number: "01",
    label: "VSC EDUCATION",
    verb: "LEARN.",
    tagline: "Build market knowledge and develop a skill you can keep improving.",
    body: "Understand markets, trading and risk before putting serious money behind decisions.",
  },
  {
    number: "02",
    label: "VSC CAPITAL",
    verb: "GROW.",
    tagline: "Put capital to work with research and a clear process.",
    body: "Research, frameworks and disciplined decision-making for people who want to grow capital systematically.",
  },
  {
    number: "03",
    label: "VSC COMMUNITY",
    verb: "CONNECT.",
    tagline: "Get better around people who take markets seriously.",
    body: "Discuss markets, challenge ideas and keep improving with other serious participants.",
  },
];

export function HowWeHelpSection() {
  return (
    <section id="fit" className="relative w-full border-b border-rule bg-surface py-20 sm:py-28">
      <div className="container mx-auto max-w-[1120px]">
        <Reveal>
          <h2 className="max-w-[20ch] font-display text-ink">
            How VSC can help.
          </h2>
          <p className="mt-4 font-mono text-sm font-semibold uppercase tracking-[0.08em] text-ink-faint">
            Learn. Grow. Connect.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-14 sm:mt-16">
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-px sm:bg-rule">
            {VERTICALS.map((item) => (
              <div key={item.number} className="bg-surface sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <span className="font-mono text-sm font-semibold text-growth">
                  {item.number}
                </span>
                <span className="mx-1.5 font-mono text-sm text-ink-faint">&middot;</span>
                <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                  {item.label}
                </span>
                <div className="mt-4 font-display text-[clamp(30px,4vw,44px)] font-bold leading-[1] tracking-[-0.02em] text-ink">
                  {item.verb}
                </div>
                <p className="mt-3 max-w-[28ch] text-[16px] font-medium leading-snug text-ink">
                  {item.tagline}
                </p>
                <p className="mt-2.5 max-w-[32ch] text-[14px] leading-relaxed text-ink-faint">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-12 sm:mt-14">
          <Link
            href="/offerings"
            className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-growth"
          >
            Explore all offerings
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

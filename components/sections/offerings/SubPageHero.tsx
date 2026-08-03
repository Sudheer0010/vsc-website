import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * The shared hero shape for all three sub-pages (v2.1 §2.2). The old
 * version was centred with a mono body paragraph — mono is the utility
 * face (captions, labels, data) everywhere else on this site, never a
 * body face, and a long centred mono paragraph was the single strongest
 * tell that these three pages were built as a separate product from the
 * rest of it. Left-aligned, green mono eyebrow, display h1, body-face
 * paragraph capped at 58ch — the same shape the homepage and Offerings
 * landing page already use.
 */
export function SubPageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[720px]">
      <Link
        href="/offerings"
        className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        Back to Offerings
      </Link>

      <span className="eyebrow">{eyebrow}</span>
      <h1 className="font-display text-ink">{title}</h1>
      <p className="mt-5 max-w-[58ch] text-[18px] leading-relaxed text-ink-soft">
        {description}
      </p>
    </div>
  );
}

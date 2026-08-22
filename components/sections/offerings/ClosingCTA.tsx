import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { VSCButton } from "@/components/ui/vsc/VSCButton";

/**
 * The shared closing CTA for the Offerings landing page and all three
 * sub-pages (v2.1 §2.5). "Ready to begin? Enquire →" and "Get your
 * queries answered FAQ →" as two centred mono lines was the weakest
 * block on either sub-page — two low-weight, near-identical lines with
 * no real hierarchy between them. This reuses the homepage's closing-
 * band shape (StepRule, headline, one primary button) instead, with the
 * FAQ link demoted to a genuinely secondary line beneath it.
 */
export function ClosingCTA({
  headline = "Ready to begin?",
  subline = "No pitch and no obligation — a conversation about whether this is the right fit.",
  ctaLabel = "Enquire",
  faqLabel = "Or get your questions answered in the FAQ",
}: {
  headline?: string;
  subline?: string;
  /** Button text — override per page; defaults keep every existing caller
   *  (Offerings gateway, Learning Hub, Advantage) byte-identical. */
  ctaLabel?: string;
  faqLabel?: string;
}) {
  return (
    <section className="relative w-full border-t border-rule bg-canvas py-20 sm:py-28">
      <div className="container mx-auto max-w-[1120px]">
        <Reveal className="mx-auto flex max-w-[26ch] flex-col items-center text-center">
          <StepRule size="lg" />
          <h2 className="mt-7 font-display text-ink">{headline}</h2>
          <p className="mt-5 max-w-[46ch] text-[18px] leading-relaxed text-ink-soft">
            {subline}
          </p>
          <div className="mt-9">
            <VSCButton href="/enquire" variant="growth" className="px-8 text-[17px]">
              {ctaLabel}
            </VSCButton>
          </div>
          <Link
            href="/faq"
            className="mt-6 text-[14.5px] font-medium text-ink-muted transition-colors hover:text-growth link-underline"
          >
            {faqLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

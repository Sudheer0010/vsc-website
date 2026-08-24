import React from "react";
import { NewsletterConfig } from "@/types/newsletter";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";

interface NewsletterCTAProps {
  newsletterConfig: NewsletterConfig;
}

export function NewsletterCTA({ newsletterConfig }: NewsletterCTAProps) {
  return (
    <section className="py-[72px] border-t border-rule select-none animate-fade-in">
      <div className="max-w-[650px] mx-auto text-center flex flex-col items-center">

        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-4xl leading-[1.2] text-ink font-normal tracking-tight mb-3 max-w-[500px]">
          {newsletterConfig.title}
        </h2>

        {/* Submessage */}
        <p className="font-mono text-sm text-ink-soft leading-relaxed mb-8 max-w-[480px]">
          {newsletterConfig.description}
        </p>

        <EmailCapture variant="centered-wide" className="w-full max-w-[500px]" />

      </div>
    </section>
  );
}

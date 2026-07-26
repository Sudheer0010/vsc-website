import React from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <SectionContainer 
      id="apply" 
      className="pt-16 pb-28 md:pt-20 md:pb-36 select-none bg-[#060810]/30 border-t border-white/[0.02] bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.06),transparent_60%)]"
    >
      <div className="max-w-[750px] mx-auto text-center flex flex-col items-center">
        
        {/* Eyebrow */}
        <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-6 block font-semibold">
          FINAL INVITATION
        </span>
        
        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-[38px] leading-[1.25] text-white font-normal tracking-tight mb-8 max-w-[650px]">
          Every investment journey begins with a conversation.
        </h2>

        {/* Copy statements */}
        <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 max-w-[500px]">
          If VSC can genuinely help, we&apos;ll explain how.
        </p>
        <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed mb-12 max-w-[500px]">
          If another path is better, we&apos;ll tell you that honestly too.
        </p>

        {/* Action button */}
        <Button 
          variant="gold" 
          href="/enquire" 
          className="px-10 py-4 text-xs font-mono tracking-wider uppercase"
        >
          Let&apos;s Discuss
        </Button>

      </div>
    </SectionContainer>
  );
}

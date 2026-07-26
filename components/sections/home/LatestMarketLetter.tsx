import React from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/button";

export function LatestMarketLetter() {
  return (
    <SectionContainer 
      id="research-preview" 
      className="py-28 md:py-36 select-none bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.045),transparent_60%)] border-y border-white/[0.02]"
    >
      <div className="max-w-[750px] mx-auto text-center flex flex-col items-center">
        
        {/* Eyebrow */}
        <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-6 block font-semibold">
          KNOWLEDGE BASE
        </span>
        
        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-[38px] leading-[1.2] text-white font-normal tracking-tight mb-8">
          Research Library
        </h2>

        {/* Copy blocks */}
        <p className="font-display text-xl sm:text-2xl text-white/50 leading-relaxed mb-4 max-w-[620px] font-light italic">
          Every investment decision begins with research.
        </p>
        
        <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed mb-12 max-w-[550px]">
          Each month we publish market observations, execution journals, and investment frameworks documenting both our thinking and our process.
        </p>

        {/* Action Button */}
        <Button 
          variant="gold" 
          href="/blog" 
          className="px-10 py-4 text-xs font-mono tracking-wider uppercase font-bold shadow-[0_4px_20px_rgba(201,168,76,0.15)] hover:shadow-[0_4px_30px_rgba(201,168,76,0.3)] transition-all duration-300"
        >
          Explore the Research Library →
        </Button>

      </div>
    </SectionContainer>
  );
}

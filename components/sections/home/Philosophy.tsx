import React from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function Philosophy() {
  return (
    <SectionContainer id="philosophy" className="py-32 md:py-44 bg-[#FBFAF6] select-none">
      <div className="max-w-[950px] mx-auto text-left flex flex-col gap-12">
        
        {/* Eyebrow */}
        <span className="font-mono text-xs tracking-[0.25em] text-ink-faint uppercase block font-semibold">
          WHY WE EXIST
        </span>

        {/* Manifesto typographic flow */}
        <div className="flex flex-col gap-8">
          <p className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-ink-faint font-normal leading-[1.15] tracking-tight">
            Most investors are offered two choices.
          </p>
          <p className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-ink-faint font-normal leading-[1.15] tracking-tight">
            Passive investing.
          </p>
          <p className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-ink-faint font-normal leading-[1.15] tracking-tight">
            Or emotional speculation.
          </p>
          <p className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-accent-gold font-normal leading-[1.1] tracking-tight mt-6">
            We believe there&apos;s a better way.
          </p>
        </div>

      </div>
    </SectionContainer>
  );
}

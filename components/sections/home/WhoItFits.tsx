import React from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function WhoItFits() {
  const principles = [
    {
      title: "Protect Capital",
      manifesto: "Capital preservation comes first."
    },
    {
      title: "Wait For Asymmetry",
      manifesto: "Only act when reward clearly outweighs risk."
    },
    {
      title: "Execute Without Emotion",
      manifesto: "Rules decide. Not opinions."
    }
  ];

  return (
    <SectionContainer id="philosophy-principles" className="py-28 md:py-36 select-none bg-[#FBFAF6]/40 border-y border-rule">
      <div className="max-w-[1000px] mx-auto text-left">
        
        {/* Eyebrow & Title */}
        <div className="mb-24">
          <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-5 block font-semibold">
            FOUNDATIONAL LAWS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[40px] leading-[1.15] text-ink font-normal tracking-tight">
            Our Investment Philosophy
          </h2>
        </div>

        {/* 3 Principles Layout with large whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {principles.map((pr, idx) => (
            <div key={idx} className="flex flex-col items-start gap-4">
              <span className="font-mono text-xs text-accent-gold/45 block font-semibold">
                0{idx + 1}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal leading-tight">
                {pr.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-ink-soft leading-relaxed mt-3 border-l border-accent-gold/45 pl-4 py-1 italic">
                {pr.manifesto}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SectionContainer>
  );
}

import React from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function MarketEnvironment() {
  const pillars = [
    {
      icon: "📈",
      title: "Market Structure",
      desc: "Understanding trend quality before deploying capital."
    },
    {
      icon: "🏦",
      title: "Institutional Activity",
      desc: "Following accumulation before public participation."
    },
    {
      icon: "⚡",
      title: "Momentum",
      desc: "Buying strength rather than predicting reversals."
    },
    {
      icon: "🛡️",
      title: "Risk",
      desc: "Capital preservation before return generation."
    },
    {
      icon: "🔄",
      title: "Sector Rotation",
      desc: "Following leadership instead of opinions."
    },
    {
      icon: "📊",
      title: "Relative Strength",
      desc: "Comparing opportunities against the broader market."
    }
  ];

  return (
    <SectionContainer id="pillars" bg="secondary" className="py-28 md:py-36 select-none">
      <div className="max-w-[900px] mx-auto text-left">
        
        {/* Eyebrow & Title */}
        <div className="mb-20">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-faint uppercase mb-4 block font-semibold">
            RESEARCH PILLARS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[38px] leading-[1.2] text-ink font-normal tracking-tight">
            What Drives Every Decision
          </h2>
        </div>

        {/* borderless list elements */}
        <div className="flex flex-col divide-y divide-rule border-t border-b border-rule">
          {pillars.map((pi, idx) => (
            <div key={idx} className="grid grid-cols-12 py-8 gap-4 items-center">
              {/* Icon cell */}
              <div className="col-span-2 sm:col-span-1 text-2xl">
                {pi.icon}
              </div>
              
              {/* Info cell */}
              <div className="col-span-10 sm:col-span-11 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6">
                <h3 className="font-display text-lg text-ink font-medium min-w-[200px]">
                  {pi.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-ink-soft leading-relaxed sm:text-right flex-grow">
                  {pi.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SectionContainer>
  );
}

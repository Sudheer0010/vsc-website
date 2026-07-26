import React from "react";
import { Framework } from "@/types/framework";
import { Card } from "@/components/ui/Card";

interface FrameworkLibraryProps {
  frameworkLibrary: Framework[];
}

export function FrameworkLibrary({ frameworkLibrary }: FrameworkLibraryProps) {
  return (
    <section className="py-24 border-t border-white/5 animate-fade-in">
      <div className="max-w-[600px] mb-16 text-left select-none">
        <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block">
          EVERGREEN SYSTEMS
        </span>
        <h2 className="font-display text-3xl md:text-[38px] text-white font-normal leading-[1.2]">
          Framework Library
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
        {frameworkLibrary.map((fw, idx) => (
          <Card 
            key={idx}
            className="bg-[#0B0F1E] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/10 transition-colors duration-200"
          >
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] text-accent-gold/60 tracking-wider uppercase font-semibold">
                SYSTEM MODULE
              </span>
              <h3 className="font-display text-lg sm:text-xl text-white font-medium">
                {fw.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">
                {fw.desc}
              </p>
            </div>
            <span className="font-mono text-[10px] text-white/30 uppercase mt-8 block">
              Coming Soon
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
}

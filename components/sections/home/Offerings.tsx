import React from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Card } from "@/components/ui/Card";
import { 
  Search, 
  Hourglass, 
  Target, 
  ShieldCheck, 
  Play, 
  RotateCw 
} from "lucide-react";

export function Offerings() {
  const steps = [
    {
      num: "01",
      title: "Research",
      desc: "We study institutional footprints.",
      icon: Search
    },
    {
      num: "02",
      title: "Wait",
      desc: "We stay in cash when opportunities don't exist.",
      icon: Hourglass
    },
    {
      num: "03",
      title: "Select",
      desc: "We participate only when probabilities favour us.",
      icon: Target
    },
    {
      num: "04",
      title: "Protect",
      desc: "Risk is defined before capital is committed.",
      icon: ShieldCheck
    },
    {
      num: "05",
      title: "Execute",
      desc: "Rules replace emotions.",
      icon: Play
    },
    {
      num: "06",
      title: "Review",
      desc: "Every decision improves the next.",
      icon: RotateCw
    }
  ];

  return (
    <SectionContainer 
      id="what-we-do" 
      className="py-28 md:py-36 bg-[#FBFAF6]/30 border-y border-rule select-none"
    >
      <div className="max-w-[1100px] mx-auto text-left">
        
        {/* Header */}
        <div className="mb-20">
          <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-5 block font-semibold">
            METHODOLOGY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[40px] leading-[1.15] text-ink font-normal tracking-tight mb-5">
            How VSC actually invests
          </h2>
          <p className="font-mono text-xs sm:text-sm text-ink-soft leading-relaxed max-w-[500px]">
            We follow a systematic, visual sequence designed to capture asymmetric market opportunities under strict rules.
          </p>
        </div>

        {/* 6 Steps Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card 
                key={idx}
                className="bg-[#FFFFFF] border border-rule rounded-2xl p-8 flex flex-col justify-between hover:border-rule transition-colors duration-200 min-h-[200px]"
              >
                {/* Card Header (Num + Icon) */}
                <div className="flex justify-between items-start w-full">
                  <span className="font-mono text-2xl text-accent-gold/45 font-bold">
                    {step.num}
                  </span>
                  <span className="text-ink-faint transition-colors duration-200">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-2 mt-8">
                  <h3 className="font-display text-xl text-ink font-medium">
                    {step.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </SectionContainer>
  );
}

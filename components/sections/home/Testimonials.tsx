import React, { useState } from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Testimonials() {
  const testimonials = [
    {
      quote: "VSC's framework replaced chaos with structure. The transition from trading social media noise to executing a defined momentum checklist has completely reframed my approach to capital preservation.",
      name: "Shivam Thakur",
      role: "Market Participant"
    },
    {
      quote: "The focus on institutional footprints and sector rotation provides a logical basis for every setup. It eliminates emotional guesswork, allowing consistent execution around my professional schedule.",
      name: "Sai Eshwar",
      role: "Working Professional"
    },
    {
      quote: "Treating trading as a business requires mathematical risk control. VSC's sizing models and predefined exits have made drawdowns predictable, manageable, and stress-free.",
      name: "Hema Chandra",
      role: "Business Owner"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <SectionContainer 
      id="perspective" 
      className="pt-28 md:pt-36 pb-12 md:pb-16 select-none bg-[#060810]/20 border-t border-white/[0.02]"
    >
      <div className="max-w-[850px] mx-auto text-left flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex justify-between items-end w-full">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase block mb-4 font-semibold">
              INVESTOR PERSPECTIVE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-normal tracking-tight">
              What other investors say
            </h2>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-4">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/5 bg-[#0B0F1E] flex items-center justify-center text-white/60 hover:text-white hover:border-accent-gold/45 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1E]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/5 bg-[#0B0F1E] flex items-center justify-center text-white/60 hover:text-white hover:border-accent-gold/45 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1E]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Carousel Content Panel */}
        <div className="relative min-h-[220px] sm:min-h-[140px] flex items-center pl-6 sm:pl-8 border-l border-accent-gold/45">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-5"
            >
              <blockquote className="font-display text-xl sm:text-2xl text-white font-light leading-[1.5] italic">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <cite className="not-italic font-display text-base text-text-primary font-medium">
                    {testimonials[activeIndex].name}
                  </cite>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
                    {testimonials[activeIndex].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicator dots */}
        <div className="flex gap-2 justify-start pl-6 sm:pl-8">
          {testimonials.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1E] ${
                idx === activeIndex ? "bg-accent-gold" : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </SectionContainer>
  );
}

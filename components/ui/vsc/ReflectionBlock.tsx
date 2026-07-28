"use client";

import React from "react";

interface ReflectionBlockProps {
  question: string;
  className?: string;
}

export function ReflectionBlock({ question, className = "" }: ReflectionBlockProps) {
  return (
    <section className={`relative z-10 w-full py-16 sm:py-24 border-t border-white/[0.04] select-none ${className}`}>
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-[850px] mx-auto text-center flex flex-col items-center">
          {/* Sky Blue indicator dot */}
          <div aria-hidden="true" className="w-2 h-2 rounded-full bg-[#38BDF8] mb-8 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />

          {/* Intellectual Reflection Question in Sky Blue (#38BDF8) */}
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-[#38BDF8] font-normal leading-[1.3] tracking-tight text-center drop-shadow-md">
            &ldquo;{question}&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}

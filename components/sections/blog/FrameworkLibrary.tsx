"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Framework } from "@/types/framework";
import { Card } from "@/components/ui/Card";

interface FrameworkLibraryProps {
  frameworkLibrary: Framework[];
}

export function FrameworkLibrary({ frameworkLibrary }: FrameworkLibraryProps) {
  const categories = ["ALL", "Macro & Regimes", "Risk Rules", "Execution", "Psychology"];
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredFrameworks =
    activeCategory === "ALL"
      ? frameworkLibrary
      : frameworkLibrary.filter((fw) => fw.category === activeCategory);

  return (
    <section className="py-24 border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 select-none">
        <div className="max-w-[600px] text-left">
          <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block font-semibold">
            EVERGREEN SYSTEMS
          </span>
          <h2 className="font-display text-3xl md:text-[38px] text-white font-normal leading-[1.2]">
            Framework Library
          </h2>
        </div>

        {/* Fluid Sliding Pill Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-black/40 border border-white/10 rounded-full backdrop-blur-md">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-1.5 font-mono text-xs transition-colors duration-200 rounded-full ${
                  isActive ? "text-bg-dark font-semibold" : "text-white/60 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="categoryPill"
                    className="absolute inset-0 bg-accent-gold rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid with Animated Layout Transitions */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
        <AnimatePresence mode="popLayout">
          {filteredFrameworks.map((fw) => (
            <motion.div
              key={fw.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="bg-[#0B0F1E] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/15 transition-all duration-200 h-full">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-accent-gold/70 tracking-wider uppercase font-semibold">
                      SYSTEM MODULE
                    </span>
                    {fw.category && (
                      <span className="font-mono text-[10px] text-white/40 bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/10">
                        {fw.category}
                      </span>
                    )}
                  </div>
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
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

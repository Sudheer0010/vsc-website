import React from "react";
import { Article } from "@/types/article";
import { Card } from "@/components/ui/Card";
import { Byline } from "@/components/ui/vsc/Byline";

interface ResearchGridProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredArticles: Article[];
  onOpenLetter?: (month: string) => void;
}

export function ResearchGrid({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  filteredArticles,
  onOpenLetter,
}: ResearchGridProps) {
  return (
    <section className="py-24 border-t border-rule animate-fade-in">
      <div className="flex flex-col gap-8 mb-12 select-none">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-ink-faint uppercase mb-2 block">
              PUBLICATIONS
            </span>
            <h2 className="font-display text-3xl md:text-[38px] text-ink font-normal leading-[1.2]">
              Latest Research
            </h2>
          </div>
          
          {/* Global Search Input */}
          <div className="relative w-full max-w-[340px]">
            <input 
              type="text"
              placeholder="Search the Research Library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FBFAF6]/60 border border-rule rounded-xl py-3 px-4 font-mono text-xs text-ink placeholder-white/20 focus:outline-none focus:border-accent-gold/45 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Responsive Category Chips Row */}
        <div className="flex overflow-x-auto gap-2 pb-3 whitespace-nowrap scrollbar-hide border-b border-rule">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center py-2 px-4 rounded-full font-mono text-xs transition-colors duration-200 ${
                  isActive 
                    ? "bg-accent-gold text-black font-semibold" 
                    : "bg-[#FFFFFF] text-ink-muted hover:text-ink border border-rule"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Articles Grid list */}
      {filteredArticles.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center select-none border border-rule rounded-xl bg-canvas-sunk">
          <p className="font-mono text-sm text-ink-soft mb-2 font-semibold">
            Coming Soon
          </p>
          <p className="font-mono text-xs text-ink-faint">
            Research currently in preparation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <Card
              key={art.id}
              variant="default"
              onClick={() => {
                if (art.type === "MARKET LETTER" && onOpenLetter) {
                  onOpenLetter(art.slug);
                }
              }}
              className="bg-[#FFFFFF] hover:bg-[#FFFFFF] border border-rule hover:border-rule rounded-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-[240ms] ease-out select-none"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-accent-gold/70">
                    {art.type}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">
                    {art.publishedDate}
                  </span>
                </div>
                
                <h3 className="font-display text-xl text-ink font-medium group-hover:text-accent-gold transition-colors duration-200">
                  {art.title}
                </h3>
                <p className="font-mono text-xs text-ink-muted leading-relaxed">
                  {art.description}
                </p>
              </div>

              <div className="mt-8 border-t border-rule pt-4">
                <Byline className="block" />
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-ink-faint uppercase">
                    {art.category}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">
                    {art.readingTime}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

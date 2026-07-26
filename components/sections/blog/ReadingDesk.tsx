import React from "react";
import { ReadingItem } from "@/types/reading";
import { Card } from "@/components/ui/Card";

interface ReadingDeskProps {
  books: ReadingItem[];
  annualLetters: ReadingItem[];
  talks: ReadingItem[];
}

export function ReadingDesk({
  books,
  annualLetters,
  talks,
}: ReadingDeskProps) {
  return (
    <section className="py-24 border-t border-white/5 animate-fade-in">
      <div className="max-w-[600px] mb-16 text-left select-none">
        <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-4 block">
          BIBLIOGRAPHY
        </span>
        <h2 className="font-display text-3xl md:text-[38px] text-white font-normal leading-[1.2]">
          Reading Desk
        </h2>
      </div>

      <div className="flex flex-col gap-16 select-none">
        
        {/* Subsection 1: Books */}
        <div>
          <h3 className="font-display text-xl text-white font-semibold mb-8 pl-1 border-l-2 border-accent-gold/45">
            📚 Recommended Books
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((b, idx) => (
              <Card key={idx} className="p-6 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2">
                <h4 className="font-display text-base text-white font-medium">{b.title}</h4>
                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                  <span className="text-accent-gold/60 font-semibold block mb-1">Why it matters:</span>
                  {b.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Subsection 2: Annual Letters */}
        <div>
          <h3 className="font-display text-xl text-white font-semibold mb-8 pl-1 border-l-2 border-accent-gold/45">
            ✉️ Annual Letters & Memos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {annualLetters.map((l, idx) => (
              <Card key={idx} className="p-6 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2">
                <h4 className="font-display text-base text-white font-medium">{l.title}</h4>
                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                  <span className="text-accent-gold/60 font-semibold block mb-1">Why it matters:</span>
                  {l.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Subsection 3: Talks & Lectures */}
        <div>
          <h3 className="font-display text-xl text-white font-semibold mb-8 pl-1 border-l-2 border-accent-gold/45">
            🎬 Talks & Lectures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talks.map((t, idx) => (
              <Card key={idx} className="p-6 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2">
                <h4 className="font-display text-base text-white font-medium">{t.title}</h4>
                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                  <span className="text-accent-gold/60 font-semibold block mb-1">Why it matters:</span>
                  {t.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

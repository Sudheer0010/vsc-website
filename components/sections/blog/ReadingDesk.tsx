"use client";

import React, { useState } from "react";
import { ReadingItem } from "@/types/reading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  // Carousel States
  const [bookPage, setBookPage] = useState(0);
  const [talkPage, setTalkPage] = useState(0);

  const ITEMS_PER_PAGE = 3;
  const totalBookPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const totalTalkPages = Math.ceil(talks.length / ITEMS_PER_PAGE);

  const handleNextBook = () => {
    setBookPage((prev) => (prev + 1) % totalBookPages);
  };

  const handlePrevBook = () => {
    setBookPage((prev) => (prev - 1 + totalBookPages) % totalBookPages);
  };

  const handleNextTalk = () => {
    setTalkPage((prev) => (prev + 1) % totalTalkPages);
  };

  const handlePrevTalk = () => {
    setTalkPage((prev) => (prev - 1 + totalTalkPages) % totalTalkPages);
  };

  const currentBooks = books.slice(
    bookPage * ITEMS_PER_PAGE,
    (bookPage + 1) * ITEMS_PER_PAGE
  );

  const currentTalks = talks.slice(
    talkPage * ITEMS_PER_PAGE,
    (talkPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="py-24 border-t border-white/5 animate-fade-in">
      <div className="max-w-[600px] mb-16 text-left select-none">
        <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-4 block font-semibold">
          RECOMMENDATIONS
        </span>
        <h2 className="font-display text-3xl md:text-[38px] text-white font-normal leading-[1.2]">
          Reading Desk
        </h2>
      </div>

      <div className="flex flex-col gap-16 select-none">
        
        {/* Subsection 1: Recommended Books (Interactive Carousel Slider) */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-xl text-white font-semibold pl-1 border-l-2 border-accent-gold">
              📚 Recommended Books
            </h3>
            
            {/* Carousel Navigation Controls */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/40 hidden sm:inline">
                {bookPage + 1} / {totalBookPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevBook}
                  className="w-9 h-9 rounded-full border border-white/10 bg-[#090D18] flex items-center justify-center text-white/70 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
                  aria-label="Previous books"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextBook}
                  className="w-9 h-9 rounded-full border border-white/10 bg-[#090D18] flex items-center justify-center text-white/70 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
                  aria-label="Next books"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={bookPage}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {currentBooks.map((b, idx) => (
                  <div 
                    key={b.title + idx} 
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-accent-gold/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <h4 className="font-display text-lg text-white font-medium mb-2 group-hover:text-accent-gold transition-colors">
                        {b.title}
                      </h4>
                      <p className="font-mono text-xs text-text-secondary leading-relaxed">
                        <span className="text-accent-gold/80 font-semibold block mb-1">Why it matters:</span>
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicator Dots */}
          <div className="flex gap-2 justify-center mt-6">
            {Array.from({ length: totalBookPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setBookPage(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === bookPage ? "w-6 bg-accent-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to book slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Subsection 2: Annual Letters & Memos */}
        <div>
          <h3 className="font-display text-xl text-white font-semibold mb-8 pl-1 border-l-2 border-accent-gold">
            ✉️ Annual Letters & Memos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {annualLetters.map((l, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-accent-gold/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <h4 className="font-display text-lg text-white font-medium mb-2 group-hover:text-accent-gold transition-colors">
                    {l.title}
                  </h4>
                  <p className="font-mono text-xs text-text-secondary leading-relaxed">
                    <span className="text-accent-gold/80 font-semibold block mb-1">Why it matters:</span>
                    {l.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subsection 3: Talks & Lectures (Interactive Carousel Slider) */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-xl text-white font-semibold pl-1 border-l-2 border-accent-gold">
              🎬 Talks & Lectures
            </h3>

            {/* Carousel Navigation Controls */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/40 hidden sm:inline">
                {talkPage + 1} / {totalTalkPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevTalk}
                  className="w-9 h-9 rounded-full border border-white/10 bg-[#090D18] flex items-center justify-center text-white/70 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
                  aria-label="Previous talks"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextTalk}
                  className="w-9 h-9 rounded-full border border-white/10 bg-[#090D18] flex items-center justify-center text-white/70 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
                  aria-label="Next talks"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={talkPage}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {currentTalks.map((t, idx) => (
                  <div 
                    key={t.title + idx} 
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-accent-gold/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <h4 className="font-display text-lg text-white font-medium mb-2 group-hover:text-accent-gold transition-colors">
                        {t.title}
                      </h4>
                      <p className="font-mono text-xs text-text-secondary leading-relaxed">
                        <span className="text-accent-gold/80 font-semibold block mb-1">Why it matters:</span>
                        {t.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicator Dots */}
          <div className="flex gap-2 justify-center mt-6">
            {Array.from({ length: totalTalkPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTalkPage(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === talkPage ? "w-6 bg-accent-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to talk slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

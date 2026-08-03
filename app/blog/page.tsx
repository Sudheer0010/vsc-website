"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketLetterModal from "@/components/cards/MarketLetterModal";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { getReadingTime } from "@/lib/reading-time";
import { Article } from "@/types/article";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";

import { 
  articles, 
  frameworkLibrary, 
  books, 
  annualLetters, 
  talks, 
  newsletterConfig 
} from "@/data";

// Import Refactored Sections
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { FeaturedPublication } from "@/components/sections/blog/FeaturedPublication";
import { MarketLetterArchive } from "@/components/sections/blog/MarketLetterArchive";
import { ResearchGrid } from "@/components/sections/blog/ResearchGrid";
import { FrameworkLibrary } from "@/components/sections/blog/FrameworkLibrary";
import { ReadingDesk } from "@/components/sections/blog/ReadingDesk";
import { NewsletterCTA } from "@/components/sections/blog/NewsletterCTA";

const categories = ["All", "Market Letters", "Research Notes", "Frameworks", "Psychology", "Risk", "Business", "Investing"];
const DEFAULT_VISIBLE_LETTERS = 6;

export default function Blog() {
  const [selectedMonth, setSelectedMonth] = useState<string>("JUL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isArchiveExpanded, setIsArchiveExpanded] = useState(false);

  const archiveHeadingRef = useRef<HTMLHeadingElement>(null);

  const openLetter = (month: string) => {
    setSelectedMonth(month);
    setIsModalOpen(true);
  };

  const closeLetter = () => {
    setIsModalOpen(false);
  };

  // Dynamic Statistics counts
  const notesCount = articles.filter(a => a.type === "RESEARCH NOTE").length;
  const totalLetters = sortedMonths.length;
  const frameworksCount = articles.filter(a => a.type === "FRAMEWORK").length + frameworkLibrary.length;
  const readingCount = books.length + annualLetters.length + talks.length;

  // Market Letter articles dataset for the Market Letters category filter
  const marketLetterArticles: Article[] = sortedMonths.map((code) => {
    const letter = marketLetters[code];
    return {
      id: `market-letter-${code.toLowerCase()}`,
      title: `Market Letter • ${letter.month} ${letter.year}`,
      description: letter?.description || "Institutional market letter briefing and capital allocation analysis.",
      category: "Market Letters",
      type: "MARKET LETTER",
      publishedDate: `1 ${letter.month.charAt(0) + letter.month.slice(1).toLowerCase()} ${letter.year}`,
      readingTime: `${getReadingTime(letter)} Min Read`,
      featured: code === "JUL",
      difficulty: "Advanced",
      tags: ["market-letter", "macro", "regime-shift"],
      slug: code
    };
  });

  // Search & Categories Filter Logic
  const getFilteredArticles = () => {
    let list = articles;

    // Category filter
    if (selectedCategory === "Market Letters") {
      list = marketLetterArticles;
    } else if (selectedCategory !== "All") {
      const lowerCat = selectedCategory.toLowerCase();
      list = list.filter(a => {
        if (selectedCategory === "Research Notes") return a.type === "RESEARCH NOTE";
        if (selectedCategory === "Frameworks") return a.type === "FRAMEWORK";
        return a.category.toLowerCase().includes(lowerCat) || a.type.toLowerCase().includes(lowerCat);
      });
    }

    // Global Search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      list = list.filter(a => 
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query) ||
        a.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    return list;
  };

  const filteredArticles = getFilteredArticles();
  const featuredLetter = marketLetters[sortedMonths[0]];

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Dynamic Background Colored Ambient Light Pool */}
      <AmbientLightPool color="rgba(15, 122, 64, 0.04)" className="left-[50%] top-[1000px] scale-[1.4]" />

      <main className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="container max-w-[1200px]">
          
          <BlogHero
            notesCount={notesCount}
            totalLetters={totalLetters}
            frameworksCount={frameworksCount}
            readingCount={readingCount}
          />

          {featuredLetter && (
            <FeaturedPublication
              featuredLetter={featuredLetter}
              latestMonthKey={sortedMonths[0]}
              onOpenLetter={openLetter}
            />
          )}

          <MarketLetterArchive
            sortedMonths={sortedMonths}
            marketLetters={marketLetters}
            isArchiveExpanded={isArchiveExpanded}
            setIsArchiveExpanded={setIsArchiveExpanded}
            onOpenLetter={openLetter}
            archiveHeadingRef={archiveHeadingRef}
            DEFAULT_VISIBLE_LETTERS={DEFAULT_VISIBLE_LETTERS}
          />

          <ResearchGrid
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredArticles={filteredArticles}
            onOpenLetter={openLetter}
          />

          <FrameworkLibrary frameworkLibrary={frameworkLibrary} />

          <ReadingDesk
            books={books}
            annualLetters={annualLetters}
            talks={talks}
          />

          <NewsletterCTA newsletterConfig={newsletterConfig} />

        </div>
      </main>

      {/* Monthly Report Modal */}
      <MarketLetterModal
        isOpen={isModalOpen}
        monthKey={selectedMonth}
        onClose={closeLetter}
        onChangeMonth={setSelectedMonth}
        sortedMonths={sortedMonths}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

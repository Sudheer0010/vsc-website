"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { NotesLibrary } from "@/components/sections/blog/NotesLibrary";
import { articles } from "@/data/research";

export default function NotesIndex() {
  const notes = articles.filter((a) => a.type === "RESEARCH NOTE");

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <Navbar />
      <PaperGrain />
      <AmbientLightPool color="rgba(15, 122, 64, 0.04)" className="left-[50%] top-[600px] scale-[1.4]" />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container max-w-[1200px]">
          <Link
            href="/research"
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Research
          </Link>

          <NotesLibrary notes={notes} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

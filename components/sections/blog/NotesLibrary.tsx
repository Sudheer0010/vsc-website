"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Article } from "@/types/article";
import { PrimaryTopic } from "@/types/taxonomy";
import { Card } from "@/components/ui/Card";
import { Byline } from "@/components/ui/vsc/Byline";

interface NotesLibraryProps {
  notes: Article[];
}

export function NotesLibrary({ notes }: NotesLibraryProps) {
  const topics: (PrimaryTopic | "ALL")[] = [
    "ALL",
    ...Array.from(new Set(notes.map((n) => n.primaryTopic).filter((t): t is PrimaryTopic => !!t))),
  ];
  const [activeTopic, setActiveTopic] = useState<PrimaryTopic | "ALL">("ALL");

  const filtered = activeTopic === "ALL" ? notes : notes.filter((n) => n.primaryTopic === activeTopic);

  if (notes.length === 0) {
    return (
      <section className="py-12">
        <div className="max-w-[600px] text-left select-none">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-faint uppercase mb-4 block font-semibold">
            OBSERVATIONS
          </span>
          <h1 className="font-display text-3xl md:text-[38px] text-ink font-normal leading-[1.2] mb-6">
            Research Notes
          </h1>
          <p className="font-mono text-sm text-ink-soft mb-2">
            Nothing published here yet.
          </p>
          <p className="font-mono text-xs text-ink-faint mb-8">
            Notes go live once they&apos;re finished — no in-progress placeholders. The Market
            Letters and Frameworks are the current, complete record in the meantime.
          </p>
          <Link
            href="/research"
            className="btn btn-gold"
            style={{ padding: "12px 24px", fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}
          >
            BACK TO RESEARCH
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 select-none">
        <div className="max-w-[600px] text-left">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-faint uppercase mb-4 block font-semibold">
            OBSERVATIONS
          </span>
          <h1 className="font-display text-3xl md:text-[38px] text-ink font-normal leading-[1.2]">
            Research Notes
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface border border-rule rounded-full">
          {topics.map((topic) => {
            const isActive = activeTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`relative px-4 py-1.5 font-mono text-xs transition-colors duration-200 rounded-full ${
                  isActive ? "text-white font-semibold" : "text-ink-muted hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="noteTopicPill"
                    className="absolute inset-0 bg-accent-gold rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{topic}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
        <AnimatePresence mode="popLayout">
          {filtered.map((note) => (
            <motion.div
              key={note.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <Link href={`/notes/${note.slug}`} className="block h-full">
                <Card className="group bg-[#FFFFFF] border border-rule rounded-2xl p-6 sm:p-8 flex h-full flex-col justify-between hover:border-accent-gold/40 transition-all duration-200">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-accent-gold/70">
                        {note.primaryTopic ?? note.category}
                      </span>
                      <span className="font-mono text-[10px] text-ink-faint">
                        {note.publishedDate}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-ink font-medium group-hover:text-accent-gold transition-colors duration-200">
                      {note.title}
                    </h3>
                    <p className="font-mono text-xs text-ink-muted leading-relaxed">
                      {note.description}
                    </p>
                  </div>
                  <div className="mt-8 border-t border-rule pt-4">
                    <Byline className="block" />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-ink-faint uppercase">
                        {note.category}
                      </span>
                      <span className="font-mono text-[10px] text-ink-faint">
                        {note.body ? note.readingTime : "In progress"}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

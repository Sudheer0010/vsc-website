"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Globe, Sparkles } from "lucide-react";

export default function Footer() {
  const [isEasterEggRevealed, setIsEasterEggRevealed] = useState(false);

  return (
    <footer className="w-full bg-[#04060C] border-t border-white/10 select-none text-white pt-16 pb-12">
      <div className="container max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Subtle Easter Egg (5 Columns) */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-accent-gold/40 bg-black">
                <Image
                  src="/logo.jpg"
                  alt="VSC Emblem"
                  fill
                  priority
                  sizes="36px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="font-display text-lg text-white font-normal tracking-tight group-hover:text-accent-gold transition-colors">
                VSC CAPITAL &amp; ADVISORY
              </span>
            </Link>

            <p className="font-mono text-xs text-text-secondary leading-relaxed max-w-[360px]">
              Systematic Trading. Quantitative Market Research. Disciplined Capital Growth.
            </p>

            {/* Subtle VSC Easter Egg trigger */}
            <div 
              onMouseEnter={() => setIsEasterEggRevealed(true)}
              onMouseLeave={() => setIsEasterEggRevealed(false)}
              onClick={() => setIsEasterEggRevealed(!isEasterEggRevealed)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-accent-gold/50 transition-all cursor-pointer group/egg"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-gold/80 group-hover/egg:text-accent-gold transition-colors shrink-0" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300">
                {isEasterEggRevealed ? (
                  <span className="text-accent-gold font-bold">
                    <span className="underline underline-offset-4 decoration-accent-gold">V</span>ELOCITY • <span className="underline underline-offset-4 decoration-accent-gold">S</span>TRUCTURE • <span className="underline underline-offset-4 decoration-accent-gold">C</span>ONVICTION
                  </span>
                ) : (
                  <span className="text-white/50 group-hover/egg:text-white/80">
                    REVEAL VSC DECODED &rarr;
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 Columns) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-gold font-bold">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-text-secondary">
              <li>
                <Link href="/" className="hover:text-accent-gold transition-colors">HOME</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-gold transition-colors">ABOUT</Link>
              </li>
              <li>
                <Link href="/offerings" className="hover:text-accent-gold transition-colors">OFFERINGS</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent-gold transition-colors">RESEARCH &amp; BLOG</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent-gold transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/enquire" className="hover:text-accent-gold transition-colors">ENQUIRE</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Connect & Location (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-gold font-bold">
              CONNECT
            </h4>

            <div className="space-y-3 font-mono text-xs text-text-secondary">
              <a 
                href="mailto:sudheer@vsccapital.in" 
                className="flex items-center gap-2.5 hover:text-accent-gold transition-colors group"
              >
                <Mail className="w-4 h-4 text-accent-gold/70 group-hover:text-accent-gold transition-colors" />
                <span>sudheer@vsccapital.in</span>
              </a>

              <a 
                href="https://www.vsccapital.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-accent-gold transition-colors group"
              >
                <Globe className="w-4 h-4 text-accent-gold/70 group-hover:text-accent-gold transition-colors" />
                <span>www.vsccapital.in</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/sudheer-vobhilineni-2485053b6/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-accent-gold transition-colors group"
              >
                <svg className="w-4 h-4 text-accent-gold/70 group-hover:text-accent-gold transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Regulatory Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/40">
          <div>
            &copy; 2026 VSC Capital &amp; Advisory. MSME Registered.
          </div>
          <div className="uppercase tracking-widest text-[10px]">
            For educational &amp; research purposes only
          </div>
        </div>

      </div>
    </footer>
  );
}

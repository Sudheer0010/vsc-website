"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketLetterModal from "@/components/cards/MarketLetterModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Blog() {
  useScrollReveal();

  const [selectedMonth, setSelectedMonth] = useState<string>("MAY");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLetter = (month: string) => {
    setSelectedMonth(month);
    setIsModalOpen(true);
  };

  const closeLetter = () => {
    setIsModalOpen(false);
  };

  const months = ["MAY", "APR", "MAR", "FEB", "JAN"];

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="grid-overlay"></div>
        <div className="container">
          <div className="fade-up">
            <h1>Blog</h1>
            <p style={{ maxWidth: "700px", marginTop: "30px", fontSize: "16px", color: "var(--text-secondary)" }}>
              Educational content, market research, and curated recommendations to deepen your understanding of systematic trading and capital development.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1: ARTICLES */}
      <section id="articles">
        <div className="container">
          <div className="tag fade-up">Resource 1</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Articles & <span className="italic">Insights</span></h2>
        
          <div className="grid-3 fade-up" style={{ gap: "30px" }}>
            {/* ARTICLE 1 */}
            <div className="blog-card">
              <div className="blog-cover">
                <svg className="blog-cover-svg" viewBox="0 0 300 200">
                  <rect width="300" height="200" fill="none"/>
                  <path d="M 30,100 Q 90,40 150,150 T 270,120" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" opacity="0.3"/>
                  <path d="M 30,100 L 90,130 L 150,70 L 210,160 L 270,90" fill="none" stroke="var(--loss)" strokeWidth="1.5" opacity="0.4"/>
                  <circle cx="210" cy="160" r="3" fill="var(--loss)"/>
                </svg>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--accent-gold)", opacity: 0.15, position: "relative", zIndex: 2 }}>PSYCHOLOGY</div>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="blog-cat">Psychology</span>
                  <span>6 Min Read</span>
                </div>
                <h3 className="article-title" style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", fontFamily: "var(--font-ui)" }}>Why Most Traders Lose</h3>
                <p className="article-desc" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: 0 }}>Analyzing the psychological and mechanical reasons why the majority of retail participants blow accounts. Process failures, not market conditions.</p>
              </div>
            </div>

            {/* ARTICLE 2 */}
            <div className="blog-card">
              <div className="blog-cover">
                <svg className="blog-cover-svg" viewBox="0 0 300 200">
                  <rect width="300" height="200" fill="none"/>
                  <circle cx="150" cy="100" r="45" stroke="var(--accent-gold)" strokeWidth="1" fill="none" opacity="0.2"/>
                  <circle cx="150" cy="100" r="65" stroke="var(--accent-gold)" strokeWidth="0.5" fill="none" opacity="0.1"/>
                  <path d="M 85,100 L 215,100" stroke="var(--accent-gold)" strokeWidth="1" opacity="0.15"/>
                  <path d="M 150,35 L 150,165" stroke="var(--accent-gold)" strokeWidth="1" opacity="0.15"/>
                </svg>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--accent-gold)", opacity: 0.15, position: "relative", zIndex: 2 }}>MATHEMATICS</div>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="blog-cat">Risk Management</span>
                  <span>8 Min Read</span>
                </div>
                <h3 className="article-title" style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", fontFamily: "var(--font-ui)" }}>Position Sizing Explained</h3>
                <p className="article-desc" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: 0 }}>The mathematical foundation of capital preservation. How to size your positions to define risk before entry and protect wealth.</p>
              </div>
            </div>

            {/* ARTICLE 3 */}
            <div className="blog-card">
              <div className="blog-cover">
                <svg className="blog-cover-svg" viewBox="0 0 300 200">
                  <rect width="300" height="200" fill="none"/>
                  <path d="M 30,150 Q 100,140 160,80 T 270,10" fill="none" stroke="var(--success)" strokeWidth="1.5" opacity="0.3"/>
                  <path d="M 30,170 Q 100,160 160,100 T 270,30" fill="none" stroke="var(--accent-gold)" strokeWidth="1" opacity="0.2"/>
                </svg>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--accent-gold)", opacity: 0.15, position: "relative", zIndex: 2 }}>MOMENTUM</div>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="blog-cat">Framework</span>
                  <span>5 Min Read</span>
                </div>
                <h3 className="article-title" style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", fontFamily: "var(--font-ui)" }}>Momentum Investing Basics</h3>
                <p className="article-desc" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: 0 }}>Understanding momentum-based strategies, breakout mechanics, and why institutional capital flows create exploitable patterns.</p>
              </div>
            </div>

            {/* ARTICLE 4 */}
            <div className="blog-card">
              <div className="blog-cover">
                <svg className="blog-cover-svg" viewBox="0 0 300 200">
                  <rect width="300" height="200" fill="none"/>
                  <line x1="50" y1="150" x2="250" y2="50" stroke="var(--accent-gold)" strokeWidth="1.5" opacity="0.3"/>
                  <circle cx="150" cy="100" r="6" fill="var(--accent-gold)" opacity="0.5"/>
                </svg>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--accent-gold)", opacity: 0.15, position: "relative", zIndex: 2 }}>PHILOSOPHY</div>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="blog-cat">Philosophy</span>
                  <span>7 Min Read</span>
                </div>
                <h3 className="article-title" style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", fontFamily: "var(--font-ui)" }}>Trading vs Gambling</h3>
                <p className="article-desc" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: 0 }}>The fundamental differences between systematic trading and speculation. What separates a professional edge from outcome-driven betting.</p>
              </div>
            </div>

            {/* ARTICLE 5 */}
            <div className="blog-card">
              <div className="blog-cover">
                <svg className="blog-cover-svg" viewBox="0 0 300 200">
                  <rect width="300" height="200" fill="none"/>
                  <path d="M 150,50 L 210,90 L 210,150 L 150,180 L 90,150 L 90,90 Z" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" opacity="0.3"/>
                  <circle cx="150" cy="115" r="20" stroke="var(--success)" strokeWidth="1" fill="none" opacity="0.3"/>
                </svg>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--accent-gold)", opacity: 0.15, position: "relative", zIndex: 2 }}>PRESERVATION</div>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="blog-cat">Capital Protection</span>
                  <span>6 Min Read</span>
                </div>
                <h3 className="article-title" style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", fontFamily: "var(--font-ui)" }}>Risk Management Rules</h3>
                <p className="article-desc" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: 0 }}>Core principles for protecting capital. Stop-losses, position sizing, portfolio limits, and the rules that keep you in the game.</p>
              </div>
            </div>

            {/* ARTICLE 6 */}
            <div className="blog-card">
              <div className="blog-cover">
                <svg className="blog-cover-svg" viewBox="0 0 300 200">
                  <rect width="300" height="200" fill="none"/>
                  <line x1="50" y1="140" x2="250" y2="140" stroke="var(--accent-gold)" strokeDasharray="3,3" strokeWidth="1" opacity="0.3"/>
                  <line x1="50" y1="60" x2="250" y2="60" stroke="var(--accent-gold)" strokeDasharray="3,3" strokeWidth="1" opacity="0.3"/>
                  <path d="M 60,130 L 100,135 L 140,75 L 180,68 L 220,120 L 240,55" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" opacity="0.4"/>
                </svg>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--accent-gold)", opacity: 0.15, position: "relative", zIndex: 2 }}>STRUCTURE</div>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="blog-cat">Execution</span>
                  <span>9 Min Read</span>
                </div>
                <h3 className="article-title" style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", fontFamily: "var(--font-ui)" }}>Market Structure Analysis</h3>
                <p className="article-desc" style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: 0 }}>How to read market structure, identify trends, and understand supply-demand dynamics that drive price action.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TECHNICAL INSIGHTS (Market Letters) */}
      <section style={{ background: "var(--bg-secondary)" }} id="insights">
        <div className="container">
          <div className="tag fade-up">Resource 2</div>
          <h2 className="fade-up" style={{ marginBottom: "40px" }}>Monthly Market <span className="italic">Letters</span></h2>
          <p className="fade-up" style={{ color: "var(--text-secondary)", fontSize: "14.5px", marginBottom: "60px", maxWidth: "600px", lineHeight: "1.7" }}>
            Execution reviews, market analysis, and lessons learned. Each month we break down what worked, what didn't, and why.
          </p>

          {/* ARCHIVE */}
          <div className="archive-section fade-up">
            <div className="archive-year">2026 ARCHIVE</div>
            <div className="month-chips">
              {months.map((m) => (
                <button
                  key={m}
                  className={`month-chip ${selectedMonth === m ? "active" : ""}`}
                  onClick={() => openLetter(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: RECOMMENDATIONS */}
      <section id="recommendations">
        <div className="container">
          <div className="tag fade-up">Resource 3</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Recommended <span className="italic">Resources</span></h2>
        
          {/* BOOKS */}
          <div className="fade-up" style={{ marginBottom: "80px" }}>
            <h3 style={{ fontSize: "24px", marginBottom: "40px" }}>📚 Books</h3>
            <div className="grid-3">
              <div className="article-card" style={{ borderTop: "3px solid rgba(201, 168, 76, 0.6)" }}>
                <div className="article-title">Market Wizards</div>
                <div className="article-desc">Jack D. Schwager — Interviews with elite traders discussing their approaches, psychology, and journeys.</div>
                <div style={{ marginTop: "20px", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>Coming Soon</div>
              </div>
              <div className="article-card" style={{ borderTop: "3px solid rgba(201, 168, 76, 0.6)" }}>
                <div className="article-title">Fooled by Randomness</div>
                <div className="article-desc">Nassim Nicholas Taleb — Understanding probability, risk, and why most people confuse luck with skill.</div>
                <div style={{ marginTop: "20px", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>Coming Soon</div>
              </div>
              <div className="article-card" style={{ borderTop: "3px solid rgba(201, 168, 76, 0.6)" }}>
                <div className="article-title">A Man for All Markets</div>
                <div className="article-desc">Edward O. Thorp — The legendary quant's guide to beating the odds through math and discipline.</div>
                <div style={{ marginTop: "20px", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>Coming Soon</div>
              </div>
            </div>
          </div>

          {/* VIDEOS */}
          <div className="fade-up">
            <h3 style={{ fontSize: "24px", marginBottom: "40px" }}>🎬 Videos & Talks</h3>
            <div className="grid-3">
              <div className="article-card" style={{ borderTop: "3px solid rgba(201, 168, 76, 0.6)" }}>
                <div className="article-title">Market Structure Masterclass</div>
                <div className="article-desc">Deep-dive into how markets work, who the participants are, and how price discovery actually happens.</div>
                <div style={{ marginTop: "20px", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>Coming Soon</div>
              </div>
              <div className="article-card" style={{ borderTop: "3px solid rgba(201, 168, 76, 0.6)" }}>
                <div className="article-title">Risk Management Fundamentals</div>
                <div className="article-desc">How professional traders think about risk. The rules, calculations, and mindset that separate survivors from casualty accounts.</div>
                <div style={{ marginTop: "20px", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>Coming Soon</div>
              </div>
              <div className="article-card" style={{ borderTop: "3px solid rgba(201, 168, 76, 0.6)" }}>
                <div className="article-title">Psychology & Execution</div>
                <div className="article-desc">Mastering the mental game. How to stay disciplined, manage emotions, and execute your rules when it counts.</div>
                <div style={{ marginTop: "20px", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET LETTER MODAL */}
      <MarketLetterModal
        isOpen={isModalOpen}
        monthKey={selectedMonth}
        onClose={closeLetter}
      />

      <Footer />
    </>
  );
}

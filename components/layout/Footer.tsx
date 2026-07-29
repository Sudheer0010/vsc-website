import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: "20px" }}>
              <div className="logo-mark">VSC</div>
              <div className="logo-text">VSC CAPITAL & ADVISORY</div>
            </Link>
            <p style={{ fontSize: "12px", marginBottom: "20px" }}>
              Systematic Trading. Disciplined Capital Growth.
            </p>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "2px" }}>
              Precision. Discipline. Asymmetric Edge.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "25px", color: "#fff" }}>
              Navigation
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", fontSize: "10px" }}>
              <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>HOME</Link>
              <Link href="/about" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>ABOUT</Link>
              <Link href="/offerings" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>OFFERINGS</Link>
              <Link href="/blog" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>BLOG</Link>
              <Link href="/faq" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>FAQ</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "25px", color: "#fff" }}>
              Connect
            </h4>
            <div style={{ fontSize: "12px", marginBottom: "10px", fontWeight: 700, color: "var(--text-primary)" }}>
              VSC Capital & Advisory
            </div>
            <div style={{ fontSize: "12px", marginBottom: "14px", color: "var(--text-muted)" }}>
              Velocity • Structure • Capital
            </div>
            <p style={{ fontSize: "12px", marginBottom: "10px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "8px" }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:sudheer@vsccapital.in" style={{ color: "var(--text-primary)", textDecoration: "none" }}>
                sudheer@vsccapital.in
              </a>
            </p>
            <p style={{ fontSize: "12px", marginBottom: "10px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "8px" }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <a href="https://www.vsccapital.in" target="_blank" rel="noopener" style={{ color: "var(--text-primary)", textDecoration: "none" }}>
                www.vsccapital.in
              </a>
            </p>
            <p style={{ fontSize: "12px", marginBottom: "10px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "8px" }}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <a href="https://www.linkedin.com/in/sudheer-vobhilineni-2485053b6/" target="_blank" rel="noopener" style={{ color: "var(--text-primary)", textDecoration: "none" }}>
                LinkedIn
              </a>
            </p>
            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Andhra Pradesh, India — 533440
            </p>
          </div>
        </div>
        <div style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", color: "var(--text-muted)" }}>
          <div>© 2026 VSC Capital & Advisory. MSME Registered.</div>
          <div style={{ textTransform: "uppercase", letterSpacing: "1px" }}>
            For educational & research purposes only
          </div>
        </div>
      </div>
    </footer>
  );
}

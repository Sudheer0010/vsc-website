"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Mail } from "lucide-react";
import { StepRule } from "@/components/ui/vsc/StepRule";

/**
 * The footer keeps the easter egg — V·S·C decoded — because it is the one
 * piece of personality on the site that exists purely for the person who
 * bothers to look. It is now a button rather than a hover-only div, so the
 * reward is available to keyboard and touch users too.
 */

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Offerings", href: "/offerings" },
  { label: "Research", href: "/research" },
  { label: "FAQ", href: "/faq" },
  { label: "Enquire", href: "/enquire" },
];

export default function Footer() {
  const [decoded, setDecoded] = useState(false);

  return (
    <footer className="w-full border-t border-rule bg-canvas-sunk pb-10 pt-16">
      <div className="container mx-auto max-w-[1120px]">
        <div className="grid gap-10 border-b border-rule pb-12 md:grid-cols-12 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-vsc-md border border-rule">
                <Image src="/logo.jpg" alt="" fill sizes="36px" className="object-cover" />
              </div>
              <span className="font-display text-[18px] font-bold tracking-[-0.02em] text-ink">
                VSC Capital &amp; Advisory
              </span>
            </Link>

            <p className="mt-4 max-w-[38ch] text-[16px] leading-relaxed text-ink-soft">
              Systematic trading, quantitative market research, and disciplined
              capital growth.
            </p>

            <button
              type="button"
              onClick={() => setDecoded((d) => !d)}
              aria-expanded={decoded}
              className="mt-6 inline-flex items-center gap-2.5 rounded-vsc-md border border-rule bg-surface px-3.5 py-2.5 text-[14px] font-medium text-ink-muted transition-colors duration-200 hover:border-growth hover:text-growth-deep"
            >
              <StepRule size="sm" />
              {decoded ? (
                <span className="font-semibold text-growth-deep">
                  <strong className="font-bold">V</strong>elocity ·{" "}
                  <strong className="font-bold">S</strong>tructure ·{" "}
                  <strong className="font-bold">C</strong>onviction
                </span>
              ) : (
                <span>What does VSC stand for?</span>
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-3" aria-label="Footer">
            <h2 className="font-display text-[16px] font-semibold tracking-tight text-ink">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[16px] text-ink-soft transition-colors duration-200 hover:text-growth"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h2 className="font-display text-[16px] font-semibold tracking-tight text-ink">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:sudheer@vsccapital.in"
                  className="group flex items-center gap-2.5 text-[16px] text-ink-soft transition-colors duration-200 hover:text-growth"
                >
                  <Mail className="h-4 w-4 text-ink-faint transition-colors group-hover:text-growth" />
                  sudheer@vsccapital.in
                </a>
              </li>
              <li>
                <a
                  href="https://www.vsccapital.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-[16px] text-ink-soft transition-colors duration-200 hover:text-growth"
                >
                  <Globe className="h-4 w-4 text-ink-faint transition-colors group-hover:text-growth" />
                  www.vsccapital.in
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sudheer-vobhilineni-2485053b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-[16px] text-ink-soft transition-colors duration-200 hover:text-growth"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-growth"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-7 text-[14px] text-ink-muted sm:flex-row">
          <span>&copy; 2026 VSC Capital &amp; Advisory. MSME registered.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-growth">
              Privacy Policy
            </Link>
            <span>For educational and research purposes only.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Mail } from "lucide-react";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
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
    <footer className="w-full border-t border-vsc-dark-hairline bg-vsc-dark pb-10 pt-16">
      <div className="container mx-auto max-w-[1120px]">
        <div className="grid gap-10 border-b border-vsc-dark-hairline pb-12 md:grid-cols-12 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-vsc-md border border-vsc-dark-hairline">
                <Image src="/logo.jpg" alt="" fill sizes="36px" className="object-cover" />
              </div>
              <span className="font-display text-[18px] font-bold tracking-[-0.02em] text-vsc-dark-ink">
                VSC Capital &amp; Advisory
              </span>
            </Link>

            <p className="mt-4 max-w-[38ch] text-[16px] leading-relaxed text-vsc-dark-ink-muted">
              Market research, trading insights, and disciplined decision-making.
            </p>

            <button
              type="button"
              onClick={() => setDecoded((d) => !d)}
              aria-expanded={decoded}
              className="mt-6 inline-flex items-center gap-2.5 rounded-vsc-md border border-vsc-dark-hairline bg-vsc-dark-ink/[0.04] px-3.5 py-2.5 text-[14px] font-medium text-vsc-dark-ink-muted transition-colors duration-200 hover:border-vsc-dark-accent hover:text-vsc-dark-accent"
            >
              <StepRule size="sm" />
              {decoded ? (
                <span className="font-semibold text-vsc-dark-accent">
                  <strong className="font-bold">V</strong>elocity ·{" "}
                  <strong className="font-bold">S</strong>tructure ·{" "}
                  <strong className="font-bold">C</strong>onviction
                </span>
              ) : (
                <span>How VSC thinks</span>
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-3" aria-label="Footer">
            <h2 className="font-display text-[16px] font-semibold tracking-tight text-vsc-dark-ink">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[16px] text-vsc-dark-ink-muted transition-colors duration-200 hover:text-vsc-dark-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h2 className="font-display text-[16px] font-semibold tracking-tight text-vsc-dark-ink">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:sudheer@vsccapital.in"
                  className="group flex items-center gap-2.5 text-[16px] text-vsc-dark-ink-muted transition-colors duration-200 hover:text-vsc-dark-accent"
                >
                  <Mail className="h-4 w-4 text-vsc-dark-ink-muted transition-colors group-hover:text-vsc-dark-accent" />
                  sudheer@vsccapital.in
                </a>
              </li>
              <li>
                <a
                  href="https://www.vsccapital.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-[16px] text-vsc-dark-ink-muted transition-colors duration-200 hover:text-vsc-dark-accent"
                >
                  <Globe className="h-4 w-4 text-vsc-dark-ink-muted transition-colors group-hover:text-vsc-dark-accent" />
                  www.vsccapital.in
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sudheer-vobhilineni-2485053b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-[16px] text-vsc-dark-ink-muted transition-colors duration-200 hover:text-vsc-dark-accent"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-vsc-dark-ink-muted transition-colors group-hover:text-vsc-dark-accent"
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

        <div className="border-b border-vsc-dark-hairline py-8">
          <EmailCapture variant="footer" />
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-7 text-[14px] text-vsc-dark-ink-muted sm:flex-row">
          <span>&copy; 2026 VSC Capital &amp; Advisory. MSME registered.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-vsc-dark-accent">
              Privacy Policy
            </Link>
            <span>For educational and research purposes only.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

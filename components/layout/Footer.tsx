"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, Mail } from "lucide-react";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { StepRule } from "@/components/ui/vsc/StepRule";

/**
 * Routes where the footer omits its own email-capture form: either the page
 * already carries its own contextual or full-experience signup (Research's
 * mid-page newsletter block, the dedicated /letter subscribe page, the
 * Research design-lab prototype's own closing signup) so a visitor never
 * sees two signup forms on one page, or the page is itself a conversion
 * form (Enquire, and its design-lab prototype) where a second, competing
 * ask right below the primary one works against it.
 */
const ROUTES_WITH_OWN_SIGNUP = [
  "/research",
  "/letter",
  "/design-lab/research",
  "/enquire",
  "/design-lab/enquire",
];

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
  { label: "Tools", href: "/tools" },
  { label: "FAQ", href: "/faq" },
  { label: "Enquire", href: "/enquire" },
];

export default function Footer() {
  const [decoded, setDecoded] = useState(false);
  const pathname = usePathname();
  const hideEmailCapture = ROUTES_WITH_OWN_SIGNUP.includes(pathname ?? "");

  return (
    <footer className="w-full border-t border-vsc-dark-hairline bg-vsc-dark pb-10 pt-16">
      <div className="container mx-auto max-w-[1120px]">
        {!hideEmailCapture && (
          <div className="border-b border-vsc-dark-hairline pb-8">
            <EmailCapture variant="footer" />
          </div>
        )}

        <div
          className={`grid gap-10 border-b border-vsc-dark-hairline pb-12 md:grid-cols-12 md:gap-12 ${
            hideEmailCapture ? "" : "pt-12"
          }`}
        >
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="group inline-flex min-h-[44px] items-center gap-3">
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
                <span className="font-semibold text-vsc-dark-ink-muted">
                  <strong className="font-bold text-vsc-dark-accent">V</strong>elocity ·{" "}
                  <strong className="font-bold text-vsc-dark-accent">S</strong>tructure ·{" "}
                  <strong className="font-bold text-vsc-dark-accent">C</strong>onviction
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
            <ul className="mt-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-[44px] items-center text-[16px] text-vsc-dark-ink-muted transition-colors duration-200 hover:text-vsc-dark-accent"
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
            <ul className="mt-1">
              <li>
                <a
                  href="mailto:sudheer@vsccapital.in"
                  className="group flex min-h-[44px] items-center gap-2.5 text-[16px] text-vsc-dark-ink-muted transition-colors duration-200 hover:text-vsc-dark-accent"
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
                  className="group flex min-h-[44px] items-center gap-2.5 text-[16px] text-vsc-dark-ink-muted transition-colors duration-200 hover:text-vsc-dark-accent"
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
                  className="group flex min-h-[44px] items-center gap-2.5 text-[16px] text-vsc-dark-ink-muted transition-colors duration-200 hover:text-vsc-dark-accent"
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
              <li>
                <a
                  href="https://whatsapp.com/channel/0029VbEFHnQKWEKq2I8azp3S"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[44px] items-center gap-2.5 text-[16px] text-vsc-dark-ink-muted transition-colors duration-200 hover:text-vsc-dark-accent"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-vsc-dark-ink-muted transition-colors group-hover:text-vsc-dark-accent"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-7 text-[14px] text-vsc-dark-ink-muted sm:flex-row">
          <span>&copy; 2026 VSC Capital &amp; Advisory. MSME registered.</span>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="-my-[15px] inline-flex min-h-[44px] items-center py-[15px] transition-colors duration-200 hover:text-vsc-dark-accent"
            >
              Privacy Policy
            </Link>
            <span>For educational and research purposes only.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { StepRule } from "@/components/ui/vsc/StepRule";

/**
 * Routes where the footer omits its own email-capture form: either the page
 * already carries its own contextual signup, or the page is itself a
 * conversion flow where a second ask would compete with the primary one.
 */
const ROUTES_WITH_OWN_SIGNUP = [
  "/research",
  "/letter",
  "/design-lab/research",
  "/enquire",
  "/design-lab/enquire",
];

const EXPLORE = [
  { label: "Research", href: "/research" },
  { label: "Tools", href: "/tools" },
  { label: "Offerings", href: "/offerings" },
  { label: "FAQ", href: "/faq" },
];

const TEXT_LINK_CLASS =
  "group inline-flex min-h-[44px] items-center gap-2 font-ui text-[15px] font-semibold " +
  "text-vsc-dark-ink transition-colors duration-200 hover:text-vsc-dark-accent";

const UTILITY_LINK_CLASS =
  "group flex min-h-[44px] min-w-0 items-center gap-2.5 text-[16px] text-vsc-dark-ink-muted " +
  "transition-colors duration-200 hover:text-vsc-dark-accent";

function LinkArrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
      strokeWidth={1.75}
    />
  );
}

export default function Footer() {
  const pathname = usePathname();
  const hideEmailCapture = ROUTES_WITH_OWN_SIGNUP.includes(pathname ?? "");

  return (
    <footer className="relative z-10 isolate w-full border-t border-vsc-dark-hairline bg-vsc-dark before:pointer-events-none before:absolute before:inset-x-0 before:-top-14 before:h-14 before:bg-vsc-dark">
      <div className="container relative mx-auto max-w-[1120px] pt-[clamp(3rem,5vw,4.5rem)]">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-end gap-3 text-vsc-dark-accent">
            <StepRule size="sm" />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em]">
              Closing note
            </p>
          </div>
          <p className="hidden font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-vsc-dark-ink-muted sm:block">
            Process over prediction.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 className="font-display text-[clamp(2rem,8vw,4.75rem)] font-bold leading-[0.9] tracking-[-0.035em] text-vsc-dark-ink lg:col-span-7 lg:text-[clamp(3.25rem,5vw,4.75rem)]">
            <span className="block">Markets change.</span>
            <span className="block">Process stays.</span>
          </h2>

          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-[48ch] text-[17px] leading-[1.7] text-vsc-dark-ink-muted">
              Research the market. Define the risk. Stay with the process.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1">
              <Link href="/research" className={TEXT_LINK_CLASS}>
                Read the research
                <LinkArrow />
              </Link>
              <Link href="/enquire?portfolio=1" className={TEXT_LINK_CLASS}>
                Get a portfolio review
                <LinkArrow />
              </Link>
            </div>
            <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-vsc-dark-ink-muted sm:hidden">
              Process over prediction.
            </p>
          </div>
        </div>

        <div className="relative mt-[clamp(2rem,4vw,3rem)] border-t border-vsc-dark-hairline pt-6">
          <div className="relative z-10 grid gap-7 md:grid-cols-[1.5fr_0.9fr_1.2fr] md:gap-8 lg:grid-cols-[1.05fr_0.8fr_1.15fr]">
            {!hideEmailCapture && (
              <div className="min-w-0">
                <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-vsc-dark-accent">
                  Market letter
                </h2>
                <EmailCapture
                  variant="footer"
                  className="mt-3 min-w-0 [&_form>span]:sr-only [&_input]:w-auto [&_input]:flex-1"
                />
              </div>
            )}

            <nav aria-label="Footer navigation">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-vsc-dark-accent">
                Explore
              </h2>
              <ul className="mt-1 grid grid-cols-2 gap-x-5">
                {EXPLORE.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={UTILITY_LINK_CLASS}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-vsc-dark-accent">
                Connect
              </h2>
              <ul className="mt-1 grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-x-5">
                <li>
                  <a
                    href="https://whatsapp.com/channel/0029VbEFHnQKWEKq2I8azp3S"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={UTILITY_LINK_CLASS}
                  >
                    <svg
                      className="h-4 w-4 shrink-0"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/sudheer-vobhilineni-2485053b6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={UTILITY_LINK_CLASS}
                  >
                    <svg
                      className="h-4 w-4 shrink-0"
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
                <li className="sm:col-span-2 md:col-span-1 lg:col-span-2">
                  <a href="mailto:sudheer@vsccapital.in" className={UTILITY_LINK_CLASS}>
                    <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    <span className="min-w-0 break-all">sudheer@vsccapital.in</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <p
            aria-hidden="true"
            className="relative z-0 mt-5 select-none font-display text-[clamp(2.5rem,11vw,7.5rem)] font-bold leading-[0.68] tracking-[-0.04em] text-vsc-dark-ink/[0.035]"
          >
            <span className="block whitespace-nowrap">VSC CAPITAL</span>
            <span className="block whitespace-nowrap">&amp; ADVISORY</span>
          </p>
        </div>

        <div className="relative z-10 mt-6 flex flex-col gap-2 border-t border-vsc-dark-hairline pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4 text-[14px] leading-relaxed text-vsc-dark-ink-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
          <p>&copy; 2026 VSC Capital &amp; Advisory. MSME registered.</p>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href="/privacy"
              className="inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-vsc-dark-accent"
            >
              Privacy Policy
            </Link>
            <p>For educational and research purposes only.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

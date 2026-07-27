"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/**
 * VSC Component: VSCNavigation
 * 
 * 1. Purpose: Fixed watch-bezel navigation capsule where switching views feels like opening another research document.
 * 2. Atlas Alignment: Expresses Brand Recognition standards, Signature 02, and 18px blur limit guardrails.
 * 3. Signature Behaviour: Watch-bezel glass capsule (`#0C101E/72`) with monospaced coordinate tags (`R-01` to `R-06`) on active items.
 * 4. Emotional Outcome: Instills a sense of navigating an institutional research repository.
 * 5. Accessibility: Keyboard navigable, ARIA expanded/controls, Escape key close listener, body scroll locking when mobile menu is open.
 * 6. Performance: CSS backdrop-filter blur capped at 18px; hardware-accelerated mobile drawer.
 */

interface NavItem {
  label: string;
  href: string;
  tag: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Arrival", href: "/", tag: "R-01" },
  { label: "About", href: "/about", tag: "R-02" },
  { label: "Offerings", href: "/offerings", tag: "R-05" },
  { label: "Market Letters", href: "/blog", tag: "R-04" },
  { label: "FAQ", href: "/faq", tag: "R-03" },
  { label: "Enquire", href: "/enquire", tag: "R-06" },
];

export function VSCNavigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [mobileOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none select-none">
      {/* Desktop Watch-Bezel Nav Capsule */}
      <nav 
        aria-label="Main Navigation"
        className="pointer-events-auto bg-[#0C101E]/80 backdrop-blur-[18px] border border-white/[0.08] rounded-[18px] px-4 py-2.5 flex items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)] max-w-[900px] w-full"
      >
        {/* VSC Brand Identity Mark */}
        <Link href="/" className="flex items-center gap-2 px-2 focus:outline-none focus:ring-1 focus:ring-accent-gold/50 rounded-sm">
          <span className="font-display text-lg text-white font-semibold tracking-tight">VSC</span>
          <span className="font-mono text-[9px] text-accent-gold/80 uppercase tracking-widest border-l border-white/10 pl-2">
            RESEARCH
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 rounded-lg font-mono text-xs tracking-wider transition-colors duration-200 flex items-center gap-1.5 ${
                  isActive ? "text-accent-gold font-semibold" : "text-white/70 hover:text-white"
                }`}
              >
                <span className="text-[9px] text-white/30">{item.tag}</span>
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-accent-gold/10 border border-accent-gold/30 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-white/80 hover:text-white p-1.5 focus:outline-none focus:ring-1 focus:ring-accent-gold/50 rounded-md"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed inset-x-4 top-20 bg-[#0C101E] border border-white/10 rounded-2xl p-6 shadow-2xl md:hidden z-50 flex flex-col gap-3"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between p-3 rounded-lg font-mono text-sm border ${
                    isActive
                      ? "bg-accent-gold/10 border-accent-gold/40 text-accent-gold"
                      : "bg-white/[0.02] border-white/[0.04] text-white/80"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-white/40">{item.tag}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

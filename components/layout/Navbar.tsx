"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SpotlightNavbar } from "@/components/ui/vengeance/SpotlightNavbar";

/**
 * Navigation sits on paper now, so it needs no glass and no glow. The chrome
 * is a hairline and a shadow that only appear once the page has scrolled
 * underneath it — before that the header is genuinely transparent, which is
 * what gives the hero its open feeling.
 */

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Offerings",
    href: "/offerings",
    dropdownItems: [
      { label: "Learning Hub", href: "/offerings/learning-hub" },
      { label: "VSC Advantage", href: "/offerings/advantage" },
      { label: "Inner Circle", href: "/offerings/inner-circle" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    activeMatch: ["/research", "/letters", "/notes", "/reading", "/start", "/tools"],
  },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.body.classList.add("menu-open");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const activeIdx = NAV_ITEMS.findIndex((item) =>
    item.activeMatch ? item.activeMatch.some(isActive) : isActive(item.href)
  );

  const handleItemClick = () => {
    closeMenu();
  };

  return (
    <>
      <nav id="navbar" className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container nav-content">
          <Link href="/" className="logo" onClick={closeMenu}>
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-vsc-md border border-rule">
              <Image
                src="/logo.jpg"
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="logo-wordmark">
              <div className="logo-title">VSC Capital &amp; Advisory</div>
              <div className="logo-tagline">Built on research. Shaped by markets.</div>
            </div>
          </Link>

          <div className="nav-links-container">
            <SpotlightNavbar
              items={NAV_ITEMS}
              defaultActiveIndex={activeIdx !== -1 ? activeIdx : 0}
              onItemClick={handleItemClick}
            />
          </div>

          <Link href="/enquire" className="nav-cta">
            Enquire
            <span className="cta-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>

          <button
            className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="nav-drawer"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        className={`drawer-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />

      <div id="nav-drawer" className={`nav-drawer ${isMenuOpen ? "active" : ""}`}>
        <div className="drawer-links">
          {NAV_ITEMS.map((item) => (
            <React.Fragment key={item.href}>
              <Link
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
              {item.dropdownItems && (
                <div className="my-1 ml-3 flex flex-col border-l border-rule pl-3">
                  {item.dropdownItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`text-[15px] ${isActive(sub.href) ? "active" : ""}`}
                      onClick={closeMenu}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}

          <Link
            href="/enquire"
            className="nav-cta mt-5 !flex w-full"
            onClick={closeMenu}
          >
            Enquire
          </Link>
        </div>

        <div className="drawer-footer">
          <div className="font-display text-[16px] font-semibold text-ink">
            VSC Capital &amp; Advisory
          </div>
          <div className="mt-1">Systematic trading. Disciplined capital growth.</div>
        </div>
      </div>
    </>
  );
}

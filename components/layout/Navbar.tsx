"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SpotlightNavbar, NavItem } from "@/components/ui/vengeance/SpotlightNavbar";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    if (window.scrollY > 50) {
      setIsScrolled(true);
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { 
      label: "Offerings", 
      href: "/offerings",
      dropdownItems: [
        { label: "Learning Hub", href: "/offerings/learning-hub" },
        { label: "VSC Advantage", href: "/offerings/advantage" },
        { label: "Inner Circle", href: "/offerings/inner-circle" },
      ]
    },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Enquire", href: "/enquire" },
  ];

  const activeIdx = navItems.findIndex(item => {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  });
  const defaultActiveIndex = activeIdx !== -1 ? activeIdx : 0;

  const handleItemClick = (item: NavItem) => {
    router.push(item.href);
    closeMenu();
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav id="navbar" className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container nav-content">
          <Link href="/" className="logo" onClick={closeMenu}>
            <div className="logo-mark">VSC</div>
            <div className="logo-wordmark">
              <div className="logo-title">VSC CAPITAL & ADVISORY</div>
              <div className="logo-tagline">DISCIPLINED CAPITAL GROWTH</div>
            </div>
          </Link>
          
          {/* Spotlight Navbar in the center for desktop */}
          <div className="nav-links-container">
            <SpotlightNavbar
              items={navItems}
              defaultActiveIndex={defaultActiveIndex}
              onItemClick={handleItemClick}
            />
          </div>

          <button
            className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
            aria-controls="nav-drawer"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Navigation Drawer Overlay */}
      <div
        className={`drawer-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />

      {/* Navigation Drawer */}
      <div id="nav-drawer" className={`nav-drawer ${isMenuOpen ? "active" : ""}`}>
        <div className="drawer-links">
          {navItems.map((item) => (
            <React.Fragment key={item.href}>
              <Link
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
                style={isActive(item.href) ? { color: "var(--accent-gold)" } : {}}
                onClick={closeMenu}
              >
                {item.label} {item.dropdownItems ? "▼" : ""}
              </Link>
              {item.dropdownItems && (
                <div className="flex flex-col pl-4 gap-2 border-l border-white/5 my-1 ml-2">
                  {item.dropdownItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={isActive(sub.href) ? "active text-sm pl-2" : "text-sm text-text-secondary hover:text-white pl-2"}
                      style={isActive(sub.href) ? { color: "var(--accent-gold)" } : {}}
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
            className="nav-cta"
            style={{ marginTop: "20px", width: "100%", display: "inline-flex", justifyContent: "center" }}
            onClick={closeMenu}
          >
            Enquire Now
          </Link>
        </div>
        <div className="drawer-footer">
          <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "10px" }}>
            VSC Capital & Advisory
          </div>
          <div style={{ lineHeight: 1.5 }}>
            Systematic Trading. Disciplined Capital Growth.
          </div>
        </div>
      </div>
    </>
  );
}

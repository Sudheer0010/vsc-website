"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    // Initial check
    if (window.scrollY > 50) {
      setIsScrolled(true);
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Offerings", href: "/offerings" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav id="navbar" className={isScrolled ? "scrolled" : ""}>
        <div className="container nav-content">
          <Link href="/" className="logo" onClick={closeMenu}>
            <div className="logo-mark">VSC</div>
            <div className="logo-text">VSC CAPITAL & ADVISORY</div>
          </Link>
          
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
                style={isActive(item.href) ? { color: "var(--accent-gold)" } : {}}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="/enquire" className="nav-cta" onClick={closeMenu}>
            Enquire Now
          </Link>

          <button
            className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
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
      <div className={`nav-drawer ${isMenuOpen ? "active" : ""}`}>
        <div className="drawer-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
              style={isActive(item.href) ? { color: "var(--accent-gold)" } : {}}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
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

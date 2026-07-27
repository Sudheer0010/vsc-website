"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
    label: string;
    href: string;
    dropdownItems?: NavItem[];
}

export interface SpotlightNavbarProps {
    items?: NavItem[];
    className?: string;
    onItemClick?: (item: NavItem, index: number) => void;
    defaultActiveIndex?: number;
    stiffness?: number;
    damping?: number;
    spotlightColor?: string;
    ambienceColor?: string;
}

export function SpotlightNavbar({
    items = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Events", href: "#events" },
        { label: "Sponsors", href: "#sponsors" },
        { label: "Pricing", href: "#pricing" },
    ],
    className,
    onItemClick,
    defaultActiveIndex = 0,
    stiffness = 80,
    damping = 22,
    spotlightColor = "rgba(201, 168, 76, 0.16)",
    ambienceColor = "rgba(201, 168, 76, 0.12)",
}: SpotlightNavbarProps) {
    const navRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [hoverX, setHoverX] = useState<number | null>(null);
    const [hoveredDropdownIdx, setHoveredDropdownIdx] = useState<number | null>(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setActiveIndex(defaultActiveIndex);
    }, [defaultActiveIndex]);

    // Refs for the "light" positions so we can animate them imperatively
    const spotlightX = useRef(0);
    const ambienceX = useRef(0);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = nav.getBoundingClientRect();
            // Bounding box safety guard to ensure spotlight stays strictly inside navigation capsule
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                setHoverX(null);
                return;
            }
            const x = e.clientX - rect.left;
            setHoverX(x);
            // Direct update for immediate feedback (no spring for the mouse itself, feels snappier)
            spotlightX.current = x;
            nav.style.setProperty("--spotlight-x", `${x}px`);
        };

        let spotlightAnim: { stop: () => void } | null = null;

        const handleMouseLeave = () => {
            setHoverX(null);
            // When mouse leaves, spring the spotlight back to the active item
            const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
            if (activeItem) {
                const navRect = nav.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const targetX = itemRect.left - navRect.left + itemRect.width / 2;

                spotlightAnim?.stop();
                spotlightAnim = animate(spotlightX.current, targetX, {
                    type: "spring",
                    stiffness,
                    damping,
                    onUpdate: (v) => {
                        spotlightX.current = v;
                        nav.style.setProperty("--spotlight-x", `${v}px`);
                    }
                });
            }
        };

        nav.addEventListener("mousemove", handleMouseMove);
        nav.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            spotlightAnim?.stop();
            nav.removeEventListener("mousemove", handleMouseMove);
            nav.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [activeIndex, stiffness, damping]);

    // Handle the "Ambience" (Active Item) Movement
    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;
        const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
        let ambienceAnim: { stop: () => void } | null = null;

        if (activeItem) {
            const navRect = nav.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            const targetX = itemRect.left - navRect.left + itemRect.width / 2;

            ambienceAnim = animate(ambienceX.current, targetX, {
                type: "spring",
                stiffness,
                damping,
                onUpdate: (v) => {
                    ambienceX.current = v;
                    nav.style.setProperty("--ambience-x", `${v}px`);
                },
            });
        }

        return () => {
            ambienceAnim?.stop();
        };
    }, [activeIndex, stiffness, damping]);

    const handleItemClick = (item: NavItem, index: number) => {
        setActiveIndex(index);
        onItemClick?.(item, index);
    };

    return (
        <div className={cn("relative flex justify-center", className)}>
            <nav
                ref={navRef}
                className={cn(
                    "spotlight-nav",
                    "relative rounded-full transition-all duration-300 overflow-hidden"
                )}
                style={{
                    ...(spotlightColor && { "--spotlight-color": spotlightColor }),
                    ...(ambienceColor && { "--ambience-color": ambienceColor }),
                } as React.CSSProperties}
            >
                {/* Content */}
                <ul className="relative flex items-center h-full px-2 gap-0 z-[10]">
                    {items.map((item, idx) => (
                        <li 
                            key={idx} 
                            className="relative h-full flex items-center justify-center"
                            onMouseEnter={() => item.dropdownItems && setHoveredDropdownIdx(idx)}
                            onMouseLeave={() => setHoveredDropdownIdx(null)}
                        >
                            <a
                                href={item.href}
                                data-index={idx}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleItemClick(item, idx);
                                }}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/30",
                                    // Active vs Inactive Text
                                    activeIndex === idx
                                        ? "active-link text-black dark:text-white"
                                        : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                                  )}
                            >
                                {item.label}{item.dropdownItems ? " ▾" : ""}
                            </a>

                            {item.dropdownItems && hoveredDropdownIdx === idx && (
                                <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-48 rounded-xl border border-white/5 bg-[#0B0F1E] p-1 shadow-2xl flex flex-col z-[100] transition-all duration-200">
                                    {item.dropdownItems.map((sub, sIdx) => (
                                        <a
                                            key={sIdx}
                                            href={sub.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setHoveredDropdownIdx(null);
                                                onItemClick?.(sub, idx);
                                            }}
                                            className="px-4 py-2 text-xs font-mono font-medium rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.03] transition-colors duration-200 text-left block w-full"
                                        >
                                            {sub.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {/* LIGHTING LAYERS 
           We use CSS variables --spotlight-x and --ambience-x updated by JS
        */}

                {/* 1. The Moving Spotlight (Follows Mouse) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
                    style={{
                        opacity: hoverX !== null ? 1 : 0,
                        background: `
              radial-gradient(
                60px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color, rgba(201, 168, 76, 0.16)) 0%, 
                transparent 100%
              )
            `
                    }}
                />

                {/* 2. The Active State Ambience (Stays on Active) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
                    style={{
                        background: `
                  radial-gradient(
                    60px circle at var(--ambience-x) 0%, 
                    var(--ambience-color, rgba(201, 168, 76, 0.12)) 0%, 
                    transparent 100%
                  )
                `
                    }}
                />

            </nav>
        </div>
    );
}

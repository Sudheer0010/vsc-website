"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
    label: string;
    href: string;
    dropdownItems?: NavItem[];
    /** Extra path prefixes that should count as this item being active
     *  (e.g. Research staying highlighted on /letters, a sub-area with
     *  its own URL that isn't literally under /research). */
    activeMatch?: string[];
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
    spotlightColor = "rgba(15, 122, 64, 0.16)",
    ambienceColor = "rgba(15, 122, 64, 0.12)",
}: SpotlightNavbarProps) {
    const navRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [hoverX, setHoverX] = useState<number | null>(null);
    const [hoveredDropdownIdx, setHoveredDropdownIdx] = useState<number | null>(null);
    const [focusedDropdownIdx, setFocusedDropdownIdx] = useState<number | null>(null);
    const dropdownIdPrefix = useId();
    const triggerRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const openDropdownIdx = hoveredDropdownIdx ?? focusedDropdownIdx;

    // Route changes arrive as a new `defaultActiveIndex`, and clicks set the
    // index locally. Reconciling the two during render is the supported way
    // to reset state on a prop change — doing it in an effect costs an extra
    // render pass and shows the stale item highlighted for a frame.
    const [syncedDefault, setSyncedDefault] = useState(defaultActiveIndex);
    if (syncedDefault !== defaultActiveIndex) {
        setSyncedDefault(defaultActiveIndex);
        setActiveIndex(defaultActiveIndex);
    }

    // Refs for the "light" positions so we can animate them imperatively
    const spotlightX = useRef(0);
    const ambienceX = useRef(0);

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
                            onFocusCapture={() => item.dropdownItems && setFocusedDropdownIdx(idx)}
                            onBlurCapture={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                                    setFocusedDropdownIdx(null);
                                }
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Escape" && item.dropdownItems && openDropdownIdx === idx) {
                                    event.preventDefault();
                                    setHoveredDropdownIdx(null);
                                    triggerRefs.current[idx]?.focus();
                                    setFocusedDropdownIdx(null);
                                }
                            }}
                        >
                            <Link
                                ref={(node) => {
                                    triggerRefs.current[idx] = node;
                                }}
                                href={item.href}
                                data-index={idx}
                                onClick={() => handleItemClick(item, idx)}
                                aria-haspopup={item.dropdownItems ? "true" : undefined}
                                aria-expanded={item.dropdownItems ? openDropdownIdx === idx : undefined}
                                aria-controls={item.dropdownItems ? `${dropdownIdPrefix}-dropdown-${idx}` : undefined}
                                className={cn(
                                  "px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
                                    // Colour comes from `.spotlight-nav a` in the token layer, so the
                                    // nav can never drift out of sync with the rest of the system.
                                    activeIndex === idx ? "active-link" : "hover:text-ink"
                                  )}
                            >
                                {item.label}
                            </Link>

                            {item.dropdownItems && openDropdownIdx === idx && (
                                <div
                                    id={`${dropdownIdPrefix}-dropdown-${idx}`}
                                    className="absolute top-[85%] left-1/2 -translate-x-1/2 w-48 rounded-vsc-lg border border-rule bg-surface p-1 shadow-lift-3 flex flex-col z-[100]"
                                >
                                    {item.dropdownItems.map((sub, sIdx) => (
                                        <Link
                                            key={sIdx}
                                            href={sub.href}
                                            onClick={() => {
                                                setHoveredDropdownIdx(null);
                                                onItemClick?.(sub, idx);
                                            }}
                                            className="block w-full rounded-vsc-md px-3.5 py-2.5 text-left text-[14.5px] font-medium text-ink-soft transition-colors duration-200 hover:bg-growth-tint hover:text-growth-deep"
                                        >
                                            {sub.label}
                                        </Link>
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
                var(--spotlight-color, rgba(15, 122, 64, 0.16)) 0%, 
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
                    var(--ambience-color, rgba(15, 122, 64, 0.12)) 0%, 
                    transparent 100%
                  )
                `
                    }}
                />

            </nav>
        </div>
    );
}

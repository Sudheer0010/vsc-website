"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Layer 1: Matte Charcoal Paper Texture Grain Overlay
export function PaperGrain() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.015'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}

// Layer 2: Architectural Drafting Grid & Ticks (under 2% opacity)
export function DraftingGrid({ className }: { className?: string }) {
  return (
    <div 
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.012]", className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
      aria-hidden="true"
    >
      {/* Subgrid coordinates & measurement lines */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  );
}

// Coordinate indicator text for that architectural drafting feel
export function CoordinateLabel({ 
  text, 
  className 
}: { 
  text: string; 
  className?: string; 
}) {
  return (
    <div 
      className={cn(
        "pointer-events-none absolute font-mono text-[9px] tracking-wider text-ink-faint uppercase select-none", 
        className
      )}
      aria-hidden="true"
    >
      {text}
    </div>
  );
}

// Measurement tick ruler to align on side borders
export function MarginRuler({ 
  side = "left", 
  height = "100%", 
  className 
}: { 
  side?: "left" | "right"; 
  height?: string; 
  className?: string; 
}) {
  const ticks = Array.from({ length: 20 });
  return (
    <div 
      className={cn(
        "pointer-events-none absolute top-0 bottom-0 w-3 flex flex-col justify-between py-12 z-0 opacity-[0.015]",
        side === "left" ? "left-4 border-r border-rule" : "right-4 border-l border-rule",
        className
      )}
      style={{ height }}
      aria-hidden="true"
    >
      {ticks.map((_, i) => (
        <div 
          key={i} 
          className={cn(
            "h-[1px] bg-white",
            i % 5 === 0 ? "w-3" : "w-1.5"
          )} 
        />
      ))}
    </div>
  );
}

// Concentric construction circle drawings
export function DraftingCircles({ 
  className,
  cx = "50%",
  cy = "50%",
  r = "200"
}: { 
  className?: string;
  cx?: string;
  cy?: string;
  r?: string;
}) {
  const radius = parseInt(r, 10);
  return (
    <svg 
      className={cn("pointer-events-none absolute z-0 select-none opacity-[0.015]", className)} 
      width="100%" 
      height="100%" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#ffffff" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={radius * 1.5} fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx={cx} cy={cy} r={radius * 0.5} fill="none" stroke="#ffffff" strokeWidth="0.5" />
      {/* Drafting axis lines */}
      <line x1="0" y1={cy} x2="100%" y2={cy} stroke="#ffffff" strokeWidth="0.5" strokeDasharray="20 20" />
      <line x1={cx} y1="0" x2={cx} y2="100%" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="20 20" />
    </svg>
  );
}

// Layer 3: Accent Ambient Light Pool (Very large radial gradient)
export function AmbientLightPool({ 
  color = "rgba(56, 189, 248, 0.03)", 
  className 
}: { 
  color?: string; 
  className?: string; 
}) {
  return (
    <div 
      className={cn("pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] z-0 select-none mix-blend-screen", className)}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        width: "1200px",
        height: "1200px",
      }}
      aria-hidden="true"
    />
  );
}

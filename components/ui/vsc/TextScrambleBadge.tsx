"use client";

import React, { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*";

interface TextScrambleBadgeProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TextScrambleBadge({ text, speed = 30, className = "" }: TextScrambleBadgeProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const totalLength = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "•" || char === ":") return char;
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= totalLength) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1;
    }, speed);
  };

  useEffect(() => {
    // Initial scramble on mount
    triggerScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      onMouseEnter={triggerScramble}
      className={`inline-flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 hover:border-accent-gold/50 rounded-full px-4.5 py-1.5 mb-10 shadow-2xl transition-all duration-300 group cursor-default select-none ${className}`}
    >
      {/* Dual Radar Emerald Pulse Dot */}
      <div className="relative flex items-center justify-center w-2.5 h-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
      </div>

      {/* Scramble Animated Ticker Text */}
      <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-white/90 uppercase font-semibold">
        {displayText}
      </span>
    </div>
  );
}

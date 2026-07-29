"use client";

import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

export function GradientText({
  children,
  colors = ["#38BDF8", "#C9A84C", "#E8C96A", "#38BDF8"],
  animationSpeed = 6,
  showBorder = false,
  className = "",
}: GradientTextProps) {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span
      className={`inline-block text-transparent bg-clip-text animate-gradient ${
        showBorder ? "border border-white/10 px-4 py-1 rounded-lg" : ""
      } ${className}`}
      style={gradientStyle}
    >
      {children}
    </span>
  );
}

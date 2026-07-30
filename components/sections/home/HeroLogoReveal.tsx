"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HeroLogoRevealProps {
  className?: string;
}

export function HeroLogoReveal({ className = "" }: HeroLogoRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasEnded, setHasEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setHasEnded(true);
      return;
    }

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.muted = true;
      videoEl.playsInline = true;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Hero video autoplay fallback:", err);
        });
      }
    }
  }, [shouldReduceMotion]);

  const handleEnded = () => {
    setHasEnded(true);
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Subtle ambient radial glow behind logo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)] blur-2xl pointer-events-none"
      />

      {/* Frameless floating logo container (Matching bounds for zero cropping/letterboxing) */}
      <div className="relative z-10 w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
        {/* High-Resolution Static Logo Poster */}
        <Image
          src="/logo.jpg"
          alt="VSC Capital Logo"
          fill
          priority
          sizes="(max-width: 640px) 240px, (max-width: 768px) 340px, (max-width: 1024px) 420px, 460px"
          className="object-cover transition-opacity duration-700 ease-out"
        />

        {/* Single-Play Logo Reveal Video (Matching object-cover so zero top/bottom cropping or letterboxing appears) */}
        {!shouldReduceMotion && (
          <video
            ref={videoRef}
            src="/videos/animated-logo.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
            onError={(e) => {
              console.error("Video load error:", e);
              setHasEnded(true);
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out z-20 ${hasEnded ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
          />
        )}
      </div>
    </div>
  );
}

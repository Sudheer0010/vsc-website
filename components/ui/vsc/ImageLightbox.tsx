"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Click-to-enlarge for images with real detail in them (annotated charts,
 * exhibits) that a container's natural width would otherwise compress past
 * legibility, especially on mobile. Renders the full-size view through a
 * portal so it's never clipped by an ancestor's overflow/transform.
 *
 * The trigger stays a plain, unstyled wrapper around the image already
 * placed in the page — this component only adds the affordance and the
 * overlay, not a new container treatment.
 */
export function ImageLightbox({
  src,
  alt,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // The portal target (document.body) doesn't exist during SSR — this is
  // the lint-clean way to know we're on the client without a setState in
  // an effect: subscribe never fires (there's nothing to subscribe to),
  // the client/server snapshots just differ.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!isOpen) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Enlarge image: ${alt}`}
        className="group relative block w-full cursor-zoom-in"
      >
        <Image src={src} alt={alt} width={width} height={height} className={className} />
        <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-canvas opacity-70 transition-opacity duration-200 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={alt}
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-ink/90 p-4 sm:p-8"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close enlarged image"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-canvas/10 text-canvas transition-colors hover:bg-canvas/20 sm:right-6 sm:top-6"
                >
                  <X className="h-5 w-5" />
                </button>
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className="max-h-full max-w-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

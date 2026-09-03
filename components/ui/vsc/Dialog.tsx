"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Dialog — the site's one accessible modal primitive: portal, focus trap,
 * inert background, Escape-to-close, focus returned to the trigger on close.
 * ImageLightbox predates this and manages its own lighter one-off dialog;
 * new modal needs should build on this instead of repeating that pattern.
 */

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** id of the element that labels the dialog (its visible heading). */
  labelId: string;
  children: React.ReactNode;
  /** Classes for the dialog panel itself (the portal overlay is fixed). */
  panelClassName?: string;
  /** Element to refocus on close. Defaults to whatever was focused when
   *  the dialog opened (usually the trigger that was clicked). */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export function Dialog({ open, onClose, labelId, children, panelClassName = "", returnFocusRef }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const returnFocusEl = returnFocusRef?.current ?? null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Everything outside the dialog becomes inert so background content
    // can't be reached by screen readers or sequential Tab navigation.
    const inertedSiblings: HTMLElement[] = [];
    Array.from(document.body.children).forEach((el) => {
      if (el instanceof HTMLElement && !el.hasAttribute("data-vsc-dialog-portal") && !el.hasAttribute("inert")) {
        el.setAttribute("inert", "");
        inertedSiblings.push(el);
      }
    });

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (focusable ?? panel).focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      inertedSiblings.forEach((el) => el.removeAttribute("inert"));
      (returnFocusEl ?? previouslyFocused.current)?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          data-vsc-dialog-portal=""
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-[2px] sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            tabIndex={-1}
            className={panelClassName}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 10, scale: shouldReduceMotion ? 1 : 0.985 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

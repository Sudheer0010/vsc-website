"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const subscribe = () => () => {};

/**
 * Keeps the server render and first client render identical, then applies
 * the visitor's reduced-motion preference immediately after hydration.
 */
export function useHydratedReducedMotion() {
  const reduce = useReducedMotion();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return mounted && Boolean(reduce);
}

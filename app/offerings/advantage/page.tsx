import React from "react";
import { AdvantageService } from "@/components/sections/offerings/AdvantageService";

/**
 * Route shell only. Metadata, canonical and OG live in ./layout.tsx, and the
 * page itself is a section component so the design-lab route can render the
 * exact same markup rather than a copy of it.
 */
export default function AdvantagePage() {
  return <AdvantageService />;
}

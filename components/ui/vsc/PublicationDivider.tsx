"use client";

import React from "react";
import { ResearchLine } from "./ResearchLine";

/**
* VSC Component: PublicationDivider
* 
* 1. Purpose: Replaces standard HTML <hr> tags with the VSC chapter entrance sequence: Research Line -> Monospaced Coordinate Tag -> Generous Whitespace.
* 2. Atlas Alignment: Expresses Ritual #1 (*Research begins*) and Signature 01 & 02.
* 3. Signature Behaviour: Combines hairline gold draw with monospaced coordinate tags and generous vertical padding.
* 4. Emotional Outcome: Signals clearly to the reader that one research document has concluded and another is beginning.
* 5. Accessibility: Uses semantic HTML section break markup with aria-label for screen reader landmark context.
* 6. Performance: CSS transform animated ResearchLine with hardware acceleration.
*/

interface PublicationDividerProps {
  coordinate?: string;
  className?: string;
}

export function PublicationDivider({ coordinate, className = "" }: PublicationDividerProps) {
  return (
    <div className={`w-full py-16 sm:py-24 flex flex-col items-center justify-center select-none ${className}`}>
      <ResearchLine />
      {coordinate && (
        <span className="font-mono text-[10px] tracking-[0.3em] text-accent-gold/60 uppercase mt-4 block font-semibold">
          {coordinate}
        </span>
      )}
    </div>
  );
}

import { PrimaryTopic } from "./taxonomy";

/**
 * One entry per published version, oldest first. `year` is optional
 * because a version shouldn't carry a publish date nobody actually
 * confirmed — better an undated "Original" than an invented one.
 */
export interface FrameworkVersion {
  version: number;
  year?: number;
  /** What changed and why (Architecture doc §6.1) — this is the credibility
   *  move, not the version number itself. "Original." for v1. */
  changeNote: string;
}

export interface Framework {
  slug: string;
  title: string;
  desc: string;
  category?: string;
  primaryTopic: PrimaryTopic;
  /** Full write-up. Undefined = not yet written; the page says so rather
   *  than rendering nothing or faking content. */
  body?: string;
  /** Oldest first; the last entry is current. Empty = nothing published
   *  under version control yet. */
  versions: FrameworkVersion[];
  /** Month keys (e.g. "JUL") of letters that cited this framework —
   *  the back-reference required by §5.2. Empty until a real letter
   *  actually cites it; never inferred or auto-matched. */
  appliedInLetters: string[];
}

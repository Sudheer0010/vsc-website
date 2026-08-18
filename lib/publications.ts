import { marketLetters, sortedMonths } from "@/data/market-letters";
import { researchNotes } from "@/data/research-notes";
import { letterHref } from "@/lib/letter-urls";

const SITE_URL = "https://vsccapital.in";

/**
 * The shape every publication-alert consumer (the deploySucceeded function,
 * the baseline script, /api/subscribe) needs — not a new content model, just
 * the four facts an email alert actually uses, read from the site's existing
 * data files. There is no second publication database.
 */
export interface PublicationPayload {
  /** Research Note number ("001") or zero-padded Market Letter number ("007"). */
  id: string;
  title: string;
  hook: string;
  url: string;
}

/**
 * Latest is determined by numeric `number`, not array position — the data
 * file's own order isn't a documented source of truth the way sortedMonths
 * is for letters, so relying on array position here would be a silent
 * assumption rather than a guarantee.
 */
export function getLatestResearchNote(): PublicationPayload | null {
  if (researchNotes.length === 0) return null;

  const latest = researchNotes.reduce((max, note) =>
    Number(note.number) > Number(max.number) ? note : max
  );

  return {
    id: latest.number,
    title: `Trading Insight ${latest.number} — ${latest.title}`,
    hook: latest.emailHook ?? latest.thesis,
    url: `${SITE_URL}/research/notes/${latest.slug}`,
  };
}

/**
 * sortedMonths is the site's one documented "what's latest" source of truth
 * for letters (see data/market-letters.ts) — this defers to it rather than
 * recomputing its own notion of "most recent."
 */
export function getLatestMarketLetter(): PublicationPayload | null {
  if (sortedMonths.length === 0) return null;

  const latestMonthKey = sortedMonths[0];
  const letter = marketLetters[latestMonthKey];
  const id = String(letter.letterNumber).padStart(3, "0");
  const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();

  return {
    id,
    title: `Market Letter ${id} — ${monthName} ${letter.year}`,
    hook: letter.emailHook ?? letter.thesis,
    url: `${SITE_URL}${letterHref(latestMonthKey)}`,
  };
}

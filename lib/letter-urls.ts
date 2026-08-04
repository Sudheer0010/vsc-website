import { marketLetters } from "@/data/market-letters";

/**
 * Single source of truth for the letter month key <-> URL segment mapping
 * (data uses "JUL", the URL at /letters/2026/07 uses zero-padded numbers).
 * Every place that builds or parses a letter URL goes through here so the
 * pattern only has to be right in one place.
 */
const MONTH_KEY_TO_NUM: Record<string, string> = {
  JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
  JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12",
};

const NUM_TO_MONTH_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(MONTH_KEY_TO_NUM).map(([key, num]) => [num, key])
);

export function letterHref(monthKey: string): string {
  const letter = marketLetters[monthKey];
  return `/letters/${letter.year}/${MONTH_KEY_TO_NUM[monthKey]}`;
}

/** Resolves URL params back to a data key, or null if they don't match a real letter. */
export function monthKeyFromParams(year: string, month: string): string | null {
  const key = NUM_TO_MONTH_KEY[month];
  if (!key) return null;
  const letter = marketLetters[key];
  if (!letter || String(letter.year) !== year) return null;
  return key;
}

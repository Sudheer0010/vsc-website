import { MarketLetter } from "@/types/market-letter";

const WORDS_PER_MINUTE = 200;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Reading time computed from a letter's actual content — description plus
 * every section — rather than a number typed in at each place the letter
 * is shown. The homepage, the featured card, the archive grid, and the
 * modal all call this, so there is exactly one place that can be wrong
 * instead of four that can silently disagree with each other.
 */
export function getReadingTime(letter: MarketLetter): number {
  const parts: string[] = [];

  if (letter.description) parts.push(letter.description);
  if (letter.sections["Market Environment"]) parts.push(letter.sections["Market Environment"]);
  if (letter.sections["What Worked"]) parts.push(letter.sections["What Worked"].join(" "));
  if (letter.sections["Adjustment"]) parts.push(letter.sections["Adjustment"].join(" "));
  if (letter.sections["Looking Ahead"]) parts.push(letter.sections["Looking Ahead"]);

  const wordCount = countWords(parts.join(" "));
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

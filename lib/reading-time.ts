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
  const parts: string[] = [letter.thesis];

  parts.push(...letter.frameworkReview.map((row) => `${row.interpretation} ${row.detail}`));

  const {
    marketBehavior,
    whatIDid,
    theTrade,
    whatSurprisedMe,
    whatImWatching,
    theMarket,
    theFrameworkRead,
    thePositions,
    theReview,
    theWatch,
  } = letter.sections;
  parts.push(marketBehavior, whatIDid, whatImWatching);
  if (theTrade) parts.push(theTrade);
  if (whatSurprisedMe) parts.push(whatSurprisedMe);
  if (theMarket) parts.push(theMarket);
  if (theFrameworkRead) parts.push(theFrameworkRead);
  if (thePositions) parts.push(thePositions);
  if (theReview) parts.push(theReview);
  if (theWatch) parts.push(theWatch);

  const wordCount = countWords(parts.join(" "));
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

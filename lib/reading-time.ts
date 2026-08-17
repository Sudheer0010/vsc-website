import { MarketLetter } from "@/types/market-letter";
import { hasV4Content } from "./market-letter-format";

const WORDS_PER_MINUTE = 200;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Words actually rendered by the Template Spec v4 renderer — kept separate
 *  from the legacy count below so a v4 letter's read time reflects only
 *  what MarketLetterV4 shows, not stale legacy fields left populated for
 *  archival/compatibility reasons on old letters. */
function v4Parts(letter: MarketLetter): string[] {
  const parts: string[] = [];
  if (letter.subThesis) parts.push(letter.subThesis);
  if (letter.marketSnapshot) parts.push(...letter.marketSnapshot.map((row) => row.read));
  if (letter.marketHealth) parts.push(...letter.marketHealth.map((row) => row.vscRead));
  if (letter.overallEnvironment) parts.push(letter.overallEnvironment.vscRead);
  if (letter.environmentOverride) parts.push(letter.environmentOverride.reason);
  if (letter.netChange) parts.push(letter.netChange);
  if (letter.whatHappened) {
    for (const block of Object.values(letter.whatHappened)) {
      parts.push(block.headline, block.explanation);
    }
  }
  if (letter.chart) parts.push(letter.chart.title, letter.chart.caption);
  if (letter.vscRead) parts.push(letter.vscRead.conclusion);
  if (letter.playbook) {
    parts.push(
      letter.playbook.exposure,
      letter.playbook.positionSize,
      letter.playbook.preferredSetup,
      letter.playbook.avoided,
      letter.playbook.triggerToIncreaseRisk
    );
  }
  if (letter.monthInReview) {
    parts.push(letter.monthInReview.worked, letter.monthInReview.didnt, letter.monthInReview.lesson);
  }
  if (letter.watchingNext) {
    for (const condition of letter.watchingNext.conditions) {
      parts.push(condition.if, condition.then);
    }
    parts.push(letter.watchingNext.currentStance);
  }
  return parts;
}

/** Words rendered by the legacy letter-page path (Framework Review
 *  accordion + either the three-section or five-section prose body). */
function legacyParts(letter: MarketLetter): string[] {
  const parts: string[] = [];
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
  if (marketBehavior) parts.push(marketBehavior);
  if (whatIDid) parts.push(whatIDid);
  if (whatImWatching) parts.push(whatImWatching);
  if (theTrade) parts.push(theTrade);
  if (whatSurprisedMe) parts.push(whatSurprisedMe);
  if (theMarket) parts.push(theMarket);
  if (theFrameworkRead) parts.push(theFrameworkRead);
  if (thePositions) parts.push(thePositions);
  if (theReview) parts.push(theReview);
  if (theWatch) parts.push(theWatch);
  return parts;
}

/**
 * Reading time computed from a letter's actual rendered content, rather
 * than a number typed in at each place the letter is shown. The homepage,
 * the featured card, the archive grid, and the modal all call this, so
 * there is exactly one place that can be wrong instead of four that can
 * silently disagree with each other. Branches on the same `hasV4Content`
 * check the letter page uses to pick a renderer, so this only ever counts
 * words a reader can actually see.
 */
export function getReadingTime(letter: MarketLetter): number {
  const parts: string[] = [letter.thesis];
  parts.push(...(hasV4Content(letter) ? v4Parts(letter) : legacyParts(letter)));

  const wordCount = countWords(parts.join(" "));
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

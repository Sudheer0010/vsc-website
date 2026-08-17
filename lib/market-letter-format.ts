import { MarketLetter } from "@/types/market-letter";

/**
 * A letter is "v4" once it carries the full Template Spec v4 section set —
 * partial data (e.g. only marketHealth) would leave the 7-zone renderer
 * with undefined sections to render, so this is deliberately an
 * all-or-nothing check, not just `Boolean(letter.marketHealth)`. Used both
 * to pick the letter page's renderer and to decide whether the legacy
 * Framework Review accordion still needs to show.
 */
export function hasV4Content(letter: MarketLetter): boolean {
  return Boolean(
    letter.marketSnapshot &&
      letter.marketHealth &&
      letter.overallEnvironment &&
      letter.whatHappened &&
      letter.vscRead &&
      letter.playbook &&
      letter.monthInReview &&
      letter.watchingNext
  );
}

/** ISO "YYYY-MM-DD" -> "31 July 2026". UTC to avoid off-by-one near midnight. */
export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

const MONTH_NAMES = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/**
 * "June 2026" -> "2026-06". Content only carries month/year precision (see
 * ResearchNote.publishedDate), so this stops short of inventing a day —
 * returns undefined rather than guessing when the shape doesn't match.
 */
export function toIsoMonth(display: string): string | undefined {
  const match = display.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return undefined;
  const monthIndex = MONTH_NAMES.indexOf(match[1].toLowerCase());
  if (monthIndex === -1) return undefined;
  return `${match[2]}-${String(monthIndex + 1).padStart(2, "0")}`;
}

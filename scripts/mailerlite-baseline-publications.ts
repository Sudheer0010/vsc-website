/**
 * One-time baseline for the VSC Research publication-alert system.
 *
 * Existing subscribers have blank last_note_notification /
 * last_letter_notification fields. If the deploy-alert function ran
 * against them as-is, every one of them would look "not yet notified" of
 * the current latest Research Note and Market Letter, and the very first
 * enabled deploy would email the entire list about content they may have
 * already read. This script closes that gap exactly once: it stamps every
 * active VSC Research subscriber with today's latest Note/Letter IDs —
 * nothing else.
 *
 * It does NOT add anyone to VSC Research Note Alert or VSC Market Letter
 * Alert, and it does NOT send any email — it only sets two custom fields,
 * using the same field-update endpoint the site's own /api/subscribe
 * route relies on, called here without a `groups` key.
 *
 * Run manually, exactly once, before setting PUBLICATION_ALERTS_ENABLED=true:
 *
 *   npm run mailerlite:baseline-publications
 *
 * Reads MAILERLITE_API_TOKEN / MAILERLITE_GROUP_ID from the process
 * environment — export them first, or run via a tool that loads
 * .env.local (e.g. `node --env-file=.env.local` on Node 20.6+).
 *
 * Prints only aggregate counts — never a subscriber email address.
 */
import { getLatestResearchNote, getLatestMarketLetter } from "@/lib/publications";
import { fetchActiveGroupSubscribers, batchUpsertSubscribers } from "@/lib/mailerlite/subscribers";

async function main() {
  const apiToken = process.env.MAILERLITE_API_TOKEN;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiToken || !groupId) {
    console.error("[baseline] MAILERLITE_API_TOKEN / MAILERLITE_GROUP_ID are not set. Aborting.");
    process.exitCode = 1;
    return;
  }

  const latestNote = getLatestResearchNote();
  const latestLetter = getLatestMarketLetter();

  console.log(`[baseline] Latest Research Note: ${latestNote?.id ?? "none"}`);
  console.log(`[baseline] Latest Market Letter: ${latestLetter?.id ?? "none"}`);

  if (!latestNote && !latestLetter) {
    console.log("[baseline] No publications found to baseline against. Nothing to do.");
    return;
  }

  console.log("[baseline] Fetching active VSC Research subscribers...");
  const subscribers = await fetchActiveGroupSubscribers(groupId, apiToken);
  console.log(`[baseline] Active subscribers: ${subscribers.length}`);

  if (subscribers.length === 0) {
    console.log("[baseline] Nothing to do.");
    return;
  }

  const fields: Record<string, string> = {};
  if (latestNote) fields.last_note_notification = latestNote.id;
  if (latestLetter) fields.last_letter_notification = latestLetter.id;

  // No `groupId` argument here — deliberately field-only, no group change.
  const outcome = await batchUpsertSubscribers(
    subscribers.map((s) => s.email),
    fields,
    apiToken
  );

  console.log(`[baseline] Updated=${outcome.succeeded} Failed=${outcome.failed}`);
  console.log("[baseline] Done. No emails were sent. No group memberships were changed.");

  if (outcome.failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("[baseline] Unexpected error:", err instanceof Error ? err.message : "unknown error");
  process.exitCode = 1;
});

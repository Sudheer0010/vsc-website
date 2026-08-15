import { getLatestResearchNote, getLatestMarketLetter, type PublicationPayload } from "@/lib/publications";
import { fetchActiveGroupSubscribers, batchUpsertSubscribers, type MailerLiteSubscriber } from "./subscribers";

export interface PublicationAlertResult {
  type: "note" | "letter";
  latestId: string | null;
  eligible: number;
  triggered: number;
  failed: number;
  skipped?: string;
}

function skippedResult(type: "note" | "letter", latestId: string | null, reason: string): PublicationAlertResult {
  return { type, latestId, eligible: 0, triggered: 0, failed: 0, skipped: reason };
}

interface RunOneConfig {
  type: "note" | "letter";
  latest: PublicationPayload | null;
  alertGroupId: string | undefined;
  idFieldName: "last_note_notification" | "last_letter_notification";
  titleFieldName: "publication_title" | "letter_title";
  hookFieldName: "publication_hook" | "letter_hook";
  urlFieldName: "publication_url" | "letter_url";
}

/**
 * One publication type's full pipeline: filter the already-fetched master
 * subscriber list down to those not yet current, then (if any) upsert them
 * with that publication's fields and add them to its alert trigger group.
 * Note and Letter fields never mix — each call only ever builds the field
 * set for its own `type`.
 */
async function runOne(
  config: RunOneConfig,
  subscribers: MailerLiteSubscriber[],
  apiToken: string
): Promise<PublicationAlertResult> {
  const { type, latest, alertGroupId, idFieldName, titleFieldName, hookFieldName, urlFieldName } = config;

  if (!latest) {
    return skippedResult(type, null, "no publication found");
  }
  if (!alertGroupId) {
    return skippedResult(type, latest.id, "alert group id not configured");
  }

  const eligible = subscribers.filter((s) => String(s.fields[idFieldName] ?? "") !== latest.id);

  if (eligible.length === 0) {
    return { type, latestId: latest.id, eligible: 0, triggered: 0, failed: 0 };
  }

  const fields: Record<string, string> = {
    [titleFieldName]: latest.title,
    [hookFieldName]: latest.hook,
    [urlFieldName]: latest.url,
    [idFieldName]: latest.id,
  };

  const outcome = await batchUpsertSubscribers(
    eligible.map((s) => s.email),
    fields,
    apiToken,
    alertGroupId
  );

  return {
    type,
    latestId: latest.id,
    eligible: eligible.length,
    triggered: outcome.succeeded,
    failed: outcome.failed,
  };
}

/**
 * Runs both publication types against the current master-group subscriber
 * list. Each type is wrapped in its own try/catch so a failure in one
 * (e.g. the Letter alert group import erroring) can never corrupt or skip
 * the other's result — every failure mode here is fail-safe: subscribers
 * who don't get successfully upserted keep their old notification-state
 * field and simply stay eligible for the next run, rather than being
 * marked "notified" without actually having been added to the trigger
 * group.
 */
export async function runPublicationAlerts(): Promise<PublicationAlertResult[]> {
  const apiToken = process.env.MAILERLITE_API_TOKEN;
  const masterGroupId = process.env.MAILERLITE_GROUP_ID;
  const noteAlertGroupId = process.env.MAILERLITE_NOTE_ALERT_GROUP_ID;
  const letterAlertGroupId = process.env.MAILERLITE_LETTER_ALERT_GROUP_ID;

  const latestNote = getLatestResearchNote();
  const latestLetter = getLatestMarketLetter();

  if (!apiToken || !masterGroupId) {
    const reason = "MAILERLITE_API_TOKEN / MAILERLITE_GROUP_ID not configured";
    return [
      skippedResult("note", latestNote?.id ?? null, reason),
      skippedResult("letter", latestLetter?.id ?? null, reason),
    ];
  }

  let subscribers: MailerLiteSubscriber[];
  try {
    subscribers = await fetchActiveGroupSubscribers(masterGroupId, apiToken);
  } catch {
    const reason = "failed to fetch active subscribers";
    return [
      skippedResult("note", latestNote?.id ?? null, reason),
      skippedResult("letter", latestLetter?.id ?? null, reason),
    ];
  }

  const results: PublicationAlertResult[] = [];

  try {
    results.push(
      await runOne(
        {
          type: "note",
          latest: latestNote,
          alertGroupId: noteAlertGroupId,
          idFieldName: "last_note_notification",
          titleFieldName: "publication_title",
          hookFieldName: "publication_hook",
          urlFieldName: "publication_url",
        },
        subscribers,
        apiToken
      )
    );
  } catch {
    results.push(skippedResult("note", latestNote?.id ?? null, "unexpected error"));
  }

  try {
    results.push(
      await runOne(
        {
          type: "letter",
          latest: latestLetter,
          alertGroupId: letterAlertGroupId,
          idFieldName: "last_letter_notification",
          titleFieldName: "letter_title",
          hookFieldName: "letter_hook",
          urlFieldName: "letter_url",
        },
        subscribers,
        apiToken
      )
    );
  } catch {
    results.push(skippedResult("letter", latestLetter?.id ?? null, "unexpected error"));
  }

  return results;
}

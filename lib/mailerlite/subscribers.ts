import { mailerLiteRequest } from "./client";

export interface MailerLiteSubscriber {
  id: string;
  email: string;
  fields: Record<string, string | number | null>;
}

interface SubscribersPage {
  data: Array<{
    id: string;
    email: string;
    fields?: Record<string, string | number | null>;
  }>;
  meta?: {
    next_cursor?: string | null;
  };
}

const PAGE_LIMIT = 100;

/**
 * Every active subscriber in a group, following cursor pagination to
 * completion. The current Free-plan list is small enough that this returns
 * after one page today, but the loop is here so it stays correct as the
 * list grows — never assume a single page.
 */
export async function fetchActiveGroupSubscribers(
  groupId: string,
  apiToken: string
): Promise<MailerLiteSubscriber[]> {
  const all: MailerLiteSubscriber[] = [];
  let cursor: string | undefined;

  do {
    const query: Record<string, string> = {
      "filter[status]": "active",
      limit: String(PAGE_LIMIT),
    };
    if (cursor) query.cursor = cursor;

    const page = await mailerLiteRequest<SubscribersPage>({
      method: "GET",
      path: `/groups/${groupId}/subscribers`,
      apiToken,
      query,
    });

    for (const s of page.data) {
      all.push({ id: s.id, email: s.email, fields: s.fields ?? {} });
    }

    cursor = page.meta?.next_cursor ?? undefined;
  } while (cursor);

  return all;
}

export interface BatchUpsertOutcome {
  succeeded: number;
  failed: number;
}

const BATCH_CONCURRENCY = 5;
const BATCH_DELAY_MS = 250;

/**
 * Upserts a batch of subscribers by email, in small concurrent chunks with
 * a short pause between chunks — a batching facility built on the same
 * proven /subscribers upsert endpoint /api/subscribe already uses in
 * production, rather than either one unbounded burst of requests or a
 * fully serial loop. `groupId`, when given, adds every upserted subscriber
 * to that group in the same request (this is how a publication alert
 * enrolls subscribers into the MailerLite automation's trigger group);
 * omit it to update fields only, touching no group membership.
 *
 * Never logs which email succeeded or failed — only the caller's aggregate
 * counts are ever written to logs.
 */
export async function batchUpsertSubscribers(
  emails: string[],
  fields: Record<string, string>,
  apiToken: string,
  groupId?: string
): Promise<BatchUpsertOutcome> {
  let succeeded = 0;
  let failed = 0;

  for (let i = 0; i < emails.length; i += BATCH_CONCURRENCY) {
    const chunk = emails.slice(i, i + BATCH_CONCURRENCY);

    const results = await Promise.allSettled(
      chunk.map((email) =>
        mailerLiteRequest({
          method: "POST",
          path: "/subscribers",
          apiToken,
          body: {
            email,
            fields,
            ...(groupId ? { groups: [groupId] } : {}),
          },
        })
      )
    );

    for (const result of results) {
      if (result.status === "fulfilled") succeeded += 1;
      else failed += 1;
    }

    if (i + BATCH_CONCURRENCY < emails.length) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  return { succeeded, failed };
}

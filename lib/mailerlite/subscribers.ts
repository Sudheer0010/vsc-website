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

export interface ImportRecipient {
  email: string;
  fields: Record<string, string>;
}

export interface ImportOutcome {
  imported: number;
  updated: number;
  errored: number;
  /** True if the job never reached a terminal state within the bounded
   *  poll window. MailerLite may still finish the job server-side after
   *  this returns — the counts below are 0 in that case because we have
   *  no confirmed outcome to report, not because nothing happened. */
  timedOut: boolean;
}

interface ImportJobResponse {
  data?: {
    import_progress_url?: string;
  };
  import_progress_url?: string;
}

interface ImportProgressResponse {
  data?: {
    status?: string;
    imported?: number;
    updated?: number;
    errored?: number;
  };
  status?: string;
  imported?: number;
  updated?: number;
  errored?: number;
}

const TERMINAL_STATUSES = new Set(["done", "finished", "completed", "complete", "failed", "error"]);
const IMPORT_POLL_INTERVAL_MS = 1500;
const IMPORT_POLL_MAX_ATTEMPTS = 20; // ~30s bounded wait, not indefinite

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * MailerLite's own group-import endpoint — the one supported bulk facility
 * for "these N subscribers all get these field values and this group,
 * right now." One POST regardless of list size, instead of one request per
 * subscriber; on a 120 requests/minute account-wide limit, that's the
 * difference between this scaling fine and this eventually tripping the
 * limit as the list grows. The endpoint doesn't apply synchronously — it
 * hands back a progress URL, which this polls (bounded, never indefinite)
 * until MailerLite reports a terminal status.
 *
 * Used for both real sends (`groupId` = an alert trigger group, so
 * imported subscribers are enrolled and the automation fires) and the
 * one-time baseline (`groupId` = the master VSC Research group recipients
 * already belong to, so the import only ever touches fields — it can't
 * add anyone to a group they're not already in).
 */
export async function importSubscribersToGroup(
  groupId: string,
  subscribers: ImportRecipient[],
  apiToken: string
): Promise<ImportOutcome> {
  const job = await mailerLiteRequest<ImportJobResponse>({
    method: "POST",
    path: `/groups/${groupId}/import-subscribers`,
    apiToken,
    body: { subscribers },
  });

  const progressUrl = job.data?.import_progress_url ?? job.import_progress_url;

  if (!progressUrl) {
    // The import was accepted but MailerLite gave us nothing to poll —
    // we can't confirm an outcome, so report it as such rather than
    // guessing success.
    return { imported: 0, updated: 0, errored: 0, timedOut: true };
  }

  for (let attempt = 0; attempt < IMPORT_POLL_MAX_ATTEMPTS; attempt += 1) {
    const progress = await mailerLiteRequest<ImportProgressResponse>({
      method: "GET",
      url: progressUrl,
      apiToken,
    });

    const body = progress.data ?? progress;
    const status = (body.status ?? "").toLowerCase();
    const imported = body.imported ?? 0;
    const updated = body.updated ?? 0;
    const errored = body.errored ?? 0;

    if (TERMINAL_STATUSES.has(status) || (!status && (imported || updated || errored))) {
      return { imported, updated, errored, timedOut: false };
    }

    if (attempt < IMPORT_POLL_MAX_ATTEMPTS - 1) {
      await sleep(IMPORT_POLL_INTERVAL_MS);
    }
  }

  return { imported: 0, updated: 0, errored: 0, timedOut: true };
}

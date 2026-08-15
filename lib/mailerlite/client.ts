const MAILERLITE_BASE_URL = "https://connect.mailerlite.com/api";
const REQUEST_TIMEOUT_MS = 10000;
const MAX_429_RETRIES = 1;
const DEFAULT_RETRY_DELAY_MS = 1000;

export class MailerLiteError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "MailerLiteError";
    this.status = status;
  }
}

interface MailerLiteRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  apiToken: string;
  body?: unknown;
  query?: Record<string, string>;
}

/**
 * Thin fetch wrapper shared by every MailerLite call site in this project —
 * one place for the request timeout, the single bounded 429/Retry-After
 * retry, and non-2xx handling. Never logs the token, the request body, or
 * the response body: callers only ever see a thrown MailerLiteError with a
 * plain status/message, or the parsed JSON on success.
 */
export async function mailerLiteRequest<T>(opts: MailerLiteRequestOptions): Promise<T> {
  const url = new URL(`${MAILERLITE_BASE_URL}${opts.path}`);
  if (opts.query) {
    for (const [key, value] of Object.entries(opts.query)) {
      url.searchParams.set(key, value);
    }
  }

  let attempt = 0;

  for (;;) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    let response: Response;

    try {
      response = await fetch(url.toString(), {
        method: opts.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${opts.apiToken}`,
        },
        body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
        signal: controller.signal,
      });
    } catch (err) {
      const reason = err instanceof Error && err.name === "AbortError" ? "timeout" : "network error";
      throw new MailerLiteError(`MailerLite request failed: ${reason}`);
    } finally {
      clearTimeout(timeout);
    }

    if (response.status === 429 && attempt < MAX_429_RETRIES) {
      const retryAfterHeader = response.headers.get("Retry-After");
      const retryAfterSeconds = retryAfterHeader ? Number(retryAfterHeader) : NaN;
      const delayMs = Number.isFinite(retryAfterSeconds) && retryAfterSeconds >= 0
        ? retryAfterSeconds * 1000
        : DEFAULT_RETRY_DELAY_MS;

      await new Promise((resolve) => setTimeout(resolve, delayMs));
      attempt += 1;
      continue;
    }

    if (!response.ok) {
      throw new MailerLiteError(`MailerLite responded with status ${response.status}`, response.status);
    }

    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  }
}

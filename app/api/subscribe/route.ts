import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const MAILERLITE_SUBSCRIBERS_URL = "https://connect.mailerlite.com/api/subscribers";
const MAILERLITE_TIMEOUT_MS = 9000;

// In-memory, per-server-instance store — good enough for a stub. Replace
// with a shared store (e.g. the mailing list provider's own rate limiting,
// or Redis) if this needs to hold across instances.
const submissionsByIp = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return false;
}

/**
 * Subscribes an email to the configured MailerLite group. Logs are limited
 * to the upstream HTTP status or failure mode — never the token, the
 * email, auth headers, or response body, since MailerLite error payloads
 * can echo back submitted data.
 */
async function subscribeToMailerLite(email: string): Promise<boolean> {
  const apiToken = process.env.MAILERLITE_API_TOKEN;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiToken || !groupId) {
    console.error("[subscribe] MailerLite env vars are not configured.");
    return false;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), MAILERLITE_TIMEOUT_MS);

  try {
    const response = await fetch(MAILERLITE_SUBSCRIBERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ email, groups: [groupId] }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(`[subscribe] MailerLite responded with status ${response.status}`);
      return false;
    }

    return true;
  } catch (err) {
    const reason = err instanceof Error && err.name === "AbortError" ? "timeout" : "network error";
    console.error(`[subscribe] MailerLite request failed: ${reason}`);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a bit." },
      { status: 429 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email ?? "").trim().toLowerCase()
      : "";

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const subscribed = await subscribeToMailerLite(email);
  if (!subscribed) {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}

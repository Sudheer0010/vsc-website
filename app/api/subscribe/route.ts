import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// In-memory, per-server-instance store — good enough for a stub. Replace
// with a shared store (e.g. the mailing list provider's own rate limiting,
// or Redis) once this moves off the stub.
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
      ? String((body as { email: unknown }).email ?? "").trim()
      : "";

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // Stub: replace with real subscription storage (MailerLite, Buttondown, etc.).
  console.log(`[subscribe] new signup: ${email}`);

  return NextResponse.json({ success: true });
}

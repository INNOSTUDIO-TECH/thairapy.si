import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site-config";

// Basic in-memory rate limit (best-effort; per serverless instance).
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  const { name, email, phone, service, message, company } = parsed.data;

  // Honeypot filled → silently accept (drop the spam).
  if (company) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL ?? siteConfig.email;
  const from = process.env.CONTACT_FROM ?? "Thairapy <onboarding@resend.dev>";

  // Not configured yet → log and accept so the form still works in dev.
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — message not emailed:", {
      name,
      email,
      phone,
      service,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Novo povpraševanje / Neue Anfrage — ${name}`,
      text: [
        `Ime / Name: ${name}`,
        `Email: ${email}`,
        `Telefon / Telefon: ${phone || "-"}`,
        `Masaža / Massage: ${service || "-"}`,
        "",
        message,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}

import { NextResponse } from "next/server";
import { TOPIC_LABELS } from "@/lib/topics";

const CONTACT_EMAIL = "kontakt@bergurmoberg.dk";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørgsel." }, { status: 400 });
  }

  // Honeypot (deliberately meaningless field name — autofill/password
  // managers can populate anything that looks like "website" or "email").
  // Real visitors never fill this hidden field in; bots that do get a
  // fake success so they don't learn to avoid it.
  if (typeof body.hp_x7 === "string" && body.hp_x7.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const organisation = String(body.organisation ?? "").trim();
  const date = String(body.date ?? "").trim();
  const topic = String(body.topic ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Udfyld navn og en gyldig e-mail." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Mailtjenesten er ikke konfigureret endnu." },
      { status: 503 }
    );
  }

  const subject = `Foredragsforespørgsel${organisation ? ` — ${organisation}` : ""}`;
  const lines = [`Navn: ${name}`, `E-mail: ${email}`];
  if (organisation) lines.push(`Organisation: ${organisation}`);
  if (date) lines.push(`Ønsket dato: ${date}`);
  if (topic) lines.push(`Foredrag: ${TOPIC_LABELS[topic] ?? topic}`);
  lines.push("", message);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "Bergur website <booking@bergurmoberg.dk>",
      to: CONTACT_EMAIL,
      reply_to: email,
      subject,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Kunne ikke sende forespørgslen." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

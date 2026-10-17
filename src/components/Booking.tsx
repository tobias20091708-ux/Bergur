"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { getSnapshot, getServerSnapshot, subscribe } from "@/lib/topicStore";
import { TOPIC_LABELS } from "@/lib/topics";

const CONTACT_EMAIL = "kontakt@bergurmoberg.dk";

type Status = "idle" | "submitting" | "sent" | "fallback";

export function Booking() {
  const [status, setStatus] = useState<Status>("idle");
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const prefilledTopic = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [topicOverride, setTopicOverride] = useState<string | null>(null);
  const topic = topicOverride ?? prefilledTopic ?? "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const organisation = String(data.get("organisation") ?? "");
    const date = String(data.get("date") ?? "");
    const selectedTopic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "");
    const honeypot = String(data.get("hp_x7") ?? ""); // bots only

    const subject = `Foredragsforespørgsel${organisation ? ` — ${organisation}` : ""}`;
    const lines = [`Navn: ${name}`, `E-mail: ${email}`];
    if (organisation) lines.push(`Organisation: ${organisation}`);
    if (date) lines.push(`Ønsket dato: ${date}`);
    if (selectedTopic) {
      lines.push(`Foredrag: ${TOPIC_LABELS[selectedTopic] ?? selectedTopic}`);
    }
    lines.push("", message);
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setMailtoHref(href);
    setStatus("submitting");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organisation,
          date,
          topic: selectedTopic,
          message,
          hp_x7: honeypot,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }
    } catch {
      // network error — fall through to mailto fallback below
    }

    // Backend unavailable or failed — fall back to the visitor's own mail
    // client rather than pretending the enquiry arrived. See CLAUDE.md.
    setStatus("fallback");
    window.location.href = href;
  }

  return (
    <section
      id="book"
      className="border-t border-border bg-surface px-6 py-32 sm:px-12"
    >
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent-text">
            Book foredrag
          </p>
          <h2 className="mt-4 font-serif text-3xl italic text-foreground sm:text-4xl">
            Forespørg på dato og pris
          </h2>
          <p className="mt-4 max-w-[68ch] text-base leading-[1.7] text-muted sm:text-lg">
            Bergur holder et begrænset antal foredrag uden for Københavns
            Universitet. Send en uforpligtende forespørgsel, og få hurtigt
            svar på pris og tilgængelighed.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mt-10">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            Se Bergur fortælle
          </p>
          <div className="mt-3 flex aspect-video items-center justify-center rounded-lg border border-white/15 bg-surface-raised/60">
            <p className="text-sm text-muted">Video kommer snart</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="mt-6">
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-border bg-surface-raised px-4 py-2.5 text-xs text-muted disabled:opacity-70 sm:text-sm"
          >
            Download pressekit (billeder + CV) — Kommer snart
          </button>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10">
          {status === "sent" || status === "fallback" ? (
            <div className="rounded-lg border border-border bg-surface-raised p-8 text-foreground">
              {status === "sent" ? (
                <>
                  <p className="font-medium">Tak for din forespørgsel.</p>
                  <p className="mt-3 max-w-[68ch] text-sm leading-[1.7] text-muted">
                    Vi har modtaget din henvendelse og vender tilbage
                    hurtigst muligt med svar på dato, pris og
                    tilgængelighed.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium">Dit e-mailprogram åbner nu.</p>
                  <p className="mt-3 max-w-[68ch] text-sm leading-[1.7] text-muted">
                    Det åbner med en færdig besked til{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-text hover:text-foreground">
                      {CONTACT_EMAIL}
                    </a>
                    . Tryk på send i dit e-mailprogram for at aflevere
                    henvendelsen.
                  </p>
                  <a
                    href={mailtoHref ?? `mailto:${CONTACT_EMAIL}`}
                    className="btn-faroe mt-5 inline-block rounded-md px-7 py-3 text-sm font-medium text-white"
                  >
                    Åbn og send mail til Bergur →
                  </a>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <input
                type="text"
                name="hp_x7"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute h-px w-px overflow-hidden opacity-0"
                style={{ clip: "rect(0 0 0 0)" }}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-muted">
                  Navn
                  <input
                    required
                    name="name"
                    type="text"
                    className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-muted">
                  E-mail
                  <input
                    required
                    name="email"
                    type="email"
                    className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-muted">
                  Organisation
                  <input
                    name="organisation"
                    type="text"
                    className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-muted">
                  Ønsket dato
                  <input
                    name="date"
                    type="date"
                    className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm text-muted">
                Vælg foredrag
                <select
                  name="topic"
                  value={topic}
                  onChange={(event) => setTopicOverride(event.target.value)}
                  className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                >
                  <option value="" disabled>
                    Vælg et foredrag
                  </option>
                  <option value="det-kulturelle-rigsfaellesskab">
                    Det kulturelle rigsfællesskab
                  </option>
                  <option value="kolde-oer-blev-cool">
                    Kolde øer blev cool
                  </option>
                  <option value="to-kulturikoner">
                    To kulturikoner, to øer
                  </option>
                  <option value="verdens-mest-oversete-forfatter">
                    Verdens mest oversete forfatter
                  </option>
                  <option value="heinesen-hulen">Heinesen-hulen</option>
                  <option value="andet">Andet/ved ikke endnu</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-muted">
                Besked
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Fx: “Vi vil gerne have jeres pressekit tilsendt” eller detaljer om jeres arrangement"
                  className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                />
              </label>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-faroe w-fit rounded-md px-8 py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                  {status === "submitting" ? "Sender…" : "Send forespørgsel"}
                </button>
                <p className="text-xs text-muted">
                  Uforpligtende forespørgsel. I modtager svar hurtigst
                  muligt.
                </p>
              </div>
              <p className="max-w-[68ch] text-xs leading-[1.7] text-muted">
                Vi behandler kun de oplysninger, du selv opgiver, og
                videregiver dem ikke til tredjepart.
              </p>
            </form>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-10 border-t border-border pt-6 text-sm text-muted">
          <p>
            kontakt@bergurmoberg.dk · Københavns Universitet
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

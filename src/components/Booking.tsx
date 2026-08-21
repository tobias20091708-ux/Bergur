"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { getSnapshot, getServerSnapshot, subscribe } from "@/lib/topicStore";

const CONTACT_EMAIL = "kontakt@bergurmoberg.dk";

const TOPIC_LABELS: Record<string, string> = {
  "kolde-oer-blev-cool": "Kolde øer blev cool",
  "to-kulturikoner": "To kulturikoner, to øer",
  "verdens-mest-oversete-forfatter": "Verdens mest oversete forfatter",
  "heinesen-hulen": "Heinesen-hulen",
  andet: "Andet/ved ikke endnu",
};

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const prefilledTopic = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [topicOverride, setTopicOverride] = useState<string | null>(null);
  const topic = topicOverride ?? prefilledTopic ?? "";

  // TODO: wire up to a real backend (e.g. Resend, Formspree, or an API
  // route). Until then, submitting opens a prefilled mailto: link instead
  // of pretending to deliver the enquiry — see CLAUDE.md.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const organisation = String(data.get("organisation") ?? "");
    const date = String(data.get("date") ?? "");
    const selectedTopic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Foredragsforespørgsel${organisation ? ` — ${organisation}` : ""}`;
    const lines = [`Navn: ${name}`, `E-mail: ${email}`];
    if (organisation) lines.push(`Organisation: ${organisation}`);
    if (date) lines.push(`Ønsket dato: ${date}`);
    if (selectedTopic) {
      lines.push(`Foredrag: ${TOPIC_LABELS[selectedTopic] ?? selectedTopic}`);
    }
    lines.push("", message);
    const body = lines.join("\n");

    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailtoHref(href);
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Open the visitor's own mail client with the prefilled enquiry —
      // the button below does the same, in case this gets blocked.
      window.location.href = href;
    }, 400);
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
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Bergur holder et begrænset antal foredrag uden for Københavns
            Universitet. Send en uforpligtende forespørgsel, og få hurtigt
            svar på pris og tilgængelighed.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mt-8">
          <div className="flex flex-wrap gap-4 text-xs text-muted sm:text-sm">
            <a
              href="#hero"
              className="rounded-md border border-border bg-surface-raised px-4 py-2 transition hover:border-accent hover:text-foreground"
            >
              1. Se Bergur fortælle
            </a>
            <span className="rounded-md border border-border bg-surface-raised px-4 py-2">
              2. Bed om pressekit i beskeden nedenfor
            </span>
            <span className="rounded-md border border-accent bg-accent-soft px-4 py-2 text-foreground">
              3. Forespørg på dato og pris
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10">
          {submitted ? (
            <div className="rounded-lg border border-border bg-surface-raised p-8 text-foreground">
              <p className="font-medium">Tak for din forespørgsel.</p>
              <p className="mt-3 text-sm text-muted">
                Dit e-mailprogram åbner nu med en færdig besked til{" "}
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
              <p className="mt-4 text-sm text-muted">
                Åbnede e-mailprogrammet ikke, så skriv direkte til{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-text hover:text-foreground">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
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
                  disabled={submitting}
                  className="btn-faroe w-fit rounded-md px-8 py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                  {submitting ? "Sender…" : "Send forespørgsel"}
                </button>
                <p className="text-xs text-muted">
                  Uforpligtende forespørgsel. I modtager svar hurtigst
                  muligt.
                </p>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                Når du sender, åbnes dit e-mailprogram med en færdig besked
                til {CONTACT_EMAIL}. Vi behandler kun de oplysninger, du
                selv opgiver, og videregiver dem ikke til tredjepart.
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

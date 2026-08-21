"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { getSnapshot, getServerSnapshot, subscribe } from "@/lib/topicStore";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const prefilledTopic = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [topicOverride, setTopicOverride] = useState<string | null>(null);
  const topic = topicOverride ?? prefilledTopic ?? "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire up to a real backend (e.g. Resend, Formspree, or an API route) —
    // this currently only simulates a send and does not deliver the enquiry.
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
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
            <p className="rounded-lg border border-border bg-surface-raised p-8 text-foreground">
              Tak for din forespørgsel — vi vender tilbage hurtigst muligt.
            </p>
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

"use client";

import { FormEvent, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire up to a real backend (e.g. Resend, Formspree, or an API route).
    setSubmitted(true);
  }

  return (
    <section
      id="book"
      className="border-t border-border bg-surface px-6 py-24 sm:px-12"
    >
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            Book foredrag
          </p>
          <h2 className="mt-4 font-serif text-3xl italic text-foreground sm:text-4xl">
            Forespørg på dato og pris
          </h2>
          <p className="mt-4 text-sm text-muted">
            Bergur holder et begrænset antal foredrag uden for KU. Foredrag
            fra [XX.000 kr.] ekskl. moms og transport.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10">
          {submitted ? (
            <p className="rounded-2xl border border-border bg-surface-raised p-8 text-foreground">
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
                Emne / foredrag
                <input
                  name="topic"
                  type="text"
                  placeholder="Fx “Det nye Færøerne”"
                  className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-muted">
                Besked
                <textarea
                  name="message"
                  rows={4}
                  className="rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
                />
              </label>
              <button
                type="submit"
                className="mt-2 w-fit rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition hover:bg-accent/90"
              >
                Send forespørgsel
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

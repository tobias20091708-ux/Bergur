"use client";

import { FormEvent, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const CONTACT_EMAIL = "kontakt@bergurmoberg.dk";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [mailToUrl, setMailToUrl] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const lines = [
      `Navn: ${data.get("name") || ""}`,
      `E-mail: ${data.get("email") || ""}`,
      `Organisation: ${data.get("organisation") || ""}`,
      `Ønsket dato: ${data.get("date") || ""}`,
      `Foredrag: ${data.get("topic") || ""}`,
      `Besked: ${data.get("message") || ""}`,
    ];
    const subject = encodeURIComponent(
      `Forespørgsel på foredrag — ${data.get("name") || ""}`,
    );
    const body = encodeURIComponent(lines.join("\n"));
    setMailToUrl(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`);
    setSubmitted(true);
    // Open the user's mail client with the prefilled enquiry.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="book"
      className="border-t border-border bg-surface px-6 py-32 sm:px-12"
    >
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            Book foredrag
          </p>
          <h2 className="mt-4 font-serif text-3xl italic text-foreground sm:text-4xl">
            Forespørg på dato og pris
          </h2>
          <p className="mt-4 text-sm text-foreground">
            Selvfølgelig uden forpligtelser. Du vil hurtigt få tilbagemelding.
          </p>
          <p className="mt-2 text-sm text-muted">
            Bergur holder et begrænset antal foredrag uden for KU. Kontakt
            for pris og tilgængelighed.
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
              <p className="font-medium">
                Tak for din forespørgsel.
              </p>
              <p className="mt-3 text-sm text-muted">
                Dit e-mailprogram åbner nu med en færdig e-mail til{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent underline"
                >
                  {CONTACT_EMAIL}
                </a>
                . Tryk på send i dit e-mailprogram for at aflevere henvendelsen.
              </p>
              <p className="mt-3 text-sm text-muted">
                Åbnede e-mailen ikke?{" "}
                <a
                  href={mailToUrl}
                  className="text-accent underline"
                >
                  Klik her for at åbne den igen
                </a>
                , eller skriv direkte til{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent underline"
                >
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
                Hvilket foredrag
                <select
                  name="topic"
                  defaultValue=""
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
              <button
                type="submit"
                className="btn-faroe mt-2 w-fit rounded-md px-8 py-3 text-sm font-medium text-white"
              >
                Send forespørgsel
              </button>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Når du sender, åbnes dit e-mailprogram med en færdig besked til{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent underline"
                >
                  {CONTACT_EMAIL}
                </a>
                . Du kan også skrive direkte dertil. Vi behandler kun de
                oplysninger, du selv opgiver, og videregiver dem ikke til tredjepart.
              </p>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

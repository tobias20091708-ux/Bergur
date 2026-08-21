import type { Image as SanityImage } from "sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { ScrollReveal } from "./ScrollReveal";
import { TalkCTA } from "./TalkCTA";

const DEFAULT_EYEBROW = "Heinesen-hulen";
const DEFAULT_TITLE = "En hule, seks niveauer ned i den færøske undergrund";
const DEFAULT_BODY =
  "Et samarbejde med Henning Larsen Arkitekter om at gøre William Heinesens univers fysisk — en hule under Færøernes jord, inspireret af Platons hulelignelse. Seks niveauer ned i klippen, bygget op omkring forfatterskabet der aldrig helt fik den plads, det fortjente.";

const PROJECT_FACTS = [
  { label: "Arkitekt", value: "Henning Larsen Arkitekter" },
  { label: "Niveauer", value: "6, ned i klippen" },
  { label: "Inspiration", value: "Platons hulelignelse" },
];

export function HeinesenProject({
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  image,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  image?: SanityImage;
}) {
  return (
    <section
      id="heinesen-hulen"
      className="relative overflow-hidden border-y border-border bg-background"
    >
      {/* Atmospheric backdrop — the actual Faroese sea cliffs the cave will
          be built beneath, not a stand-in for the architectural rendering. */}
      <div className="absolute inset-0">
        <Image
          src="/foredrag/verdens-mest-oversete.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="ken-burns object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-32 sm:px-12">
        <div className="grid gap-14 sm:grid-cols-2 sm:items-center">
          <ScrollReveal>
            {/*
              TODO: replace with the real rendering from Henning Larsen
              Arkitekter once it's available. Do not ship a fake or
              stock-photo "rendering" in its place.
            */}
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-background/60 backdrop-blur-sm">
              {image ? (
                <Image
                  src={urlFor(image).width(1000).height(750).url()}
                  alt={title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-4 px-8 text-center">
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25"
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path
                        d="M4 20c3-9 6-13 8-13s5 4 8 13"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.3" fill="none" />
                    </svg>
                  </span>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted">
                    Visualisering fra Henning Larsen Arkitekter
                    <br />
                    indsættes her, når den er klar
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-text">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl italic text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg sm:leading-loose">
              {body}
            </p>

            <dl className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
              {PROJECT_FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#book"
                className="rounded-md bg-accent px-7 py-3 text-sm font-medium text-foreground transition hover:bg-accent/90"
              >
                Hør om projektet
              </a>
              <TalkCTA slug="heinesen-hulen" label="Book foredrag" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

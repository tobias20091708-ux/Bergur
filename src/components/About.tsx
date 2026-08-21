import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

const DEFAULT_EYEBROW = "Om Bergur";
const DEFAULT_TITLE = "Færøernes stemme i dansk kultur";
const DEFAULT_BODY =
  "Bergur Rønne Moberg er født på Færøerne i 1965 og har brugt det meste af et liv på at læse verden derfra — fra periferien, hvor han mener de bedste historier bliver fortalt. I dag er han lektor i nordisk litteratur ved Københavns Universitet med speciale i færøsk litteratur, men det er stadig øerne der driver værket: William Heinesens forfatterskab, Jørgen-Frantz Jacobsens efterladte roman, og den litteratur der findes i verdens mindste sprog.";
const DEFAULT_QUOTE =
  "Jeg er færing og øboer. Min forskning handler om de steder, hvor havet møder fortællingen — de sidste vilde steder i en verden der har kortlagt alt.";

const DEFAULT_FACTS = [
  "Ph.d. i Nordisk litteratur, Københavns Universitet (2004)",
  "Mag.art. i Nordisk litteratur, Københavns Universitet (1997)",
  "Visiting Scholar, Institute for World Literature, Harvard University (2013)",
  "Lektor i nordisk litteratur, Københavns Universitet",
  '"Ultraminor World Literatures" (2022, m. David Damrosch)',
  '"Resten i Vesten — Verdenslitteratur i modernismens margin" (2013)',
  'Redaktør, "Barbara i høj sø" (2025, Multivers)',
];

export function About({
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  quote = DEFAULT_QUOTE,
  facts = DEFAULT_FACTS,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  quote?: string;
  facts?: string[];
}) {
  return (
    <section id="om-bergur" className="bg-background px-6 py-32 sm:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border">
            <Image
              src="/bergur-sejlads.jpg"
              alt="Bergur Rønne Moberg til søs"
              fill
              sizes="(min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
        <div>
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-text">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl italic text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg sm:leading-loose">
              {body}
            </p>
            <p className="mt-6 text-balance border-l border-accent pl-5 font-serif text-lg italic leading-relaxed text-foreground">
              &ldquo;{quote}&rdquo;
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h3 className="mt-10 text-xs uppercase tracking-[0.25em] text-muted">
              Forskning, formidling og fortælling
            </h3>
            <ul className="mt-4 grid gap-x-8 gap-y-3 border-t border-border pt-5 text-sm text-muted sm:grid-cols-2">
              {facts.map((fact) => (
                <li key={fact} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-text"
                  />
                  {fact}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Læs mere om Bergurs forskning og publikationer på hans{" "}
              <a
                href="https://researchprofiles.ku.dk/da/persons/bergur-r%C3%B8nne-moberg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-text underline"
              >
                officielle forskerprofil på Københavns Universitet
              </a>
              , eller hør hans{" "}
              <a
                href="https://www.dansketaler.dk/taler/moberg-bergur-ronne"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-text underline"
              >
                taler på Danske Taler
              </a>
              .
            </p>
          </ScrollReveal>
        </div>
      </div>
      <ScrollReveal delay={0.15} className="mt-14 text-center">
        <a
          href="#book"
          className="inline-block rounded-md border border-border px-6 py-2.5 text-sm text-muted transition hover:border-accent hover:text-foreground"
        >
          Book foredrag →
        </a>
      </ScrollReveal>
    </section>
  );
}

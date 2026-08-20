import { ScrollReveal } from "./ScrollReveal";

const DEFAULT_EYEBROW = "Om Bergur";
const DEFAULT_TITLE = "Færøernes stemme i dansk kultur";
const DEFAULT_BODY =
  "Bergur Rønne Moberg er født på Færøerne i 1965 og har brugt det meste af et liv på at læse verden derfra — fra periferien, hvor han mener de bedste historier bliver fortalt. I dag er han lektor i nordisk litteratur ved Københavns Universitet, men det er stadig øerne der driver værket: William Heinesens forfatterskab, Jørgen-Frantz Jacobsens efterladte roman, og den litteratur der findes i verdens mindste sprog.";
const DEFAULT_QUOTE =
  "Jeg er færing og øboer. Min forskning handler om de steder, hvor havet møder fortællingen — de sidste vilde steder i en verden der har kortlagt alt.";

const DEFAULT_FACTS = [
  "Ph.d. i Nordisk litteratur, KU (2004)",
  "Mag.art. i Nordisk litteratur, KU (1997)",
  "Seniorstipendiat/forskningslektor, KU (2016–)",
  '"Ultraminor World Literatures" (2022)',
  '"Resten i Vesten" (m. David Damrosch)',
  'Redaktør, "Barbara i høj sø" (2025, Multivers)',
  "Ny bog 2026 via Ipi Press",
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
            <img
              src="/bergur-sejlads.jpg"
              alt="Bergur Rønne Moberg til søs"
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>
        <div>
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
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
            <ul className="mt-8 space-y-3 border-l border-border pl-6 text-sm text-muted">
              {facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
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

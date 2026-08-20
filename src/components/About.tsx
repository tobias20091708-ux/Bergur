import { ScrollReveal } from "./ScrollReveal";

const DEFAULT_EYEBROW = "Om Bergur";
const DEFAULT_TITLE = "Færøernes stemme i dansk kultur";
const DEFAULT_BODY =
  "Bergur Rønne Moberg (f. 1965, Færøerne) er lektor i nordisk litteratur ved Københavns Universitet og en af de førende forskere i færøsk og nordatlantisk litteratur — med et forfatterskab, der især har gjort sig bemærket gennem arbejdet om William Heinesen og Jørgen-Frantz Jacobsen.";

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
  facts = DEFAULT_FACTS,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  facts?: string[];
}) {
  return (
    <section id="om-bergur" className="bg-background px-6 py-24 sm:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-[1.2fr_1fr]">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl italic text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 leading-relaxed text-muted">{body}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ul className="space-y-3 border-l border-border pl-6 text-sm text-muted">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}

import { ScrollReveal } from "./ScrollReveal";

const badges = [
  "Lektor, Københavns Universitet",
  "15 mio. kr. — A.P. Møller Fonden (2023)",
  "Grundlovstale, 5. juni 2026",
];

export function Intro() {
  return (
    <section className="border-b border-border bg-background px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="text-balance font-serif text-2xl italic leading-relaxed text-foreground sm:text-3xl">
            &ldquo;Jeg er færing og øboer. Min forskning handler om de
            steder, hvor havet møder fortællingen — de sidste vilde steder i
            en verden der har kortlagt alt.&rdquo;
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-border bg-surface px-4 py-2 text-xs uppercase tracking-wide text-muted"
              >
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

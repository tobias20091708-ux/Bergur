import { ScrollReveal } from "./ScrollReveal";

const placeholderQuotes = [
  {
    quote: "[Indsæt citat fra arrangør her]",
    name: "[Navn]",
    org: "[Organisation]",
  },
  {
    quote: "[Indsæt citat fra arrangør her]",
    name: "[Navn]",
    org: "[Organisation]",
  },
];

export function SocialProof() {
  return (
    <section className="bg-surface px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            Udtalelser
          </p>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {placeholderQuotes.map((q, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <blockquote className="rounded-2xl border border-dashed border-border bg-surface-raised p-8 text-muted">
                <p className="font-serif italic text-foreground">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <footer className="mt-4 text-sm">
                  {q.name} · {q.org}
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-xs text-muted">
            Placeholder-felter — erstattes med rigtige citater og
            arrangør-logoer, når de er indsamlet.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

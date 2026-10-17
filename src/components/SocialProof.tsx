import type { Testimonial } from "@/sanity/queries";
import { ScrollReveal } from "./ScrollReveal";

// Placeholder quotes — clearly bracketed per editorial decision, swap in
// real quotes/names/orgs as they're collected. See CLAUDE.md.
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    _id: "default-1",
    quote:
      "[Bergur holdt vores efterårsforedrag og salen var fuld — fantastisk formidler.]",
    name: "[Navn]",
    role: "[Programansvarlig]",
    org: "[Bibliotek]",
  },
  {
    _id: "default-2",
    quote: "[Indsæt citat fra arrangør her]",
    name: "[Navn]",
    role: "[Titel]",
    org: "[Kulturhus]",
  },
  {
    _id: "default-3",
    quote: "[Indsæt citat fra arrangør her]",
    name: "[Navn]",
    role: "[Titel]",
    org: "[Aftenskole]",
  },
  {
    _id: "default-4",
    quote: "[Indsæt citat fra arrangør her]",
    name: "[Navn]",
    role: "[Titel]",
    org: "[Festival]",
  },
];

export function SocialProof({
  testimonials = DEFAULT_TESTIMONIALS,
}: {
  testimonials?: Testimonial[];
}) {
  return (
    <section className="bg-surface px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent-text">
            Udtalelser fra arrangører
          </p>
          <p className="mt-3 max-w-[68ch] font-serif text-xl italic leading-[1.7] text-foreground">
            [Indsæt antal, fx &ldquo;150+ foredrag afholdt siden 2005&rdquo;]
          </p>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {testimonials.map((q, i) => (
            <ScrollReveal key={q._id} delay={i * 0.1}>
              <blockquote className="h-full rounded-lg border border-border bg-surface-raised p-8 text-muted shadow-lg shadow-black/20">
                <p className="max-w-[68ch] font-serif text-base italic leading-[1.7] text-foreground sm:text-lg">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <footer className="mt-4 text-sm">
                  {q.name}
                  {q.role ? ` · ${q.role}` : ""}
                  {q.org ? ` · ${q.org}` : ""}
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.2}>
          <p className="mt-6 max-w-[68ch] text-xs leading-[1.7] text-muted">
            Placeholder-felter — erstattes med rigtige citater, tal og
            arrangør-logoer fra genkendelige biblioteker, aftenskoler og
            festivaler, når de er indsamlet.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25} className="mt-10 text-center">
          <a
            href="#book"
            className="inline-block rounded-md border border-border px-6 py-2.5 text-sm text-muted transition hover:border-accent hover:text-foreground"
          >
            Book foredrag →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

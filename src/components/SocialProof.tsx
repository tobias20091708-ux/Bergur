import type { Testimonial } from "@/sanity/queries";
import { ScrollReveal } from "./ScrollReveal";

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    _id: "default-1",
    quote: "[Indsæt citat fra arrangør her]",
    name: "[Navn, titel]",
    org: "[Fx bibliotek, aftenskole eller festival]",
  },
  {
    _id: "default-2",
    quote: "[Indsæt citat fra arrangør her]",
    name: "[Navn, titel]",
    org: "[Fx bibliotek, aftenskole eller festival]",
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
            Udtalelser
          </p>
          <p className="mt-3 font-serif text-xl italic text-foreground">
            [Indsæt antal, fx &ldquo;150+ foredrag afholdt siden 2005&rdquo;]
          </p>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {testimonials.map((q, i) => (
            <ScrollReveal key={q._id} delay={i * 0.1}>
              <blockquote className="rounded-lg border border-border bg-surface-raised p-8 text-muted shadow-lg shadow-black/20">
                <p
                  aria-hidden="true"
                  className="tracking-widest text-accent-text"
                >
                  ★★★★★
                </p>
                <p className="mt-3 font-serif text-base italic leading-relaxed text-foreground sm:text-lg">
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

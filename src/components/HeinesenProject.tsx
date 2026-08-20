import { ScrollReveal } from "./ScrollReveal";

export function HeinesenProject() {
  return (
    <section
      id="heinesen-hulen"
      className="border-b border-t border-border bg-background px-6 py-24 sm:px-12"
    >
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 sm:items-center">
        <ScrollReveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-raised via-accent-soft to-background">
            <div className="absolute inset-0 flex items-center justify-center text-center text-xs uppercase tracking-widest text-muted">
              Visualisering fra Henning Larsen Arkitekter
              <br />
              indsættes her
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            Heinesen-hulen
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl italic text-foreground sm:text-4xl">
            En hule, seks niveauer ned i den færøske undergrund
          </h2>
          <p className="mt-6 leading-relaxed text-muted">
            Henning Larsen Arkitekter har tegnet en fysisk version af Platons
            hulelignelse under Færøernes jord — og Bergur er manden bag. Et
            spektakulært kultur-arkitekturprojekt, der bruger William
            Heinesens forfatterskab som storytelling-motor.
          </p>
          <a
            href="#book"
            className="mt-6 inline-block text-sm font-medium text-accent transition hover:text-foreground"
          >
            Hør mere om projektet →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

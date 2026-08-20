import { ScrollReveal } from "./ScrollReveal";

const foredrag = [
  {
    hook: "Kolde øer blev cool",
    title: "— hvad skete der med Færøerne?",
    teaser:
      "Turisme, gastronomi og kultur: et indblik i den moderne færøske identitet, og hvordan et af Nordens mindste samfund blev en global trend.",
  },
  {
    hook: "To kulturikoner, to øer",
    title: "— hvad binder dem sammen?",
    teaser:
      "H.C. Andersen og William Heinesen sammenlignet: to forfatterskaber, to øsamfund, og et fælles blik på det store i det små.",
  },
  {
    hook: "Verdens mest oversete forfatter",
    title: "— og hulen der skal bringe ham til live",
    teaser:
      "William Heinesens forfatterskab og Færøerne, fortalt gennem Heinesen-huleprojektet — et kultur-arkitekturprojekt i samarbejde med Henning Larsen Arkitekter.",
  },
];

export function Foredrag() {
  return (
    <section
      id="foredrag"
      className="bg-surface px-6 py-24 sm:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-serif text-3xl italic text-foreground sm:text-4xl">
            Foredrag
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {foredrag.map((f, i) => (
            <ScrollReveal key={f.hook} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface-raised p-8">
                <h3 className="font-serif text-xl italic text-foreground">
                  {f.hook}
                </h3>
                <p className="mt-1 text-sm text-accent">{f.title}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {f.teaser}
                </p>
                <a
                  href="#book"
                  className="mt-6 inline-block text-sm font-medium text-accent transition hover:text-foreground"
                >
                  Forespørg på dette foredrag →
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

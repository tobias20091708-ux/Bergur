import type { Foredrag as ForedragEntry } from "@/sanity/queries";
import { ScrollReveal } from "./ScrollReveal";

const DEFAULT_FOREDRAG: ForedragEntry[] = [
  {
    _id: "default-1",
    hook: "Kolde øer blev cool",
    title: "— hvad skete der med Færøerne?",
    teaser:
      "Turisme, gastronomi og kultur: et indblik i den moderne færøske identitet, og hvordan et af Nordens mindste samfund blev en global trend.",
  },
  {
    _id: "default-2",
    hook: "To kulturikoner, to øer",
    title: "— hvad binder dem sammen?",
    teaser:
      "H.C. Andersen og William Heinesen sammenlignet: to forfatterskaber, to øsamfund, og et fælles blik på det store i det små.",
  },
  {
    _id: "default-3",
    hook: "Verdens mest oversete forfatter",
    title: "— og hulen der skal bringe ham til live",
    teaser:
      "William Heinesens forfatterskab og Færøerne, fortalt gennem Heinesen-huleprojektet — et kultur-arkitekturprojekt i samarbejde med Henning Larsen Arkitekter.",
  },
];

const BENEFITS = [
  {
    icon: "🏔️",
    text: "Indblik i Færøernes forvandling fra isoleret ø-samfund til global kulturtrend",
  },
  {
    icon: "📖",
    text: "Fortællinger om nordisk litteraturs mest oversete mesterværker",
  },
  {
    icon: "🎤",
    text: "En engageret formidler der blander personlige historier med akademisk dybde",
  },
];

const PRACTICAL_INFO =
  "Varighed: 45–90 min. Velegnet til biblioteker, kulturhuse, festivaler, virksomheder og uddannelsesinstitutioner.";

export function Foredrag({
  entries = DEFAULT_FOREDRAG,
}: {
  entries?: ForedragEntry[];
}) {
  return (
    <section id="foredrag" className="bg-surface px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-serif text-3xl italic text-foreground sm:text-4xl">
            Foredrag
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="mt-10 text-sm uppercase tracking-[0.3em] text-accent">
            Et foredrag med Bergur giver jeres publikum:
          </p>
        </ScrollReveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <ScrollReveal key={b.text} delay={0.05 + i * 0.05}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-surface-raised p-5">
                <span className="text-xl" aria-hidden="true">
                  {b.icon}
                </span>
                <p className="text-sm leading-relaxed text-muted">{b.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {entries.map((f, i) => (
            <ScrollReveal key={f._id} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface-raised p-8">
                <h3 className="font-serif text-xl italic text-foreground">
                  {f.hook}
                </h3>
                {f.title ? (
                  <p className="mt-1 text-sm text-accent">{f.title}</p>
                ) : null}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {f.teaser}
                </p>

                <details className="group mt-4">
                  <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-accent transition hover:text-foreground [&::-webkit-details-marker]:hidden">
                    Læs mere
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-open:rotate-180"
                    >
                      ↓
                    </span>
                  </summary>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-3 text-sm leading-relaxed text-muted">
                        {f.teaser} {PRACTICAL_INFO}
                      </p>
                    </div>
                  </div>
                </details>

                <a
                  href="#book"
                  className="mt-6 inline-block text-sm font-medium text-accent transition hover:text-foreground"
                >
                  Book dette foredrag →
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

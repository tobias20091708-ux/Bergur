import { ScrollReveal } from "./ScrollReveal";

const BENEFITS = [
  {
    number: "01",
    text: "Et indblik i, hvordan Færøerne gik fra et lukket ø-samfund til noget de fleste danskere efterhånden har en mening om",
  },
  {
    number: "02",
    text: "Historier om nogle af de bøger i nordisk litteratur, som færrest har læst",
  },
  {
    number: "03",
    text: "En foredragsholder der blander egne oplevelser med den viden, han har brugt et helt liv på at samle",
  },
];

const PRACTICAL_INFO =
  "Varighed: 45–90 min · Velegnet til biblioteker, kulturhuse, festivaler og uddannelsesinstitutioner.";

type Talk = {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  media:
    | { type: "image"; src: string; position: string }
    | { type: "video"; src: string; poster: string; position: string };
};

const TALKS: Talk[] = [
  {
    eyebrow: "Foredrag 01",
    title: "Kolde øer blev cool",
    subtitle: "Hvad skete der med Færøerne?",
    paragraphs: [
      "Turisme, gastronomi og kultur — et indblik i den moderne færøske identitet. Hvordan blev et af Nordens mindste og mest isolerede samfund til en global kulturtrend?",
      "Foredraget tager publikum med fra de traditionsrige grindedrab og uldne sweatere til KOKS-restauranten, G!-festivalen og den nye bølge af færøsk film og musik. Ikke som en turistbrochure, men som en fortælling om hvad der sker, når en lille kultur pludselig bliver set.",
    ],
    media: {
      type: "video",
      src: "/foredrag/faar-graesning.mp4",
      poster: "/foredrag/kolde-oer-blev-cool.jpg",
      position: "center 55%",
    },
  },
  {
    eyebrow: "Foredrag 02",
    title: "To kulturikoner, to øer",
    subtitle: "H.C. Andersen og William Heinesen — hvad binder dem sammen?",
    paragraphs: [
      "Hvad har Danmarks mest kendte forfatter og Færøernes mest oversete til fælles? Mere end man tror. Begge skrev fra periferien ind mod centret. Begge brugte eventyret som form.",
      "Og begge blev verdensberømte — den ene i sin levetid, den anden aldrig helt. Foredraget er en sammenligning af to forfatterskaber, to øsamfund og et fælles blik på det store i det små.",
    ],
    media: {
      type: "image",
      src: "/foredrag/to-kulturikoner.jpg",
      position: "center 45%",
    },
  },
  {
    eyebrow: "Foredrag 03",
    title: "Verdens mest oversete forfatter",
    subtitle: "William Heinesen og hulen der skal bringe ham til live",
    paragraphs: [
      "William Heinesen er Færøernes største forfatter — og en af Nordens mest oversete. Han skrev på dansk, boede hele sit liv i Tórshavn og skabte et forfatterskab der spænder fra kosmisk humor til eksistentiel alvor.",
      "Foredraget fortæller historien om Heinesens værk og forbinder det med Heinesen-huleprojektet — et samarbejde med Henning Larsen Arkitekter om at skabe en fysisk hule i seks niveauer under den færøske jord, inspireret af Platons hulelignelse.",
    ],
    media: {
      type: "video",
      src: "/foredrag/torshavn.mp4",
      poster: "/foredrag/torshavn-poster.jpg",
      position: "center 55%",
    },
  },
];

function TalkSection({ talk }: { talk: Talk }) {
  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <div className="relative h-[40vh] w-full sm:h-auto sm:w-1/2 sm:min-h-screen">
        {talk.media.type === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={talk.media.poster}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: talk.media.position }}
          >
            <source src={talk.media.src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={talk.media.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: talk.media.position }}
          />
        )}
      </div>
      <div className="flex w-full items-center bg-surface sm:w-1/2">
        <ScrollReveal className="px-6 py-16 sm:px-20 sm:py-24">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            {talk.eyebrow}
          </p>
          <h3 className="mt-6 text-balance font-serif text-3xl italic text-foreground sm:text-5xl">
            {talk.title}
          </h3>
          <p className="mt-4 font-serif text-lg italic text-muted">
            {talk.subtitle}
          </p>
          <div className="mt-6 max-w-lg space-y-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-loose">
            {talk.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted">{PRACTICAL_INFO}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#book"
              className="rounded-md bg-accent px-7 py-3 text-sm font-medium text-background transition hover:bg-accent/90"
            >
              Book dette foredrag →
            </a>
            <a
              href="#"
              className="rounded-md border border-border px-7 py-3 text-sm text-muted transition hover:border-accent hover:text-foreground"
            >
              Download foredragsbeskrivelse (PDF) →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export function Foredrag() {
  return (
    <section id="foredrag" className="bg-background">
      <div className="px-6 py-32 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Foredrag
            </p>
            <h2 className="mt-4 text-balance font-serif text-3xl italic text-foreground sm:text-4xl">
              Et foredrag med Bergur giver jeres publikum
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <ScrollReveal key={b.number} delay={i * 0.1}>
                <div className="h-full border border-white/[0.12] p-8">
                  <span className="font-serif text-2xl italic text-accent">
                    {b.number}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {b.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <div>
        {TALKS.map((talk) => (
          <TalkSection key={talk.title} talk={talk} />
        ))}
      </div>

      <div className="border-t border-border px-6 py-12 text-center sm:px-12">
        <a
          href="https://www.foredragslisten.dk/profiler/bergur-roenne-moberg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted transition hover:text-accent"
        >
          Se Bergurs profil på Foredragslisten →
        </a>
      </div>
    </section>
  );
}

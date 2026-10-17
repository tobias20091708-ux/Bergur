import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { TalkCTA } from "./TalkCTA";

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

type Talk = {
  slug: string;
  title: string;
  subtitle: string;
  teaser: string;
  audienceTags: string[];
  audience: string;
  paragraphs: string[];
  media?: { src: string; alt: string };
  featured?: boolean;
};

const TALKS: Talk[] = [
  {
    slug: "det-kulturelle-rigsfaellesskab",
    title: "Det kulturelle rigsfællesskab",
    subtitle: "Et nyt Færøerne er dukket op af havet",
    teaser:
      "Om en kultur, hvor økonomien boomer, befolkningstallet stiger og kunsten blomstrer — og om hvad det gør ved Færøernes forhold til Danmark.",
    audienceTags: ["Biblioteker", "Kulturhuse", "Aftenskoler", "Virksomheder"],
    audience:
      "Biblioteker, kulturhuse, aftenskoler, virksomheder og organisationer med interesse i nordatlantisk kultur, rigsfællesskabet og moderne færøsk identitet.",
    paragraphs: [
      "Et nyt Færøerne er dukket op af havet i de senere årtier. Foredraget handler om de indre og ydre sammenhænge i alle de nye som ældre stærke præstationer inden for kunst, kultur, turisme og sport. Om en kultur, hvor økonomien boomer, befolkningstallet stiger og kulturlivet blomstrer. Om hvilken selvopfattelse der styrer Færøerne i en verden under omkalfatring og med et globalt fokus på Nordatlanten.",
      "Om hvordan kunsten og kulturen reagerer på, at turister strømmer til Nordatlanten for at opleve stærk natur, unik gastronomi, musik, kunst, design og arkitektur. Om de allestedsnærværende talentfulde koblinger mellem gammelt og nyt, lokalt og globalt. Om en kultur, hvor tradition og natur stadig væk er en del af livet og eksistensen.",
      "Om selvstændighedsprocesserne. Om et Færøerne, der er stærkere end nogensinde i forhold til Danmark, og som er i fuldt gang med at udvikle sin helt egen form for suverænitet inden for det danske rige.",
    ],
    featured: true,
  },
  {
    slug: "kolde-oer-blev-cool",
    title: "Kolde øer blev cool",
    subtitle: "Hvad skete der med Færøerne?",
    teaser:
      "Fra grindedrab og uldne sweatere til KOKS, G!-festivalen og den nye bølge af færøsk film og musik — hvordan blev en lille, isoleret kultur en global trend?",
    audienceTags: ["Biblioteker", "Aftenskoler", "Virksomheder"],
    audience:
      "Biblioteker, aftenskoler og virksomheder med interesse i turisme, kultur og branding.",
    paragraphs: [
      "Turisme, gastronomi og kultur — et indblik i den moderne færøske identitet. Hvordan blev et af Nordens mindste og mest isolerede samfund til en global kulturtrend?",
      "Foredraget tager publikum med fra de traditionsrige grindedrab og uldne sweatere til KOKS-restauranten, G!-festivalen og den nye bølge af færøsk film og musik. Ikke som en turistbrochure, men som en fortælling om hvad der sker, når en lille kultur pludselig bliver set.",
    ],
    media: {
      src: "/foredrag/kolde-oer-blev-cool.jpg",
      alt: "Sortmalede, græstørvsdækkede huse foran et stejlt færøsk fjeld",
    },
  },
  {
    slug: "to-kulturikoner",
    title: "To kulturikoner, to øer",
    subtitle: "H.C. Andersen og William Heinesen — hvad binder dem sammen?",
    teaser:
      "Danmarks mest kendte forfatter og Færøernes mest oversete har mere til fælles, end man tror — begge skrev fra periferien ind mod centret.",
    audienceTags: ["Uddannelse", "Litteraturforeninger"],
    audience:
      "Uddannelsesinstitutioner og litteraturforeninger med fokus på nordisk litteraturhistorie.",
    paragraphs: [
      "Hvad har Danmarks mest kendte forfatter og Færøernes mest oversete til fælles? Mere end man tror. Begge skrev fra periferien ind mod centret. Begge brugte eventyret som form.",
      "Og begge blev verdensberømte — den ene i sin levetid, den anden aldrig helt. Foredraget er en sammenligning af to forfatterskaber, to øsamfund og et fælles blik på det store i det små.",
    ],
    media: {
      src: "/foredrag/to-kulturikoner.jpg",
      alt: "Lodrette klippeskrænter ved havet på Færøerne set i overskyet vejr",
    },
  },
  {
    slug: "verdens-mest-oversete-forfatter",
    title: "Verdens mest oversete forfatter",
    subtitle: "William Heinesen og hulen der skal bringe ham til live",
    teaser:
      "William Heinesen er Færøernes største forfatter og en af Nordens mest oversete — foredraget fortæller hans historie og Heinesen-huleprojektets.",
    audienceTags: ["Kulturhuse", "Festivaler"],
    audience:
      "Kulturhuse og festivaler med interesse i Heinesen-huleprojektet og færøsk kulturhistorie.",
    paragraphs: [
      "William Heinesen er Færøernes største forfatter — og en af Nordens mest oversete. Han skrev på dansk, boede hele sit liv i Tórshavn og skabte et forfatterskab der spænder fra kosmisk humor til eksistentiel alvor.",
      "Foredraget fortæller historien om Heinesens værk og forbinder det med Heinesen-huleprojektet — et samarbejde med Henning Larsen Arkitekter om at skabe en fysisk hule i seks niveauer under den færøske jord, inspireret af Platons hulelignelse.",
    ],
    media: {
      src: "/foredrag/torshavn-poster.jpg",
      alt: "Tinganes i Tórshavn — røde træhuse med græstørvstag ved havnen",
    },
  },
];

const ALL_TOPICS = [
  "Danmark-Færøerne og det kulturelle Rigsfællesskab",
  "Hvad bølgerne fortæller os? Nordisk litteratur og blå dannelse",
  "Det nye Færøerne: moderne kulturs gennembrud i det færøske — litteratur, billedkunst, gastronomi, turisme",
  "Den vise mand fra havet. William Heinesen som moderne skjald og billedkunstner",
  "Dansksproget færøsk litteratur som verdenslitteratur: William Heinesen og Jørgen-Frantz Jacobsen",
  "William Heinesen og H.C. Andersen som nationalikoner og spillemænd",
  "William Heinesen og Henrik Pontoppidan",
];

function TalkCard({ talk }: { talk: Talk }) {
  return (
    <div
      className={
        talk.featured
          ? "flex flex-col overflow-hidden rounded-lg border border-accent bg-surface-raised sm:flex-row"
          : "flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.12] bg-surface-raised"
      }
    >
      {talk.media && (
        <div
          className={
            talk.featured
              ? "relative h-48 w-full shrink-0 sm:h-auto sm:w-2/5"
              : "relative h-40 w-full shrink-0"
          }
        >
          <Image
            src={talk.media.src}
            alt={talk.media.alt}
            fill
            sizes={talk.featured ? "(min-width: 640px) 40vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {talk.featured && (
          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-accent bg-accent-soft px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent-text">
            Nyt
          </span>
        )}
        <h3 className="text-balance font-serif text-xl italic text-foreground sm:text-2xl">
          {talk.title}
        </h3>
        <p className="mt-2 font-serif text-sm italic text-muted">
          {talk.subtitle}
        </p>
        <p className="mt-3 max-w-[68ch] text-sm leading-[1.7] text-muted">
          {talk.teaser}
        </p>

        <details className="mt-3 text-sm text-muted">
          <summary className="cursor-pointer text-accent-text transition hover:text-foreground">
            Læs mere
          </summary>
          <div className="mt-3 max-w-[68ch] space-y-3 leading-[1.7]">
            <p>Målgruppe: {talk.audience}</p>
            {talk.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              45–90 min.
            </span>
            {talk.audienceTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <TalkCTA
              slug={talk.slug}
              label="Forespørg"
              className="inline-block rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent/90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Foredrag() {
  const featured = TALKS.find((t) => t.featured);
  const rest = TALKS.filter((t) => !t.featured);

  return (
    <section id="foredrag" className="bg-background px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent-text">
            Foredrag
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl italic text-foreground sm:text-4xl">
            Foredrag, der bliver hængende
          </h2>
          <p className="mt-4 max-w-[68ch] text-base leading-[1.7] text-muted sm:text-lg">
            Bergur kombinerer forskning, personlige erfaringer og levende
            fortælling i foredrag for publikum, der vil mere end bare
            lytte. Et foredrag med Bergur giver jeres publikum:
          </p>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <ScrollReveal key={b.number} delay={i * 0.1}>
              <div className="h-full border border-white/[0.12] p-8">
                <span className="font-serif text-2xl italic text-accent-text">
                  {b.number}
                </span>
                <p className="mt-4 text-sm leading-[1.7] text-muted">
                  {b.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1} className="mt-16">
          <p className="text-sm text-muted">
            Fra <span className="text-foreground">[X.000] kr.</span> ekskl.
            moms og transport — pris afhænger af format og lokation.
          </p>

          {featured && (
            <div className="mt-6">
              <TalkCard talk={featured} />
            </div>
          )}

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {rest.map((talk) => (
              <TalkCard key={talk.slug} talk={talk} />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-16 border-t border-border pt-12">
          <h3 className="font-serif text-xl italic text-foreground">
            Alle foredragsemner
          </h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {ALL_TOPICS.map((topic) => (
              <li key={topic} className="flex gap-3 text-sm text-muted">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-text"
                />
                {topic}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[68ch] text-sm leading-[1.7] text-muted">
            Har I et bestemt emne i tankerne?{" "}
            <a href="#book" className="text-accent-text underline">
              Skriv det i forespørgslen nedenfor.
            </a>
          </p>
        </ScrollReveal>
      </div>

      <div className="mt-16 border-t border-border pt-12 text-center">
        <a
          href="https://www.foredragslisten.dk/profiler/bergur-roenne-moberg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted transition hover:text-accent-text"
        >
          Se Bergurs profil på Foredragslisten →
        </a>
      </div>
    </section>
  );
}

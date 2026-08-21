import Image from "next/image";
import { HeroPortrait } from "./HeroPortrait";

const DEFAULT_NAME = "Bergur Rønne Moberg";
const DEFAULT_TAGLINE = "De vilde steder\nog den store poesi";
const EYEBROW = "Lektor · Københavns Universitet · Foredragsholder";
const SHORT_COPY =
  "Foredrag om Færøerne, nordisk litteratur og de fortællinger, der vokser frem, når verden bliver set fra kanten.";

const DEFAULT_FACTS = [
  "Lektor, Københavns Universitet",
  "15 mio. kr. — A.P. Møller Fonden",
  "Grundlovstale 2026",
  "Samarbejde med Henning Larsen Arkitekter",
];

export function Hero({
  name = DEFAULT_NAME,
  tagline = DEFAULT_TAGLINE,
  facts = DEFAULT_FACTS,
}: {
  name?: string;
  tagline?: string;
  facts?: string[];
}) {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/hav-baggrund.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="ken-burns object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(6,13,22,0.6)]" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-[1] w-8 opacity-15 sm:w-10"
        style={{ background: "var(--faroe-gradient)" }}
      />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-28 text-center text-white">
        <HeroPortrait alt={name} />

        <p className="text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm">
          {EYEBROW}
        </p>

        <h1 className="max-w-2xl whitespace-pre-line font-serif text-4xl italic leading-[1.15] sm:text-6xl">
          {tagline}
        </h1>

        <p className="max-w-xl text-balance text-base text-white/85 sm:text-lg">
          {SHORT_COPY}
        </p>

        <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-white/70 sm:text-sm">
          {facts.map((fact, i) => (
            <li key={fact} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-white/30">
                  ·
                </span>
              )}
              {fact}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#foredrag"
            className="rounded-md bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Se foredrag
          </a>
          <a
            href="#book"
            className="rounded-md border border-white/50 px-7 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
          >
            Book foredrag
          </a>
        </div>

        <a
          href="#foredrag"
          aria-label="Scroll ned"
          className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 transition hover:text-white"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M12 4v14m0 0l-6-6m6 6l6-6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

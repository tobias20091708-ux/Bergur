import Image from "next/image";

const DEFAULT_TAGLINE = "De vilde steder\nog den store poesi";
const EYEBROW = "Lektor · Københavns Universitet · Foredragsholder";
const SUBHEAD =
  "Han holder foredrag om Færøerne og nordisk litteratur — og har skrevet flere bøger om emnet.";
const BODY_COPY =
  "Booket af biblioteker, kulturhuse, aftenskoler og virksomheder i hele Norden — fra foredrag om Heinesen-hulen til udgivne værker om færøsk litteraturhistorie.";

const DEFAULT_FACTS = [
  "Lektor, Københavns Universitet",
  "15 mio. kr. — A.P. Møller Fonden",
  "Grundlovstale 2026",
  "Samarbejde med Henning Larsen Arkitekter",
];

export function Hero({
  tagline = DEFAULT_TAGLINE,
  facts = DEFAULT_FACTS,
}: {
  tagline?: string;
  facts?: string[];
}) {
  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden">
      <Image
        src="/hav-baggrund.jpg"
        alt="Et sejlskib med fyldte sejl på åbent hav i tusmørke"
        fill
        priority
        sizes="100vw"
        className="ken-burns object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(6,13,22,0.62)]" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-[1] w-8 opacity-15 sm:w-10"
        style={{ background: "var(--faroe-gradient)" }}
      />

      <div className="absolute inset-0 z-10 flex items-center px-6 py-24 text-white sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex max-w-xl flex-col items-start gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">
              {EYEBROW}
            </p>

            <h1 className="whitespace-pre-line font-serif text-4xl italic leading-[1.12] sm:text-6xl">
              {tagline}
            </h1>

            <p className="text-balance text-lg font-bold leading-snug sm:text-xl">
              {SUBHEAD}
            </p>

            <p className="max-w-lg text-balance text-sm leading-[1.7] text-white/80 sm:text-base">
              {BODY_COPY}
            </p>

            <ul className="mt-1 flex flex-wrap items-center gap-2.5 text-xs text-white/85 sm:text-sm">
              {facts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5"
                >
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap items-center gap-4">
              <a
                href="#book"
                className="rounded-md bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Book foredrag
              </a>
              <a
                href="#foredrag"
                className="rounded-md border border-white/50 px-7 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
              >
                Se foredrag
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#foredrag"
        aria-label="Scroll ned"
        className="scroll-cue absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-white/60 transition hover:text-white"
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
    </section>
  );
}

const DEFAULT_NAME = "Bergur Rønne Moberg";
const DEFAULT_TAGLINE = "De vilde steder\nog den store poesi";
const HERO_SUBTITLE =
  "Foredrag om Færøerne, nordisk litteratur og William Heinesen";

export function Hero({
  name = DEFAULT_NAME,
  tagline = DEFAULT_TAGLINE,
}: {
  name?: string;
  tagline?: string;
}) {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[rgba(6,13,22,0.55)]" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-[1] w-8 opacity-15 sm:w-10"
        style={{ background: "var(--faroe-gradient)" }}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center text-white">
        <img
          src="/bergur-sejlads.jpg"
          alt={name}
          className="h-56 w-44 rounded-lg border border-white/20 object-cover shadow-2xl shadow-black/50 sm:h-64 sm:w-52"
          style={{ objectPosition: "60% 25%" }}
        />
        <p className="text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm">
          {HERO_SUBTITLE}
        </p>
        <h1 className="max-w-2xl whitespace-pre-line font-serif text-4xl italic leading-[1.15] sm:text-6xl">
          {tagline}
        </h1>
        <p className="text-lg text-white/80 sm:text-xl">{name}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
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
    </section>
  );
}

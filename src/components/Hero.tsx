const DEFAULT_NAME = "Bergur Rønne Moberg";
const DEFAULT_TAGLINE = "De vilde steder og den store poesi";
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
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center text-white">
        <img
          src="/bergur-portrait.png"
          alt={name}
          className="h-[200px] w-[200px] max-w-[200px] rounded-full object-cover grayscale"
        />
        <p className="text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm">
          {HERO_SUBTITLE}
        </p>
        <h1 className="max-w-2xl text-balance font-serif text-4xl italic sm:text-6xl">
          {tagline}
        </h1>
        <p className="text-lg text-white/80 sm:text-xl">{name}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#book"
            className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Book foredrag
          </a>
          <a
            href="#foredrag"
            className="rounded-full border border-white/50 px-7 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
          >
            Se foredrag
          </a>
        </div>
      </div>
    </section>
  );
}

const DEFAULT_NAME = "Bergur Rønne Moberg";
const DEFAULT_TAGLINE = "De vilde steder og den store poesi";

export function Hero({
  name = DEFAULT_NAME,
  tagline = DEFAULT_TAGLINE,
}: {
  name?: string;
  tagline?: string;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
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
          src="/bergur-portrait.jpg"
          alt={name}
          className="h-[200px] w-[200px] max-w-[200px] rounded-full object-cover grayscale"
        />
        <h1 className="font-serif text-4xl italic sm:text-6xl">{name}</h1>
        <p className="max-w-xl text-lg sm:text-xl">{tagline}</p>
        <a
          href="#book"
          className="mt-4 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Book foredrag
        </a>
      </div>
    </section>
  );
}

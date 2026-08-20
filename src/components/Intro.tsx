const DEFAULT_BADGES = [
  "Lektor, Københavns Universitet",
  "15 mio. kr. — A.P. Møller Fonden (2023)",
  "Grundlovstale, 5. juni 2026",
  "Samarbejde med Henning Larsen Arkitekter",
];

const KEYWORDS = [
  "Færøerne",
  "William Heinesen",
  "Nordisk litteratur",
  "Foredrag",
  "Heinesen-hulen",
  "Kulturikoner",
  "Nordatlantisk",
  "H.C. Andersen",
];

export function Intro({
  badges = DEFAULT_BADGES,
}: {
  badges?: string[];
}) {
  return (
    <>
      {/* Trust bar */}
      <section className="border-b border-border bg-surface px-6 py-6 sm:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-xs uppercase tracking-wide text-muted sm:text-sm">
            {badges.map((badge, i) => (
              <span key={badge} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-accent">
                    ·
                  </span>
                )}
                {badge}
              </span>
            ))}
          </div>
          <a
            href="#book"
            className="rounded-md border border-border px-5 py-2 text-xs text-muted transition hover:border-accent hover:text-foreground"
          >
            Book foredrag →
          </a>
        </div>
      </section>

      {/* Keyword marquee */}
      <div className="overflow-hidden border-b border-border bg-background py-3">
        <div className="marquee flex w-max shrink-0 gap-3 whitespace-nowrap text-xs uppercase tracking-[0.3em] text-muted/50 sm:text-sm">
          {[...KEYWORDS, ...KEYWORDS].map((keyword, i) => (
            <span key={i} className="flex items-center gap-3">
              {keyword}
              <span aria-hidden="true">·</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

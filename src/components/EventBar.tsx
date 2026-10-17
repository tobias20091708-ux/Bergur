import Image from "next/image";

const UPCOMING = [
  { month: "Oktober", detail: "Folkeuniversitetet, København" },
  { month: "November", detail: "[Indsæt arrangør]" },
  { month: "December", detail: "[Indsæt arrangør]" },
];

export function EventBar() {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <Image
        src="/hav-baggrund.jpg"
        alt="Et sejlskib med fyldte sejl på åbent hav i tusmørke"
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-background/90" />
      <div className="relative mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-3 text-center text-xs text-muted sm:text-sm">
        <span className="text-foreground">Foredrag:</span>
        {UPCOMING.map((event, i) => (
          <span key={event.month} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden="true" className="text-white/30">·</span>}
            {event.month}: {event.detail}
          </span>
        ))}
        <a
          href="https://www.folkeuniversitetet.dk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-text transition hover:text-foreground"
        >
          Læs mere om Folkeuniversitetet →
        </a>
      </div>
    </div>
  );
}

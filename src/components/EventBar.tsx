import { Countdown } from "./Countdown";

export function EventBar() {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <img
        src="/hav-baggrund.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-background/90" />
      <div className="relative mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-3 text-center text-xs text-muted sm:text-sm">
        <span>
          Næste foredrag: <span className="text-foreground">3. oktober 2026</span>{" "}
          — Folkeuniversitetet, København
        </span>
        <span className="text-accent">
          (<Countdown />)
        </span>
        <a
          href="https://www.folkeuniversitetet.dk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent transition hover:text-foreground"
        >
          Læs mere →
        </a>
      </div>
    </div>
  );
}

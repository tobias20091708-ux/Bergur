const LINKS = [
  { href: "#om-bergur", label: "Om Bergur" },
  { href: "#foredrag", label: "Foredrag" },
  { href: "#heinesen-hulen", label: "Heinesen-hulen" },
  { href: "#boeger", label: "Bøger" },
];

export function SubNav() {
  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-3 text-xs uppercase tracking-[0.2em] text-muted sm:text-sm">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

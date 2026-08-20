const DEFAULT_EMAIL = "kontakt@bergurmoberg.dk";

const links = [
  { href: "#om-bergur", label: "Om Bergur" },
  { href: "#foredrag", label: "Foredrag" },
  { href: "#heinesen-hulen", label: "Heinesen-hulen" },
  { href: "#book", label: "Kontakt" },
];

export function Footer({ email = DEFAULT_EMAIL }: { email?: string }) {
  return (
    <footer className="bg-background px-6 py-10 text-sm text-muted sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wide">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-start justify-between gap-2 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Bergur Rønne Moberg</p>
          <p>
            {email} · Københavns Universitet
          </p>
        </div>
      </div>
    </footer>
  );
}

const links = [
  { href: "#om-bergur", label: "Om Bergur" },
  { href: "#foredrag", label: "Foredrag" },
  { href: "#heinesen-hulen", label: "Heinesen-hulen" },
  { href: "#book", label: "Book foredrag" },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-12">
      <a href="#" className="font-serif text-lg italic text-foreground">
        Bergur Rønne Moberg
      </a>
      <nav className="hidden gap-8 text-sm text-muted sm:flex">
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
      <a
        href="#book"
        className="rounded-md border border-border px-4 py-2 text-sm text-foreground transition hover:border-accent hover:text-accent sm:hidden"
      >
        Book
      </a>
    </header>
  );
}

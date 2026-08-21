"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

const LINKS = [
  { href: "#om-bergur", label: "Om Bergur", id: "om-bergur" },
  { href: "#foredrag", label: "Foredrag", id: "foredrag" },
  { href: "#heinesen-hulen", label: "Heinesen-hulen", id: "heinesen-hulen" },
  { href: "#boeger", label: "Bøger", id: "boeger" },
  { href: "#book", label: "Kontakt", id: "book" },
];

function useScrolled(threshold = 40) {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("scroll", callback, { passive: true });
    const id = setTimeout(callback, 0);
    return () => {
      window.removeEventListener("scroll", callback);
      clearTimeout(id);
    };
  }, []);
  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function useActiveSection(ids: string[]) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              activeSection = entry.target.id;
            }
          }
          callback();
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
      return () => observer.disconnect();
    },
    [ids]
  );
  const getSnapshot = useCallback(() => activeSection, []);
  const getServerSnapshot = useCallback(() => null, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Module-level so the IntersectionObserver callback (outside React) has
// somewhere to write the current value between renders.
let activeSection: string | null = null;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(LINKS.map((l) => l.id));

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border bg-background/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-12">
        <a href="#hero" className="font-serif text-lg italic text-foreground">
          Bergur Rønne Moberg
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.id ? "true" : undefined}
              className={`transition hover:text-accent-text ${
                active === link.id ? "text-foreground" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            className="rounded-md bg-accent px-5 py-2 text-sm font-medium text-foreground transition hover:bg-accent/90"
          >
            Book foredrag
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Luk menu" : "Åbn menu"}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground sm:hidden"
        >
          <span className="sr-only">{menuOpen ? "Luk menu" : "Åbn menu"}</span>
          {menuOpen ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M5 5l14 14M19 5L5 19"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-background px-6 py-4 sm:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-md px-3 py-3 text-sm transition hover:bg-surface-raised hover:text-foreground ${
                    active === link.id ? "text-foreground" : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#book"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block rounded-md bg-accent px-5 py-3 text-center text-sm font-medium text-foreground transition hover:bg-accent/90"
          >
            Book foredrag
          </a>
        </nav>
      )}
    </header>
  );
}

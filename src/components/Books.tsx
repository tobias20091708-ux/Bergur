"use client";

import dynamic from "next/dynamic";
import { ScrollReveal } from "./ScrollReveal";

const BookCover = dynamic(
  () => import("./three/BookCover").then((mod) => mod.BookCover),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto aspect-[3/4] w-full max-w-[220px] animate-pulse rounded bg-surface-raised" />
    ),
  }
);

const BOOKS = [
  {
    title: "Barbara i høj sø",
    image: "/books/barbara-i-hoej-soe.jpg",
    role: "Redaktør",
    attribution: "m. Erik Skyum-Nielsen",
    publisher: "Multivers, 2025",
    description:
      "Antologi om Jørgen-Frantz Jacobsens hovedværk. Hardback, 218 sider.",
    buyUrl: "https://www.gucca.dk/barbara-i-hoej-soe-bog-p741966",
  },
  {
    title: "Litteraturens tilgange",
    image: "/books/litteraturens-tilgange.jpg",
    role: "Bidragyder",
    attribution: null,
    publisher: "Hans Reitzels Forlag",
    description: "Indbundet.",
    buyUrl: "https://www.gucca.dk/litteraturens-tilgange-bog-p603660",
  },
  {
    title: "Radierende Felter",
    image: "/books/radierende-felter.jpg",
    role: "Forfatter",
    attribution: null,
    publisher: "Multivers",
    description: "Hæftet.",
    buyUrl: "https://www.gucca.dk/radierende-felter-bog-p516071",
  },
];

// No cover art or buy link exists for these two yet — typographic cards
// instead of an invented cover image or purchase link. See CLAUDE.md.
const TYPOGRAPHIC_BOOKS = [
  {
    title: "Ultraminor World Literatures",
    role: "Forfatter",
    attribution: null,
    publisher: "2022",
  },
  {
    title: "Resten i Vesten",
    role: "Forfatter",
    attribution: "m. David Damrosch",
    publisher: null,
  },
];

function BookMeta({
  role,
  attribution,
  publisher,
}: {
  role: string;
  attribution: string | null;
  publisher: string | null;
}) {
  return (
    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-accent-text">
      {role}
      {attribution ? `, ${attribution}` : ""}
      {publisher ? ` · ${publisher}` : ""}
    </p>
  );
}

export function Books() {
  return (
    <section id="boeger" className="bg-surface px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent-text">
            Bøger
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl italic text-foreground sm:text-4xl">
            om Færøerne, Heinesen og nordatlantisk litteratur
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-16 sm:grid-cols-3">
          {BOOKS.map((book, i) => (
            <ScrollReveal key={book.title} delay={i * 0.12} bounce>
              <div>
                <BookCover imageUrl={book.image} />
                <div className="mt-8 text-center">
                  <h3 className="font-serif text-lg italic text-foreground">
                    {book.title}
                  </h3>
                  <BookMeta
                    role={book.role}
                    attribution={book.attribution}
                    publisher={book.publisher}
                  />
                  <p className="mt-2 text-sm text-muted">
                    {book.description}
                  </p>
                  <a
                    href={book.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-accent-text transition hover:text-foreground"
                  >
                    Køb →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-12 sm:grid-cols-2">
          {TYPOGRAPHIC_BOOKS.map((book, i) => (
            <ScrollReveal key={book.title} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-center rounded-lg border border-white/[0.12] bg-surface-raised/40 p-8 text-center">
                <h3 className="font-serif text-xl italic text-foreground">
                  {book.title}
                </h3>
                <BookMeta
                  role={book.role}
                  attribution={book.attribution}
                  publisher={book.publisher}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

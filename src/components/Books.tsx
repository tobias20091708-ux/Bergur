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
    meta: "Redaktør, m. Erik Skyum-Nielsen · Multivers, 2025",
    description:
      "Antologi om Jørgen-Frantz Jacobsens hovedværk. Hardback, 218 sider.",
    buyUrl: "https://www.gucca.dk/barbara-i-hoej-soe-bog-p741966",
  },
  {
    title: "Litteraturens tilgange",
    image: "/books/litteraturens-tilgange.jpg",
    meta: "Bidragyder · Hans Reitzels Forlag",
    description: "Indbundet.",
    buyUrl: "https://www.gucca.dk/litteraturens-tilgange-bog-p603660",
  },
  {
    title: "Radierende Felter",
    image: "/books/radierende-felter.jpg",
    meta: "Forfatter · Multivers",
    description: "Hæftet.",
    buyUrl: "https://www.gucca.dk/radierende-felter-bog-p516071",
  },
];

export function Books() {
  return (
    <section className="bg-surface px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            Bøger
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl italic text-foreground sm:text-4xl">
            om Færøerne, Heinesen og nordatlantisk litteratur
          </h2>
        </ScrollReveal>
        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {BOOKS.map((book, i) => (
            <ScrollReveal key={book.title} delay={i * 0.12} bounce>
              <div>
                <BookCover imageUrl={book.image} />
                <div className="mt-6 text-center">
                  <h3 className="font-serif text-lg italic text-foreground">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{book.meta}</p>
                  <p className="mt-1 text-sm text-muted">
                    {book.description}
                  </p>
                  <a
                    href={book.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-accent transition hover:text-foreground"
                  >
                    Køb →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

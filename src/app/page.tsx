import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { Foredrag } from "@/components/Foredrag";
import { Header } from "@/components/Header";
import { HeinesenProject } from "@/components/HeinesenProject";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SocialProof } from "@/components/SocialProof";
import { getForedrag, getSiteContent, getTestimonials } from "@/sanity/queries";

const BOOKS = [
  {
    title: "Ny bog 2026",
    meta: "Ipi Press, 244 s.",
    description: "Bergurs kommende bog udkommer i 2026.",
  },
  {
    title: "Barbara i høj sø",
    meta: "Redaktør · 2025, Multivers",
    description: "Antologi om Jørgen-Frantz Jacobsens hovedværk.",
  },
  {
    title: "Ultraminor World Literatures",
    meta: "2022",
    description: "Om de små sprogs plads i verdenslitteraturen.",
  },
];

export default async function Home() {
  const [content, foredrag, testimonials] = await Promise.all([
    getSiteContent(),
    getForedrag(),
    getTestimonials(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Hero name={content?.heroTitle} tagline={content?.heroTagline} />
      <Intro quote={content?.introQuote} badges={content?.introBadges} />
      <Foredrag entries={foredrag.length > 0 ? foredrag : undefined} />
      <HeinesenProject
        eyebrow={content?.heinesenEyebrow}
        title={content?.heinesenTitle}
        body={content?.heinesenBody}
        image={content?.heinesenImage}
      />
      <section className="bg-surface px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Bøger og publikationer
            </p>
          </ScrollReveal>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {BOOKS.map((book, i) => (
              <ScrollReveal key={book.title} delay={i * 0.1}>
                <div>
                  <div className="flex aspect-[2/3] items-center justify-center rounded-xl border border-border bg-surface-raised p-6 text-center">
                    <p className="font-serif text-lg italic text-foreground">
                      {book.title}
                    </p>
                  </div>
                  <p className="mt-4 text-sm text-accent">{book.meta}</p>
                  <p className="mt-1 text-sm text-muted">
                    {book.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <SocialProof
        testimonials={testimonials.length > 0 ? testimonials : undefined}
      />
      <About
        eyebrow={content?.aboutEyebrow}
        title={content?.aboutTitle}
        body={content?.aboutBody}
        facts={content?.aboutFacts}
      />
      <Booking />
      <Footer email={content?.footerEmail} />
    </div>
  );
}

import type { Image as SanityImage } from "sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { ScrollReveal } from "./ScrollReveal";

const DEFAULT_EYEBROW = "Heinesen-hulen";
const DEFAULT_TITLE = "En hule, seks niveauer ned i den færøske undergrund";
const DEFAULT_BODY =
  "Henning Larsen Arkitekter har tegnet en fysisk version af Platons hulelignelse under Færøernes jord — og Bergur er manden bag. Et spektakulært kultur-arkitekturprojekt, der bruger William Heinesens forfatterskab som storytelling-motor.";

export function HeinesenProject({
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  image,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  image?: SanityImage;
}) {
  return (
    <section
      id="heinesen-hulen"
      className="border-b border-t border-border bg-background px-6 py-24 sm:px-12"
    >
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 sm:items-center">
        <ScrollReveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-raised via-accent-soft to-background">
            {image ? (
              <Image
                src={urlFor(image).width(1000).height(750).url()}
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-center text-xs uppercase tracking-widest text-muted">
                Visualisering fra Henning Larsen Arkitekter
                <br />
                indsættes her
              </div>
            )}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl italic text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 leading-relaxed text-muted">{body}</p>
          <a
            href="#book"
            className="mt-6 inline-block text-sm font-medium text-accent transition hover:text-foreground"
          >
            Hør mere om projektet →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

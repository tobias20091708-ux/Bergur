"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { useRef } from "react";

const OceanScene = dynamic(
  () => import("./three/OceanScene").then((m) => m.OceanScene),
  { ssr: false }
);

const DEFAULT_EYEBROW = "Lektor, Københavns Universitet";
const DEFAULT_TITLE = "De vilde steder og den store poesi";
const DEFAULT_TAGLINE =
  "Bergur Rønne Moberg — færøsk litteraturforsker, foredragsholder og Færøernes stemme i dansk kultur.";

export function Hero({
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  tagline = DEFAULT_TAGLINE,
}: {
  eyebrow?: string;
  title?: string;
  tagline?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-eyebrow]", { opacity: 0, y: 16, duration: 0.7 })
        .from(
          "[data-hero-title]",
          { opacity: 0, y: 24, duration: 0.9 },
          "-=0.4"
        )
        .from(
          "[data-hero-tagline]",
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.5"
        )
        .from(
          "[data-hero-cta]",
          { opacity: 0, y: 16, duration: 0.7, stagger: 0.1 },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-background"
    >
      <div className="absolute inset-0">
        <OceanScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
      <div className="relative z-10 flex h-full max-w-4xl flex-col items-start justify-end px-6 pb-20 sm:px-12 sm:pb-28">
        <p
          data-hero-eyebrow
          className="mb-4 text-sm uppercase tracking-[0.3em] text-accent"
        >
          {eyebrow}
        </p>
        <h1
          data-hero-title
          className="text-balance font-serif text-5xl italic leading-[1.05] text-foreground sm:text-7xl"
        >
          {title}
        </h1>
        <p
          data-hero-tagline
          className="mt-6 max-w-xl text-lg text-muted sm:text-xl"
        >
          {tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            data-hero-cta
            href="#foredrag"
            className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-background transition hover:bg-accent/90"
          >
            Se foredrag
          </a>
          <a
            data-hero-cta
            href="#book"
            className="rounded-full border border-border px-7 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
          >
            Book foredrag
          </a>
        </div>
      </div>
    </section>
  );
}

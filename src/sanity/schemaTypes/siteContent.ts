import { defineField, defineType } from "sanity";

export const siteContent = defineType({
  name: "siteContent",
  title: "Sideindhold",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Intro" },
    { name: "heinesen", title: "Heinesen-hulen" },
    { name: "about", title: "Om Bergur" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // Hero
    defineField({
      name: "heroEyebrow",
      title: "Overskrift over titlen",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hovedtitel",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTagline",
      title: "Underoverskrift",
      type: "text",
      rows: 2,
      group: "hero",
    }),

    // Intro
    defineField({
      name: "introQuote",
      title: "Citat",
      type: "text",
      rows: 3,
      group: "intro",
    }),
    defineField({
      name: "introBadges",
      title: "Badges",
      type: "array",
      of: [{ type: "string" }],
      group: "intro",
    }),

    // Heinesen-hulen
    defineField({
      name: "heinesenEyebrow",
      title: "Overskrift",
      type: "string",
      group: "heinesen",
    }),
    defineField({
      name: "heinesenTitle",
      title: "Titel",
      type: "string",
      group: "heinesen",
    }),
    defineField({
      name: "heinesenBody",
      title: "Brødtekst",
      type: "text",
      rows: 4,
      group: "heinesen",
    }),
    defineField({
      name: "heinesenImage",
      title: "Billede",
      type: "image",
      options: { hotspot: true },
      group: "heinesen",
    }),

    // Om Bergur
    defineField({
      name: "aboutEyebrow",
      title: "Overskrift",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutTitle",
      title: "Titel",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "Brødtekst",
      type: "text",
      rows: 4,
      group: "about",
    }),
    defineField({
      name: "aboutFacts",
      title: "Fakta-liste",
      type: "array",
      of: [{ type: "string" }],
      group: "about",
    }),

    // Footer
    defineField({
      name: "footerEmail",
      title: "Kontakt-e-mail",
      type: "string",
      group: "footer",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Sideindhold" };
    },
  },
});

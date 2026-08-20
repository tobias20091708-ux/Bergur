import { defineField, defineType } from "sanity";

export const foredrag = defineType({
  name: "foredrag",
  title: "Foredrag",
  type: "document",
  fields: [
    defineField({
      name: "hook",
      title: "Hook-overskrift",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Undertitel",
      type: "string",
    }),
    defineField({
      name: "teaser",
      title: "Teaser-tekst",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Rækkefølge",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Rækkefølge",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "hook", subtitle: "title" },
  },
});

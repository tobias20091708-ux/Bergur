import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Udtalelse",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Citat",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
    }),
    defineField({
      name: "org",
      title: "Organisation",
      type: "string",
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
    select: { title: "name", subtitle: "org" },
  },
});

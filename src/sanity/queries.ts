import type { Image } from "sanity";
import { client } from "./client";

export type SiteContent = {
  heroTitle?: string;
  heroTagline?: string;
  introQuote?: string;
  introBadges?: string[];
  heinesenEyebrow?: string;
  heinesenTitle?: string;
  heinesenBody?: string;
  heinesenImage?: Image;
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutBody?: string;
  aboutFacts?: string[];
  footerEmail?: string;
};

export type Foredrag = {
  _id: string;
  hook: string;
  title?: string;
  teaser?: string;
};

export type Testimonial = {
  _id: string;
  quote: string;
  name?: string;
  org?: string;
};

const siteContentQuery = /* groq */ `*[_type == "siteContent"][0]`;
const foredragQuery = /* groq */ `*[_type == "foredrag"] | order(order asc)`;
const testimonialsQuery = /* groq */ `*[_type == "testimonial"] | order(order asc)`;

export async function getSiteContent(): Promise<SiteContent | null> {
  try {
    return await client.fetch(siteContentQuery, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export async function getForedrag(): Promise<Foredrag[]> {
  try {
    return await client.fetch(foredragQuery, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await client.fetch(testimonialsQuery, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}

import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const SITE_URL = "https://bergur.vercel.app";
const OG_IMAGE = "/og/bergur-roenne-moberg.jpg";
const TITLE =
  "Bergur Rønne Moberg | Foredrag om Færøerne og William Heinesen";
const DESCRIPTION =
  "Bergur Rønne Moberg er lektor i nordisk litteratur ved Københavns Universitet og foredragsholder om Færøerne, William Heinesen, Jørgen-Frantz Jacobsen og nordatlantisk litteratur. Se foredrag, publikationer og booking.";

// Structured data describing the person this site is about.
// Only facts that are visible/verifiable on the page are included.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  inLanguage: "da-DK",
  name: "Bergur Rønne Moberg — forsker og foredragsholder",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#bergur`,
    name: "Bergur Rønne Moberg",
    givenName: "Bergur",
    familyName: "Rønne Moberg",
    jobTitle: "Lektor i nordisk litteratur",
    description:
      "Færøsk-dansk litteraturforsker og foredragsholder. Lektor i nordisk litteratur ved Københavns Universitet med speciale i William Heinesen, Jørgen-Frantz Jacobsen, færøsk litteratur og nordatlantisk litteratur.",
    image: `${SITE_URL}/bergur-headshot.png`,
    email: "mailto:kontakt@bergurmoberg.dk",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Københavns Universitet",
      url: "https://www.ku.dk/",
    },
    knowsAbout: [
      "William Heinesen",
      "Jørgen-Frantz Jacobsen",
      "færøsk litteratur",
      "nordisk litteratur",
      "nordatlantisk litteratur",
      "verdenslitteratur",
      "Færøerne",
    ],
    sameAs: [
      "https://researchprofiles.ku.dk/da/persons/bergur-r%C3%B8nne-moberg",
      "https://www.dansketaler.dk/taler/moberg-bergur-ronne",
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "da_DK",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Bergur Rønne Moberg — foredrag om Færøerne, William Heinesen og nordisk litteratur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="da"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ScrollProgress />
        <CursorSpotlight />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

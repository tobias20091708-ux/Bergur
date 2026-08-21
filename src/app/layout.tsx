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

const SITE_URL = "https://bergur.vercel.app";
const TITLE = "Bergur Rønne Moberg — De vilde steder og den store poesi";
const DESCRIPTION =
  "Bergur Rønne Moberg er lektor i nordisk litteratur ved Københavns Universitet og foredragsholder om Færøerne, William Heinesen og den nordatlantiske litteratur.";

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
    description:
      "Færøernes stemme i dansk kultur — forsker, kulturentreprenør, fortæller.",
    url: SITE_URL,
    type: "website",
    locale: "da_DK",
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
        {children}
      </body>
    </html>
  );
}

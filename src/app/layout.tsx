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

export const metadata: Metadata = {
  title: "Bergur Rønne Moberg — De vilde steder og den store poesi",
  description:
    "Bergur Rønne Moberg er lektor i nordisk litteratur ved Københavns Universitet og foredragsholder om Færøerne, William Heinesen og den nordatlantiske litteratur.",
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

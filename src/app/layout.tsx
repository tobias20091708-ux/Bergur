import type { Metadata } from "next";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bergur Rønne Moberg — De vilde steder og den store poesi",
  description:
    "Bergur Rønne Moberg er lektor i nordisk litteratur ved Københavns Universitet og foredragsholder om Færøerne, William Heinesen og den nordatlantiske litteratur.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="da" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ScrollProgress />
        <CursorSpotlight />
        {children}
      </body>
    </html>
  );
}

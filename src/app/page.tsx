import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Books } from "@/components/Books";
import { FaroeDivider } from "@/components/FaroeDivider";
import { Footer } from "@/components/Footer";
import { Foredrag } from "@/components/Foredrag";
import { Header } from "@/components/Header";
import { HeinesenProject } from "@/components/HeinesenProject";
import { Hero } from "@/components/Hero";
import { getSiteContent } from "@/sanity/queries";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Hero
        tagline={content?.heroTagline}
        facts={content?.introBadges}
      />
      <About
        eyebrow={content?.aboutEyebrow}
        title={content?.aboutTitle}
        body={content?.aboutBody}
        facts={content?.aboutFacts}
      />
      <FaroeDivider />
      <Foredrag />
      <FaroeDivider />
      <HeinesenProject
        eyebrow={content?.heinesenEyebrow}
        title={content?.heinesenTitle}
        body={content?.heinesenBody}
        image={content?.heinesenImage}
      />
      <Books />
      <Booking />
      <Footer email={content?.footerEmail} />
    </div>
  );
}

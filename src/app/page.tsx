import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { Foredrag } from "@/components/Foredrag";
import { Header } from "@/components/Header";
import { HeinesenProject } from "@/components/HeinesenProject";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { SocialProof } from "@/components/SocialProof";
import { getForedrag, getSiteContent, getTestimonials } from "@/sanity/queries";

export default async function Home() {
  const [content, foredrag, testimonials] = await Promise.all([
    getSiteContent(),
    getForedrag(),
    getTestimonials(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Hero name={content?.heroTitle} tagline={content?.heroTagline} />
      <Intro quote={content?.introQuote} badges={content?.introBadges} />
      <Foredrag entries={foredrag.length > 0 ? foredrag : undefined} />
      <HeinesenProject
        eyebrow={content?.heinesenEyebrow}
        title={content?.heinesenTitle}
        body={content?.heinesenBody}
        image={content?.heinesenImage}
      />
      <SocialProof
        testimonials={testimonials.length > 0 ? testimonials : undefined}
      />
      <About
        eyebrow={content?.aboutEyebrow}
        title={content?.aboutTitle}
        body={content?.aboutBody}
        facts={content?.aboutFacts}
      />
      <Booking />
      <Footer email={content?.footerEmail} />
    </div>
  );
}

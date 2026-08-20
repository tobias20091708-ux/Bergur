import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Books } from "@/components/Books";
import { EventBar } from "@/components/EventBar";
import { FaroeDivider } from "@/components/FaroeDivider";
import { Footer } from "@/components/Footer";
import { Foredrag } from "@/components/Foredrag";
import { Header } from "@/components/Header";
import { HeinesenProject } from "@/components/HeinesenProject";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { SocialProof } from "@/components/SocialProof";
import { getSiteContent, getTestimonials } from "@/sanity/queries";

export default async function Home() {
  const [content, testimonials] = await Promise.all([
    getSiteContent(),
    getTestimonials(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Hero name={content?.heroTitle} tagline={content?.heroTagline} />
      <EventBar />
      <Intro badges={content?.introBadges} />
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
      <SocialProof
        testimonials={testimonials.length > 0 ? testimonials : undefined}
      />
      <Booking />
      <Footer email={content?.footerEmail} />
    </div>
  );
}

import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { Foredrag } from "@/components/Foredrag";
import { Header } from "@/components/Header";
import { HeinesenProject } from "@/components/HeinesenProject";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { SocialProof } from "@/components/SocialProof";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Hero />
      <Intro />
      <Foredrag />
      <HeinesenProject />
      <SocialProof />
      <About />
      <Booking />
      <Footer />
    </div>
  );
}

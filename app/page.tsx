import { Hero } from "@/components/sections/hero";
import { CtaSection } from "@/components/sections/cta-section";
import { WhyUs } from "@/components/sections/why-us";
import { Services } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Reviews } from "@/components/sections/reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CtaSection />
      <WhyUs />
      <Services />
      <HowItWorks />
      <Reviews />
    </>
  );
}

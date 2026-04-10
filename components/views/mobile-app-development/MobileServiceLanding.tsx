"use client";

import type { MobileServiceContent } from "./content";
import { Hero } from "./Hero";
import { Marquee } from "@/components/shared/Marquee";
import { WhyHire } from "./WhyHire";
import { Advantages } from "./Advantages";
import { AppPortfolio } from "./AppPortfolio";
import { PortfolioStory } from "./PortfolioStory";
import { PortfolioCta } from "./PortfolioCta";
import { Clients } from "./Clients";
import { Dedication } from "./Dedication";
import { OtherServices } from "./OtherServices";
// import { FinalCta } from "./FinalCta";
import Feedback from "../home/Feedback";
import ContactForm from "../home/ContactForm";

type Props = {
  serviceKey: "iphone" | "android" | "flutter";
  content: MobileServiceContent;
};

export default function MobileServiceLanding({ serviceKey, content }: Props) {
  return (
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <Hero serviceKey={serviceKey} content={content} />
      <Marquee items={content.marquee} />
      <WhyHire serviceKey={serviceKey} content={content} />
      <Advantages content={content} />
      <AppPortfolio content={content} />
      <PortfolioStory story={content.appPortfolio.story} />
      <Feedback eyebrowStyle="dash" />
      <PortfolioCta />
      <Clients content={content} />
      <Dedication />
      <OtherServices content={content} />
      {/* <FinalCta serviceName={content.heroHighlight} /> */}
      <ContactForm />
    </div>
  );
}


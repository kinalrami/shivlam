"use client";

import type { MobileServiceContent } from "./content";
import { Hero } from "./Hero";
import { Marquee } from "@/components/shared/Marquee";
import { WhyHire } from "./WhyHire";
import { Advantages } from "./Advantages";
import { PortfolioCta } from "./PortfolioCta";
import { Clients } from "./Clients";
import { Dedication } from "./Dedication";
import { OtherServices } from "./OtherServices";
import { FinalCta } from "./FinalCta";
import Feedback from "../home/Feedback";
import ContactForm from "../home/ContactForm";

type Props = {
  content: MobileServiceContent;
};

export default function MobileServiceLanding({ content }: Props) {
  return (
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <Hero content={content} />
      <Marquee items={content.marquee} />
      <WhyHire />
      <Advantages />
      <Feedback />
      <PortfolioCta />
      <Clients />
      <Dedication />
      <OtherServices />
      <FinalCta serviceName={content.heroHighlight} />
      <ContactForm />
    </div>
  );
}


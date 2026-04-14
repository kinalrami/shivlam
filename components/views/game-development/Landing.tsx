"use client";

import { Marquee } from "@/components/shared/Marquee";
import ContactForm from "@/components/views/home/ContactForm";
import type { GameDevContent } from "./content";
import { Hero } from "./Hero";
import { PortfolioCta } from "./PortfolioCta";
import { MoreServices } from "@/components/views/web-development/MoreServices";
import { ClientsStrip } from "@/components/views/web-development/ClientsStrip";
import { Process } from "@/components/views/web-development/Process";
import { StatsStrip } from "@/components/views/web-development/StatsStrip";
import { FinalCta } from "@/components/views/web-development/FinalCta";
import { Specialisations } from "./Specialisations";
import { GameMidCta } from "./GameMidCta";
import { WhyHire } from "@/components/shared/WhyHire";
import { ArMarketingShowcase } from "@/components/shared/ArMarketingShowcase";
import { GameWhyAdvantages } from "./GameWhyAdvantages";
import { UnityWhyHireLeft } from "./UnityWhyHireLeft";
import { PortfolioGridSection } from "@/components/shared/PortfolioGridSection";

type Props = {
  content: GameDevContent;
};

export default function Landing({ content }: Props) {
  return (
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <Hero content={content.hero} />
      <Marquee items={content.marquee} />
      <StatsStrip items={content.statsStrip} />
      <Specialisations content={content.specialisations} />
      <GameMidCta content={content.midCta} />
      <WhyHire
        serviceKey="iphone"
        why={content.whyHire}
        showPhoneCanvas={false}
        showBottomStats={false}
        leftSlot={<UnityWhyHireLeft shipped={content.unityShippedGames} />}
      />
      <ArMarketingShowcase variant="game-ar" content={content.arDeepDive} />
      <ArMarketingShowcase variant="game-visionpro" content={content.visionProDeepDive} />
      <GameWhyAdvantages content={content.whyAdvantages} />
      <PortfolioGridSection content={content.portfolioGrid} />
      <PortfolioCta content={content.portfolioCta} />
      <Process content={content.process} />
      <ClientsStrip content={content.clients} />
      <MoreServices content={content.more} />
      <FinalCta content={content.finalCta} />
      <ContactForm />
    </div>
  );
}


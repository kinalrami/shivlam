"use client";

import ContactForm from "@/components/views/home/ContactForm";
import type { BrandBuildingContent } from "./content";
import { Hero } from "./Hero";
import { Marquee } from "@/components/shared/Marquee";
import { StatsStrip } from "@/components/views/web-development/StatsStrip";
import { Process } from "@/components/views/web-development/Process";
import { ClientsStrip } from "@/components/views/web-development/ClientsStrip";
import { MoreServices } from "@/components/views/web-development/MoreServices";
import { BrandFinalCta } from "@/components/views/brand-building/BrandFinalCta";
import { BrandPortfolioCta } from "@/components/views/brand-building/BrandPortfolioCta";
import { SpecialisedMarketing } from "@/components/views/brand-building/SpecialisedMarketing";
import { LatestChannels } from "@/components/views/brand-building/LatestChannels";
import { StrategyFunnel } from "@/components/views/brand-building/StrategyFunnel";
import { SocialPaidMedia } from "@/components/views/brand-building/SocialPaidMedia";
import { AsoDeepDive } from "@/components/views/brand-building/AsoDeepDive";
import { SeoDeepDive } from "@/components/views/brand-building/SeoDeepDive";
import { MidCtaSection } from "@/components/shared/MidCtaSection";
import { ServicesGridSection } from "@/components/shared/ServicesGridSection";

type Props = {
  content: BrandBuildingContent;
};

export default function Landing({ content }: Props) {
  return (
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <Hero content={content.hero} />
      <Marquee items={content.marquee} />
      <StatsStrip items={content.statsStrip} />
      <ServicesGridSection content={content.coreServices} />
      <MidCtaSection sectionId="brand-mid-cta" content={content.midCta} />
      <SeoDeepDive content={content.seoDeepDive} />
      <AsoDeepDive content={content.asoDeepDive} />
      <SocialPaidMedia content={content.socialPaidMedia} />
      <StrategyFunnel content={content.strategyFunnel} />
      <LatestChannels content={content.latestChannels} />
      <SpecialisedMarketing content={content.specialisedMarketing} />
      <BrandPortfolioCta content={content.portfolioCta} />
      <Process content={content.process} />
      <ClientsStrip content={content.clients} />
      <MoreServices content={content.more} />
      <BrandFinalCta content={content.finalCta} />
      <ContactForm />
    </div>
  );
}


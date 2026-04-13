"use client";

import type { GameDevContent } from "./content";
import { StatsCtaSection } from "@/components/shared/StatsCtaSection";

type Props = {
  content: GameDevContent["portfolioCta"];
};

export function PortfolioCta({ content }: Props) {
  return (
    <StatsCtaSection
      introVariant="simple"
      sectionId={content.sectionId}
      headingId={content.headingId}
      sectionClassName="bg-[#060606]"
      containerClassName="mx-auto max-w-325 px-5 py-12 text-center md:px-12 md:py-20"
      eyebrow={content.eyebrow}
      title={
        <>
          {content.titleBefore} <span className="text-orange-400">{content.titleHighlight}</span>
        </>
      }
      lead={content.lead}
      statsWrapClassName="mb-10 mt-8 flex flex-wrap justify-center gap-14 md:gap-16"
      statCardClassName="text-center"
      statValueClassName="mb-1.5 block font-sans text-[34px] font-bold leading-none text-orange-400"
      statLabelClassName="font-mono text-[8px] tracking-[0.15em] text-white/30 uppercase"
      buttonsWrapClassName="flex flex-wrap justify-center gap-4"
      stats={content.stats}
      primaryCta={content.primaryCta}
      secondaryCta={content.secondaryCta}
    />
  );
}


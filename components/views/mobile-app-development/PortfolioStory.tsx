"use client";

import { StatsCtaSection } from "@/components/shared/StatsCtaSection";
import type { AppPortfolioStoryContent } from "./content";

type Props = {
  story: AppPortfolioStoryContent;
};

export function PortfolioStory({ story }: Props) {
  return (
    <StatsCtaSection
      introVariant="sectionIntro"
      sectionId={story.sectionId}
      headingId={story.headingId}
      sectionClassName="relative scroll-mt-14 overflow-hidden bg-[#060606] pb-12 text-center md:pb-20"
      containerClassName="relative mx-auto max-w-[760px] px-5 md:px-12"
      eyebrow={story.eyebrow}
      title={
        <>
          <span className="block">{story.titleLine1}</span>
          <span className="text-sl-saffron">{story.titleHighlight}</span>
        </>
      }
      lead={story.lead}
      introClassName="mb-8 [&_h3]:text-white [&_p]:mx-auto [&_p]:max-w-[560px] [&_p]:text-center [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-white/55"
      stats={story.stats.map((s) => ({ value: s.num, label: s.label }))}
      statsWrapClassName="mb-8 flex flex-wrap justify-center gap-10 md:gap-12"
      statCardClassName="text-center"
      statValueClassName="mb-1.5 block font-sans text-3xl font-bold leading-none text-orange-400"
      statLabelClassName="font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase"
      buttonsWrapClassName="flex flex-wrap justify-center gap-4"
      primaryBtnClassName="inline-flex items-center gap-2 rounded-md bg-orange-400 px-8 py-3.5 text-xs font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.28)] transition-[background,box-shadow] duration-200 hover:bg-[#e68a1f] hover:shadow-[0_0_36px_rgb(245_138_11/0.4)]"
      secondaryBtnClassName="inline-flex items-center gap-2 rounded-md border border-white/28 bg-transparent px-8 py-3.5 text-xs font-semibold tracking-[0.07em] text-white/80 uppercase transition-[border-color,color,background] duration-200 hover:border-orange-400 hover:bg-orange-400/[0.06] hover:text-orange-400"
      primaryCta={story.primaryCta}
      secondaryCta={story.secondaryCta}
    />
  );
}


"use client";

import type { MidCtaTitleSegment, SpatialMidCtaContent } from "@/components/shared/arShowcaseTypes";
import { StatsCtaSection } from "@/components/shared/StatsCtaSection";

type Props = { content: SpatialMidCtaContent };

function segmentClass(tone: MidCtaTitleSegment["tone"] | undefined): string | undefined {
  switch (tone) {
    case "green":
      return "text-[#3DDC84]";
    case "saffron":
      return "text-sl-saffron";
    default:
      return undefined;
  }
}

/**
 * Shared mid-page CTA (stats + dual buttons) for Android / iPhone spatial marketing flows.
 */
export function SpatialMidCta({ content: c }: Props) {
  return (
    <StatsCtaSection
      introVariant="sectionIntro"
      sectionId={c.sectionId}
      headingId={c.headingId}
      sectionClassName="relative scroll-mt-14 overflow-hidden bg-[#060606] pb-12 md:pb-20"
      containerClassName="relative z-[2] mx-auto max-w-[760px] px-5 md:px-12"

      eyebrow={c.eyebrow}
      title={
        <>
          {c.titleLines.map((line, li) => (
            <span key={li} className="block">
              {line.segments.map((seg, si) => (
                <span key={si} className={segmentClass(seg.tone)}>
                  {seg.text}
                </span>
              ))}
            </span>
          ))}
        </>
      }
      lead={c.lead}
      introClassName="mb-10 [&_h3]:text-white [&_p]:max-w-[540px] [&_p]:text-[15px] [&_p]:leading-[1.7] [&_p]:text-white/50"
      statsWrapClassName="mb-10 flex flex-wrap justify-center gap-14 md:gap-16"
      statCardClassName="text-center"
      statValueClassName="mb-1.5 block font-sans text-[34px] font-bold leading-none text-sl-saffron"
      statLabelClassName="font-mono text-[8px] tracking-[0.15em] text-white/30 uppercase"
      buttonsWrapClassName="flex flex-wrap justify-center gap-4"
      primaryBtnClassName="inline-flex items-center gap-2 rounded-[5px] bg-sl-saffron px-8 py-3.5 font-sans text-xs font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgba(255,153,51,.28)] transition-colors hover:bg-[#E68A1F]"
      secondaryBtnClassName="inline-flex items-center gap-2 rounded-[5px] border border-white/25 bg-transparent px-8 py-3.5 font-sans text-xs font-semibold tracking-[0.07em] text-white/80 uppercase transition-all hover:border-sl-saffron hover:bg-[rgba(255,153,51,.06)] hover:text-sl-saffron"
      stats={c.stats}
      primaryCta={c.primaryCta}
      secondaryCta={c.secondaryCta}
    />
  );
}

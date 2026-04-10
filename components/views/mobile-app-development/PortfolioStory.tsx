"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import type { AppPortfolioStoryContent } from "./content";

type Props = {
  story: AppPortfolioStoryContent;
};

export function PortfolioStory({ story }: Props) {
  return (
    <section
      id={story.sectionId}
      className="relative scroll-mt-14 overflow-hidden bg-[#060606] pb-12 text-center md:pb-20"
    >
      <div className="relative mx-auto max-w-325 px-5 md:px-12">
        <SectionIntro
          id={story.headingId}
          eyebrow={story.eyebrow}
          eyebrowStyle="dash"
          align="center"
          title={
            <>
              <span className="block">{story.titleLine1}</span>
              <span className="text-sl-saffron">{story.titleHighlight}</span>
            </>
          }
          lead={null}
          className="mb-0 [&_h3]:text-white"
        />

        <p className="mx-auto mb-8 max-w-[560px] text-center text-base leading-relaxed text-white/55">
          {story.lead}
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-10 md:gap-12">
          {story.stats.map((s) => (
            <div key={s.label}>
              <span className="mb-1.5 block font-sans text-3xl font-bold leading-none text-orange-400">
                {s.num}
              </span>
              <span className="font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={story.primaryCta.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-orange-400 px-8 py-3.5 text-xs font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.28)] transition-[background,box-shadow] duration-200 hover:bg-[#e68a1f] hover:shadow-[0_0_36px_rgb(245_138_11/0.4)]"
          >
            {story.primaryCta.label}
          </a>
          <a
            href={story.secondaryCta.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/28 bg-transparent px-8 py-3.5 text-xs font-semibold tracking-[0.07em] text-white/80 uppercase transition-[border-color,color,background] duration-200 hover:border-orange-400 hover:bg-orange-400/[0.06] hover:text-orange-400"
          >
            {story.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}


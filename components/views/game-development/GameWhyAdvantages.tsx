"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import type { GameDevContent } from "./content";

type Props = {
  content: GameDevContent["whyAdvantages"];
};

export function GameWhyAdvantages({ content }: Props) {
  return (
    <section id={content.sectionId} className="relative scroll-mt-14 overflow-hidden bg-[#060606] pb-12 md:pb-20">
      <div className="relative z-1 mx-auto max-w-325 px-5 md:px-12">
        <SectionIntro
          id={content.headingId}
          eyebrow={content.eyebrow}
          eyebrowStyle="dash"
          fullWidth
          title={
            <>
              <span className="block text-white">{content.titleLine1}</span>
              <span className="block text-sl-saffron">{content.titleLine2}</span>
            </>
          }
          lead={content.lead}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card) => (
            <div
              key={card.num}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:shadow-[0_12px_40px_rgb(0_0_0/0.35)]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <span className="font-mono text-[11px] font-semibold tabular-nums text-orange-400">{card.num}</span>
              <h3 className="mt-3 font-sans text-[13px] font-bold leading-snug text-white md:text-[14px]">
                {card.title}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.58] text-white/45">{card.desc}</p>
              <span className="mt-4 inline-flex rounded-[3px] border border-orange-400/20 bg-orange-400/10 px-[10px] py-1 font-mono text-[8px] tracking-[0.18em] text-orange-400/90 uppercase">
                {card.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:mt-8">
          <a
            href={content.primaryCta.href}
            className="inline-flex items-center justify-center rounded-md border border-orange-400 bg-orange-400 px-8 py-3.5 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
          >
            {content.primaryCta.label}
          </a>
          <a
            href={content.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-md border-[1.5px] border-white/15 bg-transparent px-8 py-3.5 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
          >
            {content.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

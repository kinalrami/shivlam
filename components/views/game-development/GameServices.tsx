"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import type { GameDevContent } from "./content";

type Props = {
  content: GameDevContent["services"];
};

export function Services({ content }: Props) {
  return (
    <section
      id={content.sectionId}
      aria-labelledby={content.headingId}
      className="bg-[#060606] pb-12 md:pb-20 scroll-mt-14"
    >
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <SectionIntro
          id={content.headingId}
          eyebrow={content.eyebrow}
          eyebrowStyle="dash"
          align="center"
          title={
            <>
              {content.title.before}
              <span className="text-orange-400">{content.title.highlight}</span>
              {content.title.after ?? null}
            </>
          }
          lead={content.lead}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_20px_60px_rgb(0_0_0/0.35)]"
            >
              <div className="mb-4 font-mono text-[10px] tracking-[0.18em] text-orange-400/70 uppercase">
                {card.tag}
              </div>
              <h3 className="font-sans text-lg font-semibold tracking-tight text-white">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed font-light text-white/45">
                {card.desc}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {card.pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


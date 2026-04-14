"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import type { BrandBuildingContent } from "./content";

type Props = {
  content: BrandBuildingContent["latestChannels"];
};

export function LatestChannels({ content }: Props) {
  return (
    <section id={content.sectionId} className="relative scroll-mt-14 overflow-hidden bg-[#060606] pb-12 md:pb-20">
      <div className="relative z-10 mx-auto max-w-325 px-5 pb-2 md:px-12">
        <SectionIntro
          id={content.headingId}
          eyebrow={content.eyebrow}
          eyebrowStyle="dash"
          title={
            <>
              {content.title.before}<br /> <span className="text-sl-saffron">{content.title.highlight}</span>
              {content.title.after ?? null}
            </>
          }
          lead={content.lead}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((c) => (
            <article
              key={c.title}
              className="rounded-xl border border-white/7 bg-white/[0.02] p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/25"
            >
              <div className="mb-2 flex items-center gap-2">
                {c.badge === "new" ? (
                  <span className="inline-flex items-center rounded-sm border border-[rgba(34,197,94,.25)] bg-[rgba(34,197,94,.12)] px-2 py-0.5 font-mono text-[8px] tracking-[0.14em] text-[rgba(34,197,94,.9)] uppercase">
                    NEW 2025
                  </span>
                ) : null}
              </div>
              <div className="font-mono text-[9px] tracking-[0.16em] text-orange-400 uppercase">{c.tag}</div>
              <h3 className="mt-2 font-sans text-[15px] font-bold leading-snug text-white">{c.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-white/45">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


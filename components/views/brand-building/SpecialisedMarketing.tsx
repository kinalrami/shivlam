"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import type { BrandBuildingContent } from "./content";
import { MoveUpRight } from "lucide-react";

type Props = {
  content: BrandBuildingContent["specialisedMarketing"];
};

export function SpecialisedMarketing({ content }: Props) {
  return (
    <section id={content.sectionId} className="relative scroll-mt-14 overflow-hidden bg-[#060606] pb-12 md:pb-20">
      <div className="relative z-[1] mx-auto max-w-325 px-5 md:px-12">
        <SectionIntro
          id={content.headingId}
          eyebrow={content.eyebrow}
          eyebrowStyle="dash"
          title={
            <>
              {content.title.before} <br /><span className="text-sl-saffron">{content.title.highlight}</span>
              {content.title.after ?? null}
            </>
          }
          lead={content.lead}
        />

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {content.cards.map((c) => (
            <article
              key={c.title}
              className="group overflow-hidden rounded-xl border border-white/10  bg-white/3 p-6 shadow-[0_10px_30px_rgba(16,43,77,.06)] backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,153,51,.28)] hover:shadow-[0_18px_45px_rgba(16,43,77,.10)]"
            >
              <div className="font-mono text-[9px] tracking-[0.18em] text-orange-500/75 uppercase">{c.tag}</div>
              <h3 className="mt-2 font-sans text-[15px] font-bold leading-snug text-white">{c.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-gray-400">{c.desc}</p>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-orange-500 uppercase transition-opacity group-hover:opacity-80"
              >
                {c.linkLabel}
                <MoveUpRight className="size-3" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


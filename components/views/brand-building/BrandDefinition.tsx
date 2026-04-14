"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import type { BrandBuildingContent } from "./content";

type Props = {
  content: BrandBuildingContent["definition"];
};

const CARD_CLASS =
  "rounded-xl border border-white/[0.10] bg-white/[0.04] shadow-[0_18px_55px_rgb(0_0_0/0.35)]";

export function BrandDefinition({ content }: Props) {
  return (
    <section id={content.sectionId} className="relative scroll-mt-14 overflow-x-hidden bg-[#060606] pt-12 md:pt-20">
      <div className="relative z-[1] mx-auto max-w-325 px-5 md:px-12">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {/* LEFT */}
          <div className="min-w-0">
            <SectionIntro
              id={content.left.headingId}
              eyebrow={content.left.eyebrow}
              eyebrowStyle="dash"
              title={null}
              lead={null}
            />

            <div className={["p-7", CARD_CLASS].join(" ")}>
              <div className="font-mono text-[9px] tracking-[0.15em] text-white/40 uppercase">
                {content.left.definitionLabel}
              </div>
              <p className="mt-4 font-sans text-[15px] leading-[1.7] text-white/85">
                {content.left.definition.before}
                <span className="text-orange-400 font-semibold">{content.left.definition.emphasis1}</span>
                {content.left.definition.mid}
                <span className="text-orange-400 font-semibold">{content.left.definition.emphasis2}</span>
                {content.left.definition.after}
              </p>
              <div className="mt-6 font-mono text-[9px] tracking-[0.14em] text-white/35 uppercase">
                {content.left.attribution}
              </div>
            </div>

            <div className={["mt-5 p-6", CARD_CLASS].join(" ")}>
              <div className="font-mono text-[9px] tracking-[0.15em] text-white/40 uppercase">
                {content.left.whyLabel}
              </div>
              <p className="mt-3 text-[13px] leading-[1.75] text-white/55">{content.left.whyBody}</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="min-w-0">
            <SectionIntro
              id={content.right.headingId}
              eyebrow={content.right.eyebrow}
              eyebrowStyle="dash"
              title={
                <>
                  {content.right.title.before}
                  <br />
                  <span className="text-orange-400">{content.right.title.highlight}</span>
                </>
              }
              lead={content.right.lead}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {content.right.pillars.map((p) => (
                <article
                  key={p.num}
                  className={[
                    "group relative p-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-orange-400/45 hover:shadow-[0_26px_65px_rgb(0_0_0/0.55)]",
                    CARD_CLASS,
                  ].join(" ")}
                >
                  <div
                    className="pointer-events-none absolute right-4 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-orange-400/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:flex"
                    aria-hidden
                  >
                    <span className="size-1.5 rounded-full bg-orange-400" />
                  </div>

                  <div className="font-mono text-[10px] tracking-[0.15em] text-orange-400/60 uppercase">
                    {p.num} · {p.tag}
                  </div>
                  <div className="mt-3 font-sans text-[15px] font-semibold text-white">{p.title}</div>
                  <p className="mt-2 text-[13px] leading-[1.7] text-white/50">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import { MidBannerCta } from "@/components/shared/MidBannerCta";
import type { BrandBuildingContent } from "./content";

type Props = {
  content: BrandBuildingContent["finalCta"];
};

export function BrandFinalCta({ content }: Props) {
  return (
    <MidBannerCta
      sectionId="cta"
      reveal="arbim"
      badge={content.eyebrow}
      title={
        <>
          {content.titleBefore}
          <br />
          <span className="text-orange-400">{content.titleHighlight}</span>
        </>
      }
      body={<>{content.lead}</>}
      actions={
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={content.primaryCta.href}
              className="inline-flex items-center justify-center rounded-md border border-orange-400 bg-orange-400 px-8 py-3.5 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
            >
              {content.primaryCta.label}
            </a>
            <a
              href={content.secondaryCta.href}
              target={content.secondaryCta.href.startsWith("http") ? "_blank" : undefined}
              rel={content.secondaryCta.href.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-md border-[1.5px] border-white/15 bg-transparent px-8 py-3.5 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
            >
              {content.secondaryCta.label}
            </a>
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-sm">
              <a
                href={`mailto:${content.contactEmail}`}
                className="font-mono text-[12px] tracking-[0.14em] text-orange-400"
              >
                {content.contactEmail}
              </a>
              <span className="font-mono text-white/15" aria-hidden>
                ·
              </span>
              <a
                href={`https://${content.website}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[12px] tracking-[0.14em] text-orange-400"
              >
                {content.website}
              </a>
            </div>
          </div>
        </div>
      }
    />
  );
}


"use client";

import { useEffect, useRef } from "react";
import { SectionIntro } from "@/components/shared/section-chrome";
import type { BrandBuildingContent } from "./content";
import { attachSocialDashboardCanvas } from "./socialDashboardCanvas";
import { attachAdsDashboardCanvas } from "./adsDashboardCanvas";

type Props = {
  content: BrandBuildingContent["socialPaidMedia"];
};

export function SocialPaidMedia({ content }: Props) {
  const socialRef = useRef<HTMLCanvasElement>(null);
  const adsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = socialRef.current;
    if (!c) return;
    return attachSocialDashboardCanvas(c);
  }, []);

  useEffect(() => {
    const c = adsRef.current;
    if (!c) return;
    return attachAdsDashboardCanvas(c);
  }, []);

  return (
    <section id={content.sectionId} className="relative scroll-mt-14 overflow-hidden bg-[#060606] pb-12 md:pb-20">
      <div className="relative z-10 mx-auto max-w-325 px-5 md:px-12">
        <SectionIntro
          id={content.headingId}
          eyebrow={content.eyebrow}
          eyebrowStyle="dash"
          title={
            <>
              {content.title.before}<br /><span className="text-sl-saffron">{content.title.highlight}</span>
              {content.title.after ?? null}
            </>
          }
          lead={content.lead}
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-6">
          <div className="overflow-hidden rounded-[10px] border border-white/7 bg-[#1a1a2e]">
            <canvas ref={socialRef} className="block h-[320px] w-full min-w-0 max-w-full" />
          </div>
          <div className="overflow-hidden rounded-[10px] border border-white/7 bg-[#1a1a2e]">
            <canvas ref={adsRef} className="block h-[320px] w-full min-w-0 max-w-full" />
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.features.map((f) => (
            <article key={f.title} className="rounded-lg border border-white/7 bg-white/[0.02] p-5">
              <div className={`font-mono text-[8px] tracking-[0.10em] uppercase ${f.tagTone}`}>
                {f.tag}
              </div>
              <div className="mt-2 font-serif text-[14px] font-semibold text-white">{f.title}</div>
              <p className="mt-2 text-[12px] leading-[1.55] text-white/40">{f.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <a
            href={content.primaryCta.href}
            target={content.primaryCta.href.startsWith("http") ? "_blank" : undefined}
            rel={content.primaryCta.href.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-md border border-orange-400 bg-orange-400 px-8 py-3.5 text-[12px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_22px_rgba(255,153,51,.28)] transition-colors hover:bg-[#E68A1F]"
          >
            {content.primaryCta.label}
          </a>
          <a
            href={content.secondaryCta.href}
            target={content.secondaryCta.href.startsWith("http") ? "_blank" : undefined}
            rel={content.secondaryCta.href.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-8 py-3.5 text-[12px] font-semibold tracking-[0.07em] text-white/80 uppercase transition-all hover:border-orange-400/50 hover:bg-white/[0.04]"
          >
            {content.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}


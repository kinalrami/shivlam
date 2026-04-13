"use client";

import { useEffect, useRef } from "react";
import { SectionIntro } from "@/components/shared/section-chrome";
import type { WebDevContent } from "./content";
import { attachWebDesignCanvas } from "./designCanvas";

type Props = {
  content: WebDevContent["design"];
};

export function Design({ content }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    return attachWebDesignCanvas(c);
  }, []);

  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionIntro
              id={content.headingId}
              eyebrow={content.eyebrow}
              eyebrowStyle="dash"
              title={
                <>
                  {content.title.before}
                  <span className="text-sl-saffron">{content.title.highlight}</span>
                  {content.title.after ?? null}
                </>
              }
              lead={content.lead}
            />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.grid.map((it) => (
                <div
                  key={it.name}
                  className="rounded-xl border border-white/7 bg-white/[0.02] p-4 transition-[border-color] duration-200 hover:border-orange-400/20"
                >
                  <div className="font-mono text-[10px] tracking-[0.12em] text-orange-400 uppercase">
                    {it.icon}
                  </div>
                  <div className="mt-2 font-sans text-sm font-semibold text-white">
                    {it.name}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed font-light text-white/45">
                    {it.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={content.primaryCta.href}
                target={content.primaryCta.href.startsWith("http") ? "_blank" : undefined}
                rel={content.primaryCta.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-md border-[1.5px] border-white/15 bg-transparent px-7 py-3 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
              >
                {content.primaryCta.label}
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="overflow-hidden rounded-xl border border-orange-400/15 bg-[#0a1a2e]">
              <canvas ref={canvasRef} className="block h-[340px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


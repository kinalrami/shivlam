"use client";

import { useEffect, useRef } from "react";
import { SectionIntro } from "@/components/shared/section-chrome";
import { attachGamePortfolioCardCanvas } from "@/components/shared/gamePortfolioCardCanvas";
import type { PortfolioGridItem, PortfolioGridSectionContent } from "@/components/shared/portfolioGridTypes";
import { attachWebPortCardCanvas } from "@/components/views/web-development/portfolioCanvas";

function webPortfolioAccent(tag: string): string {
  const t = tag.toLowerCase();
  if (t.includes("react") || t.includes("next") || t.includes("seo") || t.includes("fintech")) return "#1DCFCF";
  if (t.includes("ecommerce") || t.includes("woo") || t.includes("shop")) return "#22c55e";
  return "#FF9933";
}

function PortfolioCardPreview({ item }: { item: PortfolioGridItem }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const p = item.preview;
    if (p.kind === "game") {
      return attachGamePortfolioCardCanvas(c, {
        gameType: p.gameType,
        color1: p.color1,
        color2: p.color2,
      });
    }
    const accent = webPortfolioAccent(p.webTag);
    return attachWebPortCardCanvas(c, { label: p.webTag, accentColor: accent });
  }, [
    item.key,
    item.preview.kind === "game"
      ? `g:${item.preview.gameType}:${item.preview.color1}:${item.preview.color2}`
      : `w:${item.preview.webTag}`,
  ]);

  return <canvas ref={ref} className="block h-full max-w-full min-w-0 w-full" aria-hidden />;
}

function LinkArrow() {
  return (
    <svg className="size-2.5 shrink-0 text-orange-500" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export type PortfolioGridSectionProps = {
  content: PortfolioGridSectionContent;
};

export function PortfolioGridSection({ content }: PortfolioGridSectionProps) {
  const { sectionId, headingId, eyebrow, titleBefore, titleHighlight, titleAfter, sideLead, gridColumns, items } =
    content;
  const lgCols = gridColumns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section id={sectionId} className="relative w-full min-w-0 scroll-mt-14 overflow-x-hidden bg-[#060606] pb-12 md:pb-20">
      <div className="relative z-[1] mx-auto w-full min-w-0 max-w-325 px-5 md:px-12">
        <div className="mb-10 flex min-w-0 flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionIntro
            id={headingId}
            eyebrow={eyebrow}
            eyebrowStyle="dash"
            title={
              <>
                {titleBefore}{" "}
                <br /> <span className="font-serif text-sl-saffron">{titleHighlight}</span>
                {titleAfter ? <span className="text-sl-text">{titleAfter}</span> : null}
              </>
            }
            className="mb-0! min-w-0 max-w-2xl [&_h3]:max-w-none [&_h3]:break-words"
          />
          <p className="min-w-0 max-w-md text-sm leading-relaxed break-words text-white/45 md:max-w-sm md:text-right">
            {sideLead}
          </p>
        </div>

        <div className={`grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 ${lgCols}`}>
          {items.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <article
                key={item.key}
                className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-white/3 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-orange-400/25 hover:shadow-[0_18px_55px_rgb(0_0_0/0.45)]"
              >
                <div className="relative h-[140px] w-full min-w-0 max-w-full shrink-0 overflow-hidden bg-[#08081a]">
                  <PortfolioCardPreview item={item} />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/25 to-transparent px-3 pb-3 pt-10">
                    <span className="inline-flex rounded-sm border border-white/15 bg-black/35 px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-orange-400/95 uppercase backdrop-blur-sm">
                      {item.pill}
                    </span>
                  </div>
                </div>
                <div className="flex min-h-0 flex-1 flex-col justify-between gap-4 border-t border-white/10 bg-white/3 px-4 pb-5 pt-4">
                  <div>
                    <h3 className="font-sans text-[15px] font-bold leading-snug text-white">{item.name}</h3>
                    <p className="mt-2 text-[13px] leading-[1.58] text-white/45">{item.desc}</p>
                  </div>
                  <a
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.14em] text-orange-500 uppercase transition-opacity hover:opacity-80"
                  >
                    {item.linkLabel}
                    <LinkArrow />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

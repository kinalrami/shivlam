"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import type { WebDevContent } from "./content";
import { MoveUpRight } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { attachWebPortCardCanvas } from "./portfolioCanvas";

type Props = {
  content: WebDevContent["portfolio"];
};

function usePortAccent(tag: string) {
  return useMemo(() => {
    const t = tag.toLowerCase();
    if (t.includes("react") || t.includes("next") || t.includes("seo") || t.includes("fintech")) return "#1DCFCF";
    if (t.includes("ecommerce") || t.includes("woo") || t.includes("shop")) return "#22c55e";
    return "#FF9933";
  }, [tag]);
}

function PortPreviewCanvas({ tag, label }: { tag: string; label: string }) {
  const accentColor = usePortAccent(tag);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    return attachWebPortCardCanvas(c, { label, accentColor });
  }, [label, accentColor]);

  return <canvas ref={ref} className="block h-full w-full" aria-hidden />;
}

export function Portfolio({ content }: Props) {
  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 pb-12 md:px-12 md:pb-20">
        <div className="mb-4 flex flex-col items-start justify-between gap-8 md:mb-6 md:flex-row md:items-end">
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
            className="mb-0!"
          />
          <p className="max-w-sm text-right text-sm leading-relaxed font-light text-white/40">
            {content.sideNote}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/3 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-orange-400/25 hover:shadow-[0_18px_55px_rgb(0_0_0/0.45)]"
            >
              <div className="relative h-40 overflow-hidden bg-linear-to-br from-orange-400/[0.08] via-white/[0.02] to-transparent">
                {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,153,51,0.18),transparent_45%)]" /> */}
                <div className="absolute inset-0">
                  <PortPreviewCanvas tag={p.tag} label={p.tag} />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-4">
                  <span className="inline-flex rounded-sm border border-orange-400/25 bg-orange-400/[0.10] px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-orange-400 uppercase">
                    {p.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-sans text-base font-bold tracking-tight text-white">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed font-light text-white/45">
                  {p.desc}
                </p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-orange-400 uppercase transition-opacity group-hover:opacity-80"
                >
                  {p.linkLabel}
                  <MoveUpRight className="size-3 text-orange-400" aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


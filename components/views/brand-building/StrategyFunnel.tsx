"use client";

import { useEffect, useRef } from "react";
import { SectionIntro } from "@/components/shared/section-chrome";
import { attachStrategyFunnelCanvas } from "./strategyFunnelCanvas";
import type { BrandBuildingContent } from "./content";

type Props = {
  content: BrandBuildingContent["strategyFunnel"];
};

function IntentBadge({
  tone,
  children,
}: {
  tone: "info" | "comm" | "trans";
  children: string;
}) {
  const cls =
    tone === "info"
      ? "border-[rgba(29,207,207,.25)] bg-[rgba(29,207,207,.10)] text-[rgba(29,207,207,.85)]"
      : tone === "comm"
        ? "border-[rgba(255,153,51,.25)] bg-[rgba(255,153,51,.12)] text-[rgba(255,153,51,.85)]"
        : "border-[rgba(34,197,94,.25)] bg-[rgba(34,197,94,.12)] text-[rgba(34,197,94,.85)]";
  return (
    <span
      className={`inline-flex rounded-sm border px-2 py-1 font-mono text-[8px] tracking-[0.14em] uppercase ${cls}`}
    >
      {children}
    </span>
  );
}

export function StrategyFunnel({ content }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    return attachStrategyFunnelCanvas(c);
  }, []);

  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14 pb-12 md:pb-20">
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <div className="min-w-0">
            <div className="mb-4 font-mono text-[10px] tracking-[0.18em] text-orange-500/70 uppercase">
              {content.leftLabel}
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-[0_18px_55px_rgb(0_0_0/0.35)]">
              <canvas ref={ref} className="block h-[360px] w-full min-w-0 max-w-full" />
            </div>
          </div>

          <div className="min-w-0">
            <SectionIntro
              id={`${content.sectionId}-intent-heading`}
              eyebrow={content.rightLabel}
              eyebrowStyle="dash"
              title={
                <>
                  {content.titleBefore}
                  <br />
                  <span className="text-orange-400">{content.titleEmphasis}</span>
                </>
              }
              lead={content.lead}
            />

            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white/3">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/[0.06]">
                    <th className="px-4 py-3 text-left font-mono text-[9px] tracking-[0.16em] text-orange-400 uppercase">
                      Intent Type
                    </th>
                    <th className="px-4 py-3 text-left font-mono text-[9px] tracking-[0.16em] text-orange-400 uppercase">
                      Example Query
                    </th>
                    <th className="px-4 py-3 text-left font-mono text-[9px] tracking-[0.16em] text-orange-400 uppercase">
                      Audience Stage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.rows.map((r) => (
                    <tr key={r.intent} className="border-t border-white/10">
                      <td className="px-4 py-3 align-top">
                        <IntentBadge tone={r.tone}>{r.intent}</IntentBadge>
                      </td>
                      <td className="px-4 py-3 align-top font-mono text-[12px] italic text-white/70">
                        {r.example}
                      </td>
                      <td className="px-4 py-3 align-top text-[12px] leading-[1.6] text-white/55">
                        {r.stage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <blockquote className="mt-8 rounded-r-lg border-l-[3px] border-sl-saffron bg-sl-saffron/[0.06] py-4 pr-5 pl-5">
              <div className="font-sans text-[17px] font-semibold leading-snug text-sl-text italic">
                {content.howWeUseThis}
              </div>
            </blockquote>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={content.primaryCta.href}
                className="inline-flex items-center justify-center rounded-md bg-orange-400 px-6 py-3 text-[12px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_22px_rgba(255,153,51,.28)] transition-colors hover:bg-[#E68A1F]"
              >
                {content.primaryCta.label}
              </a>
              <a
                href={content.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-md border border-white/10 bg-transparent px-6 py-3 text-[12px] font-semibold tracking-[0.07em] text-white uppercase transition-colors hover:bg-[rgba(16,43,77,.04)]"
              >
                {content.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


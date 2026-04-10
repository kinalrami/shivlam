"use client";

import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { SectionIntro } from "@/components/shared/section-chrome";
import type { MobileServiceContent } from "./content";

type Props = {
  content: MobileServiceContent;
};

export function AppPortfolio({ content }: Props) {
  const { showcase } = content.appPortfolio;

  return (
    <section
      id={showcase.sectionId}
      className="relative scroll-mt-14 overflow-hidden bg-[#060606] pb-12 md:pb-20"
    >
      <div className="relative mx-auto max-w-325 px-5 md:px-12">
        <div className="mb-4 flex flex-col items-start justify-between gap-8 md:mb-6 md:flex-row md:items-end">
          <SectionIntro
            id={showcase.headingId}
            eyebrow={showcase.eyebrow}
            eyebrowStyle="dash"
            title={
              <>
                {showcase.titleLine1}
                <br />
                <span className="text-sl-saffron">{showcase.titleHighlight}</span>
              </>
            }
            lead={null}
            className="mb-0 max-w-[540px] [&_h3]:max-w-[540px]"
          />
          <p className="whitespace-pre-line text-right font-mono text-[11px] leading-loose tracking-[0.12em] text-white/35 md:text-right">
            {showcase.metaLines.join("\n")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.apps.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-7 pb-6 backdrop-blur-2xl transition-[border-color,transform,box-shadow] duration-300 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-orange-400 before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-0.5 hover:border-orange-400/35 hover:shadow-[0_12px_40px_rgb(0_0_0/0.35)] hover:before:opacity-100"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="relative flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#0a1628]">
                  <Image
                    src={app.icon}
                    alt=""
                    width={26}
                    height={26}
                    className="size-[26px]"
                    unoptimized
                  />
                </div>
                <span className="shrink-0 rounded bg-white/[0.06] px-2 py-1 font-mono text-[8px] tracking-[0.18em] text-white/40 uppercase">
                  {app.tag}
                </span>
              </div>
              <h3 className="mb-1.5 font-sans text-lg font-bold text-white">{app.name}</h3>
              <p className="mb-5 text-[13px] leading-relaxed text-white/50">{app.desc}</p>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {app.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[8px] tracking-[0.1em] text-white/45 uppercase"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] text-orange-400 uppercase transition-colors">
                  {app.linkLabel}
                  <MoveUpRight className="size-3 text-orange-400" aria-hidden />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

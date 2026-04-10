"use client";

import Link from "next/link";
import { ArrowRight, Smartphone, Layers, Orbit, Clock, type LucideIcon } from "lucide-react";
import { SectionIntro } from "@/components/shared/section-chrome";
import type { MobileServiceContent, OtherServiceIconKey } from "./content";

const ICONS: Record<OtherServiceIconKey, LucideIcon> = {
  smartphone: Smartphone,
  layers: Layers,
  orbit: Orbit,
  clock: Clock,
};

type Props = {
  content: MobileServiceContent;
};

export function OtherServices({ content }: Props) {
  const s = content.otherServices;

  return (
    <section id={s.sectionId} className="relative overflow-hidden bg-[#060606] scroll-mt-14">
      <div className="relative mx-auto max-w-325 px-5 pb-12 md:pb-20 md:px-12">
        <SectionIntro
          id={s.headingId}
          eyebrow={s.eyebrow}
          eyebrowStyle="dash"
          title={
            <>
              {s.titleBefore}
              <span className="text-orange-400">{s.titleHighlight}</span>
            </>
          }
          lead={s.lead}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {s.items.map((svc) => {
            const Icon = ICONS[svc.icon];
            const { tag, title, desc, href, footerLabel } = svc;
            const external = Boolean(svc.external);
            const card = (
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-6 py-7 backdrop-blur-2xl shadow-[0_20px_60px_rgb(0_0_0/0.45)] transition-[transform,box-shadow,border-color,background] duration-200 hover:-translate-y-1.5 hover:border-orange-400/30 hover:bg-white/5 hover:shadow-[0_30px_90px_rgb(0_0_0/0.6)]">
                <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-400/10 text-orange-400">
                  <Icon className="size-5" aria-hidden />
                </div>
                <span className="inline-flex w-fit rounded-sm border border-orange-400/30 bg-orange-400/[0.07] px-2 py-1 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase">
                  {tag}
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{desc}</p>

                <span className="mt-auto pt-6 font-mono text-[10px] tracking-[0.22em] text-orange-400 uppercase transition-colors group-hover:text-orange-300">
                  {footerLabel}{" "}
                  <ArrowRight className="ml-1 inline-block size-4" aria-hidden />
                </span>
              </div>
            );

            return external ? (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="block h-full"
                aria-label={title}
              >
                {card}
              </a>
            ) : (
              <Link key={title} href={href} className="block h-full" aria-label={title}>
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

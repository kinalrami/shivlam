"use client";

import Link from "next/link";
import type { PortfolioCatKey } from "@/lib/work-portfolio/types";
import { SIDEBAR_CATEGORIES } from "@/lib/work-portfolio/filters";

type Props = {
  active: PortfolioCatKey;
  onSelect: (cat: PortfolioCatKey) => void;
};

export function WorkPortfolioSidebar({ active, onSelect }: Props) {
  const [allRow, ...serviceRows] = SIDEBAR_CATEGORIES;

  return (
    <aside className="sticky top-14 z-20 hidden h-[calc(100vh-3.5rem)] w-[272px] shrink-0 overflow-y-auto border-r border-white/[0.08] bg-[#060606] py-10 pl-10 pr-0 md:block">
      <div className="mb-3 pl-1 font-mono text-[8px] tracking-[0.2em] text-white/35 uppercase">
        Browse by Service
      </div>

      <button
        type="button"
        onClick={() => onSelect(allRow.key)}
        className={`relative mb-0.5 flex w-[calc(100%-24px)] cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors ${
          active === allRow.key
            ? "border-orange-400/22 bg-[#0A1B33] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-l-lg before:bg-orange-400"
            : "border-transparent hover:border-orange-400/14 hover:bg-orange-400/[0.06]"
        }`}
      >
        <span className={`size-2.5 shrink-0 rounded-full ${allRow.dotClass}`} aria-hidden />
        <span
          className={`flex-1 font-mono text-[9px] leading-snug tracking-[0.07em] uppercase ${
            active === allRow.key ? "text-white" : "text-white/90"
          }`}
        >
          {allRow.nameLine1}
        </span>
        <span
          className={`rounded-full px-1.5 py-0.5 font-mono text-[8px] ${
            active === allRow.key
              ? "bg-orange-400/18 text-orange-300"
              : "bg-white/[0.06] text-white/30"
          }`}
        >
          {allRow.count}
        </span>
      </button>

      <div className="my-4 mr-6 h-px bg-white/[0.08]" />
      <div className="mb-3 pl-1 font-mono text-[8px] tracking-[0.2em] text-white/35 uppercase">Services</div>

      <div className="space-y-0">
        {serviceRows.map((row) => {
          const isActive = active === row.key;
          return (
            <div key={row.key}>
              <button
                type="button"
                onClick={() => onSelect(row.key)}
                className={`relative mb-0.5 flex w-[calc(100%-24px)] cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors ${
                  isActive
                    ? "border-orange-400/22 bg-[#0A1B33] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-l-lg before:bg-orange-400"
                    : "border-transparent hover:border-orange-400/14 hover:bg-orange-400/[0.06]"
                }`}
              >
                <span className={`size-2.5 shrink-0 rounded-full ${row.dotClass}`} aria-hidden />
                <span
                  className={`flex min-w-0 flex-1 flex-col font-mono text-[9px] leading-snug tracking-[0.07em] uppercase ${
                    isActive ? "text-white" : "text-white/90"
                  }`}
                >
                  <span>{row.nameLine1}</span>
                  {row.nameLine2 ? (
                    <span className="text-[7px] tracking-[0.04em] text-white/50">{row.nameLine2}</span>
                  ) : null}
                </span>
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[8px] ${
                    isActive
                      ? "bg-orange-400/18 text-orange-300"
                      : "bg-white/[0.06] text-white/30"
                  }`}
                >
                  {row.count}
                </span>
              </button>
              {isActive && row.subItems?.length ? (
                <div className="mb-1 ml-[22px] flex flex-col gap-0.5">
                  {row.subItems.map((line) => (
                    <span
                      key={line}
                      className="font-mono text-[8px] tracking-[0.07em] text-white/40 uppercase"
                    >
                      <span className="text-orange-400/40">└ </span>
                      {line}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="my-6 mr-6 h-px bg-white/[0.08]" />
      <div className="mr-6 rounded-[10px] border border-orange-400/20 bg-[#0A1B33] px-4 py-4 text-center">
        <p className="mb-3 text-xs leading-relaxed text-white/45">Add your project to this portfolio?</p>
        <Link
          href="https://shivlam.com/contact-us/"
          className="inline-block rounded bg-orange-400 px-4 py-2 font-mono text-[8px] tracking-[0.1em] text-white uppercase transition-colors hover:bg-[#E68A1F]"
        >
          Let&apos;s Build →
        </Link>
      </div>
    </aside>
  );
}

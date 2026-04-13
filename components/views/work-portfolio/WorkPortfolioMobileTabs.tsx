"use client";

import type { PortfolioCatKey } from "@/lib/work-portfolio/types";

const TABS: { key: PortfolioCatKey; short: string; dot: string }[] = [
  { key: "all", short: "All Work", dot: "bg-orange-400" },
  { key: "iphone", short: "iPhone & AR/BIM", dot: "bg-[#54C5F8]" },
  { key: "games", short: "Game Dev", dot: "bg-[#AAAAFF]" },
  { key: "web", short: "Web & Design", dot: "bg-[#22c55e]" },
  { key: "brand", short: "Brand Building", dot: "bg-orange-400" },
];

type Props = {
  active: PortfolioCatKey;
  onSelect: (cat: PortfolioCatKey) => void;
};

export function WorkPortfolioMobileTabs({ active, onSelect }: Props) {
  return (
    <div className="sticky top-14 z-30 border-b border-orange-400/15 bg-[#0D2240] md:hidden">
      <div className="flex gap-0 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:h-0">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onSelect(t.key)}
              className={`flex shrink-0 items-center gap-1.5 border-b-2 px-5 py-4 font-mono text-[9px] tracking-[0.1em] uppercase transition-colors ${
                isActive
                  ? "border-orange-400 bg-orange-400/[0.06] text-orange-400"
                  : "border-transparent text-white/35"
              }`}
            >
              <span className={`size-1.5 shrink-0 rounded-full ${t.dot}`} aria-hidden />
              {t.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}

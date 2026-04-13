"use client";

import type { PortfolioCatKey } from "@/lib/work-portfolio/types";
import type { PortfolioMobileTab } from "@/lib/portfolio-shell/sidebar-types";

type Props = {
  tabs: readonly PortfolioMobileTab[];
  active: PortfolioCatKey;
  onSelect: (cat: PortfolioCatKey) => void;
};

export function PortfolioMobileTabs({ tabs, active, onSelect }: Props) {
  return (
    <div className="sticky top-14 z-30 border-b border-orange-400/15 bg-[#0D2240] md:hidden">
      <div className="flex gap-0 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:h-0">
        {tabs.map((t) => {
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
              <span className={`size-1.5 shrink-0 rounded-full ${t.dotClass}`} aria-hidden />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

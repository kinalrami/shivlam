"use client";

import type { PortfolioCatKey } from "@/lib/work-portfolio/types";
import { PORTFOLIO_FILTER_LABELS } from "@/lib/work-portfolio/filters";

type Props = {
  active: Exclude<PortfolioCatKey, "all">;
  onClear: () => void;
};

export function WorkPortfolioFilterBar({ active, onClear }: Props) {
  const meta = PORTFOLIO_FILTER_LABELS[active];

  return (
    <div className="mb-7 flex flex-wrap items-center gap-3 rounded-lg border border-orange-400/18 bg-orange-400/[0.06] px-4 py-3">
      <span className="font-mono text-[8px] tracking-[0.12em] text-white/40 uppercase">Showing</span>
      <span className="font-mono text-[9px] font-medium tracking-[0.1em] text-orange-400">{meta.label}</span>
      <span className="font-mono text-[8px] text-white/40">· {meta.count}</span>
      <button
        type="button"
        onClick={onClear}
        className="ml-auto cursor-pointer rounded border border-white/15 bg-transparent px-2.5 py-1 font-mono text-[8px] tracking-[0.1em] text-white/40 uppercase transition-colors hover:border-orange-400 hover:text-orange-400"
      >
        ✕ Clear
      </button>
    </div>
  );
}

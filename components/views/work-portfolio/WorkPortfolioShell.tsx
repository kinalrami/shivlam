"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioCatKey } from "@/lib/work-portfolio/types";
import { PORTFOLIO_SECTIONS } from "@/lib/work-portfolio/sections";
import { WorkPortfolioHero } from "@/components/views/work-portfolio/WorkPortfolioHero";
import { WorkPortfolioSidebar } from "@/components/views/work-portfolio/WorkPortfolioSidebar";
import { WorkPortfolioMobileTabs } from "@/components/views/work-portfolio/WorkPortfolioMobileTabs";
import { WorkPortfolioFilterBar } from "@/components/views/work-portfolio/WorkPortfolioFilterBar";
import { WorkPortfolioCategorySection } from "@/components/views/work-portfolio/WorkPortfolioCategorySection";
import { WorkPortfolioClientsStrip } from "@/components/views/work-portfolio/WorkPortfolioClientsStrip";
import { WorkPortfolioFinalCta } from "@/components/views/work-portfolio/WorkPortfolioFinalCta";

export function WorkPortfolioShell() {
  const [cat, setCat] = useState<PortfolioCatKey>("all");

  const applyFilter = useCallback((next: PortfolioCatKey) => {
    setCat(next);
    if (typeof window === "undefined") return;
    window.requestAnimationFrame(() => {
      document.getElementById("port-main")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#iphone" || hash === "#games" || hash === "#web" || hash === "#brand") {
      const map: Record<string, PortfolioCatKey> = {
        "#iphone": "iphone",
        "#games": "games",
        "#web": "web",
        "#brand": "brand",
      };
      const key = map[hash];
      if (key) setCat(key);
    }
  }, []);

  return (
    <>
      <WorkPortfolioHero />
      <WorkPortfolioMobileTabs active={cat} onSelect={applyFilter} />
      <div className="mx-auto flex w-full max-w-[1440px] min-w-0">
        <WorkPortfolioSidebar active={cat} onSelect={applyFilter} />
        <main id="port-main" className="min-w-0 flex-1 scroll-mt-28 px-5 py-10 md:px-12 md:py-12">
          {cat !== "all" ? (
            <WorkPortfolioFilterBar active={cat} onClear={() => applyFilter("all")} />
          ) : null}
          {PORTFOLIO_SECTIONS.map((section) => (
            <WorkPortfolioCategorySection
              key={section.sectionId}
              section={section}
              visible={cat === "all" || cat === section.cat}
            />
          ))}
        </main>
      </div>
      <WorkPortfolioClientsStrip />
      <WorkPortfolioFinalCta />
    </>
  );
}

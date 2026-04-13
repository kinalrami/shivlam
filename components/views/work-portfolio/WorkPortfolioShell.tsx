"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioCatKey } from "@/lib/work-portfolio/types";
import { PORTFOLIO_SECTIONS } from "@/lib/work-portfolio/sections";
import { WorkPortfolioHero } from "@/components/views/work-portfolio/WorkPortfolioHero";
import { WorkPortfolioFilterBar } from "@/components/views/work-portfolio/WorkPortfolioFilterBar";
import { WorkPortfolioCategorySection } from "@/components/views/work-portfolio/WorkPortfolioCategorySection";
import { PortfolioMobileTabs } from "@/components/views/portfolio-shared/PortfolioMobileTabs";
import { PortfolioSidebar } from "@/components/views/portfolio-shared/PortfolioSidebar";
import { PortfolioClientsStrip } from "@/components/views/portfolio-shared/PortfolioClientsStrip";
import { PortfolioFinalCta } from "@/components/views/portfolio-shared/PortfolioFinalCta";
import { WORK_PORTFOLIO_MOBILE_TABS, WORK_PORTFOLIO_SIDEBAR_CONFIG } from "@/lib/work-portfolio/shell-ui";

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
      <PortfolioMobileTabs tabs={WORK_PORTFOLIO_MOBILE_TABS} active={cat} onSelect={applyFilter} />
      <div className="mx-auto flex w-full max-w-[1440px] min-w-0">
        <PortfolioSidebar {...WORK_PORTFOLIO_SIDEBAR_CONFIG} active={cat} onSelect={applyFilter} />
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
      <PortfolioClientsStrip />
      <PortfolioFinalCta
        title={
          <>
            Ready to Add Your Project
            <br />
            to This <span className="text-orange-400">Portfolio?</span>
          </>
        }
        description="Let's build something worth showcasing — app, game, website, or brand campaign."
        primary={{ href: "https://shivlam.com/contact-us/", label: "Hire Us Now →", external: true }}
        secondary={{ href: "/about-us", label: "About Shivlam" }}
      />
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioCatKey } from "@/lib/case-studies/types";
import {
  CASE_STUDIES_FILTERED,
  CASE_STUDIES_FILTERED_HEADERS,
  CASE_STUDIES_SECTIONS_FULL,
} from "@/lib/case-studies/data";
import { CASE_STUDIES_MOBILE_TABS, CASE_STUDIES_SIDEBAR_CONFIG } from "@/lib/case-studies/shell-ui";
import { CaseStudiesHero } from "@/components/views/case-studies/CaseStudiesHero";
import { CaseStudiesComingBanner } from "@/components/views/case-studies/CaseStudiesComingBanner";
import { CaseStudiesExpectSection } from "@/components/views/case-studies/CaseStudiesExpectSection";
import { CaseStudiesNotifySection } from "@/components/views/case-studies/CaseStudiesNotifySection";
import { CaseStudiesPlaceholderCard } from "@/components/views/case-studies/CaseStudiesPlaceholderCard";
import { PortfolioMobileTabs } from "@/components/views/portfolio-shared/PortfolioMobileTabs";
import { PortfolioSidebar } from "@/components/views/portfolio-shared/PortfolioSidebar";
import { PortfolioClientsStrip } from "@/components/views/portfolio-shared/PortfolioClientsStrip";
import { PortfolioFinalCta } from "@/components/views/portfolio-shared/PortfolioFinalCta";

export function CaseStudiesShell() {
  const [cat, setCat] = useState<PortfolioCatKey>("all");

  const focusNotifyEmail = useCallback(() => {
    const el = document.getElementById("notify-email");
    if (el) {
      el.focus();
      return;
    }
    setCat("all");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById("notify-email")?.focus();
      });
    });
  }, []);

  const applyFilter = useCallback((next: PortfolioCatKey) => {
    setCat(next);
    if (typeof window === "undefined") return;
    window.requestAnimationFrame(() => {
      document.getElementById("case-studies-main")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      <CaseStudiesHero />
      <PortfolioMobileTabs tabs={CASE_STUDIES_MOBILE_TABS} active={cat} onSelect={applyFilter} />
      <div className="mx-auto flex w-full max-w-[1440px] min-w-0">
        <PortfolioSidebar {...CASE_STUDIES_SIDEBAR_CONFIG} active={cat} onSelect={applyFilter} />
        <main id="case-studies-main" className="min-w-0 flex-1 scroll-mt-28 px-5 py-10 md:px-12 md:py-12">
          {cat === "all" ? (
            <>
              <CaseStudiesComingBanner />
              <CaseStudiesExpectSection />
              <CaseStudiesNotifySection />
              {CASE_STUDIES_SECTIONS_FULL.map((section) => (
                <div key={section.cat} className="mb-16">
                  <div className="mb-2.5 flex items-center gap-3.5">
                    <span
                      className={`font-mono text-[9px] tracking-[0.2em] uppercase ${section.header.titleClassName}`}
                    >
                      {section.header.title}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[8px] ${section.header.badgeClassName}`}
                    >
                      {section.header.badgeText}
                    </span>
                    <div className={`h-px min-w-[40px] flex-1 ${section.header.lineClassName}`} />
                  </div>
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {section.cards.map((card) => (
                      <CaseStudiesPlaceholderCard
                        key={card.id}
                        variant="full"
                        card={card}
                        onNotify={focusNotifyEmail}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="mb-16">
              <div className="mb-2.5 flex items-center gap-3.5">
                <span
                  className={`font-mono text-[9px] tracking-[0.2em] uppercase ${CASE_STUDIES_FILTERED_HEADERS[cat].titleClassName}`}
                >
                  {CASE_STUDIES_FILTERED_HEADERS[cat].title}
                </span>
                <div className={`h-px min-w-[40px] flex-1 ${CASE_STUDIES_FILTERED_HEADERS[cat].lineClassName}`} />
              </div>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {CASE_STUDIES_FILTERED[cat].map((card) => (
                  <CaseStudiesPlaceholderCard
                    key={card.id}
                    variant="filtered"
                    card={card}
                    onNotify={focusNotifyEmail}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <PortfolioClientsStrip />
      <PortfolioFinalCta
        title={
          <>
            Want to Read the <span className="text-orange-400">Full Story</span>
            <br />
            Behind a Project?
          </>
        }
        titleClassName="text-[clamp(1.75rem,4vw,2.125rem)]"
        description="Case studies are coming. In the meantime — explore the live work portfolio or start your own project that might become the next one."
        primary={{ href: "/work-portfolio", label: "View Work Portfolio →" }}
        secondary={{ href: "https://shivlam.com/contact-us/", label: "Start a Project", external: true }}
      />
    </>
  );
}

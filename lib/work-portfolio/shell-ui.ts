import type { PortfolioMobileTab, PortfolioShellSidebarConfig } from "@/lib/portfolio-shell/sidebar-types";
import { SIDEBAR_CATEGORIES } from "@/lib/work-portfolio/filters";

export const WORK_PORTFOLIO_MOBILE_TABS: readonly PortfolioMobileTab[] = [
  { key: "all", label: "All Work", dotClass: "bg-orange-400" },
  { key: "iphone", label: "iPhone & AR/BIM", dotClass: "bg-[#54C5F8]" },
  { key: "games", label: "Game Dev", dotClass: "bg-[#AAAAFF]" },
  { key: "web", label: "Web & Design", dotClass: "bg-[#22c55e]" },
  { key: "brand", label: "Brand Building", dotClass: "bg-orange-400" },
];

function buildWorkPortfolioSidebarConfig(): PortfolioShellSidebarConfig {
  const [allRow, ...serviceRows] = SIDEBAR_CATEGORIES;
  return {
    allLabel: allRow.nameLine1,
    allDotClass: allRow.dotClass,
    allTrailing: { kind: "count", value: allRow.count },
    rows: serviceRows.map((r) => ({
      key: r.key,
      dotClass: r.dotClass,
      line1: r.nameLine1,
      line2: r.nameLine2,
      trailing: { kind: "count" as const, value: r.count },
      subItems: r.subItems,
    })),
    cta: {
      body: "Add your project to this portfolio?",
      href: "https://shivlam.com/contact-us/",
      buttonLabel: "Let's Build →",
    },
  };
}

/** Static sidebar copy + rows derived from `SIDEBAR_CATEGORIES`. */
export const WORK_PORTFOLIO_SIDEBAR_CONFIG: PortfolioShellSidebarConfig = buildWorkPortfolioSidebarConfig();

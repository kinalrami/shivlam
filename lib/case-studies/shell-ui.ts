import type { PortfolioMobileTab, PortfolioShellSidebarConfig } from "@/lib/portfolio-shell/sidebar-types";

export const CASE_STUDIES_MOBILE_TABS: readonly PortfolioMobileTab[] = [
  { key: "all", label: "All", dotClass: "bg-orange-400" },
  { key: "iphone", label: "iPhone & AR", dotClass: "bg-[#54C5F8]" },
  { key: "games", label: "Games", dotClass: "bg-[#AAAAFF]" },
  { key: "web", label: "Web & Design", dotClass: "bg-[#22c55e]" },
  { key: "brand", label: "Brand Building", dotClass: "bg-orange-400" },
];

export const CASE_STUDIES_SIDEBAR_CONFIG: PortfolioShellSidebarConfig = {
  allLabel: "All Case Studies",
  allDotClass: "bg-orange-400",
  allTrailing: { kind: "count", value: "0" },
  rows: [
    {
      key: "iphone",
      dotClass: "bg-[#54C5F8]",
      line1: "iPhone & AR/BIM",
      trailing: { kind: "badge", label: "Soon" },
    },
    {
      key: "games",
      dotClass: "bg-[#AAAAFF]",
      line1: "Game Development",
      trailing: { kind: "badge", label: "Soon" },
    },
    {
      key: "web",
      dotClass: "bg-[#22c55e]",
      line1: "Web & Design",
      trailing: { kind: "badge", label: "Soon" },
    },
    {
      key: "brand",
      dotClass: "bg-orange-400",
      line1: "Brand Building",
      trailing: { kind: "badge", label: "Soon" },
    },
  ],
  linkBeforeCta: { href: "/work-portfolio", label: "View Work Portfolio" },
  cta: {
    body: "Be the first featured case study?",
    href: "https://shivlam.com/contact-us/",
    buttonLabel: "Start a Project →",
  },
};

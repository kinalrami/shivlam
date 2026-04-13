import type { ReactNode } from "react";
import type { PortfolioCatKey } from "@/lib/work-portfolio/types";

export type SidebarAllTrailing =
  | { kind: "count"; value: string }
  | { kind: "badge"; label: string; className?: string };

export type SidebarServiceTrailing =
  | { kind: "count"; value: string }
  | { kind: "badge"; label: string; className?: string };

export type PortfolioShellSidebarConfig = {
  allLabel: string;
  allDotClass: string;
  allTrailing: SidebarAllTrailing;
  rows: readonly {
    key: Exclude<PortfolioCatKey, "all">;
    dotClass: string;
    line1: string;
    line2?: string;
    trailing: SidebarServiceTrailing;
    subItems?: readonly string[];
  }[];
  /** Optional strip above the bottom CTA (e.g. “View Work Portfolio” on case studies). */
  linkBeforeCta?: { href: string; label: string };
  cta: { body: string; href: string; buttonLabel: string };
};

export type PortfolioShellSidebarProps = PortfolioShellSidebarConfig & {
  active: PortfolioCatKey;
  onSelect: (cat: PortfolioCatKey) => void;
};

export type PortfolioMobileTab = {
  key: PortfolioCatKey;
  label: string;
  dotClass: string;
};

export type PortfolioFinalCtaProps = {
  title: ReactNode;
  description: string;
  primary: { href: string; label: string; external?: boolean };
  secondary: { href: string; label: string; external?: boolean };
  /** Optional title size tweak */
  titleClassName?: string;
};

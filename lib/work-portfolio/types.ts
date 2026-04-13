import type { CSSProperties } from "react";

export type PortfolioCatKey = "all" | "iphone" | "games" | "web" | "brand";

export type PreviewKind =
  | "ios"
  | "arbim"
  | "game-shoot"
  | "game-ar"
  | "game-puzzle"
  | "game-runner"
  | "web"
  | "uiux"
  | "seo";

export type PortfolioLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ProjectCardData = {
  id: string;
  preview: { type: PreviewKind; c1: string; c2: string };
  badge: { label: string; style: CSSProperties };
  title: string;
  description: string;
  pills: string[];
  overlay: { primary: PortfolioLink; secondary?: PortfolioLink };
  footerLink?: PortfolioLink;
};

export type PortfolioSubcategory = {
  label: string;
  projects: readonly ProjectCardData[];
};

export type PortfolioSectionData = {
  cat: Exclude<PortfolioCatKey, "all">;
  sectionId: string;
  title: string;
  titleClassName: string;
  countLabel: string;
  countClassName: string;
  lineClassName: string;
  description: string;
  subcategories: readonly PortfolioSubcategory[];
};

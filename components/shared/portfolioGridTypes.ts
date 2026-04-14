export type GamePortfolioCanvasType = "shooter" | "ar" | "puzzle" | "runner" | "trivia" | "spatial";

export type PortfolioGridItemPreview =
  | { kind: "game"; gameType: GamePortfolioCanvasType; color1: string; color2: string }
  | { kind: "web"; webTag: string };

export type PortfolioGridItem = {
  key: string;
  pill: string;
  name: string;
  desc: string;
  href: string;
  linkLabel: string;
  preview: PortfolioGridItemPreview;
};

export type PortfolioGridSectionContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter?: string;
  sideLead: string;
  /** Large screens: web portfolio uses 3, game portfolio uses 4. */
  gridColumns: 3 | 4;
  items: readonly PortfolioGridItem[];
};

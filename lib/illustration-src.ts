export type InsightSvgType = "circuit" | "blueprint" | "pulse";

export type PortfolioAccent = "saffron" | "cyan";

/** Maps data accent to static illustration (cyan uses journal cyan #1dcfcf). */
export function insightThumbSrc(
  svgType: InsightSvgType,
  colorHex: string,
): string {
  const tone =
    colorHex.trim().toLowerCase() === "#1dcfcf" ? "cyan" : "saffron";
  return `/illustrations/insights/${svgType}-${tone}.svg`;
}

export function portfolioThumbSrc(
  pattern: "arc" | "grid" | "wave" | "dots",
  accent: PortfolioAccent,
): string {
  return `/illustrations/portfolio/${pattern}-${accent}.svg`;
}

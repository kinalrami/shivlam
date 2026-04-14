"use client";

import { PortfolioGridSection } from "@/components/shared/PortfolioGridSection";
import type { PortfolioGridItem, PortfolioGridSectionContent } from "@/components/shared/portfolioGridTypes";
import type { WebDevContent } from "./content";
import { useMemo } from "react";

type Props = {
  content: WebDevContent["portfolio"];
};

export function Portfolio({ content }: Props) {
  const gridContent = useMemo<PortfolioGridSectionContent>(
    () => ({
      sectionId: content.sectionId,
      headingId: content.headingId,
      eyebrow: content.eyebrow,
      titleBefore: content.title.before,
      titleHighlight: content.title.highlight,
      titleAfter: content.title.after,
      sideLead: content.sideNote,
      gridColumns: 3,
      items: content.items.map((p): PortfolioGridItem => ({
        key: p.name,
        pill: p.tag,
        name: p.name,
        desc: p.desc,
        href: p.href,
        linkLabel: p.linkLabel,
        preview: { kind: "web", webTag: p.tag },
      })),
    }),
    [content],
  );

  return <PortfolioGridSection content={gridContent} />;
}


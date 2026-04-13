import type { CSSProperties } from "react";
import type { PortfolioCatKey, PreviewKind } from "@/lib/work-portfolio/types";

export type { PortfolioCatKey };

export type CaseStudyCardFull = {
  id: string;
  preview: { type: PreviewKind; c1: string; c2: string };
  cornerTag: { label: string; style: CSSProperties };
  categoryTag: string;
  statusTag: string;
  title: string;
  teaser: string;
  meta: readonly { label: string; value: string }[];
  pills: readonly string[];
};

export type CaseStudyCardShort = {
  id: string;
  preview: { type: PreviewKind; c1: string; c2: string };
  categoryTag: string;
  statusTag: string;
  title: string;
  teaser: string;
  pills: readonly string[];
};

export type CaseStudySectionFull = {
  cat: Exclude<PortfolioCatKey, "all">;
  header: {
    title: string;
    titleClassName: string;
    badgeClassName: string;
    lineClassName: string;
    badgeText: string;
  };
  cards: readonly CaseStudyCardFull[];
};

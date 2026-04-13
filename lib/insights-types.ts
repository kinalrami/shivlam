import type { InsightSvgType } from "@/lib/illustration-src";

export type CodeLineType = "kw" | "fn" | "cm" | "plain";

export type CodeLine = { type: CodeLineType; text: string };

export type InsightCatKey =
  | "strategy"
  | "immersive"
  | "identity"
  | "engineering";

/** Category chip on card — matches editorial palette */
export type InsightCatStyle = "amber" | "cyan" | "purple" | "green";

export type InsightPost = {
  id: string;
  cat: string;
  catKey: InsightCatKey;
  catStyle: InsightCatStyle;
  title: string;
  date: string;
  dateLabel: string;
  read: string;
  excerpt: string;
  code: { lines: CodeLine[] };
  /** Passed to thumb generator — drives cyan vs saffron asset */
  color: string;
  svgType: InsightSvgType;
};

export type InsightFilterCat = "all" | InsightCatKey;

export type InsightFilterOption = {
  key: InsightFilterCat;
  label: string;
};

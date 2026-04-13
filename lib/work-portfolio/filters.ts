import type { PortfolioCatKey } from "./types";

export const PORTFOLIO_FILTER_LABELS: Record<
  Exclude<PortfolioCatKey, "all">,
  { label: string; count: string }
> = {
  iphone: {
    label: "iPhone App Development",
    count: "8 projects — iOS · AR · BIM · visionOS",
  },
  games: {
    label: "Game Development",
    count: "6 projects — Unity · AR · Vision Pro",
  },
  web: {
    label: "Web Design & Development",
    count: "10 projects — Dev + UI/UX",
  },
  brand: {
    label: "Brand Building",
    count: "8 projects — SEO & Marketing",
  },
};

export type SidebarCategoryRow = {
  key: PortfolioCatKey;
  dotClass: string;
  nameLine1: string;
  nameLine2?: string;
  count: string;
  subItems?: readonly string[];
};

export const SIDEBAR_CATEGORIES: readonly SidebarCategoryRow[] = [
  {
    key: "all",
    dotClass: "bg-sl-saffron",
    nameLine1: "All Work",
    count: "20+",
  },
  {
    key: "iphone",
    dotClass: "bg-[#54C5F8]",
    nameLine1: "iPhone App Dev",
    nameLine2: "incl. AR · BIM · visionOS",
    count: "8",
    subItems: [
      "Native iOS · Swift",
      "ARKit · LiDAR · RealityKit",
      "BIM · IFC · 3D Recon",
      "visionOS Spatial",
    ],
  },
  {
    key: "games",
    dotClass: "bg-[#AAAAFF]",
    nameLine1: "Game Development",
    count: "6",
    subItems: ["Unity · Mobile Games", "AR Game Dev", "Vision Pro Games"],
  },
  {
    key: "web",
    dotClass: "bg-[#22c55e]",
    nameLine1: "Web Design &",
    nameLine2: "Development",
    count: "10",
    subItems: ["Laravel · WordPress", "React · Next.js", "UI/UX · Figma"],
  },
  {
    key: "brand",
    dotClass: "bg-sl-saffron",
    nameLine1: "Brand Building",
    nameLine2: "incl. SEO & Marketing",
    count: "8",
    subItems: ["Technical SEO", "Content Marketing", "Digital Marketing"],
  },
];

import type { Metadata } from "next";
import { WorkPortfolioShell } from "@/components/views/work-portfolio/WorkPortfolioShell";

export const metadata: Metadata = {
  title: "Work Portfolio — Shivlam | iOS Apps, Games, Web Design & Brand Building",
  description:
    "Explore Shivlam's complete work portfolio — iPhone & AR/BIM iOS apps, Unity games, web design & development, and brand building & SEO campaigns delivered across 5+ countries.",
  openGraph: {
    title: "Work Portfolio — Shivlam",
    description:
      "iOS apps, AR/BIM tools, Unity games, web design, and brand-building campaigns — shipped for clients across 5+ countries.",
  },
};

export default function WorkPortfolioPage() {
  return <WorkPortfolioShell />;
}

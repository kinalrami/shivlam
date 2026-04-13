import type { Metadata } from "next";
import { CaseStudiesShell } from "@/components/views/case-studies/CaseStudiesShell";

export const metadata: Metadata = {
  title: "Case Studies — Shivlam | In-Depth Project Stories Coming Soon",
  description:
    "Shivlam case studies — deep-dives into iOS app, game, web, and brand-building projects. Coming soon. Explore our work portfolio in the meantime.",
  openGraph: {
    title: "Case Studies — Shivlam",
    description:
      "Deep-dives into iOS, games, web, and brand projects — coming soon. Browse the work portfolio for live projects.",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesShell />;
}

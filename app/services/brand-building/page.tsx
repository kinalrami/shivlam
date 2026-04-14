import type { Metadata } from "next";
import Landing from "@/components/views/brand-building/Landing";
import { BRAND_BUILDING_CONTENT } from "@/components/views/brand-building/content";

export const metadata: Metadata = {
  title: "Brand Building Services — Shivlam | SEO, ASO, Content, Ads",
  description:
    "Brand building services focused on growth: SEO, ASO, content, social, and performance ads to increase reach, trust, and conversions.",
  alternates: {
    canonical: "https://shivlam.vercel.app/services/brand-building",
  },
};

export default function BrandBuildingPage() {
  return (
    <main className="relative z-10 min-h-0 flex-1">
      <Landing content={BRAND_BUILDING_CONTENT} />
    </main>
  );
}


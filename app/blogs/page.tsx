import type { Metadata } from "next";
import Canvas from "@/components/views/home/Canvas";
import { BlogHero } from "@/components/views/blogs/BlogHero";
import { BlogNewsletter } from "@/components/views/blogs/BlogNewsletter";
import { BlogInsightsTrendsSection } from "@/components/shared/InsightsTrendsSection";
import { Marquee } from "@/components/shared/Marquee";

export const metadata: Metadata = {
  title: "Blog | Shivlam — Engineering, AR, Brand as Code",
  description:
    "Technical journals from Shivlam — iOS engineering, AR/BIM systems, Unity game dev, web architecture, and brand strategy.",
};

const CLIENTS: readonly string[] = [
  "DeliverEnd",
  "Plinth",
  "Soma NPT",
  "SwadeshotSav",
  "Urban Rural",
  "SM-PG",
  "GiftCityAdvisor",
  "Ecovance",
  "QuizBuzz",
  "Gifta",
  "Jadeblue",
  "Polaris Academy",
];

export default function BlogsPage() {
  return (
    <>
      <Canvas />
      <div className="relative z-10 min-h-0 flex-1 overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
        <BlogHero />
        <BlogInsightsTrendsSection />
        <BlogNewsletter />
        <Marquee
          items={CLIENTS}
          repeat={2}
          className="border-t border-white/5 bg-[#0D2240] py-4"
        />
      </div>
    </>
  );
}

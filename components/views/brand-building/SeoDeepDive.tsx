"use client";

import { useEffect, useRef } from "react";
import { ArShowcaseSection } from "@/components/shared/ArShowcaseSection";
import type { BrandBuildingContent } from "./content";
import { attachSeoCanvas } from "./seoCanvas";

type Props = {
  content: BrandBuildingContent["seoDeepDive"];
};

function DotIcon({ tone }: { tone: "orange" | "cyan" | "green" }) {
  const c = tone === "cyan" ? "#1DCFCF" : tone === "green" ? "#22c55e" : "#FF9933";
  return <span className="block size-2 rounded-full" style={{ background: c }} aria-hidden />;
}

function SeoCanvasHost() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    return attachSeoCanvas(c);
  }, []);
  return <canvas ref={ref} className="block h-[400px] w-full min-w-0 max-w-full" aria-hidden />;
}

export function SeoDeepDive({ content }: Props) {
  const visual = (
    <div className="overflow-hidden rounded-[10px] border border-white/10 bg-[#080818] shadow-[0_18px_55px_rgba(0,0,0,.35)]">
      <SeoCanvasHost />
    </div>
  );

  return (
    <ArShowcaseSection
      sectionId={content.sectionId}
      headingId={content.headingId}
      eyebrow={content.eyebrow}
      titleLines={[
        [
          { text: content.title.before },
          { text: content.title.highlight, emphasis: true },
          { text: content.title.after ?? "" },
        ],
      ]}
      description={content.lead}
      visual={visual}
      visualPosition={content.visualPosition}
      features={content.features.map((f) => ({
        key: f.title,
        title: f.title,
        desc: f.desc,
        icon: <DotIcon tone={f.tone} />,
        iconWrapClass: "border-none",
      }))}
      pillsLabel={
        <div className="font-mono text-[8px] tracking-[0.15em] text-[rgba(255,153,51,.6)] uppercase">
          SEO SPECIALISATIONS
        </div>
      }
      pills={content.pills.map((p) => ({ label: p, variant: "orange" }))}
      primaryCta={content.primaryCta}
      secondaryCta={content.secondaryCta}
      featureTheme="dark"
    />
  );
}


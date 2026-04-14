"use client";

import { MidCtaSection } from "@/components/shared/MidCtaSection";

type Props = {
  content: {
    titleBefore: string;
    titleHighlight: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
};

export function GameMidCta({ content }: Props) {
  return <MidCtaSection sectionId="game-mid-cta" content={content} />;
}


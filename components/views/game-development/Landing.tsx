"use client";

import { Marquee } from "@/components/shared/Marquee";
import ContactForm from "@/components/views/home/ContactForm";
import type { GameDevContent } from "./content";
import { Hero } from "./Hero";
import { PortfolioCta } from "./PortfolioCta";
import { FinalCta } from "@/components/views/web-development/FinalCta";

type Props = {
  content: GameDevContent;
};

export default function Landing({ content }: Props) {
  return (
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <Hero content={content.hero} />
      <Marquee items={content.marquee} />
      <PortfolioCta content={content.portfolioCta} />
      <FinalCta content={content.finalCta} />
      <ContactForm />
    </div>
  );
}


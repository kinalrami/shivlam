"use client";

import { Hero } from "./Hero";
import { Mission } from "./Mission";
import { Story } from "./Story";
import { Values } from "./Values";
import { Shivlam } from "./Shivlam";
import { Technology } from "./Technology";
import { Cta } from "./Cta";
import { RevealGroup } from "./RevealGroup";

export default function AboutUsPage() {
  return (
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <RevealGroup />
      <Hero />
      <Mission />
      <Story />
      <Values />
      <Shivlam />
      <Technology />
      <Cta />
    </div>
  );
}

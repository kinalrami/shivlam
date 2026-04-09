"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/views/ar-vr-solution/Hero";
import TechCore from "@/components/views/ar-vr-solution/TechCore";
import MidCta from "@/components/views/ar-vr-solution/MidCta";
import UseCases from "@/components/views/ar-vr-solution/UseCases";
import Identity from "@/components/views/ar-vr-solution/Identity";
import { attachHeroBgParticles } from "@/components/views/ar-bim/landingCanvas";
import { attachHeroBgParticles as attachMidCtaParticles } from "@/components/views/ar-bim/landingCanvas";
import {
  attachArVrHero3d,
  attachArVrTechCoreCanvas,
} from "@/components/views/ar-vr-solution/arvrCanvas";
import { Marquee } from "@/components/shared/Marquee";
import { ARVR_MARQUEE_ITEMS } from "@/components/views/ar-vr-solution/constants";

export default function Landing() {
  const heroBgRef = useRef<HTMLCanvasElement>(null);
  const heroLidarRef = useRef<HTMLCanvasElement>(null);
  const techCvRef = useRef<HTMLCanvasElement>(null);
  const midCvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = heroBgRef.current;
    if (!c) return;
    return attachHeroBgParticles(c);
  }, []);

  useEffect(() => {
    const c = heroLidarRef.current;
    if (!c) return;
    return attachArVrHero3d(c);
  }, []);

  useEffect(() => {
    const c = techCvRef.current;
    if (!c) return;
    return attachArVrTechCoreCanvas(c);
  }, []);

  useEffect(() => {
    const c = midCvRef.current;
    if (!c) return;
    // Reuse the same particle canvas treatment as other service mid-CTAs.
    return attachMidCtaParticles(c);
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <Hero heroBgRef={heroBgRef} heroLidarRef={heroLidarRef} />
      <Marquee items={ARVR_MARQUEE_ITEMS} />
      <TechCore techCvRef={techCvRef} />
      <MidCta midCvRef={midCvRef} />
      <UseCases />
      <Identity />
    </div>
  );
}


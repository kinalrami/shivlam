"use client";

import { useEffect, useRef } from "react";
import Hero from "./Hero";
import Process from "./Process";
import MidCta from "./MidCta";
import Analytics from "./Analytics";
import Identity from "./Identity";
import { attachHeroBgParticles, attachMidCtaParticles } from "@/components/views/ar-bim/landingCanvas";
import {
  attachFloorPlanCanvas,
  attachProcessCanvas,
  attachReconHeroLidar,
} from "./reconCanvas";
import ContactForm from "../home/ContactForm";

export default function Landing() {
  const heroBgRef = useRef<HTMLCanvasElement>(null);
  const heroLidarRef = useRef<HTMLCanvasElement>(null);
  const processCvRef = useRef<HTMLCanvasElement>(null);
  const midCvRef = useRef<HTMLCanvasElement>(null);
  const floorCvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = heroBgRef.current;
    if (!c) return;
    return attachHeroBgParticles(c);
  }, []);
  useEffect(() => {
    const c = heroLidarRef.current;
    if (!c) return;
    return attachReconHeroLidar(c);
  }, []);
  useEffect(() => {
    const c = processCvRef.current;
    if (!c) return;
    return attachProcessCanvas(c);
  }, []);
  useEffect(() => {
    const c = midCvRef.current;
    if (!c) return;
    return attachMidCtaParticles(c);
  }, []);
  useEffect(() => {
    const c = floorCvRef.current;
    if (!c) return;
    return attachFloorPlanCanvas(c);
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <Hero heroBgRef={heroBgRef} heroLidarRef={heroLidarRef} />
      <Process processCvRef={processCvRef} />
      <MidCta midCvRef={midCvRef} />
      <Analytics floorCvRef={floorCvRef} />
      <Identity />
      <ContactForm />
    </div>
  );
}

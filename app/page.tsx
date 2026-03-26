"use client";

import HeroCanvas from "@/components/HeroCanvas";
import Hero from "@/components/Hero";
import TechStackMarquee from "@/components/TechStackMarquee";
import ProcessRoadmap from "@/components/ProcessRoadmap";

export default function Home() {
  return (
    <>
      <HeroCanvas />
      <Hero />
      <TechStackMarquee speedSeconds={10} />
      <ProcessRoadmap />
    </>
  );
}

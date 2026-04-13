"use client";

import Canvas from "@/components/views/home/Canvas";
import Hero from "@/components/views/home/Hero";
import AboutUs from "@/components/views/home/AboutUs";
import CtaBanner from "@/components/views/home/CtaBanner";
import Services from "@/components/views/home/Services";
import Technologies from "@/components/views/home/Technologies";
import ProcessRoadmap from "@/components/views/home/ProcessRoadmap";
import Feedback from "@/components/views/home/Feedback";
import WorkPortfolio from "@/components/views/home/WorkPortfolio";
import { HomeInsightsTrendsSection } from "@/components/shared/InsightsTrendsSection";
import ContactForm from "@/components/views/home/ContactForm";

export default function Home() {
  return (
    <>
      <Canvas />
      <Hero />
      <AboutUs />
      <CtaBanner />
      <Services />
      <Technologies speedSeconds={10} />
      <ProcessRoadmap />
      <Feedback />
      <WorkPortfolio />
      <HomeInsightsTrendsSection />
      <ContactForm />
    </>
  );
}

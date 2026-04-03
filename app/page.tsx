"use client";

import Canvas from "@/components/views/home/Canvas";
import Hero from "@/components/views/home/Hero";
import AboutUs from "@/components/views/home/AboutUs";
import Services from "@/components/views/home/Services";
import Technologies from "@/components/views/home/Technologies";
import ProcessRoadmap from "@/components/views/home/ProcessRoadmap";
import Feedback from "@/components/views/home/Feedback";
import WorkPortfolio from "@/components/views/home/WorkPortfolio";
import InsightsTrends from "@/components/views/home/InsightsTrends";
import ContactForm from "@/components/views/home/ContactForm";

export default function Home() {
  return (
    <>
      <Canvas />
      <Hero />
      <AboutUs />
      <Services />
      <Technologies speedSeconds={10} />
      <ProcessRoadmap />
      <Feedback />
      <WorkPortfolio />
      <InsightsTrends />
      <ContactForm />
    </>
  );
}

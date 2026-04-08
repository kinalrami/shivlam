"use client";

import { Shield, Smartphone, Boxes, Search, Zap, Users } from "lucide-react";
import { NumberedCardsGrid } from "@/components/shared/NumberedCardsGrid";
import { SectionIntro } from "@/components/shared/section-chrome";

const advantages = [
  {
    num: "01",
    title: "Native iOS Performance",
    desc: "Built entirely in Swift and SwiftUI — apps that feel and perform exactly as Apple intended. Zero compromises on speed, responsiveness, or platform integration.",
    tag: "SWIFT · SWIFTUI",
    Icon: Shield,
  },
  {
    num: "02",
    title: "App Store Launch Ready",
    desc: "From concept to App Store approval — we handle metadata, screenshots, compliance, and review processes so your launch is smooth, professional, and on schedule.",
    tag: "APP STORE OPTIMIZED",
    Icon: Smartphone,
  },
  {
    num: "03",
    title: "Scalable Architecture",
    desc: "Clean, modular codebases designed to grow with your business. Whether you're serving 100 or 1 million users, our architecture scales without painful rewrites.",
    tag: "CLEAN ARCHITECTURE",
    Icon: Boxes,
  },
  {
    num: "04",
    title: "UX-First Design",
    desc: "Every tap, swipe, and transition is meticulously crafted to Human Interface Guidelines. Apps that delight users from the first launch to daily use.",
    tag: "HIG COMPLIANT",
    Icon: Search,
  },
  {
    num: "05",
    title: "ARKit & CoreML Integration",
    desc: "Advanced capabilities baked in — augmented reality, on-device machine learning, LiDAR scanning, and real-time computer vision for cutting-edge iOS experiences.",
    tag: "ARKIT · COREML",
    Icon: Zap,
  },
  {
    num: "06",
    title: "Dedicated Team Model",
    desc: "A dedicated iOS developer, designer, and QA tester assigned to your project from kickoff to launch. Direct communication, no middlemen, full accountability.",
    tag: "DEDICATED TEAM",
    Icon: Users,
  },
] as const;

export function Advantages() {
  return (
    <section id="adv" className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 pb-12 md:pb-20 md:px-12">
        <SectionIntro
          id="adv"
          eyebrow="Advantages"
          eyebrowStyle="dash"
          title={
            <>
              Advantage of Our Best
              <br />
              <span className="text-sl-saffron">iPhone App Development Services.</span>
            </>
          }
          lead="We hold a strong belief in operating in a manner that mirrors the core principles of our product. Our commitment is to not only fulfill our commitments but also to go above and beyond."
        />

        <div className="mt-14">
          <NumberedCardsGrid
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            items={advantages.map(({ num, title, desc, tag, Icon }) => ({
              num,
              title,
              desc,
              tag,
              icon: <Icon className="size-6 text-orange-400" aria-hidden />,
            }))}
          />
        </div>
      </div>
    </section>
  );
}


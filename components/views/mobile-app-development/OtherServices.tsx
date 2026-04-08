"use client";

import Link from "next/link";
import { ArrowRight, Smartphone, Layers, Orbit, Clock } from "lucide-react";
import { SectionIntro } from "@/components/shared/section-chrome";

const services = [
  {
    tag: "MOBILE",
    title: "Android App Development",
    desc: "Native Android apps in Kotlin and Java. From Material Design to Play Store submission — full-cycle Android development with Shivlam's engineering rigour.",
    href: "/services/android-app-development",
    Icon: Smartphone,
  },
  {
    tag: "CROSS-PLATFORM",
    title: "Flutter App Development",
    desc: "One codebase, every platform. Flutter apps that look and perform natively on iOS, Android, web, and desktop — with Shivlam's pixel-perfect execution.",
    href: "/services/flutter-app-development",
    Icon: Layers,
  },
  {
    tag: "IMMERSIVE",
    title: "AR/VR App Development",
    desc: "Augmented and virtual reality experiences built with ARKit, Unity, and RealityKit. From spatial computing to LiDAR-powered construction tools — we've shipped it.",
    href: "https://shivlam.com/augmented-reality-app-development-ar-solutions-experts/",
    external: true,
    Icon: Orbit,
  },
  {
    tag: "SPATIAL",
    title: "visionOS App Development",
    desc: "Apple Vision Pro development with SwiftUI and RealityKit. Spatial apps that define the next frontier of human-computer interaction — built by Shivlam.",
    href: "https://shivlam.com/visionos-app-development-company/",
    external: true,
    Icon: Clock,
  },
] as const;

export function OtherServices() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#060606] scroll-mt-14">
      <div className="relative mx-auto max-w-325 px-5 md:pb-8 md:px-12">
        <SectionIntro
          id="explore-more-services"
          eyebrow="EXPLORE MORE SERVICES"
          eyebrowStyle="dash"
          title={
            <>
              Seeking a <span className="text-orange-400">Deeper Connection?</span>
            </>
          }
          lead="Our services include Android, Flutter, AR/VR, and VisionOS app development. Let&apos;s
              bring your ideas to life."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((svc) => {
            const { tag, title, desc, href, Icon } = svc;
            const external = "external" in svc && Boolean(svc.external);
            const card = (
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-6 py-7 backdrop-blur-2xl shadow-[0_20px_60px_rgb(0_0_0/0.45)] transition-[transform,box-shadow,border-color,background] duration-200 hover:-translate-y-1.5 hover:border-orange-400/30 hover:bg-white/5 hover:shadow-[0_30px_90px_rgb(0_0_0/0.6)]">
                <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-400/10 text-orange-400">
                  <Icon className="size-5" aria-hidden />
                </div>
                <span className="inline-flex w-fit rounded-sm border border-orange-400/30 bg-orange-400/[0.07] px-2 py-1 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase">
                  {tag}
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{desc}</p>

                <span className="mt-auto pt-6 font-mono text-[10px] tracking-[0.22em] text-orange-400 uppercase transition-colors group-hover:text-orange-300">
                  {tag === "MOBILE"
                    ? "Android Service"
                    : tag === "CROSS-PLATFORM"
                      ? "Flutter Service"
                      : tag === "IMMERSIVE"
                        ? "AR/VR Service"
                        : "visionOS Service"}{" "}
                  <ArrowRight className="ml-1 inline-block size-4" aria-hidden />
                </span>
              </div>
            );

            return external ? (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="block h-full"
                aria-label={title}
              >
                {card}
              </a>
            ) : (
              <Link key={title} href={href} className="block h-full" aria-label={title}>
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}


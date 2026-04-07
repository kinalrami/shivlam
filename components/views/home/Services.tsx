"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import Link from "next/link";
import { Code2, Gamepad2, Globe, Sparkles } from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  meta: string;
};

const services: Service[] = [
  {
    title: "Mobile App Dev",
    description: "Scalable architecture cross-platform iOS and Android applications with high-performance and smooth UX.",
    icon: <Code2 className="size-5" aria-hidden />,
    href: "https://shivlam.com/mobile-app-development/",
    meta: "Swift • ARKit • LiDAR",
  },
  {
    title: "Web Dev",
    description: "Enterprise-grade, high-speed, high-security, and global optimised custom Full-Stack ecosystems.",
    icon: <Globe className="size-5" aria-hidden />,
    href: "https://shivlam.com/custom-web-development-services/",
    meta: "Next.js • Node.js • AWS",
  },
  {
    title: "Brand Building",
    description: "Digital Growth plans and identity systems that are data-driven and that are crafted to conquer the modern online market.",
    icon: <Sparkles className="size-5" aria-hidden />,
    href: "/",
    meta: "Design • Motion • Story",
  },
  {
    title: "Game Development",
    description:
      "Unity based game development for the PC, mobile device and AR.",
    icon: <Gamepad2 className="size-5" aria-hidden />,
    href: "/",
    meta: "Unity • PC • Mobile • AR",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="power-trio-heading"
      className="relative scroll-mt-24 pb-12 md:pb-20"
    >
      <div className="mx-auto max-w-325 px-5 md:px-12">
      <SectionIntro
        id="power-trio-heading"
        eyebrow="Services"
        lead="Quick navigation to the core pillars we ship best."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-6 py-7 backdrop-blur-2xl transition-[transform,box-shadow,border-color] duration-200 will-change-transform hover:-translate-y-1.5 hover:shadow-2xl group-hover:border-white/20">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          boxShadow:
            "0 0 0 2px color-mix(in srgb, var(--sl-saffron) 95%, transparent), 0 0 38px color-mix(in srgb, var(--sl-saffron) 45%, transparent), 0 0 130px color-mix(in srgb, var(--sl-saffron) 22%, transparent)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-70 mask-[radial-gradient(60%_55%_at_50%_35%,black,transparent)]"
        aria-hidden
      >
        <div className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-sl-cyan/10 blur-2xl" />
        <div className="absolute -bottom-28 -right-24 h-64 w-64 rounded-full bg-sl-cyan-2/10 blur-2xl" />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col gap-5">
        <div className="min-w-0">
          <h3 className="font-sans text-2xl font-semibold tracking-tight text-white">
            {service.title}
          </h3>
          <p className="mt-3 max-w-xl font-sans text-base font-light leading-relaxed text-gray-400">
            {service.description}
          </p>
        </div>

        <div className="relative mt-auto flex items-center justify-between pt-6">
        {service.href ? (
          <Link
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-gray-400 transition-colors group-hover:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sl-saffron/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label={`${service.title} — Explore`}
          >
            Explore →
          </Link>
        ) : (
          <span className="font-mono text-sm text-gray-400 transition-colors group-hover:text-white">
            Explore →
          </span>
        )}
        <span className="h-px w-24 bg-linear-to-r from-transparent via-white/15 to-transparent" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ boxShadow: "0 0 0 2px rgb(255 255 255 / 0.08) inset" }}
        aria-hidden
      />
    </div>
  );
}

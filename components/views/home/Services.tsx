"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import Link from "next/link";
import { Code2, Globe, Sparkles } from "lucide-react";

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
    description: "iOS-first builds with strong architecture and clean UX.",
    icon: <Code2 className="size-5" aria-hidden />,
    href: "https://shivlam.com/mobile-app-development/",
    meta: "Swift • ARKit • LiDAR",
  },
  {
    title: "Web Dev",
    description: "Modern dashboards and platforms that stay fast at scale.",
    icon: <Globe className="size-5" aria-hidden />,
    href: "https://shivlam.com/custom-web-development-services/",
    meta: "Next.js • Node.js • AWS",
  },
  {
    title: "Brand Building",
    description: "Identity systems and product polish that earn trust.",
    icon: <Sparkles className="size-5" aria-hidden />,
    href: "/",
    meta: "Design • Motion • Story",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="power-trio-heading"
      className="relative scroll-mt-24 px-12 pb-12 md:pb-20"
    >
      <SectionIntro
        id="power-trio-heading"
        eyebrow="Services"
        lead="Quick navigation to the three core pillars we ship best."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-6 py-7 backdrop-blur-2xl transition-[transform,box-shadow,border-color] duration-200 will-change-transform hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_18px_70px_rgba(0,0,0,0.55)] group-hover:border-white/20">
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

      <div className="relative flex items-start justify-between gap-5">
        <div className="min-w-0">
          <h3 className="font-sans text-2xl font-semibold tracking-tight text-white">
            {service.title}
          </h3>
          <p className="mt-3 max-w-[42ch] font-sans text-base font-light leading-relaxed text-gray-400">
            {service.description}
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex items-center justify-between">
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

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ boxShadow: "0 0 0 2px rgb(255 255 255 / 0.08) inset" }}
        aria-hidden
      />
    </div>
  );
}

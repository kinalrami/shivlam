"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { attachHeroBgParticles } from "@/components/views/ar-bim/landingCanvas";

type QuickCard = {
  label: string;
  value: string;
  sub: string;
  icon: string;
  href?: string;
};

const QUICK_CARDS: QuickCard[] = [
  {
    label: "EMAIL US DIRECTLY",
    value: "hello@shivlam.com",
    sub: "General inquiries & early access",
    icon: "✉",
    href: "mailto:hello@shivlam.com",
  },
  {
    label: "PRODUCT & DEMO REQUESTS",
    value: "ar@shivlam.com",
    sub: "Site demos, partnerships & AR BIM tech",
    icon: "◎",
    href: "mailto:ar@shivlam.com",
  },
  {
    label: "BUILT BY SHIVLAM",
    value: "www.shivlam.com",
    sub: "See our portfolio & other products",
    icon: "⊞",
    href: "https://www.shivlam.com",
  },
  {
    label: "HEADQUARTERED IN",
    value: "Bharat, India",
    sub: "Serving construction teams globally",
    icon: "📍",
  },
];

export function Hero() {
  const heroBgRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = heroBgRef.current;
    if (!c) return;
    return attachHeroBgParticles(c);
  }, []);

  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="relative flex min-h-[72vh] scroll-mt-14 items-center overflow-hidden bg-[#060606] md:min-h-screen"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--sl-cyan) 16%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--sl-line) 55%, transparent) 1px, transparent 1px)`,
          backgroundSize: "58px 58px",
        }}
        aria-hidden
      />

      <canvas
        ref={heroBgRef}
        className="absolute inset-0 z-1 h-full w-full"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-325 px-5 pt-[clamp(4.5rem,10vh,6.5rem)] pb-16 md:px-12">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-14">
          <div className="max-w-225 w-full">
            <nav
              data-contact-reveal
              className="mb-7 flex items-center gap-2 font-mono text-[9px] tracking-[0.14em] text-white/22 uppercase"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="text-orange-400/55 transition-colors hover:text-orange-400"
              >
                Home
              </Link>
              <span aria-hidden className="text-white/22">
                ›
              </span>
              <span aria-current="page" className="text-white/22">
                Contact
              </span>
            </nav>

            <div
              data-contact-reveal
              data-contact-delay="1"
              className="mb-6 inline-flex items-center gap-2 rounded-sm border border-orange-400/35 bg-orange-400/[0.07] px-3 py-1.5 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase"
            >
              <span
                className="size-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.55)] animate-[arbim-landing-bpulse_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
                aria-hidden
              />
              LET&apos;S BUILD SOMETHING TOGETHER
            </div>

            <h1
              id="contact-hero-heading"
              data-contact-reveal
              data-contact-delay="2"
              className="mb-5 font-sans text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.96] font-extrabold tracking-[-0.035em] text-white"
            >
              Talk to the <span className="text-orange-400">DeltaARBIM</span>
              <br />
              team.
            </h1>

            <p
              data-contact-reveal
              data-contact-delay="3"
              className="max-w-2xl font-sans font-light leading-relaxed text-grey-400"
            >
              Whether you&apos;re a general contractor, MEP engineer, project owner,
              or developer — tell us what&apos;s happening on your site. We&apos;ll
              show you what AR BIM can do for it.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="grid gap-3">
              {QUICK_CARDS.map((c) => {
                const card = (
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-2xl transition-[border-color,transform] hover:border-orange-400/30 hover:translate-x-1">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-400/10 text-base text-orange-400">
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] tracking-[0.18em] text-orange-400 uppercase">
                        {c.label}
                      </div>
                      <div className="mt-1 font-sans text-sm font-semibold text-white">
                        {c.value}
                      </div>
                      <div className="mt-0.5 font-sans text-xs text-white/45">
                        {c.sub}
                      </div>
                    </div>
                  </div>
                );

                if (!c.href) return <div key={c.label}>{card}</div>;

                const isExternal = c.href.startsWith("http");
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="block focus:outline-hidden"
                  >
                    {card}
                  </a>
                );
              })}
            </div>

            <div className="mt-4 inline-flex items-center gap-2 px-4 py-3 font-mono text-[10px] tracking-[0.12em] text-white/28 uppercase ">
              <span
                className="size-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.65)] animate-[arbim-landing-bpulse_1.8s_ease-in-out_infinite] motion-reduce:animate-none"
                aria-hidden
              />
              Typical response time: within 24 hours
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-px w-full bg-[color-mix(in_srgb,var(--sl-cyan)_18%,transparent)]"
        aria-hidden
      />
    </section>
  );
}


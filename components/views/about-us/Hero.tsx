"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  attachHeroArCanvas,
  attachHeroBgParticles,
} from "@/components/views/ar-bim/landingCanvas";

export function Hero() {
  const heroBgRef = useRef<HTMLCanvasElement>(null);
  const heroArRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = heroBgRef.current;
    if (!c) return;
    return attachHeroBgParticles(c);
  }, []);
  useEffect(() => {
    const c = heroArRef.current;
    if (!c) return;
    return attachHeroArCanvas(c);
  }, []);

  // Hero — same background particle canvas as /services/ar-bim
  return (
    <section
      aria-label="About DeltaARBIM"
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
        id="about-hero-bg-canvas"
        ref={heroBgRef}
        className="absolute inset-0 z-1 h-full w-full"
        aria-hidden
      />
      <div className="relative z-10 mx-auto grid max-w-325 items-center gap-0 px-5 pt-[clamp(4.5rem,10vh,6.5rem)] pb-16 md:grid-cols-2 lg:gap-12 md:px-12">
        <div className="max-w-225 w-full">
          <nav
            data-about-reveal
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
              About Us
            </span>
          </nav>
          <div
            data-about-reveal
            data-about-delay="1"
            className="mb-6 inline-flex items-center gap-2 rounded-sm border border-orange-400/35 bg-orange-400/[0.07] px-3 py-1.5 font-mono text-[9px] tracking-[0.22em] text-orange-400 uppercase"
          >
            <span
              className="size-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_8px_var(--orange-400)] animate-[arbim-landing-bpulse_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
              aria-hidden
            />
            OUR STORY — BUILT IN BHARAT
          </div>
          <h1
            data-about-reveal
            data-about-delay="2"
            className="mb-5 font-sans text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.96] font-extrabold tracking-[-0.035em] text-white"
          >
            We build the <span className="text-orange-400">bridge </span><br />
            between design<br /> and reality.
          </h1>
          <p
            data-about-reveal
            data-about-delay="3"
            className="max-w-2xl font-sans font-light leading-relaxed text-grey-400"
          >
            DeltaARBIM is an AR-powered BIM intelligence platform built by Shivlam —
            a team of engineers who spent a decade in corporate construction tech
            before deciding to build something better.
          </p>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-px w-full bg-[color-mix(in_srgb,var(--sl-cyan)_16%,transparent)]"
        aria-hidden
      />
    </section>
  );
}

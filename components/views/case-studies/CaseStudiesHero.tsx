"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import { attachHeroBgParticles } from "@/components/views/ar-bim/landingCanvas";
import { CASE_STUDIES_HERO, CASE_STUDIES_PROGRESS_ROWS } from "@/lib/case-studies/hero";
import { CaseStudiesHeroMiniCanvas } from "@/components/views/case-studies/CaseStudiesHeroMiniCanvas";

type HeroMiniVariant = "ios" | "game" | "web";

const HERO_MINI_PREVIEW_BADGE = {
  writing: "border-orange-400/30 bg-orange-400/15 text-orange-300/90",
  soon: "border-white/10 bg-white/[0.05] text-white/30",
} as const;

const HERO_MINI_PREVIEWS = [
  {
    id: "deliverend",
    variant: "ios" satisfies HeroMiniVariant,
    caption: "DeliverEnd · iOS",
    badge: "Writing",
    badgeTone: "writing" as const,
  },
  {
    id: "ar-sports",
    variant: "game" satisfies HeroMiniVariant,
    caption: "AR Sports · Unity",
    badge: "Writing",
    badgeTone: "writing" as const,
  },
  {
    id: "giftcity",
    variant: "web" satisfies HeroMiniVariant,
    caption: "GiftCityAdvisor · Web",
    badge: "Soon",
    badgeTone: "soon" as const,
    frameMuted: true as const,
  },
] as const;

export function CaseStudiesHero() {
  const heroBgRef = useRef<HTMLCanvasElement>(null);
  const [pillDone, setPillDone] = useState(false);
  const h = CASE_STUDIES_HERO;

  useEffect(() => {
    const c = heroBgRef.current;
    if (!c) return;
    return attachHeroBgParticles(c);
  }, []);

  return (
    <section
      className="relative min-h-[520px] overflow-hidden bg-[#060606] scroll-mt-14 pb-20 pt-[clamp(5rem,12vh,7rem)]"
      aria-labelledby="case-studies-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--sl-cyan) 16%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--sl-line) 55%, transparent) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
        aria-hidden
      />
      <canvas ref={heroBgRef} className="absolute inset-0 z-1 h-full w-full" aria-hidden />

      <div
        className="pointer-events-none absolute left-0 right-0 z-[2] h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent motion-safe:animate-[case-studies-hero-scan_6s_ease-in-out_infinite]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 md:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-14">
          <div className="min-w-0 flex-1">
            <p className="mb-9 flex items-center gap-2.5 font-mono text-[9px] tracking-[0.22em] text-orange-400/70 uppercase before:h-px before:w-7 before:bg-orange-400/40">
              {h.label}
            </p>

            <h1
              id="case-studies-hero-heading"
              className="mb-5 max-w-[760px] font-sans text-[clamp(2.25rem,5.5vw,3.75rem)] font-extrabold leading-[1.07] tracking-[-0.035em] text-white"
            >
              {h.titleLine1}
              <br />
              {h.titleLine2Before}
              <span className="text-orange-400">{h.titleEm}</span>
            </h1>

            <p className="mb-11 max-w-[540px] text-[15px] leading-[1.72] font-light text-white/45">{h.description}</p>

            <div className="mb-12 max-w-[580px]">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.16em] text-white/35 uppercase">
                  {h.progressLabel}
                </span>
                <span className="font-mono text-[9px] tracking-[0.1em] text-orange-400/80">{h.progressPct}</span>
              </div>
              <div className="h-[3px] overflow-hidden rounded-sm bg-white/[0.08]">
                <div className="h-full w-0 rounded-sm bg-orange-400 motion-safe:animate-[case-studies-progress-main_2.4s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards] motion-safe:[animation-fill-mode:forwards]" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-px rounded-md border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
                {CASE_STUDIES_PROGRESS_ROWS.map((row) => (
                  <div
                    key={row.name}
                    className="flex min-w-0 flex-col bg-[#060606] px-3.5 py-3"
                  >
                    <span className="inline-flex items-center font-mono text-[8px] tracking-[0.1em] text-white/45 uppercase">
                      <span
                        className={`mr-1.5 inline-block size-1.5 rounded-full ${row.dot} motion-safe:animate-[case-studies-prog-dot_2s_ease-in-out_infinite]`}
                        style={{ animationDelay: row.delay }}
                      />
                      {row.name}
                    </span>
                    <span className="mt-1.5 block font-mono text-[7px] tracking-[0.08em] text-orange-400/60 uppercase">
                      {row.status}
                    </span>
                    <div className="mt-2 h-0.5 overflow-hidden rounded-sm bg-white/[0.06]">
                      <div
                        className="h-full w-0 rounded-sm bg-orange-400 motion-safe:animate-[case-studies-mini-bar_2.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                        style={{
                          animationDuration: row.barDuration,
                          animationFillMode: "forwards",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-3.5">
              <Link
                href={h.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-md bg-orange-400 px-7 py-3.5 text-xs font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.28)] transition-colors hover:bg-[#E68A1F]"
              >
                {h.primaryCta.label} <MoveRight className="size-4" aria-hidden />
              </Link>
              <a
                href={h.secondaryCta.href}
                className="inline-flex items-center rounded-md border border-white/25 bg-transparent px-7 py-3.5 text-xs font-semibold tracking-[0.07em] text-white/90 uppercase transition-colors hover:border-orange-400/50 hover:text-orange-400"
              >
                {h.secondaryCta.label}
              </a>
              <span className="font-mono text-[9px] tracking-[0.1em] text-white/25 uppercase">{h.emailNote}</span>
            </div>

            <div className="mt-5 inline-flex max-w-[380px] flex-wrap items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-2 pl-4 pr-2">
              <span className="min-w-0 flex-1 font-mono text-[9px] tracking-[0.1em] text-white/40 uppercase">
                {h.notifyPill}
              </span>
              <button
                type="button"
                onClick={() => setPillDone(true)}
                disabled={pillDone}
                className={`shrink-0 rounded-full px-3.5 py-1.5 font-mono text-[8px] tracking-[0.1em] text-white uppercase transition-colors ${pillDone
                  ? "cursor-default bg-emerald-500"
                  : "bg-orange-400 hover:bg-[#E68A1F]"
                  }`}
              >
                {pillDone ? "✓ You're on the list" : h.notifyPillBtn}
              </button>
            </div>
          </div>

          {/* Preview strip: column on mobile; narrow column beside copy from lg. */}
          <div
            className="flex w-full shrink-0 flex-col sm:flex-row lg:flex-col gap-3 lg:w-[200px] xl:sticky xl:top-28"
            aria-hidden
          >
            {HERO_MINI_PREVIEWS.map((item) => (
              <div
                key={item.id}
                className={`relative h-[100px] w-fit overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] lg:w-full ${"frameMuted" in item && item.frameMuted ? "opacity-50" : ""}`}
              >
                <CaseStudiesHeroMiniCanvas variant={item.variant} />
                <span className="pointer-events-none absolute bottom-1.5 left-2 font-mono text-[7px] tracking-[0.1em] text-white/35 uppercase">
                  {item.caption}
                </span>
                <span
                  className={`pointer-events-none absolute right-1.5 top-1.5 rounded border px-1.5 py-0.5 font-mono text-[6px] tracking-[0.1em] uppercase ${HERO_MINI_PREVIEW_BADGE[item.badgeTone]}`}
                >
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-px w-full bg-[color-mix(in_srgb,var(--sl-cyan)_16%,transparent)]"
        aria-hidden
      />
    </section>
  );
}

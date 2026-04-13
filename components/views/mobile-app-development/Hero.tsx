"use client";

import { useEffect, useRef } from "react";
import { MoveRight } from "lucide-react";
import { attachHeroBgParticles } from "@/components/views/ar-bim/landingCanvas";
import type { MobileServiceContent } from "./content";
import { attachIphonePhoneCanvas } from "./iphonePhoneCanvas";
import { AndroidHeroPhone } from "@/components/views/mobile-app-development/AndroidHeroPhone";
import { FlutterHeroRight } from "@/components/views/mobile-app-development/FlutterHeroRight";

type Props = {
  serviceKey: "iphone" | "android" | "flutter";
  content: MobileServiceContent;
};

export function Hero({ serviceKey, content }: Props) {
  const heroBgRef = useRef<HTMLCanvasElement>(null);
  const phoneRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = heroBgRef.current;
    if (!c) return;
    return attachHeroBgParticles(c);
  }, []);

  useEffect(() => {
    const c = phoneRef.current;
    if (!c) return;
    if (serviceKey === "android") return;
    if (serviceKey === "flutter") return;
    return attachIphonePhoneCanvas(c);
  }, [serviceKey]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#060606] scroll-mt-14"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--sl-cyan) 16%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--sl-line) 55%, transparent) 1px, transparent 1px)`,
          backgroundSize: "58px 58px",
        }}
        aria-hidden
      />
      <canvas ref={heroBgRef} className="absolute inset-0 z-1 h-full w-full" />

      <div
        className={
          serviceKey === "flutter"
            ? "relative z-10 mx-auto grid w-full min-w-0 max-w-325 grid-cols-1 items-center gap-10 px-5 pt-[clamp(4.5rem,10vh,6.5rem)] pb-16 lg:grid-cols-2 lg:gap-16 lg:px-12"
            : "relative z-10 mx-auto grid w-full min-w-0 max-w-325 grid-cols-1 items-center gap-16 px-5 pt-[clamp(4.5rem,10vh,6.5rem)] pb-16 md:grid-cols-2 md:gap-16 md:px-12"
        }
      >
        <div className="min-w-0 max-w-full">
          <div className="mb-6 inline-flex max-w-full min-w-0 items-center gap-2 overflow-x-auto rounded-sm border border-orange-400/35 bg-orange-400/[0.07] py-1.5 pl-2.5 pr-3 font-mono text-[8px] tracking-[0.14em] text-orange-400 uppercase [-ms-overflow-style:none] [scrollbar-width:none] sm:text-[9px] sm:tracking-[0.2em] sm:pl-3 sm:pr-3.5 md:tracking-[0.22em] [&::-webkit-scrollbar]:hidden">
            <span
              className="size-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_8px_var(--orange-400)] animate-[arbim-landing-bpulse_1.6s_ease-in-out_infinite]"
              aria-hidden
            />
            <span className="whitespace-nowrap">{content.heroTagline}</span>
          </div>

          <h1 className="mb-5 max-w-full break-words font-sans text-[clamp(1.75rem,4.5vw,4rem)] leading-[0.96] font-extrabold tracking-[-0.035em] text-white sm:text-[clamp(2.25rem,4.5vw,4rem)]">
            Hire Leading
            <br />
            <span className="text-orange-400">{content.heroHighlight}</span>
            <br />
            {content.heroTitleTail}
          </h1>

          <p className="mb-9 max-w-full text-[15px] leading-[1.78] font-light text-white/48 sm:max-w-115">
            {content.heroDescription}
          </p>

          <div className="mb-12 flex flex-wrap items-center gap-3.5">
            <a
              href={content.primaryCtaHref}
              target="_blank"
              rel="noreferrer"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-orange-400 bg-orange-400 px-8 py-3.5 text-[13px] font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgb(245_138_11/0.55)]"
            >
              {content.primaryCtaLabel} <MoveRight className="size-4" aria-hidden />
            </a>
            <a
              href="#why"
              className="inline-block rounded-md border-[1.5px] border-white/20 bg-transparent px-8 py-3.5 text-[13px] font-medium tracking-[0.07em] text-white/60 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
            >
              Explore Services
            </a>
          </div>

          <div className="flex flex-wrap gap-5">
            {content.heroMeta.map((m) => (
              <span
                key={m}
                className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] text-white/25 uppercase"
              >
                <span className="size-1 shrink-0 rounded-full bg-orange-400/65" aria-hidden />
                {m}
              </span>
            ))}
          </div>
        </div>
        {/* Right Side */}
        <div
          className={`relative flex min-w-0 max-w-full items-center justify-center ${serviceKey === "flutter" ? "overflow-x-hidden pt-2 lg:overflow-visible" : ""}`}
        >
          <div className="relative w-full min-w-0 max-w-full">
            {serviceKey === "flutter" ? (
              <FlutterHeroRight
                chipTopLeft={content.heroPhoneTopLeft}
                chipBottomRight={`✓ ${content.heroChipFloat2}`}
              />
            ) : (
              <>
                <div className="relative h-[520px] w-[260px] overflow-hidden rounded-[38px] border-2 border-orange-400/25 bg-[#0a1b33] shadow-[0_0_60px_rgb(245_138_11/0.10),0_40px_80px_rgb(0_0_0/0.55),inset_0_0_0_1px_rgb(255_255_255/0.04)]">
                  <div className="absolute left-1/2 top-0 z-10 flex h-[26px] w-[88px] -translate-x-1/2 items-center justify-center gap-2 rounded-b-[15px] bg-[#060606]">
                    <span
                      className="size-[7px] rounded-full border border-white/10 bg-[#0a1b33]"
                      aria-hidden
                    />
                  </div>

                  {serviceKey === "android" ? (
                    <AndroidHeroPhone
                      topLeft={content.heroPhoneTopLeft}
                      topRight={content.heroChipFloat1}
                    />
                  ) : (
                    <canvas ref={phoneRef} className="block h-full w-full" />
                  )}

                  {serviceKey === "android" ? null : (
                    <>
                      <div className="pointer-events-none absolute left-0 right-0 top-[12%] z-5 h-0.5 bg-linear-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_10px_rgb(245_138_11/0.9)] motion-safe:animate-[arbim-dev-scan-line_2.8s_ease-in-out_infinite]" />

                      <div className="pointer-events-none absolute left-3 top-9 z-10 font-mono text-[9px] tracking-[0.12em] text-orange-400/80 uppercase">
                        {content.heroPhoneTopLeft}
                      </div>
                      <div className="pointer-events-none absolute right-3 top-9 z-10 font-mono text-[9px] tracking-[0.12em] text-white/55 uppercase">
                        {content.heroPhoneTopRight}
                      </div>

                      <span
                        className="pointer-events-none absolute left-2 top-8 z-10 size-3 border-l-2 border-t-2 border-orange-400/50"
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute right-2 top-8 z-10 size-3 border-r-2 border-t-2 border-orange-400/50"
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute bottom-3 left-2 z-10 size-3 border-b-2 border-l-2 border-orange-400/50"
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute bottom-3 right-2 z-10 size-3 border-b-2 border-r-2 border-orange-400/50"
                        aria-hidden
                      />
                    </>
                  )}
                </div>

                {serviceKey === "android" ? (
                  <>
                    <div className="pointer-events-none absolute top-[60px] left-[-80px] hidden whitespace-nowrap rounded-[4px] border border-[rgba(255,153,51,0.3)] bg-[rgba(10,27,51,0.9)] px-[10px] py-[5px] font-mono text-[7px] tracking-[0.1em] text-[rgba(255,255,255,0.7)] uppercase lg:block">
                      {content.heroPhoneTopLeft}
                    </div>
                    <div className="pointer-events-none absolute top-1/2 left-[-90px] hidden -translate-y-1/2 whitespace-nowrap rounded-[4px] border border-[rgba(255,153,51,0.3)] bg-[rgba(10,27,51,0.9)] px-[10px] py-[5px] font-mono text-[7px] tracking-[0.1em] text-[rgba(255,255,255,0.7)] uppercase lg:block">
                      ◎ {content.heroChipFloat3}
                    </div>
                    <div className="pointer-events-none absolute bottom-[70px] right-[-80px] hidden whitespace-nowrap rounded-[4px] border border-[rgba(255,153,51,0.3)] bg-[rgba(10,27,51,0.9)] px-[10px] py-[5px] font-mono text-[7px] tracking-[0.1em] text-[rgba(255,255,255,0.7)] uppercase lg:block">
                      ✓ {content.heroChipFloat2}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="pointer-events-none absolute -right-14 top-[14%] hidden animate-[arbim-landing-chip-float_3s_ease-in-out_infinite] rounded-md border border-orange-400/30 bg-black/55 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-orange-400 uppercase shadow-[0_10px_30px_rgb(0_0_0/0.4)] md:block">
                      ⬡ {content.heroChipFloat1}
                    </div>
                    <div className="pointer-events-none absolute -right-16 top-[44%] hidden animate-[arbim-landing-chip-float_3s_ease-in-out_infinite] rounded-md border border-orange-400/30 bg-black/55 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-orange-400 uppercase shadow-[0_10px_30px_rgb(0_0_0/0.4)] [animation-delay:.9s] md:block">
                      ✓ {content.heroChipFloat2}
                    </div>
                    <div className="pointer-events-none absolute -left-14 bottom-[18%] hidden animate-[arbim-landing-chip-float_3s_ease-in-out_infinite] rounded-md border border-orange-400/30 bg-black/55 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-orange-400 uppercase shadow-[0_10px_30px_rgb(0_0_0/0.4)] [animation-delay:1.8s] md:block">
                      ◎ {content.heroChipFloat3}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import { DeltaArbimInteractivePreview } from "@/components/shared/DeltaArbimInteractivePreview";
import Link from "next/link";

const FEAT_CHIPS = [
  "AR BIM OVERLAY",
  "CLASH DETECTION",
  "LIDAR SCAN",
  "MEP LAYERS",
  "SITE VALIDATION",
  "REAL-TIME SYNC",
] as const;

const BENTO = [
  { num: "50", unit: "+", label: "PROJECTS DONE" },
  { num: "3", unit: "+", label: "COMPLEX ONGOING" },
  { num: "5", unit: "+", label: "eCOM BRANDS BUILT" },
  { num: "10", unit: "+", label: "YRS CORPORATE XP" },
  { num: "10", unit: "+", label: "TEAM // PRODUCTIVE" },
] as const;

/** Shared glass chrome (Services / Feedback-style) */
const GLASS_CORE =
  "relative isolate border border-white/10 bg-white/3 backdrop-blur-2xl transition-[transform,box-shadow,border-color] duration-200 ease-out will-change-transform " +
  "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-inherit before:opacity-70 before:content-[''] " +
  "before:[mask-image:radial-gradient(60%_55%_at_50%_35%,black,transparent)] " +
  "before:bg-[radial-gradient(circle_at_-15%_-25%,color-mix(in_srgb,var(--sl-cyan)_10%,transparent)_0%,transparent_52%),radial-gradient(circle_at_115%_125%,color-mix(in_srgb,var(--sl-cyan-2)_10%,transparent)_0%,transparent_52%)] " +
  "after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-inherit after:content-[''] after:opacity-0 after:transition-opacity after:duration-200 " +
  "after:shadow-[0_0_0_1px_color-mix(in_srgb,var(--sl-saffron)_50%,transparent),0_0_14px_color-mix(in_srgb,var(--sl-saffron)_18%,transparent),0_0_36px_color-mix(in_srgb,var(--sl-saffron)_8%,transparent)] " +
  "hover:after:opacity-70 [&>*]:relative [&>*]:z-20";

const GLASS_HOVER_LIFT =
  "hover:-translate-y-0.5 hover:border-white/20 hover:shadow-xl hover:shadow-black/40";

const GLASS_CARD = `${GLASS_CORE} overflow-hidden rounded-2xl ${GLASS_HOVER_LIFT}`;

export default function AboutUs() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 overflow-x-clip pb-12 pt-12 text-left md:pb-20"
    >
      <div className="relative w-full">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-size-12 bg-[linear-gradient(rgb(29_207_207/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(29_207_207/0.03)_1px,transparent_1px)]"
          aria-hidden
        />

        <div className="mx-auto max-w-325 px-5 md:px-12">
        {/* <div className="relative z-2 w-full max-w-240"> */}
          <div className="w-full text-left">
            <SectionIntro
              id="about-heading"
              align="left"
              fullWidth
              eyebrow="The core engine"
              title={
                <>
                  Decades of Experience.
                  <br />
                  Built for the{" "}
                  <span className="text-sl-saffron">Future of Bharat.</span>
                </>
              }
              lead="Shivlam is a Bharat-based technology powerhouse specializing in complex development ecosystems. With 10+ years of corporate leadership and 3+ years of focused innovation, we bridge the gap between legacy stability and next-gen agility."
            />

            <div className="mb-11 flex flex-wrap items-center justify-start gap-2.5">
            <div
              className={`${GLASS_CORE} flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4.5`}
            >
              <div className="relative flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full border-2 border-sl-saffron animate-[about-us-seal-spin_12s_linear_infinite] motion-reduce:animate-none">
                <div className="absolute -top-0.5 left-1/2 h-1.25 w-1.25 -translate-x-1/2 rounded-full bg-sl-saffron" />
                <div className="text-center font-mono text-xs font-medium leading-snug text-sl-saffron">
                  SHV
                  <br />
                  LAM
                </div>
              </div>
              <div className="text-sm font-bold tracking-tight text-slate-100">
                10+ Years of Experience
              </div>
            </div>
            <div
              className={`${GLASS_CORE} flex items-center gap-1.75 rounded-full px-4 py-2`}
            >
              <div
                className="h-2 w-2 shrink-0 animate-[about-us-pulse-pin_2s_ease-in-out_infinite] -rotate-45 rounded-[50%_50%_50%_0] bg-sl-cyan motion-reduce:animate-none"
                aria-hidden
              />
              <span className="font-mono text-xs font-medium tracking-wider text-sl-cyan">
                PROUDLY ENGINEERED IN BHARAT
              </span>
            </div>
          </div>
          </div>

          <div className="mb-10 text-left">
            <div className="min-w-0">
              <div className="mb-2.5 font-mono text-xs font-medium tracking-widest text-sl-saffron">
                FLAGSHIP PRODUCT // SHIVLAM BUILD TECH
              </div>
              <h4 className="mb-2.5 text-2xl font-extrabold leading-snug tracking-tight text-slate-100 sm:text-3xl md:text-4xl">
                <span className="text-sl-saffron">Delta-ARBIM</span> — One of the Best
                Products We Built
              </h4>
              <p className="max-w-3xl text-base leading-relaxed text-slate-400">
                An AR-powered BIM viewer that overlays live 3D building models — structure,
                walls, MEP pipes — directly onto real construction sites through your device
                camera. Walk the site before a brick is laid. Detect clashes. Validate every
                layer. Cut rework by up to 40%.
              </p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {FEAT_CHIPS.map((c) => (
                  <div
                    key={c}
                    className="relative isolate rounded-md border border-white/10 bg-white/3 px-2.25 py-1 font-mono text-xs tracking-wide text-sl-saffron backdrop-blur-2xl transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-px hover:border-white/20 hover:shadow-lg hover:shadow-black/30"
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="https://deltaarbim.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm border border-sl-saffron px-8 py-2.5 font-mono text-sm font-bold text-sl-saffron transition-[filter] hover:brightness-110 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sl-saffron/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Build Now
                </Link>
              </div>
            </div>
          </div>

        <DeltaArbimInteractivePreview />

        <div className="relative z-20 w-full pb-2">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
            {BENTO.map((item) => (
              <div key={item.label} className={`${GLASS_CARD} px-3.5 pb-4 pt-4`}>
                <div className="mb-0.5 text-3xl font-extrabold leading-none tracking-tighter text-sl-saffron">
                  {item.num}
                  <span className="text-sm font-bold text-sl-saffron/60">
                    {item.unit}
                  </span>
                </div>
                <div className="mt-1.5 font-mono text-xs tracking-wide text-slate-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

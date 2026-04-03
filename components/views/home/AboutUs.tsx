"use client";

import { SectionIntro } from "@/components/shared/section-chrome";
import AboutUsBimCanvas from "@/components/views/home/AboutUsBimCanvas";

const FEAT_CHIPS = [
  "AR BIM OVERLAY",
  "CLASH DETECTION",
  "LIDAR SCAN",
  "MEP LAYERS",
  "SITE VALIDATION",
  "REAL-TIME SYNC",
] as const;

const LOG_LINES = [
  {
    dot: "green" as const,
    html: "<strong>Structure layer</strong> locked to site coordinates",
    time: "0:02s",
  },
  {
    dot: "cyan" as const,
    html: "<strong>LiDAR sweep</strong> — 3 anchor points confirmed",
    time: "0:05s",
  },
  {
    dot: "amber" as const,
    html: "<strong>MEP HVAC</strong> duct route validated at floor 3",
    time: "0:09s",
  },
  {
    dot: "green" as const,
    html: "<strong>Wall panel</strong> alignment within 2mm tolerance",
    time: "0:12s",
  },
] as const;

const LOG_DOT_COLORS: Record<(typeof LOG_LINES)[number]["dot"], string> = {
  green: "bg-green-400",
  cyan: "bg-sl-cyan",
  amber: "bg-sl-saffron",
};

const TICKER_ITEMS = [
  { dotClass: "bg-green-400", text: "NO CLASHES DETECTED" },
  { dotClass: "bg-sl-cyan", text: "LIDAR SCAN ACTIVE" },
  { dotClass: "bg-sl-saffron", text: "5 BIM LAYERS LOADED" },
  { dotClass: "bg-blue-400", text: "WALL LAYER SYNCED" },
  { dotClass: "bg-red-400", text: "MEP HVAC MAPPED" },
  { dotClass: "bg-green-400", text: "ALIGNMENT 98.2%" },
  { dotClass: "bg-sl-cyan", text: "REVIT MODEL LIVE" },
  { dotClass: "bg-sl-saffron", text: "GPS ANCHORS LOCKED" },
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

const GLASS_VIEWER_WRAP = `${GLASS_CORE} overflow-visible rounded-2xl will-change-auto after:!opacity-0 hover:after:!opacity-0 ${GLASS_HOVER_LIFT}`;

function ArrowIcon({ stroke }: { stroke: string }) {
  return (
    <svg className="mt-0.5 h-4.5 w-4.5 shrink-0" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M3 9h10M9 5l4 4-4 4"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutUs() {
  const tickerDup = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 overflow-x-clip px-5 pb-12 text-left sm:px-8 md:pb-20 lg:px-12"
    >
      <div className="relative w-full">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-size-12 bg-[linear-gradient(rgb(29_207_207/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(29_207_207/0.03)_1px,transparent_1px)]"
          aria-hidden
        />

        <div className="relative z-2 w-full max-w-240">
          <SectionIntro
            id="about-heading"
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

          <div className="mb-11 flex flex-wrap items-center gap-2.5">
            <div
              className={`${GLASS_CORE} flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4.5 ${GLASS_HOVER_LIFT}`}
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
              className={`${GLASS_CORE} flex items-center gap-1.75 rounded-full px-4 py-2 ${GLASS_HOVER_LIFT}`}
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

          <div className="mb-10">
            <div className="mb-2.5 font-mono text-xs font-medium tracking-widest text-sl-saffron">
              FLAGSHIP PRODUCT // SHIVLAM BUILD TECH
            </div>
            <h4 className="mb-2.5 text-2xl font-extrabold leading-snug tracking-tight text-slate-100 sm:text-3xl md:text-4xl">
              <span className="text-sl-saffron">Delta-ARBIM</span> — One of the Best
              Products We Built
            </h4>
            <p className="max-w-155 text-base leading-relaxed text-slate-400">
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
          </div>
        </div>

        <div
          className="relative left-1/2 box-border w-screen max-w-[90vw] -translate-x-1/2"
          aria-label="Delta-ARBIM interactive preview"
        >
          <div className="mb-9 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <div className={GLASS_VIEWER_WRAP}>
                <div className={`${GLASS_CARD} relative z-20 h-120 max-h-[70vh] min-h-70 w-full overflow-hidden`}>
                  <AboutUsBimCanvas />
                </div>
              </div>

              <div className={`${GLASS_CARD} flex flex-col gap-3 p-4`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-mono text-xs font-medium tracking-widest text-slate-400">
                    DELTA-ARBIM // LIVE SESSION METRICS
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-red-400/35 bg-red-400/10 px-3 py-1">
                    <div
                      className="h-1.5 w-1.5 shrink-0 animate-[about-us-blink_1.2s_ease-in-out_infinite] rounded-full bg-red-400 motion-reduce:animate-none"
                      aria-hidden
                    />
                    <div className="font-mono text-xs font-medium tracking-wide text-red-400">
                      CLASH DETECTION ON
                    </div>
                  </div>
                </div>

                <div className="flex overflow-hidden rounded-lg border border-white/10">
                  <div className="min-w-0 flex-1 border-r border-white/10 px-2.5 py-2.5 text-center last:border-r-0">
                    <div className="mb-0.5 font-mono text-sm font-medium leading-none text-green-400">
                      0
                    </div>
                    <div className="font-mono text-xs tracking-wide text-slate-400">
                      CLASHES
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 border-r border-white/10 px-2.5 py-2.5 text-center last:border-r-0">
                    <div className="mb-0.5 font-mono text-sm font-medium leading-none text-sl-cyan">
                      5
                    </div>
                    <div className="font-mono text-xs tracking-wide text-slate-400">
                      BIM LAYERS
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 border-r border-white/10 px-2.5 py-2.5 text-center last:border-r-0">
                    <div className="mb-0.5 font-mono text-sm font-medium leading-none text-sl-saffron">
                      98.2%
                    </div>
                    <div className="font-mono text-xs tracking-wide text-slate-400">
                      ALIGN SCORE
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 border-r border-white/[0.06] px-2.5 py-2.5 text-center last:border-r-0">
                    <div className="mb-0.5 font-mono text-[13px] font-medium leading-none text-[#1dcfcf]">
                      1.1ms
                    </div>
                    <div className="font-mono text-[8px] tracking-[0.1em] text-[#8a9bba]">
                      SYNC LAG
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  {LOG_LINES.map((line, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 font-mono text-xs leading-snug"
                    >
                      <div
                        className={`size-1.5 shrink-0 rounded-full ${LOG_DOT_COLORS[line.dot]}`}
                        aria-hidden
                      />
                      <div
                        className="text-slate-400 [&_strong]:font-medium [&_strong]:text-slate-200"
                        dangerouslySetInnerHTML={{ __html: line.html }}
                      />
                      <div className="ml-auto shrink-0 text-[rgb(138_155_186/0.4)]">
                        {line.time}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden border-t border-white/5 pt-2.5">
                  <div className="flex w-max animate-[about-us-ticker_18s_linear_infinite] gap-5 whitespace-nowrap hover:[animation-play-state:paused] motion-reduce:animate-none">
                    {tickerDup.map((item, i) => (
                      <div
                        key={`${item.text}-${i}`}
                        className="flex shrink-0 items-center gap-1.5 font-mono text-xs tracking-wide text-slate-400"
                      >
                        <div
                          className={`size-1.5 shrink-0 rounded-full ${item.dotClass}`}
                          aria-hidden
                        />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`${GLASS_CARD} flex flex-col gap-4 px-5 py-6`}>
              <div className="mb-0.5 font-mono text-xs font-medium tracking-widest text-sl-saffron">
                AR SCAN // WHAT YOU SEE
              </div>
              <div className="flex items-start gap-3">
                <ArrowIcon stroke="#94a3b8" />
                <div>
                  <div className="mb-1 text-sm font-bold leading-snug text-slate-100">
                    Real Site Background
                  </div>
                  <div className="text-sm leading-snug text-slate-400">
                    Simulates a camera feed of a raw construction site — concrete floors,
                    bare columns, exposed structure exactly as it looks on the ground.
                  </div>
                </div>
              </div>
              <div className="h-px bg-white/[0.05]" />
              <div className="flex items-start gap-[11px]">
                <ArrowIcon stroke="#94a3b8" />
                <div>
                  <div className="mb-1 text-sm font-bold leading-snug text-[#f0f4ff]">
                    BIM Structure Layer
                  </div>
                  <div className="text-[12.5px] leading-snug text-[#8a9bba]">
                    Grey steel columns, beams and slabs from the Revit/Navisworks model —
                    overlaid precisely onto the real site to confirm correct placement.
                  </div>
                </div>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-start gap-3">
                <ArrowIcon stroke="#60a5fa" />
                <div>
                  <div className="mb-1 text-sm font-bold leading-snug text-slate-100">
                    Wall &amp; Slab Layer
                  </div>
                  <div className="text-sm leading-snug text-slate-400">
                    Semi-transparent blue panels show walls, slabs, and openings — catch
                    mis-placements before they are built.
                  </div>
                </div>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-start gap-3">
                <ArrowIcon stroke="#f87171" />
                <div>
                  <div className="mb-1 text-sm font-bold leading-snug text-slate-100">
                    MEP Pipes &amp; Ducts
                  </div>
                  <div className="text-sm leading-snug text-slate-400">
                    Red HVAC ducts, blue water pipes, green conduits — each trade in its own
                    colour. Toggle layers to isolate any system for clash inspection.
                  </div>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-sl-cyan/20 bg-sl-cyan/5 px-2.5 py-0.5 font-mono text-xs tracking-wide text-sl-cyan">
                    <div
                      className="size-1.5 animate-[about-us-blink_1.8s_ease-in-out_infinite] rounded-full bg-sl-cyan motion-reduce:animate-none"
                      aria-hidden
                    />
                    CLASH DETECTION ON
                  </div>
                </div>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-start gap-3">
                <ArrowIcon stroke="#F58A0B" />
                <div>
                  <div className="mb-1 text-sm font-bold leading-snug text-slate-100">
                    AR Anchor Points
                  </div>
                  <div className="text-sm leading-snug text-slate-400">
                    Pulsing amber dots are GPS+LiDAR anchor nodes — they lock the BIM model
                    to physical site coordinates so the overlay never drifts.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto w-full max-w-[90vw] pb-2">
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
    </section>
  );
}

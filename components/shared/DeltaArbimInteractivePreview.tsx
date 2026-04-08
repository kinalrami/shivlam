"use client";

import { Fragment, type ReactNode } from "react";
import AboutUsBimCanvas from "@/components/views/home/AboutUsBimCanvas";

export type DeltaPreviewLogDot = "green" | "cyan" | "amber";

export type DeltaPreviewLogLine = {
  dot: DeltaPreviewLogDot;
  html: string;
  time: string;
};

export type DeltaPreviewTickerItem = {
  dotClass: string;
  text: string;
};

export type DeltaPreviewMetric = {
  value: string;
  label: string;
  valueClass: string;
  labelClass?: string;
  /** Last column in About uses border-white/6 */
  cellBorderClass?: string;
};

export type DeltaPreviewLegendItem = {
  arrowStroke: string;
  title: string;
  body: string;
  titleClass?: string;
  bodyClass?: string;
  rowGapClass?: string;
  clashPill?: boolean;
};

export type DeltaArbimPreviewContent = {
  ariaLabel: string;
  metricsHeader: string;
  clashLabel: string;
  metrics: DeltaPreviewMetric[];
  logLines: DeltaPreviewLogLine[];
  tickerItems: DeltaPreviewTickerItem[];
  legendTitle: string;
  legendTitleClass: string;
  legendItems: DeltaPreviewLegendItem[];
};

const LOG_DOT_COLORS: Record<DeltaPreviewLogDot, string> = {
  green: "bg-green-400",
  cyan: "bg-sl-cyan",
  amber: "bg-sl-saffron",
};

export const DELTA_PREVIEW_CONTENT_ABOUT: DeltaArbimPreviewContent = {
  ariaLabel: "Delta-ARBIM interactive preview",
  metricsHeader: "DELTA-ARBIM // LIVE SESSION METRICS",
  clashLabel: "CLASH DETECTION ON",
  metrics: [
    {
      value: "0",
      label: "CLASHES",
      valueClass: "mb-0.5 font-mono text-sm font-medium leading-none text-green-400",
    },
    {
      value: "5",
      label: "BIM LAYERS",
      valueClass: "mb-0.5 font-mono text-sm font-medium leading-none text-sl-cyan",
    },
    {
      value: "98.2%",
      label: "ALIGN SCORE",
      valueClass: "mb-0.5 font-mono text-sm font-medium leading-none text-sl-saffron",
    },
    {
      value: "1.1ms",
      label: "SYNC LAG",
      valueClass: "mb-0.5 font-mono text-[13px] font-medium leading-none text-[#1dcfcf]",
      labelClass: "font-mono text-[8px] tracking-widest text-[#8a9bba]",
      cellBorderClass: "border-white/6",
    },
  ],
  logLines: [
    {
      dot: "green",
      html: "<strong>Structure layer</strong> locked to site coordinates",
      time: "0:02s",
    },
    {
      dot: "cyan",
      html: "<strong>LiDAR sweep</strong> — 3 anchor points confirmed",
      time: "0:05s",
    },
    {
      dot: "amber",
      html: "<strong>MEP HVAC</strong> duct route validated at floor 3",
      time: "0:09s",
    },
    {
      dot: "green",
      html: "<strong>Wall panel</strong> alignment within 2mm tolerance",
      time: "0:12s",
    },
  ],
  tickerItems: [
    { dotClass: "bg-green-400", text: "NO CLASHES DETECTED" },
    { dotClass: "bg-sl-cyan", text: "LIDAR SCAN ACTIVE" },
    { dotClass: "bg-sl-saffron", text: "5 BIM LAYERS LOADED" },
    { dotClass: "bg-blue-400", text: "WALL LAYER SYNCED" },
    { dotClass: "bg-red-400", text: "MEP HVAC MAPPED" },
    { dotClass: "bg-green-400", text: "ALIGNMENT 98.2%" },
    { dotClass: "bg-sl-cyan", text: "REVIT MODEL LIVE" },
    { dotClass: "bg-sl-saffron", text: "GPS ANCHORS LOCKED" },
  ],
  legendTitle: "AR SCAN // WHAT YOU SEE",
  legendTitleClass: "mb-0.5 font-mono text-xs font-medium tracking-widest text-sl-saffron",
  legendItems: [
    {
      arrowStroke: "#94a3b8",
      title: "Real Site Background",
      body: "Simulates a camera feed of a raw construction site — concrete floors, bare columns, exposed structure exactly as it looks on the ground.",
      rowGapClass: "gap-3",
    },
    {
      arrowStroke: "#94a3b8",
      title: "BIM Structure Layer",
      titleClass: "mb-1 text-sm font-bold leading-snug text-[#f0f4ff]",
      bodyClass: "text-[12.5px] leading-snug text-[#8a9bba]",
      body: "Grey steel columns, beams and slabs from the Revit/Navisworks model — overlaid precisely onto the real site to confirm correct placement.",
      rowGapClass: "gap-2.75",
    },
    {
      arrowStroke: "#60a5fa",
      title: "Wall & Slab Layer",
      body: "Semi-transparent blue panels show walls, slabs, and openings — catch mis-placements before they are built.",
      rowGapClass: "gap-3",
    },
    {
      arrowStroke: "#f87171",
      title: "MEP Pipes & Ducts",
      body: "Red HVAC ducts, blue water pipes, green conduits — each trade in its own colour. Toggle layers to isolate any system for clash inspection.",
      rowGapClass: "gap-3",
      clashPill: true,
    },
    {
      arrowStroke: "#F58A0B",
      title: "AR Anchor Points",
      body: "Pulsing amber dots are GPS+LiDAR anchor nodes — they lock the BIM model to physical site coordinates so the overlay never drifts.",
      rowGapClass: "gap-3",
    },
  ],
};

/** Shared glass chrome (same strings as AboutUs) */
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

const DEFAULT_LABEL_CLASS = "font-mono text-xs tracking-wide text-slate-400";

export type DeltaArbimInteractivePreviewProps = {
  canvas?: ReactNode;
  content?: DeltaArbimPreviewContent;
};

export function DeltaArbimInteractivePreview({
  canvas = <AboutUsBimCanvas />,
  content = DELTA_PREVIEW_CONTENT_ABOUT,
}: DeltaArbimInteractivePreviewProps = {}) {
  const tickerDup = [...content.tickerItems, ...content.tickerItems];

  return (
    <div className="relative w-full" aria-label={content.ariaLabel}>
      <div className="mb-9 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className={GLASS_VIEWER_WRAP}>
            <div className={`${GLASS_CARD} relative z-20 h-120 max-h-[70vh] min-h-70 w-full overflow-hidden`}>
              {canvas}
            </div>
          </div>

          <div className={`${GLASS_CARD} flex flex-col gap-3 p-4`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-mono text-xs font-medium tracking-widest text-slate-400">
                {content.metricsHeader}
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-red-400/35 bg-red-400/10 px-3 py-1">
                <div
                  className="h-1.5 w-1.5 shrink-0 animate-[about-us-blink_1.2s_ease-in-out_infinite] rounded-full bg-red-400 motion-reduce:animate-none"
                  aria-hidden
                />
                <div className="font-mono text-xs font-medium tracking-wide text-red-400">
                  {content.clashLabel}
                </div>
              </div>
            </div>

            <div className="flex overflow-hidden rounded-lg border border-white/10">
              {content.metrics.map((m, idx) => (
                <div
                  key={`${m.label}-${idx}`}
                  className={`min-w-0 flex-1 border-r px-2.5 py-2.5 text-center last:border-r-0 ${m.cellBorderClass ?? "border-white/10"}`}
                >
                  <div className={m.valueClass}>{m.value}</div>
                  <div className={m.labelClass ?? DEFAULT_LABEL_CLASS}>{m.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              {content.logLines.map((line, i) => (
                <div key={i} className="flex items-center gap-2 font-mono text-xs leading-snug">
                  <div
                    className={`size-1.5 shrink-0 rounded-full ${LOG_DOT_COLORS[line.dot]}`}
                    aria-hidden
                  />
                  <div
                    className="text-slate-400 [&_strong]:font-medium [&_strong]:text-slate-200"
                    dangerouslySetInnerHTML={{ __html: line.html }}
                  />
                  <div className="ml-auto shrink-0 text-[rgb(138_155_186/0.4)]">{line.time}</div>
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
          <div className={content.legendTitleClass}>{content.legendTitle}</div>
          {content.legendItems.map((item, i) => (
            <Fragment key={item.title}>
              {i > 0 ? <div className="h-px bg-white/5" /> : null}
              <div className={`flex items-start ${item.rowGapClass ?? "gap-3"}`}>
                <ArrowIcon stroke={item.arrowStroke} />
                <div>
                  <div
                    className={
                      item.titleClass ??
                      "mb-1 text-sm font-bold leading-snug text-slate-100"
                    }
                  >
                    {item.title}
                  </div>
                  <div className={item.bodyClass ?? "text-sm leading-snug text-slate-400"}>
                    {item.body}
                  </div>
                  {item.clashPill ? (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-sl-cyan/20 bg-sl-cyan/5 px-2.5 py-0.5 font-mono text-xs tracking-wide text-sl-cyan">
                      <div
                        className="size-1.5 animate-[about-us-blink_1.8s_ease-in-out_infinite] rounded-full bg-sl-cyan motion-reduce:animate-none"
                        aria-hidden
                      />
                      {content.clashLabel}
                    </div>
                  ) : null}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

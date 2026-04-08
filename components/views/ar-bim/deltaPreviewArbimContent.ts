import type { DeltaArbimPreviewContent } from "@/components/shared/DeltaArbimInteractivePreview";
import type { AboutUsBimCanvasUi } from "@/components/views/home/AboutUsBimCanvas";

/** AR-BIM page: viewer chrome (same Three.js scene, different HUD copy / accents). */
export const AR_BIM_PAGE_CANVAS_UI: Partial<AboutUsBimCanvasUi> = {
  overlayBadge: "LIVE",
  overlayDotClass: "bg-orange-400",
  overlayTextClass: "text-orange-400/85",
  footerLeft: "Δ AR-BIM · SCAN TRACE · SITE GRID LOCK",
  footerLeftClass: "font-mono text-[8px] tracking-[0.14em] text-orange-400/55",
  cornerAccent: "border-orange-400/45",
  innerRing: "border-orange-400/28",
  lidarScanLineClass:
    "pointer-events-none absolute left-0 right-0 z-10 h-0.5 animate-[about-us-lidar-scan_4.5s_ease-in-out_infinite] bg-linear-to-r from-transparent via-orange-400/55 to-transparent motion-reduce:animate-none",
  canvasAriaLabel: "AR BIM live overlay — drag to rotate",
};

/** AR-BIM page: metrics, log, ticker, and legend — distinct from About / default. */
export const AR_BIM_DELTA_PREVIEW_CONTENT: DeltaArbimPreviewContent = {
  ariaLabel: "AR BIM live session preview",
  metricsHeader: "AR BIM // LIVE SESSION METRICS",
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
      value: "98.8%",
      label: "ALIGN SCORE",
      valueClass: "mb-0.5 font-mono text-sm font-medium leading-none text-orange-400",
    },
    {
      value: "1.2ms",
      label: "SYNC LAG",
      valueClass: "mb-0.5 font-mono text-[13px] font-medium leading-none text-[#1dcfcf]",
      labelClass: "font-mono text-[8px] tracking-widest text-[#8a9bba]",
      cellBorderClass: "border-white/6",
    },
  ],
  logLines: [
    {
      dot: "green",
      html: "<strong>Structure layer</strong> loaded to site coordinates",
      time: "0:02s",
    },
    {
      dot: "cyan",
      html: "<strong>LiDAR sweep</strong> — 3 anchor points confirmed",
      time: "0:04s",
    },
    {
      dot: "amber",
      html: "<strong>MEP HVAC</strong> trunk validated at level 02",
      time: "0:08s",
    },
    {
      dot: "green",
      html: "<strong>Wall+slab</strong> stack within 2mm vs as-built",
      time: "0:11s",
    },
  ],
  tickerItems: [
    { dotClass: "bg-sl-cyan", text: "1 LAYER SYNCED" },
    { dotClass: "bg-red-400", text: "MEP HVAC MAPPED" },
    { dotClass: "bg-green-400", text: "ALIGNMENT 98.8%" },
    { dotClass: "bg-sl-cyan", text: "REVIT MODEL LIVE" },
    { dotClass: "bg-blue-400", text: "WALL SLAB TRACE OK" },
    { dotClass: "bg-sl-saffron", text: "LIDAR ANCHORS HOLDING" },
    { dotClass: "bg-green-400", text: "NO ACTIVE CLASHES" },
    { dotClass: "bg-sl-cyan", text: "STREAM 1.2MS RTT" },
  ],
  legendTitle: "AR BIM // WHAT YOU SEE",
  legendTitleClass:
    "mb-0.5 font-mono text-xs font-medium tracking-widest text-orange-400",
  legendItems: [
    {
      arrowStroke: "#94a3b8",
      title: "Real Site Background",
      body: "Live camera feed of the physical construction site — concrete, steel, and temp works — the substrate for every AR overlay in the field.",
      rowGapClass: "gap-3",
    },
    {
      arrowStroke: "#94a3b8",
      title: "BIM Structure Layer",
      titleClass: "mb-1 text-sm font-bold leading-snug text-[#f0f4ff]",
      bodyClass: "text-[12.5px] leading-snug text-[#8a9bba]",
      body: "Grey steel columns, beams, and slabs from the Revit / Navisworks model — overlaid and locked so structure reads clearly in the field.",
      rowGapClass: "gap-2.75",
    },
    {
      arrowStroke: "#60a5fa",
      title: "Wall & Slab Layer",
      body: "Semi-transparent blue panels for walls, slabs, and openings — your teams verify edges and penetrations before anything is built in place.",
      rowGapClass: "gap-3",
    },
    {
      arrowStroke: "#f87171",
      title: "MEP Pipes & Ducts",
      body: "Red for HVAC, blue for water, green for electrical — each trade in its own colour. Toggle layers on site to isolate systems for clash inspection.",
      rowGapClass: "gap-3",
      clashPill: true,
    },
    {
      arrowStroke: "#F58A0B",
      title: "AR Anchor Points",
      body: "Pulsing amber markers are GPS + LiDAR anchor nodes — they lock the BIM to physical coordinates so the overlay does not drift between walks.",
      rowGapClass: "gap-3",
    },
  ],
};

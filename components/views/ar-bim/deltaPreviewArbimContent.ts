import type { DeltaArbimPreviewContent } from "@/components/shared/DeltaArbimInteractivePreview";
import type {
  AboutUsBimCanvasUi,
  AboutUsBimLayerToggle,
} from "@/components/views/home/AboutUsBimCanvas";

/** AR-BIM page: layer toggle buttons (OT wing — six IFC trades). */
export const AR_BIM_LAYER_TOGGLERS: AboutUsBimLayerToggle[] = [
  {
    key: "struct",
    label: "STRUCTURE",
    tw: "border-slate-400/40 bg-slate-400/10 text-slate-400",
  },
  {
    key: "wall",
    label: "WALLS",
    tw: "border-blue-400/40 bg-blue-400/10 text-blue-400",
  },
  {
    key: "mepr",
    label: "MEP HVAC",
    tw: "border-red-400/40 bg-red-400/10 text-red-400",
  },
  {
    key: "mepb",
    label: "PLUMBING",
    tw: "border-sky-400/40 bg-sky-400/10 text-sky-400",
  },
  {
    key: "mepy",
    label: "MED GAS",
    tw: "border-[#EAB30866] bg-[#EAB30814] text-[#eab308]",
  },
  {
    key: "mepg",
    label: "ELECTRICAL",
    tw: "border-green-400/40 bg-green-400/10 text-green-400",
  },
];

/** AR-BIM page: viewer chrome (same Three.js scene, different HUD copy / accents). */
export const AR_BIM_PAGE_CANVAS_UI: Partial<AboutUsBimCanvasUi> = {
  overlayBadge: "BIM OVERLAY LIVE",
  overlayDotClass: "bg-sl-cyan",
  overlayTextClass: "text-sl-cyan/70",
  footerLeft: "DELTA-ARBIM // OT WING — FLOOR 2",
  footerLeftClass: "font-mono text-[8px] tracking-[0.14em] text-orange-400/55",
  cornerAccent: "border-orange-400/45",
  innerRing: "border-orange-400/28",
  lidarScanLineClass:
    "pointer-events-none absolute left-0 right-0 z-10 h-0.5 animate-[about-us-lidar-scan_4.5s_ease-in-out_infinite] bg-linear-to-r from-transparent via-[#1dcfcf]/65 to-transparent motion-reduce:animate-none",
  canvasAriaLabel: "AR BIM live overlay — drag to rotate",
};

/** AR-BIM page: metrics, log, ticker, and legend — distinct from About / default. */
export const AR_BIM_DELTA_PREVIEW_CONTENT: DeltaArbimPreviewContent = {
  ariaLabel: "AR BIM live session preview",
  metricsHeader: "DELTA-ARBIM // OT WING — LIVE SCAN",
  clashLabel: "CLASH DETECTION ON",
  metrics: [
    {
      value: "0",
      label: "CLASHES",
      valueClass: "mb-0.5 font-mono text-sm font-medium leading-none text-green-400",
    },
    {
      value: "6",
      label: "IFC LAYERS",
      valueClass: "mb-0.5 font-mono text-sm font-medium leading-none text-sl-cyan",
    },
    {
      value: "99.1%",
      label: "OT ALIGN",
      valueClass: "mb-0.5 font-mono text-sm font-medium leading-none text-orange-400",
    },
    {
      value: "PASS",
      label: "PRESSURE",
      valueClass: "mb-0.5 font-mono text-[13px] font-medium leading-none text-[#1dcfcf]",
      labelClass: "font-mono text-[8px] tracking-widest text-[#8a9bba]",
      cellBorderClass: "border-white/6",
    },
  ],
  logLines: [
    {
      dot: "green",
      html: "<strong>OT-1 slab</strong> — raised floor aligned within 1.5mm",
      time: "0:02s",
    },
    {
      dot: "cyan",
      html: "<strong>HVAC supply duct</strong> — positive pressure route confirmed",
      time: "0:04s",
    },
    {
      dot: "amber",
      html: "<strong>Med gas O₂ line</strong> — wall outlet positions validated",
      time: "0:07s",
    },
    {
      dot: "green",
      html: "<strong>Plumbing riser</strong> — no clash with electrical conduit",
      time: "0:9s",
    },
    {
      dot: "red",
      html: "<strong>OT rated walls</strong> — double-layer isolation verified",
      time: "0:11s",
    },
  ],
  tickerItems: [
    { dotClass: "bg-green-400", text: "OT-1 ZERO CLASHES" },
    { dotClass: "bg-red-400", text: "HVAC POSITIVE PRESSURE OK" },
    { dotClass: "bg-[#eab308]", text: "MED GAS O₂ LINE MAPPED" },
    { dotClass: "bg-blue-400", text: "PLUMBING RISER SYNCED" },
    { dotClass: "bg-green-400", text: "ELECTRICAL CONDUIT CLEAR" },
    { dotClass: "bg-sl-cyan", text: "6 IFC LAYERS ACTIVE" },
    { dotClass: "bg-sl-saffron", text: "OT ALIGNMENT 99.1%" },
    { dotClass: "bg-[#94a3b8]", text: "RATED WALL VERIFIED" },
  ],
  legendTitle: "OT WING // LAYER BREAKDOWN",
  legendTitleClass:
    "mb-0.5 font-mono text-xs font-medium tracking-widest text-orange-400",
  legendItems: [
    {
      arrowStroke: "#94a3b8",
      title: "Structure + Equipment",
      body: "Concrete columns, floor slab, ceiling slab, and the OT raised sub-floor for drainage. Includes OT table, surgical light, and scrub sink as IFC equipment elements.",
      rowGapClass: "gap-3",
    },
    {
      arrowStroke: "#94a3b8",
      title: "Walls — OT Rated",
      titleClass: "mb-1 text-sm font-bold leading-snug text-[#f0f4ff]",
      bodyClass: "text-[12.5px] leading-snug text-[#8a9bba]",
      body: "Double-thick rated walls around OT-1 for acoustic and pressure isolation. Corridor partitions with door openings. Scrub room and utility room partitions in standard grey.",
      rowGapClass: "gap-2.75",
    },
    {
      arrowStroke: "#f87171",
      title: "HVAC — Positive Pressure",
      body: "Main supply duct along corridor ceiling with branch into OT-1. Cross-distribution duct and return air at a lower height. Scrub room gets a separate branch. Critical for OT sterility.",
      rowGapClass: "gap-3",
      clashPill: true,
    },
    {
      arrowStroke: "#60a5fa",
      title: "Plumbing + Drainage",
      body: "Vertical riser in utility room feeds scrub sink supply. Brown-tinted drainage lines run under the OT raised floor — IFC waste colour standard.",
      rowGapClass: "gap-3",
    },
    {
      arrowStroke: "#F58A0B",
      title: "Medical Gas — O₂, N₂O, Vacuum",
      body: "Yellow IFC-standard lines. Vertical riser from utility manifold, horizontal feed at 1.8m wall-outlet height into OT-1. Stubs mark gas outlet positions for anaesthesia and surgical use.",
      rowGapClass: "gap-3",
    },
    {
      arrowStroke: "#4ade80",
      title: "Electrical — Backup Power",
      body: "Cable tray along corridor ceiling branches into OT-1 for surgical lights and UPS-backed outlets. Vertical conduit riser in utility room connects to distribution board.",
      rowGapClass: "gap-3",
    },
  ],
};

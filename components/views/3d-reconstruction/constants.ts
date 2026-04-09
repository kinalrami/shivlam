export const RECON_MQ_ITEMS = [
  "3D RECONSTRUCTION",
  "POINT CLOUD · MESH",
  "LIDAR DENSE SCAN",
  "PHOTOGRAMMETRY",
  "BIM READY DELIVERABLES",
  "IFC · RVT · NWD",
  "NEURAL SURFACE FIT",
  "OPEN3D · PCL",
  "SITE DIGITAL TWIN",
  "CONSTRUCTION AS-BUILT",
  "SPATIAL QA",
  "FIELD CAPTURE",
] as const;

/** Pill copy (UI) + short graph labels (canvas at ~8px mono). Same order. */
export const RECON_STACK_ENTRIES = [
  { pill: "Open3D · PCL", graphLabel: "Open3D" },
  { pill: "CloudCompare", graphLabel: "CC" },
  { pill: "Metashape / photogrammetry", graphLabel: "Photo" },
  { pill: "Unity pipelines", graphLabel: "Unity" },
  { pill: "Revit / IFC export", graphLabel: "Revit" },
  { pill: "Python tooling", graphLabel: "Python" },
  { pill: "ARKit / LiDAR capture", graphLabel: "LiDAR" },
  { pill: "Mesh cleanup", graphLabel: "Mesh" },
  { pill: "QA automation", graphLabel: "QA" },
] as const;

export const RECON_STACK_PILLS = RECON_STACK_ENTRIES.map((e) => e.pill);

export const RECON_STACK_GRAPH_LABELS = RECON_STACK_ENTRIES.map(
  (e) => e.graphLabel,
);

/** Hover tooltip specs for Analytics floor canvas — keys shown teal, values orange. */
export const RECON_FLOOR_ROOMS_DATA = [
  {
    id: "Room_101",
    x: 0.06,
    y: 0.08,
    w: 0.38,
    h: 0.35,
    data: { Area: "45 sqm", Wall_Type: "Concrete", Ceiling_H: "3.2m", HVAC: "Active" },
  },
  {
    id: "Room_102",
    x: 0.06,
    y: 0.48,
    w: 0.18,
    h: 0.38,
    data: { Area: "22 sqm", Wall_Type: "Brick", Ceiling_H: "3.0m", HVAC: "Passive" },
  },
  {
    id: "Room_103",
    x: 0.28,
    y: 0.48,
    w: 0.18,
    h: 0.38,
    data: { Area: "18 sqm", Wall_Type: "Gypsum", Ceiling_H: "2.8m", HVAC: "None" },
  },
  {
    id: "Corridor",
    x: 0.5,
    y: 0.08,
    w: 0.18,
    h: 0.78,
    data: { Area: "12 sqm", Wall_Type: "Plaster", Ceiling_H: "3.2m", Fire_Exit: "Yes" },
  },
  {
    id: "Room_104",
    x: 0.72,
    y: 0.08,
    w: 0.24,
    h: 0.38,
    data: { Area: "30 sqm", Wall_Type: "Concrete", Ceiling_H: "3.2m", HVAC: "Active" },
  },
  {
    id: "Room_105",
    x: 0.72,
    y: 0.5,
    w: 0.24,
    h: 0.36,
    data: { Area: "16 sqm", Wall_Type: "Tile", Ceiling_H: "2.6m", Water_Points: "3" },
  },
] as const;

/** Process section technology chips (light section footer row). */
export const RECON_PROCESS_TECH = [
  "Swift",
  "ARKit",
  "Unity",
  "Next.js",
  "IFC.js",
  "Three.js",
] as const;

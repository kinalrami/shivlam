export const ARBIM_MQ_ITEMS = [
  "AR BIM DEVELOPMENT",
  "LIDAR PRECISION",
  "IFC · REVIT · NWD",
  "3D RECONSTRUCTION",
  "CLASH DETECTION",
  "AR VR SOLUTIONS",
  "SWIFT IOS · UNITY · ARKIT · LIDAR · FORGE",
  "REAL-TIME OVERLAY",
  "POINT CLOUD CAPTURE",
  "ON-SITE VALIDATION",
  "CONSTRUCTION TECH",
  "DELTAARBIM",
] as const;

/** Pill copy (UI) + short graph labels (canvas at ~8px mono). Same order. */
export const ARBIM_STACK_ENTRIES = [
  { pill: "Swift Native iOS", graphLabel: "Swift iOS" },
  { pill: "Unity", graphLabel: "Unity" },
  { pill: "ARKit", graphLabel: "ARKit" },
  { pill: "Apple ARKit - LiDAR", graphLabel: "ARKit LiDAR" },
  { pill: "Autodesk Forge", graphLabel: "Forge" },
  { pill: "Pixyz Plugin", graphLabel: "Pixyz" },
  { pill: "Tridify", graphLabel: "Tridify" },
  { pill: "VIM", graphLabel: "VIM" },
  { pill: "Python", graphLabel: "Python" },
] as const;

export const ARBIM_STACK_PILLS = ARBIM_STACK_ENTRIES.map((e) => e.pill);

export const ARBIM_STACK_GRAPH_LABELS = ARBIM_STACK_ENTRIES.map(
  (e) => e.graphLabel,
);


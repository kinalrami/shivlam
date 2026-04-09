export const ARVR_MARQUEE_ITEMS = [
  "AR VR SOLUTIONS",
  "UNITY ENGINE",
  "SWIFT · ARKIT",
  "DIGITAL TWINS",
  "IMMERSIVE ANALYTICS",
  "VIRTUAL WALKTHROUGHS",
  "CLASH DETECTION",
  "TRAINING SIMULATION",
  "ZERO LATENCY",
  "REALITYKIT",
  "SPATIAL COMPUTING",
  "SHIVLAM · BHARAT",
] as const;

export const ARVR_USE_CASES = [
  {
    type: "walk",
    tag: "Virtual Walkthroughs",
    title: "Stakeholder Validation",
    desc: "High-fidelity Revit and IFC model exploration for stakeholder validation. Walk through the unbuilt at true scale — before ground is broken.",
    pills: ["IFC_VERSION: 2x3", "RENDER: REAL-TIME"],
  },
  {
    type: "clash",
    tag: "Clash Detection",
    title: "MEP Conflict Resolution",
    desc: "Immersive 3D environments to detect structural and MEP conflicts in real-time. Walk to the exact clash point — spatially resolved in AR.",
    pills: ["CLASH_ENGINE: ACTIVE", "LATENCY: 14ms"],
  },
  {
    type: "train",
    tag: "Training & Simulation",
    title: "Industrial Operations",
    desc: "Complex logic setups for industrial operations and maintenance training. Physics-accurate simulations that reduce onboarding time and safety incidents.",
    pills: ["PHYSICS: ACTIVE", "SYNC_STATUS: LIVE"],
  },
] as const;


/** Same content shell as home / AR BIM pages */
export const SECTION_SHELL = "mx-auto w-full max-w-325 px-5 md:px-12";

export const TIMELINE = [
  {
    year: "2014",
    title: "Corporate Engineering Roots",
    desc: "Our founding team began careers in enterprise software and construction technology — working on large-scale platform architecture for Tier-1 construction companies across India and internationally.",
    tag: "FOUNDATION",
  },
  {
    year: "2018",
    title: "Identifying the Problem",
    desc: "After years of building software for construction clients, the pattern became clear — BIM models existed in laptops while workers built from printed drawings. The gap between design and site was costing everyone.",
    tag: "INSIGHT",
  },
  {
    year: "2022",
    title: "Shivlam — A New Chapter",
    desc: "After 10+ years in corporate tech, the team founded Shivlam — a focused product studio built around one idea: technology should solve real problems for real workers, not just look good in demos.",
    tag: "COMPANY FOUNDED",
  },
  {
    year: "2023",
    title: "DeltaARBIM — Concept to Prototype",
    desc: "The first working prototype of DeltaARBIM demonstrated live BIM overlay on a real construction floor using LiDAR-anchored spatial tracking. The results validated everything the team had suspected for years.",
    tag: "PRODUCT BIRTH",
  },
  {
    year: "2026",
    title: "Active Development — Coming Soon",
    desc: "DeltaARBIM is in active development with early access partners from the construction and MEP contracting space. We're building toward a public launch that brings enterprise-grade BIM AR to every job site in Bharat and beyond.",
    tag: "IN DEVELOPMENT",
  },
] as const;

export const MSTATS = [
  {
    val: "30%",
    title: "Average Rework Cost Reduction",
    desc: "Sites using AR BIM overlays report up to 30% reduction in costly construction rework through early clash detection.",
  },
  {
    val: "±2cm",
    title: "Spatial Accuracy",
    desc: "LiDAR + computer vision anchoring locks BIM models to real-world coordinates with centimeter-level precision.",
  },
  {
    val: "60fps",
    title: "Real-Time AR Render Rate",
    desc: "Full BIM geometry renders at 60 frames per second — no lag, no stuttering, even for complex multi-storey models.",
  },
  {
    val: "IFC",
    title: "Open BIM Standard Support",
    desc: "Accepts IFC, RVT, NWD and all major BIM formats. No proprietary lock-in. Works with Revit, Navisworks, and ArchiCAD.",
  },
] as const;

export const VALUES = [
  {
    icon: "◎",
    num: "01",
    title: "Accuracy Above All",
    desc: "Construction errors aren't UX problems — they're structural failures. Every feature we build is held to centimeter-level accuracy as a non-negotiable baseline.",
  },
  {
    icon: "⬡",
    num: "02",
    title: "Field-First Design",
    desc: "We design for dusty hands, bright sun, and noisy job sites — not for conference room demos. If it doesn't work on the floor, it doesn't ship.",
  },
  {
    icon: "◈",
    num: "03",
    title: "Open Standards",
    desc: "We built on IFC and open BIM standards from day one. No proprietary lock-in. Your model, your data — accessible from any tool in your existing workflow.",
  },
  {
    icon: "◻",
    num: "04",
    title: "Lean and Deliberate",
    desc: "We run a team of 10+. Not because we can't scale, but because we believe the best software comes from people who take personal ownership of every decision.",
  },
  {
    icon: "⊞",
    num: "05",
    title: "Built for Bharat",
    desc: "India's construction market is one of the world's largest. We build for that scale, that complexity, and those conditions first — then take it everywhere else.",
  },
  {
    icon: "⚡",
    num: "06",
    title: "Ship Real, Not Demo",
    desc: "Every product we deliver is a production deployment. No half-finished features, no perpetual betas. 50+ projects across our portfolio — every single one live.",
  },
] as const;

export const SB_CHIPS = [
  "AR / BIM TECH",
  "MOBILE & WEB",
  "eCOM PLATFORMS",
  "DIGITAL IDENTITY",
  "API ENGINEERING",
  "DEVOPS & INFRA",
] as const;

export const TECH = [
  {
    icon: "◎",
    name: "LiDAR + Computer Vision",
    desc: "Spatial anchoring via on-device LiDAR and CV pipelines, enabling markerless BIM overlay with centimeter accuracy.",
    tag: "CORE AR",
  },
  {
    icon: "⬡",
    name: "IFC / Revit / Navisworks",
    desc: "Native parser for all major BIM formats. Geometry, MEP layers, structural metadata — all processed in the cloud and delivered to device.",
    tag: "BIM ENGINE",
  },
  {
    icon: "◈",
    name: "iOS & Android AR SDKs",
    desc: "Built on ARKit and ARCore for maximum device compatibility. Full 60fps rendering of complex BIM geometry on standard field hardware.",
    tag: "MOBILE PLATFORM",
  },
  {
    icon: "⊞",
    name: "Cloud Sync & Collaboration",
    desc: "Real-time model sync across devices on the same site. Webhook integrations with Procore, Autodesk Construction Cloud, and custom APIs.",
    tag: "PLATFORM",
  },
] as const;

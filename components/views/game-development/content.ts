export type GameDevStatItem = { value: string; label: string };

export type GameDevServiceCard = {
  tag: string;
  title: string;
  desc: string;
  pills: readonly string[];
};

export type GameDevContent = {
  hero: {
    tagline: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    meta: readonly string[];
  };
  marquee: readonly string[];
  services: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    cards: readonly GameDevServiceCard[];
  };
  portfolioCta: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    lead: string;
    stats: readonly GameDevStatItem[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  finalCta: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    contactEmail: string;
    website: string;
    portfolioHref: string;
  };
};

export const GAME_DEVELOPMENT_CONTENT: Record<"game" | "unity" | "visionPro", GameDevContent> = {
  game: {
    hero: {
      tagline: "UNITY · AR GAMES · VISION PRO · MOBILE",
      titleBefore: "Hire Leading",
      titleHighlight: "Game Development",
      titleAfter: "Company.",
      description:
        "From Unity mobile games to AR experiences and Apple Vision Pro spatial games — we build immersive, high-performance games that captivate players and ship on time to every store.",
      primaryCta: { label: "Get a Free Quote →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: { label: "View Games Portfolio", href: "/work-portfolio#sec-games" },
      meta: ["Unity Game Development", "AR Game Development", "Vision Pro Games", "Mobile Games", "App Store + Play Store"],
    },
    marquee: [
      "UNITY",
      "AR GAME DEV",
      "VISION PRO",
      "VISIONOS",
      "REALITYKIT",
      "ARKIT",
      "C# SCRIPTING",
      "MOBILE GAMES",
      "PLAY STORE",
      "APP STORE",
      "SPATIAL GAMING",
      "3D RENDERING",
      "GAME DESIGN",
      "PHYSICS ENGINE",
      "SHIVLAM.COM",
    ],
    services: {
      sectionId: "services",
      headingId: "game-services-heading",
      eyebrow: "GAME SERVICES",
      title: { before: "What We Build in ", highlight: "Game Development", after: "" },
      lead: "Production-ready pipelines, smooth performance, and game feel that players notice.",
      cards: [
        {
          tag: "MOBILE",
          title: "Unity Mobile Games",
          desc: "Casual, hyper-casual, puzzle, runner, and action titles with ad/IAP integration and device optimisation.",
          pills: ["Unity", "Android", "iOS", "Ads/IAP"],
        },
        {
          tag: "AR",
          title: "AR Games & Experiences",
          desc: "ARCore/ARKit plane detection, physics interactions, world anchors, and gameplay designed for real spaces.",
          pills: ["ARCore", "ARKit", "Unity XR", "Physics"],
        },
        {
          tag: "SYSTEMS",
          title: "Multiplayer & Live Ops",
          desc: "Leaderboards, matchmaking, analytics, events, and server-backed progression that scales.",
          pills: ["Photon", "PlayFab", "Leaderboards", "Analytics"],
        },
        {
          tag: "QUALITY",
          title: "Optimisation & QA",
          desc: "FPS stability, memory tuning, build automation, and test passes across real devices.",
          pills: ["Profiling", "CI Builds", "Device QA", "60 FPS"],
        },
      ],
    },
    portfolioCta: {
      sectionId: "portfolio-cta",
      headingId: "game-portfolio-cta",
      eyebrow: "WORK PORTFOLIO",
      titleBefore: "Every Game Has a",
      titleHighlight: "Story Behind It.",
      lead: "From GDD to gold master — explore the full behind-the-scenes of our most impactful games. Mechanics, art direction, performance challenges, and launch results.",
      stats: [
        { value: "10+", label: "Games Shipped" },
        { value: "2", label: "Stores Live" },
        { value: "5+", label: "Countries" },
      ],
      primaryCta: { label: "View Full Portfolio →", href: "/work-portfolio#sec-games" },
      secondaryCta: { label: "Start a Game Project", href: "https://shivlam.com/contact-us/" },
    },
    finalCta: {
      eyebrow: "GET IN TOUCH TODAY",
      titleBefore: "Ready to Build Your",
      titleHighlight: "Game?",
      lead: "Let's chat about your game idea — mobile, AR, or Vision Pro. Drop us a line and we'll respond within hours with a clear scope and quote.",
      primaryCta: { label: "Email Us →", href: "mailto:hi@shivlam.com" },
      secondaryCta: { label: "Contact Form", href: "https://shivlam.com/contact-us/" },
      contactEmail: "hi@shivlam.com",
      website: "shivlam.com",
      portfolioHref: "/work-portfolio#sec-games",
    },
  },
  unity: {
    hero: {
      tagline: "UNITY · C# · 2D/3D · ADS/IAP · OPTIMISATION",
      titleBefore: "Unity",
      titleHighlight: "Mobile Game",
      titleAfter: "Development.",
      description:
        "We build Unity mobile games that feel great to play — smooth FPS, fast iteration, and monetisation-ready systems.",
      primaryCta: { label: "Start Unity Project →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: { label: "See Portfolio", href: "/work-portfolio#sec-games" },
      meta: ["Unity", "C#", "Ads/IAP", "Android + iOS"],
    },
    marquee: [
      "UNITY",
      "AR GAME DEV",
      "MOBILE GAMES",
      "C# SCRIPTING",
      "PHYSICS ENGINE",
      "GAME DESIGN",
      "PLAY STORE",
      "APP STORE",
      "SHIVLAM.COM",
    ],
    services: {
      sectionId: "services",
      headingId: "unity-services-heading",
      eyebrow: "UNITY SERVICES",
      title: { before: "Unity Mobile Games with ", highlight: "Production Polish", after: "" },
      lead: "Gameplay loops, UI, performance tuning, and store-ready delivery.",
      cards: [
        {
          tag: "GAMEPLAY",
          title: "Core Mechanics & Feel",
          desc: "Tuning input, physics, camera, and VFX for a satisfying game feel across devices.",
          pills: ["Physics", "VFX", "Camera", "Controls"],
        },
        {
          tag: "MONETISATION",
          title: "Ads, IAP & Economy",
          desc: "Rewarded ads, purchases, pricing, progression, and analytics instrumentation.",
          pills: ["Unity Ads", "IAP", "Economy", "Analytics"],
        },
        {
          tag: "PIPELINE",
          title: "Builds & QA",
          desc: "Automated builds, device QA, crash monitoring, and release support.",
          pills: ["CI", "Android", "iOS", "QA"],
        },
      ],
    },
    portfolioCta: {
      sectionId: "portfolio-cta",
      headingId: "unity-portfolio-cta",
      eyebrow: "UNITY PORTFOLIO",
      titleBefore: "Unity Games We’ve",
      titleHighlight: "Shipped.",
      lead: "Explore Unity titles and prototypes we’ve delivered.",
      stats: [
        { value: "20+", label: "Unity Projects" },
        { value: "60 FPS", label: "Target" },
        { value: "Live", label: "Store Releases" },
      ],
      primaryCta: { label: "View Portfolio →", href: "/work-portfolio#sec-games" },
      secondaryCta: { label: "Contact Us", href: "https://shivlam.com/contact-us/" },
    },
    finalCta: {
      eyebrow: "LET’S SHIP",
      titleBefore: "Ship Your Unity Game",
      titleHighlight: "Faster.",
      lead: "We’ll help you go from prototype to store-ready build with stable performance and clean engineering.",
      primaryCta: { label: "Get a Free Quote →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: { label: "Email hi@shivlam.com", href: "mailto:hi@shivlam.com" },
      contactEmail: "hi@shivlam.com",
      website: "shivlam.com",
      portfolioHref: "/work-portfolio#sec-games",
    },
  },
  visionPro: {
    hero: {
      tagline: "VISION PRO · UNITY · SPATIAL · HAND TRACKING",
      titleBefore: "Vision Pro",
      titleHighlight: "Game",
      titleAfter: "Development.",
      description:
        "Spatial gameplay built for Apple Vision Pro — immersive interactions, performance budgets, and production-ready delivery.",
      primaryCta: { label: "Start Vision Pro Build →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: { label: "See Work Portfolio", href: "/work-portfolio#sec-games" },
      meta: ["Unity", "Spatial UX", "Performance", "Shipping Support"],
    },
    marquee: [
      "VISION PRO",
      "VISIONOS",
      "SPATIAL GAMING",
      "UNITY",
      "REALITYKIT",
      "ARKIT",
      "3D RENDERING",
      "PHYSICS ENGINE",
      "SHIVLAM.COM",
    ],
    services: {
      sectionId: "services",
      headingId: "visionpro-services-heading",
      eyebrow: "VISION PRO SERVICES",
      title: { before: "Spatial Games with ", highlight: "Immersive UX", after: "" },
      lead: "Comfort-first design, stable performance, and interactions that feel native in spatial computing.",
      cards: [
        {
          tag: "UX",
          title: "Spatial UI & Interactions",
          desc: "Comfortable interactions, readable spatial UI, and intuitive navigation patterns.",
          pills: ["Spatial UI", "Comfort", "UX", "Interaction"],
        },
        {
          tag: "PERF",
          title: "Performance Budgets",
          desc: "Frame-time discipline, asset pipelines, and profiling for stable experiences.",
          pills: ["Profiling", "Assets", "Frame Time", "Optimisation"],
        },
        {
          tag: "BUILD",
          title: "Unity XR Delivery",
          desc: "Unity-based spatial builds with production QA and release support.",
          pills: ["Unity", "XR", "QA", "Release"],
        },
      ],
    },
    portfolioCta: {
      sectionId: "portfolio-cta",
      headingId: "visionpro-portfolio-cta",
      eyebrow: "SPATIAL PORTFOLIO",
      titleBefore: "Explore Spatial &",
      titleHighlight: "Game Work.",
      lead: "Browse Unity + spatial projects we’ve shipped.",
      stats: [
        { value: "XR", label: "Spatial Builds" },
        { value: "Unity", label: "Pipeline" },
        { value: "QA", label: "Release Ready" },
      ],
      primaryCta: { label: "View Portfolio →", href: "/work-portfolio#sec-games" },
      secondaryCta: { label: "Contact Us", href: "https://shivlam.com/contact-us/" },
    },
    finalCta: {
      eyebrow: "BUILD SPATIAL",
      titleBefore: "Build a Vision Pro Game",
      titleHighlight: "That Feels Native.",
      lead: "We’ll help you design, build, optimise, and ship a spatial gameplay experience.",
      primaryCta: { label: "Get a Free Quote →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: { label: "Email hi@shivlam.com", href: "mailto:hi@shivlam.com" },
      contactEmail: "hi@shivlam.com",
      website: "shivlam.com",
      portfolioHref: "/work-portfolio#sec-games",
    },
  },
};


import type { WhyHireSectionContent } from "@/components/views/mobile-app-development/content";
import type { GameArDeepDiveContent, GameVisionProDeepDiveContent } from "@/components/shared/arShowcaseTypes";
import type { PortfolioGridSectionContent } from "@/components/shared/portfolioGridTypes";

export type GameDevStatItem = { value: string; label: string };

export type GameDevServiceCard = {
  tag: string;
  title: string;
  desc: string;
  pills: readonly string[];
};

export type GameDevSpecCard = {
  cardTone: "unity" | "ar" | "vp" | "design";
  tag: string;
  title: string;
  desc: string;
  pills: readonly string[];
  href: string;
  ctaLabel: string;
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
  statsStrip: readonly { value: string; label: string }[];
  specialisations: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    cards: readonly GameDevSpecCard[];
  };
  midCta: {
    titleBefore: string;
    titleHighlight: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    microcopy: string;
  };
  whyHire: WhyHireSectionContent;
  arDeepDive: GameArDeepDiveContent;
  visionProDeepDive: GameVisionProDeepDiveContent;
  /** Centered intro + 6-card grid (standalone section, not WhyHire). */
  whyAdvantages: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    cards: readonly {
      num: string;
      title: string;
      desc: string;
      tag: string;
    }[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  portfolioGrid: PortfolioGridSectionContent;
  unityShippedGames: readonly { label: string; href: string }[];
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
  more: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    items: readonly { tag: string; title: string; desc: string; href: string }[];
  };
  clients: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    line: string;
  };
  process: {
    sectionId: string;
    headingId: string;
    eyebrow: string;
    title: { before: string; highlight: string; after?: string };
    lead: string;
    steps: readonly { num: string; tag: string; title: string; desc: string }[];
  };
};

export const GAME_DEVELOPMENT_CONTENT: Record<"game", GameDevContent> = {
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
    statsStrip: [
      { value: "10+", label: "GAMES SHIPPED" },
      { value: "99%", label: "COMPLETION RATE" },
      { value: "2", label: "STORES: iOS + ANDROID" },
      { value: "5+", label: "COUNTRIES PLAYED" },
    ],
    specialisations: {
      sectionId: "specialisations",
      headingId: "specialisations-heading",
      eyebrow: "SPECIALISATIONS",
      title: { before: "Four Game Development ", highlight: "Specialisations.", after: " One Expert Team." },
      lead: "Whether you're launching a mobile casual game, an AR experience, or a Vision Pro spatial game — we build it, polish it, and ship it.",
      cards: [
        {
          cardTone: "unity",
          tag: "UNITY ENGINE",
          title: "Unity Mobile Game Development",
          desc: "Full-cycle Unity game development for iOS and Android. From 2D casual games to 3D action titles — C# scripting, physics tuning, monetisation setup, and dual-store launch.",
          pills: ["Unity 2023", "C# Scripting", "2D & 3D", "Physics Engine", "Play Store", "App Store"],
          href: "/services/unity-mobile-game-development",
          ctaLabel: "Learn More →",
        },
        {
          cardTone: "ar",
          tag: "AR GAMES",
          title: "AR Game Development",
          desc: "Augmented reality games using ARKit, ARCore, and Unity AR Foundation. Real-world anchoring, plane detection, multiplayer AR, and LiDAR-enhanced depth for next-level immersion.",
          pills: ["ARKit", "ARCore", "AR Foundation", "LiDAR", "Multiplayer AR", "Unity"],
          href: "/services/ar-vr-solution",
          ctaLabel: "Learn More →",
        },
        {
          cardTone: "vp",
          tag: "SPATIAL",
          title: "Apple Vision Pro Game Development",
          desc: "Spatial game experiences for Apple Vision Pro using SwiftUI, RealityKit, and Unity for visionOS. Eye tracking, hand gestures, mixed reality environments, and immersive 3D worlds.",
          pills: ["visionOS", "RealityKit", "Unity", "Eye Tracking", "Hand Gestures", "SwiftUI"],
          href: "/services/vision-pro-game-development",
          ctaLabel: "Learn More →",
        },
        {
          cardTone: "design",
          tag: "DESIGN",
          title: "Game Design & Art Direction",
          desc: "Concept art, level design, character design, UI/UX for games, and complete art pipelines. From GDD (Game Design Document) to final polished assets ready for engine integration.",
          pills: ["Level Design", "Character Art", "GDD", "Game UI/UX", "Animation", "VFX"],
          href: "https://shivlam.com/contact-us/",
          ctaLabel: "Discuss Your Game →",
        },
      ],
    },
    midCta: {
      titleBefore: "Got a Game Concept?",
      titleHighlight: "Let's Build It Together.",
      lead: "Share your idea — we’ll scope it, recommend the right engine and platform, and give you a transparent quote with a clear timeline. No fluff, just game development.",
      primaryCta: { label: "Get a Free Quote →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: { label: "hi@shivlam.com", href: "mailto:hi@shivlam.com" },
      microcopy: "hi@shivlam.com · Fast Response · Unity + AR + visionOS",
    },
    whyHire: {
      sectionId: "why",
      eyebrow: "UNITY GAME DEV",
      titleLine1: "Unity Mobile Games That",
      titleLine2: "Players Actually",
      titleHighlight: "Love.",
      description:
        "We've shipped Unity games across casual, action, puzzle, and AR genres — from concept to Play Store and App Store in one focused development cycle. C#-first, performance-optimised, monetisation-ready.",
      primaryCta: { label: "Unity Game Dev →", href: "/services/unity-mobile-game-development" },
      secondaryCta: { label: "See Games Portfolio", href: "/work-portfolio#sec-games" },
      codeFilename: "UnityEditor",
      codeLangLabel: "C#",
      phoneChip1: "✓ 60 FPS",
      phoneChip2: "⬡ Optimised",
      phoneChip3: "◎ Shipped",
      stats: [
        { val: "10+", lbl: "Games Shipped" },
        { val: "99%", lbl: "Completion" },
        { val: "2", lbl: "Stores" },
      ],
      cards: [
        {
          icon: "oneCodebase",
          digit: "01",
          accent: "cyan",
          title: "Cross-Platform Build",
          desc: "One Unity project, two stores. iOS and Android from the same clean codebase with platform-specific optimisations.",
        },
        {
          icon: "performance",
          digit: "02",
          accent: "cyan",
          title: "Performance First",
          desc: "60fps targets, draw call batching, LOD management, and memory profiling — games that don't lag on mid-range devices.",
        },
        {
          icon: "briefcase",
          digit: "03",
          accent: "cyan",
          title: "Monetisation Ready",
          desc: "Unity Ads, in-app purchases, rewarded videos, and subscription models — all integrated and store-compliant from day one.",
        },
        {
          icon: "stores",
          digit: "04",
          accent: "cyan",
          title: "Store Launch & ASO",
          desc: "Play Store and App Store submission with metadata, screenshots, promo art, and compliance review handled end to end.",
        },
      ],
    },
    arDeepDive: {
      sectionId: "ar",
      headingId: "game-ar-deep-dive-heading",
      eyebrow: "AR GAME DEV",
      titleLines: [
        [{ text: "Augmented Reality Games" }],
        [{ text: "That Blend " }, { text: "Real & Virtual.", emphasis: true }],
      ],
      description:
        "We build AR games where the real world is the level. Using ARKit, ARCore, and Unity AR Foundation — we deliver plane detection, object anchoring, real-time occlusion, and multiplayer AR sessions that work on any modern smartphone.",
      features: [
        {
          icon: "plus",
          title: "World Tracking & Plane Detection",
          desc: "Real-world surface detection — floors, walls, and tables become game surfaces. Persistent world anchors across sessions.",
        },
        {
          icon: "target",
          title: "LiDAR-Enhanced Depth",
          desc: "On LiDAR-equipped iPhones and iPads — instant AR, real-time occlusion, and physics-accurate world integration.",
        },
        {
          icon: "check",
          title: "Multiplayer AR Sessions",
          desc: "Shared AR world across multiple players. Same anchors, same physics, real-time sync via Unity Netcode or Photon.",
        },
      ],
      primaryCta: { label: "Build an AR Game →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: {
        label: "AR/VR Services",
        href: "https://shivlam.com/augmented-reality-app-development-ar-solutions-experts/",
      },
    },
    visionProDeepDive: {
      sectionId: "visionpro",
      headingId: "game-visionpro-deep-dive-heading",
      eyebrow: "VISION PRO",
      titleLines: [
        [{ text: "Apple Vision Pro Games." }],
        [{ text: "The " }, { text: "Next Frontier", emphasis: true }, { text: " of Play." }],
      ],
      description:
        "Vision Pro changes how people interact with digital worlds. Eye tracking, hand gestures, mixed reality windows — we build spatial games that use every capability of Apple's most powerful device.",
      pills: [
        { label: "visionOS", variant: "purple" },
        { label: "RealityKit", variant: "cyan" },
        { label: "Unity for Vision Pro", variant: "orange" },
        { label: "SwiftUI", variant: "purple" },
        { label: "Eye Tracking", variant: "cyan" },
        { label: "Hand Gestures", variant: "orange" },
        { label: "Spatial Audio", variant: "purple" },
      ],
      cardGrid: [
        {
          tag: "◎ SPATIAL",
          title: "Immersive Environments",
          desc: "Full-immersion and passthrough mixed reality game worlds.",
        },
        {
          tag: "⬡ GESTURE",
          title: "Hand & Eye Input",
          desc: "Natural interaction — pinch, look, and gaze as game controls.",
        },
        {
          tag: "▣ AUDIO",
          title: "Spatial Audio",
          desc: "3D positional audio that places sound precisely in the room.",
        },
        {
          tag: "✦ SHARE",
          title: "SharePlay Multiplayer",
          desc: "FaceTime-integrated multiplayer and collaborative game sessions.",
        },
      ],
      primaryCta: {
        label: "Vision Pro Dev →",
        href: "https://shivlam.com/apple-vision-pro-game-development-ar-vr-experts/",
      },
      secondaryCta: { label: "Discuss Your Idea", href: "https://shivlam.com/contact-us/" },
    },
    whyAdvantages: {
      sectionId: "advantages",
      headingId: "game-why-advantages-heading",
      eyebrow: "WHY HIRE US",
      titleLine1: "Advantage of Our Best",
      titleLine2: "Game Development Services.",
      lead:
        "We hold a strong belief in operating in a manner that mirrors our games: polished, reliable, and built for players. Our commitment is to not only ship on time, but to ship something great.",
      cards: [
        {
          num: "01",
          title: "Unity Expertise, Real Experience",
          desc: "We don't just know Unity — we've shipped commercial games on Play Store and App Store with it. Real editor experience, C# scripting, and engine-level problem solving.",
          tag: "UNITY · C#",
        },
        {
          num: "02",
          title: "Dual Store Launch Ready",
          desc: "From concept to App Store and Play Store approval — we handle metadata, screenshots, compliance, content rating, and review cycles. Your game ships professionally.",
          tag: "APP STORE OPTIMISED",
        },
        {
          num: "03",
          title: "AR & Spatial Computing",
          desc: "ARKit, ARCore, RealityKit, and Unity AR Foundation — we build AR that works reliably on real devices, not just demos. Plus Vision Pro expertise for spatial games.",
          tag: "ARKIT · VISIONOS",
        },
        {
          num: "04",
          title: "Performance-Optimised Builds",
          desc: "60fps on mid-range devices. We profile, batch, and optimise every build — draw calls, memory, asset streaming. Games that run well, not just look good in the editor.",
          tag: "60 FPS TARGET",
        },
        {
          num: "05",
          title: "Monetisation Integration",
          desc: "Unity Ads, AdMob, in-app purchases, subscriptions, and rewarded video — all set up correctly, tested, and compliant with both stores' monetisation policies.",
          tag: "IAP · UNITY ADS",
        },
        {
          num: "06",
          title: "Dedicated Game Dev Team",
          desc: "A dedicated Unity developer, game designer, and QA tester — assigned to your project from GDD to launch. Direct access, no middlemen, transparent milestones.",
          tag: "DEDICATED TEAM",
        },
      ],
      primaryCta: { label: "Start Your Game Project →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: { label: "View Portfolio", href: "#game-portfolio" },
    },
    portfolioGrid: {
      sectionId: "game-portfolio",
      headingId: "game-portfolio-heading",
      eyebrow: "GAME PORTFOLIO",
      titleBefore: "Games We've Shipped &",
      titleHighlight: "Players Love.",
      sideLead:
        "Real games, live on App Store and Play Store — built and shipped by Team Shivlam.",
      gridColumns: 4,
      items: [
        {
          key: "cosmostrike",
          pill: "UNITY · iOS",
          name: "CosmoStrike",
          desc: "Space shooter built in Unity. Fast-paced arcade gameplay with procedural waves, particle FX, and leaderboard integration.",
          href: "https://apps.apple.com/us/app/cosmo-strike/id6499512572",
          linkLabel: "App Store Live",
          preview: { kind: "game", gameType: "shooter", color1: "#AAAAFF", color2: "#FF6B6B" },
        },
        {
          key: "ar-sports",
          pill: "AR · UNITY",
          name: "AR Sports",
          desc: "Augmented reality sports game using ARCore. Real-world plane detection with physics-accurate ball mechanics and scoring.",
          href: "https://play.google.com/store/apps/details?id=com.a300mind.arsports",
          linkLabel: "Play Store Live",
          preview: { kind: "game", gameType: "ar", color1: "#FF6B6B", color2: "#FF9933" },
        },
        {
          key: "vola-vole",
          pill: "UNITY · AR",
          name: "Vola Volé AR",
          desc: "AR ball game where the real environment is the court. Multi-surface detection, custom physics, and real-time scoring.",
          href: "https://play.google.com/store/apps/details?id=com.volavole.volavolear",
          linkLabel: "Play Store Live",
          preview: { kind: "game", gameType: "ar", color1: "#FF9933", color2: "#1DCFCF" },
        },
        {
          key: "merge-2048",
          pill: "UNITY · PUZZLE",
          name: "Merge Card 2048",
          desc: "Casual merge puzzle with Unity 2D, custom card animations, rewarded ads integration, and daily challenge system.",
          href: "https://play.google.com/store/apps/details?id=com.joyhunter.puzzle.merge2048",
          linkLabel: "Play Store Live",
          preview: { kind: "game", gameType: "puzzle", color1: "#AAAAFF", color2: "#1DCFCF" },
        },
        {
          key: "runner-survival",
          pill: "UNITY · RUNNER",
          name: "Runner Survival",
          desc: "Endless runner with procedural level generation, obstacle physics, and Unity's animation rigging for fluid character movement.",
          href: "https://play.google.com/store/apps/details?id=com.envision.temple.runer.game",
          linkLabel: "Play Store Live",
          preview: { kind: "game", gameType: "runner", color1: "#FF9933", color2: "#FF6B6B" },
        },
        {
          key: "color-ring",
          pill: "UNITY · PUZZLE",
          name: "Color Ring Puzzle",
          desc: "Satisfying colour-matching puzzle. Shader-driven ring animations, haptic feedback, and 200+ hand-crafted levels.",
          href: "https://play.google.com/store/apps/details?id=com.puzzle.rings",
          linkLabel: "Play Store Live",
          preview: { kind: "game", gameType: "puzzle", color1: "#1DCFCF", color2: "#AAAAFF" },
        },
        {
          key: "quizbuzz",
          pill: "UNITY · TRIVIA",
          name: "QuizBuzz Trivia",
          desc: "Real-time multiplayer trivia with Unity + WebSocket backend, leaderboards, daily challenges, and custom quiz categories.",
          href: "https://play.google.com/store/apps/details?id=com.logicalwings.quizbuzz",
          linkLabel: "Play Store Live",
          preview: { kind: "game", gameType: "trivia", color1: "#AAAAFF", color2: "#FF9933" },
        },
        {
          key: "xana",
          pill: "UNITY · XANA",
          name: "XANA Builder",
          desc: "Metaverse builder game with Unity. 3D object placement, customisable environments, and NFT asset integration.",
          href: "https://play.google.com/store/apps/details?id=com.nbi.xana",
          linkLabel: "Play Store Live",
          preview: { kind: "game", gameType: "spatial", color1: "#C084FC", color2: "#1DCFCF" },
        },
      ],
    },
    unityShippedGames: [
      { label: "CosmoStrike", href: "https://apps.apple.com/us/app/cosmo-strike/id6499512572" },
      { label: "XANA", href: "https://play.google.com/store/apps/details?id=com.nbi.xana" },
      { label: "Merge Card 2048", href: "https://play.google.com/store/apps/details?id=com.joyhunter.puzzle.merge2048" },
      { label: "Runner Survival", href: "https://play.google.com/store/apps/details?id=com.envision.temple.runer.game" },
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
    more: {
      sectionId: "more",
      headingId: "more-heading",
      eyebrow: "EXPLORE MORE SERVICES",
      title: { before: "Building More Than ", highlight: "Games", after: "?" },
      lead: "",
      items: [
        {
          tag: "MOBILE",
          title: "iPhone App Development",
          desc: "Native iOS apps in Swift and SwiftUI — from concept to App Store launch with full AR support.",
          href: "/services/iphone-app-development",
        },
        {
          tag: "MOBILE",
          title: "Android App Development",
          desc: "Kotlin-first Android apps with Material Design and Play Store release pipelines.",
          href: "/services/android-app-development",
        },
        {
          tag: "SPECIALISATION",
          title: "AR VR Solution",
          desc: "LiDAR-powered AR for construction — BIM model overlay, clash detection, and point clouds.",
          href: "/services/ar-vr-solution",
        },
        {
          tag: "MARKETING",
          title: "Mobile Game Marketing",
          desc: "ASO, user acquisition, and growth marketing to get your game discovered and downloaded.",
          href: "https://shivlam.com/digital-marketing-solutions/",
        },
      ],
    },
    clients: {
      sectionId: "clients-strip",
      headingId: "clients-strip-heading",
      eyebrow: "CLIENTS",
      title: { before: "Clients Who ", highlight: "Trust Us", after: "" },
      lead: "Powering Global Innovation — Web, Mobile, Gaming, and Digital Growth across 3+ Continents.",
      line:
        "DeliverEnd · Plinth · Soma NPT · SwadeshotSav · Urban Rural · SM-PG · Bhareshwar · Ecovance · Wingtrack · QuizBuzz · Gifta · Pure Earth · EpiTailo · Plastoware · GiftCityAdvisor",
    },
    process: {
      sectionId: "process",
      headingId: "process-heading",
      eyebrow: "HOW WE BUILD",
      title: { before: "From Game Concept to ", highlight: "Live on the Stores", after: " in 4 Steps." },
      lead: "",
      steps: [
        {
          num: "01",
          tag: "CONCEPT",
          title: "Share Your Idea",
          desc: "Tell us your game concept, genre, target platform, and audience. We help finalise the GDD (Game Design Document) and tech stack.",
        },
        {
          num: "02",
          tag: "PLANNING",
          title: "Design & Prototype",
          desc: "Wireframes, level maps, art direction, and a playable prototype. You approve the core loop before full production begins.",
        },
        {
          num: "03",
          tag: "DEVELOPMENT",
          title: "Build, Polish & QA",
          desc: "Full game development in Unity — mechanics, art integration, audio, physics, monetisation, and rigorous device testing across platforms.",
        },
        {
          num: "04",
          tag: "LAUNCH",
          title: "Ship & Scale",
          desc: "Store submission, compliance, launch assets, and post-launch support. We track crash reports and update cycles to keep your game live and rated.",
        },
      ],
    },
  },
};


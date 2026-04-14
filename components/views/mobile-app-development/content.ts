export type MobileServiceKey = "iphone" | "android" | "flutter";

export type WhyHireCardIconKey =
  | "heart"
  | "clock"
  | "cube"
  | "check"
  | "home"
  | "briefcase"
  | "oneCodebase"
  | "hotReload"
  | "performance"
  | "stores";

export type WhyHireCardAccent = "orange" | "cyan" | "flutter";

export type WhyHireCardContent = {
  icon: WhyHireCardIconKey;
  /** When set, shown in the card header instead of the icon (e.g. "01"). */
  digit?: string;
  accent?: WhyHireCardAccent;
  title: string;
  desc: string;
};

export type WhyHireStatContent = {
  val: string;
  lbl: string;
};

export type WhyHireSectionContent = {
  sectionId: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };

  /** Left code editor bar labels */
  codeFilename: string;
  codeLangLabel: string;

  /** Floating chips around the phone preview */
  phoneChip1: string;
  phoneChip2: string;
  phoneChip3: string;

  stats: readonly WhyHireStatContent[];
  cards: readonly WhyHireCardContent[];
};

export type AppPortfolioAppContent = {
  /** Path under `public/`, e.g. `/mobile-app-portfolio/deliverend.svg` */
  icon: string;
  href: string;
  tag: string;
  name: string;
  desc: string;
  stack: readonly string[];
  linkLabel: string;
};

export type AppPortfolioShowcaseContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  metaLines: readonly string[];
  apps: readonly AppPortfolioAppContent[];
};

export type AppPortfolioStoryContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  lead: string;
  stats: readonly { num: string; label: string }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type AppPortfolioBlocks = {
  showcase: AppPortfolioShowcaseContent;
  story: AppPortfolioStoryContent;
};

/** Lucide icon id — mapped in `Advantages.tsx` */
export type AdvantageIconKey = "shield" | "smartphone" | "boxes" | "search" | "zap" | "users";

export type AdvantageItemContent = {
  num: string;
  title: string;
  desc: string;
  tag: string;
  icon: AdvantageIconKey;
};

export type AdvantagesSectionContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  lead: string;
  items: readonly AdvantageItemContent[];
};

export type ClientsSectionContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleBefore: string;
  titleHighlight: string;
  lead: string;
  names: readonly string[];
  marqueeLine: string;
};

/** Lucide icon id — mapped in `OtherServices.tsx` */
export type OtherServiceIconKey = "smartphone" | "layers" | "orbit" | "clock";

export type OtherServiceItemContent = {
  tag: string;
  title: string;
  desc: string;
  href: string;
  /** Shown as the bottom link row label, e.g. "Android Service" */
  footerLabel: string;
  external?: boolean;
  icon: OtherServiceIconKey;
};

export type OtherServicesSectionContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleBefore: string;
  titleHighlight: string;
  lead: string;
  items: readonly OtherServiceItemContent[];
};

import type { ArFoundationSectionContent } from "@/components/shared/arFoundationTypes";
import type {
  AndroidArShowcaseContent,
  IphoneArVrShowcaseContent,
  IphoneVisionOsShowcaseContent,
  SpatialMidCtaContent,
} from "@/components/shared/arShowcaseTypes";

export type {
  ArFoundationFeatureContent,
  ArFoundationFeatureIcon,
  ArFoundationPillVariant,
  ArFoundationSectionContent,
  ArFoundationTitlePart,
} from "@/components/shared/arFoundationTypes";

export type {
  AndroidArMidCtaContent,
  AndroidArShowcaseContent,
  IphoneArVrShowcaseContent,
  IphoneVisionOsShowcaseContent,
  SpatialMidCtaContent,
} from "@/components/shared/arShowcaseTypes";

export type FlutterOneCodebaseCtaContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  lead: string;
  stats: readonly { value: string; label: string }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type MobileServiceContent = {
  heroTagline: string;
  heroHighlight: string;
  heroTitleTail: string;
  heroDescription: string;
  heroMeta: string[];
  heroChips: string[];
  heroPhoneTopLeft: string;
  heroPhoneTopRight: string;
  heroPhoneSummary: string;
  heroChipFloat1: string;
  heroChipFloat2: string;
  heroChipFloat3: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;

  marquee: string[];
  whyHire: WhyHireSectionContent;
  advantages: AdvantagesSectionContent;
  clients: ClientsSectionContent;
  otherServices: OtherServicesSectionContent;
  appPortfolio: AppPortfolioBlocks;
  /** Flutter page: AR Foundation showcase (reusable section data) */
  arFoundation?: ArFoundationSectionContent;
  /** Flutter page: mid-page CTA after AR section */
  flutterOneCodebaseCta?: FlutterOneCodebaseCtaContent;
  /** Android page: ARCore showcase after Advantages */
  androidArShowcase?: AndroidArShowcaseContent;
  /** Android / iPhone: shared stats mid-CTA after spatial sections */
  spatialMidCta?: SpatialMidCtaContent;
  /** iPhone page: ARKit / RealityKit showcase after Advantages */
  iphoneArVr?: IphoneArVrShowcaseContent;
  /** iPhone page: visionOS showcase */
  iphoneVisionOs?: IphoneVisionOsShowcaseContent;
};

const MOBILE_APP_PORTFOLIO_BLOCKS: AppPortfolioBlocks = {
  showcase: {
    sectionId: "app-portfolio",
    headingId: "app-portfolio-heading",
    eyebrow: "APP PORTFOLIO",
    titleLine1: "iPhone Apps We've",
    titleHighlight: "Shipped & Scaled.",
    metaLines: ["20+ iOS APPS DELIVERED", "APP STORE · ENTERPRISE", "5+ COUNTRIES"],
    apps: [
      {
        icon: "/mobile-app-portfolio/deliverend.svg",
        href: "https://deliverend.com",
        tag: "LOGISTICS · iOS",
        name: "DeliverEnd",
        desc: "On-demand delivery platform connecting customers with drivers. Real-time tracking, multi-stop routing, and live order management built in Swift.",
        stack: ["Swift", "MapKit", "Firebase"],
        linkLabel: "Live App",
      },
      {
        icon: "/mobile-app-portfolio/wingtrack.svg",
        href: "https://wingtrack.app",
        tag: "TRACKING · iOS",
        name: "Wingtrack",
        desc: "Aviation and drone tracking application with live telemetry, flight path logging, and geofence alerts. Precision GPS integration on iOS.",
        stack: ["SwiftUI", "CoreLocation", "ARKit"],
        linkLabel: "Live App",
      },
      {
        icon: "/mobile-app-portfolio/quizbuzz.svg",
        href: "https://apps.apple.com",
        tag: "GAMING · iOS",
        name: "QuizBuzz Trivia",
        desc: "Multiplayer trivia game with real-time competitive rooms, leaderboards, and daily challenges. App Store featured in Education & Games categories.",
        stack: ["Swift", "GameKit", "Node.js"],
        linkLabel: "App Store",
      },
      {
        icon: "/mobile-app-portfolio/gifta.svg",
        href: "https://gifta.app",
        tag: "E-COMMERCE · iOS",
        name: "Gifta",
        desc: "Curated gifting marketplace connecting buyers with artisan sellers. Smart AI recommendation engine, wishlists, and occasion reminders.",
        stack: ["SwiftUI", "CoreML", "Stripe"],
        linkLabel: "Live App",
      },
      {
        icon: "/mobile-app-portfolio/epitailo.svg",
        href: "https://epitailo.com",
        tag: "FASHION · iOS",
        name: "EpiTailo",
        desc: "On-demand tailoring and fashion app. AR-powered body measurement, custom garment ordering, and seamless tailor-to-door delivery across India.",
        stack: ["ARKit", "RealityKit", "SwiftUI"],
        linkLabel: "Live App",
      },
      {
        icon: "/mobile-app-portfolio/deltaarbim.svg",
        href: "https://deltaarbim.tech",
        tag: "AR · BIM · iOS",
        name: "DeltaARBIM",
        desc: "LiDAR-powered AR construction tool. Overlay BIM models on real-world spaces, detect clashes live, and capture point clouds — built entirely for iOS.",
        stack: ["LiDAR", "ARKit", "RealityKit"],
        linkLabel: "Learn More",
      },
    ],
  },
  story: {
    sectionId: "portfolio-story",
    headingId: "portfolio-story-heading",
    eyebrow: "WORK PORTFOLIO",
    titleLine1: "Every App Has a",
    titleHighlight: "Story Behind It.",
    lead:
      "From concept to App Store — explore the full case studies, screenshots, and results behind our most impactful iOS projects.",
    stats: [
      { num: "20+", label: "iOS Apps Shipped" },
      { num: "5+", label: "Countries Served" },
      { num: "99%", label: "Client Satisfaction" },
    ],
    primaryCta: {
      label: "View Full Portfolio →",
      href: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
    },
    secondaryCta: {
      label: "Start Your Project",
      href: "https://shivlam.com/contact-us/",
    },
  },
};

const ADVANTAGES_IPHONE: AdvantagesSectionContent = {
  sectionId: "adv",
  headingId: "adv",
  eyebrow: "Advantages",
  titleLine1: "Advantage of Our Best",
  titleHighlight: "iPhone App Development Services.",
  lead:
    "We hold a strong belief in operating in a manner that mirrors the core principles of our product. Our commitment is to not only fulfill our commitments but also to go above and beyond.",
  items: [
    {
      num: "01",
      title: "Native iOS Performance",
      desc: "Built entirely in Swift and SwiftUI — apps that feel and perform exactly as Apple intended. Zero compromises on speed, responsiveness, or platform integration.",
      tag: "SWIFT · SWIFTUI",
      icon: "shield",
    },
    {
      num: "02",
      title: "App Store Launch Ready",
      desc: "From concept to App Store approval — we handle metadata, screenshots, compliance, and review processes so your launch is smooth, professional, and on schedule.",
      tag: "APP STORE OPTIMIZED",
      icon: "smartphone",
    },
    {
      num: "03",
      title: "Scalable Architecture",
      desc: "Clean, modular codebases designed to grow with your business. Whether you're serving 100 or 1 million users, our architecture scales without painful rewrites.",
      tag: "CLEAN ARCHITECTURE",
      icon: "boxes",
    },
    {
      num: "04",
      title: "UX-First Design",
      desc: "Every tap, swipe, and transition is meticulously crafted to Human Interface Guidelines. Apps that delight users from the first launch to daily use.",
      tag: "HIG COMPLIANT",
      icon: "search",
    },
    {
      num: "05",
      title: "ARKit & CoreML Integration",
      desc: "Advanced capabilities baked in — augmented reality, on-device machine learning, LiDAR scanning, and real-time computer vision for cutting-edge iOS experiences.",
      tag: "ARKIT · COREML",
      icon: "zap",
    },
    {
      num: "06",
      title: "Dedicated Team Model",
      desc: "A dedicated iOS developer, designer, and QA tester assigned to your project from kickoff to launch. Direct communication, no middlemen, full accountability.",
      tag: "DEDICATED TEAM",
      icon: "users",
    },
  ],
};

const ADVANTAGES_ANDROID: AdvantagesSectionContent = {
  sectionId: "adv",
  headingId: "adv",
  eyebrow: "Advantages",
  titleLine1: "Advantage of Our Best",
  titleHighlight: "Android App Development Services.",
  lead:
    "We hold a strong belief in operating in a manner that mirrors the core principles of our product. Our commitment is to not only fulfill our commitments but also to go above and beyond.",
  items: [
    {
      num: "01",
      title: "Native Android Performance",
      desc: "Kotlin-first apps with Jetpack libraries — fast startup, smooth scrolling, and battery-conscious execution tuned for real-world devices and Play Store expectations.",
      tag: "KOTLIN · JETPACK",
      icon: "shield",
    },
    {
      num: "02",
      title: "Play Store Launch Ready",
      desc: "From signing configs to store listings, screenshots, and policy compliance — we guide your release so updates ship confidently and reviews stay predictable.",
      tag: "PLAY STORE OPTIMIZED",
      icon: "smartphone",
    },
    {
      num: "03",
      title: "Scalable Architecture",
      desc: "Modular layers, clear boundaries, and testable components so your codebase grows with traffic, features, and team size without costly rewrites.",
      tag: "CLEAN ARCHITECTURE",
      icon: "boxes",
    },
    {
      num: "04",
      title: "Material & UX First",
      desc: "Interfaces that follow Material Design and accessibility best practices — predictable navigation, inclusive touch targets, and polish users notice.",
      tag: "MATERIAL UX",
      icon: "search",
    },
    {
      num: "05",
      title: "Camera, ML & Sensors",
      desc: "Integrations for CameraX, on-device ML Kit, location, BLE, and background work — the advanced capabilities modern Android products demand.",
      tag: "JETPACK · ML KIT",
      icon: "zap",
    },
    {
      num: "06",
      title: "Dedicated Team Model",
      desc: "A dedicated Android engineer, designer, and QA partner on your sprint cadence from discovery through release — direct communication and clear ownership.",
      tag: "DEDICATED TEAM",
      icon: "users",
    },
  ],
};

const ADVANTAGES_FLUTTER: AdvantagesSectionContent = {
  sectionId: "adv",
  headingId: "adv",
  eyebrow: "Advantages",
  titleLine1: "Advantage of Our Best",
  titleHighlight: "Flutter App Development Services.",
  lead:
    "We hold a strong belief in operating in a manner that mirrors the core principles of our product. Our commitment is to not only fulfill our commitments but also to go above and beyond.",
  items: [
    {
      num: "01",
      title: "Cross-Platform Performance",
      desc: "Flutter apps with native integrations and careful build profiling — smooth animations and consistent UI across iOS, Android, and beyond from one codebase.",
      tag: "FLUTTER · DART",
      icon: "shield",
    },
    {
      num: "02",
      title: "Dual Store Launch",
      desc: "Ship to App Store and Play Store with shared pipelines, store assets, and review readiness — fewer handoffs, faster time-to-market.",
      tag: "STORE READY",
      icon: "smartphone",
    },
    {
      num: "03",
      title: "Scalable Architecture",
      desc: "Feature modules, clear state management, and testable layers so your product roadmap stays maintainable as complexity grows.",
      tag: "CLEAN ARCHITECTURE",
      icon: "boxes",
    },
    {
      num: "04",
      title: "UX-First Design",
      desc: "Adaptive layouts, motion, and platform conventions where they matter — apps that feel at home on each device while sharing your design system.",
      tag: "ADAPTIVE UI",
      icon: "search",
    },
    {
      num: "05",
      title: "Plugins & Native Bridges",
      desc: "FFI to native SDKs, platform channels, and performance-critical paths wired correctly — not “lowest common denominator” engineering.",
      tag: "NATIVE BRIDGES",
      icon: "zap",
    },
    {
      num: "06",
      title: "Dedicated Team Model",
      desc: "A dedicated Flutter engineer, designer, and QA embedded in your workflow from prototype to production — accountability without layers of overhead.",
      tag: "DEDICATED TEAM",
      icon: "users",
    },
  ],
};

const FLUTTER_AR_FOUNDATION: ArFoundationSectionContent = {
  sectionId: "flutter-ar",
  headingId: "flutter-ar-heading",
  eyebrow: "AR FOUNDATION · FLUTTER",
  titleLines: [
    [{ text: "One Dart Codebase." }],
    [
      { text: "AR on iOS " },
      { text: "and", emphasis: true },
      { text: " Android." },
    ],
    [{ text: "Simultaneously.", emphasis: true }],
  ],
  description:
    "Flutter's AR Foundation plugin bridges Apple's ARKit and Google's ARCore from a single Dart codebase. Write the AR logic once — it runs natively on both platforms. No duplicate codebases, no platform-specific rewrites, no version drift.",
  canvasBadges: {
    ios: "◎ ARKit (iOS)",
    android: "⬡ ARCore (Android)",
    oneCodebase: "🔥 ONE CODEBASE",
  },
  platformRow: {
    ios: "iOS · ARKit 6 · LiDAR",
    android: "Android · ARCore · Depth API",
  },
  features: [
    {
      icon: "plugin",
      title: "AR Foundation — One Plugin, Both Platforms",
      desc: "A single Dart API abstracts ARKit and ARCore. Plane detection, hit testing, anchor management, and light estimation — all platform-agnostic from your Flutter code.",
    },
    {
      icon: "cube",
      title: "3D Object Placement & USDZ / glTF Models",
      desc: "Place USDZ models on iOS and glTF models on Android from the same asset pipeline. Real-world scale, orientation locking, and physics integration via Flutter.",
    },
    {
      icon: "reload",
      title: "Hot Reload for AR — Faster Iteration",
      desc: "Flutter's hot reload works with AR scenes — change UI overlays, adjust placement logic, or update 3D object parameters and see results in under 300ms without restarting the AR session.",
    },
    {
      icon: "stores",
      title: "Ship to Both Stores from One Codebase",
      desc: "Build once, submit to App Store and Play Store. The AR functionality adapts automatically — ARKit on iOS, ARCore on Android — with the same UI layer on top.",
    },
  ],
  pills: [
    { label: "AR Foundation", variant: "cyan" },
    { label: "Dart 3", variant: "orange" },
    { label: "ARKit Plugin", variant: "cyan" },
    { label: "ARCore Plugin", variant: "orange" },
    { label: "USDZ · glTF", variant: "cyan" },
    { label: "Plane Detection", variant: "orange" },
    { label: "Cloud Anchors", variant: "cyan" },
    { label: "Flutter 3", variant: "orange" },
  ],
  primaryCta: { label: "Build a Flutter AR App →", href: "https://shivlam.com/contact-us/" },
  secondaryCta: { label: "AR/VR Solutions", href: "/services/ar-vr-solution" },
};

const FLUTTER_ONECODEBASE_CTA: FlutterOneCodebaseCtaContent = {
  sectionId: "flutter-one-codebase-cta",
  headingId: "flutter-one-codebase-heading",
  eyebrow: "THE FLUTTER ADVANTAGE",
  titleLine1: "One Codebase.",
  titleHighlight: "Three Realities.",
  lead:
    "Flutter ships your app to iOS and Android from a single Dart codebase — and now AR too. No platform teams. No duplicated logic. Just one clean codebase that serves both stores and both AR frameworks.",
  stats: [
    { value: "1", label: "Codebase" },
    { value: "2", label: "AR Frameworks" },
    { value: "2", label: "Stores Shipped" },
    { value: "🔥", label: "Hot Reload" },
  ],
  primaryCta: { label: "Start Your Flutter AR Project →", href: "https://shivlam.com/contact-us/" },
  secondaryCta: {
    label: "View Portfolio",
    href: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
  },
};

const ANDROID_AR_SHOWCASE: AndroidArShowcaseContent = {
  sectionId: "android-ar",
  headingId: "android-ar-heading",
  eyebrow: "AR FOR ANDROID",
  titleLines: [
    [{ text: "ARCore-Powered" }],
    [{ text: "Android AR Apps that" }],
    [{ text: "Redefine Reality.", emphasis: true }],
  ],
  description:
    "Google ARCore brings augmented reality to over 1 billion Android devices. We build ARCore apps using Android's native SDK, Jetpack Compose UI, and Kotlin-first architecture — real-world anchoring, 3D object placement, and cloud anchors that sync across devices.",
  features: [
    {
      icon: "motion",
      title: "Motion Tracking & Environment Understanding",
      desc: "ARCore tracks device motion and maps the physical environment in real time — horizontal and vertical plane detection, depth mapping, and instant placement without markers.",
    },
    {
      icon: "cloud",
      title: "Cloud Anchors — Shared AR Experiences",
      desc: "ARCore Cloud Anchors enable multiple Android users to share the same AR session — see the same virtual objects in the same real-world location simultaneously.",
    },
    {
      icon: "depth",
      title: "Depth API & Raw Depth Sensing",
      desc: "Android Depth API for real-time occlusion — virtual objects hide behind real ones correctly. On depth-enabled devices, centimetre-accurate depth maps for precise AR placement.",
    },
    {
      icon: "geo",
      title: "Geospatial API — Real-World GPS AR",
      desc: "ARCore Geospatial places virtual content at precise real-world GPS coordinates — AR navigation, location-based gaming, and outdoor AR experiences at global scale.",
    },
  ],
  compareEyebrow: "ANDROID AR ADVANTAGE",
  compareCards: [
    {
      variant: "green",
      tag: "✓ ARCORE",
      title: "1B+ Devices",
      desc: "ARCore runs on any Android 7.0+ device — the largest AR-capable audience on earth.",
    },
    {
      variant: "orange",
      tag: "◎ GEOSPATIAL",
      title: "GPS-Level AR",
      desc: "ARCore Geospatial API — place AR content at real-world coordinates globally. iOS doesn't have this.",
    },
  ],
  pills: [
    { label: "ARCore SDK", variant: "green" },
    { label: "Kotlin", variant: "orange" },
    { label: "Geospatial API", variant: "green" },
    { label: "Sceneform", variant: "orange" },
    { label: "Cloud Anchors", variant: "green" },
    { label: "Depth API", variant: "muted" },
    { label: "Jetpack Compose", variant: "orange" },
    { label: "Unity ARCore", variant: "muted" },
    { label: "glTF / USDZ", variant: "green" },
    { label: "OpenGL ES", variant: "muted" },
  ],
  canvasBadges: {
    arcore: "⬡ ARCORE SDK",
    geospatial: "◎ GEOSPATIAL API",
    depth: "✓ DEPTH ACTIVE",
  },
  primaryCta: { label: "Build an Android AR App →", href: "https://shivlam.com/contact-us/" },
  secondaryCta: { label: "AR/VR Solutions", href: "/services/ar-vr-solution" },
};

const SPATIAL_MID_CTA_ANDROID: SpatialMidCtaContent = {
  sectionId: "android-ar-mid-cta",
  headingId: "android-ar-mid-cta-heading",
  eyebrow: "BUILD MORE THAN AN ANDROID APP",
  titleLines: [
    { segments: [{ text: "Native Android." }] },
    {
      segments: [
        { text: "AR-Powered.", tone: "green" },
        { text: " " },
        { text: "Globally Scalable.", tone: "saffron" },
      ],
    },
  ],
  lead:
    "Whether you need a Kotlin-first production app or an ARCore-powered immersive experience — our Android team ships both, with zero compromise on performance or Play Store compliance.",
  stats: [
    { value: "1B+", label: "ARCore Devices" },
    { value: "50+", label: "Apps Shipped" },
    { value: "5+", label: "Countries Served" },
  ],
  primaryCta: { label: "Start Your Android Project →", href: "https://shivlam.com/contact-us/" },
  secondaryCta: {
    label: "View Portfolio",
    href: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
  },
};

const IPHONE_AR_VR: IphoneArVrShowcaseContent = {
  sectionId: "iphone-arvr",
  headingId: "iphone-arvr-heading",
  eyebrow: "AR / VR FOR iPHONE",
  titleLines: [
    [{ text: "ARKit & RealityKit" }],
    [
      { text: "Apps That Blend " },
      { text: "Real", emphasis: true },
    ],
    [{ text: "& Virtual.", emphasis: true }],
  ],
  description:
    "We build augmented and mixed reality iOS apps using Apple's ARKit, RealityKit, and LiDAR Scanner. From real-world object placement to markerless face tracking and LiDAR-powered depth mapping — immersive experiences that run natively on iPhone.",
  features: [
    {
      icon: "world",
      title: "World Tracking & Plane Detection",
      desc: "Real-world surface anchoring — floors, walls, and tables become interactive stages. Persistent anchors survive app restarts and device reorientations.",
    },
    {
      icon: "lidar",
      title: "LiDAR Scanner Integration",
      desc: "On iPhone Pro models — instant AR scene understanding, real-time occlusion, and physics-accurate object placement using the LiDAR depth sensor.",
    },
    {
      icon: "face",
      title: "Face Tracking & Body Tracking",
      desc: "TrueDepth camera face tracking with 52 blend shapes, body pose estimation, and hand tracking — AR filters, virtual try-on, and motion capture apps.",
    },
    {
      icon: "object",
      title: "Object Scanning & 3D Reconstruction",
      desc: "RealityKit Object Capture and LiDAR scanning to create photorealistic 3D models from real objects — for product visualisation and AR commerce apps.",
    },
  ],
  pills: [
    { label: "ARKit 6", variant: "orange" },
    { label: "RealityKit 3", variant: "cyan" },
    { label: "LiDAR Scanner", variant: "orange" },
    { label: "SceneKit", variant: "cyan" },
    { label: "CoreML Vision", variant: "orange" },
    { label: "Metal", variant: "cyan" },
    { label: "Object Capture", variant: "orange" },
    { label: "Unity iOS AR", variant: "cyan" },
  ],
  canvasBadges: {
    lidar: "◎ ARKIT 6 · LIDAR",
    realitykit: "⬡ REALITYKIT 3",
    plane: "✓ PLANE DETECTED",
  },
  primaryCta: { label: "Build an AR App →", href: "https://shivlam.com/contact-us/" },
  secondaryCta: { label: "AR/VR Solutions", href: "/services/ar-vr-solution" },
};

const IPHONE_VISIONOS: IphoneVisionOsShowcaseContent = {
  sectionId: "iphone-visionos",
  headingId: "iphone-visionos-heading",
  eyebrow: "VISIONOS · APPLE VISION PRO",
  titleLines: [
    [{ text: "Spatial Apps for" }],
    [{ text: "Apple Vision Pro." }],
    [{ text: "The Next Platform.", emphasis: true }],
  ],
  description:
    "visionOS is Apple's most ambitious computing platform. We build spatial apps and games using SwiftUI, RealityKit, and ARKit for visionOS — apps that live in the space around you, controlled by eyes, hands, and voice.",
  cardGrid: [
    {
      tag: "◎ SPATIAL UI",
      title: "Windows & Volumes",
      desc: "2D SwiftUI windows, 3D RealityKit volumes, and full Immersive Spaces — all three display modes mastered.",
    },
    {
      tag: "⬡ INPUT",
      title: "Eye & Hand Tracking",
      desc: "Gaze + pinch interactions, direct hand touch, and voice commands — natural spatial input built correctly from day one.",
    },
    {
      tag: "✦ MIXED REALITY",
      title: "Passthrough & Immersion",
      desc: "Progressive immersion from windowed to fully immersive — content that coexists with the real world or replaces it entirely.",
    },
    {
      tag: "▣ SHAREPLAY",
      title: "Multiplayer & Collaboration",
      desc: "SharePlay and Multipeer spatial sessions — shared 3D content that multiple Vision Pro users interact with simultaneously.",
    },
  ],
  pills: [
    { label: "visionOS 2", variant: "purple" },
    { label: "SwiftUI", variant: "muted" },
    { label: "RealityKit", variant: "purple" },
    { label: "ARKit visionOS", variant: "muted" },
    { label: "Reality Composer Pro", variant: "purple" },
    { label: "SharePlay", variant: "muted" },
    { label: "Spatial Audio", variant: "purple" },
    { label: "Unity visionOS", variant: "muted" },
  ],
  canvasBadges: {
    visionos: "◎ VISIONOS 2",
    realitykit: "⬡ REALITYKIT",
    spatial: "✦ SPATIAL AUDIO",
  },
  primaryCta: {
    label: "Vision Pro Development →",
    href: "https://shivlam.com/apple-vision-pro-game-development-ar-vr-experts/",
  },
  secondaryCta: { label: "Discuss Your Idea", href: "https://shivlam.com/contact-us/" },
};

const SPATIAL_MID_CTA_IPHONE: SpatialMidCtaContent = {
  sectionId: "iphone-spatial-mid-cta",
  headingId: "iphone-spatial-mid-cta-heading",
  eyebrow: "BUILD BEYOND A STANDARD APP",
  titleLines: [
    {
      segments: [
        { text: "iPhone. AR. " },
        { text: "visionOS.", tone: "saffron" },
      ],
    },
    { segments: [{ text: "We Build All Three." }] },
  ],
  lead:
    "Whether you need a native iPhone app, an ARKit-powered experience, or a pioneering visionOS spatial app — our iOS team ships across Apple's entire device ecosystem.",
  stats: [
    { value: "50+", label: "iOS Apps Shipped" },
    { value: "3", label: "Apple Platforms" },
    { value: "5+", label: "Countries Served" },
  ],
  primaryCta: { label: "Start Your iOS Project →", href: "https://shivlam.com/contact-us/" },
  secondaryCta: {
    label: "View Portfolio",
    href: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
  },
};

const MOBILE_CLIENTS_SECTION: ClientsSectionContent = {
  sectionId: "clients",
  headingId: "clients-who-trust-us",
  eyebrow: "CLIENTS WHO TRUST US",
  titleBefore: "Powering ",
  titleHighlight: "Global Innovation.",
  lead: "Expert tech partnerships in Web, Mobile, Gaming, and Digital Growth across 3+ Continents.",
  names: [
    "Soma",
    "Plinth",
    "SwadeshotSav",
    "Urban Rural",
    "SM-PG",
    "Bhareshwar",
    "Ecovance",
    "Wingtrack",
    "QuizBuzz",
    "Gifta",
    "Pure Earth",
    "EpiTailo",
  ],
  marqueeLine:
    "DELIVEREND · HOLA · SOMA · PLINTH · SWADESHOTSAV · URBAN RURAL · SM-PG · BHARESHWAR · ECOVANCE · WINGTRACK · QUIZBUZZ · GIFTA · PUREEARTH · EPITAILO · PLASTOWARE",
};

const MOBILE_OTHER_SERVICES_SECTION: OtherServicesSectionContent = {
  sectionId: "services",
  headingId: "explore-more-services",
  eyebrow: "EXPLORE MORE SERVICES",
  titleBefore: "Seeking a ",
  titleHighlight: "Deeper Connection?",
  lead: "Our services include Android, Flutter, AR/VR, and VisionOS app development. Let's bring your ideas to life.",
  items: [
    {
      tag: "MOBILE",
      title: "Android App Development",
      desc: "Native Android apps in Kotlin and Java. From Material Design to Play Store submission — full-cycle Android development with Shivlam's engineering rigour.",
      href: "/services/android-app-development",
      footerLabel: "Android Service",
      icon: "smartphone",
    },
    {
      tag: "CROSS-PLATFORM",
      title: "Flutter App Development",
      desc: "One codebase, every platform. Flutter apps that look and perform natively on iOS, Android, web, and desktop — with Shivlam's pixel-perfect execution.",
      href: "/services/flutter-app-development",
      footerLabel: "Flutter Service",
      icon: "layers",
    },
    {
      tag: "IMMERSIVE",
      title: "AR/VR App Development",
      desc: "Augmented and virtual reality experiences built with ARKit, Unity, and RealityKit. From spatial computing to LiDAR-powered construction tools — we've shipped it.",
      href: "https://shivlam.com/augmented-reality-app-development-ar-solutions-experts/",
      footerLabel: "AR/VR Service",
      external: true,
      icon: "orbit",
    },
    {
      tag: "SPATIAL",
      title: "visionOS App Development",
      desc: "Apple Vision Pro development with SwiftUI and RealityKit. Spatial apps that define the next frontier of human-computer interaction — built by Shivlam.",
      href: "https://shivlam.com/visionos-app-development-company/",
      footerLabel: "visionOS Service",
      external: true,
      icon: "clock",
    },
  ],
};

export const MOBILE_SERVICE_CONTENT: Record<MobileServiceKey, MobileServiceContent> = {
  iphone: {
    heroTagline: "SWIFT · SWIFTUI · ARKIT · XCODE",
    heroHighlight: "iPhone App",
    heroTitleTail: "Development Company.",
    heroDescription:
      "Unlock unprecedented success with our premier iPhone app development services. Dynamic, user-centric apps that perform at their peak and engage your target audience effectively.",
    heroMeta: ["iOS Native Development", "SwiftUI & UIKit", "App Store Launch", "On-Time Delivery"],
    heroChips: ["SwiftUI · UIKit", "App Store Ready", "ARKit · CoreML", "On-Time Delivery"],
    heroPhoneTopLeft: "iOS LIVE",
    heroPhoneTopRight: "Swift ●",
    heroPhoneSummary: "A modern iOS build pipeline with crisp UI and fast iteration cycles.",
    heroChipFloat1: "SwiftUI · UIKit",
    heroChipFloat2: "App Store Ready",
    heroChipFloat3: "ARKit · CoreML",
    primaryCtaLabel: "Let's Connect Quickly",
    primaryCtaHref: "https://shivlam.com/contact-us/",
    marquee: [
      "IPHONE APP DEVELOPMENT",
      "SWIFT · SWIFTUI",
      "ARKIT · COREML",
      "APP STORE LAUNCH",
      "iOS NATIVE",
      "LIDAR SCANNING",
      "UIKIT · REALITYKIT",
      "VISIONOS READY",
      "DEDICATED TEAM",
      "ON-TIME DELIVERY",
      "SCALABLE TECH",
      "SHIVLAM.COM",
    ],
    whyHire: {
      sectionId: "why",
      eyebrow: "WHY HIRE US",
      titleLine1: "Ultimate iPhone App",
      titleLine2: "Development Company",
      titleHighlight: "to Shortlist.",
      description:
        "Discover excellence in app development with our top-tier iPhone app development company. Our skilled team crafts immersive, user-friendly apps tailored to your vision. From concept to App Store launch, we ensure seamless functionality, stunning design, and optimal performance.",
      primaryCta: { label: "Start Your Project →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: {
        label: "View Portfolio",
        href: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
      },
      codeFilename: "ContentView.swift",
      codeLangLabel: "Swift 5.9",
      phoneChip1: "✓ UIKit Ready",
      phoneChip2: "⬡ SwiftUI",
      phoneChip3: "◎ 4.9★ Store",
      stats: [
        { val: "50+", lbl: "Projects Shipped" },
        { val: "99%", lbl: "Satisfaction Rate" },
        { val: "5+", lbl: "Countries Served" },
      ],
      cards: [
        {
          icon: "heart",
          title: "Customer Satisfaction",
          desc: "Our success thrives on your happiness. We prioritize your needs, exceed expectations, and create lasting connections through unmatched customer satisfaction.",
        },
        {
          icon: "clock",
          title: "On-Time Delivery",
          desc: "Embrace the challenge of on-time delivery. Our commitment drives efficient processes, ensuring your project reaches the finish line promptly without compromising quality.",
        },
      ],
    },
    advantages: ADVANTAGES_IPHONE,
    clients: MOBILE_CLIENTS_SECTION,
    otherServices: MOBILE_OTHER_SERVICES_SECTION,
    appPortfolio: MOBILE_APP_PORTFOLIO_BLOCKS,
    iphoneArVr: IPHONE_AR_VR,
    iphoneVisionOs: IPHONE_VISIONOS,
    spatialMidCta: SPATIAL_MID_CTA_IPHONE,
  },
  android: {
    heroTagline: "KOTLIN · COMPOSE · MATERIAL · ANDROID STUDIO",
    heroHighlight: "Android App",
    heroTitleTail: "Development Company.",
    heroDescription:
      "Build reliable Android apps with Kotlin-first engineering, Material-first UI, and production-grade release pipelines—optimized for performance and Play Store launch.",
    heroMeta: ["Kotlin-first Development", "Jetpack Compose UI", "Play Store Launch", "On-Time Delivery"],
    heroChips: ["Kotlin · Compose", "Play Store Ready", "Material UI", "CI/CD Pipelines"],
    heroPhoneTopLeft: "ANDROID LIVE",
    heroPhoneTopRight: "Kotlin ●",
    heroPhoneSummary: "Modern Android stack with Compose UI, smooth animations, and scalable architecture.",
    heroChipFloat1: "Kotlin · Compose",
    heroChipFloat2: "Play Store Ready",
    heroChipFloat3: "Material UI",
    primaryCtaLabel: "Let's Connect Quickly",
    primaryCtaHref: "https://shivlam.com/contact-us/",
    marquee: [
      "Kotlin",
      "Jetpack Compose",
      "Material Design",
      "Android Studio",
      "Play Store Launch",
      "Performance",
      "Security",
      "Offline-first",
      "CI/CD",
      "Scalability",
    ],
    whyHire: {
      sectionId: "why",
      eyebrow: "WHY HIRE US",
      titleLine1: "Ultimate Android App",
      titleLine2: "Development Company",
      titleHighlight: "to Shortlist.",
      description:
        "Discover excellence with Kotlin-first, Material Design-powered Android apps. From MVVM architecture to Play Store submission — we ship clean, fast, scalable Android products that users love.",
      primaryCta: { label: "Start Your Project →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: {
        label: "View Portfolio",
        href: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
      },
      codeFilename: "MainActivity.kt",
      codeLangLabel: "Kotlin",
      phoneChip1: "✓ Compose UI",
      phoneChip2: "⬡ Material",
      phoneChip3: "◎ Play Store",
      stats: [
        { val: "50+", lbl: "Projects Shipped" },
        { val: "99%", lbl: "Satisfaction Rate" },
        { val: "5+", lbl: "Countries Served" },
      ],
      cards: [
        {
          icon: "cube",
          accent: "orange",
          title: "Material Design",
          desc: "Pixel-perfect Material 3 UI that feels native on every Android device.",
        },
        {
          icon: "check",
          accent: "cyan",
          title: "Play Store Launch",
          desc: "End-to-end submission — metadata, ASO, compliance, and review handled.",
        },
      ],
    },
    advantages: ADVANTAGES_ANDROID,
    clients: MOBILE_CLIENTS_SECTION,
    otherServices: MOBILE_OTHER_SERVICES_SECTION,
    appPortfolio: MOBILE_APP_PORTFOLIO_BLOCKS,
    androidArShowcase: ANDROID_AR_SHOWCASE,
    spatialMidCta: SPATIAL_MID_CTA_ANDROID,
  },
  flutter: {
    heroTagline: "FLUTTER · DART · CROSS-PLATFORM · PERFORMANCE",
    heroHighlight: "Flutter App",
    heroTitleTail: "Development Company.",
    heroDescription:
      "Ship pixel-perfect Flutter apps with one codebase, native integrations, and performance-focused engineering — delivered for iOS, Android, and beyond.",
    heroMeta: ["Single Codebase", "Native Integrations", "App Store + Play Store", "Fast Iterations"],
    heroChips: ["Flutter · Dart", "iOS + Android", "Native Plugins", "Performance"],
    heroPhoneTopLeft: "FLUTTER LIVE",
    heroPhoneTopRight: "Dart ●",
    heroPhoneSummary: "Cross-platform UI with native-grade performance and smooth animation polish.",
    heroChipFloat1: "Flutter · Dart",
    heroChipFloat2: "Store Ready",
    heroChipFloat3: "Native Plugins",
    primaryCtaLabel: "Let's Connect Quickly",
    primaryCtaHref: "https://shivlam.com/contact-us/",
    marquee: [
      "Flutter",
      "Dart",
      "Cross-Platform",
      "Native Integrations",
      "Performance",
      "Animations",
      "App Store",
      "Play Store",
      "CI/CD",
      "Scalable UI",
    ],
    whyHire: {
      sectionId: "why",
      eyebrow: "WHY HIRE US",
      titleLine1: "Ultimate Flutter App",
      titleLine2: "Development Company",
      titleHighlight: "to Shortlist.",
      description:
        "One codebase. Three platforms. Zero compromises. Our Dart-first team ships pixel-perfect Flutter apps that feel genuinely native on iOS and Android — with shared business logic, shared design tokens, and separate store releases.",
      primaryCta: { label: "Start Your Project →", href: "https://shivlam.com/contact-us/" },
      secondaryCta: {
        label: "View Portfolio",
        href: "https://shivlam.com/shivlam-it-services-portfolio-apps-games-websites-seo/",
      },
      codeFilename: "main.dart",
      codeLangLabel: "Dart",
      phoneChip1: "✓ One Codebase",
      phoneChip2: "⬡ Native Bridges",
      phoneChip3: "◎ iOS + Android",
      stats: [
        { val: "50+", lbl: "Projects Shipped" },
        { val: "99%", lbl: "Satisfaction Rate" },
        { val: "5+", lbl: "Countries Served" },
      ],
      cards: [
        {
          icon: "oneCodebase",
          accent: "flutter",
          title: "One Codebase",
          desc: "Single Dart codebase ships to iOS, Android, and web with no rewrites.",
        },
        {
          icon: "hotReload",
          accent: "orange",
          title: "Hot Reload 🔥",
          desc: "See UI changes instantly — sub-300ms hot reload keeps iterations fast.",
        },
        {
          icon: "performance",
          accent: "flutter",
          title: "Native Performance",
          desc: "Compiled to native ARM code — 60fps smooth on every device.",
        },
        {
          icon: "stores",
          accent: "orange",
          title: "Both Store Launches",
          desc: "Full App Store and Play Store submission — ASO, compliance, release pipeline.",
        },
      ],
    },
    advantages: ADVANTAGES_FLUTTER,
    clients: MOBILE_CLIENTS_SECTION,
    otherServices: MOBILE_OTHER_SERVICES_SECTION,
    appPortfolio: MOBILE_APP_PORTFOLIO_BLOCKS,
    arFoundation: FLUTTER_AR_FOUNDATION,
    flutterOneCodebaseCta: FLUTTER_ONECODEBASE_CTA,
  },
};


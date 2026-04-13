import type { PortfolioSectionData } from "./types";

const B = (r: number, g: number, b: number, o = 0.95) =>
  ({
    background: `rgba(${r},${g},${b},0.18)`,
    border: `1px solid rgba(${r},${g},${b},0.4)`,
    color: `rgba(${r},${g},${b},${o})`,
  }) as const;

export const PORTFOLIO_SECTIONS: readonly PortfolioSectionData[] = [
  {
    cat: "iphone",
    sectionId: "sec-iphone",
    title: "iPhone App Development",
    titleClassName: "text-[#54C5F8]",
    countLabel: "incl. AR · BIM · visionOS",
    countClassName:
      "border-[rgba(84,197,248,.25)] bg-[rgba(84,197,248,.1)] text-[rgba(84,197,248,.9)]",
    lineClassName: "bg-[rgba(84,197,248,.15)]",
    description:
      "Native iOS apps, ARKit & LiDAR-powered AR experiences, BIM & 3D reconstruction tools, and visionOS spatial apps — all built on Apple's device ecosystem.",
    subcategories: [
      {
        label: "Native iOS Apps · Swift / SwiftUI",
        projects: [
          {
            id: "plinth",
            preview: { type: "ios", c1: "#54C5F8", c2: "#FF9933" },
            badge: { label: "iOS · SwiftUI", style: B(84, 197, 248) },
            title: "Plinth",
            description:
              "Property consultancy iOS app — real-time listings, agent booking, and SwiftUI property explorer.",
            pills: ["SwiftUI", "MapKit", "Firebase"],
            overlay: {
              primary: {
                label: "App Store",
                href: "https://apps.apple.com/in/app/plinth-it/id6746931219",
                external: true,
              },
              secondary: { label: "Service", href: "/services/iphone-app-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://apps.apple.com/in/app/plinth-it/id6746931219",
              external: true,
            },
          },
          {
            id: "soma",
            preview: { type: "ios", c1: "#22c55e", c2: "#1DCFCF" },
            badge: { label: "iOS · Swift", style: B(34, 197, 94) },
            title: "Soma NPT",
            description:
              "Swiss wellness iOS app. Health tracking, session management, bilingual interface in Swift.",
            pills: ["Swift", "HealthKit", "CoreData"],
            overlay: {
              primary: {
                label: "App Store",
                href: "https://apps.apple.com/in/app/soma-npt/id1333946625",
                external: true,
              },
              secondary: { label: "Service", href: "/services/iphone-app-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://apps.apple.com/in/app/soma-npt/id1333946625",
              external: true,
            },
          },
          {
            id: "deliverend",
            preview: { type: "ios", c1: "#FF9933", c2: "#1DCFCF" },
            badge: { label: "iOS · Swift", style: B(255, 153, 51) },
            title: "DeliverEnd",
            description:
              "On-demand delivery iOS platform — real-time driver tracking, multi-stop routing, live order management.",
            pills: ["Swift", "MapKit", "WebSocket"],
            overlay: {
              primary: {
                label: "App Store",
                href: "https://apps.apple.com/us/app/deliverend-drive/id1556349555",
                external: true,
              },
              secondary: { label: "Service", href: "/services/iphone-app-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://apps.apple.com/us/app/deliverend-drive/id1556349555",
              external: true,
            },
          },
          {
            id: "crimesly",
            preview: { type: "ios", c1: "#FF6B6B", c2: "#54C5F8" },
            badge: { label: "iOS · Swift", style: B(255, 107, 107) },
            title: "Crimesly",
            description:
              "Crime reporting and safety awareness iOS app — location-based alerts and community feed.",
            pills: ["Swift", "CoreLocation", "Push"],
            overlay: {
              primary: {
                label: "App Store",
                href: "https://apps.apple.com/in/app/crimesly/id6502628267",
                external: true,
              },
              secondary: { label: "Service", href: "/services/iphone-app-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://apps.apple.com/in/app/crimesly/id6502628267",
              external: true,
            },
          },
          {
            id: "spanish-words",
            preview: { type: "ios", c1: "#C084FC", c2: "#54C5F8" },
            badge: { label: "iOS · SwiftUI", style: B(192, 132, 252) },
            title: "Spanish Words — Rápido",
            description:
              "Language learning iOS app with spaced repetition, audio pronunciation, and gamified vocabulary.",
            pills: ["SwiftUI", "AVFoundation", "CoreData"],
            overlay: {
              primary: {
                label: "App Store",
                href: "https://apps.apple.com/in/app/learn-spanish-words-r%C3%A1pido/id6448483781",
                external: true,
              },
              secondary: { label: "Service", href: "/services/iphone-app-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://apps.apple.com/in/app/learn-spanish-words-r%C3%A1pido/id6448483781",
              external: true,
            },
          },
        ],
      },
      {
        label: "AR · BIM · 3D Reconstruction · LiDAR",
        projects: [
          {
            id: "deltaarbim",
            preview: { type: "arbim", c1: "#FF9933", c2: "#1DCFCF" },
            badge: { label: "ARKit · LiDAR · BIM", style: B(255, 153, 51) },
            title: "DeltaARBIM — Flagship Product",
            description:
              "LiDAR-powered AR BIM overlay — MEP pipes, clash detection, and point clouds live on iPhone Pro.",
            pills: ["ARKit 6", "LiDAR", "RealityKit", "IFC"],
            overlay: {
              primary: { label: "Learn More", href: "https://deltaarbim.tech", external: true },
              secondary: { label: "AR BIM", href: "/services/ar-bim" },
            },
            footerLink: { label: "Live", href: "https://deltaarbim.tech", external: true },
          },
          {
            id: "3d-recon",
            preview: { type: "arbim", c1: "#1DCFCF", c2: "#FF9933" },
            badge: { label: "LiDAR · 3D Recon", style: B(29, 207, 207) },
            title: "3D Reconstruction — LiDAR to BIM",
            description:
              "LiDAR scan to IFC-ready BIM. ±2mm accuracy point clouds for legacy building documentation.",
            pills: ["LiDAR", "IFC Export", "Point Cloud"],
            overlay: {
              primary: { label: "Service", href: "/services/3d-reconstruction" },
              secondary: { label: "Get Quote", href: "https://shivlam.com/contact-us/", external: true },
            },
            footerLink: { label: "Service", href: "/services/3d-reconstruction" },
          },
          {
            id: "ar-vr-industrial",
            preview: { type: "arbim", c1: "#C084FC", c2: "#FF9933" },
            badge: { label: "AR VR · Unity · iOS", style: B(192, 132, 252) },
            title: "AR VR Industrial Solutions",
            description:
              "District cooling plant AR overlay — live data labels, pipe visualisation, and maintenance training in Unity + ARKit.",
            pills: ["Unity", "ARKit", "visionOS"],
            overlay: {
              primary: { label: "AR/VR", href: "/services/ar-vr-solution" },
              secondary: { label: "Get Quote", href: "https://shivlam.com/contact-us/", external: true },
            },
            footerLink: { label: "Service", href: "/services/ar-vr-solution" },
          },
        ],
      },
    ],
  },
  {
    cat: "games",
    sectionId: "sec-games",
    title: "Game Development",
    titleClassName: "text-[#AAAAFF]",
    countLabel: "Unity · AR Games · Vision Pro",
    countClassName:
      "border-[rgba(170,170,255,.25)] bg-[rgba(170,170,255,.1)] text-[rgba(170,170,255,.9)]",
    lineClassName: "bg-[rgba(170,170,255,.15)]",
    description:
      "Unity mobile games, AR-powered experiences, and Vision Pro spatial games — shipped to App Store and Play Store.",
    subcategories: [
      {
        label: "",
        projects: [
          {
            id: "cosmostrike",
            preview: { type: "game-shoot", c1: "#AAAAFF", c2: "#FF6B6B" },
            badge: { label: "Unity · iOS", style: B(170, 170, 255) },
            title: "CosmoStrike",
            description:
              "Space shooter in Unity — procedural waves, particle FX, and Game Center leaderboards.",
            pills: ["Unity", "C#", "GameKit"],
            overlay: {
              primary: {
                label: "App Store",
                href: "https://apps.apple.com/us/app/cosmo-strike/id6499512572",
                external: true,
              },
              secondary: { label: "Service", href: "/services/game-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://apps.apple.com/us/app/cosmo-strike/id6499512572",
              external: true,
            },
          },
          {
            id: "ar-sports",
            preview: { type: "game-ar", c1: "#FF6B6B", c2: "#FF9933" },
            badge: { label: "AR · Unity", style: B(255, 107, 107) },
            title: "AR Sports",
            description:
              "ARCore sports game — real-world plane detection with physics-accurate ball mechanics.",
            pills: ["Unity", "ARCore", "Physics"],
            overlay: {
              primary: {
                label: "Play Store",
                href: "https://play.google.com/store/apps/details?id=com.a300mind.arsports",
                external: true,
              },
              secondary: { label: "Service", href: "/services/game-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://play.google.com/store/apps/details?id=com.a300mind.arsports",
              external: true,
            },
          },
          {
            id: "vola-vole",
            preview: { type: "game-ar", c1: "#FF9933", c2: "#1DCFCF" },
            badge: { label: "AR · Unity", style: B(255, 153, 51) },
            title: "Vola Volé AR",
            description:
              "AR ball game — real environment as the court with multi-surface detection and custom physics.",
            pills: ["Unity", "ARCore", "Multiplayer"],
            overlay: {
              primary: {
                label: "Play Store",
                href: "https://play.google.com/store/apps/details?id=com.volavole.volavolear",
                external: true,
              },
              secondary: { label: "Service", href: "/services/game-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://play.google.com/store/apps/details?id=com.volavole.volavolear",
              external: true,
            },
          },
          {
            id: "merge-2048",
            preview: { type: "game-puzzle", c1: "#AAAAFF", c2: "#1DCFCF" },
            badge: { label: "Unity · Puzzle", style: B(170, 170, 255) },
            title: "Merge Card 2048",
            description:
              "Casual merge puzzle — Unity 2D, rewarded ads integration, and daily challenge system.",
            pills: ["Unity 2D", "C#", "Unity Ads"],
            overlay: {
              primary: {
                label: "Play Store",
                href: "https://play.google.com/store/apps/details?id=com.joyhunter.puzzle.merge2048",
                external: true,
              },
              secondary: { label: "Service", href: "/services/game-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://play.google.com/store/apps/details?id=com.joyhunter.puzzle.merge2048",
              external: true,
            },
          },
          {
            id: "runner-survival",
            preview: { type: "game-runner", c1: "#FF9933", c2: "#FF6B6B" },
            badge: { label: "Unity · Runner", style: B(255, 153, 51) },
            title: "Runner Survival",
            description:
              "Endless runner with procedural generation, obstacle physics, and Unity animation rigging.",
            pills: ["Unity", "Procedural", "Rigging"],
            overlay: {
              primary: {
                label: "Play Store",
                href: "https://play.google.com/store/apps/details?id=com.envision.temple.runer.game",
                external: true,
              },
              secondary: { label: "Service", href: "/services/game-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://play.google.com/store/apps/details?id=com.envision.temple.runer.game",
              external: true,
            },
          },
          {
            id: "color-ring",
            preview: { type: "game-puzzle", c1: "#1DCFCF", c2: "#AAAAFF" },
            badge: { label: "Unity · Puzzle", style: B(29, 207, 207) },
            title: "Color Ring Puzzle",
            description:
              "Colour-matching puzzle with shader-driven ring animations, haptic feedback, and 200+ levels.",
            pills: ["Unity", "Shader", "Haptics"],
            overlay: {
              primary: {
                label: "Play Store",
                href: "https://play.google.com/store/apps/details?id=com.puzzle.rings",
                external: true,
              },
              secondary: { label: "Service", href: "/services/game-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://play.google.com/store/apps/details?id=com.puzzle.rings",
              external: true,
            },
          },
        ],
      },
    ],
  },
  {
    cat: "web",
    sectionId: "sec-web",
    title: "Web Design & Development",
    titleClassName: "text-[#22c55e]",
    countLabel: "Dev + UI/UX Design",
    countClassName:
      "border-[rgba(34,197,94,.25)] bg-[rgba(34,197,94,.1)] text-[rgba(34,197,94,.9)]",
    lineClassName: "bg-[rgba(34,197,94,.15)]",
    description:
      "Full-cycle web projects — Laravel backends, WordPress, React/Next.js frontends, Shopify/WooCommerce stores, and UI/UX design systems.",
    subcategories: [
      {
        label: "Web Development · Laravel · WordPress · React",
        projects: [
          {
            id: "plinth-web",
            preview: { type: "web", c1: "#1DCFCF", c2: "#22c55e" },
            badge: { label: "WordPress", style: B(29, 207, 207) },
            title: "Plinth",
            description:
              "Corporate site for property consultancy. Custom WordPress theme, SEO optimised for lead generation.",
            pills: ["WordPress", "ACF", "SEO"],
            overlay: {
              primary: { label: "Visit Site", href: "https://plinth.it/", external: true },
              secondary: { label: "Service", href: "/services/web-development" },
            },
            footerLink: { label: "Live", href: "https://plinth.it/", external: true },
          },
          {
            id: "soma-web",
            preview: { type: "web", c1: "#22c55e", c2: "#1DCFCF" },
            badge: { label: "WordPress", style: B(34, 197, 94) },
            title: "Soma NPT",
            description:
              "Swiss wellness brand — bilingual WordPress with custom theme and WooCommerce product catalogue.",
            pills: ["WordPress", "WPML", "WooCommerce"],
            overlay: {
              primary: { label: "Visit Site", href: "https://soma-npt.ch/", external: true },
              secondary: { label: "Service", href: "/services/web-development" },
            },
            footerLink: { label: "Live", href: "https://soma-npt.ch/", external: true },
          },
          {
            id: "smpg",
            preview: { type: "web", c1: "#FF9933", c2: "#22c55e" },
            badge: { label: "Laravel", style: B(255, 153, 51) },
            title: "SMPG Services",
            description:
              "Service management portal — Laravel backend, custom booking system, and admin dashboard.",
            pills: ["Laravel", "PHP 8", "MySQL"],
            overlay: {
              primary: { label: "Visit Site", href: "https://smpgservice.com/", external: true },
              secondary: { label: "Service", href: "/services/web-development" },
            },
            footerLink: { label: "Live", href: "https://smpgservice.com/", external: true },
          },
          {
            id: "giftcity",
            preview: { type: "web", c1: "#54C5F8", c2: "#FF9933" },
            badge: { label: "React · Next.js", style: B(84, 197, 248) },
            title: "GiftCityAdvisor",
            description:
              "Fintech advisory platform — React frontend ranking on Google for GIFT City investment keywords.",
            pills: ["React", "Next.js", "SEO"],
            overlay: {
              primary: { label: "Visit Site", href: "https://giftcityadvisor.com/", external: true },
              secondary: { label: "Service", href: "/services/web-development" },
            },
            footerLink: { label: "Live", href: "https://giftcityadvisor.com/", external: true },
          },
          {
            id: "ecovance",
            preview: { type: "web", c1: "#22c55e", c2: "#54C5F8" },
            badge: { label: "WooCommerce", style: B(34, 197, 94) },
            title: "EcoVance",
            description:
              "Sustainability eCommerce — WooCommerce with custom product configurator and metrics dashboard.",
            pills: ["WordPress", "WooCommerce", "Custom"],
            overlay: {
              primary: { label: "Visit Site", href: "https://ecovancedef.com/", external: true },
              secondary: { label: "Service", href: "/services/web-development" },
            },
            footerLink: { label: "Live", href: "https://ecovancedef.com/", external: true },
          },
          {
            id: "polaris",
            preview: { type: "web", c1: "#C084FC", c2: "#54C5F8" },
            badge: { label: "WordPress · US", style: B(192, 132, 252) },
            title: "Polaris Academy US",
            description:
              "US education website — course catalogue, student portal integration, full US market SEO.",
            pills: ["WordPress", "LMS", "SEO"],
            overlay: {
              primary: {
                label: "Visit Site",
                href: "https://polarisacademyus.com/",
                external: true,
              },
              secondary: { label: "Service", href: "/services/web-development" },
            },
            footerLink: { label: "Live", href: "https://polarisacademyus.com/", external: true },
          },
          {
            id: "urdstudio",
            preview: { type: "web", c1: "#FF9933", c2: "#1DCFCF" },
            badge: { label: "Custom · GSAP", style: B(255, 153, 51) },
            title: "URDStudio",
            description:
              "Creative studio portfolio — custom design, immersive GSAP scroll animations, and project showcase.",
            pills: ["Custom", "GSAP", "WebGL"],
            overlay: {
              primary: { label: "Visit Site", href: "https://urdstudio.com/", external: true },
              secondary: { label: "Service", href: "/services/web-development" },
            },
            footerLink: { label: "Live", href: "https://urdstudio.com/", external: true },
          },
        ],
      },
      {
        label: "UI/UX Design · Figma · Design Systems",
        projects: [
          {
            id: "wingstrack",
            preview: { type: "uiux", c1: "#22c55e", c2: "#54C5F8" },
            badge: { label: "Mobile UI · Figma", style: B(34, 197, 94) },
            title: "WingsTrack",
            description:
              "Aviation tracking app UI/UX — real-time telemetry dashboard, flight log screens, and geofence visualisation.",
            pills: ["Figma", "iOS", "Android"],
            overlay: {
              primary: {
                label: "Play Store",
                href: "https://play.google.com/store/apps/details?id=com.logicalwings.wingstrack",
                external: true,
              },
              secondary: { label: "Service", href: "/services/iphone-app-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://play.google.com/store/apps/details?id=com.logicalwings.wingstrack",
              external: true,
            },
          },
          {
            id: "quizbuzz",
            preview: { type: "uiux", c1: "#AAAAFF", c2: "#FF9933" },
            badge: { label: "Game UI · Figma", style: B(170, 170, 255) },
            title: "QuizBuzz Trivia",
            description:
              "Game UI design — lobby, live quiz interface, leaderboard, and social sharing screen system.",
            pills: ["Figma", "Game UI", "Motion"],
            overlay: {
              primary: {
                label: "Play Store",
                href: "https://play.google.com/store/apps/details?id=com.logicalwings.quizbuzz",
                external: true,
              },
              secondary: { label: "Service", href: "/services/game-development" },
            },
            footerLink: {
              label: "Live",
              href: "https://play.google.com/store/apps/details?id=com.logicalwings.quizbuzz",
              external: true,
            },
          },
          {
            id: "soma-uiux",
            preview: { type: "uiux", c1: "#1DCFCF", c2: "#22c55e" },
            badge: { label: "Web Design · Brand", style: B(29, 207, 207) },
            title: "Soma NPT — Web Design",
            description:
              "Full web design for Swiss wellness brand — brand alignment, responsive layouts, and Figma system handoff.",
            pills: ["Figma", "Web Design", "Brand"],
            overlay: {
              primary: { label: "Visit Site", href: "https://soma-npt.ch/", external: true },
              secondary: { label: "Service", href: "/services/web-development" },
            },
            footerLink: { label: "Live", href: "https://soma-npt.ch/", external: true },
          },
        ],
      },
    ],
  },
  {
    cat: "brand",
    sectionId: "sec-brand",
    title: "Brand Building",
    titleClassName: "text-sl-saffron",
    countLabel: "incl. SEO & Digital Marketing",
    countClassName: "border-sl-saffron/25 bg-sl-saffron/10 text-sl-saffron/90",
    lineClassName: "bg-sl-saffron/15",
    description:
      "From technical SEO and content strategy to full brand authority campaigns — helping businesses rank, grow, and become trusted brands in their markets.",
    subcategories: [
      {
        label: "",
        projects: [
          {
            id: "photos-au",
            preview: { type: "seo", c1: "#22c55e", c2: "#1DCFCF" },
            badge: { label: "SEO · AU", style: B(34, 197, 94) },
            title: "Photos & Videos AU",
            description:
              "Australian photography business — organic traffic growth through structured SEO and local ranking strategy.",
            pills: ["SEO", "Local", "Content"],
            overlay: {
              primary: { label: "Visit Site", href: "https://photosandvideos.com.au/", external: true },
              secondary: { label: "Service", href: "/services/brand-building" },
            },
            footerLink: { label: "Live", href: "https://photosandvideos.com.au/", external: true },
          },
          {
            id: "emerald",
            preview: { type: "seo", c1: "#FF9933", c2: "#22c55e" },
            badge: { label: "SEO · UK", style: B(255, 153, 51) },
            title: "Emerald Doors",
            description:
              "UK home improvement — competitive SEO for door and window installation keywords.",
            pills: ["SEO", "UK", "eCommerce"],
            overlay: {
              primary: { label: "Visit Site", href: "https://www.emeralddoors.co.uk/", external: true },
              secondary: { label: "Service", href: "/services/brand-building" },
            },
            footerLink: { label: "Live", href: "https://www.emeralddoors.co.uk/", external: true },
          },
          {
            id: "artik",
            preview: { type: "seo", c1: "#54C5F8", c2: "#FF9933" },
            badge: { label: "SEO · US", style: B(84, 197, 248) },
            title: "Artik",
            description:
              "US promotional products — technical SEO, Core Web Vitals optimisation, and content strategy.",
            pills: ["Tech SEO", "CWV", "Content"],
            overlay: {
              primary: { label: "Visit Site", href: "https://www.artik.com/", external: true },
              secondary: { label: "Service", href: "/services/brand-building" },
            },
            footerLink: { label: "Live", href: "https://www.artik.com/", external: true },
          },
          {
            id: "giftcity-seo",
            preview: { type: "seo", c1: "#C084FC", c2: "#22c55e" },
            badge: { label: "SEO · Fintech", style: B(192, 132, 252) },
            title: "GiftCityAdvisor",
            description:
              "Fintech brand building — ranking for GIFT City investment and advisory keywords on Google India.",
            pills: ["Fintech SEO", "Authority", "India"],
            overlay: {
              primary: { label: "Visit Site", href: "https://giftcityadvisor.com/", external: true },
              secondary: { label: "Service", href: "/services/brand-building" },
            },
            footerLink: { label: "Live", href: "https://giftcityadvisor.com/", external: true },
          },
          {
            id: "gifta-benefits",
            preview: { type: "seo", c1: "#22c55e", c2: "#54C5F8" },
            badge: { label: "SEO · SaaS", style: B(34, 197, 94) },
            title: "Gifta Benefits",
            description:
              "Employee benefits SaaS — brand SEO strategy for HR and benefits keywords in competitive US market.",
            pills: ["SEO", "SaaS", "US Market"],
            overlay: {
              primary: { label: "Visit Site", href: "https://www.giftabenefits.com/", external: true },
              secondary: { label: "Service", href: "/services/brand-building" },
            },
            footerLink: { label: "Live", href: "https://www.giftabenefits.com/", external: true },
          },
          {
            id: "jadeblue",
            preview: { type: "seo", c1: "#FF9933", c2: "#C084FC" },
            badge: { label: "SEO · Fashion", style: B(255, 153, 51) },
            title: "Jadeblue",
            description:
              "Premium Indian fashion brand — eCommerce SEO driving organic growth for men's ethnic wear.",
            pills: ["eCommerce SEO", "Fashion", "India"],
            overlay: {
              primary: { label: "Visit Site", href: "https://jadeblue.com/", external: true },
              secondary: { label: "Service", href: "/services/brand-building" },
            },
            footerLink: { label: "Live", href: "https://jadeblue.com/", external: true },
          },
          {
            id: "impact-teachers",
            preview: { type: "seo", c1: "#1DCFCF", c2: "#22c55e" },
            badge: { label: "SEO · UK Edu", style: B(29, 207, 207) },
            title: "Impact Teachers",
            description:
              "UK education recruitment — organic SEO for teaching jobs and school recruitment keywords.",
            pills: ["SEO", "UK Edu", "Local"],
            overlay: {
              primary: { label: "Visit Site", href: "https://impactteachers.com/", external: true },
              secondary: { label: "Service", href: "/services/brand-building" },
            },
            footerLink: { label: "Live", href: "https://impactteachers.com/", external: true },
          },
          {
            id: "davina",
            preview: { type: "seo", c1: "#FF9933", c2: "#22c55e" },
            badge: { label: "SEO · eCommerce", style: B(255, 153, 51) },
            title: "Davina Patches",
            description:
              "Custom patches brand — product SEO, category optimisation, and conversion rate improvement.",
            pills: ["eCommerce", "Product SEO", "CRO"],
            overlay: {
              primary: { label: "Visit Site", href: "https://davinapatches.com/", external: true },
              secondary: { label: "Service", href: "/services/brand-building" },
            },
            footerLink: { label: "Live", href: "https://davinapatches.com/", external: true },
          },
        ],
      },
    ],
  },
];

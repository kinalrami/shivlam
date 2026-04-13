import type { CSSProperties } from "react";
import type {
  CaseStudyCardShort,
  CaseStudySectionFull,
  PortfolioCatKey,
} from "@/lib/case-studies/types";

const T = (r: number, g: number, b: number, o = 0.95): CSSProperties =>
  ({
    background: `rgba(${r},${g},${b},0.2)`,
    border: `1px solid rgba(${r},${g},${b},0.4)`,
    color: `rgba(${r},${g},${b},${o})`,
  }) as const;

export const CASE_STUDIES_EXPECT = [
  {
    num: "01 · THE BRIEF",
    title: "Client Problem & Goals",
    description:
      "What the client needed, why they came to us, and what success looked like from day one.",
  },
  {
    num: "02 · THE BUILD",
    title: "Stack, Architecture & Decisions",
    description:
      "Why we chose the tech we chose — the reasoning, the tradeoffs, and the key engineering decisions.",
  },
  {
    num: "03 · THE RESULT",
    title: "Metrics, Outcomes & Learnings",
    description:
      "Real numbers. Downloads, rankings, load times, conversion rates — and what we'd do differently.",
  },
] as const;

export const CASE_STUDIES_COMING_BANNER = {
  title: "Case Studies Are Being Written",
  description:
    "We're documenting the real story behind each project — the brief, the stack decisions, the challenges, and the results. Check the Work Portfolio now for live projects.",
  linkLabel: "Browse Work Portfolio",
  linkHref: "/work-portfolio",
} as const;

export const CASE_STUDIES_NOTIFY = {
  description:
    "We'll email you when the first case studies go live. No spam — just one email when they're ready.",
  placeholder: "your@email.com",
  submitLabel: "Notify Me →",
  successMessage: "✓ YOU'RE ON THE LIST · WE'LL BE IN TOUCH",
} as const;

export const CASE_STUDIES_SECTIONS_FULL: readonly CaseStudySectionFull[] = [
  {
    cat: "iphone",
    header: {
      title: "iPhone & AR/BIM",
      titleClassName: "text-[#54C5F8]",
      badgeClassName:
        "border-[rgba(84,197,248,.2)] bg-[rgba(84,197,248,.1)] text-[rgba(84,197,248,.8)]",
      lineClassName: "bg-[rgba(84,197,248,.15)]",
      badgeText: "Writing in progress",
    },
    cards: [
      {
        id: "deliverend",
        preview: { type: "ios", c1: "#54C5F8", c2: "#FF9933" },
        cornerTag: { label: "iOS · Swift · ARKit", style: T(84, 197, 248) },
        categoryTag: "iPhone App Dev",
        statusTag: "● Writing Now",
        title: "DeliverEnd — Real-Time Delivery iOS App",
        teaser:
          "How we built a live-tracking delivery driver app for a UK logistics startup — MapKit, WebSocket real-time sync, and launching in 6 weeks.",
        meta: [
          { label: "Client", value: "DeliverEnd · UK" },
          { label: "Platform", value: "iOS · App Store" },
          { label: "Stack", value: "Swift · MapKit · WS" },
        ],
        pills: ["Swift", "MapKit", "WebSocket", "Firebase"],
      },
      {
        id: "deltaarbim",
        preview: { type: "arbim", c1: "#FF9933", c2: "#1DCFCF" },
        cornerTag: { label: "LiDAR · ARKit · BIM", style: T(255, 153, 51) },
        categoryTag: "AR / BIM",
        statusTag: "● Writing Now",
        title: "DeltaARBIM — LiDAR BIM Overlay for Construction",
        teaser:
          "Our flagship product story — building a LiDAR-powered iOS app that overlays IFC BIM models onto construction sites with ±2mm accuracy.",
        meta: [
          { label: "Product", value: "DeltaARBIM" },
          { label: "Tech", value: "ARKit · LiDAR · IFC" },
          { label: "Accuracy", value: "±2mm" },
        ],
        pills: ["ARKit 6", "LiDAR", "RealityKit", "IFC"],
      },
    ],
  },
  {
    cat: "games",
    header: {
      title: "Game Development",
      titleClassName: "text-[#AAAAFF]",
      badgeClassName:
        "border-[rgba(170,170,255,.2)] bg-[rgba(170,170,255,.1)] text-[rgba(170,170,255,.8)]",
      lineClassName: "bg-[rgba(170,170,255,.15)]",
      badgeText: "Writing in progress",
    },
    cards: [
      {
        id: "ar-sports",
        preview: { type: "game-shoot", c1: "#AAAAFF", c2: "#FF6B6B" },
        cornerTag: { label: "Unity · AR · Android", style: T(170, 170, 255) },
        categoryTag: "Game Dev",
        statusTag: "● Writing Now",
        title: "AR Sports — Real-World AR Game",
        teaser:
          "Building a physics-accurate AR sports game on Android with ARCore — plane detection, real-world ball mechanics, and Play Store launch in 8 weeks.",
        meta: [
          { label: "Platform", value: "Android · Play Store" },
          { label: "Engine", value: "Unity · ARCore" },
          { label: "Timeline", value: "8 weeks" },
        ],
        pills: ["Unity", "ARCore", "C#", "Physics"],
      },
      {
        id: "cosmostrike",
        preview: { type: "game-shoot", c1: "#FF9933", c2: "#1DCFCF" },
        cornerTag: { label: "Unity · iOS · App Store", style: T(255, 153, 51) },
        categoryTag: "Game Dev",
        statusTag: "● Writing Now",
        title: "CosmoStrike — Space Shooter iOS",
        teaser:
          "From concept to App Store in Unity — procedural wave generation, particle FX architecture, GameKit leaderboards, and App Store compliance.",
        meta: [
          { label: "Platform", value: "iOS · App Store" },
          { label: "Engine", value: "Unity 2023" },
          { label: "Genre", value: "Arcade Shooter" },
        ],
        pills: ["Unity", "C#", "GameKit", "Procedural"],
      },
    ],
  },
  {
    cat: "web",
    header: {
      title: "Web Design & Development",
      titleClassName: "text-[#22c55e]",
      badgeClassName:
        "border-[rgba(34,197,94,.2)] bg-[rgba(34,197,94,.1)] text-[rgba(34,197,94,.8)]",
      lineClassName: "bg-[rgba(34,197,94,.15)]",
      badgeText: "Writing in progress",
    },
    cards: [
      {
        id: "giftcity",
        preview: { type: "web", c1: "#22c55e", c2: "#1DCFCF" },
        cornerTag: { label: "React · Next.js · SEO", style: T(34, 197, 94) },
        categoryTag: "Web Dev",
        statusTag: "● Writing Now",
        title: "GiftCityAdvisor — Fintech Web Platform",
        teaser:
          "Building a credibility-first fintech website for GIFT City advisors — Next.js SSR, structured data, and SEO strategy to rank for investment advisory keywords.",
        meta: [
          { label: "Client", value: "GiftCityAdvisor · India" },
          { label: "Stack", value: "React · Next.js" },
          { label: "Focus", value: "Fintech SEO" },
        ],
        pills: ["React", "Next.js", "SEO", "Fintech"],
      },
      {
        id: "soma-web",
        preview: { type: "web", c1: "#54C5F8", c2: "#22c55e" },
        cornerTag: { label: "WordPress · WooCommerce", style: T(84, 197, 248) },
        categoryTag: "Web Dev",
        statusTag: "● Writing Now",
        title: "Soma NPT — Swiss Wellness eCommerce",
        teaser:
          "Rebuilding a Swiss wellness brand's digital presence — bilingual WordPress, WooCommerce product catalogue, and performance optimisation for European hosting.",
        meta: [
          { label: "Client", value: "Soma NPT · Switzerland" },
          { label: "Stack", value: "WordPress · WooCommerce" },
          { label: "Market", value: "Switzerland · EU" },
        ],
        pills: ["WordPress", "WPML", "WooCommerce"],
      },
    ],
  },
  {
    cat: "brand",
    header: {
      title: "Brand Building & SEO",
      titleClassName: "text-orange-400",
      badgeClassName: "border-orange-400/20 bg-orange-400/10 text-orange-300/90",
      lineClassName: "bg-orange-400/15",
      badgeText: "Writing in progress",
    },
    cards: [
      {
        id: "emerald",
        preview: { type: "seo", c1: "#22c55e", c2: "#FF9933" },
        cornerTag: { label: "SEO · UK Market", style: T(34, 197, 94) },
        categoryTag: "Brand Building",
        statusTag: "● Writing Now",
        title: "Emerald Doors — UK Brand SEO Growth",
        teaser:
          "How we grew organic visibility for a UK home improvement brand — competitive keyword mapping, technical SEO fixes, and a 6-month content authority plan.",
        meta: [
          { label: "Client", value: "Emerald Doors · UK" },
          { label: "Service", value: "SEO + Content" },
          { label: "Market", value: "United Kingdom" },
        ],
        pills: ["SEO", "UK Market", "Content", "Tech SEO"],
      },
      {
        id: "jadeblue",
        preview: { type: "seo", c1: "#FF9933", c2: "#54C5F8" },
        cornerTag: { label: "SEO · Fashion · India", style: T(255, 153, 51) },
        categoryTag: "Brand Building",
        statusTag: "● Writing Now",
        title: "Jadeblue — Fashion eCommerce SEO",
        teaser:
          "Driving organic growth for India's premium ethnic wear brand — eCommerce SEO, category page optimisation, and seasonal content strategy.",
        meta: [
          { label: "Client", value: "Jadeblue · India" },
          { label: "Service", value: "eCommerce SEO" },
          { label: "Market", value: "India · Fashion" },
        ],
        pills: ["eCommerce SEO", "Fashion", "India", "CRO"],
      },
    ],
  },
];

export const CASE_STUDIES_FILTERED: Record<
  Exclude<PortfolioCatKey, "all">,
  readonly CaseStudyCardShort[]
> = {
  iphone: [
    {
      id: "deliverend-f",
      preview: { type: "ios", c1: "#54C5F8", c2: "#FF9933" },
      categoryTag: "iPhone Dev",
      statusTag: "● Soon",
      title: "DeliverEnd — Delivery iOS App",
      teaser: "Real-time driver tracking, MapKit, WebSocket sync and a 6-week launch story.",
      pills: ["Swift", "MapKit", "Firebase"],
    },
    {
      id: "deltaarbim-f",
      preview: { type: "arbim", c1: "#FF9933", c2: "#1DCFCF" },
      categoryTag: "AR / BIM",
      statusTag: "● Soon",
      title: "DeltaARBIM — LiDAR BIM Overlay",
      teaser: "Our flagship product — building a LiDAR-powered iOS BIM overlay with ±2mm accuracy.",
      pills: ["ARKit", "LiDAR", "IFC"],
    },
  ],
  games: [
    {
      id: "ar-sports-f",
      preview: { type: "game-shoot", c1: "#AAAAFF", c2: "#FF6B6B" },
      categoryTag: "Game Dev",
      statusTag: "● Soon",
      title: "AR Sports — ARCore Android Game",
      teaser:
        "Physics-accurate AR game on Android — plane detection, real-world ball mechanics, Play Store launch.",
      pills: ["Unity", "ARCore", "C#"],
    },
    {
      id: "cosmostrike-f",
      preview: { type: "game-shoot", c1: "#FF9933", c2: "#1DCFCF" },
      categoryTag: "Game Dev",
      statusTag: "● Soon",
      title: "CosmoStrike — Unity iOS Shooter",
      teaser: "Procedural wave generation, particle FX, GameKit leaderboards, and App Store submission.",
      pills: ["Unity", "C#", "GameKit"],
    },
  ],
  web: [
    {
      id: "giftcity-f",
      preview: { type: "web", c1: "#22c55e", c2: "#1DCFCF" },
      categoryTag: "Web Dev",
      statusTag: "● Soon",
      title: "GiftCityAdvisor — Fintech Platform",
      teaser: "Next.js SSR, structured data, and SEO to rank for fintech advisory keywords in India.",
      pills: ["React", "Next.js", "SEO"],
    },
    {
      id: "soma-f",
      preview: { type: "web", c1: "#54C5F8", c2: "#22c55e" },
      categoryTag: "Web Dev",
      statusTag: "● Soon",
      title: "Soma NPT — Swiss eCommerce",
      teaser:
        "Bilingual WordPress + WooCommerce for a Swiss wellness brand with European hosting optimisation.",
      pills: ["WordPress", "WPML", "WooCommerce"],
    },
  ],
  brand: [
    {
      id: "emerald-f",
      preview: { type: "seo", c1: "#22c55e", c2: "#FF9933" },
      categoryTag: "Brand Building",
      statusTag: "● Soon",
      title: "Emerald Doors — UK Brand SEO",
      teaser: "6-month content authority plan and technical SEO for a UK home improvement brand.",
      pills: ["SEO", "UK", "Content"],
    },
    {
      id: "jadeblue-f",
      preview: { type: "seo", c1: "#FF9933", c2: "#54C5F8" },
      categoryTag: "Brand Building",
      statusTag: "● Soon",
      title: "Jadeblue — Fashion eCommerce SEO",
      teaser: "eCommerce SEO, category page optimisation, and seasonal content for India's premium fashion brand.",
      pills: ["eCommerce SEO", "Fashion", "India"],
    },
  ],
};

export const CASE_STUDIES_FILTERED_HEADERS: Record<
  Exclude<PortfolioCatKey, "all">,
  { title: string; titleClassName: string; lineClassName: string }
> = {
  iphone: {
    title: "iPhone & AR/BIM Case Studies",
    titleClassName: "text-[#54C5F8]",
    lineClassName: "bg-[rgba(84,197,248,.15)]",
  },
  games: {
    title: "Game Development Case Studies",
    titleClassName: "text-[#AAAAFF]",
    lineClassName: "bg-[rgba(170,170,255,.15)]",
  },
  web: {
    title: "Web Design & Development Case Studies",
    titleClassName: "text-[#22c55e]",
    lineClassName: "bg-[rgba(34,197,94,.15)]",
  },
  brand: {
    title: "Brand Building & SEO Case Studies",
    titleClassName: "text-orange-400",
    lineClassName: "bg-orange-400/15",
  },
};

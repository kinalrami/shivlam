export type MobileServiceKey = "iphone" | "android" | "flutter";

export type MobileServiceContent = {
  heroTagline: string;
  heroHighlight: string;
  heroTitleTail: string;
  heroDescription: string;
  heroMeta: string[];
  heroChips: string[];
  heroPhoneTopLeft: string;
  heroPhoneSummary: string;
  heroChipFloat1: string;
  heroChipFloat2: string;
  heroChipFloat3: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;

  marquee: string[];
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
  },
  flutter: {
    heroTagline: "FLUTTER · DART · CROSS-PLATFORM · PERFORMANCE",
    heroHighlight: "Flutter App",
    heroTitleTail: "Development Company.",
    heroDescription:
      "Ship pixel-perfect Flutter apps with one codebase, native integrations, and performance-focused engineering—delivered for both iOS and Android stores.",
    heroMeta: ["Single Codebase", "Native Integrations", "App Store + Play Store", "Fast Iterations"],
    heroChips: ["Flutter · Dart", "iOS + Android", "Native Plugins", "Performance"],
    heroPhoneTopLeft: "FLUTTER LIVE",
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
  },
};


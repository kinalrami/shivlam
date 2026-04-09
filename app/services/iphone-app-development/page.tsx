import type { Metadata } from "next";
import MobileServiceLanding from "@/components/views/mobile-app-development/MobileServiceLanding";
import { MOBILE_SERVICE_CONTENT } from "@/components/views/mobile-app-development/content";

export const metadata: Metadata = {
  title: "iPhone App Development Company — Shivlam",
  description:
    "Swift, SwiftUI, UIKit, ARKit, CoreML and App Store-ready iOS development. Hire a dedicated iPhone app development team at Shivlam.",
};

export default function IphoneAppDevelopmentPage() {
  return (
    <main className="relative z-10 min-h-0 flex-1">
      <MobileServiceLanding content={MOBILE_SERVICE_CONTENT.iphone} />
    </main>
  );
}


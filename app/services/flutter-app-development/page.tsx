import type { Metadata } from "next";
import MobileServiceLanding from "@/components/views/mobile-app-development/MobileServiceLanding";
import { MOBILE_SERVICE_CONTENT } from "@/components/views/mobile-app-development/content";

export const metadata: Metadata = {
  title: "Flutter App Development Company — Shivlam",
  description:
    "Cross-platform Flutter app development with Dart, native integrations, high-performance UI, and delivery for both App Store and Play Store. Hire Shivlam for Flutter development.",
};

export default function FlutterAppDevelopmentPage() {
  return (
    <main className="relative z-10 min-h-0 flex-1">
      <MobileServiceLanding content={MOBILE_SERVICE_CONTENT.flutter} />
    </main>
  );
}


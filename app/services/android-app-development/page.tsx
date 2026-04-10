import type { Metadata } from "next";
import MobileServiceLanding from "@/components/views/mobile-app-development/MobileServiceLanding";
import { MOBILE_SERVICE_CONTENT } from "@/components/views/mobile-app-development/content";

export const metadata: Metadata = {
  title: "Android App Development Company — Shivlam",
  description:
    "Kotlin-first Android development with Jetpack Compose, Material Design, performance engineering, and Play Store launch support. Hire Shivlam for Android app development.",
};

export default function AndroidAppDevelopmentPage() {
  return (
    <main className="relative z-10 min-h-0 flex-1">
      <MobileServiceLanding serviceKey="android" content={MOBILE_SERVICE_CONTENT.android} />
    </main>
  );
}


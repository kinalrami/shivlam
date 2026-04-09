import type { Metadata } from "next";
import Landing from "@/components/views/ar-vr-solution/Landing";

export const metadata: Metadata = {
  title: "AR/VR Solution — Shivlam",
  description:
    "AR/VR experiences for training, visualization, and interactive product demos. Spatial UX, real-time 3D, and deployment for mobile and headsets.",
};

export default function ArVrSolutionPage() {
  return (
    <main className="relative z-10 min-h-0 flex-1">
      <Landing />
    </main>
  );
}


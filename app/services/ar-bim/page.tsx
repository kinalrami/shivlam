import type { Metadata } from "next";
import Landing from "@/components/views/ar-bim/Landing";

export const metadata: Metadata = {
  title: "AR BIM Development — Shivlam",
  description:
    "AR BIM overlay, DeltaARBIM, LiDAR and ARKit-class tracking for construction sites. IFC, Revit, and field-ready spatial QA.",
};

export default function ArBimDevelopmentPage() {
  return (
    <>
      <main className="relative z-10 min-h-0 flex-1">
        <Landing />
      </main>
    </>
  );
}

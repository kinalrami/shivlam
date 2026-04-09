import type { Metadata } from "next";
import Landing from "@/components/views/3d-reconstruction/Landing";

export const metadata: Metadata = {
  title: "3D Reconstruction — Shivlam",
  description:
    "LiDAR and photogrammetry pipelines to clean meshes and BIM-ready deliverables. Field capture, reconstruction QA, and IFC / Revit export.",
};

export default function ThreeDReconstructionPage() {
  return (
    <>
      <main className="relative z-10 min-h-0 flex-1">
        <Landing />
      </main>
    </>
  );
}

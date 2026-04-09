"use client";

import type { RefObject } from "react";
import { Activity, Home, LayoutGrid } from "lucide-react";
import { CardsCanvasSection } from "@/components/shared/CardsCanvasSection";

type Props = {
  floorCvRef: RefObject<HTMLCanvasElement | null>;
};

const icons = [Home, Activity, LayoutGrid] as const;

const cards = [
  {
    title: "Sustainable retrofitting",
    body: "Reconstructing old structures to integrate modern, green energy systems. LiDAR-accurate models enable precise retrofit planning — from HVAC routes to solar panel load calculations.",
    tag: "GREEN ENERGY · RETROFIT",
  },
  {
    title: "Analytical modeling",
    body: "High-level simulation of airflow, cooling, and structural integrity. Feed your reconstructed models directly into CFD and FEA pipelines for engineering-grade analysis.",
    tag: "CFD · FEA · SIMULATION",
  },
  {
    title: "Floor plan automation",
    body: "Generating precise 2D/3D layouts directly from iPad LiDAR feeds. Room boundaries, wall thicknesses, and MEP routes auto-classified and exported in minutes.",
    tag: "AUTO-CLASSIFY · DXF · PDF",
  },
] as const;

/** Cards + canvas chrome match `ar-bim/Spec.tsx` (same classes / layout patterns). */
export default function Analytics({ floorCvRef }: Props) {
  return (
    <CardsCanvasSection
      id="recon-analytics"
      headingId="recon-analytics-heading"
      eyebrow="Analytical specialisation"
      title={
        <>
          Deep Analytics. <br /><span className="text-sl-saffron">Sustainable Solutions.</span>
        </>
      }
      lead="Specialised workflows for retrofit planning, simulation handoff, and automated plan generation — grounded in dense spatial truth."
      cards={cards.map((c, i) => ({ ...c, icon: icons[i] ?? Home }))}
      canvasId="recon-fp-cv"
      canvasRef={floorCvRef}
      footerLeft="Floor_plan: GF_BLOCK_A"
      footerRight={
        <span className="flex items-center gap-1.5">
          <span className="size-1 shrink-0 rounded-full bg-orange-400" aria-hidden />
          Hover room for data →
        </span>
      }
    />
  );
}

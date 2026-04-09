"use client";

import type { RefObject } from "react";
import { Activity, Layers, Smartphone } from "lucide-react";
import { CardsCanvasSection } from "@/components/shared/CardsCanvasSection";

type Props = {
  techCvRef: RefObject<HTMLCanvasElement | null>;
};

const cards = [
  {
    title: "Unity engine integration",
    body: "Developing physics-accurate 3D environments for training and visualization. Our Unity pipelines handle lighting, physics, and spatial audio for enterprise-grade immersive experiences.",
    tag: "UNITY · PHYSX · HDRP",
    icon: Layers,
  },
  {
    title: "iOS ecosystem",
    body: "Leveraging Swift and native hardware for seamless ARKit performance on Apple devices. Full support for LiDAR-equipped iPhone Pro and iPad Pro for spatial computing applications.",
    tag: "SWIFT · ARKIT · SCENEKIT",
    icon: Smartphone,
  },
  {
    title: "Immersive analytics",
    body: "Overlaying real-time “Analytical Look” data onto virtual models to monitor system health. Every sensor feeds directly into your virtual environment for live operational intelligence.",
    tag: "REALTIME · WEBGL · WEBSOCKET",
    icon: Activity,
  },
] as const;

export default function TechCore({ techCvRef }: Props) {
  return (
    <CardsCanvasSection
      id="arvr-capabilities"
      headingId="arvr-techcore-heading"
      eyebrow="The tech core"
      title={
        <>
          Native Performance.<br /> <span className="text-sl-saffron">Zero Latency.</span>
        </>
      }
      lead="A production pipeline for immersive systems: deterministic performance, real-time telemetry, and headset-ready interaction."
      cards={cards}
      canvasId="arvr-techcore-cv"
      canvasRef={techCvRef}
      canvasOverlay={
        <div className="pointer-events-none absolute top-5 right-5 flex flex-col gap-2">
          {(
            [
              ["LATENCY", "14ms"],
              ["SYNC_STATUS", "ACTIVE"],
              ["RENDER_FPS", "60"],
              ["ANCHOR_COUNT", "8"],
              ["SESSION", "AR_LIVE"],
            ] as const
          ).map(([k, v]) => (
            <div
              key={`${k}:${v}`}
              className={[
                "rounded border bg-[#071422]/65 px-2 py-1.5 font-mono text-[9px] leading-none tracking-[0.18em] uppercase",
                "border-[#1dcfcf40] text-[#1DCFCF] ring-1 ring-white/5",
              ].join(" ")}
            >
              <span className="text-[#1DCFCF]">{k}:</span>
              <span className="text-orange-400"> {v}</span>
            </div>
          ))}
        </div>
      }
    />
  );
}


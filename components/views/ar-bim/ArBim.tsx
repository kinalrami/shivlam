"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { InlineModelViewer } from "./InlineModelViewer";

const DEFAULT_VIDEO =
  process.env.NEXT_PUBLIC_AR_BIM_DEMO_VIDEO ??
  "/videos/bim-ar.mp4";

const DEFAULT_MODEL =
  process.env.NEXT_PUBLIC_AR_BIM_DEMO_MODEL ??
  "/models/Duck.glb";

type VideoDemo = {
  id: string;
  title: string;
  blurb: string;
  videoSrc: string;
  duration?: string;
};

const videoDemos: VideoDemo[] = [
  {
    id: "overlay-walkthrough",
    title: "BIM overlay — construction site walkthrough",
    blurb:
      "Live IFC model anchored to physical space via LiDAR. Captured on iPad Pro.",
    videoSrc: DEFAULT_VIDEO,
    duration: "2:14",
  },
  {
    id: "multi-floor-alignment",
    title: "Multi-floor BIM alignment",
    blurb: "Alignment + drift handling across larger spans.",
    videoSrc: DEFAULT_VIDEO,
    duration: "1:45",
  },
];

export function ArBim() {
  const [activeVideoId, setActiveVideoId] = useState(videoDemos[0]?.id ?? "");
  const activeVideo =
    videoDemos.find((d) => d.id === activeVideoId) ?? videoDemos[0] ?? null;

  return (
    <section className="">

      <div className="mt-10">
        <p className="font-mono mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          // Interactive 3D model
        </p>
        <InlineModelViewer src={DEFAULT_MODEL} label="bim_floor_plan.glb" />
      </div>

      <div className="mt-12">
        <p className="font-mono mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          // Video demos
        </p>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-gray-950/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
            <div className="border-b border-white/10 p-4">
              <p className="font-sans text-sm font-bold text-white">
                {activeVideo?.title ?? "Video demo"}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                {activeVideo?.blurb ?? ""}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-md border border-sl-saffron/30 bg-sl-saffron/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-sl-saffron">
                  AR view
                </span>
                <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-gray-300">
                  3rd person
                </span>
              </div>
            </div>

            <div className="p-4">
              {activeVideo ? (
                <video
                  key={activeVideo.id}
                  className="aspect-video w-full rounded-xl bg-black object-contain"
                  src={activeVideo.videoSrc}
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="aspect-video w-full rounded-xl bg-black/40" />
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-gray-950/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
            <div className="border-b border-white/10 px-4 py-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
                // More videos
              </p>
            </div>
            <ul className="p-2">
              {videoDemos.map((v) => {
                const active = v.id === activeVideoId;
                return (
                  <li key={v.id}>
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(v.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                        active
                          ? "bg-white/5 text-white"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`mt-0.5 size-2 rounded-full ${
                          active ? "bg-sl-saffron" : "bg-gray-700"
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold">
                          {v.title}
                        </span>
                        {v.duration ? (
                          <span className="mt-1 block text-[10px] text-gray-500">
                            {v.duration}
                          </span>
                        ) : null}
                      </span>
                      <Play className="size-4 shrink-0 text-gray-500" aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

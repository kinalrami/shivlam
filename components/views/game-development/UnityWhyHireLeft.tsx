"use client";

import { useEffect, useRef, useState } from "react";
import { attachUnityEditorCanvas } from "./unityEditorCanvas";
import { Check } from "lucide-react";

type ShippedItem = { label: string; href: string };

type Props = {
  shipped: readonly ShippedItem[];
};

export function UnityWhyHireLeft({ shipped }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pos, setPos] = useState("X: 0.0 Y: 1.2 Z: 0.0");
  const [l1, setL1] = useState("✓ Scene loaded: Level_01 (0.8s)");
  const [l2, setL2] = useState("⚠ Physics: 14 active colliders");
  const [l3, setL3] = useState("→ PlayerController.cs compiled");
  const [fps, setFps] = useState(60);
  const [draw, setDraw] = useState(14);
  const [verts, setVerts] = useState("2.4k");
  const [tris, setTris] = useState("4.1k");

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    return attachUnityEditorCanvas(c);
  }, []);

  useEffect(() => {
    const logs = [
      ["✓ Scene loaded: Level_01 (0.8s)", "⚠ Physics: 14 active colliders", "→ PlayerController.cs compiled"],
      ["✓ Bullet pool: 20 instances ready", "⚠ Enemy respawn triggered", "→ GameManager: score updated"],
      ["✓ ARKit session started", "⚠ Plane detected: 2.4m²", "→ ARPlacementManager: anchor set"],
      ["✓ Build succeeded (12.4s)", "⚠ Uploading to TestFlight...", "→ IPA: 48.2MB · Ready for review"],
    ] as const;
    let i = 0;
    const id = window.setInterval(() => {
      const nxt = logs[i % logs.length];
      i++;
      setL1(nxt?.[0] ?? "");
      setL2(nxt?.[1] ?? "");
      setL3(nxt?.[2] ?? "");
      setPos(`X: ${(Math.random() * 4 - 2).toFixed(1)} Y: 1.2 Z: ${(Math.random() * 4 - 2).toFixed(1)}`);
    }, 2500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFps(58 + Math.floor(Math.random() * 5));
      setDraw(10 + Math.floor(Math.random() * 9));
      setVerts(`${(2.1 + Math.random() * 0.9).toFixed(1)}k`);
      setTris(`${(3.6 + Math.random() * 1.2).toFixed(1)}k`);
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="w-full">
      <div className="unity-editor h-[376.4px] w-[516px] max-w-full overflow-hidden rounded-[12px] border border-[rgba(170,170,255,.20)] bg-[#1c1c1c] shadow-[0_24px_60px_rgb(0_0_0/0.5)]">
        <div className="flex h-full flex-col">
          <div className="shrink-0 border-b border-white/6 bg-[#252526]">
            <div className="flex items-center gap-0 border-b border-white/5 px-[10px] py-[6px]">
              {["File", "Edit", "Assets", "GameObject", "Component", "Window"].map((m, idx) => (
                <span
                  key={m}
                  className={[
                    "rounded-[2px] px-2 py-[3px] font-mono text-[8px]",
                    idx === 0 ? "bg-white/8 text-white/75" : "text-white/40",
                  ].join(" ")}
                >
                  {m}
                </span>
              ))}
              <div className="ml-auto font-mono text-[8px] text-white/25">Unity 2023.3 LTS</div>
            </div>
            <div className="flex bg-[#2d2d2d]">
              {["Scene", "Game", "Inspector", "Project", "Console"].map((t, idx) => (
                <span
                  key={t}
                  className={[
                    "border-r border-white/7 px-3 py-[7px] font-mono text-[8px]",
                    idx === 0 ? "bg-[#1c1c1c] text-white/75" : "text-white/35",
                  ].join(" ")}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col bg-[#121212]">
            <div className="relative flex-1 overflow-hidden">
              <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5" />

              <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-[4px] border border-white/10 bg-black/35 px-2 py-1 font-mono text-[9px] text-white/65">
                <span className="size-[6px] rounded-full bg-[#3ddc84]" aria-hidden />
                <span>Playing</span>
              </div>

              <div className="absolute right-3 top-3 space-y-1 text-right font-mono text-[9px] text-white/55">
                <div>FPS: {fps}</div>
                <div>Draw: {draw}</div>
                <div>Verts: {verts}</div>
                <div>Tris: {tris}</div>
              </div>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-6 border-t border-white/5 bg-[#1b1b1b] px-5 py-4 font-mono text-[9px]">
              <div className="space-y-1 text-white/40">
                <div className="tracking-[0.18em] text-white/30">GAME OBJECT</div>
                <div className="tracking-[0.18em] text-white/30">TRANSFORM · POS</div>
                <div className="tracking-[0.18em] text-white/30">RIGIDBODY · MASS</div>
                <div className="tracking-[0.18em] text-white/30">SCRIPT</div>
              </div>
              <div className="space-y-1 text-right text-white/55">
                <div className="text-[#78a6ff]">Player_Character</div>
                <div className="text-[#78a6ff]">{pos}</div>
                <div className="text-[#78a6ff]">1.0 · Gravity ✓</div>
                <div className="text-[#78a6ff]">PlayerController.cs</div>
              </div>
            </div>

            <div className="shrink-0 border-t border-white/5 bg-[#1b1b1b] px-5 py-3 font-mono text-[9px]">
              <div className="flex items-start gap-2 text-white/55">
                <span className="mt-[2px] text-[#3ddc84]">✓</span>
                <span>{l1}</span>
              </div>
              <div className="mt-1 flex items-start gap-2 text-white/45">
                <span className="mt-[2px] text-[#f59e0b]">⚠</span>
                <span>{l2}</span>
              </div>
              <div className="mt-1 flex items-start gap-2 text-white/45">
                <span className="mt-[2px] text-white/35">→</span>
                <span>{l3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {shipped?.length ? (
        <div className="mt-5">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-orange-400 uppercase">
            <Check className="size-4 text-orange-400" />
            Shipped with Unity
          </div>
          <div className="flex flex-wrap gap-2">
            {shipped.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase transition-colors hover:border-orange-400/40 hover:text-white"
              >
                <span className="size-[6px] rounded-full bg-[#3ddc84]" aria-hidden />
                <span className="whitespace-nowrap">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}


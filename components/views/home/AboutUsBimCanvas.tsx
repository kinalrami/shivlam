"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { buildArbimOtWingScene } from "@/components/views/ar-bim/arbimOtWingScene";

export type LayerKey = "struct" | "wall" | "mepr" | "mepb" | "mepy" | "mepg";

export type AboutUsBimLayerToggle = {
  key: LayerKey;
  label: string;
  tw: string;
};

/** Visual chrome around the viewer; defaults match the About page / DeltaARBIM. */
export type AboutUsBimCanvasUi = {
  overlayBadge: string;
  overlayDotClass: string;
  overlayTextClass: string;
  footerLeft: string;
  footerLeftClass: string;
  cornerAccent: string;
  innerRing: string;
  lidarScanLineClass: string;
  canvasAriaLabel: string;
};

export const ABOUT_US_BIM_CANVAS_UI: AboutUsBimCanvasUi = {
  overlayBadge: "BIM OVERLAY LIVE",
  overlayDotClass: "bg-sl-cyan",
  overlayTextClass: "text-sl-cyan/70",
  footerLeft: "DELTA-ARBIM // AR SCAN ACTIVE",
  footerLeftClass: "text-[rgb(245_138_11/0.55)]",
  cornerAccent: "border-sl-saffron/40",
  innerRing: "border-sl-saffron/30",
  lidarScanLineClass:
    "pointer-events-none absolute left-0 right-0 z-10 h-0.5 animate-[about-us-lidar-scan_4.5s_ease-in-out_infinite] bg-linear-to-r from-transparent via-sl-cyan/65 to-transparent motion-reduce:animate-none",
  canvasAriaLabel: "Delta-ARBIM 3D preview — drag to rotate",
};

function readSlBgHex(): number {
  if (typeof document === "undefined") return 0x060e1c;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--sl-bg")
    .trim();
  const hex = raw.startsWith("#") ? raw.slice(1) : raw;
  if (hex.length === 6 && /^[0-9a-fA-F]+$/.test(hex)) {
    return parseInt(hex, 16);
  }
  return 0x060e1c;
}

/** Home / About only — AR-BIM toggles live in `deltaPreviewArbimContent.ts`. */
const LAYER_TOGGLERS_ABOUT: AboutUsBimLayerToggle[] = [
  {
    key: "struct",
    label: "STRUCTURE",
    tw: "border-slate-400/40 bg-slate-400/10 text-slate-400",
  },
  {
    key: "wall",
    label: "WALLS",
    tw: "border-blue-400/40 bg-blue-400/10 text-blue-400",
  },
  {
    key: "mepr",
    label: "MEP HVAC",
    tw: "border-red-400/40 bg-red-400/10 text-red-400",
  },
  {
    key: "mepb",
    label: "MEP WATER",
    tw: "border-cyan-400/40 bg-cyan-400/10 text-cyan-400",
  },
  {
    key: "mepg",
    label: "MEP ELEC",
    tw: "border-green-400/40 bg-green-400/10 text-green-400",
  },
];

type AboutUsBimCanvasProps = {
  ui?: Partial<AboutUsBimCanvasUi>;
  /** AR-BIM services page: different framing, backdrop, and motion vs About (same layer stack). */
  scenePreset?: "about" | "arbim";
  /**
   * When `scenePreset` is `"arbim"`, pass layer buttons from page content
   * (e.g. `AR_BIM_LAYER_TOGGLERS` in `deltaPreviewArbimContent.ts`).
   */
  layerTogglers?: AboutUsBimLayerToggle[];
};

export default function AboutUsBimCanvas({
  ui: uiPartial,
  scenePreset,
  layerTogglers: layerTogglersProp,
}: AboutUsBimCanvasProps = {}) {
  const ui = { ...ABOUT_US_BIM_CANVAS_UI, ...uiPartial };
  const preset = scenePreset ?? "about";
  const isArbim = preset === "arbim";
  const rootSurface = isArbim
    ? "bg-[#060606] [&:fullscreen]:bg-[#060606]"
    : "bg-sl-bg [&:fullscreen]:bg-sl-bg";
  const panelSurface = isArbim ? "bg-[#111820]" : "bg-sl-bg";
  const layerTogglers = isArbim
    ? (layerTogglersProp ?? [])
    : LAYER_TOGGLERS_ABOUT;
  const fsRootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const groupsRef = useRef<Record<LayerKey, THREE.Group> | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    struct: true,
    wall: true,
    mepr: true,
    mepb: true,
    mepy: true,
    mepg: true,
  });

  const toggleLayer = useCallback((key: LayerKey) => {
    setLayers((prev) => {
      const next = !prev[key];
      const g = groupsRef.current?.[key];
      if (g) g.visible = next;
      return { ...prev, [key]: next };
    });
  }, []);

  useEffect(() => {
    const onFs = () => {
      const el = fsRootRef.current;
      setIsFullscreen(
        Boolean(
          document.fullscreenElement && el && document.fullscreenElement === el,
        ),
      );
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const wrap = canvas.parentElement;
    if (!wrap) return;

    const canvasEl = canvas;
    const wrapEl = wrap;

    function sizeCanvas() {
      const w = wrapEl.clientWidth;
      const h = wrapEl.clientHeight;
      canvasEl.width = w;
      canvasEl.height = h;
      return { w, h };
    }

    let { w, h } = sizeCanvas();

    const BG = readSlBgHex();
    const clearHex = BG;

    // Guard: WebGL may be unavailable on some devices/browsers.
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      const test = document.createElement("canvas");
      const gl = test.getContext("webgl2") ?? test.getContext("webgl");
      if (!gl) return;
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: isArbim,
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (isArbim) {
      renderer.setClearColor(0x000000, 0);
    } else {
      renderer.setClearColor(clearHex, 1);
    }
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 300);
    if (isArbim) {
      camera.position.set(7.95, 6.25, 9.1);
      camera.lookAt(0, 1.8, 0);
    } else {
      camera.position.set(8, 6, 12);
      camera.lookAt(0, 2, 0);
    }

    const groups: Record<LayerKey, THREE.Group> = {
      struct: new THREE.Group(),
      wall: new THREE.Group(),
      mepr: new THREE.Group(),
      mepb: new THREE.Group(),
      mepy: new THREE.Group(),
      mepg: new THREE.Group(),
    };
    groupsRef.current = groups;
    Object.values(groups).forEach((g) => scene.add(g));

    function lm(col: number, op: number) {
      return new THREE.LineBasicMaterial({
        color: col,
        transparent: true,
        opacity: op,
      });
    }
    function mm(col: number, op: number) {
      return new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: op,
        side: THREE.DoubleSide,
      });
    }
    function addEdge(
      geo: THREE.BufferGeometry,
      mat: THREE.LineBasicMaterial,
      grp: THREE.Group,
      x: number,
      y: number,
      z: number,
    ) {
      const m = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat);
      m.position.set(x, y, z);
      grp.add(m);
    }
    function addMesh(
      geo: THREE.BufferGeometry,
      mat: THREE.MeshBasicMaterial,
      grp: THREE.Group,
      x: number,
      y: number,
      z: number,
    ) {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      grp.add(m);
    }

    if (!isArbim) {
      const sg = groups.struct;
      const sm = lm(0x94a3b8, 0.9);
      const smf = mm(0x475569, 0.18);
      const colXZ: [number, number][] = [
        [-2.5, -2.5],
        [-2.5, 2.5],
        [2.5, -2.5],
        [2.5, 2.5],
        [-2.5, 0],
        [2.5, 0],
        [0, -2.5],
        [0, 2.5],
      ];
      colXZ.forEach(([x, z]) => {
        addMesh(new THREE.BoxGeometry(0.28, 6, 0.28), smf, sg, x, 3, z);
        addEdge(new THREE.BoxGeometry(0.28, 6, 0.28), sm, sg, x, 3, z);
      });
      for (let i = 0; i <= 5; i++) {
        const y = i * 1.1;
        const pts = [
          new THREE.Vector3(-2.5, y, -2.5),
          new THREE.Vector3(2.5, y, -2.5),
          new THREE.Vector3(2.5, y, 2.5),
          new THREE.Vector3(-2.5, y, 2.5),
          new THREE.Vector3(-2.5, y, -2.5),
        ];
        sg.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            lm(0x64748b, 0.55),
          ),
        );
        if (i < 5) {
          addMesh(new THREE.BoxGeometry(5.2, 0.12, 5.2), mm(0x334155, 0.35), sg, 0, y + 1.08, 0);
          addEdge(
            new THREE.BoxGeometry(5.2, 0.12, 5.2),
            lm(0x94a3b8, 0.3),
            sg,
            0,
            y + 1.08,
            0,
          );
        }
      }

      const wg = groups.wall;
      const wm = mm(0x3b82f6, 0.22);
      const we = lm(0x60a5fa, 0.65);
      const wallBoxes: [number, number, number, number, number, number][] = [
        [5.2, 3.3, 0.12, 0, 1.65, -2.5],
        [5.2, 3.3, 0.12, 0, 1.65, 2.5],
        [0.12, 3.3, 5.2, -2.5, 1.65, 0],
        [0.12, 3.3, 5.2, 2.5, 1.65, 0],
      ];
      wallBoxes.forEach(([bw, bh, bd, x, y, z]) => {
        addMesh(new THREE.BoxGeometry(bw, bh, bd), wm, wg, x, y, z);
        addEdge(new THREE.BoxGeometry(bw, bh, bd), we, wg, x, y, z);
      });

      function pipe(
        grp: THREE.Group,
        matF: THREE.MeshBasicMaterial,
        matL: THREE.LineBasicMaterial,
        p1: [number, number, number],
        p2: [number, number, number],
        r: number,
      ) {
        const len = Math.sqrt(
          (p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2 + (p2[2] - p1[2]) ** 2,
        );
        const mx = (p1[0] + p2[0]) / 2;
        const my = (p1[1] + p2[1]) / 2;
        const mz = (p1[2] + p2[2]) / 2;
        const dx = p2[0] - p1[0];
        const dz = p2[2] - p1[2];
        const angle = Math.atan2(dz, dx);
        const g = new THREE.CylinderGeometry(r, r, len, 8);
        const mesh = new THREE.Mesh(g, matF);
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(g), matL);
        [mesh, edges].forEach((m) => {
          m.position.set(mx, my, mz);
          m.rotation.z = Math.PI / 2;
          m.rotation.y = -angle;
          grp.add(m);
        });
      }

      const rg = groups.mepr;
      const rm = mm(0xef4444, 0.75);
      const re = lm(0xf87171, 0.9);
      const redPipes: [[[number, number, number], [number, number, number]], number][] =
        [
          [[[-2.2, 4.2, -2.2], [2.2, 4.2, -2.2]], 0.14],
          [[[-2.2, 4.2, 2.2], [2.2, 4.2, 2.2]], 0.14],
          [[[0, 4.2, -2.2], [0, 4.2, 2.2]], 0.18],
          [[[-2.2, 4.2, 0], [2.2, 4.2, 0]], 0.18],
        ];
      redPipes.forEach(([seg, r]) => pipe(rg, rm, re, seg[0], seg[1], r));

      const bg2 = groups.mepb;
      const bm = mm(0x0ea5e9, 0.8);
      const bl2 = lm(0x38bdf8, 0.95);
      const bluePipes: [[[number, number, number], [number, number, number]], number][] =
        [
          [[[-2.2, 3.6, -1.5], [2.2, 3.6, -1.5]], 0.07],
          [[[-2.2, 3.6, 1.5], [2.2, 3.6, 1.5]], 0.07],
          [[[-1.5, 3.6, -2.2], [-1.5, 3.6, 2.2]], 0.07],
          [[[1.5, 3.6, -2.2], [1.5, 3.6, 2.2]], 0.07],
          [[[-1.5, 0.6, -2.2], [-1.5, 0.6, 2.2]], 0.055],
          [[[1.5, 0.6, -2.2], [1.5, 0.6, 2.2]], 0.055],
        ];
      bluePipes.forEach(([seg, r]) => pipe(bg2, bm, bl2, seg[0], seg[1], r));

      const gg = groups.mepg;
      const gm2 = mm(0x22c55e, 0.8);
      const gl = lm(0x4ade80, 0.9);
      const greenPipes: [[[number, number, number], [number, number, number]], number][] =
        [
          [[[-2.2, 2.2, -1.0], [2.2, 2.2, -1.0]], 0.05],
          [[[-2.2, 2.2, 1.0], [2.2, 2.2, 1.0]], 0.05],
          [[[-1.0, 2.2, -2.2], [-1.0, 2.2, 2.2]], 0.05],
          [[[1.0, 2.2, -2.2], [1.0, 2.2, 2.2]], 0.05],
          [[[-2.2, 4.8, 0], [2.2, 4.8, 0]], 0.045],
        ];
      greenPipes.forEach(([seg, r]) => pipe(gg, gm2, gl, seg[0], seg[1], r));
    } else {
      buildArbimOtWingScene(groups);
    }

    const gf = new THREE.BufferGeometry();
    const gp: number[] = [];
    const zGrid = isArbim ? 5 : 6;
    const yGrid = isArbim ? -0.14 : 0;
    for (let i = -6; i <= 6; i++) {
      gp.push(i, yGrid, -zGrid, i, yGrid, zGrid);
      gp.push(-6, yGrid, i, 6, yGrid, i);
    }
    gf.setAttribute("position", new THREE.Float32BufferAttribute(gp, 3));
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: isArbim ? 0.6 : 0.28,
      depthWrite: false,
    });
    scene.add(new THREE.LineSegments(gf, gridMat));

    const mg = new THREE.Group();
    Object.values(groups).forEach((g) => mg.add(g));
    scene.add(mg);

    let isDrag = false;
    let lx = 0;
    let ly = 0;
    let rotY = isArbim ? 0.5 : 0.4;
    let rotX = isArbim ? 0.35 : 0.25;
    let auto = true;
    let raf = 0;

    const onDown = (cx: number, cy: number) => {
      isDrag = true;
      lx = cx;
      ly = cy;
      auto = false;
    };
    const onUp = () => {
      isDrag = false;
    };
    const onMove = (cx: number, cy: number) => {
      if (!isDrag) return;
      rotY += (cx - lx) * 0.011;
      rotX += (cy - ly) * 0.008;
      rotX = Math.max(-0.9, Math.min(0.9, rotX));
      lx = cx;
      ly = cy;
    };

    const md = (e: MouseEvent) => onDown(e.clientX, e.clientY);
    const ts = (e: TouchEvent) =>
      onDown(e.touches[0].clientX, e.touches[0].clientY);
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const tm = (e: TouchEvent) =>
      onMove(e.touches[0].clientX, e.touches[0].clientY);

    canvas.addEventListener("mousedown", md);
    canvas.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", tm, { passive: true });

    function animate() {
      raf = requestAnimationFrame(animate);
      if (auto) rotY += 0.004;
      mg.rotation.y = rotY;
      mg.rotation.x = rotX;
      renderer?.render(scene, camera);
    }
    animate();

    const onResize = () => {
      ({ w, h } = sizeCanvas());
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer?.setSize(w, h, false);
    };
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(onResize);
    });
    ro.observe(wrapEl);

    const dispose = () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", tm);
      canvas.removeEventListener("mousedown", md);
      canvas.removeEventListener("touchstart", ts);
      renderer?.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Sprite) {
          const m = obj.material;
          if (m instanceof THREE.SpriteMaterial) {
            m.map?.dispose();
            m.dispose();
          }
          return;
        }
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.Line ||
          obj instanceof THREE.LineSegments
        ) {
          obj.geometry?.dispose();
          const m = obj.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
      groupsRef.current = null;
    };

    return dispose;
  }, [isArbim]);

  return (
    <div
      ref={fsRootRef}
      className={`relative h-full min-h-full w-full [&:fullscreen]:box-border [&:fullscreen]:h-screen [&:fullscreen]:min-h-screen [&:fullscreen]:w-full ${rootSurface}`}
      data-about-bim-fs-root
      data-scene-preset={preset}
    >
      <div
        className={`absolute inset-6 z-10 box-border overflow-hidden rounded border ${panelSurface} ${ui.innerRing}`}
      >
        <div className="pointer-events-auto absolute left-2.5 top-2.5 z-20 flex flex-col gap-1">
          {layerTogglers.map(({ key, label, tw }) => (
            <button
              key={key}
              type="button"
              className={`m-0 box-border cursor-pointer appearance-none rounded border border-solid bg-transparent px-2.5 py-1 font-mono text-xs font-medium tracking-wide transition-opacity duration-200 ${tw} ${layers[key] ? "opacity-100" : "opacity-30"}`}
              onClick={() => toggleLayer(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <canvas
          ref={canvasRef}
          className="block h-full w-full cursor-grab active:cursor-grabbing"
          aria-label={ui.canvasAriaLabel}
        />
        <div className={ui.lidarScanLineClass} aria-hidden />
        <div
          className={`pointer-events-none absolute -left-px -top-px size-4.5 border-0 border-solid ${ui.cornerAccent} border-t-2 border-l-2`}
        />
        <div
          className={`pointer-events-none absolute -right-px -top-px size-4.5 border-0 border-solid ${ui.cornerAccent} border-t-2 border-r-2`}
        />
        <div
          className={`pointer-events-none absolute -bottom-px -left-px size-4.5 border-0 border-solid ${ui.cornerAccent} border-b-2 border-l-2`}
        />
        <div
          className={`pointer-events-none absolute -bottom-px -right-px size-4.5 border-0 border-solid ${ui.cornerAccent} border-b-2 border-r-2`}
        />
        <div className="pointer-events-none absolute right-3 top-2.5 z-10 flex items-center gap-1">
          <div
            className={`size-1.75 animate-[about-us-blink_1.8s_ease-in-out_infinite] rounded-full motion-reduce:animate-none ${ui.overlayDotClass}`}
          />
          <div className={`font-mono text-xs tracking-wider ${ui.overlayTextClass}`}>
            {ui.overlayBadge}
          </div>
        </div>
        <button
          type="button"
          className="absolute bottom-2.5 right-2.5 top-auto z-30 inline-flex items-center justify-center rounded-md border border-white/10 bg-black/40 px-2 py-1 text-slate-300 transition-colors duration-150 hover:border-white/20 hover:bg-white/10 hover:text-white"
          onClick={async () => {
            const root = fsRootRef.current;
            if (!root) return;
            try {
              if (!document.fullscreenElement) await root.requestFullscreen();
              else await document.exitFullscreen();
            } catch {
              /* user cancelled or API unsupported */
            }
          }}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="size-4" aria-hidden />
          ) : (
            <Maximize2 className="size-4" aria-hidden />
          )}
        </button>
        <div
          className={`pointer-events-none absolute bottom-2.5 left-3 font-mono text-[8px] tracking-[0.14em] ${ui.footerLeftClass}`}
        >
          {ui.footerLeft}
        </div>
        <div className="pointer-events-none absolute bottom-4 right-14 max-w-md text-right font-mono text-xs tracking-wide text-white/30">
          {isFullscreen
            ? "DRAG TO ROTATE · ESC TO EXIT FULLSCREEN"
            : "DRAG TO ROTATE"}
        </div>
      </div>
    </div>
  );
}

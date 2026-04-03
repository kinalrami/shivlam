"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type RenderMode = "solid" | "wire";

type InlineModelViewerProps = {
  src: string;
  label?: string;
};

export function InlineModelViewer({ src, label }: InlineModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<RenderMode>("solid");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const materialsRef = useRef<THREE.Material[]>([]);

  const headerLabel = useMemo(
    () => label ?? src.split("/").pop() ?? "model.glb",
    [label, src],
  );

  const applyModeToMaterials = (nextMode: RenderMode) => {
    materialsRef.current.forEach((m) => {
      const anyM = m as unknown as { wireframe?: boolean; needsUpdate?: boolean };
      if (typeof anyM.wireframe === "boolean") {
        anyM.wireframe = nextMode === "wire";
        anyM.needsUpdate = true;
      }
    });
  };

  useEffect(() => {
    applyModeToMaterials(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let animId = 0;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 5000);
    camera.position.set(1.2, 0.8, 1.2);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const key = new THREE.DirectionalLight(0xffffff, 1.25);
    key.position.set(2, 3, 2);
    scene.add(key);

    const grid = new THREE.GridHelper(10, 20, 0x3a3a3a, 0x1f1f1f);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.35;
    scene.add(grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    materialsRef.current = [];

    const collectMaterials = (obj: THREE.Object3D) => {
      const next: THREE.Material[] = [];
      obj.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => {
          if (m && !next.includes(m)) next.push(m);
        });
      });
      materialsRef.current = next;
      applyModeToMaterials(mode);
    };

    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        if (cancelled) return;
        const root = gltf.scene;
        scene.add(root);

        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z, 0.001);
        const dist = maxDim * 1.8;

        controls.target.copy(center);
        camera.position.set(
          center.x + dist * 0.6,
          center.y + dist * 0.35,
          center.z + dist * 0.6,
        );
        camera.near = maxDim / 200;
        camera.far = maxDim * 2000;
        camera.updateProjectionMatrix();
        controls.update();

        collectMaterials(root);
      },
      undefined,
      () => {
        if (cancelled) return;
        const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const mat = new THREE.MeshStandardMaterial({ color: 0xf58a0b });
        const cube = new THREE.Mesh(geo, mat);
        scene.add(cube);
        controls.target.set(0, 0, 0);
        camera.position.set(1.1, 0.8, 1.1);
        controls.update();
        collectMaterials(cube);
      },
    );

    const animate = () => {
      if (cancelled) return;
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    const onFs = () => {
      const el = mountRef.current?.closest("[data-inline-viewer-root]") as HTMLElement | null;
      setIsFullscreen(Boolean(document.fullscreenElement && el && document.fullscreenElement === el));
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  return (
    <div
      data-inline-viewer-root
      className="overflow-hidden rounded-2xl border border-white/10 bg-gray-950/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <p className="font-mono text-xs text-gray-400">{headerLabel}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("solid")}
            className={`rounded-md border px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide ${
              mode === "solid"
                ? "border-sl-saffron bg-sl-saffron/15 text-sl-saffron"
                : "border-white/10 text-gray-500 hover:text-gray-300"
            }`}
          >
            Solid
          </button>
          <button
            type="button"
            onClick={() => setMode("wire")}
            className={`rounded-md border px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide ${
              mode === "wire"
                ? "border-sl-saffron bg-sl-saffron/15 text-sl-saffron"
                : "border-white/10 text-gray-500 hover:text-gray-300"
            }`}
          >
            Wire
          </button>
          <button
            type="button"
            onClick={async () => {
              const root = mountRef.current?.closest("[data-inline-viewer-root]") as HTMLElement | null;
              if (!root) return;
              if (!document.fullscreenElement) await root.requestFullscreen();
              else await document.exitFullscreen();
            }}
            className="rounded-md border border-white/10 px-2 py-1 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={mountRef}
          className="aspect-video w-full bg-[#0a0a0a]"
          aria-label="3D model viewer"
        />
        <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] text-gray-500">
          Drag to orbit · scroll to zoom
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-white/10 px-4 py-3 font-mono text-[10px] text-gray-500">
        <span>Format: GLB</span>
      </div>
    </div>
  );
}

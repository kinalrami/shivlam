"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Saffron accent — matches `--sl-saffron` / ref layout, swapped from teal */
const ACCENT = 0xf58a0b;

export default function Canvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = mount.clientWidth;
    let H = mount.clientHeight;

    // Guard: WebGL may be unavailable (mobile GPU limits, privacy mode, etc.)
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      const test = document.createElement("canvas");
      const gl = test.getContext("webgl2") ?? test.getContext("webgl");
      if (!gl) return;
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200);
    camera.position.set(0, 3, 7);

    const root = new THREE.Group();
    scene.add(root);

    const group = new THREE.Group();
    root.add(group);

    const SIZE = 12;
    const DIVS = 22;
    const step = SIZE / DIVS;
    const accent = new THREE.Color(ACCENT);

    for (let i = 0; i <= DIVS; i++) {
      const x = -SIZE / 2 + i * step;
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0, -SIZE / 2),
        new THREE.Vector3(x, 0, SIZE / 2),
      ]);
      const fade = Math.abs(i - DIVS / 2) / (DIVS / 2);
      const mat = new THREE.LineBasicMaterial({
        color: accent,
        opacity: 0.04 + 0.18 * (1 - fade),
        transparent: true,
      });
      group.add(new THREE.Line(geo, mat));
    }

    for (let i = 0; i <= DIVS; i++) {
      const z = -SIZE / 2 + i * step;
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-SIZE / 2, 0, z),
        new THREE.Vector3(SIZE / 2, 0, z),
      ]);
      const fade = Math.abs(i - DIVS / 2) / (DIVS / 2);
      const mat = new THREE.LineBasicMaterial({
        color: accent,
        opacity: 0.04 + 0.18 * (1 - fade),
        transparent: true,
      });
      group.add(new THREE.Line(geo, mat));
    }

    for (let ix = 0; ix < DIVS; ix += 4) {
      for (let iz = 0; iz < DIVS; iz += 4) {
        const x = -SIZE / 2 + ix * step;
        const z = -SIZE / 2 + iz * step;
        const h = 0.3 + Math.random() * 2;
        const pillarGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, 0, z),
          new THREE.Vector3(x, h, z),
        ]);
        group.add(
          new THREE.Line(
            pillarGeo,
            new THREE.LineBasicMaterial({
              color: accent,
              opacity: 0.2 + Math.random() * 0.3,
              transparent: true,
            }),
          ),
        );

        const sGeo = new THREE.SphereGeometry(0.04, 6, 6);
        const m = new THREE.Mesh(
          sGeo,
          new THREE.MeshBasicMaterial({
            color: accent,
            opacity: 0.4 + Math.random() * 0.4,
            transparent: true,
          }),
        );
        m.position.set(x, h, z);
        group.add(m);
      }
    }

    group.rotation.x = 0.55;

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / W - 0.5) * 2;
      mouse.y = -(e.clientY / H - 0.5) * 2;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      mouse.x = (t.clientX / W - 0.5) * 2;
      mouse.y = -(t.clientY / H - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const onResize = () => {
      W = mount.clientWidth;
      H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer?.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    let t = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.01;
      group.rotation.y = mouse.x * 0.4 + t * 0.15;
      camera.position.y = 3 + mouse.y * 0.5;
      renderer?.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      if (renderer) {
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.55 }}
      aria-hidden
    />
  );
}

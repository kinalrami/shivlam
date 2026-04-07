"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** DeltaARBIM product panel — point cloud ring + rotating frames (Three.js). */
export default function ProductThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let rafId = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.margin = "0";
    canvas.style.padding = "0";

    /** Torus ~3.8 + rotating diagonal + point shell; geometric-mean z reduces wide-aspect side gutters from pure `max(contain)`. */
    const sceneRadius = 5.35;

    const frameCamera = () => {
      const W = Math.floor(mount.clientWidth);
      const H = Math.floor(mount.clientHeight);
      if (W < 1 || H < 1) return;
      const aspect = W / H;
      camera.aspect = aspect;
      const vFovRad = (camera.fov * Math.PI) / 180;
      const tanHalf = Math.tan(vFovRad / 2);
      const zFitHeight = sceneRadius / tanHalf;
      const zFitWidth = sceneRadius / (tanHalf * aspect);
      const zContain = Math.max(zFitHeight, zFitWidth);
      const zCover = Math.min(zFitHeight, zFitWidth);
      // Between contain and cover: fills the card without only-25% center blob on 16:10 layouts.
      let z = Math.sqrt(zContain * zCover) * 1.04;
      camera.position.set(0, 0, z);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(W, H, false);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    const resize = () => frameCamera();

    mount.appendChild(canvas);
    resize();
    requestAnimationFrame(resize);

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const particlesCount = 3000;
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 4.5 + Math.random() * 0.5;
      const height = (Math.random() - 0.5) * 6;
      pos[i * 3] = radius * Math.cos(angle);
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = radius * Math.sin(angle);
    }

    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0x00aaff,
      size: 0.030,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const pointCloud = new THREE.Points(partGeo, partMat);
    scene.add(pointCloud);

    const ringGeo = new THREE.TorusGeometry(3.8, 0.01, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf58a0b });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 2;
    const constructionGroup = new THREE.Group();
    constructionGroup.add(ring1, ring2);
    scene.add(constructionGroup);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      pointCloud.rotation.y += 0.005;
      constructionGroup.rotation.y -= 0.01;
      constructionGroup.rotation.z += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (canvas.parentNode === mount) {
        mount.removeChild(canvas);
      }
      renderer.dispose();
      partGeo.dispose();
      partMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative aspect-16/10 w-full min-h-65 overflow-hidden bg-[#040e1e] max-md:min-h-70"
      aria-hidden
    />
  );
}

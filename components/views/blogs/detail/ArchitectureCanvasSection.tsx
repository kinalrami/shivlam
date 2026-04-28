"use client";

import { useEffect, useRef } from "react";

export function ArchitectureCanvasSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let t = 0;
    const O = "#FF9933";
    const C = "#1DCFCF";
    const G = "#22c55e";
    const P = "#AAAAFF";

    const nodes = [
      { id: "user", label: "USER", sublabel: "Browser", x: 0.08, y: 0.5, color: C, size: 28 },
      { id: "edge", label: "EDGE", sublabel: "Middleware", x: 0.26, y: 0.5, color: O, size: 32 },
      { id: "server", label: "SERVER", sublabel: "Components", x: 0.5, y: 0.35, color: G, size: 34 },
      { id: "cache", label: "CACHE", sublabel: "ISR / PPR", x: 0.5, y: 0.65, color: P, size: 28 },
      { id: "db", label: "DB", sublabel: "MySQL / API", x: 0.74, y: 0.5, color: O, size: 28 },
      { id: "cdn", label: "CDN", sublabel: "Static Assets", x: 0.74, y: 0.22, color: C, size: 24 },
    ] as const;

    const edges = [
      { from: "user", to: "edge", color: C, label: "Request" },
      { from: "edge", to: "server", color: O, label: "Route" },
      { from: "edge", to: "cache", color: P, label: "Cache Hit" },
      { from: "server", to: "db", color: G, label: "fetch()" },
      { from: "server", to: "cdn", color: C, label: "Static" },
      { from: "db", to: "server", color: O, label: "JSON" },
    ] as const;

    const getPos = (id: (typeof nodes)[number]["id"], w: number, h: number) => {
      const node = nodes.find((n) => n.id === id);
      if (!node) return { x: 0, y: 0 };
      return { x: node.x * w, y: node.y * h };
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (!width || !height) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      // Reset then scale for crisp drawing on high-DPI screens.
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.fillStyle = "#060E1A";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255,153,51,.06)";
      ctx.lineWidth = 0.8;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      edges.forEach((edge, index) => {
        const a = getPos(edge.from, width, height);
        const b = getPos(edge.to, width, height);
        ctx.strokeStyle = `${edge.color}44`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        const speed = 0.008 + index * 0.002;
        const progress = (t * speed + index * 0.18) % 1;
        const px = a.x + (b.x - a.x) * progress;
        const py = a.y + (b.y - a.y) * progress;

        ctx.fillStyle = `${edge.color}cc`;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `${edge.color}22`;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        const lx = (a.x + b.x) / 2 + (b.y - a.y) * 0.12;
        const ly = (a.y + b.y) / 2 + (a.x - b.x) * 0.12;
        ctx.font = "7px JetBrains Mono, monospace";
        ctx.fillStyle = `${edge.color}66`;
        ctx.textAlign = "center";
        ctx.fillText(edge.label, lx, ly);
      });

      nodes.forEach((node, index) => {
        const nx = node.x * width;
        const ny = node.y * height;
        const pulse = 1 + 0.06 * Math.sin(t * 0.07 + index);

        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.size * 2.2 * pulse);
        gradient.addColorStop(0, `${node.color}28`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nx, ny, node.size * 2.2 * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `${node.color}18`;
        ctx.strokeStyle = `${node.color}88`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(nx, ny, node.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = `${node.color}cc`;
        ctx.beginPath();
        ctx.arc(nx, ny, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "bold 9px JetBrains Mono, monospace";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText(node.label, nx, ny + 3);

        ctx.font = "7px JetBrains Mono, monospace";
        ctx.fillStyle = `${node.color}88`;
        ctx.fillText(node.sublabel, nx, ny + node.size * pulse + 12);
      });

      ctx.font = "8px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(255,153,51,.5)";
      ctx.textAlign = "left";
      ctx.fillText(
        "NEXT.JS 16 · EDGE RUNTIME ARCHITECTURE · SERVER COMPONENTS + PPR",
        16,
        height - 14,
      );

      t += 1;
      rafId = window.requestAnimationFrame(draw);
    };

    // Sync draw buffer to rendered CSS size (handles orientation/layout shifts).
    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);
    ro.observe(canvas);

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      ro.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="w-full border-t-2 border-sl-saffron">
      <div className="mx-auto w-full max-w-325 px-5 py-10 md:px-12 lg:py-14">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-2xl">
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          </div>
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
          Fig. 01 - Next.js 16 Edge Runtime Architecture - Server Components + Streaming
        </p>
      </div>
    </section>
  );
}

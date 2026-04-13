"use client";

import { drawPortfolioPreview } from "@/components/views/work-portfolio/workPortfolioPreviewDraw";
import type { PreviewKind } from "@/lib/work-portfolio/types";
import { useEffect, useRef } from "react";

const DEFAULT_H = 160;

type Props = {
  previewType: PreviewKind;
  c1: string;
  c2: string;
  /** Preview height in CSS pixels (work portfolio cards use 160; case studies use 200). */
  height?: number;
};

export function WorkPortfolioPreviewCanvas({ previewType, c1, c2, height = DEFAULT_H }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;
    const dpr = window.devicePixelRatio || 1;
    let t = 0;
    let raf = 0;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rct = parent.getBoundingClientRect();
      canvas.width = rct.width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${rct.width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function frame() {
      const W = canvas.offsetWidth;
      drawPortfolioPreview(ctx, W, height, t, previewType, c1, c2);
      t++;
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [previewType, c1, c2, height]);

  return (
    <canvas
      ref={ref}
      className="card-img block w-full"
      style={{ height }}
      aria-hidden
    />
  );
}

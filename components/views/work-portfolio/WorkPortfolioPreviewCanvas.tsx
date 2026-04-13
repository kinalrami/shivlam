"use client";

import { drawPortfolioPreview } from "@/components/views/work-portfolio/workPortfolioPreviewDraw";
import type { PreviewKind } from "@/lib/work-portfolio/types";
import { useEffect, useRef } from "react";

const H = 160;

type Props = {
  previewType: PreviewKind;
  c1: string;
  c2: string;
};

export function WorkPortfolioPreviewCanvas({ previewType, c1, c2 }: Props) {
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
      canvas.height = H * dpr;
      canvas.style.width = `${rct.width}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function frame() {
      const W = canvas.offsetWidth;
      drawPortfolioPreview(ctx, W, H, t, previewType, c1, c2);
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
  }, [previewType, c1, c2]);

  return <canvas ref={ref} className="card-img block h-[160px] w-full" aria-hidden />;
}

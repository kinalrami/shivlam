"use client";

import { useEffect, useMemo, useRef } from "react";
import { ARBIM_MQ_ITEMS } from "./constants";
import {
  attachHeroArCanvas,
  attachHeroBgParticles,
  attachMidCtaParticles,
  attachProductCanvas,
  attachSpecCanvas,
  attachStackCanvas,
} from "./landingCanvas";
import Hero from "./Hero";
import Marquee from "./Marquee";
import MidCta from "./MidCta";
import Product from "./Product";
import Spec from "./Spec";
import Stack from "./Stack";

export default function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);
  const crRef = useRef<HTMLDivElement>(null);
  const cdRef = useRef<HTMLDivElement>(null);
  const monoProbeRef = useRef<HTMLSpanElement>(null);

  const heroBgRef = useRef<HTMLCanvasElement>(null);
  const heroArRef = useRef<HTMLCanvasElement>(null);
  const productCvRef = useRef<HTMLCanvasElement>(null);
  const midCvRef = useRef<HTMLCanvasElement>(null);
  const specCvRef = useRef<HTMLCanvasElement>(null);
  const stackCvRef = useRef<HTMLCanvasElement>(null);

  const mqTrack = useMemo(
    () => [...ARBIM_MQ_ITEMS, ...ARBIM_MQ_ITEMS, ...ARBIM_MQ_ITEMS],
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    const cr = crRef.current;
    const cd = cdRef.current;
    if (!root || !cr || !cd) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const targets = root.querySelectorAll("a,button,[data-arbim-cursor]");
    const enlarge = () => {
      cr.style.width = "52px";
      cr.style.height = "52px";
      cr.style.borderColor = "var(--orange-400)";
      cr.style.opacity = "0.45";
    };
    const shrink = () => {
      cr.style.width = "30px";
      cr.style.height = "30px";
      cr.style.borderColor =
        "color-mix(in srgb, var(--sl-cyan) 55%, var(--sl-text))";
      cr.style.opacity = "0.55";
    };
    targets.forEach((el) => {
      el.addEventListener("mouseenter", enlarge);
      el.addEventListener("mouseleave", shrink);
    });

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cr.style.left = `${rx}px`;
      cr.style.top = `${ry}px`;
      cd.style.left = `${mx}px`;
      cd.style.top = `${my}px`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", enlarge);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  useEffect(() => {
    const c = heroBgRef.current;
    if (!c) return;
    return attachHeroBgParticles(c);
  }, []);
  useEffect(() => {
    const c = heroArRef.current;
    if (!c) return;
    return attachHeroArCanvas(c);
  }, []);
  useEffect(() => {
    const c = productCvRef.current;
    const probe = monoProbeRef.current;
    if (!c) return;
    const fontStack =
      probe && typeof getComputedStyle !== "undefined"
        ? getComputedStyle(probe).fontFamily
        : "ui-monospace, monospace";
    return attachProductCanvas(c, fontStack);
  }, []);
  useEffect(() => {
    const c = midCvRef.current;
    if (!c) return;
    return attachMidCtaParticles(c);
  }, []);
  useEffect(() => {
    const c = specCvRef.current;
    if (!c) return;
    return attachSpecCanvas(c);
  }, []);
  useEffect(() => {
    const c = stackCvRef.current;
    const probe = monoProbeRef.current;
    if (!c) return;
    const fontStack =
      probe && typeof getComputedStyle !== "undefined"
        ? getComputedStyle(probe).fontFamily
        : "ui-monospace, monospace";
    return attachStackCanvas(c, fontStack);
  }, []);

  return (
    <div
      ref={rootRef}
      className="cursor-none overflow-x-hidden bg-[#060606] font-sans text-[var(--sl-text)] antialiased selection:bg-orange-400/30"
    >
      <span
        ref={monoProbeRef}
        className="font-mono pointer-events-none absolute -left-[9999px] top-0 opacity-0"
        aria-hidden
      >
        probe
      </span>

      <div
        id="arbim-cr"
        ref={crRef}
        className="pointer-events-none fixed z-[9999] size-[30px] rounded-full border-[1.5px] border-[#00d4cc]/55 opacity-55 transition-[width,height,border-color,opacity] duration-150"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        id="arbim-cd"
        ref={cdRef}
        className="pointer-events-none fixed z-[9999] size-[5px] rounded-full bg-orange-400"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      <Hero heroBgRef={heroBgRef} heroArRef={heroArRef} />
      <Marquee items={mqTrack} />
      <Product productCvRef={productCvRef} />
      <MidCta midCvRef={midCvRef} />
      <Spec specCvRef={specCvRef} />
      <Stack stackCvRef={stackCvRef} />
    </div>
  );
}


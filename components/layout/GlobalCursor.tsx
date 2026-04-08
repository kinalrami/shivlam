"use client";

import { useEffect, useRef, useState } from "react";

/** Matches clickable / focusable-looking controls site-wide (incl. `data-arbim-cursor`). */
const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  '[data-arbim-cursor]',
  '[data-site-cursor]',
  '[role="button"]:not([aria-disabled="true"])',
  'input[type="submit"]:not([disabled])',
  'input[type="button"]:not([disabled])',
  'input[type="reset"]:not([disabled])',
  'label[for]',
].join(",");

function isOverInteractive(clientX: number, clientY: number): boolean {
  const el = document.elementFromPoint(clientX, clientY);
  if (!el) return false;
  return el.closest(INTERACTIVE_SELECTOR) != null;
}

export function GlobalCursor() {
  const crRef = useRef<HTMLDivElement>(null);
  const cdRef = useRef<HTMLDivElement>(null);
  const [useCustomCursor, setUseCustomCursor] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setUseCustomCursor(true);
    }
  }, []);

  useEffect(() => {
    if (!useCustomCursor) return;

    const cr = crRef.current;
    const cd = cdRef.current;
    if (!cr || !cd) return;

    document.body.classList.add("cursor-none");

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

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

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (isOverInteractive(mx, my)) enlarge();
      else shrink();
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cr.style.left = `${rx}px`;
      cr.style.top = `${ry}px`;
      cd.style.left = `${mx}px`;
      cd.style.top = `${my}px`;
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-none");
    };
  }, [useCustomCursor]);

  if (!useCustomCursor) return null;

  return (
    <>
      <div
        id="global-cr"
        ref={crRef}
        className="pointer-events-none fixed z-9999 size-7.5 rounded-full border-[1.5px] border-[#00d4cc]/55 opacity-55 transition-[width,height,border-color,opacity] duration-150"
        style={{ transform: "translate(-50%, -50%)" }}
        aria-hidden
      />
      <div
        id="global-cd"
        ref={cdRef}
        className="pointer-events-none fixed z-9999 size-1.25 rounded-full bg-orange-400"
        style={{ transform: "translate(-50%, -50%)" }}
        aria-hidden
      />
    </>
  );
}

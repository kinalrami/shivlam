"use client";

import { useEffect, useMemo, useRef } from "react";
import { ARBIM_MQ_ITEMS } from "./constants";
import {
  attachHeroArCanvas,
  attachHeroBgParticles,
  attachMidCtaParticles,
  attachSpecCanvas,
  attachStackCanvas,
} from "./landingCanvas";
import Hero from "./Hero";
import { Marquee } from "@/components/shared/Marquee";
import MidCta from "./MidCta";
import Product from "./Product";
import Spec from "./Spec";
import Stack from "./Stack";
import ContactForm from "@/components/views/home/ContactForm";
import { DeltaArbimInteractivePreview } from "@/components/shared/DeltaArbimInteractivePreview";
import AboutUsBimCanvas from "@/components/views/home/AboutUsBimCanvas";
import {
  AR_BIM_DELTA_PREVIEW_CONTENT,
  AR_BIM_LAYER_TOGGLERS,
  AR_BIM_PAGE_CANVAS_UI,
} from "@/components/views/ar-bim/deltaPreviewArbimContent";

export default function Landing() {
  const monoProbeRef = useRef<HTMLSpanElement>(null);

  const heroBgRef = useRef<HTMLCanvasElement>(null);
  const heroArRef = useRef<HTMLCanvasElement>(null);
  const midCvRef = useRef<HTMLCanvasElement>(null);
  const specCvRef = useRef<HTMLCanvasElement>(null);
  const stackCvRef = useRef<HTMLCanvasElement>(null);

  const mqTrack = useMemo(
    () => [...ARBIM_MQ_ITEMS, ...ARBIM_MQ_ITEMS, ...ARBIM_MQ_ITEMS],
    [],
  );

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
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <span
        ref={monoProbeRef}
        className="font-mono pointer-events-none absolute -left-2499.75 top-0 opacity-0"
        aria-hidden
      >
        probe
      </span>

      <Hero heroBgRef={heroBgRef} heroArRef={heroArRef} />
      <Marquee items={mqTrack} repeat={1} />
      <Product />
      <MidCta midCvRef={midCvRef} />
      <Spec specCvRef={specCvRef} />
      <section
        id="arbim-delta-live"
        className="scroll-mt-14 pt-9"
      >
        <div className="mx-auto max-w-325 px-5 md:px-12">
          <DeltaArbimInteractivePreview
            canvas={
              <AboutUsBimCanvas
                ui={AR_BIM_PAGE_CANVAS_UI}
                scenePreset="arbim"
                layerTogglers={AR_BIM_LAYER_TOGGLERS}
              />
            }
            content={AR_BIM_DELTA_PREVIEW_CONTENT}
          />
        </div>
      </section>
      <Stack stackCvRef={stackCvRef} />
      <ContactForm />
    </div>
  );
}


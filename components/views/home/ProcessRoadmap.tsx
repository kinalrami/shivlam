"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type Step = {
  num: string;
  title: string;
  tag: string;
  body: string;
};

const STEPS: Step[] = [
  {
    num: "[ 01 ]",
    title: "Architecture",
    tag: "SYSTEM DESIGN",
    body: "We begin by mapping the structural skeleton — defining system boundaries, service contracts, and data flows before a single line of code is written.",
  },
  {
    num: "[ 02 ]",
    title: "Engineering",
    tag: "BUILD PHASE",
    body: "Component-by-component, the architecture comes to life. Each module is built against a specification, tested in isolation, then integrated with precision.",
  },
  {
    num: "[ 03 ]",
    title: "Iteration",
    tag: "FEEDBACK LOOP",
    body: "Real feedback loops. We compress the test-refine-deploy cycle — shipping incremental updates, measuring impact, and adapting the architecture in real-time.",
  },
  {
    num: "[ 04 ]",
    title: "Deployment",
    tag: "LIVE RELEASE",
    body: "Zero-downtime rollouts with full observability. Every release is gated by automated signals — performance regressions surface before users ever notice.",
  },
];

export default function ProcessRoadmap() {
  const sectionId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const vFillRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const titleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bodyRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [active, setActive] = useState(0);
  const wheelRaf = useRef<number | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const panelHeight = 520;

  const dotPositions = useMemo(() => {
    if (STEPS.length <= 1) return [30];
    return STEPS.map((_, i) => 30 + (i / (STEPS.length - 1)) * (panelHeight - 60));
  }, []);

  useEffect(() => {
    const right = rightRef.current;
    const vFill = vFillRef.current;
    const cursor = cursorRef.current;
    const coords = coordsRef.current;
    const hintEl = hintRef.current;
    if (!right || !vFill || !cursor || !coords) return;

    const rightEl = right;
    const vFillEl = vFill;
    const cursorEl = cursor;
    const coordsEl = coords;

    const GLYPHS = "ABCDEFGHIJKabcdefghijk0123456789!@#%&";

    let typeTimer: number | null = null;
    let activeIndex = -1;

    function setClass(el: HTMLElement | null, base: string, state: "" | "active" | "done") {
      if (!el) return;
      el.className = `${base}${state ? ` ${state}` : ""}`;
    }

    function stopTyping() {
      if (typeTimer) {
        window.clearTimeout(typeTimer);
        typeTimer = null;
      }
    }

    function typeText(el: HTMLElement, text: string, cb?: () => void) {
      stopTyping();
      if (prefersReducedMotion) {
        el.textContent = text;
        cb?.();
        return;
      }
      let i = 0;
      const tick = () => {
        if (i >= text.length) {
          el.innerHTML = `${text}<span class="ta-us" aria-hidden></span>`;
          cb?.();
          return;
        }
        let out = text.slice(0, i);
        for (let j = i; j < Math.min(i + 3, text.length); j++) {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        el.innerHTML = `${out}<span class="ta-us" aria-hidden></span>`;
        i++;
        typeTimer = window.setTimeout(tick, 24 + Math.random() * 18);
      };
      tick();
    }

    function activateStep(i: number) {
      if (i === activeIndex) return;
      activeIndex = i;
      setActive(i);

      STEPS.forEach((s, idx) => {
        const state = idx < i ? "done" : idx === i ? "active" : "";
        const numEl = document.getElementById(`ta-sn-${sectionId}-${idx}`);
        const titleEl = titleRefs.current[idx];
        const bodyEl = bodyRefs.current[idx];
        const tagEl = document.getElementById(`ta-stag-${sectionId}-${idx}`);
        const leftDotEl = document.getElementById(`ta-ld-${sectionId}-${idx}`);

        setClass(numEl, "ta-s-num", state);
        setClass(titleEl, "ta-s-title", state);
        setClass(bodyEl, "ta-s-body", state);
        setClass(tagEl, "ta-s-tag", state);
        setClass(leftDotEl, "ta-left-dot", state);

        if (idx < i) {
          if (titleEl) titleEl.textContent = s.title;
          if (bodyEl) bodyEl.textContent = s.body;
        } else if (idx > i) {
          if (titleEl) titleEl.textContent = "";
          if (bodyEl) bodyEl.innerHTML = "";
        }
      });

      const titleEl = titleRefs.current[i];
      const bodyEl = bodyRefs.current[i];
      if (!titleEl || !bodyEl) return;

      titleEl.textContent = "";
      bodyEl.innerHTML = '<span class="ta-us" aria-hidden style="opacity:0"></span>';

      typeText(titleEl, STEPS[i].title, () => {
        window.setTimeout(() => typeText(bodyEl, STEPS[i].body), 60);
      });
    }

    function onScroll() {
      const scrollTop = rightEl.scrollTop;
      const scrollMax = rightEl.scrollHeight - rightEl.clientHeight;
      const prog = scrollMax > 0 ? Math.min(1, scrollTop / scrollMax) : 0;

      if (hintEl) hintEl.style.opacity = scrollTop > 40 ? "0" : "1";

      const usableH = panelHeight - 60;
      const cursorY = 30 + prog * usableH;
      cursorEl.style.top = `${cursorY}px`;
      coordsEl.textContent = `x:040 y:${String(Math.round(cursorY)).padStart(3, "0")}`;

      vFillEl.style.height = `${Math.max(0, cursorY - 30)}px`;

      const stepIdx = Math.min(STEPS.length - 1, Math.floor(prog * STEPS.length + 0.15));
      activateStep(stepIdx);
    }

    const ro = new ResizeObserver(() => {
      onScroll();
    });

    ro.observe(rightEl);

    rightEl.addEventListener("scroll", onScroll, { passive: true });

    activateStep(0);
    onScroll();

    return () => {
      stopTyping();
      rightEl.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [prefersReducedMotion, sectionId]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      const el = rightRef.current;
      if (!el) return;
      let dy = e.deltaY;
      if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) dy *= 16;
      else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) dy *= el.clientHeight;

      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;

      const top = el.scrollTop;
      const edge = 1;
      const canScrollUp = top > edge;
      const canScrollDown = top < max - edge;

      if (dy < 0 && !canScrollUp) return;
      if (dy > 0 && !canScrollDown) return;

      e.preventDefault();
      if (wheelRaf.current) cancelAnimationFrame(wheelRaf.current);
      wheelRaf.current = requestAnimationFrame(() => {
        el.scrollTop += dy;
      });
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-roadmap-heading"
      className="relative scroll-mt-24 pb-12 md:pb-20"
    >
      <div className="mx-auto max-w-325 px-5 md:px-12">
        <h2 id="process-roadmap-heading" className="sr-only">
          How we work — development timeline
        </h2>

        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="font-mono text-xs font-medium uppercase text-sl-saffron">
            HOW WE WORK
          </p>
          <div className="hidden h-px flex-1 bg-linear-to-r from-transparent via-gray-800 to-transparent sm:block" />
        </div>

        <div className="ta-root">
          <div className="ta-layout">
            <div ref={leftRef} className="ta-left" aria-hidden>
              <div className="ta-v-track" />
              <div ref={vFillRef} className="ta-v-fill" />

              <div ref={cursorRef} className="ta-cursor">
                <div className="ta-c-ring" />
                <div className="ta-c-h" />
                <div className="ta-c-v" />
                <div className="ta-c-od ta-c-od1" />
                <div className="ta-c-od ta-c-od2" />
                <div ref={coordsRef} className="ta-c-coords">
                  x:040 y:030
                </div>
              </div>

              {dotPositions.map((top, i) => (
                <div
                  key={i}
                  id={`ta-ld-${sectionId}-${i}`}
                  className={`ta-left-dot${i === active ? " active" : i < active ? " done" : ""}`}
                  style={{ top }}
                />
              ))}
            </div>

            <div
              ref={rightRef}
              className="ta-right"
              aria-label="Development timeline steps"
              tabIndex={0}
            >
              <div className="ta-steps">
                {STEPS.map((s, i) => (
                  <div key={s.title} className="ta-step-item" id={`ta-si-${sectionId}-${i}`}>
                    <div
                      id={`ta-sn-${sectionId}-${i}`}
                      className={`ta-s-num${i === active ? " active" : i < active ? " done" : ""}`}
                    >
                      {s.num}
                    </div>
                    <div
                      ref={(el) => {
                        titleRefs.current[i] = el;
                      }}
                      className={`ta-s-title${i === active ? " active" : i < active ? " done" : ""}`}
                    >
                      {s.title}
                    </div>
                    <div
                      ref={(el) => {
                        bodyRefs.current[i] = el;
                      }}
                      className={`ta-s-body${i === active ? " active" : i < active ? " done" : ""}`}
                    >
                      {s.body}
                    </div>
                    <div
                      id={`ta-stag-${sectionId}-${i}`}
                      className={`ta-s-tag${i === active ? " active" : i < active ? " done" : ""}`}
                    >
                      {s.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

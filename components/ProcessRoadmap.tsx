"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    title: "Discovery",
    description: "Strategy & Brand Foundation.",
  },
  {
    title: "Architecture",
    description: "Complex logic & Unity/Swift setup.",
  },
  {
    title: "Execution",
    description: "Next.js development & AR integration.",
  },
  {
    title: "Deployment",
    description: "Scaling & Growth.",
  },
] as const;

export default function ProcessRoadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-roadmap-heading"
      className="relative scroll-mt-24 px-12 pb-12 md:pb-20"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.18em] text-sl-saffron">
          How we work
        </p>
        <div className="hidden h-px flex-1 bg-linear-to-r from-transparent via-gray-800 to-transparent sm:block" />
      </div>

      <div className="relative overflow-hidden rounded-lg md:p-5">
        <p className="mb-6 max-w-2xl font-sans text-[0.95rem] font-light leading-relaxed text-gray-400">
          De-risk the project for the client by showing a clear path.
        </p>

        <div className="relative grid grid-cols-[2.5rem_1fr] gap-6 sm:grid-cols-[3rem_1fr] sm:gap-10 lg:gap-14">
          <div className="relative" aria-hidden>
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gray-800" />
            <motion.div
              className="absolute inset-y-0 left-1/2 -ml-[1.5px] w-[3px] rounded-full bg-linear-to-b from-sl-cyan via-sl-cyan-2 to-sl-saffron"
              style={{
                transformOrigin: "top",
                scaleY: reducedMotion ? 1 : scrollYProgress,
                filter: reducedMotion
                  ? undefined
                  : "drop-shadow(0 0 10px rgb(0 212 204 / 0.75)) drop-shadow(0 0 18px rgb(245 138 11 / 0.35))",
              }}
            />
          </div>

          <ol className="relative m-0 list-none space-y-8 pb-1">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative">
                <div className="flex flex-wrap items-baseline gap-3 gap-y-1">
                  <span className="font-mono text-sm font-bold tabular-nums tracking-widest text-sl-saffron">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-xl font-sans text-[0.95rem] font-light leading-relaxed text-gray-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

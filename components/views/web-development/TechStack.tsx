"use client";

import { useEffect, useMemo, useRef } from "react";
import { SectionIntro } from "@/components/shared/section-chrome";
import type { WebDevContent } from "./content";
import { attachWebTechCanvas } from "./techCanvas";

type Props = {
  content: WebDevContent["tech"];
};

const VARIANT_CLASSES: Record<
  WebDevContent["tech"]["groups"][number]["variant"],
  { wrap: string; pill: string }
> = {
  back: {
    wrap: "border-white/8 bg-white/[0.02]",
    pill: "border-white/10 bg-white/[0.03] text-white/45",
  },
  ecom: {
    wrap: "border-orange-400/15 bg-orange-400/[0.06]",
    pill: "border-orange-400/20 bg-orange-400/[0.08] text-orange-400/80",
  },
  front: {
    wrap: "border-cyan-300/15 bg-cyan-300/[0.06]",
    pill: "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200/85",
  },
  cms: {
    wrap: "border-emerald-400/15 bg-emerald-400/[0.06]",
    pill: "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-200/90",
  },
};

export function TechStack({ content }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    return attachWebTechCanvas(c);
  }, []);

  const groups = useMemo(() => content.groups, [content.groups]);

  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 py-12 md:px-12 md:py-20">
        <SectionIntro
          id={content.headingId}
          eyebrow={content.eyebrow}
          eyebrowStyle="dash"
          title={
            <>
              {content.title.before}
              <span className="text-sl-saffron">{content.title.highlight}</span>
              {content.title.after ?? null}
            </>
          }
          lead={content.lead}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-14">
          {/* Left: canvas diagram (missing before) */}
          <div className="rounded-xl border border-orange-400/15 bg-[#0a1b33] overflow-hidden">
            <div className="relative">
              <canvas ref={canvasRef} className="block h-[300px] w-full" />
              <div className="pointer-events-none absolute -bottom-12 left-4 right-4 flex flex-wrap gap-2">
                {["FULL STACK", "SEO OPTIMISED", "SCALABLE ARCH"].map((b) => (
                  <span
                    key={b}
                    className="rounded-sm border border-orange-400/25 bg-orange-400/[0.10] px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-orange-400 uppercase"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: stacks */}
          <div className="flex flex-col gap-4">
            {groups.map((g) => {
              const cls = VARIANT_CLASSES[g.variant];
              return (
                <div
                  key={g.label}
                  className="py-3"
                >
                  <div className="mb-4 border-l-2 border-orange-400 pl-3 font-mono text-[10px] tracking-[0.2em] text-orange-400 uppercase">
                    {g.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className={[
                          "rounded-sm border px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] uppercase",
                          cls.pill,
                        ].join(" ")}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


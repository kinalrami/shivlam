"use client";

import { WorkPortfolioPreviewCanvas } from "@/components/views/work-portfolio/WorkPortfolioPreviewCanvas";
import { CaseStudiesComingOverlay } from "@/components/views/case-studies/CaseStudiesComingOverlay";
import type { CaseStudyCardFull, CaseStudyCardShort } from "@/lib/case-studies/types";

const OutIcon = () => (
  <svg className="size-2" viewBox="0 0 10 10" fill="none" aria-hidden>
    <path
      d="M2 8L8 2M8 2H4M8 2v4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

type PropsFull = {
  variant: "full";
  card: CaseStudyCardFull;
  onNotify: () => void;
};

type PropsFiltered = {
  variant: "filtered";
  card: CaseStudyCardShort;
  onNotify: () => void;
};

export function CaseStudiesPlaceholderCard(props: PropsFull | PropsFiltered) {
  const { onNotify } = props;
  const preview = props.card.preview;

  const overlayLabel =
    props.variant === "full" ? "Case Study Coming Soon" : "Coming Soon";
  const overlaySub = props.variant === "full" ? "Story being written" : "Story being written";

  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/30 hover:shadow-[0_10px_36px_rgb(0_0_0/0.35)]">
      <div className="relative h-[200px] overflow-hidden bg-[#0A1B33]">
        <WorkPortfolioPreviewCanvas
          previewType={preview.type}
          c1={preview.c1}
          c2={preview.c2}
          height={200}
        />
        {props.variant === "full" ? (
          <div
            className="pointer-events-none absolute left-3 top-3 z-[1] rounded px-2 py-0.5 font-mono text-[7px] tracking-[0.1em] uppercase backdrop-blur-md"
            style={props.card.cornerTag.style}
          >
            {props.card.cornerTag.label}
          </div>
        ) : null}
        <CaseStudiesComingOverlay label={overlayLabel} sub={overlaySub} />
      </div>
      <div className="px-5 pb-5 pt-5">
        <div className="mb-2.5 flex flex-wrap items-center gap-2">
          <span className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[7px] tracking-[0.12em] text-white/40 uppercase">
            {props.card.categoryTag}
          </span>
          <span className="rounded border border-orange-400/20 bg-orange-400/10 px-1.5 py-0.5 font-mono text-[7px] tracking-[0.1em] text-orange-300/90 uppercase">
            {props.card.statusTag}
          </span>
        </div>
        <h3 className="mb-2 font-sans text-lg font-bold leading-tight text-white">{props.card.title}</h3>
        <p className="mb-4 text-[13px] leading-relaxed text-white/50">{props.card.teaser}</p>

        {props.variant === "full" ? (
          <div className="mb-4 flex flex-wrap gap-4">
            {props.card.meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-0.5">
                <span className="font-mono text-[7px] tracking-[0.12em] text-white/35 uppercase">{m.label}</span>
                <span className="font-mono text-[9px] tracking-[0.05em] text-white/55">{m.value}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-3.5">
          <div className="flex flex-wrap gap-1.5">
            {props.card.pills.map((p) => (
              <span
                key={p}
                className="rounded border border-white/[0.08] bg-white/[0.06] px-1.5 py-0.5 font-mono text-[7px] tracking-[0.07em] text-white/45 uppercase"
              >
                {p}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onNotify}
            className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.1em] text-orange-400 uppercase transition-opacity hover:opacity-70"
          >
            Notify Me <OutIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";
import { CASE_STUDIES_COMING_BANNER } from "@/lib/case-studies/data";

export function CaseStudiesComingBanner() {
  const b = CASE_STUDIES_COMING_BANNER;
  return (
    <div className="mb-10 flex flex-wrap items-center gap-5 rounded-[10px] border border-orange-400/20 bg-orange-400/[0.06] px-6 py-6 md:px-7">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-orange-400/25 bg-orange-400/10">
        <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M10 2l1.5 4.5H16l-3.7 2.7 1.4 4.3L10 11l-3.7 2.5 1.4-4.3L4 6.5h4.5L10 2z"
            stroke="currentColor"
            className="text-orange-400"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="mb-1 font-sans text-base font-bold text-white">{b.title}</h2>
        <p className="text-[13px] leading-relaxed text-white/55">{b.description}</p>
        <Link
          href={b.linkHref}
          className="mt-2 inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.12em] text-orange-400 uppercase transition-opacity hover:opacity-70"
        >
          {b.linkLabel}
          <svg className="size-2" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path
              d="M2 8L8 2M8 2H4M8 2v4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

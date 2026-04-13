"use client";

import Link from "next/link";
import type { ProjectCardData } from "@/lib/work-portfolio/types";
import { WorkPortfolioPreviewCanvas } from "@/components/views/work-portfolio/WorkPortfolioPreviewCanvas";

function OutLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const internal = href.startsWith("/");
  if (internal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function WorkPortfolioProjectCard({ project }: { project: ProjectCardData }) {
  const { primary, secondary } = project.overlay;

  return (
    <article className="group overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:shadow-[0_14px_48px_rgb(0_0_0/0.35)]">
      <div className="relative h-40 overflow-hidden bg-[#0A1B33]">
        <WorkPortfolioPreviewCanvas
          previewType={project.preview.type}
          c1={project.preview.c1}
          c2={project.preview.c2}
        />
        <div
          className="pointer-events-none absolute left-2.5 top-2.5 rounded px-2 py-0.5 font-mono text-[7px] tracking-[0.1em] uppercase backdrop-blur-md"
          style={project.badge.style}
        >
          {project.badge.label}
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2.5 bg-[rgba(10,27,51,.78)] opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
          <OutLink
            href={primary.href}
            className="rounded px-3.5 py-2 font-mono text-[8px] tracking-[0.09em] text-white uppercase transition-colors bg-orange-400 hover:bg-[#E68A1F]"
          >
            {primary.label}
          </OutLink>
          {secondary ? (
            <OutLink
              href={secondary.href}
              className="rounded border border-white/35 px-3.5 py-2 font-mono text-[8px] tracking-[0.09em] text-white/80 uppercase transition-colors hover:border-orange-400 hover:text-orange-400"
            >
              {secondary.label}
            </OutLink>
          ) : null}
        </div>
      </div>
      <div className="px-4 pb-4 pt-4">
        <h3 className="mb-1.5 font-sans text-[15px] font-bold leading-tight text-white">
          {project.title}
        </h3>
        <p className="mb-3 text-xs leading-relaxed text-white/50">{project.description}</p>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-3">
          <div className="flex flex-wrap gap-1.5">
            {project.pills.map((p) => (
              <span
                key={p}
                className="rounded border border-white/[0.08] bg-white/[0.06] px-1.5 py-0.5 font-mono text-[7px] tracking-[0.07em] text-white/45 uppercase"
              >
                {p}
              </span>
            ))}
          </div>
          {project.footerLink ? (
            <OutLink
              href={project.footerLink.href}
              className="inline-flex shrink-0 items-center gap-1 font-mono text-[8px] tracking-[0.1em] text-orange-400 uppercase"
            >
              {project.footerLink.label}
              <svg className="size-2" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path
                  d="M2 8L8 2M8 2H4M8 2v4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </OutLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}

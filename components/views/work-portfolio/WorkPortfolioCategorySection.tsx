import type { PortfolioSectionData } from "@/lib/work-portfolio/types";
import { WorkPortfolioProjectCard } from "@/components/views/work-portfolio/WorkPortfolioProjectCard";

export function WorkPortfolioCategorySection({
  section,
  visible,
}: {
  section: PortfolioSectionData;
  visible: boolean;
}) {
  return (
    <section
      id={section.sectionId}
      data-cat={section.cat}
      className={`mb-16 scroll-mt-28 md:mb-[72px] ${visible ? "" : "hidden"}`}
      aria-label={section.title}
    >
      <div className="mb-2.5 flex items-center gap-3.5">
        <span className={`font-mono text-[9px] tracking-[0.2em] uppercase ${section.titleClassName}`}>
          {section.title}
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 font-mono text-[8px] ${section.countClassName}`}
        >
          {section.countLabel}
        </span>
        <div className={`h-px min-w-[40px] flex-1 ${section.lineClassName}`} />
      </div>
      <p className="mb-7 max-w-xl text-[13px] leading-relaxed text-white/48">{section.description}</p>

      {section.subcategories.map((sub, idx) => (
        <div key={sub.label || `${section.cat}-${idx}`} className={idx > 0 ? "mt-7" : ""}>
          {sub.label ? (
            <div className="mb-3.5 border-l-2 border-white/[0.12] pl-2.5 font-mono text-[8px] tracking-[0.15em] text-white/35 uppercase">
              {sub.label}
            </div>
          ) : null}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sub.projects.map((p) => (
              <WorkPortfolioProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

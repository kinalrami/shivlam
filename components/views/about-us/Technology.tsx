import { SectionIntro } from "@/components/shared/section-chrome";
import { SECTION_SHELL, TECH } from "./constants";

export function Technology() {
  return (
    <section
        id="about-technology"
        aria-labelledby="tech-heading"
        className="bg-[#060606] pb-12 md:pb-20"
      >
        {/* Technology */}
        <div className={SECTION_SHELL}>
          <div data-about-reveal className="mb-8">
            <SectionIntro
              id="tech-heading"
              eyebrow="What we build with"
              title={(
                <>
                  The technology <span className="text-sl-saffron">stack</span>
                  <br />
                  powering DeltaARBIM.
                </>
              )}
              lead="LiDAR-class spatial tracking, open BIM ingestion, native mobile AR runtimes, and site-wide sync — composed as one field-ready product surface."
              fullWidth
              className="mb-0"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TECH.map((t, i) => (
              <article
                key={t.name}
                data-about-reveal
                data-arbim-cursor
                data-about-delay={String(Math.min(i + 1, 4))}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-center transition-[border-color,transform] hover:-translate-y-1 hover:border-sl-saffron/30"
              >
                <span className="mb-3.5 block text-[1.75rem]" aria-hidden>
                  {t.icon}
                </span>
                <h3 className="mb-2 font-sans text-sm font-bold text-white">
                  {t.name}
                </h3>
                <p className="text-xs leading-relaxed text-white/50">{t.desc}</p>
                <span className="mt-3 inline-block rounded-sm border border-sl-saffron/22 px-1.5 py-0.5 font-mono text-[7.5px] tracking-[0.14em] text-sl-saffron uppercase">
                  {t.tag}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}

import { SectionIntro } from "@/components/shared/section-chrome";
import type { WebDevContent } from "./content";

type Props = {
  content: WebDevContent["ethos"];
};

export function Ethos({ content }: Props) {
  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 pb-12 md:px-12 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="rounded-2xl border border-orange-400/12 bg-linear-to-br from-orange-400/[0.06] via-white/[0.02] to-transparent p-6">
            <div className="rounded-xl border border-white/8 bg-[#0a0a0a] p-6">
              <div className="mb-4 font-mono text-[10px] tracking-[0.14em] text-orange-400/80 uppercase">
                Craft · Reliability · Long-term Support
              </div>
              <div className="grid gap-3">
                {content.stats.map((s) => (
                  <div
                    key={`${s.value}-${s.label}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-white/6 bg-white/[0.02] px-4 py-3"
                  >
                    <span className="font-mono text-[10px] tracking-[0.14em] text-white/35 uppercase">
                      {s.label}
                    </span>
                    <span className="font-sans text-lg font-bold text-orange-400">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-white/6 bg-white/[0.02] p-4">
                <div className="font-mono text-[10px] tracking-[0.14em] text-white/35 uppercase">
                  Principle
                </div>
                <div className="mt-2 text-sm leading-relaxed font-light text-white/45">
                  Build clean. Ship reliably. Support long-term.
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionIntro
              id={content.headingId}
              eyebrow={content.eyebrow}
              title={
                <>
                  {content.title.before}
                  <span className="text-sl-saffron">{content.title.highlight}</span>
                  {content.title.after ?? null}
                </>
              }
              lead={content.lead}
            />

            <blockquote className="mt-6 border-l-2 border-orange-400 pl-5 font-sans text-sm leading-relaxed text-white/50 italic">
              {content.quote}
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={content.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border-[1.5px] border-white/15 bg-transparent px-7 py-3 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
              >
                {content.primaryCta.label}
              </a>
              <a
                href={content.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border-[1.5px] border-white/15 bg-transparent px-7 py-3 text-[13px] font-medium tracking-[0.07em] text-white/65 uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
              >
                {content.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


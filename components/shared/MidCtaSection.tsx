"use client";

type Props = {
  sectionId: string;
  content: {
    titleBefore: string;
    titleHighlight: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
};

export function MidCtaSection({ sectionId, content }: Props) {
  const pExternal = content.primaryCta.href.startsWith("http");
  const sExternal = content.secondaryCta.href.startsWith("http");

  return (
    <section id={sectionId} className="relative overflow-hidden bg-[#060606] scroll-mt-14">
      <div className="relative mx-auto max-w-325 px-5 md:px-12">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-12">
          <div className="min-w-0">
            <div className="font-sans text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-tight tracking-tight text-white">
              {content.titleBefore}
              <br />
              <span className="text-orange-400">{content.titleHighlight}</span>
            </div>
            <p className="mt-4 max-w-[520px] text-sm leading-relaxed font-medium text-gray-400 md:text-base">
              {content.lead}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={content.primaryCta.href}
              target={pExternal ? "_blank" : undefined}
              rel={pExternal ? "noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-md bg-orange-400 px-8 py-3.5 font-mono text-[12px] font-semibold tracking-[0.12em] text-white uppercase shadow-[0_0_28px_rgb(245_138_11/0.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgb(245_138_11/0.55)]"
            >
              {content.primaryCta.label}
            </a>
            <a
              href={content.secondaryCta.href}
              target={sExternal ? "_blank" : undefined}
              rel={sExternal ? "noreferrer" : undefined}
              className="inline-flex items-center w-full justify-center rounded-md border border-white/30 bg-transparent px-8 py-3.5 font-mono text-[12px] font-semibold tracking-[0.12em] text-white uppercase transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/50 hover:text-orange-400"
            >
              {content.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


import { MidBannerCta } from "@/components/shared/MidBannerCta";
import { RevealGroup } from "@/components/views/about-us/RevealGroup";

type Props = {
  content: {
    titleBefore: string;
    titleHighlight: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    microcopy: string;
  };
};

export function MidCta({ content }: Props) {
  return (
    <>
      <RevealGroup />
      <MidBannerCta
        sectionId="web-mid-cta"
        reveal="about"
        badge="START YOUR PROJECT"
        title={
          <>
            {content.titleBefore}
            <br />
            <span className="text-orange-400">{content.titleHighlight}</span>
          </>
        }
        body={
          <>
            {content.lead}

          </>
        }
        actions={
          <div className="flex w-full flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={content.primaryCta.href}
                target={content.primaryCta.href.startsWith("http") ? "_blank" : undefined}
                rel={content.primaryCta.href.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-md border border-orange-400 bg-orange-400 px-7 py-3.5 font-mono text-[12px] font-semibold tracking-[0.12em] text-white uppercase shadow-[0_0_28px_rgb(245_138_11/0.4)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgb(245_138_11/0.55)]"
              >
                {content.primaryCta.label}
              </a>
              <a
                href={content.secondaryCta.href}
                className="rounded-md border border-white/15 bg-transparent px-7 py-3.5 font-mono text-[12px] font-semibold tracking-[0.12em] text-white/65 uppercase transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-orange-400/60 hover:text-orange-400"
              >
                {content.secondaryCta.label}
              </a>
            </div>
            <div className="mt-5 font-mono text-[11px] text-orange-400/70">
              {content.microcopy}
            </div>
          </div>
        }
      />
    </>
  );
}


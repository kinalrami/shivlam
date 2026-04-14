import { SectionIntro } from "@/components/shared/section-chrome";

export type MoreServicesContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  title: { before: string; highlight: string; after?: string };
  lead: string;
  items: readonly { tag: string; title: string; desc: string; href: string }[];
};

type Props = { content: MoreServicesContent };

export function MoreServices({ content }: Props) {
  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 pb-8 md:px-12">
        <SectionIntro
          id={content.headingId}
          align="center"
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((it) => (
            <a
              key={it.title}
              href={it.href}
              target={it.href.startsWith("http") ? "_blank" : undefined}
              rel={it.href.startsWith("http") ? "noreferrer" : undefined}
              className="block rounded-xl border border-white/7 bg-white/[0.02] p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange-400/25"
            >
              <div className="font-mono text-[10px] tracking-[0.15em] text-orange-400 uppercase">
                {it.tag}
              </div>
              <div className="mt-2 font-sans text-base font-bold text-white">
                {it.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed font-light text-white/45">
                {it.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


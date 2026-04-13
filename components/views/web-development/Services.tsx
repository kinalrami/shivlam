import { SectionIntro } from "@/components/shared/section-chrome";
import type { WebDevContent } from "./content";
import Image from "next/image";

type Props = {
  content: WebDevContent["services"];
};

export function Services({ content }: Props) {
  const iconSrcFor = (tag: string) => {
    switch (tag.toUpperCase()) {
      case "BACKEND":
        return "/web-development-icons/laravel.svg";
      case "CMS":
        return "/web-development-icons/wordpress.svg";
      case "ECOMMERCE":
        return "/web-development-icons/ecommerce.svg";
      case "FRONTEND":
        return "/web-development-icons/frontend.svg";
      case "DESIGN":
        return "/web-development-icons/design.svg";
      case "SUPPORT":
        return "/web-development-icons/maintenance.svg";
      default:
        return "/web-development-icons/laravel.svg";
    }
  };

  const iconWrapFor = (tag: string) => {
    const t = tag.toUpperCase();
    if (t === "CMS" || t === "FRONTEND" || t === "SUPPORT") {
      return "border-cyan-300/20";
    }
    return "border-orange-400/20";
  };

  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 pb-12 md:px-12">
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-xl border border-white/6 bg-white/[0.02] p-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-orange-400/30 hover:shadow-[0_18px_55px_rgb(0_0_0/0.45)]"
            >
              {/* Hover outline */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-orange-400/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden
              />

              <div className="mb-4 flex items-start justify-between gap-3">
                <div
                  className={[
                    "inline-flex size-12 items-center justify-center rounded-xl border",
                    iconWrapFor(card.tag),
                  ].join(" ")}
                >
                  <Image
                    src={iconSrcFor(card.tag)}
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
                <span className="rounded-sm border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[9px] tracking-[0.15em] text-white/35 uppercase transition-colors duration-200 group-hover:border-orange-400/25 group-hover:text-orange-400/80">
                  {card.tag}
                </span>
              </div>

              <h3 className="font-sans text-lg font-bold tracking-tight text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed font-light text-white/45">{card.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {card.pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-sm border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[9px] tracking-[0.08em] text-white/40 uppercase transition-colors duration-200 group-hover:border-orange-400/20 group-hover:bg-orange-400/[0.08] group-hover:text-orange-400/80"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


import type { WebDevContent } from "./content";
import type { ServicesGridSectionContent } from "@/components/shared/ServicesGridSection";
import { ServicesGridSection } from "@/components/shared/ServicesGridSection";

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

  const accentFor = (tag: string) => {
    const t = tag.toUpperCase();
    if (t === "CMS" || t === "FRONTEND" || t === "SUPPORT") return "cyan" as const;
    return "orange" as const;
  };

  const gridContent: ServicesGridSectionContent = {
    sectionId: content.sectionId,
    headingId: content.headingId,
    eyebrow: content.eyebrow,
    title: content.title,
    lead: content.lead,
    cards: content.cards.map((c) => ({
      key: c.title,
      tag: c.tag,
      title: c.title,
      desc: c.desc,
      pills: c.pills,
      accent: accentFor(c.tag),
      icon: { kind: "image", src: iconSrcFor(c.tag) },
    })),
  };

  return <ServicesGridSection content={gridContent} />;
}


"use client";

import { Shield, Smartphone, Boxes, Search, Zap, Users, type LucideIcon } from "lucide-react";
import { NumberedCardsGrid } from "@/components/shared/NumberedCardsGrid";
import { SectionIntro } from "@/components/shared/section-chrome";
import type { AdvantageIconKey, MobileServiceContent } from "./content";

const ICONS: Record<AdvantageIconKey, LucideIcon> = {
  shield: Shield,
  smartphone: Smartphone,
  boxes: Boxes,
  search: Search,
  zap: Zap,
  users: Users,
};

type Props = {
  content: MobileServiceContent;
};

export function Advantages({ content }: Props) {
  const { advantages: a } = content;

  return (
    <section id={a.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 pb-12 md:pb-20 md:px-12">
        <SectionIntro
          id={a.headingId}
          eyebrow={a.eyebrow}
          eyebrowStyle="dash"
          title={
            <>
              {a.titleLine1}
              <br />
              <span className="text-sl-saffron">{a.titleHighlight}</span>
            </>
          }
          lead={a.lead}
        />

        <div className="mt-14">
          <NumberedCardsGrid
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            items={a.items.map(({ num, title, desc, tag, icon }) => {
              const Icon = ICONS[icon];
              return {
                num,
                title,
                desc,
                tag,
                icon: <Icon className="size-6 text-orange-400" aria-hidden />,
              };
            })}
          />
        </div>
      </div>
    </section>
  );
}

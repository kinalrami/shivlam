import { SectionIntro } from "@/components/shared/section-chrome";

export type ClientsStripContent = {
  sectionId: string;
  headingId: string;
  eyebrow: string;
  title: { before: string; highlight: string; after?: string };
  lead: string;
  line: string;
};

type Props = { content: ClientsStripContent };

function splitLine(line: string) {
  return line
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ClientsStrip({ content }: Props) {
  const items = splitLine(content.line);
  const track = [...items, ...items];

  return (
    <section id={content.sectionId} className="bg-[#060606] scroll-mt-14">
      <div className="mx-auto max-w-325 px-5 pb-12 md:px-12 md:pb-20">
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

        <div className="mt-8 overflow-hidden rounded-xl border border-white/6 bg-white/[0.02]">
          <div className="flex w-max animate-[arbim-dev-marquee_28s_linear_infinite] py-4">
            {track.map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="whitespace-nowrap px-6 font-mono text-[11px] tracking-[0.14em] text-white/30"
              >
                <span className="cname">{t}</span>
                <span className="csep text-orange-400/50"> {" · "}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


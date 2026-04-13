import type { WebDevContent } from "./content";
import { WhyHire } from "@/components/shared/WhyHire";
import type { WhyHireSectionContent } from "@/components/views/mobile-app-development/content";

type Props = {
  content: WebDevContent["why"];
};

export function WhyUs({ content }: Props) {
  const why: WhyHireSectionContent = {
    sectionId: content.sectionId,
    eyebrow: content.eyebrow,
    titleLine1: content.title.before.trim(),
    titleLine2: content.title.after?.trim() ?? "",
    titleHighlight: content.title.highlight,
    description: content.lead,
    primaryCta: content.primaryCta,
    secondaryCta: content.secondaryCta,
    codeFilename: "web/app.tsx",
    codeLangLabel: "Next.js",
    phoneChip1: "✓ SEO-First",
    phoneChip2: "⬡ Scalable",
    phoneChip3: "◎ Fast Build",
    stats: content.stats.map((s) => ({ val: s.value, lbl: s.label })),
    cards: [
      { icon: "check", accent: "orange", title: content.cards[0]?.title ?? "On-Time Delivery", desc: content.cards[0]?.desc ?? "" },
      { icon: "clock", accent: "cyan", title: content.cards[1]?.title ?? "SEO-First Build", desc: content.cards[1]?.desc ?? "" },
      { icon: "home", accent: "orange", title: content.cards[2]?.title ?? "Scalable Codebase", desc: content.cards[2]?.desc ?? "" },
      { icon: "briefcase", accent: "cyan", title: content.cards[3]?.title ?? "No Middlemen", desc: content.cards[3]?.desc ?? "" },
    ],
  };

  return (
    <WhyHire
      serviceKey="iphone"
      why={why}
      showPhoneCanvas={false}
      showBottomStats={true}
      editorVariant="web"
      webEditorSnippets={[
        {
          lang: "PHP 8",
          tab1: "routes/web.php",
          tab2: "HomeController.php",
          tab3: "index.jsx",
          statusText: "Laravel 11 · PHP 8.3",
          rightText: "localhost:8000",
          statusDot: "rgba(34,197,94,1)",
          terminalTop: "$ php artisan serve",
          terminalLine1: "INFO  Server running on http://localhost:8000",
          terminalLine2: "✓ Routes cached (0.8ms)",
          codeHtmlLines: [
            `<span style="color:#c792ea">Route</span>::<span style="color:#82aaff">get</span>(<span style="color:#c3e88d">'/'</span>, fn()=>`,
            `  <span style="color:#82aaff">view</span>(<span style="color:#c3e88d">'home'</span>, [`,
            `    <span style="color:#c3e88d">'title'</span> => <span style="color:#c3e88d">'Web Dev'</span>,`,
            `    <span style="color:#c3e88d">'services'</span> => <span style="color:#ffcb6b">Service</span>::<span style="color:#82aaff">all</span>(),`,
            `  ])`,
            `);`,
            ``,
            `<span style="color:#c792ea">Route</span>::<span style="color:#82aaff">resource</span>(<span style="color:#c3e88d">'projects'</span>,`,
            `  <span style="color:#ffcb6b">ProjectController</span>::<span style="color:#c792ea">class</span>`,
            `)-><span style="color:#82aaff">middleware</span>(<span style="color:#c3e88d">'auth'</span>);`,
          ],
        },
        {
          lang: "JSX",
          tab1: "HomePage.jsx",
          tab2: "api/projects.js",
          tab3: "tailwind.config.js",
          statusText: "Next.js 14 · React 18",
          rightText: "localhost:3000",
          statusDot: "rgba(29,207,207,1)",
          terminalTop: "$ npm run dev",
          terminalLine1: "✓ Ready in 1.2s — http://localhost:3000",
          terminalLine2: "✓ 3/3 pages optimised (SSR)",
          codeHtmlLines: [
            `<span style="color:#c792ea">export default function</span> <span style="color:#82aaff">HomePage</span>() {`,
            `  <span style="color:#c792ea">const</span> { data } = <span style="color:#82aaff">useSWR</span>(<span style="color:#c3e88d">'/api'</span>)`,
            `  <span style="color:#c792ea">return</span> (`,
            `    <span style="color:#FF9933">&lt;main</span> <span style="color:#1DCFCF">className</span>=<span style="color:#c3e88d">"hero"</span><span style="color:#FF9933">&gt;</span>`,
            `      <span style="color:#FF9933">&lt;h1</span> <span style="color:#1DCFCF">className</span>=<span style="color:#c3e88d">"text-5xl"</span><span style="color:#FF9933">&gt;</span>`,
            `        {data?.title}`,
            `      <span style="color:#FF9933">&lt;/h1&gt;</span>`,
            `      <span style="color:#FF9933">&lt;</span><span style="color:#ffcb6b">ServiceGrid</span> <span style="color:#1DCFCF">data</span>={data} <span style="color:#FF9933">/&gt;</span>`,
            `    <span style="color:#FF9933">&lt;/main&gt;</span>`,
            `  )`,
            `}`,
          ],
        },
      ]}
    />
  );
}


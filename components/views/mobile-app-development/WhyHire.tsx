import type { MobileServiceContent } from "./content";
import { WhyHire as SharedWhyHire, type WebEditorSnippet } from "@/components/shared/WhyHire";
import { WHY_CODE_LINES_BY_SERVICE } from "./whyCodeLines";

type Props = {
  serviceKey: "iphone" | "android" | "flutter";
  content: MobileServiceContent;
};

const FLUTTER_REF_EDITOR_SNIPPETS: readonly WebEditorSnippet[] = [
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
      `<span style="color:#c792ea">Route</span>::<span style="color:#82aaff">get</span>(<span style="color:#c3e88d">'/'</span>, <span style="color:#c792ea">fn</span>()=&gt;`,
      `  <span style="color:#82aaff">view</span>(<span style="color:#c3e88d">'home'</span>, [`,
      `    <span style="color:#c3e88d">'title'</span> =&gt; <span style="color:#c3e88d">'Web Dev'</span>,`,
      `    <span style="color:#c3e88d">'services'</span> =&gt; <span style="color:#ffcb6b">Service</span>::<span style="color:#82aaff">all</span>(),`,
      `  ]),`,
      `);`,
      ``,
      `<span style="color:#c792ea">Route</span>::<span style="color:#82aaff">resource</span>(<span style="color:#c3e88d">'projects'</span>,`,
      `  <span style="color:#ffcb6b">ProjectController</span>::<span style="color:#c792ea">class</span>`,
      `)-&gt;<span style="color:#82aaff">middleware</span>(<span style="color:#c3e88d">'auth'</span>);`,
    ],
  },
  {
    lang: "Liquid",
    tab1: "sections/hero.liquid",
    tab2: "assets/theme.js",
    tab3: "config/settings.json",
    statusText: "Shopify · Liquid",
    rightText: "preview.shopify.com",
    statusDot: "rgba(34,197,94,1)",
    terminalTop: "$ theme upload",
    terminalLine1: "✓ Theme uploaded — preview ready",
    terminalLine2: "✓ Cart AJAX · 2.1s load time",
    codeHtmlLines: [
      `<span style="color:#8be9fd">{%</span> <span style="color:#c792ea">comment</span> <span style="color:#c3e88d">%}</span><span style="color:#6a737d">Hero Section</span><span style="color:#8be9fd">{%</span> <span style="color:#c792ea">endcomment</span> <span style="color:#c3e88d">%}</span>`,
      `<span style="color:#ff9933">&lt;section</span> <span style="color:#1DCFCF">class</span>=<span style="color:#c3e88d">"hero"</span><span style="color:#ff9933">&gt;</span>`,
      `  <span style="color:#ff9933">&lt;h1&gt;</span><span style="color:#8be9fd">{{</span> <span style="color:#82aaff">section.settings.title</span> <span style="color:#8be9fd">}}</span><span style="color:#ff9933">&lt;/h1&gt;</span>`,
      `  <span style="color:#8be9fd">{%</span> <span style="color:#c792ea">if</span> <span style="color:#82aaff">section.settings.show_btn</span> <span style="color:#c3e88d">%}</span>`,
      `    <span style="color:#ff9933">&lt;a</span> <span style="color:#1DCFCF">href</span>=<span style="color:#c3e88d">"</span><span style="color:#8be9fd">{{</span> <span style="color:#82aaff">shop.url</span> <span style="color:#8be9fd">}}</span><span style="color:#c3e88d">"</span><span style="color:#ff9933">&gt;</span>`,
      `      <span style="color:#8be9fd">{{</span> <span style="color:#82aaff">section.settings.btn_text</span> <span style="color:#8be9fd">}}</span>`,
      `    <span style="color:#ff9933">&lt;/a&gt;</span>`,
      `  <span style="color:#8be9fd">{%</span> <span style="color:#c792ea">endif</span> <span style="color:#c3e88d">%}</span>`,
      `<span style="color:#ff9933">&lt;/section&gt;</span>`,
      ``,
      `<span style="color:#8be9fd">{%</span> <span style="color:#c792ea">schema</span> <span style="color:#c3e88d">%}</span><span style="color:#8be9fd">{</span><span style="color:#c3e88d">"name"</span>:<span style="color:#c3e88d">"Hero"</span><span style="color:#8be9fd">}</span><span style="color:#8be9fd">{%</span> <span style="color:#c792ea">endschema</span> <span style="color:#c3e88d">%}</span>`,
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
];

export function WhyHire({ serviceKey, content }: Props) {
  return (
    <SharedWhyHire
      serviceKey={serviceKey}
      why={content.whyHire}
      codeLines={WHY_CODE_LINES_BY_SERVICE[serviceKey]}
      editorVariant={serviceKey === "flutter" ? "web" : "mobile"}
      webEditorSnippets={serviceKey === "flutter" ? FLUTTER_REF_EDITOR_SNIPPETS : undefined}
      showPhoneCanvas={serviceKey === "flutter" ? false : true}
      showBottomStats={serviceKey === "flutter" ? false : true}
    />
  );
}

import type {
  InsightFilterOption,
  InsightPost,
} from "@/lib/insights-types";

export const INSIGHTS_NOW = new Date("2026-04-03T12:00:00");

export const HOME_INSIGHT_POSTS: readonly InsightPost[] = [
  {
    id: "POST-001",
    cat: "STRATEGY",
    catKey: "strategy",
    catStyle: "amber",
    title: "Scaling Complex Web Ecosystems with Next.js 16.",
    date: "2026-04-02",
    dateLabel: "02 APR 2026",
    read: "6 min read",
    excerpt:
      "Modern web ecosystems demand more than a framework — they demand an architecture. Next.js 16 changes the rules on server components, streaming, and edge-first delivery.",
    code: {
      lines: [
        { type: "kw", text: "export async" },
        { type: "plain", text: " function " },
        { type: "fn", text: "getStaticProps" },
        { type: "plain", text: "() {" },
        { type: "cm", text: "  // SSG — runs at build time" },
        { type: "kw", text: "  const" },
        { type: "plain", text: " data = await fetchEdge()" },
      ],
    },
    color: "#f58a0b",
    svgType: "circuit",
  },
  {
    id: "POST-002",
    cat: "IMMERSIVE",
    catKey: "immersive",
    catStyle: "cyan",
    title: "The Future of On-site Construction: AR & BIM Integration.",
    date: "2026-03-28",
    dateLabel: "28 MAR 2026",
    read: "8 min read",
    excerpt:
      "Overlaying 4D BIM data onto a live construction site via LiDAR and ARKit is no longer a research paper — it is production software. Here is how we built it.",
    code: {
      lines: [
        { type: "fn", text: "ARSession" },
        { type: "plain", text: ".run(config: " },
        { type: "kw", text: "BIMConfig" },
        { type: "plain", text: "())" },
        { type: "cm", text: "  // LiDAR mesh + BIM overlay" },
        { type: "fn", text: "renderBlueprintLayer" },
        { type: "plain", text: "(mesh)" },
      ],
    },
    color: "#1dcfcf",
    svgType: "blueprint",
  },
  {
    id: "POST-003",
    cat: "IDENTITY",
    catKey: "identity",
    catStyle: "purple",
    title: "Why Brand Building is the Hardest Code to Crack in 2026.",
    date: "2026-03-15",
    dateLabel: "15 MAR 2026",
    read: "5 min read",
    excerpt:
      "A brand is a distributed system. It has states, transitions, and failure modes just like any codebase. Most agencies debug symptoms; we debug the architecture.",
    code: {
      lines: [
        { type: "kw", text: "interface" },
        { type: "plain", text: " " },
        { type: "fn", text: "BrandSystem" },
        { type: "plain", text: " {" },
        { type: "plain", text: "  identity: " },
        { type: "kw", text: "DesignToken" },
        { type: "plain", text: "[]" },
        { type: "plain", text: "  voice: " },
        { type: "fn", text: "ToneMap" },
      ],
    },
    color: "#aaaaee",
    svgType: "pulse",
  },
];

export const BLOG_INSIGHT_POSTS: readonly InsightPost[] = [
  ...HOME_INSIGHT_POSTS,
  {
    id: "POST-004",
    cat: "ENGINEERING",
    catKey: "engineering",
    catStyle: "green",
    title: "Swift Concurrency in Production: async/await Patterns That Actually Work.",
    date: "2026-03-08",
    dateLabel: "08 MAR 2026",
    read: "7 min read",
    excerpt:
      "Swift actors and structured concurrency are not just syntax sugar — they fundamentally change how you reason about state in iOS apps. Here is what six months in production taught us.",
    code: {
      lines: [
        { type: "kw", text: "actor" },
        { type: "plain", text: " " },
        { type: "fn", text: "DataStore" },
        { type: "plain", text: " {" },
        { type: "cm", text: "  // isolated mutable state" },
        { type: "kw", text: "  func" },
        { type: "plain", text: " " },
        { type: "fn", text: "merge" },
        { type: "plain", text: "(_ patch: Patch) async" },
      ],
    },
    color: "#22c55e",
    svgType: "circuit",
  },
  {
    id: "POST-005",
    cat: "IMMERSIVE",
    catKey: "immersive",
    catStyle: "cyan",
    title: "Unity Game Architecture: Separating Logic from Presentation at Scale.",
    date: "2026-03-01",
    dateLabel: "01 MAR 2026",
    read: "9 min read",
    excerpt:
      "When your Unity game grows past 50k lines, architecture is survival. Command pattern, service locators, and ScriptableObject-driven state — the patterns that kept CosmoStrike maintainable.",
    code: {
      lines: [
        { type: "kw", text: "public class" },
        { type: "plain", text: " " },
        { type: "fn", text: "GameManager" },
        { type: "plain", text: " : " },
        { type: "fn", text: "MonoBehaviour" },
        { type: "plain", text: " {" },
        { type: "cm", text: "  // composition root" },
      ],
    },
    color: "#1dcfcf",
    svgType: "blueprint",
  },
  {
    id: "POST-006",
    cat: "STRATEGY",
    catKey: "strategy",
    catStyle: "amber",
    title: "GEO: How to Make Your Brand Visible to AI Search Engines in 2026.",
    date: "2026-02-22",
    dateLabel: "22 FEB 2026",
    read: "6 min read",
    excerpt:
      "ChatGPT, Gemini, and Perplexity are replacing the first page of Google for millions of queries. GEO is the new SEO — here is the strategic framework we use for every client brand.",
    code: {
      lines: [
        { type: "cm", text: "// Generative Engine Optimization" },
        { type: "kw", text: "const" },
        { type: "plain", text: " " },
        { type: "fn", text: "citations" },
        { type: "plain", text: " = await " },
        { type: "fn", text: "fetchBrandSignals" },
        { type: "plain", text: "()" },
      ],
    },
    color: "#f58a0b",
    svgType: "pulse",
  },
];

export const HOME_INSIGHT_FILTERS: readonly InsightFilterOption[] = [
  { key: "all", label: "[ ALL ]" },
  { key: "strategy", label: "STRATEGY" },
  { key: "immersive", label: "IMMERSIVE" },
  { key: "identity", label: "IDENTITY" },
];

export const BLOG_INSIGHT_FILTERS: readonly InsightFilterOption[] = [
  ...HOME_INSIGHT_FILTERS,
  { key: "engineering", label: "ENGINEERING" },
];

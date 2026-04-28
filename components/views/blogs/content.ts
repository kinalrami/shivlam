import { BLOG_INSIGHT_POSTS, INSIGHTS_NOW } from "@/lib/insights-data";
import type { InsightPost } from "@/lib/insights-types";

export type BlogPost = InsightPost & {
  slug: string;
  publisher: string;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-|-$)/g, "");
}

export const BLOG_POSTS: readonly BlogPost[] = BLOG_INSIGHT_POSTS.map((p) => ({
  ...p,
  slug: slugify(p.title),
  publisher: "Shivlam",
}));

export { INSIGHTS_NOW };

export type BlogPostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; emphasis?: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "callout"; label: string; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "hr" };

export type BlogPostDetailContent = {
  lead: string;
  blocks: readonly BlogPostBlock[];
  tags: readonly string[];
  author: {
    name: string;
    role: string;
    bio: string;
    email: string;
  };
};

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

const BLOG_POST_DETAIL_BY_SLUG: Record<string, BlogPostDetailContent> = {
  "scaling-complex-web-ecosystems-with-next-js-16": {
    lead:
      "Modern web ecosystems demand more than a framework — they demand an architecture. Next.js 16 changes the rules on server components, streaming, and edge-first delivery. Here is how we think about it.",
    blocks: [
      { type: "h2", text: "The Problem with", emphasis: "Framework-First Thinking" },
      {
        type: "p",
        text: "Most teams pick Next.js because it ships fast. They scaffold a project, add some pages, wire up an API route or two, and call it an architecture. It works — until it doesn't.",
      },
      {
        type: "blockquote",
        text: '"A framework gives you tools. An architecture gives you principles. You need both — and the order matters."',
      },
      { type: "h2", text: "What Actually Changed in", emphasis: "Next.js 16" },
      {
        type: "p",
        text: "Three changes matter more than everything else combined: Server Actions, Partial Prerendering (PPR), and the revised caching model.",
      },
      {
        type: "callout",
        label: "Architecture note",
        text: "Design your component tree around streaming seams (Suspense boundaries) early — retrofitting it is painful.",
      },
    ],
    tags: ["Shivlam", "Insights", "Next.js", "Architecture", "React"],
    author: {
      name: "Shivlam",
      role: "Engineering · Ahmedabad, India",
      bio: "iOS apps, Unity games, web systems, and brand strategy — shipped for clients across 5+ countries.",
      email: "hi@shivlam.com",
    },
  },
};

export function getBlogPostDetailBySlug(slug: string): BlogPostDetailContent {
  const post = getBlogPostBySlug(slug);
  return (
    BLOG_POST_DETAIL_BY_SLUG[slug] ?? {
      lead: post?.excerpt ?? "Journal detail coming soon.",
      // Avoid repeating the excerpt under the lead.
      blocks: [
        {
          type: "callout",
          label: "Journal status",
          text: "This journal is being expanded into a full technical write-up. Check back soon — we’ll publish the full breakdown with diagrams, patterns, and implementation notes.",
        },
      ],
      tags: ["Shivlam", "Insights"],
      author: {
        name: "Shivlam",
        role: "Engineering · Ahmedabad, India",
        bio: "More journals coming soon.",
        email: "hi@shivlam.com",
      },
    }
  );
}


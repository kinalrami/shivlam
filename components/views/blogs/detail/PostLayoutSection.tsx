"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Copy, Linkedin, MoveRight, Share2 } from "lucide-react";

import type { BlogPost, BlogPostBlock, BlogPostDetailContent } from "@/components/views/blogs/content";

function BlockRenderer({ block }: { block: BlogPostBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="pt-6 font-sans text-2xl font-semibold leading-tight text-sl-text">
        {block.text}{" "}
        {block.emphasis ? (
          <em className="not-italic text-sl-saffron">{block.emphasis}</em>
        ) : null}
      </h2>
    );
  }
  if (block.type === "h3") {
    return (
      <h3 className="pt-4 font-sans text-xl font-semibold text-sl-text">
        {block.text}
      </h3>
    );
  }
  if (block.type === "blockquote") {
    return (
      <blockquote className="mt-6 border-l-4 border-sl-saffron pl-5">
        <p className="font-sans text-base font-light italic leading-relaxed text-sl-saffron/90">
          {block.text}
        </p>
      </blockquote>
    );
  }
  if (block.type === "callout") {
    return (
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-4 backdrop-blur-2xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-sl-saffron/80">
          {block.label}
        </div>
        <p className="mt-2 text-sm leading-7 text-gray-400">{block.text}</p>
      </div>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="space-y-2 pt-2">
        {block.items.map((item) => (
          <li key={item} className="flex gap-2 border-b border-white/5 py-2 last:border-b-0">
            <MoveRight
              className="mt-[6px] h-3 w-3 shrink-0 text-sl-saffron"
              strokeWidth={2}
              aria-hidden
            />
            <p className="min-w-0 leading-relaxed text-gray-300">{item}</p>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "hr") {
    return <hr className="my-6 border-white/8" />;
  }
  return <p className="text-gray-300">{block.text}</p>;
}

export function PostLayoutSection({
  post,
  detail,
}: {
  post: BlogPost;
  detail: BlogPostDetailContent;
}) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const encodedUrl = useMemo(() => encodeURIComponent(currentUrl), [currentUrl]);
  const encodedText = useMemo(
    () => encodeURIComponent(`${post.title} by @shivlam`),
    [post.title],
  );

  const onCopy = async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="w-full border-t-2 border-sl-saffron">
      <div className="mx-auto grid w-full max-w-325 gap-10 px-5 py-10 md:px-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14 lg:py-14">
        <article className="min-w-0">
          <p className="border-b border-white/5 pb-8 font-sans text-lg font-light leading-relaxed text-gray-200">
            {detail.lead}
          </p>

          <div className="mt-6 space-y-4 text-[15px] leading-8">
            {detail.blocks.map((block, idx) => (
              <BlockRenderer key={`${block.type}-${idx}`} block={block} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-6">
            {detail.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/3 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55 backdrop-blur-2xl"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-2xl">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/3 font-mono text-sm font-bold text-sl-saffron backdrop-blur-2xl">
              {detail.author.name.slice(0, 1).toUpperCase()}
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
              Written by
            </p>
            <p className="mt-1 font-sans text-lg font-semibold text-sl-text">
              {detail.author.name}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-sl-saffron/75">
              {detail.author.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {detail.author.bio}
            </p>
            <div className="my-4 h-px bg-white/8" />
            <Link
              href={`mailto:${detail.author.email}`}
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-sl-saffron/85 hover:text-sl-saffron"
            >
              {detail.author.email} <MoveRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-2xl">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
              Share this journal
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={onCopy}
                className="flex w-full items-center gap-2 rounded border border-white/10 px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-white/60 transition-colors hover:border-sl-saffron/60 hover:text-sl-saffron"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied" : "Copy link"}
              </button>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center gap-2 rounded border border-white/10 px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-white/60 transition-colors hover:border-sl-saffron/60 hover:text-sl-saffron"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share on X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center gap-2 rounded border border-white/10 px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-white/60 transition-colors hover:border-sl-saffron/60 hover:text-sl-saffron"
              >
                <Linkedin className="h-3.5 w-3.5" />
                Share on LinkedIn
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}


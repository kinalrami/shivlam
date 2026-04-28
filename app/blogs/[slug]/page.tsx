import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/components/views/blogs/detail/Hero";
import { PostLayoutSection } from "@/components/views/blogs/detail/PostLayoutSection";
import { MoreFromInsightsSection } from "@/components/views/blogs/detail/MoreFromInsightsSection";

import {
  BLOG_POSTS,
  INSIGHTS_NOW,
  getBlogPostBySlug,
  getBlogPostDetailBySlug,
} from "@/components/views/blogs/content";
import { ArchitectureCanvasSection } from "@/components/views/blogs/detail/ArchitectureCanvasSection";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Blog Not Found | Shivlam" };
  }

  return {
    title: `${post.title} | Shivlam Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const diffDays = Math.floor(
    (INSIGHTS_NOW.getTime() - new Date(post.date).getTime()) / 86400000,
  );
  const isNew = diffDays <= 2;
  const detail = getBlogPostDetailBySlug(slug);

  return (
    <>
      <div className="relative z-10 min-h-0 flex-1 overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
        <Hero post={post} isNew={isNew} />
        <ArchitectureCanvasSection />
        <PostLayoutSection post={post} detail={detail} />
        <MoreFromInsightsSection currentSlug={slug} />
      </div>
    </>
  );
}


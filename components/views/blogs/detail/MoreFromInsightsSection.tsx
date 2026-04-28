import Link from "next/link";

import { BLOG_POSTS } from "@/components/views/blogs/content";
import { InsightsTrendsSection } from "@/components/shared/InsightsTrendsSection";
import { BLOG_INSIGHT_FILTERS, INSIGHTS_NOW } from "@/lib/insights-data";

export function MoreFromInsightsSection({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const more = BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <section className="w-full border-t-2 border-sl-saffron">
      <div className="mx-auto w-full max-w-325 py-10 lg:py-14">
        <div className="mb-8 flex items-center justify-between gap-4 px-5 md:px-12">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
              More journals
            </div>
            <div className="mt-2 font-sans text-2xl font-semibold text-sl-text">
              More from Insights &amp; Trends
            </div>
          </div>
          <Link
            href="/blogs"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-sl-saffron/80 hover:text-sl-saffron"
          >
            View all →
          </Link>
        </div>
        <InsightsTrendsSection
          posts={more}
          filterOptions={BLOG_INSIGHT_FILTERS}
          sectionId="more-from-insights"
          headingId="more-from-insights-heading"
          showSectionIntro={false}
          showCodePreview={false}
          insightsNow={INSIGHTS_NOW}
          showLoadMore={false}
        />
      </div>

    </section>
  );
}


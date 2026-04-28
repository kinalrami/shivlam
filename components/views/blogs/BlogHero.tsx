import Link from "next/link";
import { SectionIntro } from "@/components/shared/section-chrome";

export function BlogHero() {
  return (
    <main className="relative z-10 flex-1">
      <section
        className="font-sans text-sm sm:text-base"
        aria-labelledby="blog-hero-heading"
      >
        <div className="mx-auto flex w-full max-w-325 flex-col items-start justify-start px-5 pt-8 pb-10 sm:pt-12 sm:pb-16 md:px-12">
          <div className="flex max-w-225 w-full flex-col items-start justify-start">
            <nav
              className="mb-7 flex items-center gap-2 font-mono text-[9px] tracking-[0.14em] text-white/22 uppercase"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="text-orange-400/55 transition-colors hover:text-orange-400"
              >
                Home
              </Link>
              <span aria-hidden className="text-white/22">
                ›
              </span>
              <span aria-current="page" className="text-white/22">
                Blog
              </span>
            </nav>

            <SectionIntro
              id="blog-hero-heading"
              eyebrow="Insights & trends"
              eyebrowStyle="dash"
              title={
                <>
                  Technical Journals from
                  <br />
                  the{" "}
                  <span className="font-normal text-sl-saffron">Engineering Floor.</span>
                </>
              }
              lead="How we think about iOS architecture, immersive AR systems, Unity game development, web engineering, and brand as code — written by the team that ships it."
              className="mb-0! max-w-225 [&_h3]:max-w-225 [&_h3]:text-4xl [&_h3]:font-light! [&_h3]:leading-tight [&_h3]:text-sl-text sm:[&_h3]:text-5xl md:[&_h3]:text-6xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

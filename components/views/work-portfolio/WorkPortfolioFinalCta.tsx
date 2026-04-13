import Link from "next/link";

export function WorkPortfolioFinalCta() {
  return (
    <section className="border-t border-white/[0.08] bg-[#0a0a0a] px-5 py-12 md:py-20 text-center md:px-12">
      <h2 className="mb-3.5 font-sans text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold leading-tight tracking-tight text-white">
        Ready to Add Your Project
        <br />
        to This <span className="text-orange-400">Portfolio?</span>
      </h2>
      <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/50">
        Let&apos;s build something worth showcasing — app, game, website, or brand campaign.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        <a
          href="https://shivlam.com/contact-us/"
          className="inline-flex items-center gap-2 rounded-md bg-orange-400 px-8 py-3.5 text-xs font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.28)] transition-colors hover:bg-[#E68A1F]"
        >
          Hire Us Now →
        </a>
        <Link
          href="/about-us"
          className="inline-flex items-center gap-2 rounded-md border border-white/22 bg-transparent px-8 py-3.5 text-xs font-semibold tracking-[0.07em] text-white/80 uppercase transition-colors hover:border-orange-400 hover:text-orange-400"
        >
          About Shivlam
        </Link>
      </div>
    </section>
  );
}

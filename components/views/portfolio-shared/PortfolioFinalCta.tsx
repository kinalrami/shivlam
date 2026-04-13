import Link from "next/link";
import type { ReactNode } from "react";
import type { PortfolioFinalCtaProps } from "@/lib/portfolio-shell/sidebar-types";

function CtaLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className: string;
  children: ReactNode;
}) {
  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function PortfolioFinalCta({
  title,
  description,
  primary,
  secondary,
  titleClassName = "text-[clamp(1.75rem,4vw,2.25rem)]",
}: PortfolioFinalCtaProps) {
  return (
    <section className="border-t border-white/[0.08] bg-[#0a0a0a] px-5 py-12 text-center md:px-12 md:py-20">
      <h2
        className={`mb-3.5 font-sans ${titleClassName} font-extrabold leading-tight tracking-tight text-white`}
      >
        {title}
      </h2>
      <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/50">{description}</p>
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        <CtaLink
          href={primary.href}
          external={primary.external}
          className="inline-flex items-center gap-2 rounded-md bg-orange-400 px-8 py-3.5 text-xs font-semibold tracking-[0.07em] text-white uppercase shadow-[0_0_24px_rgb(245_138_11/0.28)] transition-colors hover:bg-[#E68A1F]"
        >
          {primary.label}
        </CtaLink>
        <CtaLink
          href={secondary.href}
          external={secondary.external}
          className="inline-flex items-center gap-2 rounded-md border border-white/22 bg-transparent px-8 py-3.5 text-xs font-semibold tracking-[0.07em] text-white/80 uppercase transition-colors hover:border-orange-400 hover:text-orange-400"
        >
          {secondary.label}
        </CtaLink>
      </div>
    </section>
  );
}

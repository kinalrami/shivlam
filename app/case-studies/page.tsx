import type { Metadata } from "next";
import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";

export const metadata: Metadata = {
  title: "Case Studies | Shivlam",
  description:
    "Project stories and outcomes from Shivlam — AR, BIM, mobile, and spatial computing work.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <HeroCanvas />
      <main className="relative z-10 min-h-0 flex-1">
      <section className="max-w-225 px-5 min-h-[70vh] py-16 sm:px-8 sm:py-24 lg:px-14">
        <p className="font-mono mb-6 text-xs font-medium uppercase text-sl-saffron">
          Case Studies
        </p>
        <Link
          href="/"
          className="inline-block rounded-sm border border-sl-saffron px-7 py-3 font-mono text-xs font-bold text-sl-saffron transition-[filter] hover:brightness-110"
        >
          Back to home
        </Link>
      </section>
      </main>
    </>
  );
}

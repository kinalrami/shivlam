import type { Metadata } from "next";
import Link from "next/link";
import { ArBim } from "@/components/views/ar-bim/ArBim";

export const metadata: Metadata = {
  title: "AR / BIM Overlay | Shivlam",
  description:
    "We overlay IFC/BIM models directly onto physical construction sites in real time, anchored via LiDAR and ARKit.",
};

export default function ArBimDevelopmentPage() {
  return (
    <>
      <main className="relative z-10 min-h-0 flex-1">
        <section className="max-w-225 md:max-w-5xl mx-auto px-5 sm:px-8 lg:px-14 min-h-[70vh] py-8">
          <nav className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <Link href="/" className="text-gray-400 hover:text-gray-200">
              Home
            </Link>
            <span className="px-2 text-gray-700" aria-hidden>
              ›
            </span>
            <span className="text-sl-saffron">AR / BIM Overlay</span>
          </nav>

          <p className="font-mono mt-10 text-xs font-medium uppercase tracking-widest text-sl-saffron">
            Service
          </p>

          <h1 className="mt-5 text-5xl font-bold tracking-tight text-white">
            AR / BIM Overlay
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-300 sm:text-lg">
            We overlay IFC/BIM models directly onto physical construction sites
            in real time, anchored via LiDAR and ARKit. Built for iPad Pro,
            designed for superintendents.
          </p>
          <ArBim />
        </section>
      </main>
    </>
  );
}


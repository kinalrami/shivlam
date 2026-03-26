import type { Metadata } from "next";
import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";

export const metadata: Metadata = {
  title: "Contact Us | Shivlam",
  description: "Get in touch with Shivlam about your AR, BIM, or product build.",
};

export default function ContactUsPage() {
  return (
    <>
      <HeroCanvas />
      <main className="relative z-10 min-h-0 flex-1">
      <section className="max-w-[900px] px-[1.2rem] min-h-[70vh] py-16 sm:px-8 sm:py-24 lg:px-14">
        <p className="font-mono mb-6 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-sl-saffron">
          Contact Us
        </p>
        <Link
          href="/"
          className="inline-block rounded-sm border border-sl-saffron px-7 py-3 font-mono text-[0.78rem] font-bold tracking-[0.05em] text-sl-saffron transition-[filter] hover:brightness-110"
        >
          Back to home
        </Link>
      </section>
      </main>
    </>
  );
}

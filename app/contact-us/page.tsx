import type { Metadata } from "next";
import Link from "next/link";
import HeroCanvas from "@/components/views/home/Canvas";

export const metadata: Metadata = {
  title: "Contact Us | Shivlam",
  description: "Get in touch with Shivlam about your AR, BIM, or product build.",
};

export default function ContactUsPage() {
  return (
    <>
      <HeroCanvas />
      <main className="relative z-10 min-h-0 flex-1">
      <section className="max-w-225 px-5 min-h-[70vh] py-16 sm:px-8 sm:py-24 lg:px-14">
        <p className="font-mono mb-6 text-xs font-medium uppercase text-sl-saffron">
          Contact Us
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

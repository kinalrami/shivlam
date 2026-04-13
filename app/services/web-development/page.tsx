import type { Metadata } from "next";
import Landing from "@/components/views/web-development/Landing";

export const metadata: Metadata = {
  title: "Custom Web Development Services — Shivlam | Laravel, WordPress, Shopify, React",
  description:
    "Expert custom web development services — Laravel, WordPress, Shopify, WooCommerce, Magento, React, Next.js, and Web Design. Ahmedabad-based team delivering scalable web solutions globally.",
  keywords: [
    "custom web development",
    "Laravel development",
    "WordPress development",
    "Shopify development",
    "WooCommerce",
    "Magento",
    "React",
    "Next.js",
    "web design",
    "Ahmedabad web development company",
  ],
  alternates: {
    canonical: "https://shivlam.vercel.app/services/web-development",
  },
};

export default function WebDevelopmentPage() {
  return (
    <main className="relative z-10 min-h-0 flex-1">
      <Landing />
    </main>
  );
}


import type { Metadata } from "next";
import AboutPage from "@/components/views/about-us/Page";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DeltaARBIM",
  url: "https://deltaarbim.tech",
  description:
    "DeltaARBIM is an AR-powered BIM platform built by Shivlam to transform construction site intelligence through real-time augmented reality overlays.",
  foundingDate: "2022",
  foundingLocation: "Bharat, India",
  parentOrganization: {
    "@type": "Organization",
    name: "Shivlam",
    url: "https://www.shivlam.com",
  },
  sameAs: ["https://deltaarbim.tech"],
};

export const metadata: Metadata = {
  title: "About DeltaARBIM — AR & BIM Intelligence Built in Bharat | Shivlam",
  description:
    "Learn about DeltaARBIM — an AR-powered BIM platform built by Shivlam, a Bharat-based tech company with 10+ years of experience. Our mission is to transform construction with real-time augmented reality.",
  keywords: [
    "DeltaARBIM",
    "about us",
    "AR BIM",
    "construction technology",
    "augmented reality BIM",
    "Shivlam",
    "Bharat tech",
    "building information modeling",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://deltaarbim.tech/about" },
  openGraph: {
    title: "About DeltaARBIM — Construction + AR + BIM Intelligence",
    description:
      "DeltaARBIM is built by Shivlam, a Bharat-based technology company on a mission to eliminate the gap between BIM design and real-world construction.",
    type: "website",
    url: "https://deltaarbim.tech/about",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative z-10 min-h-0 flex-1">
        <AboutPage />
      </main>
    </>
  );
}

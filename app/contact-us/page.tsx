import type { Metadata } from "next";
import ContactPage from "@/components/views/contact-us/Page";

export const metadata: Metadata = {
  title: "Contact DeltaARBIM — Get Early Access & Talk to Our Team",
  description:
    "Contact the DeltaARBIM team to request early access, discuss your construction project, or learn how AR BIM technology can reduce rework on your site. Built by Shivlam.",
  keywords: [
    "contact DeltaARBIM",
    "AR BIM contact",
    "construction AR inquiry",
    "early access BIM",
    "Shivlam contact",
    "BIM augmented reality India",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://deltaarbim.tech/contact" },
  openGraph: {
    title: "Contact DeltaARBIM — Talk to Our Team",
    description:
      "Reach out to the DeltaARBIM team. Get early access, demo requests, or ask anything about AR BIM for your construction site.",
    type: "website",
    url: "https://deltaarbim.tech/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact DeltaARBIM",
  url: "https://deltaarbim.tech/contact",
  description:
    "Contact the DeltaARBIM team for early access, demo requests, or questions about AR BIM for construction sites.",
  mainEntity: {
    "@type": "Organization",
    name: "DeltaARBIM by Shivlam",
    email: "hello@shivlam.com",
    url: "https://deltaarbim.tech",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@shivlam.com",
      availableLanguage: ["English", "Hindi"],
    },
  },
} as const;

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative z-10 min-h-0 flex-1">
        <ContactPage />
      </main>
    </>
  );
}

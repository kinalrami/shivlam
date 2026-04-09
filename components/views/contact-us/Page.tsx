"use client";

import ContactFormSection from "@/components/views/home/ContactForm";
import { Hero } from "./Hero";
import { Lead } from "./Lead";
import { RevealGroup } from "./RevealGroup";

export default function ContactUsPage() {
  return (
    <div className="overflow-x-hidden bg-[#060606] font-sans text-sl-text antialiased selection:bg-orange-400/30">
      <RevealGroup />
      <Hero />
      <Lead />
      <ContactFormSection />
    </div>
  );
}


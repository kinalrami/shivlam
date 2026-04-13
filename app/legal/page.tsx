import type { Metadata } from "next";
import { LegalShell } from "@/components/views/legal/LegalShell";

export const metadata: Metadata = {
  title: "Terms & Conditions · Privacy Policy — Shivlam",
  description: "Shivlam's Terms & Conditions and Privacy Policy — clear, simple, honest.",
  openGraph: {
    title: "Legal — Shivlam",
    description: "Terms & Conditions and Privacy Policy for Shivlam IT Services.",
  },
};

export default function LegalPage() {
  return <LegalShell />;
}


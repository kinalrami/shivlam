"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Services");

  const sections = [
    "Specialisation",
    "Services",
    "Work Portfolio",
    "Case Studies",
    "About Us",
    "Contact US",
  ];

  const sectionItems: Record<string, string[]> = {
    Specialisation: ["AR BIM development", "3D Reconstruction", "AR VR Solution"],
    Services: [
      "Mobile App Development",
      "Unity Development",
      "Website Development",
      "Brand Building",
    ],
    "Work Portfolio": ["AR Portfolio", "App Portfolio", "Website Portfolio"],
    "Case Studies": ["AR App Development", "Website Development", "Brand Building"],
    "About Us": ["Our Story", "Team", "Mission"],
    "Contact US": ["hi@shivlam.com", "Let's Chat!", "Social Media"],
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="flex items-center justify-between px-5 py-4 sm:px-14 sm:py-7">
        <Link href="/" className="flex min-w-0 shrink items-center">
          <Image
            src="/logo.svg"
            alt="Shivlam — Scalable tech services for everyone"
            width={260}
            height={142}
            className="h-14 w-auto max-w-[70vw] md:h-28"
            priority
            unoptimized
          />
        </Link>

        <button
          type="button"
          className="flex h-14 shrink-0 cursor-pointer items-center justify-center text-white md:h-28"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="size-7 md:size-10" aria-hidden />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-black text-white transition-transform duration-500 ease-out ${
          isMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-end px-5 py-4 sm:px-16 sm:py-12">
            <button
              type="button"
              className="flex shrink-0 cursor-pointer items-center justify-center text-white"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-7 md:size-10" />
            </button>
          </div>

          <div className="flex flex-1 items-center px-5 py-8 sm:px-8">
            <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-[minmax(260px,1fr)_1px_minmax(220px,0.9fr)] md:items-stretch">
              <div className="md:justify-self-end md:pr-10">
                <ul className="space-y-3 text-lg md:text-2xl">
                  {sections.map((section) => (
                    <li key={section}>
                      <button
                        type="button"
                        className={`flex items-center gap-2 transition-colors ${
                          activeSection === section
                            ? "text-orange-400"
                            : "text-gray-300 hover:text-white"
                        }`}
                        onClick={() => setActiveSection(section)}
                      >
                        {activeSection === section && (
                          <span className="text-lg md:text-xl">&bull;</span>
                        )}
                        <span>{section}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px w-full bg-gray-800 md:h-full md:w-px" />

              <div className="pt-1 text-gray-500 md:pl-6">
                <ul className="space-y-3 text-sm md:text-base">
                  {(sectionItems[activeSection] ?? []).map((item) => (
                    <li key={item} className="hover:text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

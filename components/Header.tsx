"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

type SubMenuEntry = { label: string; };

type SectionNavItem = {
  label: string;
  submenu?: SubMenuEntry[];
};

const sections = [
  "Specialisation",
  "Services",
  "Work Portfolio",
  "Case Studies",
  "About Us",
  "Contact US",
];

const sectionItems: Record<string, SectionNavItem[]> = {
  Specialisation: [
    { label: "AR BIM development" },
    { label: "3D Reconstruction" },
    { label: "AR VR Solution" },
  ],
  Services: [
    {
      label: "Mobile App Development",
      submenu: [
        { label: "iPhone App Development Company"},
        { label: "Android App Development Company"},
        { label: "Flutter App Development Company"},
      ],
    },
    { label: "Web Development" },
    { label: "Game Development",
      submenu: [
        { label: "Unity Mobile Game Development"},
        { label: "Vision Pro Game Development Company"},
      ],
     },
    { label: "Digital Marketing",
      submenu: [
        { label: "SEO"},
        { label: "Mobile Game Marketing Service"},
        { label: "SaaS Product Marketing Solutions"},
      ],
     }
  ],
  "Work Portfolio": [
    { label: "Mobile App Specialised" },
    { label: "Sustainable SEO" },
  ],
  "Case Studies": [],
  "About Us": [],
  "Contact US": [],
};

/** When a section has no items in `sectionItems`, the menu navigates here instead of listing sub-items. */
const sectionHrefWhenEmpty: Partial<Record<string, string>> = {
  "Case Studies": "/case-studies",
  "About Us": "/about-us",
  "Contact US": "/contact-us",
};

export function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Services");
  const [activeItem, setActiveItem] = useState<string>("Mobile App Development");

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const items = sectionItems[activeSection] ?? [];
    const first = items[0]?.label ?? "";
    setActiveItem(first);
  }, [activeSection]);

  return (
    <>
      <header className="relative z-30 w-full">
        <div className="mx-auto flex w-full items-center justify-between px-5 py-4 sm:px-8 lg:px-14">
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
            className="font-mono flex shrink-0 cursor-pointer items-center justify-center text-white"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="size-8 lg:size-10" aria-hidden />
          </button>
        </div>
      </header>

      <div
        className={`font-mono fixed inset-0 z-50 bg-black text-white backdrop-blur-[20.6px] [-webkit-backdrop-filter:blur(20.6px)] transition-transform duration-500 ease-out ${
          isMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
      >
         <button
            type="button"
            className="font-mono absolute top-4 z-10 flex shrink-0 cursor-pointer items-center justify-center text-white sm:top-12 right-8 lg:right-14"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-8 lg:size-10" aria-hidden />
          </button>
        <div className="relative mx-auto flex h-full w-full max-w-[800px] flex-col px-5 md:px-10">
         

          <div className="flex min-h-0 flex-1 flex-col md:h-full md:flex-row md:items-stretch">
            <div className="flex min-h-0 min-w-0 flex-1 items-center md:border-r border-gray-800 md:border-r-0">
              <div className="w-full">
                <ul className="w-full space-y-3 text-lg lg:text-2xl">
                  {sections.map((section) => {
                    const isActive = activeSection === section;
                    return (
                      <li key={section} className="md:pr-8">
                        <div className="flex w-full min-w-0 items-center gap-3">
                          <button
                            type="button"
                            className={`flex shrink-0 items-center gap-2 transition-colors ${
                              isActive
                                ? "text-[#F89938]"
                                : "text-gray-300 hover:text-white"
                            }`}
                            onClick={() => {
                              const items = sectionItems[section] ?? [];
                              if (items.length === 0) {
                                const href = sectionHrefWhenEmpty[section];
                                if (href) {
                                  setIsMenuOpen(false);
                                  router.push(href);
                                  return;
                                }
                              }
                              setActiveSection(section);
                            }}
                          >
                            {isActive && (
                              <span
                                className="size-1.5 shrink-0 rounded-full bg-[#F89938]"
                                aria-hidden
                              />
                            )}
                            <span>{section}</span>
                          </button>
                          {isActive && (
                            <span
                              className="hidden h-[0.5px] min-h-[0.5px] min-w-0 flex-1 bg-linear-to-r from-[#000000] to-[#F89938] md:-mr-8 md:block"
                              aria-hidden
                            />
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div
              className="h-px w-full shrink-0 bg-linear-to-b from-[#313131] via-[#925A21] to-[#313131] md:h-auto md:min-h-0 md:w-px md:self-stretch"
              aria-hidden
            />

            <div className="flex min-w-0 flex-1 flex-col justify-center md:pl-12 md:pt-0">
              <ul className="w-full space-y-1 md:space-y-3">
                {(sectionItems[activeSection] ?? []).map((item) => {
                  const isActive = activeItem === item.label;
                  const hasSubmenu = Boolean(item.submenu?.length);

                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className={`w-full text-left text-sm lg:text-base transition-colors ${
                          isActive
                            ? "text-[#F89938]"
                            : "text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setActiveItem(item.label)}
                        aria-expanded={hasSubmenu ? isActive : undefined}
                      >
                        {item.label}
                      </button>

                      {isActive && hasSubmenu && (
                        <div
                          className="mt-3 flex max-w-[380px] overflow-hidden rounded-lg bg-surface shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                          role="region"
                          aria-label={`${item.label} options`}
                        >
                          <div
                            className="w-0.5 shrink-0 self-stretch bg-linear-to-b from-[#000000] via-[#F89938] to-[#020202]"
                            aria-hidden
                          />
                          <div className="min-w-0 flex-1 py-4 pl-4 pr-3">
                            <ul className="space-y-3">
                              {item.submenu!.map((sub) => (
                                <li key={sub.label}>
                                  <span className="flex cursor-default items-center gap-3 text-xs text-gray-500 lg:text-sm">
                                    {sub.label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Copyright } from "lucide-react";
import { useState } from "react";

const optionHref: Partial<Record<string, string>> = {
  "AR BIM development": "/services/ar-bim",
  "Contact Us": "/contact-us",
};

export function Footer() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  function openChat() {
    window.dispatchEvent(new Event("shivlam:open-chat"));
  }

  const sections = [
    {
      id: "specialisation",
      title: "Specialisation",
      options: ["AR BIM development", "3D Reconstruction", "AR VR Solution"],
    },
    {
      id: "services",
      title: "Services",
      options: ["Mobile App Development", "Website Development", "Digital Marketing"],
    },
    {
      id: "case-studies",
      title: "Case Studies",
      options: ["AR App Development", "Website Development", "Brand Building"],
    },
    {
      id: "contact",
      title: "Contact",
      options: ["hi@shivlam.com", "Let's Chat!", "Contact Us"],
    },
  ];

  return (
    <footer className="font-mono relative z-10 mx-5 mb-7 rounded-2xl bg-gray-900 md:mx-12 md:mb-11 md:rounded-4xl">
      <div className="flex flex-col gap-6 px-5 py-5 sm:px-7 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <Link href="/" className="flex min-w-0 shrink items-center">
          <Image
            src="/logo.svg"
            alt="Shivlam — Scalable tech services for everyone"
            width={260}
            height={142}
            className="h-14 w-auto max-w-[70vw] md:h-20 lg:h-24"
            priority
            unoptimized
          />
        </Link>

        <div className="w-full rounded-2xl lg:max-w-5xl lg:p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
            {sections.map((section) => {
              const sectionHasSelectedOption = section.options.some(
                (option) => selectedOption === `${section.id}:${option}`,
              );

              return (
                <div key={section.id} className="group rounded-2xl bg-gray-950 text-gray-400 p-4">
                  <p
                    className={`mb-2 text-base font-bold ${sectionHasSelectedOption
                      ? "text-orange-400"
                      : "text-white"
                      }`}
                  >
                    {section.title}
                  </p>
                  <ul className="space-y-1.5 text-sm">
                    {section.options.map((option) => {
                      const optionId = `${section.id}:${option}`;
                      const isSelected = selectedOption === optionId;

                      return (
                        <li key={option}>
                          {option === "hi@shivlam.com" ? (
                            <a
                              href="mailto:hi@shivlam.com"
                              onClick={() => setSelectedOption(optionId)}
                              className={`block cursor-pointer text-left transition-colors ${isSelected
                                ? "text-orange-400"
                                : "text-gray-400 hover:text-orange-400"
                                }`}
                            >
                              {option}
                            </a>
                          ) : option === "Let's Chat!" ? (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedOption(optionId);
                                openChat();
                              }}
                              className={`block cursor-pointer text-left transition-colors ${isSelected
                                ? "text-orange-400"
                                : "text-gray-400 hover:text-orange-400"
                                }`}
                            >
                              {option}
                            </button>
                          ) : optionHref[option] ? (
                            <Link
                              href={optionHref[option]!}
                              onClick={() => setSelectedOption(optionId)}
                              className={`block cursor-pointer text-left transition-colors ${isSelected
                                ? "text-orange-400"
                                : "text-gray-400 hover:text-orange-400"
                                }`}
                            >
                              {option}
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedOption(optionId)}
                              className={`block cursor-pointer text-left transition-colors ${isSelected
                                ? "text-orange-400"
                                : "text-gray-400 hover:text-orange-400"
                                }`}
                            >
                              {option}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex items-center justify-between rounded-xl bg-gray-950 px-4 py-3">
            <p className="text-sm flex items-center gap-2 text-white"><Copyright size={14} /> {new Date().getFullYear()} shivlam</p>
            <div className="flex items-center gap-3">
              {(
                [
                  {
                    href: "https://www.facebook.com/theshivlam",
                    src: "/facebook.svg",
                    label: "Facebook",
                  },
                  {
                    href: "https://www.instagram.com/theshivlam/",
                    src: "/instagram.svg",
                    label: "Instagram",
                  },
                  {
                    href: "https://www.linkedin.com/company/shivlamtech/",
                    src: "/linkedin.svg",
                    label: "LinkedIn",
                  },
                  {
                    href: "https://www.youtube.com/@TheShivlam",
                    src: "/youtube.svg",
                    label: "YouTube",
                  },
                ] as const
              ).map(({ href, src, label }) => (
                <a
                  key={src}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex text-zinc-500 transition-colors hover:text-orange-400"
                >
                  <Image
                    src={src}
                    alt=""
                    width={16}
                    height={16}
                    priority
                    unoptimized
                    className="opacity-80 transition-[filter,opacity] duration-200 group-hover:opacity-100 group-hover:[filter:brightness(0)_saturate(100%)_invert(51%)_sepia(98%)_saturate(2875%)_hue-rotate(359deg)_brightness(103%)_contrast(105%)]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

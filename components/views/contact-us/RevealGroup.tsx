"use client";

import { useEffect } from "react";

export function RevealGroup() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll<HTMLElement>("[data-contact-reveal]");
    if (reduce) {
      els.forEach((el) => el.classList.add("contact-reveal-visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("contact-reveal-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}


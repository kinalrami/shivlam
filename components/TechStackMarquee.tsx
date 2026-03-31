"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type TechLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

const logos: TechLogo[] = [
  { name: "Unity", src: "/tech/unity.svg", width: 120, height: 36 },
  { name: "Swift", src: "/tech/swift.svg", width: 96, height: 36 },
  { name: "Next.js", src: "/tech/nextjs.svg", width: 120, height: 36 },
  { name: "Node.js", src: "/tech/nodejs.svg", width: 120, height: 36 },
  { name: "AWS", src: "/tech/aws.svg", width: 92, height: 36 },
  { name: "C#", src: "/tech/csharp.svg", width: 72, height: 36 },
];

export default function TechStackMarquee({
  speedSeconds = 10,
}: {
  speedSeconds?: number;
}) {
  const setRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  useEffect(() => {
    const el = setRef.current;
    if (!el) return;

    const update = () => {
      const w = el.scrollWidth;
      if (w > 0) setSetWidth(w);
    };

    update();

    let raf = 0;
    let tries = 0;
    const retry = () => {
      tries += 1;
      update();
      if (tries < 12 && el.scrollWidth === 0) {
        raf = requestAnimationFrame(retry);
      }
    };
    raf = requestAnimationFrame(retry);

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const animateTo = useMemo(() => (setWidth > 0 ? -setWidth : 0), [setWidth]);
  const LogoItem = ({ logo }: { logo: TechLogo }) => (
    <div className="group flex items-center justify-center" title={logo.name}>
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.width}
        height={logo.height}
        className="h-7 w-auto opacity-70 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </div>
  );

  return (
    <section aria-label="Tech Stack" className="px-12 pb-12 md:pb-20">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-xs font-medium uppercase text-sl-saffron">
          Tech Stack
        </p>
        <div className="hidden h-px flex-1 bg-linear-to-r from-transparent via-gray-800 to-transparent sm:block" />
      </div>

      <div className="relative overflow-hidden rounded-lg border border-gray-800 bg-black/20 px-2 py-4">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-black/70 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-black/70 to-transparent"
          aria-hidden
        />
        <motion.div
          key={`${setWidth}-${speedSeconds}`}
          className="flex w-max items-center will-change-transform"
          animate={{ x: [0, animateTo] }} 
          transition={{
            duration: speedSeconds,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {/* Primary Set */}
          <div ref={setRef} className="flex items-center gap-10 pr-10">
            {logos.map((logo) => (
              <LogoItem key={`${logo.name}-1`} logo={logo} />
            ))}
          </div>

          {/* Duplicate Set 1: This creates the seamless transition */}
          <div className="flex items-center gap-10 pr-10" aria-hidden>
            {logos.map((logo) => (
              <LogoItem key={`${logo.name}-2`} logo={logo} />
            ))}
          </div>

          {/* Duplicate Set 2: Safety net for large screens */}
          <div className="flex items-center gap-10 pr-10" aria-hidden>
            {logos.map((logo) => (
              <LogoItem key={`${logo.name}-3`} logo={logo} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}


"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export const arbimRevealTransition = {
  duration: 0.65,
  ease,
} as const;

type ArbimRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 1 = 0.1s delay, 2 = 0.2s, … */
  delayStep?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView">;

export function ArbimReveal({
  children,
  className = "",
  delayStep = 0,
  ...rest
}: ArbimRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        ...arbimRevealTransition,
        delay: delayStep * 0.1,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

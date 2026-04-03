"use client";

import { useEffect, useState } from "react";

function prefersReducedMotionQuery(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(prefersReducedMotionQuery);

  useEffect(() => {
    const q = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduce(q?.matches ?? false);
    const onChange = () => setReduce(q.matches);
    q?.addEventListener?.("change", onChange);
    return () => q?.removeEventListener?.("change", onChange);
  }, []);

  return reduce;
}

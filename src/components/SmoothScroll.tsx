"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Shared inertial scroll for subpages.
 * Home owns a stronger GSAP/Lenis timeline, so this deliberately skips `/`.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.74,
      touchMultiplier: 1,
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}

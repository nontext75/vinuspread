"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared inertial scroll for Home and Subpages.
 * Provides smooth 60fps wheel inertia and syncs with GSAP ScrollTrigger.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window === "undefined"
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || !window.matchMedia("(min-width: 768px)").matches
      || !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (progress) => 1 - Math.pow(1 - progress, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.84,
      touchMultiplier: 1.25,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}


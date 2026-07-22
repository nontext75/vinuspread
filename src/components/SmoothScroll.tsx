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
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.25,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


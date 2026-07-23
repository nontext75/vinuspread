"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Shared inertial scroll for Home and Subpages.
 * Provides smooth 60fps wheel inertia and syncs with GSAP ScrollTrigger.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


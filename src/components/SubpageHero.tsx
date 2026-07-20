"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const heroHeightClasses = {
  compact: "subpage-header--compact",
  medium: "subpage-header--medium",
  spacious: "subpage-header--spacious",
} as const;

export type SubpageHeroSize = keyof typeof heroHeightClasses;

type SubpageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  size?: SubpageHeroSize;
  className?: string;
};

/**
 * Shared editorial hero for Vinuspread subpages.
 *
 * The component intentionally uses natural text height and flex gaps so copy can
 * be edited without introducing fixed text boxes or absolute positioning.
 */
export function SubpageHero({
  eyebrow,
  title,
  description,
  size = "compact",
  className,
}: SubpageHeroProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.65]);

  const initial = reduceMotion ? false : { opacity: 0, y: 72 };
  const visible = { opacity: 1, y: 0 };
  const transition = (delay: number) => ({
    duration: reduceMotion ? 0 : 0.95,
    delay: reduceMotion ? 0 : delay,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <section ref={ref} className={cn("subpage-header overflow-hidden", heroHeightClasses[size], className)}>
      <motion.div
        className="subpage-header-inner will-change-transform"
        style={{ y: reduceMotion ? 0 : heroY, opacity: reduceMotion ? 1 : heroOpacity }}
      >
        <div className="subpage-label-stack">
          <motion.p className="subpage-eyebrow" initial={initial} animate={visible} transition={transition(0.04)}>{eyebrow}</motion.p>
          <motion.span aria-hidden="true" className="subpage-rule" initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }} />
        </div>
        <div className="subpage-copy-stack">
          <motion.h1 className="subpage-title" initial={initial} animate={visible} transition={transition(0.12)}>{title}</motion.h1>
          <motion.p className="subpage-lead" initial={initial} animate={visible} transition={transition(0.2)}>{description}</motion.p>
        </div>
      </motion.div>
    </section>
  );
}


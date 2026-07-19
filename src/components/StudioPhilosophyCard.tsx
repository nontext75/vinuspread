"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export type StudioPhilosophyCardProps = {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  layoutClassName?: string;
  mediaClassName?: string;
  descriptionClassName?: string;
  imageSizes?: string;
  index?: number;
};

/** Reusable Studio philosophy card with flow-based, hug-height copy. */
export function StudioPhilosophyCard({
  tag,
  title,
  description,
  image,
  imageAlt,
  layoutClassName,
  mediaClassName,
  descriptionClassName,
  imageSizes = "(max-width: 1023px) calc(100vw - 48px), 42vw",
  index = 0,
}: StudioPhilosophyCardProps) {
  const reduceMotion = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: reduceMotion ? 0 : 0.42,
        delay: reduceMotion ? 0 : index * 0.035,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={cn("group flex min-w-0 flex-col gap-4 lg:gap-8 min-[2200px]:gap-12", layoutClassName)}
    >
      <div ref={mediaRef} className={cn("relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-vinus-wash", mediaClassName)}>
        <motion.div className="absolute inset-0 scale-[1.12] will-change-transform" style={{ y: reduceMotion ? 0 : imageY }}>
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            priority={index === 0}
            sizes={imageSizes}
            className="object-cover"
          />
        </motion.div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="type-value-word">{tag}</h2>
        <h3 className="type-lead font-medium md:font-normal">{title}</h3>
        <p className={cn("type-body max-w-[584px] font-normal text-vinus-ink", descriptionClassName)}>{description}</p>
      </div>
    </motion.article>
  );
}

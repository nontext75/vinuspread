"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type CaptionedMediaProps = {
  src: string;
  alt: string;
  title: string;
  meta?: string;
  sizes?: string;
  className?: string;
};

export function CaptionedMedia({ src, alt, title, meta, sizes = "100vw", className }: CaptionedMediaProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-vinus-wash-soft", className)}>
      <motion.div className="absolute inset-0 scale-[1.12] will-change-transform" style={{ y: reduceMotion ? 0 : imageY }}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/55 to-transparent px-6 pb-12 pt-16 text-white">
        <p className="type-body font-bold">{title}</p>
        {meta && <p className="type-body text-right">{meta}</p>}
      </div>
    </div>
  );
}

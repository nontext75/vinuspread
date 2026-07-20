"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CategoryBadge } from "@/components/CategoryBadge";

export type PortfolioListItemProps = {
  title: string;
  subtitle: string;
  category: string;
  image: string;
  href: string;
  index?: number;
};

export function PortfolioListItem({ title, subtitle, category, image, href, index = 0 }: PortfolioListItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      initial={reduceMotion ? false : { opacity: 0, y: 88, scale: 0.992 }}
      animate={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduceMotion ? 0 : 0.86, delay: reduceMotion ? 0 : index * 0.065, ease: [0.16, 1, 0.3, 1] }}
      className="group grid grid-cols-[1fr_auto] items-center gap-[var(--space-compact)] border-b border-vinus-ink/10 py-[var(--space-content)] md:grid-cols-[200px_1fr_auto]"
    >
      <div className="relative hidden aspect-[16/10] overflow-hidden bg-vinus-wash md:block">
        <Image src={image} alt="" fill sizes="200px" className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.05]" />
      </div>
      <div className="min-w-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
        <h2 className="type-heading font-medium transition-colors duration-300 group-hover:text-vinus-ink/80">{title}</h2>
        <p className="type-body mt-[var(--space-inline)] text-vinus-ink/55 md:type-lead">{subtitle}</p>
      </div>
      <div className="flex items-center gap-[var(--space-compact)]">
        <CategoryBadge className="hidden text-vinus-ink sm:inline-flex">{category}</CategoryBadge>
        <ArrowUpRight className="size-5 stroke-[1.25] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:translate-x-1.5 motion-safe:group-hover:-translate-y-1.5" />
      </div>
    </motion.a>
  );
}


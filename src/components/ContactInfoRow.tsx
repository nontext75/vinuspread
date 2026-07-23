"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ContactInfoRowProps = {
  label: string;
  value: string;
  detail: string;
  href?: string;
  index?: number;
  divider?: boolean;
  className?: string;
};

/** Reusable Contact information row with Hug text and grid-based alignment. */
export function ContactInfoRow({ label, value, detail, href, index = 0, divider = true, className }: ContactInfoRowProps) {
  const reduceMotion = true;
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: reduceMotion ? 0 : 0.34, delay: reduceMotion ? 0 : index * 0.03, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "flex flex-col items-start gap-4 border-t border-vinus-ink/10 py-6 md:min-h-40 md:flex-row md:gap-6 md:border-t-0 md:py-10",
        divider && "md:border-b md:border-vinus-ink/10",
        className,
      )}
    >
      <p className="label-sm w-full font-medium md:w-[220px] md:font-normal">{label}</p>
      <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-4">
        {href ? <a href={href} className="body-lg break-words font-medium transition-opacity duration-200 hover:opacity-60">{value}</a> : <p className="body-lg break-words font-medium">{value}</p>}
        <p className="body-md font-normal text-vinus-ink/65">{detail}</p>
      </div>
    </motion.div>
  );
}

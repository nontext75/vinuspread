"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clients, type ClientLogo as ClientLogoData } from "@/lib/clients";

type ClientLogoGridProps = {
  tone?: "dark" | "light";
  dividers?: "matrix" | "top";
  mobileLimit?: number;
  className?: string;
};

/** One reusable logo renderer; brand artwork changes through data, not component variants. */
export function ClientLogo({ client }: { client: ClientLogoData }) {
  if (client.markSlug) {
    return (
      <span
        className="relative block h-[28px] w-[114px] max-w-full"
        aria-label={client.name}
        role="img"
      >
        <Image
          src="/vinus/clients/lg-cns-mark.svg"
          alt=""
          width={77}
          height={34}
          className="absolute inset-y-0 left-0 h-full w-[54%]"
        />
        <Image
          src="/vinus/clients/lg-cns-wordmark.svg"
          alt=""
          width={58}
          height={23}
          className="absolute right-0 top-[16%] h-[68%] w-[41%]"
        />
      </span>
    );
  }

  return (
    <Image
      src={`/vinus/clients/${client.slug}.svg`}
      alt={client.name}
      width={client.width}
      height={client.height}
      className="h-auto max-h-12 max-w-full object-contain"
    />
  );
}

/** Shared responsive 7 × 4 desktop logo matrix from the VINUS Figma library. */
export function ClientLogoGrid({ tone = "dark", dividers = "matrix", mobileLimit, className = "" }: ClientLogoGridProps) {
  const dividerColor = tone === "dark" ? "xl:border-white/15" : "xl:border-vinus-ink/15";

  return (
    <div
      className={`grid grid-cols-2 gap-0 sm:grid-cols-4 xl:h-[353px] xl:grid-cols-7 xl:grid-rows-4 xl:gap-0 xl:border-t ${
        dividers === "matrix" ? "xl:border-l" : ""
      } ${dividerColor} ${className}`}
      aria-label="Selected clients"
    >
      {clients.map((client, index) => (
        <motion.div
          key={client.name}
          initial={false}
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className={`reveal-motion min-h-[72px] items-center justify-center sm:min-h-32 xl:flex xl:min-h-0 ${
            mobileLimit !== undefined && index >= mobileLimit ? "hidden xl:flex" : "flex"
          } ${
            dividers === "matrix" ? `xl:border-b xl:border-r ${dividerColor}` : ""
          }`}
        >
          <ClientLogo client={client} />
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
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
        className="client-logo client-logo--lg-cns relative block max-w-full"
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

  const logoHeight = Math.min(client.height, 32);
  const logoWidth = Math.round((client.width * logoHeight) / client.height);

  return (
    <Image
      src={`/vinus/clients/${client.slug}.svg`}
      alt={client.name}
      width={logoWidth}
      height={logoHeight}
      className="client-logo h-auto max-w-full object-contain"
    />
  );
}

/** Shared responsive 7 × 4 desktop logo matrix from the VINUS Figma library. */
export function ClientLogoGrid({ tone = "dark", dividers = "matrix", mobileLimit, className = "" }: ClientLogoGridProps) {
  const toneClass = tone === "dark" ? "client-logo-grid--dark" : "client-logo-grid--light";
  const dividerClass = dividers === "matrix" ? "client-logo-grid--matrix" : "client-logo-grid--top";

  return (
    <div
      className={`client-logo-grid ${toneClass} ${dividerClass} grid grid-cols-2 gap-0 sm:grid-cols-4 xl:grid-cols-7 xl:grid-rows-4 ${className}`}
      aria-label="Selected clients"
    >
      {clients.map((client, index) => (
        <div
          key={client.name}
          className={`client-logo-cell reveal-motion ${
            mobileLimit !== undefined && index >= mobileLimit ? "hidden xl:flex" : "flex"
          }`}
        >
          <ClientLogo client={client} />
        </div>
      ))}
    </div>
  );
}

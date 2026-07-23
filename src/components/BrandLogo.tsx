import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  tone?: "dark" | "light";
  wordmarkOnly?: boolean;
  priority?: boolean;
  className?: string;
};

/** Shared VINUSPREAD logo asset used by headers and footers. */
export function BrandLogo({
  tone = "dark",
  wordmarkOnly = false,
  priority = false,
  className,
}: BrandLogoProps) {
  const src = tone === "light" ? "/vinus/logo-white.svg" : "/vinus/logo-dark.svg";

  if (wordmarkOnly) {
    return (
      <span
        role="img"
        aria-label="Vinuspread"
        className={cn("block h-6 w-[100px] overflow-hidden bg-no-repeat", className)}
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: "-34px -5px",
          backgroundSize: "134px 30px",
        }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt="Vinuspread"
      width={160}
      height={36}
      priority={priority}
      unoptimized
      className={cn("block h-7 w-[120px] md:h-9 md:w-40", className)}
    />
  );
}

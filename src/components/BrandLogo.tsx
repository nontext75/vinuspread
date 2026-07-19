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
      <span className={cn("block h-6 w-[100px] overflow-hidden", className)}>
        <Image
          src={src}
          alt="Vinuspread"
          width={134}
          height={30}
          priority={priority}
          unoptimized
          className="block h-[30px] w-[134px] max-w-none -translate-x-[34px] -translate-y-[5px]"
        />
      </span>
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

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "body-md group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border font-medium transition-[color,background-color,border-color,transform] duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-vinus-ink/25 focus-visible:ring-offset-2 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-vinus-ink bg-vinus-ink text-white hover:bg-transparent hover:text-vinus-ink",
        outline: "border-vinus-ink/35 bg-transparent text-vinus-ink hover:border-vinus-ink hover:bg-vinus-ink hover:text-white",
        ghost: "border-transparent bg-transparent text-vinus-ink hover:bg-vinus-ink/6",
      },
      size: {
        default: "min-h-12 gap-[var(--space-inline)] px-6 py-3",
        sm: "min-h-10 gap-[var(--space-inline)] px-5 py-2",
        lg: "h-12 gap-[var(--space-inline)] px-6 py-3",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

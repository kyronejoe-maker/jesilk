import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-[background-color,color,border-color,transform,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-ink text-on-ink hover:bg-ink-soft",
        gold: "bg-gold text-on-gold hover:bg-gold-hover",
        outline:
          "border border-ink bg-transparent text-ink hover:bg-ink hover:text-on-ink",
        ghost: "text-ink hover:text-gold",
        underline: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 min-h-10 px-4",
        md: "h-12 min-h-12 px-6",
        lg: "h-14 min-h-14 px-8",
        icon: "size-11 min-h-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };

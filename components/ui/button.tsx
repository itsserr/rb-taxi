import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-navy text-white shadow-navy-glow hover:bg-navy-light hover:shadow-[0_10px_36px_-6px_rgba(59,91,219,0.55)] hover:-translate-y-0.5",
        outline:
          "border border-white/15 bg-transparent text-foreground hover:border-white/35 hover:bg-white/[0.06] hover:-translate-y-0.5",
        ghost: "bg-transparent text-foreground hover:bg-white/5",
        link: "text-navy-light underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

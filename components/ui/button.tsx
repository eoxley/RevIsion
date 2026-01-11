import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

/**
 * Brand-compliant Button component
 *
 * Colors: Azure Blue #3783a5 for primary, Turquoise #37a87b for positive actions
 * NO red, yellow, or purple variants
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            // Primary - Azure Blue
            "bg-azure-500 text-white hover:bg-azure-600":
              variant === "default",
            // Secondary - Turquoise (for positive actions)
            "bg-turquoise-500 text-white hover:bg-turquoise-600":
              variant === "secondary",
            // Outline - neutral border
            "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50":
              variant === "outline",
            // Ghost - subtle hover
            "text-neutral-700 hover:bg-neutral-100": variant === "ghost",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-sm": size === "sm",
            "h-12 px-6 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };

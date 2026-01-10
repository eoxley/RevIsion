/**
 * myrevisionary Logo Component
 *
 * Brand-compliant logo with brain-lightbulb icon and wordmark.
 * "my" in dark blue, "revisionary" in teal-green
 *
 * Usage:
 * - <Logo /> - Full logo with icon and wordmark
 * - <Logo variant="icon" /> - Icon only
 * - <Logo variant="wordmark" /> - Wordmark only
 * - <Logo size="sm" /> - Small variant
 */

import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

// Size configurations
const sizes = {
  sm: { icon: 28, text: "text-lg", gap: "gap-2" },
  md: { icon: 36, text: "text-xl", gap: "gap-2.5" },
  lg: { icon: 44, text: "text-2xl", gap: "gap-3" },
  xl: { icon: 56, text: "text-3xl", gap: "gap-4" },
};

export function Logo({ variant = "full", size = "md", className }: LogoProps) {
  const config = sizes[size];

  return (
    <div className={cn("flex items-center", config.gap, className)}>
      {(variant === "full" || variant === "icon") && (
        <LogoIcon size={config.icon} />
      )}
      {(variant === "full" || variant === "wordmark") && (
        <LogoWordmark size={size} />
      )}
    </div>
  );
}

/**
 * Brain-lightbulb icon - brain inside a lightbulb shape
 */
function LogoIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="myrevisionary logo"
    >
      {/* Lightbulb outline with brain inside */}
      <g>
        {/* Lightbulb body/glass */}
        <path
          d="M32 4C20 4 12 14 12 24C12 32 16 38 20 42V48C20 50 22 52 24 52H40C42 52 44 50 44 48V42C48 38 52 32 52 24C52 14 44 4 32 4Z"
          fill="none"
          stroke="#4A7C9B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Lightbulb base/screw */}
        <rect x="24" y="52" width="16" height="4" rx="1" fill="#4A7C9B" />
        <rect x="26" y="56" width="12" height="3" rx="1" fill="#4A7C9B" />
        <path d="M28 59L28 62" stroke="#4A7C9B" strokeWidth="2" strokeLinecap="round" />
        <path d="M36 59L36 62" stroke="#4A7C9B" strokeWidth="2" strokeLinecap="round" />

        {/* Brain shape inside lightbulb */}
        <g transform="translate(16, 10)">
          {/* Left brain hemisphere */}
          <path
            d="M16 6C12 6 8 8 8 14C6 14 4 16 4 20C4 24 6 26 8 26C8 28 10 30 14 30C18 30 20 28 20 26"
            fill="none"
            stroke="#4A7C9B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Right brain hemisphere */}
          <path
            d="M16 6C20 6 24 8 24 14C26 14 28 16 28 20C28 24 26 26 24 26C24 28 22 30 18 30C14 30 12 28 12 26"
            fill="none"
            stroke="#4A7C9B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Brain fold lines */}
          <path d="M12 12C14 14 14 18 12 20" stroke="#4A7C9B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 12C18 14 18 18 20 20" stroke="#4A7C9B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 8V14" stroke="#4A7C9B" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Wordmark: "my" in dark blue, "revisionary" in teal-green
 */
function LogoWordmark({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const textClasses = {
    sm: "text-lg font-semibold",
    md: "text-xl font-semibold",
    lg: "text-2xl font-bold",
    xl: "text-3xl font-bold",
  };

  return (
    <span className={cn(textClasses[size], "tracking-tight select-none")}>
      <span className="text-[#4A7C9B]">my</span>
      <span className="text-[#3AAA8A]">revisionary</span>
    </span>
  );
}

/**
 * Export individual components for flexibility
 */
export { LogoIcon, LogoWordmark };

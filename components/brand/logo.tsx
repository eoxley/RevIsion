/**
 * revIsion Logo Component
 *
 * Brand-compliant logo with brain icon and wordmark.
 * The capital "I" is distinctly green to match brand guidelines.
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
  sm: { icon: 32, text: "text-lg", gap: "gap-2" },
  md: { icon: 40, text: "text-xl", gap: "gap-2.5" },
  lg: { icon: 48, text: "text-2xl", gap: "gap-3" },
  xl: { icon: 64, text: "text-3xl", gap: "gap-4" },
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
 * Brain icon with gradient, circuit nodes, and checkmark
 */
function LogoIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="revIsion logo"
    >
      <defs>
        {/* Main gradient from green to blue */}
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4abe4c" />
          <stop offset="40%" stopColor="#2ba8b8" />
          <stop offset="100%" stopColor="#1e6aab" />
        </linearGradient>
        {/* Subtle shadow for depth */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Brain shape - cloud-like organic form */}
      <g filter="url(#shadow)">
        {/* Top-left lobe (greenest) */}
        <circle cx="20" cy="18" r="12" fill="url(#brainGradient)" />
        {/* Top-right lobe */}
        <circle cx="44" cy="20" r="11" fill="url(#brainGradient)" />
        {/* Left-middle lobe */}
        <circle cx="14" cy="34" r="10" fill="url(#brainGradient)" />
        {/* Right-middle lobe */}
        <circle cx="50" cy="36" r="10" fill="url(#brainGradient)" />
        {/* Bottom-left lobe */}
        <circle cx="22" cy="48" r="11" fill="url(#brainGradient)" />
        {/* Bottom-right lobe */}
        <circle cx="42" cy="50" r="10" fill="url(#brainGradient)" />
        {/* Center fill */}
        <circle cx="32" cy="34" r="14" fill="url(#brainGradient)" />
      </g>

      {/* Circuit nodes and connections (white) */}
      <g stroke="white" strokeWidth="1.5" fill="white">
        {/* Top connection line */}
        <line x1="26" y1="16" x2="38" y2="22" strokeOpacity="0.6" />
        {/* Middle horizontal connection */}
        <line x1="20" y1="34" x2="44" y2="36" strokeOpacity="0.6" />
        {/* Diagonal connections */}
        <line x1="28" y1="26" x2="22" y2="40" strokeOpacity="0.6" />
        <line x1="36" y1="28" x2="42" y2="42" strokeOpacity="0.6" />

        {/* Circuit nodes (small circles) */}
        <circle cx="26" cy="16" r="3" fillOpacity="0.9" />
        <circle cx="38" cy="22" r="2.5" fillOpacity="0.9" />
        <circle cx="20" cy="34" r="2.5" fillOpacity="0.9" />
        <circle cx="44" cy="36" r="3" fillOpacity="0.9" />
        <circle cx="28" cy="44" r="2.5" fillOpacity="0.9" />
      </g>

      {/* Checkmark (white, bold) */}
      <path
        d="M18 34 L28 44 L48 20"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Wordmark with distinct green capital I
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
      <span className="text-revision-blue-700">rev</span>
      <span className="text-revision-green-500">I</span>
      <span className="text-revision-blue-700">sion</span>
    </span>
  );
}

/**
 * Export individual components for flexibility
 */
export { LogoIcon, LogoWordmark };

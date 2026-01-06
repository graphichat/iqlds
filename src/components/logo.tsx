import { cn } from "@/lib/utils"
import LogoIcon from "@/assets/Logo.svg?react"
import LogoFull from "@/assets/LogoFull.svg?react"

interface LogoProps {
  className?: string
  showText?: boolean
  text?: string // Deprecated: LogoFull.svg contains fixed text, this prop is ignored
  size?: "sm" | "md" | "lg"
}

/**
 * Logo Component
 * 
 * The IQLine logo with optional text display.
 * Gray parts adapt to theme (dark in light mode, white in dark mode).
 * 
 * @example
 * ```tsx
 * <Logo showText={true} size="lg" />
 * ```
 */
export function Logo({ className, showText = false, text: _text, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  }

  return (
    <div className={cn("flex items-center", className)}>
      {showText ? (
        <div className={cn("text-foreground", sizeClasses[size])}>
          <LogoFull className="h-full w-auto" />
        </div>
      ) : (
        <div className={cn("text-foreground", sizeClasses[size])}>
          <LogoIcon className="h-full w-auto" />
        </div>
      )}
    </div>
  )
}


import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

export interface LoadingStateProps {
  message?: string
  size?: "sm" | "md" | "lg"
  variant?: "spinner" | "skeleton" | "dots"
  className?: string
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
}

/**
 * LoadingState - Full-page loading component
 * 
 * Displays a loading indicator for full-page or section-level loading states.
 * 
 * @example
 * ```tsx
 * <LoadingState message="Loading data..." variant="spinner" size="lg" />
 * ```
 */
export function LoadingState({
  message = "Loading...",
  size = "md",
  variant = "spinner",
  className,
}: LoadingStateProps) {
  if (variant === "skeleton") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4 p-8", className)}>
        <div className="space-y-2 w-full max-w-md">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4 p-8", className)}>
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
        </div>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 p-8", className)}>
      <Spinner className={sizeMap[size]} />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}


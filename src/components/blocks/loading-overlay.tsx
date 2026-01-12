import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

export interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  message?: string
  className?: string
  overlayClassName?: string
}

/**
 * LoadingOverlay - Overlay loading component
 * 
 * Displays a loading overlay on top of content. Useful for inline loading states,
 * form submissions, and button actions.
 * 
 * @example
 * ```tsx
 * <LoadingOverlay isLoading={isSubmitting} message="Saving...">
 *   <FormContent />
 * </LoadingOverlay>
 * ```
 */
export function LoadingOverlay({
  isLoading,
  children,
  message,
  className,
  overlayClassName,
}: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-background/80 backdrop-blur-sm",
            overlayClassName
          )}
          aria-label="Loading"
          role="status"
        >
          <Spinner className="h-6 w-6" />
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
      )}
    </div>
  )
}


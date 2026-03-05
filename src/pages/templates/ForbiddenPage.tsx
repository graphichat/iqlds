import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ShieldOff, Home, ArrowLeft } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

interface ForbiddenPageProps {
  title?: string
  description?: string
  showHomeButton?: boolean
  showBackButton?: boolean
  homeButton?: { href?: string; label?: string }
}

/**
 * ForbiddenPage — 403 Access Denied page.
 *
 * Shown when a user tries to access a route they don't have permission for.
 * Standalone page (no AppShell) so it can be used outside authenticated flows.
 *
 * @example
 * ```tsx
 * <ForbiddenPage />
 * ```
 */
export function ForbiddenPage({
  title = "Access Denied",
  description = "You don't have permission to view this page. Contact your administrator if you believe this is an error.",
  showHomeButton = true,
  showBackButton = true,
  homeButton = { href: "/", label: "Go Home" },
}: ForbiddenPageProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <div className="mx-auto max-w-md space-y-8">
        {/* Illustration */}
        <div className="flex justify-center">
          <div className="relative flex size-24 items-center justify-center rounded-2xl bg-destructive/10 ring-8 ring-destructive/5">
            <ShieldOff strokeWidth={ICON_STROKE_WIDTH} className="size-12 text-destructive" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-destructive">
            403 Forbidden
          </p>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {showBackButton && (
            <Button variant="outline" onClick={() => window.history.back()} className="gap-2 w-full sm:w-auto">
              <ArrowLeft strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
              Go Back
            </Button>
          )}
          {showHomeButton && (
            <Button asChild className="gap-2 w-full sm:w-auto">
              <Link to={homeButton.href ?? "/"}>
                <Home strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                {homeButton.label ?? "Go Home"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

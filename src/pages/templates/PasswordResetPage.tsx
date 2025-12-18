import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

/**
 * Password Reset Page Template
 * 
 * A standard password reset page template with email input for password recovery.
 * Features:
 * - Logo/branding area
 * - Muted background for visual hierarchy
 * - Semantic spacing throughout
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <PasswordResetPage 
 *   onReset={(email) => handlePasswordReset(email)}
 *   showLoginLink={true}
 *   loginLink="/login"
 * />
 * ```
 */
interface PasswordResetPageProps {
  onReset?: (email: string) => void
  showLoginLink?: boolean
  loginLink?: string
  logo?: React.ReactNode
  logoText?: string
}

export function PasswordResetPage({
  onReset,
  showLoginLink = true,
  loginLink = "/login",
  logo,
  logoText = "IQ LDS",
}: PasswordResetPageProps) {
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (onReset) {
        await onReset(email)
      } else {
        // Default behavior - replace with your reset logic
        console.log("Password reset requested for:", email)
      }
      setIsSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted py-12 px-6">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Back Link */}
          <div className="flex flex-col items-center space-y-6">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
            >
              ← Back to Home
            </Link>
            
            {/* Logo Area */}
            <div className="flex flex-col items-center space-y-4">
              {logo || (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">IQ</span>
                </div>
              )}
              {logoText && (
                <h1 className="text-2xl font-semibold text-foreground">{logoText}</h1>
              )}
            </div>
          </div>

          {/* Success Card */}
          <Card>
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-semibold">Check your email</CardTitle>
              <CardDescription>
                We've sent a password reset link to {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted p-4 text-center text-sm">
                <p className="text-muted-foreground">
                  If an account exists with this email, you will receive a password reset link.
                  Please check your inbox and follow the instructions.
                </p>
              </div>
              {showLoginLink && (
                <Button variant="outline" className="w-full" asChild>
                  <Link to={loginLink}>
                    <ArrowLeft strokeWidth={ICON_STROKE_WIDTH} className="mr-2 size-4" />
                    Back to login
                  </Link>
                </Button>
              )}
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setIsSubmitted(false)
                  setEmail("")
                }}
              >
                Resend email
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted py-12 px-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Back Link */}
        <div className="flex flex-col items-center space-y-6">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
          >
            ← Back to Home
          </Link>
          
          {/* Logo Area */}
          <div className="flex flex-col items-center space-y-4">
            {logo || (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="text-2xl font-bold">IQ</span>
              </div>
            )}
            {logoText && (
              <h1 className="text-2xl font-semibold text-foreground">{logoText}</h1>
            )}
          </div>
        </div>

        {/* Password Reset Card */}
        <Card>
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold">Reset password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail
                    strokeWidth={ICON_STROKE_WIDTH}
                    className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
              {showLoginLink && (
                <Button variant="ghost" className="w-full" asChild>
                  <Link to={loginLink}>
                    <ArrowLeft strokeWidth={ICON_STROKE_WIDTH} className="mr-2 size-4" />
                    Back to login
                  </Link>
                </Button>
              )}
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  )
}

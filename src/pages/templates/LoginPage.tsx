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
import { Separator } from "@/components/ui/separator"
import { Mail, Lock } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

/**
 * Login Page Template
 * 
 * A standard login page template with email/password fields.
 * Features:
 * - Logo/branding area
 * - Muted background for visual hierarchy
 * - Semantic spacing throughout
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <LoginPage 
 *   onLogin={(email, password) => handleLogin(email, password)}
 *   showSignupLink={true}
 *   signupLink="/signup"
 * />
 * ```
 */
interface LoginPageProps {
  onLogin?: (email: string, password: string) => void
  showSignupLink?: boolean
  signupLink?: string
  showForgotPassword?: boolean
  forgotPasswordLink?: string
  logo?: React.ReactNode
  logoText?: string
}

export function LoginPage({
  onLogin,
  showSignupLink = true,
  signupLink = "/signup",
  showForgotPassword = true,
  forgotPasswordLink = "/forgot-password",
  logo,
  logoText = "IQ LDS",
}: LoginPageProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (onLogin) {
        await onLogin(email, password)
      } else {
        // Default behavior - replace with your auth logic
        console.log("Login:", { email, password })
      }
    } finally {
      setIsLoading(false)
    }
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

        {/* Login Card */}
        <Card>
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {showForgotPassword && (
                    <Link
                      to={forgotPasswordLink}
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock
                    strokeWidth={ICON_STROKE_WIDTH}
                    className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              {showSignupLink && (
                <>
                  <div className="relative w-full">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-card px-3 text-xs text-muted-foreground">
                        OR
                      </span>
                    </div>
                  </div>
                  <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link to={signupLink} className="text-primary hover:underline font-medium">
                      Sign up
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  )
}

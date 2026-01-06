import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Chrome, Github } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { Logo } from "@/components/logo"

/**
 * Signup Page Template
 * 
 * A standard signup/registration page template with email and password fields.
 * Features:
 * - Logo/branding area
 * - Social login options (Google, Facebook, GitHub)
 * - Password visibility toggle
 * - Terms and conditions checkbox
 * - Muted background for visual hierarchy
 * - Semantic spacing throughout
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <SignupPage 
 *   onSignup={(data) => handleSignup(data)}
 *   showLoginLink={true}
 *   loginLink="/login"
 * />
 * ```
 */
interface SignupPageProps {
  onSignup?: (data: {
    email: string
    password: string
    confirmPassword: string
  }) => void
  onGoogleSignup?: () => void
  onFacebookSignup?: () => void
  onGithubSignup?: () => void
  showLoginLink?: boolean
  loginLink?: string
  showSocialLogin?: boolean
  logo?: React.ReactNode
  logoText?: string
}

export function SignupPage({
  onSignup,
  onGoogleSignup,
  onFacebookSignup,
  onGithubSignup,
  showLoginLink = true,
  loginLink = "/login",
  showSocialLogin = true,
  logo,
  logoText = "IQLine",
}: SignupPageProps) {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [acceptTerms, setAcceptTerms] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (!acceptTerms) {
      alert("Please accept the terms and conditions")
      return
    }

    setIsLoading(true)
    
    try {
      if (onSignup) {
        await onSignup({ email, password, confirmPassword })
      } else {
        // Default behavior - navigate to home after signup
        console.log("Signup:", { email, password })
        navigate("/")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const defaultLogo = logo || <Logo showText={true} size="lg" text={logoText} />

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-6 pb-8">
          {/* Logo */}
          {(logo || logoText) && (
            <div className="flex items-center justify-center gap-2">
              {defaultLogo}
            </div>
          )}
          
          {/* Title and Description */}
          <div className="space-y-2 text-center">
            <CardTitle className="text-2xl">Sign Up to IQLine</CardTitle>
            <CardDescription className="text-base">
              Please enter your details to sign up
            </CardDescription>
          </div>

          {/* Social Login Buttons */}
          {showSocialLogin && (
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onGoogleSignup}
                disabled={isLoading || !onGoogleSignup}
              >
                <Chrome strokeWidth={ICON_STROKE_WIDTH} className="size-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onFacebookSignup}
                disabled={isLoading || !onFacebookSignup}
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onGithubSignup}
                disabled={isLoading || !onGithubSignup}
              >
                <Github strokeWidth={ICON_STROKE_WIDTH} className="size-5" />
              </Button>
            </div>
          )}

          {/* Separator */}
          {showSocialLogin && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>
          )}
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address*</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-10"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password*</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                  ) : (
                    <Eye strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password*</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your password again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                  ) : (
                    <Eye strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                disabled={isLoading}
              />
              <Label
                htmlFor="terms"
                className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  privacy policy & terms
                </Link>
              </Label>
            </div>

            {/* Sign Up Button */}
            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign up to IQLine"}
            </Button>

            {/* Login Link */}
            {showLoginLink && (
              <div className="text-center text-sm pt-2">
                Already have an account?{" "}
                <Link to={loginLink} className="text-primary hover:underline font-medium">
                  Log in
                </Link>
              </div>
            )}
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

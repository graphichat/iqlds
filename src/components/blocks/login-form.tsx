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
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Chrome, Github } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void
  onGoogleLogin?: () => void
  onFacebookLogin?: () => void
  onGithubLogin?: () => void
  showSignupLink?: boolean
  signupLink?: string
  showForgotPassword?: boolean
  forgotPasswordLink?: string
  showSocialLogin?: boolean
  showRememberMe?: boolean
  logo?: React.ReactNode
  logoText?: string
}

/**
 * Login Form Block
 * 
 * A reusable login form component with email/password fields, social login options,
 * and remember me checkbox. Matches shadcn/studio login design.
 * 
 * @example
 * ```tsx
 * <LoginForm 
 *   onLogin={(email, password) => handleLogin(email, password)}
 *   showSignupLink={true}
 *   signupLink="/signup"
 * />
 * ```
 */
export function LoginForm({
  onLogin,
  onGoogleLogin,
  onFacebookLogin,
  onGithubLogin,
  showSignupLink = true,
  signupLink = "/signup",
  showForgotPassword = true,
  forgotPasswordLink = "/password-reset",
  showSocialLogin = true,
  showRememberMe = true,
  logo,
  logoText,
}: LoginFormProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)
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
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-6 pb-8">
        {/* Logo */}
        {logo && (
          <div className="flex items-center justify-center gap-2">
            {logo}
            {logoText && (
              <span className="text-lg font-semibold">{logoText}</span>
            )}
          </div>
        )}
        
        {/* Title and Description */}
        <div className="space-y-2 text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription className="text-base">
            Please enter your details to sign in
          </CardDescription>
        </div>

        {/* Social Login Buttons */}
        {showSocialLogin && (
          <div className="grid grid-cols-3 gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onGoogleLogin}
              disabled={isLoading || !onGoogleLogin}
            >
              <Chrome strokeWidth={ICON_STROKE_WIDTH} className="size-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onFacebookLogin}
              disabled={isLoading || !onFacebookLogin}
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onGithubLogin}
              disabled={isLoading || !onGithubLogin}
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

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            {showRememberMe && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  disabled={isLoading}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember Me
                </Label>
              </div>
            )}
            {showForgotPassword && (
              <Link
                to={forgotPasswordLink}
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            )}
          </div>

          {/* Sign In Button */}
          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          {/* Sign Up Link */}
          {showSignupLink && (
            <div className="text-center text-sm pt-2">
              New on our platform?{" "}
              <Link to={signupLink} className="text-primary hover:underline font-medium">
                Create an account
              </Link>
            </div>
          )}
        </CardContent>
      </form>
    </Card>
  )
}


import * as React from "react"
import { useNavigate } from "react-router-dom"
import { LoginForm } from "@/components/blocks/login-form"
import { Logo } from "@/components/logo"

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

export function LoginPage({
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
  logoText = "",
}: LoginPageProps) {
  const navigate = useNavigate()

  const handleLogin = async (email: string, password: string) => {
    if (onLogin) {
      await onLogin(email, password)
    } else {
      // Default behavior - navigate to home after login
      console.log("Login:", { email, password })
      navigate("/")
    }
  }

  const defaultLogo = logo || <Logo showText={true} size="lg" text={logoText} />

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <LoginForm
        onLogin={handleLogin}
        onGoogleLogin={onGoogleLogin}
        onFacebookLogin={onFacebookLogin}
        onGithubLogin={onGithubLogin}
        showSignupLink={showSignupLink}
        signupLink={signupLink}
        showForgotPassword={showForgotPassword}
        forgotPasswordLink={forgotPasswordLink}
        showSocialLogin={showSocialLogin}
        showRememberMe={showRememberMe}
        logo={defaultLogo}
        logoText={logoText}
      />
    </div>
  )
}

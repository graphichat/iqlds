import { createBrowserRouter } from "react-router-dom"
import { AppShell } from "@/components/layouts/app-shell"
import { StarterPage } from "@/pages/StarterPage"
import { LoginPage } from "@/pages/templates/LoginPage"
import { SignupPage } from "@/pages/templates/SignupPage"
import { PasswordResetPage } from "@/pages/templates/PasswordResetPage"
import { NotFoundPage } from "@/pages/templates/NotFoundPage"
import { EdgeCasesDemoPage } from "@/pages/templates/EdgeCasesDemoPage"
import { RouteErrorBoundary } from "@/components/blocks/route-error-boundary"

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <StarterPage /> },
      { path: "/edge-cases", element: <EdgeCasesDemoPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/password-reset",
    element: <PasswordResetPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFoundPage homeButton={{ href: "/", label: "Go Home" }} />,
    errorElement: <RouteErrorBoundary />,
  },
])

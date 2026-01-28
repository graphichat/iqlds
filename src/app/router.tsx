import { createBrowserRouter } from "react-router-dom"
import { AppShell } from "@/components/layouts/app-shell"
import { StarterPage } from "@/pages/StarterPage"
import { 
  LoginPage, 
  SignupPage, 
  PasswordResetPage, 
  NotFoundPage,
  LandingPage,
  DashboardHomePage,
} from "@/pages/templates"
import { RouteErrorBoundary } from "@/components/blocks/route-error-boundary"

/**
 * Application Router Configuration
 * 
 * This is a starter router with common routes. Customize for your app.
 * 
 * Route Types:
 * 1. Public routes (no auth required): LandingPage, LoginPage, etc.
 * 2. Protected routes (inside AppShell): Dashboard, Settings, etc.
 * 3. Error routes: 404, 500, etc.
 */
export const router = createBrowserRouter([
  // Public landing page (optional - remove if app is login-only)
  {
    path: "/welcome",
    element: <LandingPage />,
    errorElement: <RouteErrorBoundary />,
  },
  
  // Protected routes (wrapped in AppShell with sidebar)
  {
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      // Replace StarterPage with DashboardHomePage after implementing auth
      { path: "/", element: <StarterPage /> },
      // Example: Role-based dashboard home
      // { path: "/dashboard", element: <DashboardHomePage user={currentUser} /> },
    ],
  },
  
  // Authentication routes (standalone, no AppShell)
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
  
  // 404 catch-all
  {
    path: "*",
    element: <NotFoundPage homeButton={{ href: "/", label: "Go Home" }} />,
    errorElement: <RouteErrorBoundary />,
  },
])

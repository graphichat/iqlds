import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"
import { AppShell } from "@/components/layouts/app-shell"
import { RouteErrorBoundary } from "@/components/blocks/route-error-boundary"
import { LoadingState } from "@/components/blocks/loading-state"

// Eagerly loaded pages (critical path)
import { HomePage } from "@/pages/HomePage"
import { NotFoundPage } from "@/pages/templates/NotFoundPage"

// Lazily loaded pages (code splitting)
const LoginPage = lazy(() => import("@/pages/templates/LoginPage").then(m => ({ default: m.LoginPage })))
const SignupPage = lazy(() => import("@/pages/templates/SignupPage").then(m => ({ default: m.SignupPage })))
const PasswordResetPage = lazy(() => import("@/pages/templates/PasswordResetPage").then(m => ({ default: m.PasswordResetPage })))
const DashboardPage = lazy(() => import("@/pages/templates/DashboardPage").then(m => ({ default: m.DashboardPage })))
const PageWithTableExample = lazy(() => import("@/pages/templates/PageWithTable").then(m => ({ default: m.PageWithTableExample })))
const ChartsPage = lazy(() => import("@/pages/templates/ChartsPage").then(m => ({ default: m.ChartsPage })))
const FormsPage = lazy(() => import("@/pages/templates/FormsPage").then(m => ({ default: m.FormsPage })))
const CardsPage = lazy(() => import("@/pages/templates/CardsPage").then(m => ({ default: m.CardsPage })))
const SettingsPage = lazy(() => import("@/pages/templates/SettingsPage").then(m => ({ default: m.SettingsPage })))
const TraysPage = lazy(() => import("@/pages/templates/TraysPage").then(m => ({ default: m.TraysPage })))
const ComponentsPage = lazy(() => import("@/pages/templates/ComponentsPage").then(m => ({ default: m.ComponentsPage })))
const LayoutsPage = lazy(() => import("@/pages/templates/LayoutsPage").then(m => ({ default: m.LayoutsPage })))
const ThemesPage = lazy(() => import("@/pages/templates/ThemesPage").then(m => ({ default: m.ThemesPage })))
const EdgeCasesDemoPage = lazy(() => import("@/pages/templates/EdgeCasesDemoPage").then(m => ({ default: m.EdgeCasesDemoPage })))
const CalendarPage = lazy(() => import("@/pages/templates/CalendarPage").then(m => ({ default: m.CalendarPage })))

/**
 * Suspense wrapper for lazy-loaded pages
 */
function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingState message="Loading page..." size="lg" className="min-h-[50vh]" />}>
      {children}
    </Suspense>
  )
}

/**
 * Application Router Configuration
 * 
 * Uses React.lazy for code splitting to reduce initial bundle size.
 * Critical pages (HomePage, NotFoundPage) are eagerly loaded.
 * Other pages are lazily loaded on demand.
 */
export const router = createBrowserRouter([
  {
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <LazyPage><DashboardPage /></LazyPage> },
      { path: "/table", element: <LazyPage><PageWithTableExample /></LazyPage> },
      { path: "/charts", element: <LazyPage><ChartsPage /></LazyPage> },
      { path: "/forms", element: <LazyPage><FormsPage /></LazyPage> },
      { path: "/cards", element: <LazyPage><CardsPage /></LazyPage> },
      { path: "/settings", element: <LazyPage><SettingsPage /></LazyPage> },
      { path: "/trays", element: <LazyPage><TraysPage /></LazyPage> },
      { path: "/components", element: <LazyPage><ComponentsPage /></LazyPage> },
      { path: "/layouts", element: <LazyPage><LayoutsPage /></LazyPage> },
      { path: "/themes", element: <LazyPage><ThemesPage /></LazyPage> },
      { path: "/edge-cases", element: <LazyPage><EdgeCasesDemoPage /></LazyPage> },
      { path: "/calendar", element: <LazyPage><CalendarPage /></LazyPage> },
    ],
  },
  {
    path: "/login",
    element: <LazyPage><LoginPage /></LazyPage>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/signup",
    element: <LazyPage><SignupPage /></LazyPage>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/password-reset",
    element: <LazyPage><PasswordResetPage /></LazyPage>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFoundPage homeButton={{ href: "/", label: "Go Home" }} />,
    errorElement: <RouteErrorBoundary />,
  },
])

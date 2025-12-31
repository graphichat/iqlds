import { createBrowserRouter } from "react-router-dom"
import { AppShell } from "@/components/layouts/app-shell"
import { HomePage } from "@/pages/HomePage"
import { LoginPage } from "@/pages/templates/LoginPage"
import { SignupPage } from "@/pages/templates/SignupPage"
import { PasswordResetPage } from "@/pages/templates/PasswordResetPage"
import { NotFoundPage } from "@/pages/templates/NotFoundPage"
import { DashboardPage } from "@/pages/templates/DashboardPage"
import { PageWithTableExample } from "@/pages/templates/PageWithTable"
import { ChartsPage } from "@/pages/templates/ChartsPage"
import { FormsPage } from "@/pages/templates/FormsPage"
import { CardsPage } from "@/pages/templates/CardsPage"
import { SettingsPage } from "@/pages/templates/SettingsPage"
import { TraysPage } from "@/pages/templates/TraysPage"
import { ComponentsPage } from "@/pages/templates/ComponentsPage"

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/table", element: <PageWithTableExample /> },
      { path: "/charts", element: <ChartsPage /> },
      { path: "/forms", element: <FormsPage /> },
      { path: "/cards", element: <CardsPage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/trays", element: <TraysPage /> },
      { path: "/components", element: <ComponentsPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/password-reset",
    element: <PasswordResetPage />,
  },
  {
    path: "*",
    element: <NotFoundPage homeButton={{ href: "/", label: "Go Home" }} />,
  },
])


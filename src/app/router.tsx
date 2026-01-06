import { createBrowserRouter, Navigate } from "react-router-dom"
import { AppShell } from "@/components/layouts/app-shell"
import { StarterPage } from "@/pages/StarterPage"
import { LoginPage } from "@/pages/templates/LoginPage"
import { SignupPage } from "@/pages/templates/SignupPage"
import { PasswordResetPage } from "@/pages/templates/PasswordResetPage"
import { NotFoundPage } from "@/pages/templates/NotFoundPage"

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <StarterPage /> },
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
    path: "/forgot-password",
    element: <Navigate to="/password-reset" replace />,
  },
  {
    path: "*",
    element: <NotFoundPage homeButton={{ href: "/", label: "Go Home" }} />,
  },
])


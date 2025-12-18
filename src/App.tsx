import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "@/pages/HomePage"
import { LoginPage } from "@/pages/templates/LoginPage"
import { SignupPage } from "@/pages/templates/SignupPage"
import { PasswordResetPage } from "@/pages/templates/PasswordResetPage"
import { DefaultPageWithSidebar } from "@/pages/templates/DefaultPageWithSidebar"
import { PageWithTable, PageWithTableExample } from "@/pages/templates/PageWithTable"
import { ChartsPage } from "@/pages/templates/ChartsPage"
import { FormsPage } from "@/pages/templates/FormsPage"
import { CardsPage } from "@/pages/templates/CardsPage"
import { SettingsPage } from "@/pages/templates/SettingsPage"
import { DashboardPage } from "@/pages/templates/DashboardPage"
import { TraysPage } from "@/pages/templates/TraysPage"
import { Button } from "@/components/ui/button"
import { Home, File, BarChart3, User, Settings, TrendingUp, FileText, CreditCard } from "lucide-react"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/table" element={<PageWithTableExample />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/trays" element={<TraysPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

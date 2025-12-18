import { Home, BarChart3, File, Settings, TrendingUp, FileText, CreditCard, Grid3x3 } from "lucide-react"

export const SIDEBAR_ITEMS = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "Dashboard",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    label: "Analytics",
    icon: TrendingUp,
    href: "/charts",
  },
  {
    label: "Forms",
    icon: FileText,
    href: "/forms",
  },
  {
    label: "Cards",
    icon: CreditCard,
    href: "/cards",
  },
  {
    label: "Table",
    icon: File,
    href: "/table",
  },
  {
    label: "Trays",
    icon: Grid3x3,
    href: "/trays",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
] as const


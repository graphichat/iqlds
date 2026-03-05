import type { LucideIcon } from "lucide-react"
import {
  Home,
  BarChart3,
  File,
  Settings,
  TrendingUp,
  FileText,
  CreditCard,
  Grid3x3,
  AlertTriangle,
  Calendar,
  BookOpen,
  Layout,
  Search,
  User,
  Shield,
  Bell,
  Palette,
} from "lucide-react"

/**
 * Sidebar Navigation Item Type
 */
export interface SidebarItem {
  /** Display label for the menu item */
  label: string
  /** Lucide icon component */
  icon: LucideIcon
  /** Navigation href (optional - items without href are non-clickable) */
  href?: string
  /** Optional badge text (e.g., "New", "3") */
  badge?: string
  /** Optional roles that can see this item (empty = all roles) */
  roles?: string[]
  /** Optional flag to mark item as disabled */
  disabled?: boolean
  /** Optional child items for nested/collapsible navigation */
  children?: SidebarItem[]
}

/**
 * Sidebar Group Type
 */
export interface SidebarGroup {
  /** Group label displayed above items */
  label: string
  /** Items in this group */
  items: SidebarItem[]
  /** Optional roles that can see this group */
  roles?: string[]
}

/**
 * Grouped sidebar navigation — consumed by GlobalSidebar
 */
export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    label: "Main",
    items: [
      { label: "Home", icon: Home, href: "/" },
      { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
      { label: "Search", icon: Search, href: "/search" },
    ],
  },
  {
    label: "Data & Content",
    items: [
      { label: "Analytics", icon: TrendingUp, href: "/charts" },
      { label: "Table", icon: File, href: "/table" },
      { label: "Cards", icon: CreditCard, href: "/cards" },
      { label: "Calendar", icon: Calendar, href: "/calendar" },
    ],
  },
  {
    label: "Forms & Layouts",
    items: [
      { label: "Forms", icon: FileText, href: "/forms" },
      { label: "Layouts", icon: Layout, href: "/layouts" },
      { label: "Trays", icon: Grid3x3, href: "/trays" },
    ],
  },
  {
    label: "Design System",
    items: [
      {
        label: "Components",
        icon: Palette,
        href: "/components",
        children: [
          { label: "UI Components", icon: Palette, href: "/components" },
          { label: "Themes", icon: Palette, href: "/themes" },
          { label: "Edge Cases", icon: AlertTriangle, href: "/edge-cases" },
        ],
      },
      { label: "Documentation", icon: BookOpen, href: "/docs" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", icon: User, href: "/profile" },
      {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        children: [
          { label: "General", icon: Settings, href: "/settings" },
          { label: "Security", icon: Shield, href: "/settings/security" },
          { label: "Notifications", icon: Bell, href: "/settings/notifications" },
        ],
      },
    ],
  },
]

/**
 * Flat list of all sidebar items (used for breadcrumb lookups, etc.)
 */
export const SIDEBAR_ITEMS: SidebarItem[] = SIDEBAR_GROUPS.flatMap((g) =>
  g.items.flatMap((item) => [item, ...(item.children ?? [])])
)

/**
 * Helper: filter sidebar groups by user role
 */
export function filterSidebarGroupsByRole(
  groups: SidebarGroup[],
  userRole?: string
): SidebarGroup[] {
  if (!userRole) return groups

  return groups
    .filter((group) => {
      if (!group.roles || group.roles.length === 0) return true
      return group.roles.includes(userRole)
    })
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (!item.roles || item.roles.length === 0) return true
        return item.roles.includes(userRole)
      }),
    }))
    .filter((group) => group.items.length > 0)
}

/**
 * Helper: filter sidebar items by user role (kept for backwards compatibility)
 */
export function filterSidebarItemsByRole(items: SidebarItem[], userRole?: string): SidebarItem[] {
  if (!userRole) return items
  return items.filter((item) => {
    if (!item.roles || item.roles.length === 0) return true
    return item.roles.includes(userRole)
  })
}

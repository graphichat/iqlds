import type { LucideIcon } from "lucide-react"
import { Home, BarChart3, File, Settings, TrendingUp, FileText, CreditCard, Grid3x3, AlertTriangle } from "lucide-react"

/**
 * Sidebar Navigation Item Type
 * 
 * Defines the structure for sidebar navigation items with optional
 * role-based access control and badges.
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
  /** Optional child items for nested navigation */
  children?: SidebarItem[]
}

/**
 * Sidebar Group Type
 * 
 * Groups sidebar items under a common label.
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
 * Main navigation items for the sidebar
 */
export const SIDEBAR_ITEMS: SidebarItem[] = [
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
    label: "Edge Cases",
    icon: AlertTriangle,
    href: "/edge-cases",
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
]

/**
 * Helper function to filter sidebar items by user role
 */
export function filterSidebarItemsByRole(items: SidebarItem[], userRole?: string): SidebarItem[] {
  if (!userRole) return items
  
  return items.filter(item => {
    if (!item.roles || item.roles.length === 0) return true
    return item.roles.includes(userRole)
  })
}

/**
 * Helper function to filter sidebar groups by user role
 */
export function filterSidebarGroupsByRole(groups: SidebarGroup[], userRole?: string): SidebarGroup[] {
  if (!userRole) return groups
  
  return groups
    .filter(group => {
      if (!group.roles || group.roles.length === 0) return true
      return group.roles.includes(userRole)
    })
    .map(group => ({
      ...group,
      items: filterSidebarItemsByRole(group.items, userRole),
    }))
    .filter(group => group.items.length > 0)
}



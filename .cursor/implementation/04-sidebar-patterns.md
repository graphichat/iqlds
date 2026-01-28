# Sidebar Patterns

This document covers sidebar configuration, customization, and advanced patterns including tenant/workspace switching.

---

## Sidebar Structure

The `GlobalSidebar` component follows shadcn's sidebar pattern:

```
Sidebar
├── SidebarHeader (logo, branding, tenant switcher)
├── SidebarContent (navigation groups)
│   └── SidebarGroup
│       ├── SidebarGroupLabel
│       └── SidebarMenu
│           └── SidebarMenuItem
│               └── SidebarMenuButton
└── SidebarFooter (user info, settings)
```

---

## Basic Configuration

### Sidebar Items

Configure in `src/lib/sidebar-config.ts`:

```tsx
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText,
  FolderOpen,
  type LucideIcon 
} from "lucide-react"

interface SidebarItem {
  label: string
  icon: LucideIcon
  href: string
}

export const SIDEBAR_ITEMS: readonly SidebarItem[] = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { label: "Users", icon: Users, href: "/users" },
  { label: "Documents", icon: FileText, href: "/documents" },
  { label: "Projects", icon: FolderOpen, href: "/projects" },
  { label: "Settings", icon: Settings, href: "/settings" },
] as const
```

### Grouped Navigation

For sections with labels:

```tsx
interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

export const SIDEBAR_GROUPS: readonly SidebarGroup[] = [
  {
    label: "Main",
    items: [
      { label: "Home", icon: Home, href: "/" },
      { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Users", icon: Users, href: "/users" },
      { label: "Projects", icon: FolderOpen, href: "/projects" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", icon: Settings, href: "/settings" },
    ],
  },
] as const
```

Then update `GlobalSidebar` to render groups:

```tsx
<SidebarContent>
  {SIDEBAR_GROUPS.map((group) => (
    <SidebarGroup key={group.label}>
      <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild tooltip={item.label}>
                <Link to={item.href}>
                  <item.icon strokeWidth={ICON_STROKE_WIDTH} />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ))}
</SidebarContent>
```

---

## Tenant/Workspace Switcher

A common pattern for multi-tenant applications is a workspace switcher in the sidebar header.

### Complete Tenant Switcher Example

Create a tenant switcher component:

```tsx
// src/components/blocks/tenant-switcher.tsx
import * as React from "react"
import { ChevronsUpDown, Plus, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

interface Tenant {
  id: string
  name: string
  slug: string
  logo?: string
  plan?: "free" | "pro" | "enterprise"
}

interface TenantSwitcherProps {
  tenants: Tenant[]
  currentTenant: Tenant
  onTenantChange: (tenant: Tenant) => void
  onCreateTenant?: () => void
}

export function TenantSwitcher({
  tenants,
  currentTenant,
  onTenantChange,
  onCreateTenant,
}: TenantSwitcherProps) {
  const { isMobile, state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {currentTenant.logo ? (
                  <AvatarImage src={currentTenant.logo} alt={currentTenant.name} />
                ) : null}
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                  {currentTenant.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {currentTenant.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {currentTenant.plan || "Free"}
                    </span>
                  </div>
                  <ChevronsUpDown 
                    strokeWidth={ICON_STROKE_WIDTH} 
                    className="ml-auto size-4 shrink-0 opacity-50" 
                  />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {tenants.map((tenant) => (
              <DropdownMenuItem
                key={tenant.id}
                onClick={() => onTenantChange(tenant)}
                className="gap-2 p-2"
              >
                <Avatar className="h-6 w-6 rounded-md">
                  {tenant.logo ? (
                    <AvatarImage src={tenant.logo} alt={tenant.name} />
                  ) : null}
                  <AvatarFallback className="rounded-md bg-muted text-xs">
                    {tenant.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate">{tenant.name}</span>
                {tenant.id === currentTenant.id && (
                  <Check 
                    strokeWidth={ICON_STROKE_WIDTH} 
                    className="size-4 shrink-0" 
                  />
                )}
              </DropdownMenuItem>
            ))}
            {onCreateTenant && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onCreateTenant} className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus 
                      strokeWidth={ICON_STROKE_WIDTH} 
                      className="size-4" 
                    />
                  </div>
                  <span className="font-medium text-muted-foreground">
                    Create workspace
                  </span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
```

### Using the Tenant Switcher

Pass it to `AppShell` via `sidebarHeader`:

```tsx
// In your App.tsx or layout component
import { TenantSwitcher } from "@/components/blocks/tenant-switcher"

function App() {
  const { tenants, currentTenant, switchTenant } = useTenants()
  
  const handleTenantChange = (tenant: Tenant) => {
    switchTenant(tenant.id)
    // Optionally navigate to tenant's dashboard
    navigate(`/workspaces/${tenant.slug}/dashboard`)
  }

  return (
    <AppShell
      sidebarHeader={
        <TenantSwitcher
          tenants={tenants}
          currentTenant={currentTenant}
          onTenantChange={handleTenantChange}
          onCreateTenant={() => navigate("/create-workspace")}
        />
      }
    />
  )
}
```

### Tenant-Aware Routing

Structure routes for multi-tenant:

```tsx
export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      // Tenant-scoped routes
      {
        path: "/workspaces/:workspaceSlug",
        element: <WorkspaceLayout />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "users", element: <UsersPage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
      // Global routes
      { path: "/account", element: <AccountPage /> },
    ],
  },
])

// WorkspaceLayout provides tenant context
function WorkspaceLayout() {
  const { workspaceSlug } = useParams()
  const workspace = useWorkspace(workspaceSlug)
  
  return (
    <WorkspaceContext.Provider value={workspace}>
      <Outlet />
    </WorkspaceContext.Provider>
  )
}
```

---

## Custom Sidebar Header

Replace the default logo with custom content:

```tsx
// Custom header with logo and project name
<AppShell
  sidebarHeader={
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">A</span>
            </div>
            <div className="grid text-left text-sm leading-tight">
              <span className="font-semibold">Acme Inc</span>
              <span className="text-xs text-muted-foreground">Enterprise</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  }
/>
```

---

## Custom Sidebar Footer

Replace the default user info with custom content:

```tsx
// User menu with dropdown
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function UserFooter({ user, onLogout }: UserFooterProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

// Usage
<AppShell
  sidebarFooter={<UserFooter user={currentUser} onLogout={handleLogout} />}
/>
```

---

## Role-Based Sidebar

Filter items based on user role:

```tsx
// lib/sidebar-config.ts
interface SidebarItem {
  label: string
  icon: LucideIcon
  href: string
  roles?: string[]  // If undefined, visible to all
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { label: "Users", icon: Users, href: "/users", roles: ["admin"] },
  { label: "Analytics", icon: TrendingUp, href: "/analytics", roles: ["admin", "manager"] },
  { label: "Settings", icon: Settings, href: "/settings" },
]

// Hook to get filtered items
export function useSidebarItems() {
  const { user } = useAuth()
  
  return SIDEBAR_ITEMS.filter((item) => {
    if (!item.roles) return true
    return item.roles.includes(user.role)
  })
}
```

Use in sidebar:

```tsx
export function GlobalSidebar() {
  const sidebarItems = useSidebarItems()
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild tooltip={item.label}>
                  <Link to={item.href}>
                    <item.icon strokeWidth={ICON_STROKE_WIDTH} />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
```

---

## Sidebar with Badges/Notifications

Add badges to sidebar items:

```tsx
<SidebarMenuItem>
  <SidebarMenuButton asChild tooltip="Messages">
    <Link to="/messages">
      <Mail strokeWidth={ICON_STROKE_WIDTH} />
      <span>Messages</span>
    </Link>
  </SidebarMenuButton>
  <SidebarMenuBadge>5</SidebarMenuBadge>
</SidebarMenuItem>
```

---

## Sidebar with Submenus

For nested navigation:

```tsx
<SidebarGroup>
  <SidebarGroupLabel>Settings</SidebarGroupLabel>
  <SidebarMenu>
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip="Settings">
            <Settings strokeWidth={ICON_STROKE_WIDTH} />
            <span>Settings</span>
            <ChevronRight 
              className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" 
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link to="/settings/general">General</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link to="/settings/security">Security</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link to="/settings/billing">Billing</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  </SidebarMenu>
</SidebarGroup>
```

---

## Sidebar Keyboard Shortcuts

The sidebar has built-in keyboard support:

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + B` | Toggle sidebar |
| `Tab` | Navigate items |
| `Enter` | Activate focused item |

---

## Sidebar State Persistence

The sidebar state is automatically persisted via cookie:

```tsx
// In sidebar.tsx
const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7  // 7 days

// State is read from cookie on mount
// State is saved to cookie on change
```

---

## Related Documentation

- [Navigation Patterns](./03-navigation-patterns.md) - Overall navigation guide
- [Component Usage](./01-component-usage.md) - When to use which component
- [Layout Patterns](./05-layout-patterns.md) - AppShell and layouts

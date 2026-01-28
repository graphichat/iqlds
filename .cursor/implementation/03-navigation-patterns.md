# Navigation Patterns

This document covers all navigation patterns including tabs, breadcrumbs, back navigation, and routing.

---

## Navigation Hierarchy

```
AppShell
├── GlobalSidebar (primary navigation)
│   └── Sidebar items → Routes
│
├── GlobalHeader
│   ├── Breadcrumbs (location awareness)
│   ├── Theme toggle
│   └── User menu
│
└── Page Content
    ├── PageTabs (secondary navigation within page)
    └── BackButton (contextual back navigation)
```

---

## Sidebar Navigation

### Configuration

Sidebar items are configured in `src/lib/sidebar-config.ts`:

```tsx
import { Home, BarChart3, Users, Settings, FileText } from "lucide-react"

export const SIDEBAR_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { label: "Users", icon: Users, href: "/users" },
  { label: "Documents", icon: FileText, href: "/documents" },
  { label: "Settings", icon: Settings, href: "/settings" },
] as const
```

### Adding a New Sidebar Item

1. Import the icon from `lucide-react`
2. Add the item object with `label`, `icon`, and `href`
3. Order matters - items appear in order defined

```tsx
// Adding a new item
export const SIDEBAR_ITEMS = [
  // existing items...
  { 
    label: "Analytics",  // Display text
    icon: TrendingUp,    // Lucide icon component
    href: "/analytics",  // Route path
  },
] as const
```

### Sidebar Features

The `GlobalSidebar` component provides:

- **Collapsible**: Toggles between expanded and icon-only mode
- **Keyboard shortcut**: `Cmd/Ctrl + B` toggles sidebar
- **Mobile**: Opens as a Sheet overlay
- **Persistence**: State saved to cookie
- **Tooltips**: Shows labels when collapsed

---

## Tab Navigation

### When to Use Tabs

Use tabs when:
- Page has multiple related views
- User needs to switch context without leaving page
- Content sections are mutually exclusive

Do NOT use tabs when:
- Sections are visible simultaneously
- User needs to see all content at once
- There are more than 5-6 tabs (use different pattern)

### Tab Patterns

#### Controlled Tabs (Recommended)

```tsx
import * as React from "react"
import { PageHeaderWithTabs } from "@/components/patterns/page-header-with-tabs"

export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("general")

  return (
    <PageShell>
      <PageHeaderWithTabs
        title="Settings"
        tabs={[
          { value: "general", label: "General" },
          { value: "security", label: "Security" },
          { value: "notifications", label: "Notifications" },
        ]}
        value={activeTab}
        onValueChange={setActiveTab}
      />
      <div className="flex-1 overflow-auto p-6">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "notifications" && <NotificationSettings />}
      </div>
    </PageShell>
  )
}
```

#### URL-Synced Tabs

For shareable tab state, sync with URL:

```tsx
import { useSearchParams } from "react-router-dom"

export function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "general"

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value })
  }

  return (
    <PageShell>
      <PageHeaderWithTabs
        title="Settings"
        tabs={[
          { value: "general", label: "General" },
          { value: "security", label: "Security" },
        ]}
        value={activeTab}
        onValueChange={handleTabChange}
      />
      {/* Content based on activeTab */}
    </PageShell>
  )
}
```

#### Standalone PageTabs

When you need tabs without PageHeader:

```tsx
import { PageTabs } from "@/components/blocks/page-tabs"

<PageTabs
  tabs={[
    { value: "overview", label: "Overview" },
    { value: "details", label: "Details" },
  ]}
  value={activeTab}
  onValueChange={setActiveTab}
/>
```

### Tab Styling

The `PageTabs` component uses line-style tabs:

```tsx
// PageTabs uses TabsList with variant="line"
<TabsList variant="line" className="h-9">
  <TabsTrigger value="overview">Overview</TabsTrigger>
</TabsList>
```

---

## Back Navigation

### When to Use BackButton

Use back navigation when:
- User drilled into a detail view
- Page is part of a flow (wizard, multi-step)
- Context makes "going back" meaningful

### BackButton Modes

```tsx
import { BackButton } from "@/components/blocks/back-button"

// Browser history back (default)
<BackButton />

// Navigate to specific path
<BackButton href="/users" />

// Custom click handler
<BackButton onClick={() => handleClose()} />

// With label (optional)
<BackButton label="Back to list" />
```

### Using PageHeaderWithBack

```tsx
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"

<PageHeaderWithBack
  title="User Details"
  backButton={{ href: "/users" }}
  actions={<Button>Edit</Button>}
/>

// Using history back
<PageHeaderWithBack
  title="Edit Mode"
  backButton={{}}  // Empty object = history back
  actions={<Button>Save</Button>}
/>
```

### Back Navigation Best Practices

1. **Explicit paths over history** when possible:
   ```tsx
   // Better - predictable destination
   <BackButton href="/users" />
   
   // Less predictable - depends on navigation history
   <BackButton />
   ```

2. **Maintain context in URL**:
   ```tsx
   // If coming from /users/123?filter=active
   // Back should go to /users?filter=active
   <BackButton href={`/users${location.search}`} />
   ```

3. **Warn before leaving unsaved changes**:
   ```tsx
   const handleBack = () => {
     if (hasUnsavedChanges) {
       setShowConfirmDialog(true)
     } else {
       navigate("/users")
     }
   }
   
   <BackButton onClick={handleBack} />
   ```

---

## Breadcrumbs

### Automatic Breadcrumbs

The `GlobalHeader` auto-generates breadcrumbs from the current route:

```
/dashboard/settings/security
→ Home > Dashboard > Settings > Security
```

### Navigation Utilities

Use utilities from `lib/navigation.ts`:

```tsx
import { 
  generateBreadcrumbs, 
  isActiveRoute, 
  formatPathSegment,
  buildPath 
} from "@/lib/navigation"

// Generate breadcrumbs
generateBreadcrumbs("/dashboard/settings")
// → [{ label: "Home", href: "/" }, { label: "Dashboard", href: "/dashboard" }, { label: "Settings" }]

// Check active route
isActiveRoute("/dashboard/settings", "/dashboard")  // true
isActiveRoute("/dashboard/settings", "/dashboard", true)  // false (exact)

// Format path segment
formatPathSegment("user-settings")  // "User Settings"

// Build paths safely
buildPath("dashboard", "settings")  // "/dashboard/settings"
```

### Custom Breadcrumbs

Override auto-generated breadcrumbs:

```tsx
<AppShell
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Users", href: "/users" },
    { label: "John Doe" },  // No href = current page
  ]}
/>
```

---

## Routing Patterns

### Basic Routes

```tsx
// src/app/router.tsx
export const router = createBrowserRouter([
  {
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/users", element: <UsersPage /> },
      { path: "/users/:userId", element: <UserDetailPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
])
```

### Nested Routes

For pages with sub-sections:

```tsx
{
  path: "/settings",
  element: <SettingsLayout />,
  children: [
    { path: "", element: <GeneralSettings /> },
    { path: "security", element: <SecuritySettings /> },
    { path: "billing", element: <BillingSettings /> },
  ],
}
```

### Protected Routes

Wrap with auth guard:

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

// Usage
{
  element: <ProtectedRoute><AppShell /></ProtectedRoute>,
  children: [/* protected routes */],
}
```

### Standalone Routes (No AppShell)

Auth pages render outside AppShell:

```tsx
export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [/* protected routes */],
  },
  // Standalone pages
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
    path: "*",
    element: <NotFoundPage homeButton={{ href: "/", label: "Go Home" }} />,
  },
])
```

---

## Navigation Decision Tree

```
User needs to navigate...

├─ To a different section of the app?
│  └─ Use Sidebar navigation
│
├─ To a different view within current page?
│  └─ Use Tabs (PageTabs or PageHeaderWithTabs)
│
├─ To a detail/child page?
│  └─ Use Link/navigate to route
│
├─ Back to parent page?
│  └─ Use BackButton in PageHeaderWithBack
│
├─ To an action that shows temporary content?
│  └─ Use Dialog or Sheet (not navigation)
│
└─ To external resource?
   └─ Use <a href="..." target="_blank">
```

---

## Mobile Navigation

### Sidebar on Mobile

On mobile (`< 768px`):
- Sidebar renders as a Sheet
- Triggered by hamburger menu in GlobalHeader
- Closes on link click

### Responsive Tab Behavior

For many tabs, consider:

```tsx
// ScrollArea for horizontal overflow
<div className="overflow-x-auto">
  <PageTabs tabs={manyTabs} ... />
</div>

// Or use Sheet/dropdown on mobile
const isMobile = useIsMobile()

{isMobile ? (
  <Select value={activeTab} onValueChange={setActiveTab}>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {tabs.map((tab) => (
        <SelectItem key={tab.value} value={tab.value}>
          {tab.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
) : (
  <PageTabs tabs={tabs} value={activeTab} onValueChange={setActiveTab} />
)}
```

---

## Keyboard Navigation

Built-in keyboard support:

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + B` | Toggle sidebar |
| `Tab` | Navigate focusable elements |
| `Arrow keys` | Navigate within tabs/menus |
| `Enter/Space` | Activate focused element |
| `Escape` | Close dialogs/sheets |

---

## Related Documentation

- [Sidebar Patterns](./04-sidebar-patterns.md) - Advanced sidebar configuration
- [Page Creation](./02-page-creation.md) - Creating pages with navigation
- [Component Usage](./01-component-usage.md) - When to use which component

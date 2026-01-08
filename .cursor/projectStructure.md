# Shadcn-style Vite App Layout System (Canonical Guide)

This document is a **single source of truth** for AI agents and developers to understand how to structure a **Vite + React + shadcn-style application** with:

* Global Left Navigation (collapsible sidebar)
* Global Header with breadcrumbs and user menu
* Optional Global Footer
* Page-level Header + Body
* Optional Tabs under header
* Optional second left sidebar
* Optional right-side Properties Panel
* Resizable split content layouts
* Stack-based navigation with Back behavior
* Error boundaries for graceful error handling
* Theming with OKLCH color system

The goal is **clarity, composability, and long-term scalability**.

---

## 1. Core Philosophy (Non-negotiable)

These rules must always be respected.

1. **`ui/` = primitives only**
   Buttons, inputs, dropdowns, tables. No layout, no routing, no business logic.

2. **`blocks/` = reusable sections**
   Headers, sidebars, tabs, footers, page headers, forms, error boundaries.

3. **`layouts/` = structural composition**
   App shell, page shell, split panes, multi-column layouts.

4. **`patterns/` = repeatable compositions**
   Header + tabs, header + back button, etc.

5. **Pages only compose**
   Pages do not define layout rules. They only assemble layouts, blocks, and patterns.

6. **Routing handles navigation stacks**
   Layout never handles navigation state.

7. **Error boundaries at route level**
   Use `RouteErrorBoundary` for route-level errors, `ErrorBoundary` for component-level.

---

## 2. Canonical Folder Structure (Vite)

```
src/
├─ app/
│  ├─ App.tsx                    # Root app composition
│  └─ router.tsx                 # React Router configuration
│
├─ assets/
│  ├─ Logo.svg                   # Application logo
│  └─ page_not_found.svg         # 404 illustration
│
├─ components/
│  ├─ ui/                        # shadcn primitives (50+ components)
│  │  ├─ accordion.tsx
│  │  ├─ alert.tsx
│  │  ├─ avatar.tsx
│  │  ├─ badge.tsx
│  │  ├─ button.tsx
│  │  ├─ card.tsx
│  │  ├─ chart.tsx
│  │  ├─ dialog.tsx
│  │  ├─ dropdown-menu.tsx
│  │  ├─ input.tsx
│  │  ├─ resizable.tsx
│  │  ├─ scroll-area.tsx
│  │  ├─ separator.tsx
│  │  ├─ sheet.tsx
│  │  ├─ sidebar.tsx
│  │  ├─ sonner.tsx
│  │  ├─ table.tsx
│  │  ├─ tabs.tsx
│  │  └─ ...
│  │
│  ├─ blocks/                    # Reusable sections
│  │  ├─ back-button.tsx         # Navigation back button
│  │  ├─ data-table.tsx          # Advanced data table with sorting/filtering
│  │  ├─ error-boundary.tsx      # React error boundary component
│  │  ├─ global-footer.tsx       # Application footer
│  │  ├─ global-header.tsx       # Application header with breadcrumbs
│  │  ├─ global-sidebar.tsx      # Collapsible navigation sidebar
│  │  ├─ login-form.tsx          # Login form block
│  │  ├─ metric-card.tsx         # KPI/metric display card
│  │  ├─ page-header.tsx         # Page-level header
│  │  ├─ page-tabs.tsx           # Page-level tabs
│  │  ├─ password-reset-form.tsx # Password reset form block
│  │  └─ route-error-boundary.tsx # React Router error boundary
│  │
│  ├─ layouts/                   # Structural layouts
│  │  ├─ app-shell.tsx           # Main application frame
│  │  ├─ page-shell.tsx          # Base page container
│  │  ├─ page-with-properties.tsx # Content + properties panel
│  │  ├─ split-layout.tsx        # Simple split layout (legacy)
│  │  ├─ two-column-layout.tsx   # Advanced resizable two-column
│  │  └─ three-column-layout.tsx # Three-column with properties
│  │
│  ├─ patterns/                  # Composition recipes
│  │  ├─ page-header-with-tabs.tsx
│  │  └─ page-header-with-back.tsx
│  │
│  └─ theme-toggle.tsx           # Theme switcher component
│
├─ hooks/
│  └─ use-mobile.ts              # Mobile detection hook
│
├─ lib/
│  ├─ constants.ts               # Design system constants
│  ├─ navigation.ts              # Navigation utilities
│  ├─ sidebar-config.ts          # Sidebar navigation config
│  ├─ theme-manager.ts           # Theme management utilities
│  └─ utils.ts                   # Utility functions (cn, etc.)
│
├─ pages/
│  ├─ HomePage.tsx               # Landing page
│  └─ modules
│     └─ ...
│
├─ styles/
│  └─ radix-nova.css             # Theme CSS with OKLCH colors
│
├─ index.css                     # Global styles and CSS variables
├─ main.tsx                      # Application entry point
└─ vite-env.d.ts                 # TypeScript declarations
```

---

## 3. Global App Shell (Left Nav + Header + Footer)

### Purpose

Defines the **application frame**. Exists exactly once. All authenticated pages render inside this shell.

### `layouts/app-shell.tsx`

```tsx
import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { GlobalHeader } from "@/components/blocks/global-header"
import { GlobalSidebar } from "@/components/blocks/global-sidebar"
import { GlobalFooter } from "@/components/blocks/global-footer"

interface AppShellProps {
  breadcrumbs?: Array<{ label: string; href?: string }>
  onLogout?: () => void
  userName?: string
  userEmail?: string
  userAvatar?: string
  sidebarHeader?: React.ReactNode
  sidebarFooter?: React.ReactNode
}

export function AppShell({
  breadcrumbs,
  onLogout,
  userName,
  userEmail,
  userAvatar,
  sidebarHeader,
  sidebarFooter,
}: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <GlobalSidebar sidebarHeader={sidebarHeader} sidebarFooter={sidebarFooter} />

        <SidebarInset className="flex h-full flex-col overflow-hidden">
          <GlobalHeader
            breadcrumbs={breadcrumbs}
            onLogout={onLogout}
            userName={userName}
            userEmail={userEmail}
            userAvatar={userAvatar}
          />

          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>

          <GlobalFooter />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
```

**Key Features**:
- Uses `SidebarProvider` and `SidebarInset` from shadcn sidebar for collapsible functionality
- `Outlet` renders child routes
- Header auto-generates breadcrumbs from current route if not provided
- Sidebar supports custom header/footer via props

**When to Use**: Always wrap authenticated routes in AppShell.

---

## 4. Router Configuration (Navigation Stack Owner)

### `app/router.tsx`

```tsx
import { createBrowserRouter } from "react-router-dom"
import { AppShell } from "@/components/layouts/app-shell"
import { RouteErrorBoundary } from "@/components/blocks/route-error-boundary"
import { HomePage } from "@/pages/HomePage"
import { LoginPage } from "@/pages/templates/LoginPage"
import { NotFoundPage } from "@/pages/templates/NotFoundPage"
import { DashboardPage } from "@/pages/templates/DashboardPage"

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      // Add more authenticated routes here
    ],
  },
  // Standalone pages (no AppShell)
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFoundPage homeButton={{ href: "/", label: "Go Home" }} />,
    errorElement: <RouteErrorBoundary />,
  },
])
```

**Key Principles**:
- Router is the **single source of truth** for navigation stack
- Use `errorElement` with `RouteErrorBoundary` for error handling
- Standalone pages (login, signup) render without AppShell
- Wildcard route catches 404s

---

## 5. Page Shell (Base Page Container)

### Purpose

Provides consistent spacing and vertical flow for page content.

### `layouts/page-shell.tsx`

```tsx
import * as React from "react"

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      {children}
    </div>
  )
}
```

**When to Use**: Wrap page content when you need consistent vertical flex layout.

---

## 6. Layout Components

### 6.1 TwoColumnLayout (Recommended)

The most versatile layout component for two-column arrangements.

```tsx
import { TwoColumnLayout } from "@/components/layouts/two-column-layout"

// Resizable (default)
<TwoColumnLayout
  left={<Sidebar />}
  right={<MainContent />}
  defaultLeftWidth={30}
  defaultRightWidth={70}
  minLeftWidth={20}
  minRightWidth={30}
/>

// Fixed widths
<TwoColumnLayout
  left={<Navigation />}
  right={<Content />}
  resizable={false}
  leftWidth="320px"
  rightWidth="auto"
/>

// With headers and footers
<TwoColumnLayout
  left={<ItemList />}
  right={<ItemDetails />}
  leftHeader={<SearchBar />}
  rightHeader={<ActionButtons />}
  leftFooter={<Pagination />}
  scrollable={true}
  noPadding={false}
/>
```

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `left` | ReactNode | required | Left column content |
| `right` | ReactNode | required | Right column content |
| `resizable` | boolean | `true` | Enable drag-to-resize |
| `defaultLeftWidth` | number | `50` | Default left width (%) when resizable |
| `defaultRightWidth` | number | `50` | Default right width (%) when resizable |
| `minLeftWidth` | number | `20` | Minimum left width (%) |
| `minRightWidth` | number | `20` | Minimum right width (%) |
| `leftWidth` | string | `"50%"` | Fixed left width when not resizable |
| `rightWidth` | string | `"50%"` | Fixed right width when not resizable |
| `leftHeader` | ReactNode | - | Optional header for left section |
| `rightHeader` | ReactNode | - | Optional header for right section |
| `leftFooter` | ReactNode | - | Optional footer for left section |
| `rightFooter` | ReactNode | - | Optional footer for right section |
| `showSeparator` | boolean | `true` | Show separators between sections |
| `scrollable` | boolean | `true` | Wrap content in ScrollArea |
| `noPadding` | boolean | `false` | Remove padding from content |

**When to Use**:
- Master-detail views (list + detail panel)
- Editor interfaces (code + preview)
- Any two-column layout with optional resizing

### 6.2 ThreeColumnLayout

For complex interfaces needing three distinct areas.

```tsx
import { ThreeColumnLayout } from "@/components/layouts/three-column-layout"

<ThreeColumnLayout
  left={<NavigationSidebar />}
  content={<MainEditor />}
  right={<PropertiesPanel />}
  defaultLeftWidth={20}
  defaultContentWidth={60}
  defaultRightWidth={20}
/>
```

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `left` | ReactNode | required | Left sidebar content |
| `content` | ReactNode | required | Main content area |
| `right` | ReactNode | required | Right properties panel |
| `resizable` | boolean | `true` | Enable drag-to-resize |
| `defaultLeftWidth` | number | `20` | Default left width (%) |
| `defaultContentWidth` | number | `60` | Default content width (%) |
| `defaultRightWidth` | number | `20` | Default right width (%) |
| `minLeftWidth` | number | `15` | Minimum left width (%) |
| `minContentWidth` | number | `30` | Minimum content width (%) |
| `minRightWidth` | number | `15` | Minimum right width (%) |
| `leftWidth` | string | `"240px"` | Fixed left width when not resizable |
| `rightWidth` | string | `"320px"` | Fixed right width when not resizable |

**When to Use**:
- IDE-style interfaces (file tree + editor + properties)
- Dashboard builders
- Complex editors with toolbars and properties

### 6.3 PageWithProperties (Simple)

Simplified layout for content with a fixed properties panel.

```tsx
import { PageWithProperties } from "@/components/layouts/page-with-properties"

<PageWithProperties
  content={<ArticleContent />}
  properties={<ArticleMetadata />}
  propertiesWidth="320px"
/>
```

**When to Use**: Simple content + sidebar without resizing needs.

### 6.4 SplitLayout (Legacy)

Simple non-resizable split. Prefer `TwoColumnLayout` for new code.

```tsx
import { SplitLayout } from "@/components/layouts/split-layout"

<SplitLayout
  left={<LeftContent />}
  right={<RightContent />}
  leftWidth="70%"
  rightWidth="30%"
/>
```

### Layout Decision Tree

```
Need a layout?
├─ Full app frame? → AppShell
├─ Page wrapper? → PageShell
├─ Two columns?
│  ├─ Need resizing? → TwoColumnLayout (resizable=true)
│  ├─ Fixed widths with headers/footers? → TwoColumnLayout (resizable=false)
│  └─ Simple content + properties? → PageWithProperties
├─ Three columns? → ThreeColumnLayout
└─ Legacy simple split? → SplitLayout
```

---

## 7. Blocks Reference

### 7.1 PageHeader

Page-level header with sticky positioning and scroll detection.

```tsx
import { PageHeader } from "@/components/blocks/page-header"

<PageHeader
  title="Dashboard"
  leading={<BackButton />}
  actions={<Button>Create</Button>}
  noBorder={false}
/>
```

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Page title |
| `leading` | ReactNode | - | Element before title (e.g., BackButton) |
| `actions` | ReactNode | - | Right-aligned action buttons |
| `noBorder` | boolean | `false` | Disable scroll-triggered border |

**Features**:
- Fixed height of 56px (`h-14`)
- Sticky at top of scroll container
- Border appears when content is scrolled (unless `noBorder`)
- Use `noBorder` when combining with PageTabs

### 7.2 PageTabs

Tab navigation for page sections.

```tsx
import { PageTabs } from "@/components/blocks/page-tabs"

const [activeTab, setActiveTab] = useState("overview")

<PageTabs
  tabs={[
    { value: "overview", label: "Overview" },
    { value: "analytics", label: "Analytics" },
    { value: "settings", label: "Settings" },
  ]}
  value={activeTab}
  onValueChange={setActiveTab}
/>
```

**Props**:

| Prop | Type | Description |
|------|------|-------------|
| `tabs` | `Array<{ value: string; label: string }>` | Tab definitions |
| `defaultValue` | string | Initial active tab (uncontrolled) |
| `value` | string | Active tab (controlled) |
| `onValueChange` | `(value: string) => void` | Tab change handler |

### 7.3 BackButton

Navigation back button with multiple modes.

```tsx
import { BackButton } from "@/components/blocks/back-button"

// Browser history back (default)
<BackButton />

// Navigate to specific path
<BackButton href="/dashboard" />

// Custom click handler
<BackButton onClick={() => handleBack()} />

// With label
<BackButton label="Back to list" />
```

### 7.4 GlobalSidebar

Collapsible application sidebar. Configure navigation items in `lib/sidebar-config.ts`.

```tsx
// lib/sidebar-config.ts
import { Home, BarChart3, Settings } from "lucide-react"

export const SIDEBAR_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { label: "Settings", icon: Settings, href: "/settings" },
] as const
```

**Features**:
- Collapsible to icon-only mode
- Logo transitions between states
- Configured via `lib/sidebar-config.ts`
- Custom header/footer via props

### 7.5 GlobalHeader

Application header with breadcrumbs and user menu.

**Features**:
- Auto-generates breadcrumbs from route
- Theme toggle
- Notifications button
- Settings button
- User dropdown with logout

### 7.6 MetricCard

Display KPIs and metrics.

```tsx
import { MetricCard } from "@/components/blocks/metric-card"

<MetricCard
  title="Total Revenue"
  value="$124,580"
  change="+12.5%"
  trend="up"
  icon={DollarSign}
  description="Last 30 days"
  variant="default" // or "compact"
/>
```

**Props**:

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Metric name |
| `value` | string | Formatted value |
| `change` | string | Change percentage |
| `trend` | `"up"` \| `"down"` | Trend direction |
| `icon` | Component | Optional icon |
| `description` | string | Optional description |
| `variant` | `"default"` \| `"compact"` | Card variant |

### 7.7 DataTable

Full-featured data table with TanStack Table.

```tsx
import { DataTable } from "@/components/blocks/data-table"

<DataTable
  columns={columns}
  data={data}
  searchKey="name"
  searchPlaceholder="Search users..."
/>
```

**Features**:
- Sorting, filtering, pagination
- Column visibility toggles
- Row selection
- Search functionality

### 7.8 LoginForm & PasswordResetForm

Pre-built authentication forms.

```tsx
import { LoginForm } from "@/components/blocks/login-form"

<LoginForm
  onLogin={(email, password) => handleLogin(email, password)}
  onGoogleLogin={() => handleGoogleLogin()}
  showSignupLink={true}
  signupLink="/signup"
/>
```

---

## 8. Patterns (Composition Recipes)

### 8.1 PageHeaderWithTabs

Combines header and tabs for tabbed pages.

```tsx
import { PageHeaderWithTabs } from "@/components/patterns/page-header-with-tabs"

<PageHeaderWithTabs
  title="Settings"
  actions={<Button>Save</Button>}
  tabs={[
    { value: "general", label: "General" },
    { value: "security", label: "Security" },
  ]}
  value={activeTab}
  onValueChange={setActiveTab}
/>
```

**Note**: Uses `noBorder` on PageHeader internally to avoid double borders.

### 8.2 PageHeaderWithBack

Header with back navigation.

```tsx
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"

<PageHeaderWithBack
  title="User Details"
  actions={<Button>Edit</Button>}
  backButton={{ href: "/users" }}
/>
```

---

## 9. Error Handling

### 9.1 RouteErrorBoundary

For React Router error handling. Use as `errorElement` in routes.

```tsx
// router.tsx
{
  element: <AppShell />,
  errorElement: <RouteErrorBoundary />,
  children: [...]
}
```

**Features**:
- Displays error message
- Copy error to clipboard
- Try again button (reloads page)
- Go home button

### 9.2 ErrorBoundary

For component-level error handling. Wrap risky components.

```tsx
import { ErrorBoundary } from "@/components/blocks/error-boundary"

<ErrorBoundary
  fallback={CustomFallback}
  onError={(error, errorInfo) => logError(error)}
>
  <RiskyComponent />
</ErrorBoundary>
```

**Props**:

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Components to wrap |
| `fallback` | Component | Custom fallback UI |
| `onError` | function | Error callback |

---

## 10. Configuration

### 10.1 Sidebar Configuration (`lib/sidebar-config.ts`)

```tsx
import { Home, BarChart3, Settings, FileText } from "lucide-react"

export const SIDEBAR_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { label: "Forms", icon: FileText, href: "/forms" },
  { label: "Settings", icon: Settings, href: "/settings" },
] as const
```

### 10.2 Constants (`lib/constants.ts`)

```tsx
// Icon stroke width for consistent visual weight
export const ICON_STROKE_WIDTH = 2
```

Use in components:

```tsx
import { ICON_STROKE_WIDTH } from "@/lib/constants"

<Settings strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
```

### 10.3 Navigation Utilities (`lib/navigation.ts`)

```tsx
import { 
  generateBreadcrumbs, 
  isActiveRoute, 
  buildPath,
  formatPathSegment,
  getRouteLabel 
} from "@/lib/navigation"

// Generate breadcrumbs from pathname
generateBreadcrumbs("/dashboard/settings")
// => [{ label: "Home", href: "/" }, { label: "Dashboard", href: "/dashboard" }, { label: "Settings" }]

// Check if route is active
isActiveRoute("/dashboard/settings", "/dashboard") // true (prefix)
isActiveRoute("/dashboard/settings", "/dashboard", true) // false (exact)

// Build paths safely
buildPath("dashboard", "settings") // "/dashboard/settings"

// Format path segment
formatPathSegment("user-settings") // "User Settings"
```

---

## 11. Theming

### 11.1 OKLCH Color System

The design system uses OKLCH color space for better perceptual uniformity.

**Color variables** (defined in `index.css`):

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.21 0.006 285.885);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.967 0.001 286.375);
  --muted: oklch(0.967 0.001 286.375);
  --accent: oklch(0.967 0.001 286.375);
  --destructive: oklch(0.577 0.245 27.325);
  /* ... more colors */
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode overrides */
}
```

### 11.2 Theme Toggle

```tsx
import { ThemeToggle } from "@/components/theme-toggle"

// In header or settings
<ThemeToggle />
```

Provides light/dark/system options via dropdown.

### 11.3 Using Theme Colors

```tsx
// Background colors
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="bg-muted text-muted-foreground" />
<div className="bg-destructive text-destructive-foreground" />

// Borders
<div className="border border-border" />
<div className="border border-input" />

// Focus rings
<input className="focus:ring-ring focus:ring-2" />
```

---

## 12. Registry System

### 12.1 Component Types

| Type | Description | Location |
|------|-------------|----------|
| `registry:ui` | UI primitives | `components/ui/` |
| `registry:block` | Reusable sections | `components/blocks/`, `components/layouts/`, `components/patterns/` |
| `registry:theme` | Theme CSS files | `styles/` |

### 12.2 Registry Configuration (`registry.json`)

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "iqline-design-system",
  "homepage": "https://iqlds.vercel.app",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "A button component",
      "files": [
        { "path": "src/components/ui/button.tsx", "type": "registry:ui" }
      ]
    },
    {
      "name": "two-column-layout",
      "type": "registry:block",
      "title": "Two Column Layout",
      "description": "Resizable two-column layout",
      "files": [
        { "path": "src/components/layouts/two-column-layout.tsx", "type": "registry:block" }
      ],
      "dependencies": ["react-resizable-panels", "@/components/ui/resizable"]
    }
  ]
}
```

### 12.3 Installing Components

From the IQLine registry:

```bash
npx shadcn@latest add two-column-layout --registry @iqlds
```

### 12.4 Building Registry

```bash
npx shadcn@latest build
```

---

## 13. Stack Navigation & Back Behavior

### Principle

Navigation stack is owned by **React Router history**, not layouts.

### Navigation Rules

* Full pages → **routes**
* Back → **history** (use BackButton)
* Contextual flows → **dialogs / sheets**
* Never manage stacks inside layout components

### Example: Detail Page with Back

```tsx
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"

export function UserDetailPage() {
  return (
    <PageShell>
      <PageHeaderWithBack
        title="User Details"
        backButton={{ href: "/users" }}
        actions={<Button>Edit</Button>}
      />
      <div className="flex-1 overflow-auto p-6">
        <UserDetails />
      </div>
    </PageShell>
  )
}
```

---

## 14. Component Decision Guide

### When to Use Each Layout

| Scenario | Use |
|----------|-----|
| Main app frame with sidebar | `AppShell` |
| Page with header + scrollable content | `PageShell` |
| Master-detail (list + detail) | `TwoColumnLayout` |
| Resizable split pane | `TwoColumnLayout (resizable=true)` |
| Fixed sidebar + content | `TwoColumnLayout (resizable=false)` |
| Simple content + properties | `PageWithProperties` |
| IDE-style (tree + editor + properties) | `ThreeColumnLayout` |

### When to Use Each Block

| Need | Use |
|------|-----|
| Page title with actions | `PageHeader` |
| Page with tabs | `PageHeaderWithTabs` |
| Page with back navigation | `PageHeaderWithBack` |
| KPI display | `MetricCard` |
| Data with sorting/filtering | `DataTable` |
| Authentication UI | `LoginForm` / `PasswordResetForm` |
| Error recovery UI | `ErrorBoundary` / `RouteErrorBoundary` |

### Example Page Compositions

**Simple page with header:**

```tsx
<PageShell>
  <PageHeader title="Dashboard" actions={<Button>Export</Button>} />
  <div className="flex-1 overflow-auto p-6">
    <DashboardContent />
  </div>
</PageShell>
```

**Tabbed page:**

```tsx
<PageShell>
  <PageHeaderWithTabs
    title="Settings"
    tabs={settingsTabs}
    value={activeTab}
    onValueChange={setActiveTab}
  />
  <div className="flex-1 overflow-auto p-6">
    {activeTab === "general" && <GeneralSettings />}
    {activeTab === "security" && <SecuritySettings />}
  </div>
</PageShell>
```

**Master-detail page:**

```tsx
<PageShell>
  <PageHeader title="Users" />
  <TwoColumnLayout
    left={<UserList onSelect={setSelectedUser} />}
    right={<UserDetails user={selectedUser} />}
    defaultLeftWidth={40}
    defaultRightWidth={60}
  />
</PageShell>
```

---

## 15. Registry Export Guidance

### What to Export

✅ **Export to registry:**
* `components/ui/*` - All UI primitives
* `components/blocks/*` - All blocks
* `components/patterns/*` - All patterns
* `styles/*` - Theme CSS files

❌ **Do NOT export:**
* `components/layouts/*` - App-specific layouts
* `pages/*` - Application pages
* `app/*` - Router and app configuration
* `lib/sidebar-config.ts` - App-specific navigation

---

## 16. Mental Model Summary

Think in layers:

```
┌─────────────────────────────────────────┐
│ 1. AppShell (application frame)         │
│   ┌─────────────────────────────────┐   │
│   │ 2. PageShell (page container)   │   │
│   │   ┌─────────────────────────┐   │   │
│   │   │ 3. Layout Components    │   │   │
│   │   │   ┌─────────────────┐   │   │   │
│   │   │   │ 4. Blocks       │   │   │   │
│   │   │   │   ┌─────────┐   │   │   │   │
│   │   │   │   │ 5. UI   │   │   │   │   │
│   │   │   │   └─────────┘   │   │   │   │
│   │   │   └─────────────────┘   │   │   │
│   │   └─────────────────────────┘   │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Rules:**
1. Each layer only knows the layer below it
2. UI primitives have no knowledge of layouts
3. Blocks compose UI primitives
4. Layouts compose blocks
5. Pages compose everything but define no layout rules

If each layer only knows the layer below it, the system scales indefinitely.

---

## 17. Quick Reference

### Import Paths

```tsx
// UI primitives
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Blocks
import { PageHeader } from "@/components/blocks/page-header"
import { DataTable } from "@/components/blocks/data-table"

// Layouts
import { TwoColumnLayout } from "@/components/layouts/two-column-layout"
import { PageShell } from "@/components/layouts/page-shell"

// Patterns
import { PageHeaderWithTabs } from "@/components/patterns/page-header-with-tabs"

// Utilities
import { cn } from "@/lib/utils"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { generateBreadcrumbs } from "@/lib/navigation"
```

### Common Patterns

```tsx
// Sticky header with scroll border
<PageHeader title="Title" />

// Header without border (for tabs)
<PageHeader title="Title" noBorder />

// Controlled tabs
<PageTabs tabs={tabs} value={value} onValueChange={setValue} />

// Back button to specific route
<BackButton href="/previous-page" />

// Resizable two-column
<TwoColumnLayout left={...} right={...} resizable={true} />

// Fixed two-column
<TwoColumnLayout left={...} right={...} resizable={false} leftWidth="300px" />
```

---

**End of canonical document**

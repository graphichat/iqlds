# Shadcn-style Vite App Layout System (Canonical Guide)

This document is a **single source of truth** for AI agents and developers to understand how to structure a **Vite + React + shadcn-style application** with:

* Global Left Navigation
* Global Header
* Optional Global Footer
* Page-level Header + Body
* Optional Tabs under header
* Optional second left sidebar
* Optional right-side Properties Panel
* Optional split content (70/30, 60/40, etc.)
* Stack-based navigation with Back behavior

The goal is **clarity, composability, and long-term scalability**.

---

## 1. Core Philosophy (Non-negotiable)

These rules must always be respected.

1. **`ui/` = primitives only**
   Buttons, inputs, dropdowns, tables. No layout, no routing, no business logic.

2. **Blocks = reusable sections**
   Headers, sidebars, tabs, footers, page headers.

3. **Layouts = structural composition**
   App shell, page shell, split panes, nested shells.

4. **Patterns = repeatable compositions**
   Header + tabs, header + back button, etc.

5. **Pages only compose**
   Pages do not define layout rules.

6. **Routing handles navigation stacks**
   Layout never handles navigation state.

---

## 2. Canonical Folder Structure (Vite)

```
src/
├─ app/
│  ├─ App.tsx              # Root app composition
│  └─ router.tsx           # React Router configuration
│
├─ components/
│  ├─ ui/                  # shadcn primitives
│  │  ├─ button.tsx
│  │  ├─ input.tsx
│  │  ├─ dropdown-menu.tsx
│  │  └─ ...
│  │
│  ├─ blocks/              # Reusable sections
│  │  ├─ global-header.tsx
│  │  ├─ global-sidebar.tsx
│  │  ├─ global-footer.tsx
│  │  ├─ page-header.tsx
│  │  ├─ page-tabs.tsx
│  │  └─ ...
│  │
│  ├─ layouts/             # Structural layouts
│  │  ├─ app-shell.tsx
│  │  ├─ page-shell.tsx
│  │  ├─ split-layout.tsx
│  │  ├─ nested-shell.tsx
│  │  └─ page-with-properties.tsx
│  │
│  └─ patterns/            # Composition recipes
│     ├─ page-header-with-tabs.tsx
│     ├─ page-header-with-back.tsx
│     └─ ...
│
├─ pages/                  # Route-level pages
│  ├─ dashboard/page.tsx
│  ├─ patients/page.tsx
│  └─ patients-details/page.tsx
│
├─ lib/
│  ├─ utils.ts
│  ├─ navigation.ts        # Navigation utilities (breadcrumbs, route helpers)
│  └─ constants.ts         # App constants
│
├─ styles/
│  └─ globals.css
│
├─ main.tsx
└─ index.css
```

---

## 3. Global App Shell (Left Nav + Header + Footer)

### Purpose

Defines the **application frame**. Exists exactly once.

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

**Note**: Uses `SidebarProvider` and `SidebarInset` from shadcn sidebar components for collapsible sidebar functionality.

---

## 4. Router Configuration (Navigation Stack Owner)

### `app/router.tsx`

```tsx
import { createBrowserRouter } from "react-router-dom"
import { AppShell } from "@/components/layouts/app-shell"
import DashboardPage from "@/pages/dashboard/page"
import PatientPage from "@/pages/patients/page"

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/patients", element: <PatientPage /> },
    ],
  },
])
```

The router is the **single source of truth** for stack navigation.

---

## 5. Page Shell (Base Page Container)

### Purpose

Provides consistent spacing and vertical flow.

### `layouts/page-shell.tsx`

```tsx
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      {children}
    </div>
  )
}
```

---

## 6. Page Header and Tabs

### Page Header (Block)

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  leading?: React.ReactNode
  actions?: React.ReactNode
}

export function PageHeader({ title, leading, actions }: PageHeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const headerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const headerElement = headerRef.current
    if (!headerElement) return

    // Find the scroll container (next sibling with overflow-auto)
    const scrollContainer = headerElement.nextElementSibling as HTMLElement
    
    if (!scrollContainer) return

    const handleScroll = () => {
      setIsScrolled(scrollContainer.scrollTop > 0)
    }

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      ref={headerRef}
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center justify-between bg-background px-6 transition-all",
        isScrolled && "border-b"
      )}
    >
      <div className="flex items-center gap-2">
        {leading}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </div>
  )
}
```

**Features**:
- Fixed height of 56px (`h-14`)
- Sticky positioning at top of scroll container
- Automatic border on scroll (shows when content is scrolled)
- Actions are right-aligned and wrapped in flex container

### Tabs Bar (Block)

```tsx
import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PageTabsProps {
  tabs: Array<{
    value: string
    label: string
  }>
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export function PageTabs({ tabs, defaultValue, value, onValueChange }: PageTabsProps) {
  return (
    <div className="border-b px-6">
      <Tabs value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
        <TabsList variant="line" className="h-9">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="px-4">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
```

**Note**: Uses props array instead of children for better type safety and controlled state support.

---

## 7. Composition Pattern: Header + Tabs

### `patterns/page-header-with-tabs.tsx`

```tsx
import { PageHeader } from "@/components/blocks/page-header"
import { PageTabs } from "@/components/blocks/page-tabs"

interface PageHeaderWithTabsProps {
  title: string
  leading?: React.ReactNode
  actions?: React.ReactNode
  tabs: Array<{
    value: string
    label: string
  }>
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export function PageHeaderWithTabs({
  title,
  leading,
  actions,
  tabs,
  defaultValue,
  value,
  onValueChange,
}: PageHeaderWithTabsProps) {
  return (
    <>
      <PageHeader title={title} leading={leading} actions={actions} />
      <PageTabs
        tabs={tabs}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
      />
    </>
  )
}
```

Patterns **compose blocks** but do not introduce layout rules.

---

## 8. Split Content Layouts

### 70 / 30 Split (Configurable)

```tsx
interface SplitLayoutProps {
  left: React.ReactNode
  right: React.ReactNode
  leftWidth?: string
  rightWidth?: string
}

export function SplitLayout({ 
  left, 
  right, 
  leftWidth = "70%", 
  rightWidth = "30%" 
}: SplitLayoutProps) {
  return (
    <div className="flex h-full">
      <div className="border-r" style={{ width: leftWidth }}>
        {left}
      </div>
      <div style={{ width: rightWidth }}>
        {right}
      </div>
    </div>
  )
}
```

**Note**: Supports configurable split ratios (defaults to 70/30).

---

## 9. Page With Right Properties Panel

```tsx
interface PageWithPropertiesProps {
  content: React.ReactNode
  properties: React.ReactNode
  propertiesWidth?: string
}

export function PageWithProperties({
  content,
  properties,
  propertiesWidth = "320px",
}: PageWithPropertiesProps) {
  return (
    <div className="flex h-full">
      <main className="flex-1 overflow-auto">{content}</main>
      <aside className="border-l" style={{ width: propertiesWidth }}>
        {properties}
      </aside>
    </div>
  )
}
```

**Note**: Properties panel width is configurable (defaults to 320px).

---

## 10. Nested Left Sidebar (Second-Level Navigation)

```tsx
interface NestedShellProps {
  sidebar: React.ReactNode
  content: React.ReactNode
  sidebarWidth?: string
}

export function NestedShell({ 
  sidebar, 
  content, 
  sidebarWidth = "256px" 
}: NestedShellProps) {
  return (
    <div className="flex h-full">
      <aside className="border-r" style={{ width: sidebarWidth }}>
        {sidebar}
      </aside>
      <main className="flex-1">{content}</main>
    </div>
  )
}
```

**Note**: Sidebar width is configurable (defaults to 256px).

---

## 11. Example Page Composition

```tsx
<PageShell>
  <PageHeaderWithTabs
    title="Patients"
    tabs={<PatientTabs />}
  />

  <SplitLayout
    left={<PatientList />}
    right={<PatientDetails />}
  />
</PageShell>
```

This is the **ideal readable state**.

---

## 12. Stack Navigation & Back Behavior

### Principle

Navigation stack is owned by **React Router history**, not layouts.

### Back Button

```tsx
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  label?: string
  href?: string
  onClick?: () => void
  className?: string
}

export function BackButton({ label, href, onClick, className }: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      navigate(href)
    } else {
      navigate(-1)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${className || ""}`}
      onClick={handleClick}
    >
      <ArrowLeft className="h-4 w-4" />
      {label && <span className="ml-2">{label}</span>}
    </Button>
  )
}
```

**Features**: Supports href navigation, onClick handler, or browser history back.

### Header with Back (Pattern)

```tsx
import { PageHeader } from "@/components/blocks/page-header"
import { BackButton } from "@/components/blocks/back-button"

interface PageHeaderWithBackProps {
  title: string
  actions?: React.ReactNode
  backButton?: {
    label?: string
    href?: string
    onClick?: () => void
  }
}

export function PageHeaderWithBack({ title, actions, backButton }: PageHeaderWithBackProps) {
  return (
    <PageHeader
      title={title}
      leading={<BackButton {...backButton} />}
      actions={actions}
    />
  )
}
```

**Note**: Supports actions prop and configurable back button behavior.

---

## 13. Navigation Rules

* Full pages → **routes**
* Back → **history**
* Contextual flows → **dialogs / sheets**
* Never manage stacks inside layout components

### Navigation Utilities (`lib/navigation.ts`)

Centralized navigation logic utilities:

```tsx
import { generateBreadcrumbs, isActiveRoute, buildPath } from "@/lib/navigation"

// Generate breadcrumbs from pathname
const breadcrumbs = generateBreadcrumbs("/dashboard/settings")

// Check if route is active
const isActive = isActiveRoute("/dashboard", "/dashboard/settings") // true (prefix match)

// Build paths safely
const path = buildPath("dashboard", "settings") // "/dashboard/settings"
```

**Functions available**:
- `generateBreadcrumbs(pathname, customBreadcrumbs?)` - Generate breadcrumb items
- `formatPathSegment(segment)` - Format URL segments to readable labels
- `isActiveRoute(currentPath, targetPath, exact?)` - Check route activation
- `getRouteLabel(pathname)` - Get human-readable route label
- `buildPath(...segments)` - Safely build paths from segments

---

## 14. Registry Export Guidance

If exporting to a shadcn registry:

✅ Export

* `components/ui`
* `components/blocks`
* `components/patterns`

❌ Do NOT export

* `layouts`
* `pages`
* `router`

---

## 15. Mental Model Summary

Think in layers:

1. App Shell
2. Page Shell
3. Layout Primitives
4. Blocks
5. UI Primitives

If each layer only knows the layer below it, the system scales indefinitely.

---

**End of canonical document**

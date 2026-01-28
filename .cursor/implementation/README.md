# Template Branch Implementation Guide

This folder contains comprehensive implementation documentation for AI agents to understand and work with this design system template. Each file provides detailed instructions for specific aspects of the system.

---

## Quick Reference

| Document | Purpose |
|----------|---------|
| [01-component-usage.md](./01-component-usage.md) | When to use which component, component decision trees |
| [02-page-creation.md](./02-page-creation.md) | Step-by-step page creation patterns |
| [03-navigation-patterns.md](./03-navigation-patterns.md) | Tabs, breadcrumbs, back navigation |
| [04-sidebar-patterns.md](./04-sidebar-patterns.md) | Sidebar configuration, tenant switcher example |
| [05-layout-patterns.md](./05-layout-patterns.md) | Layout composition and decision trees |
| [06-page-transitions.md](./06-page-transitions.md) | Page transitions and animations |
| [07-ux-guidelines.md](./07-ux-guidelines.md) | UX best practices for AI agents |

---

## Architecture Overview

### Component Hierarchy

```
AppShell (application frame)
└── SidebarProvider
    ├── GlobalSidebar (collapsible navigation)
    └── SidebarInset
        ├── GlobalHeader (breadcrumbs, user menu)
        ├── main (page content via Outlet)
        │   └── PageShell (page container)
        │       ├── PageHeader / PageHeaderWithTabs
        │       └── Content (layouts, blocks, UI primitives)
        └── GlobalFooter
```

### Layer Model

```
Layer 1: AppShell (application frame)
  Layer 2: PageShell (page container)
    Layer 3: Layouts (TwoColumnLayout, ThreeColumnLayout, etc.)
      Layer 4: Blocks (PageHeader, MetricCard, DataTable, etc.)
        Layer 5: UI Primitives (Button, Card, Input, etc.)
```

**Rule**: Each layer only knows the layer below it. Never import upward.

---

## Project Structure by Scale

Choose your structure based on project size:

| Scale | Pages | Structure | Reference |
|-------|-------|-----------|-----------|
| **Simple** | 1-5 | Flat `pages/` folder | See [architectureGuidelines.md](../architectureGuidelines.md#1-simple-architecture) |
| **Feature-Based** | 5-20 | `features/[name]/` folders | See [architectureGuidelines.md](../architectureGuidelines.md#2-feature-based-modular-architecture) |
| **Module-Based** | 20+ | `modules/[domain]/` with RBAC | See [architectureGuidelines.md](../architectureGuidelines.md#3-module-based-monolithic-architecture) |

---

## Import Paths

```tsx
// UI Primitives
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

// Blocks
import { PageHeader } from "@/components/blocks/page-header"
import { DataTable } from "@/components/blocks/data-table"
import { MetricCard } from "@/components/blocks/metric-card"

// Layouts
import { AppShell } from "@/components/layouts/app-shell"
import { PageShell } from "@/components/layouts/page-shell"
import { TwoColumnLayout } from "@/components/layouts/two-column-layout"

// Patterns
import { PageHeaderWithTabs } from "@/components/patterns/page-header-with-tabs"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"

// Utilities
import { cn } from "@/lib/utils"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { generateBreadcrumbs } from "@/lib/navigation"
```

---

## Core Principles

### 1. Composition Over Configuration

Pages compose layouts, blocks, and patterns. They don't define layout rules.

```tsx
// GOOD: Page composes components
export function DashboardPage() {
  return (
    <PageShell>
      <PageHeader title="Dashboard" />
      <div className="flex-1 overflow-auto p-6">
        <DashboardContent />
      </div>
    </PageShell>
  )
}

// BAD: Page defines layout rules inline
export function DashboardPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r">...</aside>
      <main>...</main>
    </div>
  )
}
```

### 2. Router Owns Navigation

Navigation state lives in React Router, not in layouts or components.

```tsx
// Navigation via routes
{ path: "/users/:id", element: <UserDetailPage /> }

// Use BackButton for history navigation
<BackButton href="/users" />
```

### 3. Error Boundaries at Route Level

Use `RouteErrorBoundary` for route-level errors, `ErrorBoundary` for component-level.

```tsx
// Router configuration
{
  element: <AppShell />,
  errorElement: <RouteErrorBoundary />,
  children: [...]
}
```

### 4. Consistent Icon Usage

Use `ICON_STROKE_WIDTH` constant for all icons.

```tsx
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { Settings } from "lucide-react"

<Settings strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
```

---

## Quick Start Checklist

When creating a new page:

1. [ ] Choose the right layout pattern → [05-layout-patterns.md](./05-layout-patterns.md)
2. [ ] Wrap in `PageShell`
3. [ ] Add `PageHeader` or `PageHeaderWithTabs` or `PageHeaderWithBack`
4. [ ] Use `flex-1 overflow-auto` for scrollable content
5. [ ] Add route to `app/router.tsx`
6. [ ] Add sidebar item if needed → [04-sidebar-patterns.md](./04-sidebar-patterns.md)
7. [ ] Test on mobile breakpoint

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| UI Components | `kebab-case.tsx` | `button.tsx`, `card.tsx` |
| Blocks | `kebab-case.tsx` | `page-header.tsx`, `data-table.tsx` |
| Layouts | `kebab-case.tsx` | `app-shell.tsx`, `two-column-layout.tsx` |
| Patterns | `kebab-case.tsx` | `page-header-with-tabs.tsx` |
| Pages | `PascalCase.tsx` | `DashboardPage.tsx`, `SettingsPage.tsx` |
| Utilities | `kebab-case.ts` | `utils.ts`, `sidebar-config.ts` |

---

## Related Documentation

- [Project Structure](../projectStrucute.md) - Detailed folder structure reference
- [Architecture Guidelines](../architectureGuidelines.md) - Architecture patterns by scale
- [Design System](../../docs/design-system.md) - Colors, typography, spacing
- [Components](../../docs/components.md) - Component usage guide

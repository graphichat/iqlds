# Page Creation Patterns

This document provides step-by-step instructions for creating pages following the design system standards.

---

## Page Creation Checklist

1. [ ] Determine page type (simple, tabbed, master-detail, etc.)
2. [ ] Choose the correct layout pattern
3. [ ] Create the page component file
4. [ ] Add route to `app/router.tsx`
5. [ ] Add sidebar item if navigation is needed
6. [ ] Test responsive behavior
7. [ ] Handle loading/error/empty states

---

## Page Structure Templates

### 1. Simple Page

A basic page with header and scrollable content.

```tsx
// src/pages/MyPage.tsx
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeader } from "@/components/blocks/page-header"
import { Button } from "@/components/ui/button"

export function MyPage() {
  return (
    <PageShell>
      <PageHeader
        title="Page Title"
        actions={<Button>Primary Action</Button>}
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          {/* Page content here */}
        </div>
      </div>
    </PageShell>
  )
}
```

**Key patterns**:
- `PageShell` provides the flex container
- `PageHeader` provides sticky header with 56px height
- `flex-1 overflow-auto` makes content scrollable
- `container mx-auto py-6 px-4` provides centered, padded content

### 2. Tabbed Page

A page with tab navigation for multiple views.

```tsx
// src/pages/SettingsPage.tsx
import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithTabs } from "@/components/patterns/page-header-with-tabs"
import { Button } from "@/components/ui/button"

export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("general")

  return (
    <PageShell>
      <PageHeaderWithTabs
        title="Settings"
        actions={<Button>Save Changes</Button>}
        tabs={[
          { value: "general", label: "General" },
          { value: "security", label: "Security" },
          { value: "billing", label: "Billing" },
          { value: "notifications", label: "Notifications" },
        ]}
        value={activeTab}
        onValueChange={setActiveTab}
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "billing" && <BillingSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
        </div>
      </div>
    </PageShell>
  )
}
```

**Key patterns**:
- `PageHeaderWithTabs` combines header and tabs
- Controlled tabs via `value` and `onValueChange`
- Conditional rendering based on active tab

### 3. Page with Back Navigation

A detail page with back navigation to parent.

```tsx
// src/pages/UserDetailPage.tsx
import { useParams } from "react-router-dom"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"
import { Button } from "@/components/ui/button"

export function UserDetailPage() {
  const { userId } = useParams()

  return (
    <PageShell>
      <PageHeaderWithBack
        title="User Details"
        backButton={{ href: "/users" }}  // Explicit path
        // or backButton={{}}  // Uses browser history
        actions={
          <>
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </>
        }
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 max-w-4xl">
          <UserDetails userId={userId} />
        </div>
      </div>
    </PageShell>
  )
}
```

### 4. Master-Detail Page (Two Column)

A page with list on left and detail on right.

```tsx
// src/pages/UsersPage.tsx
import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeader } from "@/components/blocks/page-header"
import { TwoColumnLayout } from "@/components/layouts/two-column-layout"
import { Button } from "@/components/ui/button"

export function UsersPage() {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

  return (
    <PageShell>
      <PageHeader
        title="Users"
        actions={<Button>Add User</Button>}
      />
      <TwoColumnLayout
        left={
          <UserList
            onSelect={setSelectedUser}
            selected={selectedUser}
          />
        }
        right={
          selectedUser ? (
            <UserDetails user={selectedUser} />
          ) : (
            <EmptyState
              title="Select a user"
              description="Choose a user from the list to view details"
            />
          )
        }
        defaultLeftWidth={35}
        defaultRightWidth={65}
        minLeftWidth={25}
        minRightWidth={40}
        leftHeader={<SearchInput placeholder="Search users..." />}
      />
    </PageShell>
  )
}
```

**Key patterns**:
- `TwoColumnLayout` handles resizable split
- `defaultLeftWidth`/`defaultRightWidth` set initial proportions
- `leftHeader` adds header above left panel

### 5. Dashboard Page

A page with metrics and charts.

```tsx
// src/pages/DashboardPage.tsx
import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithTabs } from "@/components/patterns/page-header-with-tabs"
import { MetricCard } from "@/components/blocks/metric-card"
import { DollarSign, Users, ShoppingCart, Activity } from "lucide-react"

export function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState("overview")

  return (
    <PageShell>
      <PageHeaderWithTabs
        title="Dashboard"
        actions={
          <>
            <Badge variant="secondary">Live</Badge>
            <Button variant="outline">Export</Button>
            <Button>New Project</Button>
          </>
        }
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "analytics", label: "Analytics" },
          { value: "reports", label: "Reports" },
        ]}
        value={activeTab}
        onValueChange={setActiveTab}
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Total Revenue"
                value="$124,580"
                change="+12.5%"
                trend="up"
                icon={DollarSign}
              />
              <MetricCard
                title="Active Users"
                value="8,234"
                change="+8.2%"
                trend="up"
                icon={Users}
              />
              {/* More metrics... */}
            </div>

            {/* Charts */}
            <RevenueChart />

            {/* Tables */}
            <RecentActivityTable />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
```

### 6. Form Page

A page for data entry with form layout.

```tsx
// src/pages/CreateUserPage.tsx
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function CreateUserPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <PageShell>
      <PageHeaderWithBack
        title="Create User"
        backButton={{ href: "/users" }}
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 max-w-2xl">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Create User</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </PageShell>
  )
}
```

### 7. Table Page

A page with data table as main content.

```tsx
// src/pages/ProductsPage.tsx
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeader } from "@/components/blocks/page-header"
import { DataTable } from "@/components/blocks/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function ProductsPage() {
  return (
    <PageShell>
      <PageHeader
        title="Products"
        actions={
          <Button>
            <Plus className="mr-2 size-4" />
            Add Product
          </Button>
        }
      />
      <div className="flex-1 overflow-auto">
        <div className="px-6 py-4">
          <DataTable
            columns={productColumns}
            data={products}
            searchKey="name"
            searchPlaceholder="Search products..."
          />
        </div>
      </div>
    </PageShell>
  )
}
```

---

## Adding Routes

Add your page to the router in `src/app/router.tsx`:

```tsx
import { MyPage } from "@/pages/MyPage"

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      // Add your route here
      { path: "/my-page", element: <MyPage /> },
      
      // With dynamic parameters
      { path: "/users/:userId", element: <UserDetailPage /> },
      
      // Nested routes
      {
        path: "/settings",
        element: <SettingsLayout />,
        children: [
          { path: "", element: <GeneralSettings /> },
          { path: "security", element: <SecuritySettings /> },
        ],
      },
    ],
  },
])
```

---

## Handling Data States

Every page that fetches data should handle:

### Loading State

```tsx
import { LoadingState } from "@/components/blocks/loading-state"

if (isLoading) {
  return (
    <PageShell>
      <PageHeader title="Users" />
      <LoadingState />
    </PageShell>
  )
}
```

### Error State

```tsx
import { ErrorState } from "@/components/blocks/error-state"

if (error) {
  return (
    <PageShell>
      <PageHeader title="Users" />
      <div className="flex-1 flex items-center justify-center p-6">
        <ErrorState
          title="Failed to load users"
          description={error.message}
          action={{ label: "Retry", onClick: refetch }}
        />
      </div>
    </PageShell>
  )
}
```

### Empty State

```tsx
import { EmptyState } from "@/components/blocks/empty-state"

if (data.length === 0) {
  return (
    <PageShell>
      <PageHeader title="Users" />
      <div className="flex-1 flex items-center justify-center p-6">
        <EmptyState
          icon={Users}
          title="No users found"
          description="Get started by creating your first user."
          action={{ label: "Add User", onClick: handleAddUser }}
        />
      </div>
    </PageShell>
  )
}
```

### Complete Pattern

```tsx
export function UsersPage() {
  const { data, isLoading, error, refetch } = useUsers()

  if (isLoading) {
    return (
      <PageShell>
        <PageHeader title="Users" />
        <LoadingState />
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell>
        <PageHeader title="Users" />
        <div className="flex-1 flex items-center justify-center p-6">
          <ErrorState
            title="Failed to load users"
            description={error.message}
            action={{ label: "Retry", onClick: refetch }}
          />
        </div>
      </PageShell>
    )
  }

  if (!data || data.length === 0) {
    return (
      <PageShell>
        <PageHeader title="Users" actions={<Button>Add User</Button>} />
        <div className="flex-1 flex items-center justify-center p-6">
          <EmptyState
            icon={Users}
            title="No users found"
            description="Get started by creating your first user."
            action={{ label: "Add User", onClick: handleAddUser }}
          />
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <PageHeader title="Users" actions={<Button>Add User</Button>} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <UserList users={data} />
        </div>
      </div>
    </PageShell>
  )
}
```

---

## Page Type Decision Tree

```
What type of page?

├─ Dashboard/Overview
│  └─ PageShell + PageHeaderWithTabs + MetricCards + Charts
│
├─ List/Table view
│  └─ PageShell + PageHeader + DataTable
│
├─ Detail view
│  └─ PageShell + PageHeaderWithBack + Content
│
├─ Form/Editor
│  └─ PageShell + PageHeaderWithBack + Form in Card
│
├─ Settings/Config
│  └─ PageShell + PageHeaderWithTabs + Settings Cards
│
├─ Master-Detail
│  └─ PageShell + PageHeader + TwoColumnLayout
│
├─ IDE-style editor
│  └─ PageShell + PageHeader + ThreeColumnLayout
│
└─ Auth pages (login, signup)
   └─ Standalone layout (no AppShell)
```

---

## Responsive Considerations

### Container Max Widths

```tsx
// Full width content (dashboards, tables)
<div className="container mx-auto py-6 px-4">

// Narrow content (forms, articles)
<div className="container mx-auto py-6 px-4 max-w-2xl">

// Medium content (settings, profiles)
<div className="container mx-auto py-6 px-4 max-w-4xl">
```

### Grid Breakpoints

```tsx
// 4-column on large, 2-column on medium, 1-column on small
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

// 3-column on large, 2-column on medium
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

// 2-column on medium and up
<div className="grid gap-4 md:grid-cols-2">
```

### Stack on Mobile

```tsx
// Side-by-side on desktop, stacked on mobile
<div className="flex flex-col md:flex-row gap-4">
```

---

## Related Documentation

- [Component Usage](./01-component-usage.md) - When to use which component
- [Navigation Patterns](./03-navigation-patterns.md) - Tabs, breadcrumbs, back navigation
- [Layout Patterns](./05-layout-patterns.md) - Layout decision tree

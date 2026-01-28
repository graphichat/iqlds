# Layout Patterns

This document provides comprehensive guidance on choosing and using layout components.

---

## Layout Hierarchy

```
AppShell (application frame - used once)
└── PageShell (page container)
    └── Layout Component (structural arrangement)
        └── Blocks and UI Components
```

**Rule**: Each layer only uses the layer below it. Never skip layers.

---

## Layout Decision Tree

```
What layout do you need?

├─ Full application frame with sidebar?
│  └─ AppShell (wrap all authenticated routes)
│
├─ Page container with flex layout?
│  └─ PageShell (wrap page content)
│
├─ Two-column split view?
│  ├─ Need resizing?
│  │  └─ TwoColumnLayout (resizable=true)
│  │
│  ├─ Fixed widths with headers/footers?
│  │  └─ TwoColumnLayout (resizable=false)
│  │
│  └─ Simple content + properties?
│     └─ PageWithProperties
│
├─ Three-column layout (tree + content + properties)?
│  └─ ThreeColumnLayout
│
└─ Simple non-resizable split (legacy)?
   └─ SplitLayout
```

---

## Layout Components Reference

### 1. AppShell

The main application frame. Used exactly once to wrap all authenticated routes.

```tsx
import { AppShell } from "@/components/layouts/app-shell"

// In router.tsx
{
  element: <AppShell />,
  errorElement: <RouteErrorBoundary />,
  children: [
    { path: "/", element: <HomePage /> },
    { path: "/dashboard", element: <DashboardPage /> },
    // All authenticated routes here
  ],
}
```

**Structure**:
```
AppShell
├── GlobalSidebar (collapsible left navigation)
└── SidebarInset
    ├── GlobalHeader (breadcrumbs, user menu)
    ├── <main> (Outlet - page content)
    └── GlobalFooter
```

**Props**:

| Prop | Type | Description |
|------|------|-------------|
| `breadcrumbs` | `BreadcrumbItem[]` | Custom breadcrumbs (auto-generated if not provided) |
| `onLogout` | `() => void` | Logout handler |
| `userName` | `string` | Display name for user menu |
| `userEmail` | `string` | Email for user menu |
| `userAvatar` | `string` | Avatar URL |
| `sidebarHeader` | `ReactNode` | Custom sidebar header (e.g., tenant switcher) |
| `sidebarFooter` | `ReactNode` | Custom sidebar footer (e.g., user menu) |

### 2. PageShell

Base container for page content with vertical flex layout.

```tsx
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeader } from "@/components/blocks/page-header"

export function MyPage() {
  return (
    <PageShell>
      <PageHeader title="Page Title" />
      <div className="flex-1 overflow-auto p-6">
        {/* Page content */}
      </div>
    </PageShell>
  )
}
```

**Structure**:
```tsx
<div className="flex h-full flex-col">
  {children}
</div>
```

**When to use**: Wrap every page inside AppShell.

### 3. TwoColumnLayout

Versatile two-column layout with optional resizing.

```tsx
import { TwoColumnLayout } from "@/components/layouts/two-column-layout"

// Resizable (default)
<TwoColumnLayout
  left={<ListPanel />}
  right={<DetailPanel />}
  defaultLeftWidth={35}
  defaultRightWidth={65}
  minLeftWidth={25}
  minRightWidth={40}
/>

// Fixed widths
<TwoColumnLayout
  left={<Navigation />}
  right={<Content />}
  resizable={false}
  leftWidth="280px"
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
/>
```

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `left` | `ReactNode` | required | Left column content |
| `right` | `ReactNode` | required | Right column content |
| `resizable` | `boolean` | `true` | Enable drag-to-resize |
| `defaultLeftWidth` | `number` | `50` | Default left width (%) when resizable |
| `defaultRightWidth` | `number` | `50` | Default right width (%) when resizable |
| `minLeftWidth` | `number` | `20` | Minimum left width (%) |
| `minRightWidth` | `number` | `20` | Minimum right width (%) |
| `leftWidth` | `string` | `"50%"` | Fixed left width when not resizable |
| `rightWidth` | `string` | `"50%"` | Fixed right width when not resizable |
| `leftHeader` | `ReactNode` | - | Header for left section |
| `rightHeader` | `ReactNode` | - | Header for right section |
| `leftFooter` | `ReactNode` | - | Footer for left section |
| `rightFooter` | `ReactNode` | - | Footer for right section |
| `showSeparator` | `boolean` | `true` | Show separators between sections |
| `scrollable` | `boolean` | `true` | Wrap content in ScrollArea |
| `noPadding` | `boolean` | `false` | Remove padding from content |

**Use cases**:
- Master-detail views
- Email clients (list + message)
- Code editor (files + editor)
- Comparison views

### 4. ThreeColumnLayout

Three-column layout for complex interfaces.

```tsx
import { ThreeColumnLayout } from "@/components/layouts/three-column-layout"

<ThreeColumnLayout
  left={<FileTree />}
  content={<Editor />}
  right={<PropertiesPanel />}
  defaultLeftWidth={20}
  defaultContentWidth={55}
  defaultRightWidth={25}
/>
```

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `left` | `ReactNode` | required | Left sidebar |
| `content` | `ReactNode` | required | Main content |
| `right` | `ReactNode` | required | Right properties panel |
| `resizable` | `boolean` | `true` | Enable resizing |
| `defaultLeftWidth` | `number` | `20` | Default left width (%) |
| `defaultContentWidth` | `number` | `60` | Default content width (%) |
| `defaultRightWidth` | `number` | `20` | Default right width (%) |
| `minLeftWidth` | `number` | `15` | Minimum left width (%) |
| `minContentWidth` | `number` | `30` | Minimum content width (%) |
| `minRightWidth` | `number` | `15` | Minimum right width (%) |
| `leftWidth` | `string` | `"240px"` | Fixed left width |
| `rightWidth` | `string` | `"320px"` | Fixed right width |

**Use cases**:
- IDE-style interfaces
- Dashboard builders
- Design tools
- Document editors with properties

### 5. PageWithProperties

Simple content + fixed properties panel.

```tsx
import { PageWithProperties } from "@/components/layouts/page-with-properties"

<PageWithProperties
  content={<ArticleContent />}
  properties={<ArticleMetadata />}
  propertiesWidth="320px"
/>
```

**Props**:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | required | Main content |
| `properties` | `ReactNode` | required | Properties panel |
| `propertiesWidth` | `string` | `"320px"` | Width of properties panel |

**Use cases**:
- Content + metadata view
- Document + properties
- Item detail + actions

### 6. SplitLayout (Legacy)

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

---

## Common Layout Patterns

### Dashboard with Metrics and Charts

```tsx
export function DashboardPage() {
  return (
    <PageShell>
      <PageHeaderWithTabs
        title="Dashboard"
        tabs={dashboardTabs}
        value={activeTab}
        onValueChange={setActiveTab}
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          <div className="space-y-6">
            {/* Metrics row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard ... />
              <MetricCard ... />
              <MetricCard ... />
              <MetricCard ... />
            </div>
            
            {/* Charts row */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card><RevenueChart /></Card>
              <Card><UsersChart /></Card>
            </div>
            
            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable ... />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
```

### Master-Detail with Selection

```tsx
export function UsersPage() {
  const [selectedUser, setSelectedUser] = React.useState(null)

  return (
    <PageShell>
      <PageHeader title="Users" />
      <TwoColumnLayout
        left={
          <UserList
            users={users}
            selected={selectedUser}
            onSelect={setSelectedUser}
          />
        }
        right={
          selectedUser ? (
            <UserDetail user={selectedUser} />
          ) : (
            <EmptyState
              title="Select a user"
              description="Choose a user to view details"
            />
          )
        }
        defaultLeftWidth={35}
        defaultRightWidth={65}
        leftHeader={
          <div className="p-4 border-b">
            <Input placeholder="Search users..." />
          </div>
        }
      />
    </PageShell>
  )
}
```

### IDE-Style Editor

```tsx
export function EditorPage() {
  return (
    <PageShell>
      <PageHeader title="Editor" />
      <ThreeColumnLayout
        left={
          <FileExplorer
            files={files}
            selectedFile={selectedFile}
            onSelect={setSelectedFile}
          />
        }
        content={
          <CodeEditor
            file={selectedFile}
            onChange={handleChange}
          />
        }
        right={
          <PropertiesPanel
            file={selectedFile}
            onPropertyChange={handlePropertyChange}
          />
        }
        defaultLeftWidth={18}
        defaultContentWidth={60}
        defaultRightWidth={22}
      />
    </PageShell>
  )
}
```

### Settings Page with Navigation

```tsx
export function SettingsPage() {
  return (
    <PageShell>
      <PageHeader title="Settings" />
      <TwoColumnLayout
        left={
          <nav className="p-4 space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              General
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Security
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Billing
            </Button>
          </nav>
        }
        right={
          <div className="p-6">
            <Outlet />
          </div>
        }
        resizable={false}
        leftWidth="240px"
        rightWidth="auto"
      />
    </PageShell>
  )
}
```

### Form with Preview

```tsx
export function ContentEditorPage() {
  const [content, setContent] = React.useState("")

  return (
    <PageShell>
      <PageHeaderWithBack
        title="Edit Content"
        backButton={{ href: "/content" }}
        actions={<Button>Publish</Button>}
      />
      <TwoColumnLayout
        left={
          <div className="p-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content..."
              className="min-h-[400px]"
            />
          </div>
        }
        right={
          <div className="p-4 prose">
            <Markdown>{content}</Markdown>
          </div>
        }
        leftHeader={
          <div className="p-4 border-b font-medium">Editor</div>
        }
        rightHeader={
          <div className="p-4 border-b font-medium">Preview</div>
        }
        defaultLeftWidth={50}
        defaultRightWidth={50}
      />
    </PageShell>
  )
}
```

---

## Responsive Layout Behavior

### TwoColumnLayout on Mobile

On small screens, consider stacking columns:

```tsx
import { useIsMobile } from "@/hooks/use-mobile"

function ResponsiveMasterDetail() {
  const isMobile = useIsMobile()
  const [selectedItem, setSelectedItem] = React.useState(null)

  if (isMobile) {
    // On mobile, show list or detail, not both
    if (selectedItem) {
      return (
        <PageShell>
          <PageHeaderWithBack
            title={selectedItem.name}
            backButton={{ onClick: () => setSelectedItem(null) }}
          />
          <ItemDetail item={selectedItem} />
        </PageShell>
      )
    }
    
    return (
      <PageShell>
        <PageHeader title="Items" />
        <ItemList onSelect={setSelectedItem} />
      </PageShell>
    )
  }

  // Desktop: side-by-side
  return (
    <PageShell>
      <PageHeader title="Items" />
      <TwoColumnLayout
        left={<ItemList selected={selectedItem} onSelect={setSelectedItem} />}
        right={selectedItem ? <ItemDetail item={selectedItem} /> : <EmptyState />}
      />
    </PageShell>
  )
}
```

### Sheet for Mobile Properties

```tsx
function MobileResponsiveEditor() {
  const isMobile = useIsMobile()
  const [propertiesOpen, setPropertiesOpen] = React.useState(false)

  return (
    <PageShell>
      <PageHeader
        title="Editor"
        actions={
          isMobile && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setPropertiesOpen(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          )
        }
      />
      
      {isMobile ? (
        <>
          <EditorContent />
          <Sheet open={propertiesOpen} onOpenChange={setPropertiesOpen}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Properties</SheetTitle>
              </SheetHeader>
              <PropertiesPanel />
            </SheetContent>
          </Sheet>
        </>
      ) : (
        <TwoColumnLayout
          left={<EditorContent />}
          right={<PropertiesPanel />}
          defaultLeftWidth={70}
          defaultRightWidth={30}
        />
      )}
    </PageShell>
  )
}
```

---

## Common Spacing Patterns

### Container Widths

```tsx
// Full width (dashboards, tables)
<div className="container mx-auto py-6 px-4">

// Medium width (settings, profiles)
<div className="container mx-auto py-6 px-4 max-w-4xl">

// Narrow width (forms, articles)
<div className="container mx-auto py-6 px-4 max-w-2xl">

// Extra narrow (login, simple forms)
<div className="container mx-auto py-6 px-4 max-w-md">
```

### Section Spacing

```tsx
// Vertical spacing between sections
<div className="space-y-6">
  <Section1 />
  <Section2 />
  <Section3 />
</div>

// Larger spacing
<div className="space-y-8">
  <Section1 />
  <Section2 />
</div>
```

### Grid Gaps

```tsx
// Standard gap
<div className="grid gap-4 md:grid-cols-2">

// Larger gap
<div className="grid gap-6 md:grid-cols-3">
```

---

## Related Documentation

- [Page Creation](./02-page-creation.md) - Complete page examples
- [Component Usage](./01-component-usage.md) - When to use which component
- [Navigation Patterns](./03-navigation-patterns.md) - Navigation integration

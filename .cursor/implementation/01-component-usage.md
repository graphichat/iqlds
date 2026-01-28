# Component Usage Guidelines

This document provides decision trees and guidelines for choosing the right component for each use case.

---

## Component Categories

### 1. UI Primitives (`components/ui/`)

Low-level, reusable UI elements with no business logic or layout knowledge.

| Component | Use When |
|-----------|----------|
| `Button` | User actions (submit, cancel, navigate) |
| `Card` | Grouping related content with visual boundary |
| `Input` | Text input fields |
| `Select` | Dropdown selection from options |
| `Dialog` | Modal content requiring user attention |
| `Sheet` | Slide-out panel (mobile-friendly dialogs) |
| `Tabs` | Switching between related content views |
| `Table` | Displaying tabular data |
| `Avatar` | User/entity profile images |
| `Badge` | Status indicators, counts, labels |
| `Separator` | Visual divider between sections |
| `Skeleton` | Loading placeholders |

### 2. Blocks (`components/blocks/`)

Reusable sections that compose UI primitives. May have internal state.

| Block | Use When |
|-------|----------|
| `PageHeader` | Page title bar with optional actions |
| `PageTabs` | Tab navigation within a page |
| `BackButton` | Navigate back (history or specific path) |
| `DataTable` | Advanced table with sorting/filtering/pagination |
| `MetricCard` | KPI/metric display with trend indicators |
| `LoginForm` | Authentication login UI |
| `PasswordResetForm` | Password recovery UI |
| `GlobalSidebar` | Main application navigation |
| `GlobalHeader` | Application header with breadcrumbs |
| `GlobalFooter` | Application footer |
| `ErrorBoundary` | Component-level error handling |
| `RouteErrorBoundary` | Route-level error handling |
| `LoadingState` | Full loading indicators |
| `EmptyState` | Empty data state with actions |
| `ErrorState` | Error display with retry actions |

### 3. Layouts (`components/layouts/`)

Structural components that define page/section arrangement.

| Layout | Use When |
|--------|----------|
| `AppShell` | Main application frame (sidebar + header + content) |
| `PageShell` | Base page container with flex layout |
| `TwoColumnLayout` | Master-detail, resizable split views |
| `ThreeColumnLayout` | IDE-style (tree + editor + properties) |
| `PageWithProperties` | Content + fixed properties panel |
| `SplitLayout` | Simple non-resizable split (legacy) |

### 4. Patterns (`components/patterns/`)

Pre-composed combinations for common scenarios.

| Pattern | Use When |
|---------|----------|
| `PageHeaderWithTabs` | Page needs header + tab navigation |
| `PageHeaderWithBack` | Page needs header + back navigation |

---

## Decision Trees

### Choosing a Button Variant

```
What is the action importance?

├─ Primary action (main CTA)
│  └─ variant="default"
│
├─ Secondary action
│  └─ variant="secondary" or variant="outline"
│
├─ Destructive action (delete, remove)
│  └─ variant="destructive"
│
├─ Navigation/subtle action
│  └─ variant="ghost"
│
└─ Link-style action
   └─ variant="link"
```

**Button Sizes**:
- `size="default"` - Standard actions
- `size="sm"` - Dense UIs, tables, compact headers
- `size="lg"` - Prominent CTAs, hero sections
- `size="icon"` or `size="icon-sm"` - Icon-only buttons

### Choosing a Card Component

```
What type of content?

├─ Simple content group
│  └─ <Card>
│       <CardContent>{content}</CardContent>
│     </Card>
│
├─ Content with title/description
│  └─ <Card>
│       <CardHeader>
│         <CardTitle>Title</CardTitle>
│         <CardDescription>Description</CardDescription>
│       </CardHeader>
│       <CardContent>{content}</CardContent>
│     </Card>
│
├─ Content with actions
│  └─ <Card>
│       <CardHeader>...</CardHeader>
│       <CardContent>{content}</CardContent>
│       <CardFooter>
│         <Button>Action</Button>
│       </CardFooter>
│     </Card>
│
└─ KPI/Metric display
   └─ <MetricCard
        title="Total Revenue"
        value="$124,580"
        change="+12.5%"
        trend="up"
        icon={DollarSign}
      />
```

### Choosing an Input Type

```
What type of input?

├─ Single line text
│  └─ <Input type="text" />
│
├─ Password
│  └─ <Input type="password" />
│
├─ Multi-line text
│  └─ <Textarea />
│
├─ Selection from few options (<5)
│  └─ <RadioGroup>
│
├─ Selection from many options (5+)
│  └─ <Select>
│
├─ Searchable selection
│  └─ <Combobox>
│
├─ Boolean toggle
│  └─ <Switch /> or <Checkbox />
│
├─ Date selection
│  └─ <Calendar /> with <Popover>
│
└─ File upload
   └─ <Input type="file" />
```

### Choosing a Modal/Overlay

```
What is the interaction type?

├─ Critical action requiring confirmation
│  └─ <AlertDialog>
│
├─ Form or complex content
│  └─ <Dialog>
│
├─ Contextual menu
│  └─ <DropdownMenu>
│
├─ Additional info on hover
│  └─ <HoverCard>
│
├─ Brief tooltip
│  └─ <Tooltip>
│
├─ Mobile-friendly panel
│  └─ <Sheet>
│
└─ Side panel (properties, details)
   └─ <Sheet side="right">
```

### Choosing a Data Display

```
What type of data?

├─ Tabular data with few rows (<20)
│  └─ <Table>
│
├─ Tabular data with sorting/filtering/pagination
│  └─ <DataTable>
│
├─ Key-value pairs
│  └─ <dl> with Tailwind or Card layout
│
├─ Charts/graphs
│  └─ <ChartContainer> with Recharts
│
├─ Single metric/KPI
│  └─ <MetricCard>
│
├─ List of items
│  └─ Flex/Grid with Cards or custom items
│
└─ Loading placeholder
   └─ <Skeleton /> or <SkeletonLoader>
```

---

## Component Best Practices

### Icons

Always use `ICON_STROKE_WIDTH` constant for consistent visual weight:

```tsx
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { Settings, Home, User } from "lucide-react"

// Correct
<Settings strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
<Home strokeWidth={ICON_STROKE_WIDTH} className="size-4" />

// Icon sizes
// size-3.5 (14px) - Very small, badges
// size-4 (16px) - Standard, buttons, menu items
// size-5 (20px) - Medium emphasis
// size-6 (24px) - Large emphasis, headers
```

### Form Fields

Use `Field` component for consistent form layout:

```tsx
import { Field } from "@/components/ui/field"

<Field>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter email" />
  <p className="text-sm text-muted-foreground">
    We'll never share your email.
  </p>
</Field>
```

### Loading States

```tsx
// Full page loading
import { LoadingState } from "@/components/blocks/loading-state"
<LoadingState />

// Inline loading
import { Spinner } from "@/components/ui/spinner"
<Button disabled>
  <Spinner className="mr-2 h-4 w-4" />
  Loading...
</Button>

// Skeleton placeholders
import { Skeleton } from "@/components/ui/skeleton"
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-12 w-12 rounded-full" />
```

### Error States

```tsx
// Route-level errors (in router config)
{
  element: <AppShell />,
  errorElement: <RouteErrorBoundary />,
  children: [...]
}

// Component-level errors
import { ErrorBoundary } from "@/components/blocks/error-boundary"

<ErrorBoundary
  fallback={CustomFallback}
  onError={(error) => logError(error)}
>
  <RiskyComponent />
</ErrorBoundary>

// Data error display
import { ErrorState } from "@/components/blocks/error-state"

<ErrorState
  title="Failed to load data"
  description="An error occurred while fetching data."
  action={{ label: "Retry", onClick: refetch }}
/>
```

### Empty States

```tsx
import { EmptyState } from "@/components/blocks/empty-state"

<EmptyState
  icon={FileText}
  title="No documents"
  description="Get started by creating your first document."
  action={{ label: "Create Document", onClick: handleCreate }}
/>
```

---

## Accessibility Checklist

When using components, ensure:

1. **Interactive elements have labels**:
   ```tsx
   // Icon-only button
   <Button variant="ghost" size="icon" aria-label="Settings">
     <Settings />
   </Button>
   ```

2. **Forms have proper associations**:
   ```tsx
   <Label htmlFor="email">Email</Label>
   <Input id="email" aria-describedby="email-hint" />
   <p id="email-hint" className="text-sm text-muted-foreground">
     Enter your work email.
   </p>
   ```

3. **Images have alt text**:
   ```tsx
   <Avatar>
     <AvatarImage src={url} alt="User profile" />
     <AvatarFallback>JD</AvatarFallback>
   </Avatar>
   ```

4. **Focus states are visible**:
   Most components have built-in focus rings via Tailwind.

5. **Color is not the only indicator**:
   Use icons, text, or patterns alongside color for status.

---

## Related Documentation

- [Page Creation](./02-page-creation.md) - Creating pages with components
- [Layout Patterns](./05-layout-patterns.md) - Layout component decision tree
- [Components Docs](../../docs/components.md) - Component API reference

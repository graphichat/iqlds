# Page Layouts

This document describes the different page layout patterns used in the application.

## Layout Types

### 1. Container Layout

A centered container with max-width constraints.

```tsx
<div className="container mx-auto px-4 py-8">
  {/* Content */}
</div>
```

**Use when:**
- Creating standard content pages
- Need consistent max-width across breakpoints
- Content should be centered

### 2. Full-Width Layout

Content spans the full viewport width.

```tsx
<div className="w-full">
  {/* Content */}
</div>
```

**Use when:**
- Creating hero sections
- Dashboard-style layouts
- Full-width components like carousels

### 3. Grid Layout

Using CSS Grid for complex layouts.

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

**Use when:**
- Displaying cards or items in a grid
- Responsive multi-column layouts
- Complex layout requirements

### 4. Flex Layout

Using Flexbox for flexible layouts.

```tsx
<div className="flex flex-col md:flex-row gap-4">
  {/* Flex items */}
</div>
```

**Use when:**
- Simple horizontal/vertical arrangements
- Aligning items
- Responsive direction changes

### 5. Sidebar Layout

Layout with a fixed or collapsible sidebar.

```tsx
<div className="flex h-screen">
  <aside className="w-64 border-r">
    {/* Sidebar content */}
  </aside>
  <main className="flex-1 overflow-auto">
    {/* Main content */}
  </main>
</div>
```

**Use when:**
- Navigation-heavy pages
- Dashboard interfaces
- Admin panels

## Responsive Breakpoints

The application uses Tailwind's default breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Spacing Guidelines

- **Page padding**: `py-8` or `py-12` for vertical spacing
- **Section spacing**: `space-y-6` or `space-y-8` between sections
- **Container padding**: `px-4` or `px-6` for horizontal padding

## Examples

### Dashboard Layout

```tsx
<div className="flex h-screen">
  <Sidebar />
  <div className="flex-1 flex flex-col">
    <Header />
    <main className="flex-1 overflow-auto p-6">
      {/* Dashboard content */}
    </main>
  </div>
</div>
```

### Content Page Layout

```tsx
<div className="container mx-auto max-w-4xl px-4 py-8">
  <header className="mb-8">
    <h1 className="text-4xl font-bold">Page Title</h1>
    <p className="text-muted-foreground mt-2">Subtitle</p>
  </header>
  <Separator />
  <article className="mt-8 prose">
    {/* Article content */}
  </article>
</div>
```



# UX Guidelines for AI Agents

This document provides UX best practices and patterns that AI agents should follow when creating or modifying UI.

---

## Core UX Principles

### 1. Clarity Over Cleverness

- Use clear, descriptive labels
- Prefer explicit over implicit interactions
- Show system status and feedback

### 2. Consistency Everywhere

- Same action = same appearance everywhere
- Same terminology throughout
- Same patterns for similar tasks

### 3. Error Prevention

- Disable invalid actions
- Confirm destructive operations
- Provide clear validation messages

### 4. Efficient Workflows

- Minimize clicks for common tasks
- Support keyboard navigation
- Remember user preferences

---

## UI Text Guidelines

### Button Labels

```tsx
// DO: Clear action verbs
<Button>Create User</Button>
<Button>Save Changes</Button>
<Button>Delete Project</Button>
<Button>Export Report</Button>

// DON'T: Vague or generic labels
<Button>Submit</Button>
<Button>OK</Button>
<Button>Yes</Button>
<Button>Process</Button>
```

### Dialog Confirmation

```tsx
// DO: Specific, clear confirmation
<AlertDialogTitle>Delete "My Project"?</AlertDialogTitle>
<AlertDialogDescription>
  This will permanently delete the project and all its data. 
  This action cannot be undone.
</AlertDialogDescription>
<AlertDialogAction variant="destructive">Delete Project</AlertDialogAction>
<AlertDialogCancel>Keep Project</AlertDialogCancel>

// DON'T: Generic confirmation
<AlertDialogTitle>Are you sure?</AlertDialogTitle>
<AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
<AlertDialogAction>Yes</AlertDialogAction>
<AlertDialogCancel>No</AlertDialogCancel>
```

### Form Labels and Hints

```tsx
// DO: Descriptive labels with helpful hints
<div className="space-y-2">
  <Label htmlFor="email">Work Email</Label>
  <Input id="email" type="email" placeholder="you@company.com" />
  <p className="text-sm text-muted-foreground">
    We'll send a verification link to this address.
  </p>
</div>

// DON'T: Minimal labels, no context
<div>
  <Label>Email</Label>
  <Input type="email" />
</div>
```

### Error Messages

```tsx
// DO: Specific, actionable error messages
<div className="text-sm text-destructive">
  Password must be at least 8 characters with one number and one special character.
</div>

<ErrorState
  title="Unable to load users"
  description="The server returned an error. Please check your connection and try again."
  action={{ label: "Retry", onClick: refetch }}
/>

// DON'T: Vague or technical errors
<div className="text-red-500">Invalid input</div>
<div className="text-red-500">Error 500: Internal Server Error</div>
```

### Empty States

```tsx
// DO: Helpful empty states with actions
<EmptyState
  icon={FileText}
  title="No documents yet"
  description="Create your first document to get started. Documents help you organize and share information."
  action={{ label: "Create Document", onClick: handleCreate }}
/>

// DON'T: Unhelpful empty states
<div>No data</div>
<div>Nothing here</div>
```

---

## Interaction Patterns

### Primary vs Secondary Actions

```tsx
// Primary action: Main CTA, stands out
// Secondary action: Alternative option, less prominent

<CardFooter className="flex justify-end gap-2">
  <Button variant="outline">Cancel</Button>  {/* Secondary */}
  <Button>Save Changes</Button>              {/* Primary */}
</CardFooter>

// Destructive actions: Require confirmation
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  {/* Confirmation dialog */}
</AlertDialog>
```

### Action Ordering

Right-to-left reading order for buttons:
```tsx
// Most important action on the right
<div className="flex gap-2 justify-end">
  <Button variant="ghost">Cancel</Button>    {/* Least important */}
  <Button variant="outline">Save Draft</Button>
  <Button>Publish</Button>                   {/* Most important */}
</div>
```

### Loading States

```tsx
// Show loading state in-place
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Spinner className="mr-2 size-4" />
      Saving...
    </>
  ) : (
    "Save Changes"
  )}
</Button>

// For data loading, use skeleton
if (isLoading) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[300px]" />
    </div>
  )
}
```

### Form Submission

```tsx
// Disable form during submission
// Show loading state
// Provide success/error feedback

async function handleSubmit(data: FormData) {
  try {
    setIsSubmitting(true)
    await createUser(data)
    toast.success("User created successfully")
    navigate("/users")
  } catch (error) {
    toast.error("Failed to create user. Please try again.")
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## Responsive Design Rules

### Mobile-First Approach

```tsx
// Start with mobile styles, add breakpoints for larger screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Cards */}
</div>

// Stack on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-4">
  {/* Items */}
</div>
```

### Touch Targets

```tsx
// Minimum 44x44px for touch targets
<Button size="default">  {/* 36px height - add padding if needed */}
  Touch Target
</Button>

// For icon buttons
<Button size="icon" className="h-10 w-10">  {/* 40px */}
  <Settings className="size-4" />
</Button>
```

### Content Priority on Mobile

```tsx
// Hide less important content on mobile
<div className="hidden md:block">
  Secondary navigation
</div>

// Show condensed version on mobile
<div className="md:hidden">
  <Button variant="ghost" size="icon">
    <Menu />
  </Button>
</div>
```

---

## Accessibility Checklist

### Keyboard Navigation

- [ ] All interactive elements focusable via Tab
- [ ] Focus order follows visual order
- [ ] Focus visible (focus ring)
- [ ] Escape closes modals/dropdowns
- [ ] Enter/Space activates buttons

### Screen Readers

```tsx
// Icon-only buttons need labels
<Button variant="ghost" size="icon" aria-label="Open settings">
  <Settings className="size-4" />
</Button>

// Loading states announced
<Button disabled aria-busy="true">
  <Spinner className="mr-2" />
  <span>Loading...</span>
</Button>

// Dynamic content updates
<div role="status" aria-live="polite">
  {successMessage}
</div>
```

### Color Contrast

- [ ] Text has 4.5:1 contrast ratio (AA)
- [ ] Large text has 3:1 contrast ratio
- [ ] Don't rely on color alone for meaning

```tsx
// DO: Color + icon for status
<Badge variant="destructive">
  <AlertCircle className="mr-1 size-3" />
  Error
</Badge>

// DON'T: Color alone
<span className="text-red-500">Error</span>
```

### Form Accessibility

```tsx
// Associate labels with inputs
<Label htmlFor="email">Email</Label>
<Input id="email" aria-describedby="email-hint email-error" />
<p id="email-hint" className="text-sm text-muted-foreground">
  Enter your work email
</p>
{error && (
  <p id="email-error" role="alert" className="text-sm text-destructive">
    {error}
  </p>
)}
```

---

## Data Display Patterns

### Tables

```tsx
// Use DataTable for complex data
<DataTable
  columns={columns}
  data={data}
  searchKey="name"
  searchPlaceholder="Search by name..."
/>

// Provide sorting and filtering
// Show row counts
// Handle empty state
```

### Lists

```tsx
// Consistent list item structure
<div className="divide-y">
  {items.map((item) => (
    <div key={item.id} className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <Avatar>...</Avatar>
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-muted-foreground">{item.email}</div>
        </div>
      </div>
      <Button variant="ghost" size="sm">View</Button>
    </div>
  ))}
</div>
```

### Cards Grid

```tsx
// Responsive grid with consistent spacing
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>...</CardContent>
    </Card>
  ))}
</div>
```

---

## Navigation UX

### Breadcrumbs

- Always show current location
- Make parent items clickable
- Keep breadcrumb text short

### Sidebar

- Group related items
- Use clear icons
- Highlight active item
- Support collapse for more space

### Tabs

- Limit to 5-6 tabs max
- Use clear, short labels
- Indicate which tab is active
- Don't use tabs for sequential steps (use stepper)

---

## Form UX Patterns

### Progressive Disclosure

```tsx
// Show advanced options only when needed
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">
      Advanced Options
      <ChevronDown className="ml-2 size-4" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* Advanced form fields */}
  </CollapsibleContent>
</Collapsible>
```

### Inline Validation

```tsx
// Validate on blur, not on every keystroke
<Input
  onBlur={(e) => validateEmail(e.target.value)}
  aria-invalid={!!error}
/>
{error && (
  <p className="text-sm text-destructive">{error}</p>
)}
```

### Form Layout

```tsx
// Two columns on desktop, single column on mobile
<div className="grid gap-4 md:grid-cols-2">
  <div className="space-y-2">
    <Label htmlFor="firstName">First Name</Label>
    <Input id="firstName" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="lastName">Last Name</Label>
    <Input id="lastName" />
  </div>
</div>

// Full width for long fields
<div className="space-y-2">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" />
</div>
```

### Required Fields

```tsx
// Mark required fields clearly
<Label htmlFor="email">
  Email <span className="text-destructive">*</span>
</Label>
<Input id="email" required />

// Or note at form top
<p className="text-sm text-muted-foreground mb-4">
  Fields marked with <span className="text-destructive">*</span> are required.
</p>
```

---

## Feedback Patterns

### Success Feedback

```tsx
// Toast for async success
toast.success("Changes saved successfully")

// Inline for form submission
<Alert variant="default">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved.
  </AlertDescription>
</Alert>
```

### Error Feedback

```tsx
// Toast for unexpected errors
toast.error("Something went wrong. Please try again.")

// Inline for form validation
<p className="text-sm text-destructive" role="alert">
  Please enter a valid email address.
</p>

// Full error state for page-level failures
<ErrorState
  title="Failed to load data"
  description="Please check your connection and try again."
  action={{ label: "Retry", onClick: refetch }}
/>
```

### Progress Feedback

```tsx
// For long operations
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Uploading...</span>
    <span>75%</span>
  </div>
  <Progress value={75} />
</div>
```

---

## AI Agent Decision Guide

When building UI, ask:

1. **What's the user trying to do?** → Choose appropriate pattern
2. **What could go wrong?** → Add error handling
3. **How will user know it worked?** → Add success feedback
4. **What if there's no data?** → Add empty state
5. **What if it's loading?** → Add loading state
6. **Can user undo mistakes?** → Add confirmation for destructive actions
7. **Does it work on mobile?** → Test responsive behavior
8. **Is it accessible?** → Check keyboard + screen reader

---

## Common Mistakes to Avoid

### Don't Do This:

```tsx
// ❌ Generic button labels
<Button>Submit</Button>
<Button>OK</Button>

// ❌ No loading states
<Button onClick={saveData}>Save</Button>

// ❌ No error handling
const data = await fetchData() // What if it fails?

// ❌ Icon buttons without labels
<Button size="icon"><Settings /></Button>

// ❌ Unclear empty states
{data.length === 0 && <p>No results</p>}

// ❌ Missing touch targets
<button className="p-1">Tiny button</button>

// ❌ Color-only status
<span className="text-green-500">Active</span>
```

### Do This Instead:

```tsx
// ✅ Specific button labels
<Button>Save Changes</Button>
<Button>Create Project</Button>

// ✅ Loading states
<Button disabled={isLoading}>
  {isLoading ? <><Spinner className="mr-2" />Saving...</> : "Save Changes"}
</Button>

// ✅ Error handling
try {
  const data = await fetchData()
} catch (error) {
  toast.error("Failed to load data")
}

// ✅ Accessible icon buttons
<Button size="icon" aria-label="Open settings">
  <Settings />
</Button>

// ✅ Helpful empty states
{data.length === 0 && (
  <EmptyState
    title="No projects yet"
    description="Create your first project to get started."
    action={{ label: "Create Project", onClick: handleCreate }}
  />
)}

// ✅ Adequate touch targets
<Button size="default" className="min-h-[44px]">Tappable</Button>

// ✅ Status with icon
<Badge variant="default">
  <CheckCircle className="mr-1 size-3" />
  Active
</Badge>
```

---

## Related Documentation

- [Component Usage](./01-component-usage.md) - Component selection guide
- [Page Creation](./02-page-creation.md) - Page patterns
- [Page Transitions](./06-page-transitions.md) - Animation guidelines

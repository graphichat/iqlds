# Page Transitions & Animations

This document covers animation patterns, page transitions, and motion guidelines for a polished user experience.

---

## Animation Philosophy

### Core Principles

1. **Purpose**: Every animation should have a reason - convey feedback, guide attention, or show relationships
2. **Speed**: Prefer quick animations (150-300ms) for most interactions
3. **Consistency**: Use the same animation curves and durations throughout
4. **Subtlety**: Animations should enhance, not distract

### When to Animate

| Action | Animation Type |
|--------|---------------|
| Page navigation | Minimal or none (keep fast) |
| Modal/dialog open | Fade + scale or slide |
| Sheet/drawer open | Slide from edge |
| Dropdown/popover | Fade + slight scale |
| Accordion expand | Height transition |
| Loading states | Skeleton pulse or spinner |
| Hover states | Quick color/background transition |
| Success feedback | Check animation or toast slide |
| Error feedback | Shake or color flash |

### When NOT to Animate

- Initial page load (minimize time to interactive)
- Repeated rapid actions
- When user has reduced motion preference
- Background/secondary UI changes

---

## Tailwind Animation Utilities

### Duration Classes

```tsx
// Available durations
duration-75    // 75ms  - Very fast (hover states)
duration-100   // 100ms - Fast
duration-150   // 150ms - Standard micro-interactions
duration-200   // 200ms - Standard transitions
duration-300   // 300ms - Noticeable transitions
duration-500   // 500ms - Slow, deliberate animations
duration-700   // 700ms - Very slow
duration-1000  // 1000ms - Long animations
```

### Timing Functions

```tsx
ease-linear      // Linear (progress bars)
ease-in          // Slow start, fast end (exiting)
ease-out         // Fast start, slow end (entering)
ease-in-out      // Slow start and end (most UI)
```

### Common Animation Patterns

```tsx
// Standard hover transition
<button className="transition-colors duration-150 hover:bg-accent">
  Button
</button>

// Background color change
<div className="transition-all duration-200 hover:bg-muted">
  Content
</div>

// Transform transition
<div className="transition-transform duration-200 hover:scale-105">
  Card
</div>

// Multiple properties
<div className="transition-[background-color,transform] duration-200 hover:bg-accent hover:-translate-y-0.5">
  Interactive element
</div>
```

---

## Component-Level Animations

### Sidebar Collapse Animation

The sidebar has smooth, optimized transitions following shadcn best practices:

```tsx
// In sidebar.tsx - Sidebar gap (spacer)
className="transition-[width] duration-200 ease-in-out will-change-[width]"

// Sidebar container (actual sidebar)
className="transition-[left,right,width] duration-200 ease-in-out will-change-[width,left,right]"

// Collapsed state uses CSS variables
group-data-[collapsible=icon]:w-(--sidebar-width-icon)
```

**Key improvements:**
- Uses `ease-in-out` for smoother bidirectional transitions
- Added `will-change` hints for better GPU acceleration
- Consistent 200ms duration for predictable feel

The sidebar text fades out smoothly:
```tsx
// In global-sidebar.tsx - Logo text
className="transition-[opacity,max-width] duration-200 ease-in-out will-change-[opacity,max-width]
           group-data-[collapsible=icon]:opacity-0 
           group-data-[collapsible=icon]:max-w-0"
```

**Transition details:**
- Width transitions: 200ms ease-in-out (smooth expand/collapse)
- Text fade: 200ms ease-in-out (logo text and labels)
- Menu button transitions: 200ms ease-out (for padding/height changes)

### Dialog/Modal Animation

Dialogs use Radix UI's built-in animations:

```tsx
// In dialog.tsx
<DialogContent className="data-[state=open]:animate-in data-[state=closed]:animate-out 
                          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
                          data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
```

### Sheet/Drawer Animation

Sheets slide from their configured side:

```tsx
// In sheet.tsx
// Right sheet
data-[state=open]:slide-in-from-right
data-[state=closed]:slide-out-to-right

// Left sheet  
data-[state=open]:slide-in-from-left
data-[state=closed]:slide-out-to-left

// Bottom sheet
data-[state=open]:slide-in-from-bottom
data-[state=closed]:slide-out-to-bottom
```

### Dropdown/Popover Animation

```tsx
// In dropdown-menu.tsx
data-[state=open]:animate-in 
data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 
data-[state=open]:fade-in-0 
data-[state=closed]:zoom-out-95 
data-[state=open]:zoom-in-95
```

### Accordion/Collapsible Animation

```tsx
// In accordion.tsx
<AccordionContent className="data-[state=closed]:animate-accordion-up 
                             data-[state=open]:animate-accordion-down">
```

---

## Page Transition Patterns

### Recommended: Minimal Page Transitions

For most applications, instant page transitions are preferred for speed:

```tsx
// router.tsx - Pages load instantly via React Router
{
  element: <AppShell />,
  children: [
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/settings", element: <SettingsPage /> },
  ],
}
```

### Optional: Fade Transitions

If you want subtle page transitions:

```tsx
// Create a PageTransition wrapper
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Usage in AppShell
<main className="flex-1 overflow-auto">
  <PageTransition>
    <Outlet />
  </PageTransition>
</main>
```

**Note**: Adding page transitions requires installing `framer-motion`. Only add if the UX benefit outweighs the bundle size increase.

### Tab Content Transitions

For tab changes, consider subtle crossfade:

```tsx
// Simple approach with CSS
<div className="transition-opacity duration-150">
  {activeTab === "general" && <GeneralSettings />}
  {activeTab === "security" && <SecuritySettings />}
</div>

// Or with AnimatePresence
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.15 }}
  >
    {activeTab === "general" && <GeneralSettings />}
    {activeTab === "security" && <SecuritySettings />}
  </motion.div>
</AnimatePresence>
```

---

## Loading State Animations

### Skeleton Pulse

```tsx
// Built-in skeleton animation
<Skeleton className="h-4 w-[200px]" />

// Skeleton uses animate-pulse
@keyframes pulse {
  50% { opacity: .5; }
}
```

### Spinner

```tsx
import { Spinner } from "@/components/ui/spinner"

// Default spinner with rotation
<Spinner className="size-4" />

// In button
<Button disabled>
  <Spinner className="mr-2 size-4" />
  Loading...
</Button>
```

### Loading Overlay

```tsx
import { LoadingOverlay } from "@/components/blocks/loading-overlay"

// Full container overlay
<div className="relative">
  <Content />
  {isLoading && <LoadingOverlay />}
</div>
```

---

## Micro-Interactions

### Button States

```tsx
// Built into Button component
<Button className="transition-colors">
  // Hover: bg-primary/90
  // Active: scale slightly (optional)
  // Disabled: reduced opacity
</Button>

// Custom active state
<Button className="active:scale-95 transition-transform">
  Press Me
</Button>
```

### Card Hover

```tsx
<Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
  <CardContent>Hoverable card</CardContent>
</Card>
```

### List Item Selection

```tsx
<div 
  className={cn(
    "p-3 rounded-md transition-colors cursor-pointer",
    isSelected 
      ? "bg-accent text-accent-foreground" 
      : "hover:bg-muted"
  )}
>
  List item
</div>
```

### Icon Button Rotation

```tsx
<Button
  variant="ghost"
  size="icon"
  className="transition-transform duration-200"
  onClick={() => setIsOpen(!isOpen)}
>
  <ChevronDown 
    className={cn(
      "size-4 transition-transform duration-200",
      isOpen && "rotate-180"
    )} 
  />
</Button>
```

---

## Toast/Notification Animations

The Sonner toast component handles animations:

```tsx
import { toast } from "sonner"

// Toast slides in from bottom-right
toast.success("Saved successfully")
toast.error("Something went wrong")
```

Custom toast animation can be configured in the Toaster:

```tsx
<Toaster
  position="bottom-right"
  toastOptions={{
    duration: 4000,
    style: {
      // Custom styles
    },
  }}
/>
```

---

## Reduced Motion Support

Always respect user's motion preferences:

```tsx
// Tailwind's motion-reduce variant
<div className="animate-bounce motion-reduce:animate-none">
  Bouncing element
</div>

// CSS approach
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Using Motion Preference Hook

```tsx
function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = React.useState(false)
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])
  
  return reducedMotion
}

// Usage
const reducedMotion = useReducedMotion()

<motion.div
  animate={{ scale: 1.1 }}
  transition={{ duration: reducedMotion ? 0 : 0.2 }}
/>
```

---

## Animation Performance Tips

### Use transform and opacity

These properties are GPU-accelerated:

```tsx
// Good - GPU accelerated
<div className="transition-transform hover:-translate-y-1">
<div className="transition-opacity hover:opacity-75">

// Avoid when possible - triggers layout
<div className="transition-[width] hover:w-full">
<div className="transition-[height] hover:h-20">
```

### Will-change for Complex Animations

```tsx
// Add will-change for frequently animated elements
<div className="will-change-transform transition-transform hover:scale-105">
  Frequently animated
</div>
```

### Avoid Animation on Scroll

```tsx
// Don't animate all elements during scroll
// Use Intersection Observer for reveal animations
const [isVisible, setIsVisible] = React.useState(false)

React.useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.1 }
  )
  observer.observe(ref.current)
  return () => observer.disconnect()
}, [])

<div className={cn(
  "transition-opacity duration-500",
  isVisible ? "opacity-100" : "opacity-0"
)}>
  Revealed on scroll
</div>
```

---

## Summary Table

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Hover states | Color/background | 150ms | ease-out |
| Dialog open | Fade + scale | 200ms | ease-out |
| Sheet open | Slide from edge | 300ms | ease-out |
| Dropdown | Fade + scale | 150ms | ease-out |
| Accordion | Height expand | 200ms | ease-in-out |
| Skeleton | Pulse | 2s | linear |
| Toast | Slide in | 200ms | ease-out |
| Sidebar collapse | Width | 200ms | linear |
| Tab switch | Opacity (optional) | 150ms | ease-out |
| Page transition | None (instant) | - | - |

---

## Related Documentation

- [Component Usage](./01-component-usage.md) - Component-specific animations
- [UX Guidelines](./07-ux-guidelines.md) - Overall UX patterns

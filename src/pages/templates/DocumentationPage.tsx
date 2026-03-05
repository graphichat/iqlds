import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"
import { TwoColumnLayout } from "@/components/layouts/two-column-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FileText } from "lucide-react"

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

const SIDEBAR_SECTIONS = [
  { id: "overview",           label: "Overview" },
  { id: "creating-pages",     label: "Creating Pages" },
  { id: "layout-structure",   label: "Layout Structure" },
  { id: "auth-layout",        label: "Auth Layout" },
  { id: "components-by-area", label: "Blocks & Patterns" },
  { id: "ui-components",      label: "UI Components" },
  { id: "hooks",              label: "Hooks" },
  { id: "page-templates",     label: "Page Templates" },
  { id: "best-practices",     label: "Best Practices" },
] as const

function DocNavLink({ id, label, isActive }: { id: string; label: string; isActive?: boolean }) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.location.hash = id
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start text-left h-auto py-2 px-3"
      onClick={handleClick}
    >
      <span className="text-sm font-medium">{label}</span>
    </Button>
  )
}

function DocSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6">
      <h2 className="text-2xl font-semibold tracking-tight border-b pb-2 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function DocSubsection({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-base font-medium">{title}</h3>
        {badge && <Badge variant="secondary" className="text-[10px]">{badge}</Badge>}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto border">
      <code>{children}</code>
    </pre>
  )
}

function InlineCode({ children }: { children: string }) {
  return <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">{children}</code>
}

function DocP({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DocumentationPage() {
  const [activeSection, setActiveSection] = React.useState<string>("overview")

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      setActiveSection(SIDEBAR_SECTIONS.some((s) => s.id === hash) ? hash : "overview")
    }
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <PageShell>
      <PageHeaderWithBack
        title="Documentation"
        backButton={{ href: "/", label: "Home" }}
        className="border-b"
      />
      <div className="flex-1 overflow-hidden">
        <TwoColumnLayout
          left={
            <ScrollArea className="h-full">
              <div className="p-4 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-2">
                    <FileText className="h-4 w-4" />
                    <h3 className="text-sm font-semibold">Documentation</h3>
                  </div>
                  <div className="space-y-1">
                    {SIDEBAR_SECTIONS.map(({ id, label }) => (
                      <DocNavLink key={id} id={id} label={label} isActive={activeSection === id} />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          }
          right={
            <ScrollArea className="h-full">
              <div className="p-8 space-y-6 max-w-3xl">

                {/* ── Overview ─────────────────────────────────────────── */}
                <DocSection id="overview" title="Overview">
                  <DocP>
                    The IQLine Design System is a React 19 + Vite + TypeScript + Tailwind v4
                    component library built on top of shadcn. It ships four component tiers,
                    page templates, custom hooks, and a shadcn-compatible registry.
                  </DocP>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "UI primitives",  path: "src/components/ui/",       desc: "57 shadcn-based atomic components" },
                      { label: "Blocks",          path: "src/components/blocks/",   desc: "30 composite, app-specific components" },
                      { label: "Patterns",        path: "src/components/patterns/", desc: "Reusable compositions (FormSection, StatRow…)" },
                      { label: "Layouts",         path: "src/components/layouts/",  desc: "8 full-page layout wrappers" },
                      { label: "Hooks",           path: "src/hooks/",               desc: "6 custom React hooks" },
                      { label: "Page templates",  path: "src/pages/templates/",     desc: "27 production-ready page templates" },
                    ].map((item) => (
                      <div key={item.path} className="rounded-lg border p-3 space-y-1">
                        <p className="text-sm font-medium">{item.label}</p>
                        <InlineCode>{item.path}</InlineCode>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </DocSection>

                <Separator />

                {/* ── Creating pages ───────────────────────────────────── */}
                <DocSection id="creating-pages" title="Creating Pages">
                  <DocSubsection title="Minimal page skeleton">
                    <DocP>Every page wraps content in <InlineCode>PageShell</InlineCode> and starts with a header pattern.</DocP>
                    <CodeBlock>{`import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"

export function MyPage() {
  return (
    <PageShell>
      <PageHeaderWithBack title="My Page" backButton={{ href: "/" }} />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          {/* content */}
        </div>
      </div>
    </PageShell>
  )
}`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="Adding to the router">
                    <DocP>Add a lazy import and a route entry in <InlineCode>src/app/router.tsx</InlineCode>.</DocP>
                    <CodeBlock>{`const MyPage = lazy(() =>
  import("@/pages/templates/MyPage").then((m) => ({ default: m.MyPage }))
)

// Inside the AppShell children array:
{ path: "/my-page", element: <LazyPage><MyPage /></LazyPage> }

// Standalone (no sidebar/header) — e.g. auth or error pages:
{
  path: "/my-standalone",
  element: <LazyPage><MyPage /></LazyPage>,
  errorElement: <RouteErrorBoundary />,
}`}</CodeBlock>
                  </DocSubsection>
                </DocSection>

                <Separator />

                {/* ── Layout structure ─────────────────────────────────── */}
                <DocSection id="layout-structure" title="Layout Structure">
                  <DocSubsection title="AppShell">
                    <DocP>
                      Wraps all main routes. Provides <InlineCode>GlobalSidebar</InlineCode> (with tenant switcher),{" "}
                      <InlineCode>GlobalHeader</InlineCode> (breadcrumbs, command palette, notifications, user menu),
                      and <InlineCode>GlobalFooter</InlineCode>. Mounts the command palette globally.
                    </DocP>
                    <CodeBlock>{`// Minimal — defaults to "IQLine Inc" tenant
<AppShell />

// With tenant switching
<AppShell
  user={{ name: "Jane Doe", email: "jane@acme.com" }}
  tenants={[
    { id: "acme",    name: "Acme Corp",    plan: "Pro" },
    { id: "staging", name: "Acme Staging", plan: "Free" },
  ]}
  currentTenant={{ id: "acme", name: "Acme Corp", plan: "Pro" }}
  onTenantChange={(t) => switchTenant(t.id)}
  onLogout={handleLogout}
/>`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="PageShell">
                    <DocP>Flex-column wrapper for a single page. Always the outermost element inside a route component.</DocP>
                  </DocSubsection>

                  <DocSubsection title="TwoColumnLayout">
                    <DocP>Sidebar + content. Optionally resizable. Used in docs, settings, detail pages.</DocP>
                    <CodeBlock>{`<TwoColumnLayout
  left={<Nav />}
  right={<Content />}
  resizable={false}
  leftWidth="280px"
  scrollable={false}
  noPadding
  leftClassName="bg-muted/50"
/>`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="ThreeColumnLayout">
                    <DocP>Left sidebar + main + right properties panel. Good for editors and data-heavy pages.</DocP>
                  </DocSubsection>

                  <DocSubsection title="SplitLayout">
                    <DocP>
                      Static two-panel split. Use the <InlineCode>ratio</InlineCode> prop ({`"50/50" | "60/40" | "70/30" | "75/25" | "25/75" | "30/70" | "40/60"`}) and
                      <InlineCode>responsive</InlineCode> to stack on mobile. For a resizable version use <InlineCode>TwoColumnLayout</InlineCode>.
                    </DocP>
                    <CodeBlock>{`<SplitLayout left={<Preview />} right={<Properties />} ratio="70/30" responsive />`}</CodeBlock>
                  </DocSubsection>
                </DocSection>

                <Separator />

                {/* ── Auth layout ───────────────────────────────────────── */}
                <DocSection id="auth-layout" title="Auth Layout">
                  <DocSubsection title="AuthShell">
                    <DocP>
                      Centered, full-height wrapper for auth pages (login, signup, password reset).
                      Handles branding, optional tagline, and a back-to-home link.
                      All auth pages use this — do not duplicate the layout.
                    </DocP>
                    <CodeBlock>{`import { AuthShell } from "@/components/layouts/auth-shell"

export function MyAuthPage() {
  return (
    <AuthShell
      logoText="IQLine"
      tagline="Sign in to your workspace"
      showHomeLink
    >
      <MyForm />
    </AuthShell>
  )
}`}</CodeBlock>
                  </DocSubsection>
                </DocSection>

                <Separator />

                {/* ── Blocks & patterns ────────────────────────────────── */}
                <DocSection id="components-by-area" title="Blocks & Patterns">

                  <DocSubsection title="Page headers">
                    <DocP>
                      Three header patterns cover all cases. Pick the right one — don't mix them on a single page.
                    </DocP>
                    <div className="space-y-2">
                      {[
                        { name: "PageHeader",          import: "@/components/blocks/page-header",            when: "Landing pages, dashboards, top-level list pages." },
                        { name: "PageHeaderWithBack",   import: "@/components/patterns/page-header-with-back", when: "Detail pages, sub-pages — any view with a clear parent." },
                        { name: "PageHeaderWithTabs",   import: "@/components/patterns/page-header-with-tabs", when: "Single page with multiple named sections (sync tabs with URL)." },
                      ].map((h) => (
                        <div key={h.name} className="rounded-md border p-3 space-y-1">
                          <InlineCode>{h.name}</InlineCode>
                          <p className="text-xs text-muted-foreground">{h.when}</p>
                          <p className="text-xs text-muted-foreground font-mono">{h.import}</p>
                        </div>
                      ))}
                    </div>
                  </DocSubsection>

                  <DocSubsection title="FormSection" badge="new">
                    <DocP>
                      Labelled group of form fields with a title and description. Supports a two-column
                      <InlineCode>aside</InlineCode> layout (title left, fields right) for settings-style pages.
                    </DocP>
                    <CodeBlock>{`import { FormSection } from "@/components/patterns/form-section"

<FormSection
  title="Personal Information"
  description="Update your name and contact details."
  aside  // renders title on the left, fields on the right
>
  <Input placeholder="Full name" />
  <Input placeholder="Email" />
</FormSection>`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="DetailRow + DetailList" badge="new">
                    <DocP>
                      Semantic label/value rows for read-only detail panels, profile pages, and review steps.
                      Wrap multiple rows in <InlineCode>DetailList</InlineCode> to get grouping, an optional title, and dividers.
                    </DocP>
                    <CodeBlock>{`import { DetailRow, DetailList } from "@/components/patterns/detail-row"

<DetailList title="Contact" divided>
  <DetailRow label="Email"  value="jane@example.com" icon={Mail} />
  <DetailRow label="Phone"  value={user.phone} empty="Not provided" />
  <DetailRow label="Bio"    value={user.bio} stacked />
</DetailList>`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="StatRow" badge="new">
                    <DocP>
                      Lightweight horizontal KPI strip. Lighter than <InlineCode>MetricCard</InlineCode> — no card chrome.
                      Use inside panels or at the top of detail pages. Supports 2–5 columns and semantic trend colours.
                    </DocP>
                    <CodeBlock>{`import { StatRow } from "@/components/patterns/stat-row"

<StatRow
  stats={[
    { label: "Revenue",     value: "$24,500", trend: "up",      secondary: "+12% vs last month" },
    { label: "Active users", value: "1,204",  trend: "up" },
    { label: "Churn rate",  value: "2.4%",   trend: "down",    secondary: "-0.3%" },
    { label: "Open tickets", value: "18",     trend: "neutral" },
  ]}
/>`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="EmptyCard" badge="new">
                    <DocP>
                      Card-framed empty state for use inside panels, list areas, or dashboard widgets.
                      Use this instead of the full-page <InlineCode>EmptyState</InlineCode> when the empty state
                      lives inside a bounded container.
                    </DocP>
                    <CodeBlock>{`import { EmptyCard } from "@/components/patterns/empty-card"

<EmptyCard
  icon={FolderOpen}
  title="No projects yet"
  description="Create your first project to get started."
  actionLabel="New Project"
  onAction={() => setCreateOpen(true)}
  compact  // smaller padding, for tight spaces
/>`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="CommandPalette + trigger">
                    <DocP>
                      Mounted once at <InlineCode>AppShell</InlineCode> level. Opens with{" "}
                      <InlineCode>Ctrl+K</InlineCode> / <InlineCode>⌘K</InlineCode> or by clicking the search
                      bar in the header. The trigger is <InlineCode>CommandPaletteTrigger</InlineCode> and is
                      already wired — no setup needed in pages.
                    </DocP>
                  </DocSubsection>

                  <DocSubsection title="NotificationPanel">
                    <DocP>
                      Bell icon with unread badge in the header. Shows a scrollable dropdown of notifications
                      with type icons (info / success / warning / error), relative timestamps, and mark-as-read.
                      Rendered inside <InlineCode>GlobalHeader</InlineCode> — no setup needed in pages.
                    </DocP>
                  </DocSubsection>

                  <DocSubsection title="ConfirmDialog">
                    <DocP>
                      Wraps <InlineCode>AlertDialog</InlineCode> with a simple API. Supports async{" "}
                      <InlineCode>onConfirm</InlineCode> with auto loading state, destructive variant, and
                      both controlled (open prop) and uncontrolled (trigger element) modes.
                    </DocP>
                    <CodeBlock>{`import { ConfirmDialog } from "@/components/blocks/confirm-dialog"

<ConfirmDialog
  trigger={<Button variant="destructive">Delete account</Button>}
  title="Delete account?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  confirmVariant="destructive"
  onConfirm={async () => { await deleteAccount() }}
/>`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="MetricCard">
                    <DocP>
                      KPI card with value, label, trend badge, and sparkline area. Use{" "}
                      <InlineCode>compact</InlineCode> for dense rows (e.g. inside profile pages).
                      Trend colours use semantic tokens — <InlineCode>text-emerald-600</InlineCode> for up,{" "}
                      <InlineCode>text-destructive</InlineCode> for down.
                    </DocP>
                  </DocSubsection>

                  <DocSubsection title="DataTable">
                    <DocP>
                      Full TanStack Table integration with column sorting, global search, per-column filters,
                      column visibility toggles, row selection, and pagination. Pass a{" "}
                      <InlineCode>columns</InlineCode> definition and <InlineCode>data</InlineCode> array.
                    </DocP>
                  </DocSubsection>
                </DocSection>

                <Separator />

                {/* ── UI components ─────────────────────────────────────── */}
                <DocSection id="ui-components" title="UI Components">
                  <DocP>
                    All 57 components live in <InlineCode>src/components/ui/</InlineCode> and follow the
                    shadcn pattern — copy-owned, fully typed, styled with Tailwind v4.
                    Highlighted additions beyond the standard shadcn set:
                  </DocP>

                  <DocSubsection title="DatePicker / DateRangePicker" badge="new">
                    <DocP>
                      Single and range date pickers built on <InlineCode>Popover</InlineCode> +{" "}
                      <InlineCode>Calendar</InlineCode> + <InlineCode>date-fns</InlineCode>.
                      Configurable <InlineCode>dateFormat</InlineCode>, <InlineCode>placeholder</InlineCode>, and{" "}
                      <InlineCode>disabled</InlineCode>.
                    </DocP>
                    <CodeBlock>{`import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
  dateFormat="MMM d, yyyy"
/>

<DateRangePicker value={range} onChange={setRange} />`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="MultiSelect" badge="new">
                    <DocP>
                      Multi-value combobox using <InlineCode>Command</InlineCode> +{" "}
                      <InlineCode>Popover</InlineCode>. Selected items appear as removable badge chips.
                      Supports <InlineCode>maxDisplay</InlineCode> with a "+N more" overflow indicator.
                    </DocP>
                    <CodeBlock>{`import { MultiSelect } from "@/components/ui/multi-select"

<MultiSelect
  options={[
    { label: "React",      value: "react" },
    { label: "TypeScript", value: "ts" },
  ]}
  value={selected}
  onValueChange={setSelected}
  placeholder="Select technologies…"
  maxDisplay={3}
/>`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="FileUpload" badge="new">
                    <DocP>
                      Drag-and-drop zone with file-type and size validation, image previews, per-file
                      progress bars, and individual remove buttons. Pass an{" "}
                      <InlineCode>onFilesAdded</InlineCode> callback to trigger your upload logic.
                    </DocP>
                    <CodeBlock>{`import { FileUpload } from "@/components/ui/file-upload"

<FileUpload
  accept={{ "image/*": [".png", ".jpg", ".webp"] }}
  maxSizeMB={5}
  maxFiles={4}
  onFilesAdded={(files) => uploadFiles(files)}
/>`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="Field">
                    <DocP>
                      Composite form field that pairs a <InlineCode>Label</InlineCode>, any input primitive,
                      a description, and an error message. Reduces boilerplate in forms.
                    </DocP>
                  </DocSubsection>

                  <DocSubsection title="InputGroup">
                    <DocP>
                      Attach prefix/suffix addons (icons, text, buttons) to an <InlineCode>Input</InlineCode>.
                      Uses flex layout so the border is shared with the addon.
                    </DocP>
                  </DocSubsection>
                </DocSection>

                <Separator />

                {/* ── Hooks ────────────────────────────────────────────── */}
                <DocSection id="hooks" title="Hooks">
                  <DocP>
                    All hooks are exported from <InlineCode>@/hooks</InlineCode>. Import individually
                    from the barrel or directly from the hook file.
                  </DocP>

                  <DocSubsection title="useAsync" badge="new">
                    <DocP>
                      Wraps any async function with <InlineCode>{"{ data, loading, error, status, execute, reset }"}</InlineCode>.
                      Handles unmount cleanup and keeps the function ref stable.
                      Pass <InlineCode>{"{ immediate: true }"}</InlineCode> to auto-run on mount.
                    </DocP>
                    <CodeBlock>{`import { useAsync } from "@/hooks"

// Manual trigger
const { data, loading, error, execute } = useAsync(fetchUser)
<button onClick={() => execute(userId)}>Load</button>

// Auto-run on mount (no args)
const { data, loading } = useAsync(fetchSettings, { immediate: true })`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="useDebounce / useDebouncedCallback">
                    <DocP>
                      Debounce a value (<InlineCode>useDebounce</InlineCode>) or a callback function
                      (<InlineCode>useDebouncedCallback</InlineCode>). Default delay is 500 ms.
                    </DocP>
                    <CodeBlock>{`const debouncedQuery = useDebounce(query, 300)

const debouncedSave = useDebouncedCallback((val: string) => {
  saveToServer(val)
}, 1000)`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="useKeyboardShortcut">
                    <DocP>
                      Registers a global keyboard shortcut. Supports modifier keys and automatically
                      detects Mac vs PC for display purposes via <InlineCode>useIsMac</InlineCode>.
                    </DocP>
                    <CodeBlock>{`useKeyboardShortcut({
  key: "k",
  modifiers: ["ctrl"],
  callback: (e) => { e.preventDefault(); setOpen(true) },
})`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="useLocalStorage">
                    <DocP>
                      Typed wrapper around <InlineCode>localStorage</InlineCode> that syncs across
                      tabs and handles serialization automatically.
                    </DocP>
                    <CodeBlock>{`const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light")`}</CodeBlock>
                  </DocSubsection>

                  <DocSubsection title="useMediaQuery + breakpoint helpers">
                    <DocP>
                      Low-level <InlineCode>useMediaQuery(query)</InlineCode> plus convenience hooks:{" "}
                      <InlineCode>useIsSmallScreen</InlineCode>, <InlineCode>useIsMediumScreen</InlineCode>,{" "}
                      <InlineCode>useIsLargeScreen</InlineCode>, <InlineCode>usePrefersDarkMode</InlineCode>,{" "}
                      <InlineCode>usePrefersReducedMotion</InlineCode>.
                    </DocP>
                  </DocSubsection>
                </DocSection>

                <Separator />

                {/* ── Page templates ───────────────────────────────────── */}
                <DocSection id="page-templates" title="Page Templates">
                  <DocP>
                    All templates live in <InlineCode>src/pages/templates/</InlineCode> and are exported
                    from the barrel <InlineCode>src/pages/templates/index.ts</InlineCode>.
                  </DocP>
                  <div className="space-y-3">
                    {[
                      {
                        group: "Authentication",
                        items: [
                          { name: "LoginPage",         desc: "Email/password login. Uses AuthShell." },
                          { name: "SignupPage",         desc: "Registration with terms. Uses AuthShell." },
                          { name: "PasswordResetPage",  desc: "Email recovery. Uses AuthShell." },
                        ],
                      },
                      {
                        group: "Error & Status",
                        items: [
                          { name: "NotFoundPage",      desc: "404 with configurable home/back buttons." },
                          { name: "ServerErrorPage",   desc: "500 with retry action." },
                          { name: "ForbiddenPage",     desc: "403 access denied, standalone (no AppShell).", badge: "new" },
                          { name: "MaintenancePage",   desc: "Scheduled maintenance notice." },
                        ],
                      },
                      {
                        group: "App Pages",
                        items: [
                          { name: "DashboardPage",     desc: "Metrics, charts, and recent activity." },
                          { name: "SettingsPage",      desc: "Vertical nav + 5 sections (Account, Security, Notifications, Billing, Appearance)." },
                          { name: "ProfilePage",       desc: "User profile with StatRow, activity feed, and projects tab.", badge: "new" },
                          { name: "SearchPage",        desc: "URL-synced search with type filters and debounced input.", badge: "new" },
                          { name: "WizardPage",        desc: "4-step multi-step form with per-step validation and review step.", badge: "new" },
                          { name: "CalendarPage",      desc: "Month/week calendar with day details and sidebar." },
                        ],
                      },
                      {
                        group: "Data & Content",
                        items: [
                          { name: "PageWithTable",     desc: "DataTable with search, filters, pagination, and row actions." },
                          { name: "ChartsPage",        desc: "Analytics with revenue, traffic, and conversion charts." },
                          { name: "CardsPage",         desc: "Pricing cards, feature highlights, and testimonials." },
                          { name: "FormsPage",         desc: "Form patterns — inputs, selects, date pickers, file upload." },
                          { name: "TraysPage",         desc: "Sample grid visualization for tracking items." },
                        ],
                      },
                      {
                        group: "Design System",
                        items: [
                          { name: "ComponentsPage",    desc: "Live browser for all UI components." },
                          { name: "LayoutsPage",       desc: "Demo of all layout wrappers." },
                          { name: "ThemesPage",        desc: "Theme browser with installation snippets." },
                          { name: "EdgeCasesDemoPage", desc: "Loading states, error handling, empty states, slow APIs." },
                          { name: "DocumentationPage", desc: "This page." },
                        ],
                      },
                    ].map((group) => (
                      <div key={group.group}>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                          {group.group}
                        </p>
                        <div className="space-y-1">
                          {group.items.map((item) => (
                            <div key={item.name} className="flex items-start gap-2 rounded-md border px-3 py-2">
                              <div className="flex items-center gap-1.5 shrink-0 min-w-[180px]">
                                <InlineCode>{item.name}</InlineCode>
                                {"badge" in item && item.badge && (
                                  <Badge variant="secondary" className="text-[10px]">{item.badge}</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </DocSection>

                <Separator />

                {/* ── Best practices ───────────────────────────────────── */}
                <DocSection id="best-practices" title="Best Practices">
                  <DocSubsection title="Layouts">
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Always wrap page content in <InlineCode>PageShell</InlineCode>.</li>
                      <li>Use <InlineCode>PageHeaderWithBack</InlineCode> on any detail or sub-page.</li>
                      <li>Use <InlineCode>AuthShell</InlineCode> for all auth pages — never duplicate the branding layout.</li>
                      <li>Constrain content width with <InlineCode>container mx-auto px-4</InlineCode> or <InlineCode>max-w-*</InlineCode>.</li>
                    </ul>
                  </DocSubsection>

                  <DocSubsection title="Forms">
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Use <InlineCode>FormSection</InlineCode> to group related fields with a heading.</li>
                      <li>Pair every input with a <InlineCode>Field</InlineCode> wrapper for consistent label + error layout.</li>
                      <li>This design system is form-library agnostic — bring React Hook Form + Zod for production validation.</li>
                    </ul>
                  </DocSubsection>

                  <DocSubsection title="Data fetching">
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Use <InlineCode>useAsync</InlineCode> for any component-level async call — never raw useState + useEffect.</li>
                      <li>Use <InlineCode>useDebounce</InlineCode> before triggering search/filter API calls.</li>
                      <li>Show <InlineCode>SkeletonLoader</InlineCode> while loading, <InlineCode>EmptyCard</InlineCode> when empty, and <InlineCode>DataError</InlineCode> on failure.</li>
                    </ul>
                  </DocSubsection>

                  <DocSubsection title="Colour & tokens">
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Never use hardcoded colour classes like <InlineCode>text-green-500</InlineCode> — use semantic tokens.</li>
                      <li>Positive/success trends: <InlineCode>text-emerald-600 dark:text-emerald-400</InlineCode>.</li>
                      <li>Negative/error: <InlineCode>text-destructive</InlineCode>.</li>
                      <li>Muted/neutral: <InlineCode>text-muted-foreground</InlineCode>.</li>
                    </ul>
                  </DocSubsection>

                  <DocSubsection title="Performance">
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Lazy-load all page components in the router — only <InlineCode>HomePage</InlineCode> and <InlineCode>NotFoundPage</InlineCode> are eagerly loaded.</li>
                      <li>Use <InlineCode>React.memo</InlineCode> and <InlineCode>useMemo</InlineCode> in data-heavy list components.</li>
                    </ul>
                  </DocSubsection>
                </DocSection>

              </div>
            </ScrollArea>
          }
          resizable={false}
          leftWidth="280px"
          rightWidth="auto"
          scrollable={false}
          noPadding={true}
          showSeparator={false}
          leftClassName="bg-muted/50"
        />
      </div>
    </PageShell>
  )
}

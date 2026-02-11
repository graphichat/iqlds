import * as React from "react"
import { useSearchParams } from "react-router-dom"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"
import { TwoColumnLayout } from "@/components/layouts/two-column-layout"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Package, Layout, Blocks, FileText, Eye, Copy, Check } from "lucide-react"
import registryData from "../../../registry.json"

interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  files?: Array<{ path: string; type: string }>
  dependencies?: string[]
}

type ComponentType = "registry:ui" | "registry:block" | "registry:layout" | "registry:pattern" | "registry:page"

const typeConfig: Record<ComponentType, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  "registry:ui": {
    label: "UI Components",
    icon: Code,
    color: "bg-blue-500/10 text-blue-500",
  },
  "registry:block": {
    label: "Blocks",
    icon: Blocks,
    color: "bg-green-500/10 text-green-500",
  },
  "registry:layout": {
    label: "Layouts",
    icon: Layout,
    color: "bg-purple-500/10 text-purple-500",
  },
  "registry:pattern": {
    label: "Patterns",
    icon: Package,
    color: "bg-orange-500/10 text-orange-500",
  },
  "registry:page": {
    label: "Pages",
    icon: FileText,
    color: "bg-pink-500/10 text-pink-500",
  },
}

function ComponentsSidebar({ items, selectedComponent, onSelect }: {
  items: RegistryItem[]
  selectedComponent: string | null
  onSelect: (name: string) => void
}) {
  const groupedItems = React.useMemo(() => {
    const groups: Record<ComponentType, RegistryItem[]> = {
      "registry:ui": [],
      "registry:block": [],
      "registry:layout": [],
      "registry:pattern": [],
      "registry:page": [],
    }
    
    items.forEach((item) => {
      const type = item.type as ComponentType
      if (groups[type]) {
        groups[type].push(item)
      }
    })
    
    return groups
  }, [items])

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {Object.entries(groupedItems).map(([type, typeItems]) => {
          if (typeItems.length === 0) return null
          
          const config = typeConfig[type as ComponentType]
          const Icon = config.icon
          
          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center gap-2 px-2">
                <Icon className="h-4 w-4" />
                <h3 className="text-sm font-semibold">{config.label}</h3>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {typeItems.length}
                </Badge>
              </div>
              <div className="space-y-1">
                {typeItems.map((item) => {
                  const isSelected = selectedComponent === item.name
                  return (
                    <Button
                      key={item.name}
                      variant={isSelected ? "secondary" : "ghost"}
                      className="w-full justify-start text-left h-auto py-2 px-3"
                      onClick={() => onSelect(item.name)}
                    >
                      <span className="text-sm font-medium">{item.title}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}

// Helper function to determine component directory from file path
function getComponentDirectory(component: RegistryItem): { directory: string; importPath: string } {
  const filePath = component.files?.[0]?.path || ""
  
  if (filePath.includes("/components/ui/")) {
    return { directory: "ui", importPath: `@/components/ui/${component.name}` }
  }
  if (filePath.includes("/components/blocks/")) {
    return { directory: "blocks", importPath: `@/components/blocks/${component.name}` }
  }
  if (filePath.includes("/components/layouts/")) {
    return { directory: "layouts", importPath: `@/components/layouts/${component.name}` }
  }
  if (filePath.includes("/components/patterns/")) {
    return { directory: "patterns", importPath: `@/components/patterns/${component.name}` }
  }
  if (filePath.includes("/pages/templates/")) {
    const pageName = component.name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
    return { directory: "pages", importPath: `@/pages/templates/${pageName}` }
  }
  
  // Default to UI components
  return { directory: "ui", importPath: `@/components/ui/${component.name}` }
}

function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={copyToClipboard}
      className="h-7 w-7 p-0"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-600" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  )
}

function ComponentPreview({ component }: { component: RegistryItem }) {
  const [PreviewComponent, setPreviewComponent] = React.useState<React.ComponentType<any> | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setPreviewComponent(null)
    setError(null)

    const loadComponent = async () => {
      try {
        let Component: React.ComponentType<any> | null = null
        const { directory } = getComponentDirectory(component)
        const componentName = component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")

        if (directory === "pages") {
          // Special handling for page components
          const pageName = component.name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
          const module = await import(`../../pages/templates/${pageName}.tsx`)
          Component = module[componentName] || module.default || Object.values(module)[0] as React.ComponentType<any>
        } else if (directory === "ui") {
          const module = await import(`../../components/ui/${component.name}.tsx`)
          Component = module[componentName] || module.default || Object.values(module)[0] as React.ComponentType<any>
        } else if (directory === "blocks") {
          const module = await import(`../../components/blocks/${component.name}.tsx`)
          Component = module[componentName] || module.default || Object.values(module)[0] as React.ComponentType<any>
        } else if (directory === "layouts") {
          const module = await import(`../../components/layouts/${component.name}.tsx`)
          Component = module[componentName] || module.default || Object.values(module)[0] as React.ComponentType<any>
        } else if (directory === "patterns") {
          const module = await import(`../../components/patterns/${component.name}.tsx`)
          Component = module[componentName] || module.default || Object.values(module)[0] as React.ComponentType<any>
        }

        if (Component) {
          setPreviewComponent(() => Component)
        } else {
          setError("Component not found")
        }
      } catch (err) {
        console.error("Error loading component:", err)
        setError(err instanceof Error ? err.message : "Failed to load component")
      }
    }

    loadComponent()
  }, [component.name, component.type, component.title])

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        <p className="font-medium">Preview unavailable</p>
        <p className="text-muted-foreground mt-1">{error}</p>
      </div>
    )
  }

  if (!PreviewComponent) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-2">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="text-sm text-muted-foreground">Loading preview...</p>
        </div>
      </div>
    )
  }

  try {
    return (
      <div className="rounded-lg border bg-muted/30 p-6">
        <div className="flex items-center justify-center min-h-[200px]">
          <ComponentPreviewRenderer component={PreviewComponent} componentName={component.name} componentType={component.type} />
        </div>
      </div>
    )
  } catch (err) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        <p className="font-medium">Preview error</p>
        <p className="text-muted-foreground mt-1">{err instanceof Error ? err.message : "Failed to render component"}</p>
      </div>
    )
  }
}

function ComponentPreviewRenderer({ component: Component, componentName, componentType }: {
  component: React.ComponentType<any>
  componentName: string
  componentType: string
}) {
  const exampleProps = React.useMemo(() => {
    if (componentType === "registry:ui") {
      if (componentName === "button") {
        return { children: "Button" }
      }
      if (componentName === "card") {
        return { children: React.createElement("div", { className: "p-4" }, "Card Content") }
      }
      if (componentName === "input") {
        return { placeholder: "Enter text...", type: "text" }
      }
      if (componentName === "badge") {
        return { children: "Badge" }
      }
      if (componentName === "label") {
        return { children: "Label" }
      }
      if (componentName === "textarea") {
        return { placeholder: "Enter text...", rows: 3 }
      }
      if (componentName === "separator") {
        return {}
      }
      if (componentName === "alert") {
        return { children: "This is an alert message" }
      }
      if (componentName === "skeleton") {
        return { className: "h-4 w-full" }
      }
      if (componentName === "progress") {
        return { value: 50 }
      }
      if (componentName === "slider") {
        return { defaultValue: [50] }
      }
    }

    if (componentType === "registry:block") {
      if (componentName === "page-header") {
        return { title: "Page Title" }
      }
      if (componentName === "back-button") {
        return { label: "Back" }
      }
      if (componentName === "metric-card") {
        return {
          title: "Total Revenue",
          value: "$45,231",
          change: "+20.1%",
          trend: "up" as const,
        }
      }
    }

    return {}
  }, [componentName, componentType])

  try {
    return React.createElement(Component, exampleProps)
  } catch (err) {
    return (
      <div className="text-sm text-muted-foreground">
        Component preview unavailable
      </div>
    )
  }
}

function ComponentViewer({ component }: { component: RegistryItem | null }) {
  if (!component) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <Package className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">Select a Component</h3>
            <p className="text-sm text-muted-foreground">
              Choose a component from the sidebar to view its details and documentation
            </p>
          </div>
        </div>
      </div>
    )
  }

  const componentTypeConfig = typeConfig[component.type as ComponentType]
  const Icon = componentTypeConfig?.icon || Package
  const colorClass = componentTypeConfig?.color || "bg-gray-500/10 text-gray-500"

  return (
    <ScrollArea className="h-full">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{component.title}</h1>
                  <Badge variant="outline" className="mt-1">
                    {component.name}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {component.description}
              </p>
            </div>
          </div>
          <Separator />
        </div>

        {/* Component Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <CardTitle>Preview</CardTitle>
            </div>
            <CardDescription>Live preview of the component</CardDescription>
          </CardHeader>
          <CardContent>
            <ComponentPreview component={component} />
          </CardContent>
        </Card>

        {/* Files */}
        {component.files && component.files.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
              <CardDescription>Component file locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {component.files.map((file, index) => (
                  <div
                    key={index}
                    className="rounded-md bg-muted px-3 py-2 font-mono text-sm"
                  >
                    {file.path}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dependencies */}
        {component.dependencies && component.dependencies.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Dependencies</CardTitle>
              <CardDescription>Required dependencies for this component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {component.dependencies.map((dep, index) => (
                  <Badge key={index} variant="outline" className="font-mono">
                    {dep}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Usage Example */}
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>How to install and use this component</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Installation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Installation</h4>
                <CopyCodeButton 
                  code={`npx shadcn@latest add ${component.name} --registry @iqlds`}
                />
              </div>
              <div className="rounded-md bg-muted p-4 relative">
                <pre className="text-sm overflow-x-auto">
                  <code>{`npx shadcn@latest add ${component.name} --registry @iqlds`}</code>
                </pre>
              </div>
            </div>

            {/* Import */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Import</h4>
                <CopyCodeButton 
                  code={`import { ${component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")} } from "${getComponentDirectory(component).importPath}"`}
                />
              </div>
              <div className="rounded-md bg-muted p-4 relative">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { ${component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")} } from "${getComponentDirectory(component).importPath}"`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}

export function ComponentsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedComponent = searchParams.get("component")

  const items = React.useMemo(() => {
    return (registryData.items as RegistryItem[])
      .filter((item) => item.type !== "registry:theme") // Exclude themes - they have their own page
      .sort((a, b) => {
        // Sort by type first, then by title
        if (a.type !== b.type) {
          const typeOrder: ComponentType[] = [
            "registry:ui",
            "registry:block",
            "registry:layout",
            "registry:pattern",
            "registry:page",
          ]
          return typeOrder.indexOf(a.type as ComponentType) - typeOrder.indexOf(b.type as ComponentType)
        }
        return a.title.localeCompare(b.title)
      })
  }, [])

  const selectedItem = React.useMemo(() => {
    if (!selectedComponent) return null
    return items.find((item) => item.name === selectedComponent) || null
  }, [selectedComponent, items])

  const handleSelectComponent = (name: string) => {
    setSearchParams({ component: name })
  }

  React.useEffect(() => {
    // Auto-select first component if none selected
    if (!selectedComponent && items.length > 0) {
      setSearchParams({ component: items[0].name })
    }
  }, [selectedComponent, items, setSearchParams])

  return (
    <PageShell>
      <PageHeaderWithBack
        title="Components"
        backButton={{
          href: "/",
        }}
        className="border-b"
      />
      <div className="flex-1 overflow-hidden">
        <TwoColumnLayout
          left={
            <ComponentsSidebar
              items={items}
              selectedComponent={selectedComponent}
              onSelect={handleSelectComponent}
            />
          }
          right={<ComponentViewer component={selectedItem} />}
          resizable={false}
          leftWidth="320px"
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


import * as React from "react"
import { useSearchParams } from "react-router-dom"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"
import { NestedShell } from "@/components/layouts/nested-shell"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Package, Layout, Blocks, FileText, Eye } from "lucide-react"
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

function ComponentPreview({ component }: { component: RegistryItem }) {
  const [PreviewComponent, setPreviewComponent] = React.useState<React.ComponentType<any> | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setPreviewComponent(null)
    setError(null)

    const loadComponent = async () => {
      try {
        let Component: React.ComponentType<any> | null = null

        if (component.type === "registry:ui") {
          const module = await import(`@/components/ui/${component.name}`)
          const componentName = component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
          Component = module[componentName] || module.default || Object.values(module)[0] as React.ComponentType<any>
        } else if (component.type === "registry:block") {
          const module = await import(`@/components/blocks/${component.name}`)
          const componentName = component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
          Component = module[componentName] || module.default || Object.values(module)[0] as React.ComponentType<any>
        } else if (component.type === "registry:layout") {
          const module = await import(`@/components/layouts/${component.name}`)
          const componentName = component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
          Component = module[componentName] || module.default || Object.values(module)[0] as React.ComponentType<any>
        } else if (component.type === "registry:pattern") {
          const module = await import(`@/components/patterns/${component.name}`)
          const componentName = component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
          Component = module[componentName] || module.default || Object.values(module)[0] as React.ComponentType<any>
        } else if (component.type === "registry:page") {
          const module = await import(`@/pages/templates/${component.name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")}`)
          const componentName = component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
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

  return (
    <ScrollArea className="h-full">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${componentTypeConfig.color}`}>
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
            <CardDescription>How to import and use this component</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>
                  {component.type === "registry:ui" && (
                    <>
                      {`import { ${component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")} } from "@/components/ui/${component.name}"`}
                    </>
                  )}
                  {component.type === "registry:block" && (
                    <>
                      {`import { ${component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")} } from "@/components/blocks/${component.name}"`}
                    </>
                  )}
                  {component.type === "registry:layout" && (
                    <>
                      {`import { ${component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")} } from "@/components/layouts/${component.name}"`}
                    </>
                  )}
                  {component.type === "registry:pattern" && (
                    <>
                      {`import { ${component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")} } from "@/components/patterns/${component.name}"`}
                    </>
                  )}
                  {component.type === "registry:page" && (
                    <>
                      {`import { ${component.title.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")} } from "@/pages/templates/${component.name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")}"`}
                    </>
                  )}
                </code>
              </pre>
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
    return (registryData.items as RegistryItem[]).sort((a, b) => {
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
        <NestedShell
          sidebar={
            <ComponentsSidebar
              items={items}
              selectedComponent={selectedComponent}
              onSelect={handleSelectComponent}
            />
          }
          content={<ComponentViewer component={selectedItem} />}
          sidebarWidth="320px"
        />
      </div>
    </PageShell>
  )
}


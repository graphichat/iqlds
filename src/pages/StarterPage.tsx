import { PageShell } from "@/components/layouts/page-shell"
import { PageHeader } from "@/components/blocks/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sparkles, Package, Layout, Blocks } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

/**
 * Starter Page Template
 * 
 * A clean starter page showcasing the design system components, layouts, and patterns.
 * This page serves as a starting point for new projects built with this template.
 */
export function StarterPage() {
  return (
    <PageShell>
      <PageHeader
        title="Welcome to Your Project"
        actions={
          <Badge variant="secondary">Starter Template</Badge>
        }
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Sparkles className="size-6 text-primary" strokeWidth={ICON_STROKE_WIDTH} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Get Started</h1>
                  <p className="text-muted-foreground">
                    Everything you need to build your application
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl">
                This starter template includes all UI components, layouts, blocks, and patterns
                from the design system. Start building your application by customizing this page
                and adding your own routes and components.
              </p>
            </div>

            {/* Quick Start Guide */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="size-5 text-primary" strokeWidth={ICON_STROKE_WIDTH} />
                    <CardTitle>UI Components</CardTitle>
                  </div>
                  <CardDescription>
                    Access all shadcn/ui components from <code className="text-xs">@/components/ui</code>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Buttons, cards, inputs, dialogs, and more - all styled and ready to use.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Blocks className="size-5 text-primary" strokeWidth={ICON_STROKE_WIDTH} />
                    <CardTitle>Blocks & Patterns</CardTitle>
                  </div>
                  <CardDescription>
                    Reusable blocks and patterns from <code className="text-xs">@/components/blocks</code>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Pre-built components like headers, forms, tables, and navigation patterns.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Layout className="size-5 text-primary" strokeWidth={ICON_STROKE_WIDTH} />
                    <CardTitle>Layouts</CardTitle>
                  </div>
                  <CardDescription>
                    Layout components from <code className="text-xs">@/components/layouts</code>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    App shell, page layouts, nested shells, and split layouts for any use case.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>Start building your application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">1. Customize This Page</h3>
                    <p className="text-sm text-muted-foreground">
                      Edit <code className="text-xs bg-muted px-1 py-0.5 rounded">src/pages/StarterPage.tsx</code> to create your home page.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">2. Add Your Routes</h3>
                    <p className="text-sm text-muted-foreground">
                      Update <code className="text-xs bg-muted px-1 py-0.5 rounded">src/app/router.tsx</code> to add your application routes.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">3. Use Components</h3>
                    <p className="text-sm text-muted-foreground">
                      Import and use components from <code className="text-xs bg-muted px-1 py-0.5 rounded">@/components/ui</code>, 
                      <code className="text-xs bg-muted px-1 py-0.5 rounded">@/components/blocks</code>, and 
                      <code className="text-xs bg-muted px-1 py-0.5 rounded">@/components/layouts</code>.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">4. Customize Theme</h3>
                    <p className="text-sm text-muted-foreground">
                      Switch themes using the theme toggle in the header, or create your own theme in the registry.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
                <CardDescription>Everything you need to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Design System</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Complete shadcn/ui component library</li>
                      <li>Theme support with light/dark modes</li>
                      <li>Responsive design utilities</li>
                      <li>Accessible components</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Layouts & Patterns</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>App shell with sidebar and header</li>
                      <li>Page layouts and containers</li>
                      <li>Navigation patterns</li>
                      <li>Form and table blocks</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  )
}


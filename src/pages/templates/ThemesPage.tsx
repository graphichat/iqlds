import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithTabs } from "@/components/patterns/page-header-with-tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Check, Palette } from "lucide-react"
import registryData from "../../../registry.json"

interface ThemeItem {
  name: string
  type: string
  title: string
  description: string
  files?: Array<{ path: string; type: string }>
  cssVariables?: boolean
  baseColor?: string
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

function ColorSwatch({ 
  name, 
  colorVar,
  isDark = false 
}: { 
  name: string
  colorVar: string
  isDark?: boolean 
}) {
  const [hovered, setHovered] = React.useState(false)
  
  // Use CSS custom properties for color display
  const colorStyle: React.CSSProperties = {
    backgroundColor: `var(${colorVar})`,
  }

  // Get computed color value for display
  const [computedColor, setComputedColor] = React.useState<string>("")
  
  React.useEffect(() => {
    const element = document.documentElement
    const computed = window.getComputedStyle(element).getPropertyValue(colorVar.trim())
    setComputedColor(computed || colorVar)
  }, [colorVar])

  return (
    <div 
      className="space-y-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="h-16 w-full rounded-md border shadow-sm transition-all hover:scale-105 cursor-pointer relative group"
        style={colorStyle}
      >
        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
            <span className="text-xs text-white font-mono px-2 py-1 bg-black/70 rounded">
              {computedColor || colorVar}
            </span>
          </div>
        )}
      </div>
      <div className="text-xs">
        <div className="font-medium capitalize">{name.replace(/-/g, " ")}</div>
        <div className="text-muted-foreground font-mono mt-0.5 text-[10px] truncate">
          {colorVar}
        </div>
      </div>
    </div>
  )
}

function ThemeColorPreview({ theme }: { theme: ThemeItem }) {
  // Extract colors from the theme CSS file path
  // For now, we'll use a predefined structure based on standard theme colors
  const colorGroups = [
    {
      title: "Primary Colors",
      colors: [
        { name: "primary", var: "--primary" },
        { name: "primary-foreground", var: "--primary-foreground" },
        { name: "secondary", var: "--secondary" },
        { name: "secondary-foreground", var: "--secondary-foreground" },
      ],
    },
    {
      title: "Background & Foreground",
      colors: [
        { name: "background", var: "--background" },
        { name: "foreground", var: "--foreground" },
        { name: "card", var: "--card" },
        { name: "card-foreground", var: "--card-foreground" },
      ],
    },
    {
      title: "Muted & Accent",
      colors: [
        { name: "muted", var: "--muted" },
        { name: "muted-foreground", var: "--muted-foreground" },
        { name: "accent", var: "--accent" },
        { name: "accent-foreground", var: "--accent-foreground" },
      ],
    },
    {
      title: "Destructive & Borders",
      colors: [
        { name: "destructive", var: "--destructive" },
        { name: "border", var: "--border" },
        { name: "input", var: "--input" },
        { name: "ring", var: "--ring" },
      ],
    },
    {
      title: "Chart Colors",
      colors: [
        { name: "chart-1", var: "--chart-1" },
        { name: "chart-2", var: "--chart-2" },
        { name: "chart-3", var: "--chart-3" },
        { name: "chart-4", var: "--chart-4" },
        { name: "chart-5", var: "--chart-5" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Light Mode Preview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Light Mode</h3>
          <Badge variant="outline">Light</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {colorGroups.map((group) => (
            <Card key={group.title}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {group.colors.map((color) => (
                    <ColorSwatch
                      key={color.name}
                      name={color.name}
                      colorVar={color.var}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Dark Mode Preview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Dark Mode</h3>
          <Badge variant="outline">Dark</Badge>
        </div>
        <div className="rounded-lg border bg-muted/30 p-6 dark:bg-background">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {colorGroups.map((group) => (
              <Card key={`dark-${group.title}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {group.colors.map((color) => (
                      <ColorSwatch
                        key={color.name}
                        name={color.name}
                        colorVar={color.var}
                        isDark={true}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ThemeDetails({ theme }: { theme: ThemeItem }) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>About This Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{theme.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {theme.cssVariables && (
              <Badge variant="outline">CSS Variables</Badge>
            )}
            {theme.baseColor && (
              <Badge variant="outline">Base: {theme.baseColor}</Badge>
            )}
            <Badge variant="outline">OKLCH Color Space</Badge>
            <Badge variant="outline">Light & Dark Mode</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Color Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            Preview all colors available in this theme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeColorPreview theme={theme} />
        </CardContent>
      </Card>

      {/* Installation */}
      <Card>
        <CardHeader>
          <CardTitle>Installation</CardTitle>
          <CardDescription>
            Install this theme in your project using the shadcn CLI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Install Command</h4>
              <CopyCodeButton 
                code={`npx shadcn@latest add ${theme.name} --registry @iqlds`}
              />
            </div>
            <div className="rounded-md bg-muted p-4 relative">
              <pre className="text-sm overflow-x-auto">
                <code>{`npx shadcn@latest add ${theme.name} --registry @iqlds`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>
            How to use this theme in your project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Import Theme CSS</h4>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`import "${theme.files?.[0]?.path.replace("src/", "@/")}"`}</code>
              </pre>
            </div>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              After installation, the theme CSS file will be added to your project.
              Import it in your main CSS file or entry point to apply the theme.
              The theme uses CSS custom properties (variables) that automatically
              adapt to light and dark modes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ThemesPage() {
  const [activeTab, setActiveTab] = React.useState<string>("")

  const themes = React.useMemo(() => {
    return (registryData.items as ThemeItem[]).filter(
      (item) => item.type === "registry:theme"
    )
  }, [])

  React.useEffect(() => {
    if (themes.length > 0 && !activeTab) {
      setActiveTab(themes[0].name)
    }
  }, [themes, activeTab])

  const activeTheme = React.useMemo(() => {
    return themes.find((theme) => theme.name === activeTab) || themes[0]
  }, [themes, activeTab])

  const tabs = React.useMemo(() => {
    return themes.map((theme) => ({
      value: theme.name,
      label: theme.title.replace(" Theme", ""),
    }))
  }, [themes])

  if (themes.length === 0) {
    return (
      <PageShell>
        <PageHeaderWithTabs
          title="Themes"
          tabs={[]}
          value=""
          onValueChange={() => {}}
        />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4">
            <Card>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <Palette className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">No Themes Available</h3>
                    <p className="text-sm text-muted-foreground">
                      No themes are currently available in the registry.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <PageHeaderWithTabs
        title="Themes"
        tabs={tabs}
        value={activeTab}
        onValueChange={setActiveTab}
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          {activeTheme && <ThemeDetails theme={activeTheme} />}
        </div>
      </div>
    </PageShell>
  )
}


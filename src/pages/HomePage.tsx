import * as React from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Lock, File, ArrowRight, BarChart3, Settings, CreditCard, TrendingUp, Sparkles, Grid3x3, Package } from "lucide-react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeader } from "@/components/blocks/page-header"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

/**
 * Home Page - Page Examples
 * 
 * Default landing page that lists all available page templates.
 * Serves as a navigation hub for accessing different page examples.
 * Includes sidebar navigation for better management.
 */
interface PageLink {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: string
  category: "auth" | "layout" | "data"
  featured?: boolean
}

const pages: PageLink[] = [
  {
    title: "Dashboard",
    description: "Comprehensive business dashboard with metrics, charts, and project tracking",
    icon: BarChart3,
    href: "/dashboard",
    category: "layout",
    badge: "Featured",
    featured: true,
  },
  {
    title: "Analytics",
    description: "Interactive charts and data visualization with revenue analytics",
    icon: TrendingUp,
    href: "/charts",
    category: "data",
    featured: true,
  },
  {
    title: "Account Settings",
    description: "User profile management, notifications, and subscription settings",
    icon: Settings,
    href: "/forms",
    category: "layout",
    featured: true,
  },
  {
    title: "Product Showcase",
    description: "Pricing cards, feature highlights, and customer testimonials",
    icon: CreditCard,
    href: "/cards",
    category: "layout",
  },
  {
    title: "Settings",
    description: "Account settings, security, billing, and notification preferences",
    icon: Settings,
    href: "/settings",
    category: "layout",
  },
  {
    title: "Data Table",
    description: "Advanced data table with search, filtering, and pagination",
    icon: File,
    href: "/table",
    category: "data",
  },
  {
    title: "Login Page",
    description: "Authentication login page with email and password fields",
    icon: User,
    href: "/login",
    category: "auth",
  },
  {
    title: "Signup Page",
    description: "User registration page with form validation",
    icon: User,
    href: "/signup",
    category: "auth",
  },
  {
    title: "Password Reset",
    description: "Password recovery page with email input",
    icon: Lock,
    href: "/password-reset",
    category: "auth",
  },
  {
    title: "Trays Management",
    description: "Track and manage samples within various trays with interactive grid visualization",
    icon: Grid3x3,
    href: "/trays",
    category: "data",
    featured: true,
  },
  {
    title: "Components",
    description: "Browse all UI components, blocks, layouts, and patterns in the design system",
    icon: Package,
    href: "/components",
    category: "layout",
    featured: true,
  },
]

const categories = {
  auth: "Authentication",
  layout: "Layouts & Pages",
  data: "Data Display",
}

function PageCard({ page }: { page: PageLink }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
            <page.icon
              className="size-5 text-primary"
            />
          </div>
          {page.badge && (
            <Badge variant={page.featured ? "default" : "secondary"} className="shrink-0">
              {page.badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg">{page.title}</CardTitle>
        <CardDescription className="mt-2">
          {page.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button
          variant={page.featured ? "default" : "outline"}
          className="w-full group-hover:scale-105 transition-transform"
          asChild
        >
          <Link to={page.href}>
            View Page
            <ArrowRight
              strokeWidth={ICON_STROKE_WIDTH}
              className="ml-2 size-4 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function FeaturedSection({ featuredPages }: { featuredPages: PageLink[] }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Featured Examples</h2>
        <p className="text-sm text-muted-foreground">
          Most popular and comprehensive page examples
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredPages.map((page) => (
          <PageCard key={page.href} page={page} />
        ))}
      </div>
    </div>
  )
}

function CategorySection({ category, pages: categoryPages }: { category: string; pages: PageLink[] }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">
          {categories[category as keyof typeof categories]}
        </h2>
        <p className="text-sm text-muted-foreground">
          {category === "auth" && "Authentication and user management pages"}
          {category === "layout" && "Standard page layouts and structures"}
          {category === "data" && "Data display and table pages"}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categoryPages.map((page) => (
          <PageCard key={page.href} page={page} />
        ))}
      </div>
    </div>
  )
}

function HomePageContent() {
  const featuredPages = React.useMemo(() => {
    return pages.filter((page) => page.featured)
  }, [])

  const groupedPages = React.useMemo(() => {
    const groups: Record<string, PageLink[]> = {
      auth: [],
      layout: [],
      data: [],
    }
    pages.forEach((page) => {
      if (!page.featured) {
      groups[page.category].push(page)
      }
    })
    return groups
  }, [])

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-card p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <Sparkles className="size-6 text-primary" strokeWidth={ICON_STROKE_WIDTH} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Page Examples</h1>
            <p className="text-muted-foreground">
              Explore our collection of production-ready page templates
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Browse through comprehensive examples of pages built with modern design patterns.
          Each example demonstrates real-world use cases with interactive components,
          responsive layouts, and best practices.
        </p>
      </div>

      {/* Featured Examples */}
      {featuredPages.length > 0 && (
        <>
          <FeaturedSection featuredPages={featuredPages} />
          <Separator />
        </>
      )}

      {/* Page Categories */}
      <div className="space-y-8">
        {Object.entries(groupedPages).map(([category, categoryPages]) => (
          categoryPages.length > 0 && (
            <CategorySection
              key={category}
              category={category}
              pages={categoryPages}
            />
          )
        ))}
      </div>

      {/* Footer Info */}
      <Card>
        <CardHeader>
          <CardTitle>About Page Examples</CardTitle>
          <CardDescription>
            All examples are built with modern web technologies and best practices
          </CardDescription>
        </CardHeader>
        <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
            These page examples serve as standard references and starting points for creating
            new pages. All examples follow the design system guidelines, are fully responsive,
            accessible, and customizable.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">React</Badge>
          <Badge variant="outline">Responsive</Badge>
          <Badge variant="outline">Accessible</Badge>
          <Badge variant="outline">Customizable</Badge>
            <Badge variant="outline">Production Ready</Badge>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function HomePage() {
  return (
    <PageShell>
      <PageHeader
        title="Page Examples"
        actions={
          <Badge variant="secondary">Examples</Badge>
        }
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          <HomePageContent />
        </div>
      </div>
    </PageShell>
  )
}

import * as React from "react"
import { useSearchParams } from "react-router-dom"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeader } from "@/components/blocks/page-header"
import { EmptyState } from "@/components/blocks/empty-state"
import { SkeletonLoader } from "@/components/blocks/skeleton-loader"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Search, X, FileText, User, BarChart3 } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { useDebounce } from "@/hooks/use-debounce"

// ─── Mock data ────────────────────────────────────────────────────────────────

type ResultType = "page" | "user" | "report"

interface SearchResult {
  id: string
  type: ResultType
  title: string
  description: string
  href: string
  tags?: string[]
}

const MOCK_RESULTS: SearchResult[] = [
  { id: "1", type: "page", title: "Dashboard", description: "Business metrics and KPIs overview", href: "/dashboard", tags: ["analytics", "overview"] },
  { id: "2", type: "page", title: "Analytics", description: "Interactive charts and revenue data", href: "/charts", tags: ["charts", "data"] },
  { id: "3", type: "page", title: "Settings", description: "Account, security, and notification preferences", href: "/settings", tags: ["account", "security"] },
  { id: "4", type: "page", title: "Forms", description: "Form examples with validation patterns", href: "/forms", tags: ["forms", "inputs"] },
  { id: "5", type: "user", title: "Sarah Johnson", description: "sarah@example.com · Product Designer", href: "/profile", tags: ["team"] },
  { id: "6", type: "user", title: "Michael Chen", description: "m.chen@example.com · Frontend Engineer", href: "/profile", tags: ["team"] },
  { id: "7", type: "report", title: "Q4 Revenue Report", description: "Revenue summary for Q4 2024", href: "/charts", tags: ["finance", "q4"] },
  { id: "8", type: "report", title: "User Growth Analysis", description: "Monthly active users trend", href: "/charts", tags: ["users", "growth"] },
  { id: "9", type: "page", title: "Components", description: "Design system component library", href: "/components", tags: ["design", "ui"] },
  { id: "10", type: "page", title: "Calendar", description: "Schedule and event management", href: "/calendar", tags: ["time", "events"] },
]

const TYPE_ICONS: Record<ResultType, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  page: FileText,
  user: User,
  report: BarChart3,
}

const TYPE_LABELS: Record<ResultType, string> = {
  page: "Page",
  user: "User",
  report: "Report",
}

const TYPE_COLORS: Record<ResultType, string> = {
  page: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  user: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  report: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

// ─── Search Page ──────────────────────────────────────────────────────────────

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get("q") ?? ""

  const [query, setQuery] = React.useState(initialQuery)
  const [typeFilter, setTypeFilter] = React.useState<ResultType | "all">("all")
  const [isLoading, setIsLoading] = React.useState(false)

  const debouncedQuery = useDebounce(query, 300)

  // Sync query into URL
  React.useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }, [debouncedQuery, setSearchParams])

  // Simulate async search
  const [results, setResults] = React.useState<SearchResult[]>([])
  React.useEffect(() => {
    if (!debouncedQuery) { setResults([]); return }
    setIsLoading(true)
    const timer = setTimeout(() => {
      const filtered = MOCK_RESULTS.filter((r) => {
        const matchesQuery =
          r.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          r.tags?.some((t) => t.toLowerCase().includes(debouncedQuery.toLowerCase()))
        const matchesType = typeFilter === "all" || r.type === typeFilter
        return matchesQuery && matchesType
      })
      setResults(filtered)
      setIsLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [debouncedQuery, typeFilter])

  const visibleResults = results.filter(
    (r) => typeFilter === "all" || r.type === typeFilter
  )

  const counts: Record<ResultType | "all", number> = {
    all: results.length,
    page: results.filter((r) => r.type === "page").length,
    user: results.filter((r) => r.type === "user").length,
    report: results.filter((r) => r.type === "report").length,
  }

  return (
    <PageShell>
      <PageHeader title="Search" />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 max-w-3xl space-y-6">
          {/* Search input */}
          <div className="relative">
            <Search strokeWidth={ICON_STROKE_WIDTH} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, users, reports…"
              className="pl-9 pr-9 h-11 text-base"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 size-7"
                onClick={() => setQuery("")}
              >
                <X strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
              </Button>
            )}
          </div>

          {/* Filters */}
          {debouncedQuery && results.length > 0 && (
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                {(["all", "page", "user", "report"] as const).map((type) => (
                  <Button
                    key={type}
                    variant={typeFilter === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTypeFilter(type)}
                    className="h-7 text-xs capitalize gap-1.5"
                  >
                    {type === "all" ? "All" : TYPE_LABELS[type]}
                    <Badge variant="secondary" className="text-[10px] h-4 min-w-4 px-1">
                      {counts[type]}
                    </Badge>
                  </Button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground shrink-0">
                {visibleResults.length} result{visibleResults.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* Results */}
          {isLoading ? (
            <SkeletonLoader variant="list" lines={5} />
          ) : !debouncedQuery ? (
            <div className="text-center py-16 space-y-2">
              <Search strokeWidth={ICON_STROKE_WIDTH} className="size-10 mx-auto text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Type to search across all content</p>
            </div>
          ) : visibleResults.length === 0 ? (
            <EmptyState
              variant="no-results"
              title="No results for &ldquo;{debouncedQuery}&rdquo;"
              description="Try different keywords or check your spelling."
              action={
                <Button variant="outline" onClick={() => setQuery("")}>
                  Clear search
                </Button>
              }
            />
          ) : (
            <div className="space-y-2">
              {visibleResults.map((result) => {
                const Icon = TYPE_ICONS[result.type]
                return (
                  <a key={result.id} href={result.href} className="block group">
                    <Card className="transition-colors hover:border-primary/50 hover:bg-muted/30">
                      <CardHeader className="py-3 px-4">
                        <div className="flex items-start gap-3">
                          <div className={`flex size-8 items-center justify-center rounded-md shrink-0 mt-0.5 ${TYPE_COLORS[result.type]}`}>
                            <Icon strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <CardTitle className="text-sm group-hover:text-primary transition-colors">
                                {result.title}
                              </CardTitle>
                              <Badge variant="secondary" className="text-xs capitalize shrink-0">
                                {TYPE_LABELS[result.type]}
                              </Badge>
                            </div>
                            <CardDescription className="mt-0.5 text-xs line-clamp-1">
                              {result.description}
                            </CardDescription>
                            {result.tags && result.tags.length > 0 && (
                              <div className="flex gap-1 mt-1.5 flex-wrap">
                                {result.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-[10px] h-4 px-1.5">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}

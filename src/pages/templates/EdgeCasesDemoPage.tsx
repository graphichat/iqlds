import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithTabs } from "@/components/patterns/page-header-with-tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LoadingState } from "@/components/blocks/loading-state"
import { LoadingOverlay } from "@/components/blocks/loading-overlay"
import { SkeletonLoader } from "@/components/blocks/skeleton-loader"
import { ApiError } from "@/components/blocks/api-error"
import { DataError } from "@/components/blocks/data-error"
import { ErrorState } from "@/components/blocks/error-state"
import { EmptyState } from "@/components/blocks/empty-state"
import { SlowApiHandler } from "@/components/blocks/slow-api-handler"
import { TimeoutHandler } from "@/components/blocks/timeout-handler"
import { Copy, Check } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"

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
    <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-7 w-7 p-0">
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-600" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  )
}

export function EdgeCasesDemoPage() {
  const [activeTab, setActiveTab] = React.useState("loading")
  const [loadingState, setLoadingState] = React.useState<"idle" | "loading" | "error" | "success">("idle")
  const [slowApiDelay, setSlowApiDelay] = React.useState(0)
  const [overlayLoading, setOverlayLoading] = React.useState(false)

  const tabs = [
    { value: "loading", label: "Loading States" },
    { value: "errors", label: "API Errors" },
    { value: "empty", label: "Empty States" },
    { value: "slow-api", label: "Slow APIs" },
    { value: "scenarios", label: "Real Scenarios" },
  ]

  const simulateLoading = () => {
    setLoadingState("loading")
    setTimeout(() => {
      setLoadingState("success")
      setTimeout(() => setLoadingState("idle"), 2000)
    }, 2000)
  }

  const simulateError = () => {
    setLoadingState("loading")
    setTimeout(() => {
      setLoadingState("error")
    }, 1000)
  }

  const simulateSlowApi = (delay: number) => {
    setSlowApiDelay(delay)
    setTimeout(() => setSlowApiDelay(0), delay + 1000)
  }

  const simulateOverlay = () => {
    setOverlayLoading(true)
    setTimeout(() => setOverlayLoading(false), 2000)
  }

  return (
    <PageShell>
      <PageHeaderWithTabs
        title="Edge Cases Demo"
        tabs={tabs}
        value={activeTab}
        onValueChange={setActiveTab}
      />

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-6xl px-6 py-8 space-y-8">
          {/* Loading States Tab */}
          {activeTab === "loading" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Loading States</h2>
                <p className="text-muted-foreground mb-6">
                  Different loading indicators for various scenarios
                </p>
              </div>

              {/* Full Page Loading */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Full Page Loading</CardTitle>
                      <CardDescription>Spinner, skeleton, and dots variants</CardDescription>
                    </div>
                    <CopyCodeButton code={`<LoadingState message="Loading data..." variant="spinner" size="lg" />`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">Spinner</h3>
                      <LoadingState message="Loading..." variant="spinner" size="md" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">Skeleton</h3>
                      <LoadingState message="Loading..." variant="skeleton" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">Dots</h3>
                      <LoadingState message="Loading..." variant="dots" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skeleton Loaders */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Skeleton Loaders</CardTitle>
                      <CardDescription>Pre-built skeleton patterns</CardDescription>
                    </div>
                    <CopyCodeButton code={`<SkeletonLoader variant="card" />`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">Card Skeleton</h3>
                      <SkeletonLoader variant="card" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">Table Skeleton</h3>
                      <SkeletonLoader variant="table" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">List Skeleton</h3>
                      <SkeletonLoader variant="list" lines={3} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">Lines Skeleton</h3>
                      <SkeletonLoader variant="lines" lines={4} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Loading Overlay */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Loading Overlay</CardTitle>
                      <CardDescription>Overlay loading for inline content</CardDescription>
                    </div>
                    <CopyCodeButton code={`<LoadingOverlay isLoading={true} message="Saving...">\n  <YourContent />\n</LoadingOverlay>`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button onClick={simulateOverlay}>Simulate Overlay Loading</Button>
                    <LoadingOverlay isLoading={overlayLoading} message="Processing...">
                      <Card>
                        <CardHeader>
                          <CardTitle>Content Card</CardTitle>
                          <CardDescription>This content is covered by overlay when loading</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">Some content here...</p>
                        </CardContent>
                      </Card>
                    </LoadingOverlay>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* API Errors Tab */}
          {activeTab === "errors" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">API Error States</h2>
                <p className="text-muted-foreground mb-6">
                  Different error scenarios and how to handle them
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Network Error */}
                <Card>
                  <CardHeader>
                    <CardTitle>Network Error</CardTitle>
                    <CardDescription>No internet connection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApiError
                      error={{ type: "network", message: "Failed to fetch" }}
                      onRetry={() => console.log("Retry network")}
                    />
                  </CardContent>
                </Card>

                {/* Timeout Error */}
                <Card>
                  <CardHeader>
                    <CardTitle>Timeout Error</CardTitle>
                    <CardDescription>Request took too long</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApiError
                      error={{ type: "timeout", message: "Request timeout" }}
                      onRetry={() => console.log("Retry timeout")}
                    />
                  </CardContent>
                </Card>

                {/* 400 Bad Request */}
                <Card>
                  <CardHeader>
                    <CardTitle>400 Bad Request</CardTitle>
                    <CardDescription>Invalid request</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApiError
                      error={{ status: 400, message: "Invalid input parameters" }}
                      onRetry={() => console.log("Retry 400")}
                    />
                  </CardContent>
                </Card>

                {/* 401 Unauthorized */}
                <Card>
                  <CardHeader>
                    <CardTitle>401 Unauthorized</CardTitle>
                    <CardDescription>Authentication required</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApiError
                      error={{ status: 401, message: "Please log in" }}
                      onRetry={() => console.log("Retry 401")}
                    />
                  </CardContent>
                </Card>

                {/* 403 Forbidden */}
                <Card>
                  <CardHeader>
                    <CardTitle>403 Forbidden</CardTitle>
                    <CardDescription>Access denied</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApiError
                      error={{ status: 403, message: "You don't have permission" }}
                      onRetry={() => console.log("Retry 403")}
                    />
                  </CardContent>
                </Card>

                {/* 404 Not Found */}
                <Card>
                  <CardHeader>
                    <CardTitle>404 Not Found</CardTitle>
                    <CardDescription>Resource not found</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApiError
                      error={{ status: 404, message: "Resource not found" }}
                      onRetry={() => console.log("Retry 404")}
                    />
                  </CardContent>
                </Card>

                {/* 500 Server Error */}
                <Card>
                  <CardHeader>
                    <CardTitle>500 Server Error</CardTitle>
                    <CardDescription>Internal server error</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApiError
                      error={{ status: 500, message: "Internal server error" }}
                      onRetry={() => console.log("Retry 500")}
                    />
                  </CardContent>
                </Card>

                {/* Data Error Variants */}
                <Card>
                  <CardHeader>
                    <CardTitle>Data Error - Inline</CardTitle>
                    <CardDescription>Inline error variant</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataError
                      error="Failed to parse data"
                      variant="inline"
                      onRetry={() => console.log("Retry data")}
                    />
                  </CardContent>
                </Card>

                {/* Generic Error State */}
                <Card>
                  <CardHeader>
                    <CardTitle>Generic Error State</CardTitle>
                    <CardDescription>Custom error scenarios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ErrorState
                      title="Custom Error"
                      description="This is a custom error message"
                      actions={<Button>Custom Action</Button>}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Empty States Tab */}
          {activeTab === "empty" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Empty States</h2>
                <p className="text-muted-foreground mb-6">
                  Different empty state scenarios
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>No Data</CardTitle>
                    <CardDescription>Default empty state</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmptyState variant="no-data" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>No Results</CardTitle>
                    <CardDescription>Search returned no results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmptyState
                      variant="no-results"
                      title="No matches found"
                      description="Try adjusting your search filters"
                      action={<Button variant="outline">Clear Filters</Button>}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>No Permission</CardTitle>
                    <CardDescription>Access denied</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmptyState
                      variant="no-permission"
                      action={<Button>Request Access</Button>}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Custom Empty State</CardTitle>
                    <CardDescription>With custom icon and action</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmptyState
                      title="No items yet"
                      description="Get started by creating your first item"
                      action={<Button>Create Item</Button>}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Slow API Tab */}
          {activeTab === "slow-api" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Slow API Handling</h2>
                <p className="text-muted-foreground mb-6">
                  Handling APIs that take longer than expected
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Slow API Handler</CardTitle>
                  <CardDescription>
                    Shows a message when API takes longer than threshold
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={() => simulateSlowApi(1000)} variant="outline">
                      Fast API (1s)
                    </Button>
                    <Button onClick={() => simulateSlowApi(3000)} variant="outline">
                      Slow API (3s)
                    </Button>
                    <Button onClick={() => simulateSlowApi(5000)} variant="outline">
                      Very Slow (5s)
                    </Button>
                  </div>
                  <SlowApiHandler delay={2000} onSlowApi={() => console.log("API is slow")}>
                    <Card>
                      <CardHeader>
                        <CardTitle>API Response</CardTitle>
                        <CardDescription>
                          {slowApiDelay > 0
                            ? `Simulating ${slowApiDelay / 1000}s delay...`
                            : "Click a button above to simulate slow API"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {slowApiDelay === 0 ? (
                          <p className="text-sm text-muted-foreground">
                            This card will show a slow API warning after 2 seconds
                          </p>
                        ) : (
                          <LoadingState message={`Loading (${slowApiDelay / 1000}s delay)...`} />
                        )}
                      </CardContent>
                    </Card>
                  </SlowApiHandler>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Timeout Handler</CardTitle>
                  <CardDescription>
                    Automatically shows timeout error after specified duration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TimeoutHandler
                    timeout={3000}
                    onTimeout={() => console.log("Timeout occurred")}
                    onRetry={() => {
                      console.log("Retrying...")
                      window.location.reload()
                    }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Content with Timeout</CardTitle>
                        <CardDescription>
                          This will timeout after 3 seconds. Click to reset.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Content that may timeout...
                        </p>
                      </CardContent>
                    </Card>
                  </TimeoutHandler>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Real Scenarios Tab */}
          {activeTab === "scenarios" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Real-world Scenarios</h2>
                <p className="text-muted-foreground mb-6">
                  Complete examples combining multiple edge cases
                </p>
              </div>

              {/* Data Table Scenario */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Table with States</CardTitle>
                  <CardDescription>
                    Loading → Error → Success → Empty states
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={simulateLoading} variant="outline" size="sm">
                      Show Loading
                    </Button>
                    <Button onClick={simulateError} variant="outline" size="sm">
                      Show Error
                    </Button>
                    <Button onClick={() => setLoadingState("success")} variant="outline" size="sm">
                      Show Success
                    </Button>
                    <Button onClick={() => setLoadingState("idle")} variant="outline" size="sm">
                      Reset
                    </Button>
                  </div>

                  {loadingState === "loading" && (
                    <div className="py-8">
                      <SkeletonLoader variant="table" />
                    </div>
                  )}

                  {loadingState === "error" && (
                    <DataError
                      error="Failed to load table data"
                      variant="card"
                      onRetry={() => {
                        setLoadingState("loading")
                        setTimeout(() => setLoadingState("success"), 1000)
                      }}
                    />
                  )}

                  {loadingState === "success" && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Table data loaded successfully!</p>
                      <div className="rounded-md border p-4">
                        <SkeletonLoader variant="table" />
                      </div>
                    </div>
                  )}

                  {loadingState === "idle" && (
                    <EmptyState
                      variant="no-data"
                      title="No data loaded"
                      description="Click a button above to see different states"
                    />
                  )}
                </CardContent>
              </Card>

              {/* Form Submission Scenario */}
              <Card>
                <CardHeader>
                  <CardTitle>Form Submission</CardTitle>
                  <CardDescription>
                    Loading overlay during submission
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LoadingOverlay isLoading={overlayLoading} message="Submitting form...">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <input
                          type="text"
                          className="w-full rounded-md border px-3 py-2"
                          placeholder="Enter name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                          type="email"
                          className="w-full rounded-md border px-3 py-2"
                          placeholder="Enter email"
                        />
                      </div>
                      <Button onClick={simulateOverlay}>Submit Form</Button>
                    </div>
                  </LoadingOverlay>
                </CardContent>
              </Card>

              {/* Card Grid Scenario */}
              <Card>
                <CardHeader>
                  <CardTitle>Card Grid with Loading</CardTitle>
                  <CardDescription>
                    Skeleton cards while loading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingState === "loading" ? (
                    <div className="grid gap-4 md:grid-cols-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonLoader key={i} variant="card" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}>
                          <CardHeader>
                            <CardTitle>Card {i + 1}</CardTitle>
                            <CardDescription>Sample card content</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">Card body content here...</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  <div className="mt-4">
                    <Button onClick={simulateLoading} variant="outline" size="sm">
                      Toggle Loading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}

export default EdgeCasesDemoPage


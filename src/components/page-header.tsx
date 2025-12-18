import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  tag?: string
  tagVariant?: "default" | "secondary" | "destructive" | "outline"
  actions?: React.ReactNode
  tabs?: Array<{
    value: string
    label: string
  }>
  defaultTab?: string
  activeTab?: string
  onTabChange?: (value: string) => void
  backButton?: {
    label?: string
    href?: string
    onClick?: () => void
  }
}

/**
 * Page Header Component
 * 
 * A 52px height header component for pages that includes:
 * - Page heading on the left
 * - CTAs (Call-to-Action buttons) on the right
 * - Optional tag/badge
 * - Optional tabs section below
 * 
 * @example
 * ```tsx
 * <PageHeader
 *   title="Users"
 *   description="Manage your users"
 *   tag="Beta"
 *   actions={<Button>Add User</Button>}
 *   tabs={[
 *     { value: "all", label: "All Users" },
 *     { value: "active", label: "Active" },
 *   ]}
 * />
 * ```
 */
export function PageHeader({
  title,
  description,
  tag,
  tagVariant = "secondary",
  actions,
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  backButton,
}: PageHeaderProps) {
  const [internalActiveTab, setInternalActiveTab] = React.useState(
    defaultTab || tabs?.[0]?.value || ""
  )
  const activeTab = controlledActiveTab ?? internalActiveTab

  const [mounted, setMounted] = React.useState(false)
  const reducedMotion = useReducedMotion()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleTabChange = (value: string) => {
    if (!controlledActiveTab) {
      setInternalActiveTab(value)
    }
    if (onTabChange) {
      onTabChange(value)
    }
  }

  return (
    <motion.div
      initial={mounted && !reducedMotion ? { opacity: 0, y: -10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("sticky top-9 z-30 w-full bg-background", tabs && tabs.length > 0 ? "" : "border-b")}
    >
      {/* Page Header - 52px height */}
      <div className="container flex h-[52px] items-center gap-4 px-4">
        {/* Left Side - Page Heading */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {backButton && (
            <motion.div
              initial={mounted && !reducedMotion ? { opacity: 0, x: -10 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {backButton.href ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 -ml-2"
                  asChild
                >
                  <Link to={backButton.href}>
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 -ml-2"
                  onClick={backButton.onClick}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          )}
          <motion.h1
            initial={mounted && !reducedMotion ? { opacity: 0, x: -10 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-lg font-semibold truncate"
          >
            {title}
          </motion.h1>
          {tag && (
            <motion.div
              initial={mounted && !reducedMotion ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
            <Badge variant={tagVariant} className="shrink-0">
              {tag}
            </Badge>
            </motion.div>
          )}
          {description && (
            <motion.span
              initial={mounted && !reducedMotion ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="hidden lg:inline text-sm text-muted-foreground truncate"
            >
              {description}
            </motion.span>
          )}
        </div>

        {/* Right Side - CTAs */}
        {actions && (
          <motion.div
            initial={mounted && !reducedMotion ? { opacity: 0, x: 10 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-2 shrink-0"
          >
            {actions}
          </motion.div>
        )}
      </div>

      {/* Tabs Section */}
      {tabs && tabs.length > 0 && (
        <motion.div
          initial={mounted && !reducedMotion ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="border-b"
        >
          <div className="container px-4">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList variant="line" className="h-9">
              {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="px-4">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        </motion.div>
      )}
    </motion.div>
  )
}


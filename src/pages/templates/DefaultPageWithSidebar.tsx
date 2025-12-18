import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { User, LogOut, Sparkles } from "lucide-react"
import { SIDEBAR_ITEMS } from "@/lib/sidebar-config"

/**
 * Default Page Template with Sidebar
 * 
 * A standard page layout template with:
 * - Left sidebar navigation (static across all pages)
 * - Global header at the top
 * - Page header section
 * - Main content area
 * 
 * This template provides a consistent layout structure for dashboard and admin pages.
 * The sidebar is static and defined in @/lib/sidebar-config.ts
 * 
 * @example
 * ```tsx
 * <DefaultPageWithSidebar
 *   pageTitle="Dashboard"
 *   pageDescription="Overview of your account"
 * >
 *   <div>Your page content here</div>
 * </DefaultPageWithSidebar>
 * ```
 */
interface DefaultPageWithSidebarProps {
  pageTitle?: string
  pageDescription?: string
  children: React.ReactNode
  headerActions?: React.ReactNode
  sidebarHeader?: React.ReactNode
  sidebarFooter?: React.ReactNode
  showSidebarSearch?: boolean
  sidebarSearchPlaceholder?: string
  onSidebarSearch?: (query: string) => void
  breadcrumbs?: Array<{ label: string; href?: string }>
  onLogout?: () => void
  userName?: string
  userEmail?: string
  userAvatar?: string
  pageTag?: string
  pageTagVariant?: "default" | "secondary" | "destructive" | "outline"
  pageActions?: React.ReactNode
  pageTabs?: Array<{
    value: string
    label: string
  }>
  defaultTab?: string
  activeTab?: string
  onTabChange?: (value: string) => void
  pageBackButton?: {
    label?: string
    href?: string
    onClick?: () => void
  }
}

// Sidebar Header Content Component - Following shadcn patterns
function SidebarHeaderContent() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Sparkles strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">IQLine Inc.</span>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

// Page Content Wrapper Component
function PageContentWrapper({ 
  children, 
  mounted, 
  reducedMotion 
}: { 
  children: React.ReactNode
  mounted: boolean
  reducedMotion: boolean | null 
}) {
  return (
    <motion.div
      initial={mounted && !reducedMotion ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="container mx-auto py-6 px-4"
    >
      {children}
    </motion.div>
  )
}

export function DefaultPageWithSidebar({
  pageTitle = "Page Title",
  pageDescription,
  children,
  headerActions,
  sidebarHeader,
  sidebarFooter,
  showSidebarSearch = false,
  sidebarSearchPlaceholder = "Search...",
  onSidebarSearch,
  breadcrumbs,
  onLogout,
  userName,
  userEmail,
  userAvatar,
  pageTag,
  pageTagVariant,
  pageActions,
  pageTabs,
  defaultTab,
  activeTab,
  onTabChange,
  pageBackButton,
}: DefaultPageWithSidebarProps) {
  const [mounted, setMounted] = React.useState(false)
  const reducedMotion = useReducedMotion()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <SidebarProvider>
      <SidebarLayout
        sidebarHeader={sidebarHeader}
        sidebarFooter={sidebarFooter}
        mounted={mounted}
        reducedMotion={reducedMotion}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageTag={pageTag}
        pageTagVariant={pageTagVariant}
        pageActions={pageActions}
        pageTabs={pageTabs}
        defaultTab={defaultTab}
        activeTab={activeTab}
        onTabChange={onTabChange}
        breadcrumbs={breadcrumbs}
        onLogout={onLogout}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        pageBackButton={pageBackButton}
        children={children}
      />
    </SidebarProvider>
  )
}

// Sidebar Layout Component - Uses useSidebar hook inside SidebarProvider
function SidebarLayout({
  sidebarHeader,
  sidebarFooter,
  mounted,
  reducedMotion,
  pageTitle,
  pageDescription,
  pageTag,
  pageTagVariant,
  pageActions,
  pageTabs,
  defaultTab,
  activeTab,
  onTabChange,
  breadcrumbs,
  onLogout,
  userName,
  userEmail,
  userAvatar,
  pageBackButton,
  children,
}: DefaultPageWithSidebarProps & {
  mounted: boolean
  reducedMotion: boolean | null
}) {
  const { isMobile, setOpenMobile } = useSidebar()

  return (
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          {/* Sidebar Header */}
          <SidebarHeader>
          {sidebarHeader || <SidebarHeaderContent />}
          </SidebarHeader>

          {/* Sidebar Content */}
          <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {SIDEBAR_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild={!!item.href}
                        tooltip={item.label}
                        onClick={
                          item.href && isMobile
                            ? () => setOpenMobile(false)
                            : undefined
                        }
                      >
                        {item.href ? (
                          <Link to={item.href}>
                            <item.icon strokeWidth={ICON_STROKE_WIDTH} />
                            <span>{item.label}</span>
                          </Link>
                        ) : (
                          <>
                            <item.icon strokeWidth={ICON_STROKE_WIDTH} />
                            <span>{item.label}</span>
                          </>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter>
            {sidebarFooter || (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="" alt="User" />
                        <AvatarFallback className="rounded-lg">
                      <User strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">John Doe</span>
                        <span className="truncate text-xs">john@example.com</span>
                </div>
              </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="flex h-full flex-col overflow-hidden">
          {/* Global Header - 36px */}
          <Header
            breadcrumbs={breadcrumbs}
            onLogout={onLogout}
            userName={userName}
            userEmail={userEmail}
            userAvatar={userAvatar}
          />

          {/* Page Header - 52px */}
          {pageTitle && (
            <PageHeader
              title={pageTitle}
              description={pageDescription}
              tag={pageTag}
              tagVariant={pageTagVariant}
              actions={pageActions}
              tabs={pageTabs}
              defaultTab={defaultTab}
              activeTab={activeTab}
              onTabChange={onTabChange}
              backButton={pageBackButton}
            />
          )}

          {/* Page Content */}
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <PageContentWrapper mounted={mounted} reducedMotion={reducedMotion}>
              {children}
            </PageContentWrapper>
          </div>
        </SidebarInset>
      </div>
  )
}


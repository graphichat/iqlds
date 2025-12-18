import * as React from "react"
import { Link } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { Home, File, Settings, User, BarChart3, Sparkles } from "lucide-react"

interface AppSidebarProps {
  sidebarItems?: Array<{
    label: string
    icon: React.ComponentType<{ className?: string }>
    href?: string
    onClick?: () => void
  }>
  sidebarHeader?: React.ReactNode
  sidebarFooter?: React.ReactNode
}

const defaultSidebarItems = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "Files",
    icon: File,
    href: "/files",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    label: "Users",
    icon: User,
    href: "/users",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function AppSidebar({
  sidebarItems = defaultSidebarItems,
  sidebarHeader,
  sidebarFooter,
}: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {sidebarHeader || (
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
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild={!!item.href}
                    tooltip={item.label}
                    onClick={
                      item.onClick ||
                      (item.href && isMobile
                        ? () => setOpenMobile(false)
                        : undefined)
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
  )
}


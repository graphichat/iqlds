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
import { User, Sparkles } from "lucide-react"
import { SIDEBAR_ITEMS } from "@/lib/sidebar-config"

interface GlobalSidebarProps {
  sidebarHeader?: React.ReactNode
  sidebarFooter?: React.ReactNode
}

// Sidebar Header Content Component
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

export function GlobalSidebar({ sidebarHeader, sidebarFooter }: GlobalSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {sidebarHeader || <SidebarHeaderContent />}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon
                const label = item.label
                return (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      asChild={!!item.href}
                      tooltip={label}
                      onClick={
                        item.href && isMobile
                          ? () => setOpenMobile(false)
                          : undefined
                      }
                    >
                      {item.href ? (
                        <Link to={item.href}>
                          <Icon strokeWidth={ICON_STROKE_WIDTH} />
                          <span>{label}</span>
                        </Link>
                      ) : (
                        <div>
                          <Icon strokeWidth={ICON_STROKE_WIDTH} />
                          <span>{label}</span>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
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


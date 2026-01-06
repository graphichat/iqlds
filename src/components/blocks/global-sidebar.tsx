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
import { User } from "lucide-react"
import { SIDEBAR_ITEMS } from "@/lib/sidebar-config"
import LogoIcon from "@/assets/Logo.svg?react"
import LogoFull from "@/assets/LogoFull.svg?react"

interface GlobalSidebarProps {
  sidebarHeader?: React.ReactNode
  sidebarFooter?: React.ReactNode
}

// Sidebar Header Content Component
function SidebarHeaderContent() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          {/* Logo icon - always 36px (w-9 h-9) */}
<div className="flex items-center justify-center shrink-0 w-9 h-9">
  <LogoIcon className="h-full w-full" />
</div>

{/* Logo full - hidden when collapsed */}
<span className="group-data-[collapsible=icon]:hidden flex items-center h-full">
  <LogoFull className="h-full w-auto text-foreground" />
</span>
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


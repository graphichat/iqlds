import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell, Settings, User, LogOut } from "lucide-react"

interface BreadcrumbItemType {
  label: string
  href?: string
}

interface HeaderProps {
  breadcrumbs?: BreadcrumbItemType[]
  onLogout?: () => void
  userName?: string
  userEmail?: string
  userAvatar?: string
}

export function Header({
  breadcrumbs,
  onLogout,
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar,
}: HeaderProps) {
  const location = useLocation()

  // Generate breadcrumbs from route if not provided
  const getBreadcrumbs = React.useMemo(() => {
    if (breadcrumbs) return breadcrumbs

    const pathSegments = location.pathname.split("/").filter(Boolean)
    const items: BreadcrumbItemType[] = [
      { label: "Home", href: "/" },
    ]

    if (pathSegments.length === 0) {
      return [{ label: "Home" }]
    }

    let currentPath = ""
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1
      items.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        href: isLast ? undefined : currentPath,
      })
    })

    return items
  }, [breadcrumbs, location.pathname])

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      // Default logout behavior
      console.log("Logout clicked")
      // Add your logout logic here
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-muted backdrop-blur supports-[backdrop-filter]:bg-muted">
      <div className="container flex h-9 items-center gap-4 px-4">
        {/* Left Side - Sidebar Trigger & Breadcrumbs */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-full" />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {getBreadcrumbs.map((item, index) => {
                const isLast = index === getBreadcrumbs.length - 1
                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {isLast || !item.href ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={item.href}>{item.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right Side - Icons & User Menu */}
        <div className="flex items-center gap-2">
          {/* Notification Icon */}
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
          </Button>

          <Separator orientation="vertical" className="h-full" />

          {/* Theme Toggle */}
          <ThemeToggle />

          <Separator orientation="vertical" className="h-full" />

          {/* Settings Icon */}
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
          </Button>

          <Separator orientation="vertical" className="h-full" />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
                <Avatar className="size-7">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>
                    <User strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block text-sm font-medium max-w-[120px] truncate">
                  {userName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <Settings strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut strokeWidth={ICON_STROKE_WIDTH} className="mr-2 size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

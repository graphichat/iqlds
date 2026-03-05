import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail, Phone, MapPin, Globe, Calendar, Edit, UserPlus, Activity,
  TrendingUp, FileText, MessageSquare,
} from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { MetricCard } from "@/components/blocks/metric-card"

const ACTIVITY_FEED = [
  { id: 1, action: "Created a new project", target: "Website Redesign", time: "2 hours ago", icon: FileText },
  { id: 2, action: "Commented on", target: "Q4 Budget Review", time: "5 hours ago", icon: MessageSquare },
  { id: 3, action: "Completed task", target: "API Integration Phase 1", time: "Yesterday", icon: Activity },
  { id: 4, action: "Updated report", target: "Monthly Analytics", time: "2 days ago", icon: TrendingUp },
  { id: 5, action: "Created a new project", target: "Mobile App v2", time: "1 week ago", icon: FileText },
]

const RECENT_PROJECTS = [
  { id: 1, name: "Website Redesign", status: "In Progress", role: "Lead Designer", progress: 65 },
  { id: 2, name: "Mobile App Development", status: "Completed", role: "Product Manager", progress: 100 },
  { id: 3, name: "API Integration", status: "In Progress", role: "Developer", progress: 40 },
  { id: 4, name: "Security Audit", status: "Review", role: "Reviewer", progress: 80 },
]

const STATUS_COLORS: Record<string, string> = {
  "In Progress": "bg-blue-500",
  "Completed": "bg-emerald-500",
  "Review": "bg-amber-500",
  "Pending": "bg-zinc-400",
}

export interface ProfilePageProps {
  user?: {
    name: string
    role: string
    email: string
    phone?: string
    location?: string
    website?: string
    bio?: string
    avatar?: string
    joinDate?: string
    department?: string
    tags?: string[]
  }
}

const DEFAULT_USER = {
  name: "Sarah Johnson",
  role: "Senior Product Designer",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  website: "https://sarahjohnson.design",
  bio: "Passionate product designer with 8+ years of experience building user-centric products. Specializing in design systems, interaction design, and user research.",
  avatar: "https://github.com/shadcn.png",
  joinDate: "January 2021",
  department: "Product Design",
  tags: ["Design Systems", "UX Research", "Prototyping", "Figma"],
}

/**
 * ProfilePage — single-entity user profile page.
 *
 * Shows overview metrics, activity feed, and project list
 * in a tabbed layout with a rich profile header.
 *
 * @example
 * ```tsx
 * <ProfilePage user={currentUser} />
 * ```
 */
export function ProfilePage({ user = DEFAULT_USER }: ProfilePageProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <PageShell>
      <PageHeaderWithBack
        title="Profile"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <MessageSquare strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
              Message
            </Button>
            <Button variant="outline" className="gap-2">
              <UserPlus strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
              Follow
            </Button>
            <Button className="gap-2">
              <Edit strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
              Edit Profile
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 max-w-5xl space-y-6">
          {/* Profile header card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <Avatar className="size-20 shrink-0 ring-4 ring-background self-start">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.role}</p>
                    {user.department && (
                      <Badge variant="secondary" className="mt-1">{user.department}</Badge>
                    )}
                  </div>

                  {user.bio && (
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{user.bio}</p>
                  )}

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                    {user.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail strokeWidth={ICON_STROKE_WIDTH} className="size-3.5 shrink-0" />
                        {user.email}
                      </span>
                    )}
                    {user.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone strokeWidth={ICON_STROKE_WIDTH} className="size-3.5 shrink-0" />
                        {user.phone}
                      </span>
                    )}
                    {user.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin strokeWidth={ICON_STROKE_WIDTH} className="size-3.5 shrink-0" />
                        {user.location}
                      </span>
                    )}
                    {user.website && (
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Globe strokeWidth={ICON_STROKE_WIDTH} className="size-3.5 shrink-0" />
                        {user.website.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                    {user.joinDate && (
                      <span className="flex items-center gap-1.5">
                        <Calendar strokeWidth={ICON_STROKE_WIDTH} className="size-3.5 shrink-0" />
                        Joined {user.joinDate}
                      </span>
                    )}
                  </div>

                  {user.tags && user.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {user.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Projects" value="24" change="+3" trend="up" variant="compact" description="Active projects" />
            <MetricCard title="Tasks Done" value="142" change="+18" trend="up" variant="compact" description="This month" />
            <MetricCard title="Response Rate" value="98%" change="+2%" trend="up" variant="compact" description="Avg. reply time" />
            <MetricCard title="Reviews" value="4.9" change="+0.1" trend="up" variant="compact" description="Peer rating" />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions across all projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ACTIVITY_FEED.map((item, i) => {
                      const Icon = item.icon
                      return (
                        <React.Fragment key={item.id}>
                          <div className="flex items-start gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-muted shrink-0 mt-0.5">
                              <Icon strokeWidth={ICON_STROKE_WIDTH} className="size-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">
                                <span className="text-muted-foreground">{item.action} </span>
                                <span className="font-medium">{item.target}</span>
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                            </div>
                          </div>
                          {i < ACTIVITY_FEED.length - 1 && <Separator />}
                        </React.Fragment>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>All projects this user is involved in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {RECENT_PROJECTS.map((project) => (
                      <div key={project.id} className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{project.name}</p>
                            <div className="flex items-center gap-1.5">
                              <div className={`size-2 rounded-full ${STATUS_COLORS[project.status] ?? "bg-zinc-400"}`} />
                              <span className="text-xs text-muted-foreground">{project.status}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{project.role}</p>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 flex-1 rounded-full bg-muted">
                              <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${project.progress}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">{project.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageShell>
  )
}

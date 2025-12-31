import * as React from "react"
import { DollarSign, Users, ShoppingCart, Activity } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithTabs } from "@/components/patterns/page-header-with-tabs"
import { MetricCard } from "@/components/blocks/metric-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Chart Data
const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

// Recent Projects Data
const recentProjects = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    progress: 65,
    assignee: { name: "Sarah Johnson", avatar: "SJ" },
    dueDate: "2024-05-15",
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "Completed",
    progress: 100,
    assignee: { name: "Michael Chen", avatar: "MC" },
    dueDate: "2024-04-30",
  },
  {
    id: 3,
    name: "API Integration",
    status: "In Progress",
    progress: 40,
    assignee: { name: "Emily Rodriguez", avatar: "ER" },
    dueDate: "2024-05-20",
  },
  {
    id: 4,
    name: "Database Migration",
    status: "Pending",
    progress: 0,
    assignee: { name: "David Kim", avatar: "DK" },
    dueDate: "2024-05-25",
  },
  {
    id: 5,
    name: "Security Audit",
    status: "In Progress",
    progress: 80,
    assignee: { name: "Lisa Wong", avatar: "LW" },
    dueDate: "2024-05-10",
  },
]

function RevenueChart() {
  const [timeRange, setTimeRange] = React.useState("30d")

  const filteredData = React.useMemo(() => {
    const daysToSubtract = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    const referenceDate = new Date("2024-04-30")
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    
    return chartData.filter((item) => {
      const date = new Date(item.date)
      return date >= startDate
    })
  }, [timeRange])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Track revenue performance across desktop and mobile platforms
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function RecentProjects() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "Pending":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
        <CardDescription>
          Track the progress of your active projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`} />
                    <span className="text-sm">{project.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full max-w-[100px] rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{project.assignee.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{project.assignee.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(project.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Projects
        </Button>
      </CardFooter>
    </Card>
  )
}

export function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState("overview")

  return (
    <PageShell>
      <PageHeaderWithTabs
        title="Dashboard"
        actions={
          <>
            <Badge variant="secondary" className="mr-2">Live</Badge>
            <Button variant="outline">Export Report</Button>
            <Button>New Project</Button>
          </>
        }
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "analytics", label: "Analytics" },
          { value: "reports", label: "Reports" },
        ]}
        value={activeTab}
        onValueChange={setActiveTab}
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Total Revenue"
                value="$124,580"
                change="+12.5%"
                trend="up"
                icon={DollarSign}
                description="Revenue for the last 30 days"
              />
              <MetricCard
                title="Active Users"
                value="8,234"
                change="+8.2%"
                trend="up"
                icon={Users}
                description="Users active in the last week"
              />
              <MetricCard
                title="Orders"
                value="1,456"
                change="-3.1%"
                trend="down"
                icon={ShoppingCart}
                description="Orders placed this month"
              />
              <MetricCard
                title="Conversion Rate"
                value="3.24%"
                change="+0.8%"
                trend="up"
                icon={Activity}
                description="Overall conversion performance"
              />
            </div>

            {/* Revenue Chart */}
            <RevenueChart />

            {/* Recent Projects */}
            <RecentProjects />
          </div>
        </div>
      </div>
    </PageShell>
  )
}


